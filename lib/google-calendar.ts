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

/**
 * Creates a Google Calendar service instance using service account credentials
 */
function getCalendarService() {
  try {
    // Check if required environment variables are set
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_EMAIL is not configured')
    }
    if (!process.env.GOOGLE_PRIVATE_KEY) {
      throw new Error('GOOGLE_PRIVATE_KEY is not configured')
    }
    if (!process.env.GOOGLE_CALENDAR_ID) {
      throw new Error('GOOGLE_CALENDAR_ID is not configured')
    }

    // Parse the private key (it may have escaped newlines)
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')

    // Create JWT client for service account authentication
    const auth = new google.auth.JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
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
  try {
    const calendar = getCalendarService()
    const calendarId = process.env.GOOGLE_CALENDAR_ID

    const allowMeet = process.env.GOOGLE_ENABLE_MEET === 'true'
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
        sendUpdates: 'none',
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
    console.error('Failed to create calendar event:', error)

    // Provide more specific error messages
    if (error.code === 401) {
      return {
        success: false,
        error: 'Google Calendar authentication failed. Please check service account credentials.',
      }
    }

    if (error.code === 403) {
      return {
        success: false,
        error: 'Permission denied. Please ensure the service account has access to the calendar.',
      }
    }

    return {
      success: false,
      error: error.message || 'Failed to create calendar event',
    }
  }
}

/**
 * Deletes a Google Calendar event
 */
export async function deleteCalendarEvent(eventId: string): Promise<boolean> {
  try {
    const calendar = getCalendarService()
    const calendarId = process.env.GOOGLE_CALENDAR_ID

    await calendar.events.delete({
      calendarId: calendarId || '',
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
    const calendar = getCalendarService()
    const calendarId = process.env.GOOGLE_CALENDAR_ID

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
      calendarId: calendarId || '',
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
