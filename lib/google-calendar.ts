import { google } from 'googleapis'

export interface CalendarEvent {
  summary: string
  description: string
  startTime: Date
  endTime: Date
  attendees: string[]
  timeZone: string
}

export interface CreateEventResponse {
  success: boolean
  meetLink?: string
  eventId?: string
  error?: string
}

interface GoogleCalendarConfig {
  calendarId: string
  serviceAccountEmail: string
  privateKey: string
}

function getGoogleCalendarConfig(): GoogleCalendarConfig {
  const serviceAccountEmail = (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '').trim()
  const calendarId = (process.env.GOOGLE_CALENDAR_ID || '').trim()
  const rawPrivateKey = process.env.GOOGLE_PRIVATE_KEY

  if (!serviceAccountEmail) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is not configured')
  }
  if (!rawPrivateKey) {
    throw new Error('GOOGLE_PRIVATE_KEY is not configured')
  }
  if (!calendarId) {
    throw new Error('GOOGLE_CALENDAR_ID is not configured')
  }

  const privateKey = rawPrivateKey.replace(/\\n/g, '\n')

  return {
    calendarId,
    serviceAccountEmail,
    privateKey,
  }
}

function parseGoogleApiError(error: any) {
  const apiError = error?.response?.data?.error || error?.errors?.[0] || error
  const nestedError = apiError?.errors?.[0]

  return {
    code: error?.code || apiError?.code,
    reason: apiError?.status || nestedError?.reason,
    message: apiError?.message || nestedError?.message || error?.message,
  }
}

/**
 * Creates a Google Calendar service instance using service account credentials
 */
function getCalendarService(config?: GoogleCalendarConfig) {
  try {
    const resolvedConfig = config || getGoogleCalendarConfig()

    // Create JWT client for service account authentication
    const auth = new google.auth.JWT({
      email: resolvedConfig.serviceAccountEmail,
      key: resolvedConfig.privateKey,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    })

    // Return calendar API instance
    return google.calendar({ version: 'v3', auth })
  } catch (error) {
    console.error('Failed to initialize Google Calendar service:', error)
    throw error
  }
}

/**
 * Creates a Google Calendar event with Google Meet link
 */
export async function createCalendarEvent(
  event: CalendarEvent
): Promise<CreateEventResponse> {
  const allowMeet = process.env.GOOGLE_ENABLE_MEET === 'true'
  let calendarId = ''
  let serviceAccountEmail = ''

  try {
    const config = getGoogleCalendarConfig()
    calendarId = config.calendarId
    serviceAccountEmail = config.serviceAccountEmail
    const calendar = getCalendarService(config)

    const requestBody: any = {
      summary: event.summary,
      description: event.description,
      start: {
        dateTime: event.startTime.toISOString(),
        timeZone: event.timeZone,
      },
      end: {
        dateTime: event.endTime.toISOString(),
        timeZone: event.timeZone,
      },
      attendees: event.attendees.map((email) => ({ email })),
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'popup', minutes: 30 }, // 30 minutes before
        ],
      },
    }

    // Try to create a Google Meet if enabled and permitted by the workspace
    if (allowMeet) {
      requestBody.conferenceData = {
        createRequest: {
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      }
    }

    const attemptInsert = async (withMeet: boolean) =>
      calendar.events.insert({
        calendarId: calendarId,
        requestBody: withMeet ? requestBody : { ...requestBody, conferenceData: undefined },
        sendUpdates: 'all',
        conferenceDataVersion: withMeet ? 1 : undefined,
      })

    let response
    try {
      response = await attemptInsert(allowMeet)
    } catch (err: any) {
      // If meet creation is blocked, retry without it
      const shouldRetryWithoutMeet =
        allowMeet &&
        (err?.code === 403 ||
          (typeof err?.message === 'string' && err.message.toLowerCase().includes('conference')))

      if (shouldRetryWithoutMeet) {
        console.warn('Meet creation failed; retrying without conference data', err?.message)
        response = await attemptInsert(false)
      } else {
        throw err
      }
    }

    const meetLink =
      response.data.hangoutLink ||
      response.data.conferenceData?.entryPoints?.find(
        (entry) => entry.entryPointType === 'video'
      )?.uri

    // Generate a generic Google Meet link as a fallback
    const fallbackMeetLink = `https://meet.google.com/new`

    return {
      success: true,
      meetLink: meetLink || fallbackMeetLink,
      eventId: response.data.id || undefined,
    }
  } catch (error: any) {
    const { code, reason, message } = parseGoogleApiError(error)
    const calendarContext = calendarId || (process.env.GOOGLE_CALENDAR_ID || '').trim()
    const serviceContext =
      serviceAccountEmail || (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '').trim()

    console.error('Failed to create calendar event:', {
      code,
      reason,
      message,
      calendarId: calendarContext,
      serviceAccountEmail: serviceContext,
      rawError: error,
    })

    // Provide more specific error messages
    if (code === 401) {
      return {
        success: false,
        error: 'Google Calendar authentication failed. Please check service account credentials.',
      }
    }

    if (reason === 'accessNotConfigured') {
      return {
        success: false,
        error:
          'Google Calendar API is not enabled for this project. Enable it in Google Cloud Console and try again.',
      }
    }

    if (code === 403) {
      const hint =
        'Confirm the calendar is shared with the service account (Make changes to events) and that the Calendar API is enabled.'
      const context = calendarContext
        ? `Calendar ID "${calendarContext}" with service account "${serviceContext}". `
        : ''

      return {
        success: false,
        error: `${message || 'Permission denied while creating the calendar event.'} ${context}${hint}`.trim(),
      }
    }

    return {
      success: false,
      error: message || 'Failed to create calendar event',
    }
  }
}

/**
 * Deletes a Google Calendar event
 */
export async function deleteCalendarEvent(eventId: string): Promise<boolean> {
  try {
    const config = getGoogleCalendarConfig()
    const calendar = getCalendarService(config)

    await calendar.events.delete({
      calendarId: config.calendarId,
      eventId,
      sendUpdates: 'all', // Notify attendees
    })

    return true
  } catch (error) {
    console.error('Failed to delete calendar event:', error)
    return false
  }
}

/**
 * Updates a Google Calendar event
 */
export async function updateCalendarEvent(
  eventId: string,
  event: Partial<CalendarEvent>
): Promise<CreateEventResponse> {
  try {
    const config = getGoogleCalendarConfig()
    const calendar = getCalendarService(config)

    const updateData: any = {}

    if (event.summary) updateData.summary = event.summary
    if (event.description) updateData.description = event.description
    if (event.startTime) {
      updateData.start = {
        dateTime: event.startTime.toISOString(),
        timeZone: event.timeZone || 'UTC',
      }
    }
    if (event.endTime) {
      updateData.end = {
        dateTime: event.endTime.toISOString(),
        timeZone: event.timeZone || 'UTC',
      }
    }
    if (event.attendees) {
      updateData.attendees = event.attendees.map((email) => ({ email }))
    }

    const response = await calendar.events.patch({
      calendarId: config.calendarId,
      eventId,
      requestBody: updateData,
      sendUpdates: 'all', // Notify attendees
    })

    const meetLink = response.data.hangoutLink || response.data.conferenceData?.entryPoints?.find(
      (entry) => entry.entryPointType === 'video'
    )?.uri

    return {
      success: true,
      meetLink: meetLink || undefined,
      eventId: response.data.id || undefined,
    }
  } catch (error: any) {
    console.error('Failed to update calendar event:', error)
    return {
      success: false,
      error: error.message || 'Failed to update calendar event',
    }
  }
}
