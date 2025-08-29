# Email Testing Guide

## Overview
This guide explains how to test the **real email functionality** of your contact form using Playwright. The contact form integrates with the Resend API to send actual emails.

## ⚠️ Important Notes

- **Real emails are sent** when running the email test
- **Never run email tests in CI/CD** environments
- **Use test email addresses** you can access
- **Monitor your Resend dashboard** for email delivery status

## Prerequisites

### 1. Environment Variables
Ensure these are set in your `.env` file:

```bash
# Resend API configuration
RESEND_API_KEY=your_resend_api_key_here

# Email addresses
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=hello@example.com  # Where you want to receive test emails
```

### 2. Resend API Key
- Get your API key from [Resend Dashboard](https://resend.com/api-keys)
- Ensure your domain is verified in Resend
- Check your sending limits and quotas

## Test Commands

### Run Only Email Test
```bash
# Send a real email through the contact form
pnpm test:email

# Or use Playwright directly
npx playwright test tests/e2e/contact.spec.ts -g "should send real email through Resend API"
```

### Run All Tests EXCEPT Email Test
```bash
# Run all tests without sending emails
pnpm test:no-email

# Or use Playwright directly
npx playwright test tests/e2e/contact.spec.ts --grep-invert "should send real email through Resend API"
```

### Run All Tests (Including Email)
```bash
# ⚠️  WARNING: This will send a real email
pnpm test
```

## What the Email Test Does

### Test Data Used
- **Name**: "Playwright Test User"
- **Email**: "test@example.com" (configurable)
- **Phone**: "+1234567890"
- **Subject**: "Feedback & Suggestions"
- **Message**: "This is a real email test from Playwright automation. Please ignore this message."

### Email Content
The test email will contain:
- **Subject**: "Contact Form: Feedback & Suggestions"
- **HTML Content**: Formatted email with all form data
- **Sender**: Your configured FROM_EMAIL
- **Recipient**: Your configured TO_EMAIL

## Verifying Email Delivery

### 1. Check Your Inbox
- Look for emails sent to your `TO_EMAIL` address
- Check spam/junk folders
- Verify email content matches test data

### 2. Resend Dashboard
- Log into [Resend Dashboard](https://resend.com)
- Check the "Activity" tab for sent emails
- Verify delivery status and any bounces

### 3. Email Headers
- Check email headers for Resend routing
- Verify sender domain authentication
- Look for any delivery delays

## Troubleshooting

### Email Not Received

#### Check Environment Variables
```bash
# Verify your .env file has correct values
cat .env | grep -E "(RESEND|EMAIL)"
```

#### Verify Resend API Key
```bash
# Test API key validity (replace with your actual key)
curl -X GET "https://api.resend.com/domains" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Check Resend Dashboard
- Verify domain verification status
- Check sending limits and quotas
- Look for any account restrictions

### API Errors

#### Common Error Codes
- **401**: Invalid API key
- **403**: Domain not verified
- **429**: Rate limit exceeded
- **500**: Resend service error

#### Debug API Calls
Check your browser's Network tab or server logs for:
- Request/response details
- Error messages
- HTTP status codes

### Form Submission Issues

#### Check Browser Console
- Look for JavaScript errors
- Verify form data is being sent
- Check for network request failures

#### Verify Form Validation
- Ensure all required fields are filled
- Check file upload restrictions
- Verify consent checkbox is checked

## Best Practices

### 1. Test Email Addresses
- Use real email addresses you control
- Avoid disposable email services
- Test with different email providers (Gmail, Outlook, etc.)

### 2. Test Frequency
- Limit email tests to development/testing phases
- Don't run email tests in production
- Use different test data for each run

### 3. Monitor Quotas
- Track your Resend sending limits
- Monitor email delivery rates
- Check for any bounces or complaints

### 4. Security Considerations
- Never commit API keys to version control
- Use environment variables for sensitive data
- Rotate API keys regularly

## Integration with CI/CD

### Skip Email Tests in CI
```yaml
# GitHub Actions example
- name: Run Tests (No Email)
  run: pnpm test:no-email
  env:
    CI: true
```

### Conditional Email Testing
```bash
# Only run email tests when explicitly requested
if [ "$RUN_EMAIL_TESTS" = "true" ]; then
  pnpm test:email
else
  pnpm test:no-email
fi
```

## Monitoring and Alerts

### Email Delivery Metrics
- Track successful email sends
- Monitor bounce rates
- Check delivery delays

### Error Notifications
- Set up alerts for API failures
- Monitor form submission errors
- Track validation failures

## Support

### Resend Support
- [Resend Documentation](https://resend.com/docs)
- [Resend Status Page](https://status.resend.com)
- [Resend Support](https://resend.com/support)

### Project Issues
- Check the [troubleshooting guide](../troubleshooting.md)
- Review [API implementation](../src/pages/api/contact.ts)
- Check [Playwright configuration](../playwright.config.ts)

## Example Test Run

```bash
# Start development server
pnpm dev

# In another terminal, run email test
pnpm test:email

# Expected output:
# ✓ [chromium] › tests/e2e/contact.spec.ts:8:3 › Contact Page › [INTEGRATION]-[CONTACT]-[P1]-[018] should send real email through Resend API (3.2s)
# 
# 1 passed (3.2s)
# 
# Note: Real email was sent - check your inbox and configured TO_EMAIL address
```

## Summary

The email test provides **end-to-end verification** that your contact form:
1. ✅ Collects form data correctly
2. ✅ Validates input properly
3. ✅ Submits to the API successfully
4. ✅ Sends real emails through Resend
5. ✅ Handles success/error states
6. ✅ Resets the form after submission

Use this test to verify your email functionality works in production before deploying to users.
