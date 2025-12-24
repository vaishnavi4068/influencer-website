import axios, { AxiosInstance } from 'axios'

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

interface ZohoCalendarConfig {
  clientId: string
  clientSecret: string
  refreshToken: string
  calendarId: string
  region: string
  enableMeeting: boolean
  organizationId?: string
}

interface ZohoTokenResponse {
  access_token: string
  expires_in: number
  api_domain: string
  token_type: string
}

let cachedAccessToken: string | null = null
let tokenExpiryTime: number = 0

/**
 * Gets the Zoho Calendar configuration from environment variables
 */
function getZohoCalendarConfig(): ZohoCalendarConfig {
  const clientId = (process.env.ZOHO_CLIENT_ID || '').trim()
  const clientSecret = (process.env.ZOHO_CLIENT_SECRET || '').trim()
  const refreshToken = (process.env.ZOHO_REFRESH_TOKEN || '').trim()
  const calendarId = (process.env.ZOHO_CALENDAR_ID || '').trim()
  const region = (process.env.ZOHO_REGION || 'com').trim()
  const enableMeeting = process.env.ZOHO_ENABLE_MEETING === 'true'
  const organizationId = (process.env.ZOHO_ORGANIZATION_ID || '').trim()

  if (!clientId) {
    throw new Error('ZOHO_CLIENT_ID is not configured')
  }
  if (!clientSecret) {
    throw new Error('ZOHO_CLIENT_SECRET is not configured')
  }
  if (!refreshToken) {
    throw new Error('ZOHO_REFRESH_TOKEN is not configured')
  }
  if (!calendarId) {
    throw new Error('ZOHO_CALENDAR_ID is not configured')
  }
  if (enableMeeting && !organizationId) {
    throw new Error('ZOHO_ORGANIZATION_ID is required when ZOHO_ENABLE_MEETING is true')
  }

  return {
    clientId,
    clientSecret,
    refreshToken,
    calendarId,
    region,
    enableMeeting,
    organizationId: organizationId || undefined,
  }
}

/**
 * Gets a fresh access token using the refresh token
 */
async function getAccessToken(config: ZohoCalendarConfig): Promise<string> {
  // Return cached token if still valid
  if (cachedAccessToken && Date.now() < tokenExpiryTime) {
    return cachedAccessToken
  }

  try {
    const response = await axios.post<ZohoTokenResponse>(
      `https://accounts.zoho.${config.region}/oauth/v2/token`,
      null,
      {
        params: {
          refresh_token: config.refreshToken,
          client_id: config.clientId,
          client_secret: config.clientSecret,
          grant_type: 'refresh_token',
        },
      }
    )

    cachedAccessToken = response.data.access_token
    // Set expiry to 5 minutes before actual expiry for safety
    tokenExpiryTime = Date.now() + (response.data.expires_in - 300) * 1000

    return cachedAccessToken
  } catch (error: any) {
    console.error('Failed to get Zoho access token:', error?.response?.data || error.message)
    throw new Error('Failed to authenticate with Zoho Calendar API')
  }
}

/**
 * Creates an authenticated Axios instance for Zoho API calls
 */
async function getZohoApiClient(config: ZohoCalendarConfig): Promise<AxiosInstance> {
  const accessToken = await getAccessToken(config)

  return axios.create({
    baseURL: `https://calendar.zoho.${config.region}/api/v1`,
    headers: {
      Authorization: `Zoho-oauthtoken ${accessToken}`,
    },
  })
}

/**
 * Formats date to Zoho Calendar format (yyyyMMddTHHmmss without Z for timezone)
 */
function formatZohoDateTime(date: Date): string {
  // Remove the Z suffix as we're specifying timezone separately
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z/, '')
}

/**
 * Gets the current user's ZUID (Zoho User ID) for use as presenter
 */
async function getZohoUserZUID(config: ZohoCalendarConfig): Promise<string | undefined> {
  try {
    const accessToken = await getAccessToken(config)
    const response = await axios.get(
      `https://meeting.zoho.${config.region}/api/v2/user.json`,
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
    )

    const zuid = response.data?.userDetails?.zuid
    if (zuid) {
      console.log('✓ Got Zoho User ZUID:', zuid)
      return zuid.toString()
    }

    console.warn('⚠ Could not get ZUID from user API response:', response.data)
    return undefined
  } catch (error: any) {
    console.error('Failed to get Zoho user ZUID:', error?.response?.data || error.message)
    return undefined
  }
}

/**
 * Creates a Zoho Meeting and returns the meeting link
 */
async function createZohoMeeting(
  config: ZohoCalendarConfig,
  summary: string,
  startTime: Date,
  endTime: Date,
  attendees: string[]
): Promise<string | undefined> {
  try {
    if (!config.organizationId) {
      console.warn('⚠ ZOHO_ORGANIZATION_ID not configured, skipping Zoho Meeting creation')
      return undefined
    }

    console.log('Creating Zoho Meeting with Organization ID:', config.organizationId)

    // Get presenter ZUID from environment variable or fallback to API
    let presenterZUID = process.env.ZOHO_PRESENTER_ZUID

    if (!presenterZUID) {
      console.log('No ZOHO_PRESENTER_ZUID found in env, attempting to fetch via API...')
      presenterZUID = await getZohoUserZUID(config)
    } else {
      console.log('✓ Using ZOHO_PRESENTER_ZUID from env:', presenterZUID)
    }

    if (!presenterZUID) {
      console.warn('⚠ Could not get presenter ZUID, skipping Zoho Meeting creation')
      return undefined
    }

    const accessToken = await getAccessToken(config)
    const meetingClient = axios.create({
      baseURL: `https://meeting.zoho.${config.region}/api/v2`,
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })

    // Format start time as "MMM DD, YYYY hh:mm AM/PM" (Zoho Meeting API format)
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = monthNames[startTime.getUTCMonth()]
    const day = startTime.getUTCDate()
    const year = startTime.getUTCFullYear()
    let hours = startTime.getUTCHours()
    const minutes = startTime.getUTCMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12 // Convert to 12-hour format
    const formattedStartTime = `${month} ${day}, ${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`

    const meetingData = {
      session: {
        topic: summary,
        agenda: summary,
        startTime: formattedStartTime,
        duration: Math.round((endTime.getTime() - startTime.getTime()) / 60000), // Duration in minutes
        timezone: 'UTC',
        presenter: presenterZUID,
        participants: attendees.map((email) => ({ email })),
      },
    }

    console.log('Zoho Meeting request data:', JSON.stringify(meetingData, null, 2))
    console.log('Zoho Meeting API endpoint:', `/${config.organizationId}/sessions.json`)

    // Zoho Meeting API requires ZSOID (organization ID) in the path and .json extension
    const response = await meetingClient.post(
      `/${config.organizationId}/sessions.json`,
      meetingData
    )

    console.log('Zoho Meeting API response:', JSON.stringify(response.data, null, 2))

    if (response.data?.session?.joinurl || response.data?.session?.joinLink) {
      const joinLink = response.data.session.joinurl || response.data.session.joinLink
      console.log('✓ Zoho Meeting created successfully:', joinLink)
      return joinLink
    }

    console.warn('⚠ Zoho Meeting response missing joinurl/joinLink:', response.data)
    return undefined
  } catch (error: any) {
    console.error('❌ Failed to create Zoho Meeting:')
    console.error('  Status:', error?.response?.status)
    console.error('  Error data:', JSON.stringify(error?.response?.data, null, 2))
    console.error('  Error message:', error.message)
    return undefined
  }
}

/**
 * Creates a Zoho Calendar event with optional Zoho Meeting link
 */
export async function createCalendarEvent(
  event: CalendarEvent
): Promise<CreateEventResponse> {
  let calendarId = ''

  try {
    const config = getZohoCalendarConfig()
    calendarId = config.calendarId
    const client = await getZohoApiClient(config)

    let meetLink: string | undefined = undefined

    // Create Zoho Meeting if enabled
    if (config.enableMeeting) {
      console.log('Zoho Meeting enabled - attempting to create meeting link...')
      meetLink = await createZohoMeeting(
        config,
        event.summary,
        event.startTime,
        event.endTime,
        event.attendees
      )
      if (meetLink) {
        console.log('✓ Zoho Meeting link created:', meetLink)
      } else {
        console.warn('⚠ Zoho Meeting link creation failed - will use calendar event link as fallback')
      }
    } else {
      console.log('Zoho Meeting is disabled (ZOHO_ENABLE_MEETING != true)')
    }

    // Prepare event data for Zoho Calendar
    let description = event.description
    if (meetLink) {
      description += `\n\nJoin Meeting: ${meetLink}`
    }

    // Format attendees array for Zoho Calendar API
    const attendees = event.attendees.map((email) => ({
      email,
      status: 'NEEDS-ACTION',
    }))

    // Build the eventdata JSON object as per Zoho Calendar API docs
    const eventData = {
      title: event.summary,
      dateandtime: {
        timezone: event.timeZone,
        start: formatZohoDateTime(event.startTime),
        end: formatZohoDateTime(event.endTime),
      },
      attendees,
      description,
      location: meetLink ? 'Online (Zoho Meeting)' : '',
    }

    console.log('Sending to Zoho Calendar:', JSON.stringify(eventData, null, 2))

    // Try sending as request body first (more standard REST approach)
    let response
    try {
      response = await client.post(`/calendars/${calendarId}/events`, {
        eventdata: [eventData]
      })
      console.log('✓ Calendar event created via POST body')
    } catch (bodyError: any) {
      console.log('POST body method failed, trying query parameter method...')
      // Fallback: Send eventdata as a query parameter with JSON value (per Zoho API docs)
      response = await client.post(
        `/calendars/${calendarId}/events?eventdata=${encodeURIComponent(JSON.stringify(eventData))}`
      )
      console.log('✓ Calendar event created via query parameter')
    }

    console.log('Zoho Calendar response:', JSON.stringify(response.data, null, 2))

    // Check various possible response formats from Zoho
    if (response.data?.eventdata?.[0]) {
      const createdEvent = response.data.eventdata[0]
      return {
        success: true,
        meetLink: meetLink || undefined,
        eventId: createdEvent.uid || createdEvent.id || undefined,
      }
    }

    // Check if response has events array instead
    if (response.data?.events?.[0]) {
      const createdEvent = response.data.events[0]
      // Use Zoho Meeting link if available, otherwise use the viewEventURL as fallback
      const finalMeetLink = meetLink || createdEvent.viewEventURL || undefined
      return {
        success: true,
        meetLink: finalMeetLink,
        eventId: createdEvent.uid || createdEvent.id || createdEvent.etag || undefined,
      }
    }

    // Check if response has a direct event object
    if (response.data?.uid || response.data?.id) {
      return {
        success: true,
        meetLink: meetLink || undefined,
        eventId: response.data.uid || response.data.id || undefined,
      }
    }

    // If response status is 2xx but no event data found, log the full response
    console.error('Unexpected Zoho Calendar response format:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    })

    throw new Error('No event data returned from Zoho Calendar API')
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error.message
    const errorCode = error?.response?.status
    const errorDetails = error?.response?.data

    console.error('Failed to create Zoho Calendar event:', {
      code: errorCode,
      message: errorMessage,
      calendarId,
      fullError: JSON.stringify(errorDetails, null, 2),
      rawError: error?.response?.data || error,
    })

    // Provide more specific error messages
    if (errorCode === 401) {
      return {
        success: false,
        error: 'Zoho Calendar authentication failed. Please check your credentials.',
      }
    }

    if (errorCode === 403) {
      return {
        success: false,
        error: `Permission denied. Ensure the calendar ID "${calendarId}" is correct and accessible.`,
      }
    }

    if (errorCode === 404) {
      return {
        success: false,
        error: `Calendar not found. Please verify the calendar ID "${calendarId}".`,
      }
    }

    return {
      success: false,
      error: errorMessage || 'Failed to create calendar event',
    }
  }
}

/**
 * Deletes a Zoho Calendar event
 */
export async function deleteCalendarEvent(eventId: string): Promise<boolean> {
  try {
    const config = getZohoCalendarConfig()
    const client = await getZohoApiClient(config)

    await client.delete(`/calendars/${config.calendarId}/events/${eventId}`)

    return true
  } catch (error: any) {
    console.error('Failed to delete Zoho Calendar event:', error?.response?.data || error.message)
    return false
  }
}

/**
 * Updates a Zoho Calendar event
 */
export async function updateCalendarEvent(
  eventId: string,
  event: Partial<CalendarEvent>
): Promise<CreateEventResponse> {
  try {
    const config = getZohoCalendarConfig()
    const client = await getZohoApiClient(config)

    const updateData: any = {
      eventdata: [
        {
          uid: eventId,
        },
      ],
    }

    const eventUpdate = updateData.eventdata[0]

    if (event.summary) eventUpdate.title = event.summary
    if (event.description) eventUpdate.description = event.description
    if (event.startTime) {
      eventUpdate.stime = formatZohoDateTime(event.startTime)
      eventUpdate.timezone = event.timeZone || 'UTC'
    }
    if (event.endTime) {
      eventUpdate.etime = formatZohoDateTime(event.endTime)
    }
    if (event.attendees) {
      eventUpdate.participants = event.attendees.map((email) => ({
        email,
        status: 'needs-action',
      }))
    }

    const response = await client.put(`/calendars/${config.calendarId}/events/${eventId}`, updateData)

    if (response.data?.eventdata?.[0]) {
      return {
        success: true,
        eventId: response.data.eventdata[0].uid || eventId,
      }
    }

    return {
      success: true,
      eventId,
    }
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error.message
    console.error('Failed to update Zoho Calendar event:', errorMessage)
    return {
      success: false,
      error: errorMessage || 'Failed to update calendar event',
    }
  }
}
