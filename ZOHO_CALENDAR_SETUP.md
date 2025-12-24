# Zoho Calendar Setup Guide

This guide will walk you through setting up Zoho Calendar API integration for your demo booking system with automatic Zoho Meeting link generation.

## Overview

The booking system uses:
- **Zoho Calendar API** for creating calendar events
- **Zoho Meeting API** for generating video conference links
- **OAuth 2.0** with refresh tokens for authentication

## Prerequisites

- A Zoho account (free or paid)
- Access to Zoho Calendar
- Access to Zoho API Console

---

## Step 1: Create a Zoho API Console Application

### 1.1 Access Zoho API Console

1. Go to [Zoho API Console](https://api-console.zoho.com/)
2. Sign in with your Zoho account
3. Click **"Get Started"** or **"Add Client"**

### 1.2 Register Your Application

1. Select **"Server-based Applications"** as the client type
2. Fill in the application details:
   - **Client Name**: `Demo Booking System` (or your preferred name)
   - **Homepage URL**: Your website URL (e.g., `https://yourwebsite.com`)
   - **Authorized Redirect URIs**:
     - For development: `http://localhost:3000/api/auth/zoho/callback`
     - For production: `https://yourwebsite.com/api/auth/zoho/callback`
3. Click **"Create"**

### 1.3 Save Your Credentials

After creating the client, you'll see:
- **Client ID**: Save this for your `.env` file
- **Client Secret**: Save this for your `.env` file

**IMPORTANT**: Keep these credentials secure and never commit them to version control!

---

## Step 2: Generate Refresh Token

### 2.1 Get Authorization Code

1. In the Zoho API Console, go to your client
2. Click on **"Generate Code"** tab (or use the following URL):

```
https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCalendar.calendar.ALL,ZohoMeeting.meeting.CREATE&client_id=YOUR_CLIENT_ID&response_type=code&access_type=offline&redirect_uri=YOUR_REDIRECT_URI
```

Replace:
- `YOUR_CLIENT_ID` with your actual client ID
- `YOUR_REDIRECT_URI` with your redirect URI (must match what you registered)

3. **Required Scopes**:
   - `ZohoCalendar.calendar.ALL` - Full access to calendar
   - `ZohoMeeting.meeting.CREATE` - Create Zoho Meetings

4. Authorize the application - you'll be redirected to a URL with a `code` parameter
5. Copy the `code` from the URL (it looks like: `1000.xxxxx.yyyy`)

### 2.2 Exchange Code for Refresh Token

Use this API call to exchange the authorization code for a refresh token:

```bash
curl -X POST "https://accounts.zoho.com/oauth/v2/token" \
  -d "code=YOUR_AUTHORIZATION_CODE" \
  -d "client_id=YOUR_CLIENT_ID" \
  -d "client_secret=YOUR_CLIENT_SECRET" \
  -d "redirect_uri=YOUR_REDIRECT_URI" \
  -d "grant_type=authorization_code"
```

**Response** will contain:
```json
{
  "access_token": "1000.xxxx.yyyy",
  "refresh_token": "1000.zzzz.wwww",
  "expires_in": 3600,
  "api_domain": "https://www.zohoapis.com",
  "token_type": "Bearer"
}
```

**Save the `refresh_token`** - this is what you'll use in your `.env` file!

---

## Step 3: Get Your Zoho Calendar ID

### Option A: Using Zoho Calendar Web Interface

1. Go to [Zoho Calendar](https://calendar.zoho.com/)
2. Click on **Settings** (gear icon)
3. Select **"Calendars"** from the left menu
4. Click on the calendar you want to use
5. Look for **"Calendar URL"** or **"Calendar ID"**
6. The Calendar ID is typically your email address or a unique identifier

### Option B: Using the API

```bash
curl -X GET "https://calendar.zoho.com/api/v1/calendars" \
  -H "Authorization: Zoho-oauthtoken YOUR_ACCESS_TOKEN"
```

This will return a list of your calendars with their IDs.

---

## Step 4: Configure Environment Variables

Create or update your `.env.local` file in the project root:

```bash
# Zoho Calendar API Configuration
ZOHO_CLIENT_ID=1000.XXXXXXXXX.YYYYYYYYYY
ZOHO_CLIENT_SECRET=your_client_secret_here
ZOHO_REFRESH_TOKEN=1000.zzzzzzzzz.wwwwwwww
ZOHO_CALENDAR_ID=your_calendar_id_here
ZOHO_REGION=com
ZOHO_ENABLE_MEETING=true
ZOHO_ORGANIZATION_ID=your_zoho_organization_id_here

# Other required variables
ADMIN_EMAIL=your-admin@example.com
MAILGUN_API_KEY=your_mailgun_key
MAILGUN_DOMAIN=your_domain.com
```

### Zoho Region Options:

- `com` - United States (zoho.com)
- `eu` - Europe (zoho.eu)
- `in` - India (zoho.in)
- `au` - Australia (zoho.com.au)
- `jp` - Japan (zoho.jp)

Choose the region where your Zoho account is registered.

### Getting Your Zoho Organization ID (ZSOID):

If you have `ZOHO_ENABLE_MEETING=true`, you need to provide your Zoho Organization ID:

1. Log in to your Zoho Meeting account
2. Go to **Settings** or **Profile**
3. Look for **Organization ID** or **ZSOID**
4. Alternatively, you can find it in the URL when you're logged into Zoho Meeting: `https://meeting.zoho.com/{YOUR_ORG_ID}/...`

**Note**: This is only required if you want to create Zoho Meeting links. If you only need calendar events without meeting links, you can set `ZOHO_ENABLE_MEETING=false`.

---

## Step 5: Install Dependencies

Run the following command in your project directory:

```bash
cd influencer-website
npm install
```

This will install the required `axios` package for making API calls to Zoho.

---

## Step 6: Test Your Integration

### 6.1 Run the Development Server

```bash
npm run dev
```

### 6.2 Test a Booking

1. Navigate to `http://localhost:3000/book-demo`
2. Fill out the booking form
3. Submit the form
4. Check:
   - ✅ Confirmation email received
   - ✅ Event appears in Zoho Calendar
   - ✅ Zoho Meeting link is included (if enabled)
   - ✅ Admin notification email received

### 6.3 Check the Console

Look for these log messages:
- ✅ "Confirmation email sent to customer"
- ✅ "Notification email sent to admin"
- ✅ No error messages about Zoho authentication

---

## Troubleshooting

### Issue: "Failed to authenticate with Zoho Calendar API"

**Solutions:**
1. Verify your `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, and `ZOHO_REFRESH_TOKEN` are correct
2. Ensure the refresh token was generated with the correct scopes
3. Check that your Zoho region is correct (e.g., `com`, `eu`, `in`)
4. Try generating a new refresh token

### Issue: "Permission denied" or 403 errors

**Solutions:**
1. Verify the calendar ID is correct
2. Ensure you have permission to create events in that calendar
3. Check that the required scopes are granted: `ZohoCalendar.calendar.ALL`
4. Verify your Zoho account has access to the calendar

### Issue: "Calendar not found" or 404 errors

**Solutions:**
1. Double-check your `ZOHO_CALENDAR_ID` in the `.env.local` file
2. Use the Zoho Calendar API to list your calendars and find the correct ID
3. Ensure you're using the correct region in `ZOHO_REGION`

### Issue: Zoho Meeting links not being created

**Solutions:**
1. Verify `ZOHO_ENABLE_MEETING=true` in your `.env.local`
2. Ensure your refresh token includes the scope: `ZohoMeeting.meeting.CREATE`
3. Check that your Zoho account has access to Zoho Meeting
4. Meetings may not be available on free Zoho accounts - check your subscription

### Issue: "Invalid refresh token"

**Solutions:**
1. Refresh tokens can expire - generate a new one
2. Ensure you used `access_type=offline` when generating the authorization code
3. Check that the token hasn't been revoked in the Zoho API Console

---

## Security Best Practices

### 1. Protect Your Credentials

- ✅ **NEVER** commit `.env.local` to version control
- ✅ Add `.env.local` to your `.gitignore` file
- ✅ Use environment-specific variables for different environments (dev, staging, prod)

### 2. Rotate Credentials Regularly

- Generate new refresh tokens periodically
- Update client secrets if compromised
- Monitor API usage in Zoho API Console

### 3. Use HTTPS in Production

- Always use HTTPS redirect URIs in production
- Ensure your production website has a valid SSL certificate

### 4. Limit API Scopes

- Only request the minimum required scopes
- Current scopes: `ZohoCalendar.calendar.ALL,ZohoMeeting.meeting.CREATE`

---

## API Rate Limits

Zoho has API rate limits to prevent abuse:

- **Calendar API**: 100 requests per minute per user
- **Meeting API**: Varies by subscription tier

If you hit rate limits:
1. Implement exponential backoff retry logic
2. Cache access tokens (already implemented in `lib/zoho-calendar.ts`)
3. Consider upgrading your Zoho subscription

---

## Differences from Google Calendar

| Feature | Google Calendar | Zoho Calendar |
|---------|----------------|---------------|
| **Authentication** | Service Account | OAuth 2.0 with Refresh Token |
| **Video Meetings** | Google Meet | Zoho Meeting |
| **Date Format** | ISO 8601 | yyyyMMddTHHmmssZ |
| **Rate Limits** | Higher | Lower (tier-dependent) |
| **Free Tier** | More generous | More restrictive |

---

## Additional Resources

- [Zoho Calendar API Documentation](https://www.zoho.com/calendar/help/api/)
- [Zoho Meeting API Documentation](https://www.zoho.com/meeting/api/)
- [Zoho OAuth 2.0 Guide](https://www.zoho.com/accounts/protocol/oauth.html)
- [Zoho API Console](https://api-console.zoho.com/)

---

## Getting Help

If you encounter issues:

1. Check the console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test your API credentials using curl or Postman
4. Review the Zoho API documentation
5. Contact Zoho support for API-related issues

---

## Migration from Google Calendar

If you're migrating from Google Calendar:

1. ✅ Updated `lib/google-calendar.ts` → `lib/zoho-calendar.ts`
2. ✅ Updated environment variables
3. ✅ Updated `pages/api/book-demo.ts` imports
4. ✅ Updated `package.json` dependencies (removed googleapis, added axios)
5. ⚠️ Export existing calendar events if needed (manual process)
6. ⚠️ Update any calendar sharing/permissions
7. ⚠️ Notify users of the change if public-facing

---

## Support

For application-specific issues, check:
- Application logs in the console
- Network tab in browser DevTools
- Mailgun logs for email delivery issues

For Zoho API issues:
- [Zoho Support](https://help.zoho.com/)
- [Zoho Community Forums](https://help.zoho.com/portal/community)
