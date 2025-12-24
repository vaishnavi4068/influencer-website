import type { NextApiRequest, NextApiResponse } from 'next'
import FormData from 'form-data'
import Mailgun from 'mailgun.js'
import { createCalendarEvent } from '../../lib/zoho-calendar'

const mailgun = new Mailgun(FormData)

interface BookingRequest {
  name: string
  firstName: string
  lastName: string
  email: string
  workEmail: string
  phoneCountryCode: string
  phoneNumber: string
  company: string
  businessType: string
  readiness: string
  message?: string
  date: string
  time: string
  timezone: string
}

interface BookingResponse {
  success: boolean
  meetLink?: string
  eventId?: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookingResponse>
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    // Guard against missing Mailgun config so we fail gracefully instead of throwing at import time
    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      console.error('MAILGUN credentials missing - cannot send booking emails')
      return res.status(500).json({
        success: false,
        error: 'Email service is not configured. Please contact support.'
      })
    }
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY
    })
    const mailFrom = process.env.MAILGUN_FROM || `GrowRipple.ai <noreply@${process.env.MAILGUN_DOMAIN}>`

    const booking: BookingRequest = req.body

    // Validate required fields
    if (!booking.firstName || !booking.lastName || !booking.workEmail || !booking.phoneNumber ||
        !booking.company || !booking.businessType || !booking.readiness || !booking.date || !booking.time) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields. Please fill out all required fields.'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(booking.workEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      })
    }

    // Log the booking (for development)
    console.log('New demo booking received:', {
      name: booking.name,
      email: booking.email,
      company: booking.company,
      date: booking.date,
      time: booking.time,
      timezone: booking.timezone,
      message: booking.message
    })

    // Format the date nicely
    const bookingDate = new Date(booking.date)
    const formattedDate = bookingDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: booking.timezone
    })

    // Parse the selected time and create start/end times
    const [timeStr, period] = booking.time.toLowerCase().split(/(?=[ap]m)/)
    const [hours, minutes] = timeStr.split(':').map(s => parseInt(s.trim()))
    let hour24 = hours
    if (period === 'pm' && hours !== 12) hour24 += 12
    if (period === 'am' && hours === 12) hour24 = 0

    const startTime = new Date(booking.date)
    startTime.setHours(hour24, minutes || 0, 0, 0)

    // Default to 30-minute meeting
    const endTime = new Date(startTime)
    endTime.setMinutes(endTime.getMinutes() + 30)

    // Ensure Zoho Calendar is configured before attempting to create events
    const missingZohoEnv = ['ZOHO_CLIENT_ID', 'ZOHO_CLIENT_SECRET', 'ZOHO_REFRESH_TOKEN', 'ZOHO_CALENDAR_ID']
      .filter((key) => !process.env[key])
    if (missingZohoEnv.length > 0) {
      console.error('Zoho Calendar env vars missing:', missingZohoEnv.join(', '))
      return res.status(500).json({
        success: false,
        error: 'Calendar service is not configured. Please contact support.'
      })
    }

    // Create Zoho Calendar event with Zoho Meeting link
    const calendarResult = await createCalendarEvent({
      summary: `GrowRipple Demo - ${booking.firstName} ${booking.lastName}`,
      description: `Demo booking for ${booking.company}\n\nBusiness Type: ${booking.businessType}\nReadiness: ${booking.readiness}\n\nMessage: ${booking.message || 'No message provided'}`,
      startTime,
      endTime,
      attendees: [booking.workEmail, process.env.ADMIN_EMAIL || ''].filter(Boolean),
      timeZone: booking.timezone,
    })

    // Check if calendar event creation failed
    if (!calendarResult.success) {
      console.error('Failed to create Zoho Calendar event:', calendarResult.error)
      return res.status(500).json({
        success: false,
        error: calendarResult.error || 'Failed to create calendar event. Please try again or contact support.'
      })
    }

    // Use the meeting link if available, otherwise use a placeholder
    const meetLink = calendarResult.meetLink || 'Calendar event created - meeting link will be sent separately'

    if (!calendarResult.meetLink) {
      console.warn('No meeting link was generated for the calendar event')
    }

    // Send confirmation email to customer
    try {
      await mg.messages.create(process.env.MAILGUN_DOMAIN || '', {
        from: mailFrom,
        to: [booking.workEmail],
        subject: `Demo Booking Confirmed - ${formattedDate} at ${booking.time}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 25px; margin: 20px 0; }
                .details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .footer { text-align: center; color: #666; padding: 20px; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎉 Demo Booking Confirmed!</h1>
                </div>
                <div class="content">
                  <p>Hi ${booking.firstName},</p>

                  <p>Your demo call with GrowRipple.ai has been confirmed!</p>

                  <div class="details">
                    <h3>📅 Meeting Details</h3>
                    <p><strong>Date:</strong> ${formattedDate}</p>
                    <p><strong>Time:</strong> ${booking.time}</p>
                    <p><strong>Timezone:</strong> ${booking.timezone}</p>
                    ${booking.company ? `<p><strong>Company:</strong> ${booking.company}</p>` : ''}
                    ${booking.message ? `<p><strong>Your Message:</strong> ${booking.message}</p>` : ''}
                  </div>

                  <center>
                    <a href="${meetLink}" class="button">Join Meeting</a>
                  </center>

                  <p>We'll send you a reminder before the meeting. If you need to reschedule, please contact us.</p>

                  <p>Looking forward to speaking with you!</p>

                  <p>Best regards,<br>The GrowRipple.ai Team</p>
                </div>
                <div class="footer">
                  <p>GrowRipple.ai - AI-Powered Influencer Marketing Platform</p>
                  <p>This is an automated confirmation email.</p>
                </div>
              </div>
            </body>
          </html>
        `,
      })
      console.log('Confirmation email sent to customer')
    } catch (emailError: any) {
      console.error('Failed to send customer email:', emailError)
      // Don't fail the request if email fails
    }

    // Send notification email to admin
    if (process.env.ADMIN_EMAIL) {
      try {
        await mg.messages.create(process.env.MAILGUN_DOMAIN || '', {
          from: mailFrom,
          to: [process.env.ADMIN_EMAIL],
          subject: `🔔 New Demo Booking: ${booking.firstName} ${booking.lastName}`,
          html: `
            <!DOCTYPE html>
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
                  <h2 style="color: #667eea; border-bottom: 3px solid #667eea; padding-bottom: 10px;">📋 New Demo Booking Received</h2>

                  <h3 style="color: #444; margin-top: 25px;">👤 Customer Details:</h3>
                  <table style="width: 100%; background: white; padding: 15px; border-radius: 8px;">
                    <tr>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>First Name:</strong></td>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.firstName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Last Name:</strong></td>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.lastName}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Work Email:</strong></td>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${booking.workEmail}" style="color: #667eea;">${booking.workEmail}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Phone Number:</strong></td>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.phoneCountryCode} ${booking.phoneNumber}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.company}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Business Type:</strong></td>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.businessType}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px;"><strong>Readiness:</strong></td>
                      <td style="padding: 8px;">${booking.readiness}</td>
                    </tr>
                  </table>

                  <h3 style="color: #444; margin-top: 25px;">📅 Meeting Details:</h3>
                  <table style="width: 100%; background: white; padding: 15px; border-radius: 8px;">
                    <tr>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Date:</strong></td>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;">${formattedDate}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Time:</strong></td>
                      <td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.time}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px;"><strong>Timezone:</strong></td>
                      <td style="padding: 8px;">${booking.timezone}</td>
                    </tr>
                  </table>

                  ${booking.message ? `
                    <h3 style="color: #444; margin-top: 25px;">💬 Customer Message:</h3>
                    <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
                      <p style="margin: 0;">${booking.message}</p>
                    </div>
                  ` : ''}

                  <div style="text-align: center; margin-top: 30px;">
                    <a href="${meetLink}" style="display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 25px; font-weight: bold;">Join Meeting</a>
                  </div>

                  <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
                    <p style="color: #666; font-size: 12px; margin: 0;">GrowRipple.ai - AI-Powered Influencer Marketing Platform</p>
                  </div>
                </div>
              </body>
            </html>
          `,
        })
        console.log('Notification email sent to admin')
      } catch (emailError: any) {
        console.error('Failed to send admin email:', emailError)
      }
    }

    // Return success response with real Google Meet link
    return res.status(200).json({
      success: true,
      meetLink,
      eventId: calendarResult.eventId
    })

  } catch (error: any) {
    console.error('Booking API error:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    })
  }
}
