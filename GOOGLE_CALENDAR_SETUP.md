# Google Calendar API Setup Guide

This guide will help you set up Google Calendar API with a service account to create real Google Meet links for demo bookings.

## Prerequisites

- A Google Account
- Access to Google Cloud Console

## Total Time: ~10 minutes

---

## Step 1: Create a Google Cloud Project (2 minutes)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** at the top
3. Click **"NEW PROJECT"**
4. Enter project name: `GrowRipple Booking` (or any name you prefer)
5. Click **"CREATE"**
6. Wait for the project to be created, then select it

---

## Step 2: Enable Google Calendar API (1 minute)

1. In the Google Cloud Console, make sure your project is selected
2. Go to **"APIs & Services"** > **"Library"** (or click [here](https://console.cloud.google.com/apis/library))
3. Search for **"Google Calendar API"**
4. Click on **"Google Calendar API"**
5. Click **"ENABLE"**

---

## Step 3: Create a Service Account (3 minutes)

1. Go to **"APIs & Services"** > **"Credentials"** (or click [here](https://console.cloud.google.com/apis/credentials))
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"Service account"**
4. Fill in the details:
   - **Service account name**: `calendar-booking-service`
   - **Service account ID**: (auto-generated, keep as is)
   - **Description**: `Service account for creating calendar events with Google Meet links`
5. Click **"CREATE AND CONTINUE"**
6. For **"Grant this service account access to project"**:
   - Skip this step (not required)
   - Click **"CONTINUE"**
7. For **"Grant users access to this service account"**:
   - Skip this step (not required)
   - Click **"DONE"**

---

## Step 4: Create Service Account Key (2 minutes)

1. You should now see your service account in the list
2. Click on the **service account email** (looks like: `calendar-booking-service@your-project.iam.gserviceaccount.com`)
3. Go to the **"KEYS"** tab
4. Click **"ADD KEY"** > **"Create new key"**
5. Select **"JSON"** format
6. Click **"CREATE"**
7. A JSON file will be downloaded to your computer
8. **IMPORTANT**: Keep this file secure! It contains your private key

---

## Step 5: Share Your Google Calendar with the Service Account (2 minutes)

The service account needs access to your Google Calendar to create events.

### Option A: Use Your Personal Calendar (Recommended)

1. Open [Google Calendar](https://calendar.google.com/)
2. On the left sidebar, find **"My calendars"**
3. Hover over your calendar and click the **three dots** (⋮)
4. Click **"Settings and sharing"**
5. Scroll down to **"Share with specific people"**
6. Click **"+ Add people"**
7. Enter the **service account email** from Step 3 (e.g., `calendar-booking-service@your-project.iam.gserviceaccount.com`)
8. Set permission to **"Make changes to events"**
9. Click **"Send"**
10. Copy your **Calendar ID**:
    - Still in calendar settings, scroll down to **"Integrate calendar"**
    - Copy the **"Calendar ID"** (looks like: `your-email@gmail.com`)

### Option B: Use Service Account's Calendar

- Use `primary` as the Calendar ID
- Note: Events will be created on the service account's calendar, not your personal calendar

---

## Step 6: Configure Environment Variables (2 minutes)

1. Open the downloaded JSON file from Step 4
2. Find these values in the JSON:
   - `client_email` → This is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → This is your `GOOGLE_PRIVATE_KEY`

3. Open your `.env.local` file in the project
4. Update these values:

```bash
# Service account email from the JSON file
GOOGLE_SERVICE_ACCOUNT_EMAIL=calendar-booking-service@your-project.iam.gserviceaccount.com

# Private key from the JSON file
# IMPORTANT: Keep the quotes and the \n characters!
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...(rest of key)...=\n-----END PRIVATE KEY-----\n"

# Calendar ID from Step 5
# Use your email if you shared your personal calendar
# Or use 'primary' if using service account's calendar
GOOGLE_CALENDAR_ID=your-email@gmail.com
```

**IMPORTANT NOTES:**
- Keep the quotes around `GOOGLE_PRIVATE_KEY`
- Keep the `\n` characters in the private key
- You can copy the entire `private_key` value from the JSON file directly

---

## Step 7: Test the Integration

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Go to your booking page: `http://localhost:3000/book-demo`
3. Fill out the form and select a date/time
4. Submit the booking
5. Check:
   - ✅ You should receive an email with a real Google Meet link
   - ✅ The event should appear in your Google Calendar
   - ✅ Clicking the Meet link should take you to a real Google Meet room

---

## Troubleshooting

### Error: "Google Calendar authentication failed"
- Check that `GOOGLE_SERVICE_ACCOUNT_EMAIL` matches the email from the JSON file
- Verify that `GOOGLE_PRIVATE_KEY` is correctly formatted with `\n` characters

### Error: "Permission denied"
- Make sure you shared your calendar with the service account (Step 5)
- Verify the Calendar ID is correct

### Error: "Failed to generate Google Meet link"
- Ensure Google Calendar API is enabled (Step 2)
- Check that the service account has "Make changes to events" permission

### No event appears in calendar
- Check if you're using the correct `GOOGLE_CALENDAR_ID`
- Verify the service account has access to that calendar

---

## Security Best Practices

1. **Never commit the JSON file to version control**
   - Add `*.json` to your `.gitignore` if using service account keys

2. **Rotate API keys immediately** if exposed
   - Revoke compromised keys in Google Cloud Console
   - Create new keys

3. **Use environment variables**
   - Never hardcode credentials in your source code
   - Use `.env.local` for local development
   - Use secure environment variable management in production (Vercel, etc.)

4. **Limit service account permissions**
   - Only grant Calendar access, nothing else
   - Only share with specific calendars needed

---

## Cost

**Google Calendar API is FREE** for up to 1,000,000 requests per day. For a typical booking website, you'll use only a fraction of this limit.

---

## Need Help?

- [Google Calendar API Documentation](https://developers.google.com/calendar/api/guides/overview)
- [Service Account Documentation](https://cloud.google.com/iam/docs/service-accounts)
- [Google Meet in Calendar Events](https://developers.google.com/calendar/api/guides/create-events#conferencing)

---

**You're all set!** Your demo booking system now creates real Google Calendar events with Google Meet links. 🎉
