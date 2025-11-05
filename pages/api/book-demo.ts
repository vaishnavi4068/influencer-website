import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface BookingRequest {
  name: string
  email: string
  company?: string
  message?: string
  date: string
  time: string
  timezone: string
}

interface BookingResponse {
  success: boolean
  meetLink?: string
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
    const booking: BookingRequest = req.body

    // Validate required fields
    if (!booking.name || !booking.email || !booking.date || !booking.time) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, date, and time are required'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(booking.email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format'
      })
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return res.status(500).json({
        success: false,
        error: 'Email service is not configured. Please contact support.'
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

    // Generate a placeholder Meet link
    // TODO: Replace with actual Google Calendar API integration
    const meetLink = `https://meet.google.com/${generateMeetCode()}`

    // Format the date nicely
    const bookingDate = new Date(booking.date)
    const formattedDate = bookingDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: booking.timezone
    })

    // Send confirmation email to customer
    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
        to: booking.email,
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
                  <p>Hi ${booking.name},</p>

                  <p>Your demo call with Microdrive.Ai has been confirmed!</p>

                  <div class="details">
                    <h3>📅 Meeting Details</h3>
                    <p><strong>Date:</strong> ${formattedDate}</p>
                    <p><strong>Time:</strong> ${booking.time}</p>
                    <p><strong>Timezone:</strong> ${booking.timezone}</p>
                    ${booking.company ? `<p><strong>Company:</strong> ${booking.company}</p>` : ''}
                    ${booking.message ? `<p><strong>Your Message:</strong> ${booking.message}</p>` : ''}
                  </div>

                  <center>
                    <a href="${meetLink}" class="button">Join Google Meet</a>
                  </center>

                  <p>We'll send you a reminder before the meeting. If you need to reschedule, please contact us.</p>

                  <p>Looking forward to speaking with you!</p>

                  <p>Best regards,<br>The Microdrive.Ai Team</p>
                </div>
                <div class="footer">
                  <p>Microdrive.Ai - AI-Powered Influencer Marketing Platform</p>
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
        await resend.emails.send({
          from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
          to: process.env.ADMIN_EMAIL,
          subject: `🔔 New Demo Booking: ${booking.name}`,
          html: `
            <!DOCTYPE html>
            <html>
              <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2>New Demo Booking Received</h2>

                <h3>Customer Details:</h3>
                <ul>
                  <li><strong>Name:</strong> ${booking.name}</li>
                  <li><strong>Email:</strong> ${booking.email}</li>
                  ${booking.company ? `<li><strong>Company:</strong> ${booking.company}</li>` : ''}
                </ul>

                <h3>Meeting Details:</h3>
                <ul>
                  <li><strong>Date:</strong> ${formattedDate}</li>
                  <li><strong>Time:</strong> ${booking.time}</li>
                  <li><strong>Timezone:</strong> ${booking.timezone}</li>
                </ul>

                ${booking.message ? `
                  <h3>Customer Message:</h3>
                  <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${booking.message}</p>
                ` : ''}

                <p><a href="${meetLink}" style="display: inline-block; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">Join Meeting</a></p>
              </body>
            </html>
          `,
        })
        console.log('Notification email sent to admin')
      } catch (emailError: any) {
        console.error('Failed to send admin email:', emailError)
      }
    }

    // Return success response
    return res.status(200).json({
      success: true,
      meetLink
    })

  } catch (error: any) {
    console.error('Booking API error:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error. Please try again later.'
    })
  }
}

// Helper function to generate a random Google Meet-style code
function generateMeetCode(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz'
  const segments = 3
  const segmentLength = 3

  const code = Array.from({ length: segments }, () => {
    return Array.from({ length: segmentLength }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('')
  }).join('-')

  return code
}
