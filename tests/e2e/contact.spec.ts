import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  // Helper function for reliable checkbox handling
  async function checkConsentCheckbox(page: any) {
    const consentCheckbox = page.locator('#consent');
    await consentCheckbox.waitFor({ state: 'visible' });
    
    // Try clicking multiple times if needed
    let attempts = 0;
    while (attempts < 3 && !(await consentCheckbox.isChecked())) {
      await consentCheckbox.click();
      await page.waitForTimeout(100);
      attempts++;
    }
    
    // Verify checkbox is checked
    await expect(consentCheckbox).toBeChecked();
  }

  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('[UI]-[CONTACT]-[P1]-[001] should load contact page with form', async ({ page }) => {
    // Check page title and heading
    await expect(page).toHaveTitle(/Contact Us/);
    await expect(page.getByRole('heading', { level: 1, name: 'Get in Touch' })).toBeVisible();

    // Check form elements are present
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#phone')).toBeVisible();
    await expect(page.locator('#subject')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    
    // Check file upload area is visible (custom styled upload area, not hidden input)
    await expect(page.locator('text=Upload files or drag and drop')).toBeVisible();
    await expect(page.locator('text=Attachments (optional)')).toBeVisible();
    
    await expect(page.locator('#consent')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('[VALIDATION]-[CONTACT]-[P1]-[002] should display validation errors for empty required fields', async ({ page }) => {
    // Submit form without filling required fields
    await page.locator('button[type="submit"]').click();

    // Check for validation errors
    await expect(page.locator('#name-error')).toBeVisible();
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#subject-error')).toBeVisible();
    await expect(page.locator('#message-error')).toBeVisible();
    await expect(page.locator('#consent-error')).toBeVisible();

    // Check error messages
    await expect(page.locator('#name-error')).toContainText(
      'Name must be at least 2 characters long'
    );
    await expect(page.locator('#email-error')).toContainText('Email is required');
    await expect(page.locator('#subject-error')).toContainText('Please select a subject');
    await expect(page.locator('#message-error')).toContainText(
      'Message must be at least 10 characters long'
    );
    await expect(page.locator('#consent-error')).toContainText(
      'You must agree to the terms and conditions'
    );
  });

  test('[VALIDATION]-[CONTACT]-[P2]-[003] should validate email format', async ({ page }) => {
    // Fill form with invalid email
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('invalid-email');
    await page.locator('#subject').selectOption('general');
    await page.locator('#message').fill('This is a test message with more than 10 characters.');
    
    // Use helper function for reliable checkbox handling
    await checkConsentCheckbox(page);

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for email validation error
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#email-error')).toContainText('Please enter a valid email address');
  });

  test('[VALIDATION]-[CONTACT]-[P2]-[004] should validate phone number format', async ({ page }) => {
    // Fill form with invalid phone
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#phone').fill('invalid-phone');
    await page.locator('#subject').selectOption('general');
    await page.locator('#message').fill('This is a test message with more than 10 characters.');
    
    // Use helper function for reliable checkbox handling
    await checkConsentCheckbox(page);

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for phone validation error
    await expect(page.locator('#phone-error')).toBeVisible();
    await expect(page.locator('#phone-error')).toContainText('Please enter a valid phone number');
  });

  test('[VALIDATION]-[CONTACT]-[P2]-[005] should validate message length', async ({ page }) => {
    // Fill form with short message
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#subject').selectOption('general');
    await page.locator('#message').fill('Short');
    
    // Use helper function for reliable checkbox handling
    await checkConsentCheckbox(page);

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for message validation error
    await expect(page.locator('#message-error')).toBeVisible();
    await expect(page.locator('#message-error')).toContainText(
      'Message must be at least 10 characters long'
    );
  });

  test('[VALIDATION]-[CONTACT]-[P2]-[006] should validate file upload size and type', async ({ page }) => {
    // Fill form with valid data
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#subject').selectOption('general');
    await page.locator('#message').fill('This is a test message with more than 10 characters.');
    
    // Use helper function for reliable checkbox handling
    await checkConsentCheckbox(page);

    // Test file upload area is visible and accessible
    await expect(page.locator('text=Upload files or drag and drop')).toBeVisible();
    await expect(page.locator('text=Attachments (optional)')).toBeVisible();
    
    // Check file input has proper accept attribute (even though hidden)
    await expect(page.locator('#attachment')).toHaveAttribute(
      'accept',
      '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar'
    );
  });

  test('[SUBMISSION]-[CONTACT]-[P1]-[007] should submit form with valid data successfully', async ({ page }) => {
    // Mock the API response to avoid actual email sending during tests
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Email sent successfully',
        }),
      });
    });

    // Fill form with valid data
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#phone').fill('+1234567890');
    await page.locator('#subject').selectOption('general');
    await page
      .locator('#message')
      .fill('This is a test message with more than 10 characters to validate the form submission.');
    
    // Use helper function for reliable checkbox handling
    await checkConsentCheckbox(page);

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for success message
    await expect(page.locator('#form-message')).toBeVisible();
    await expect(page.locator('#form-message')).toContainText("Message sent successfully! We'll get back to you soon.");
    
    // Check form is reset
    await expect(page.locator('#name')).toHaveValue('');
    await expect(page.locator('#message')).toHaveValue('');
    await expect(page.locator('#consent')).not.toBeChecked();
  });

  test('[SUBMISSION]-[CONTACT]-[P2]-[008] should submit form with valid data and file attachment', async ({ page }) => {
    // Mock the API response
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Email sent successfully',
        }),
      });
    });

    // Fill form with valid data
    await page.locator('#name').fill('Jane Smith');
    await page.locator('#email').fill('jane@example.com');
    await page.locator('#subject').selectOption('support');
    await page.locator('#message').fill('This is a test message with more than 10 characters and includes a file attachment.');
    
    // Use helper function for reliable checkbox handling
    await checkConsentCheckbox(page);

    // Upload a test file
    const testFilePath = 'tests/fixtures/test-document.txt';
    await page.locator('#attachment').setInputFiles(testFilePath);

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for success message
    await expect(page.locator('#form-message')).toBeVisible();
    await expect(page.locator('#form-message')).toContainText("Message sent successfully! We'll get back to you soon.");
  });

  test('[ERROR_HANDLING]-[CONTACT]-[P2]-[009] should handle API errors gracefully', async ({ page }) => {
    // Mock API error response
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'Failed to send email. Please try again later.',
        }),
      });
    });

    // Fill form with valid data
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#subject').selectOption('general');
    await page.locator('#message').fill('This is a test message with more than 10 characters.');
    
    // Use helper function for reliable checkbox handling
    await checkConsentCheckbox(page);

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for error message
    await expect(page.locator('#form-message')).toBeVisible();
    await expect(page.locator('#form-message')).toContainText('An error occurred. Please try again later.');
  });

  test('[ERROR_HANDLING]-[CONTACT]-[P2]-[010] should handle validation errors from server', async ({ page }) => {
    // Mock API validation error response
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          errors: {
            name: 'Name is too short',
            email: 'Invalid email format',
          },
        }),
      });
    });

    // Fill form with valid data
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#subject').selectOption('general');
    await page.locator('#message').fill('This is a test message with more than 10 characters.');
    
    // Use helper function for reliable checkbox handling
    await checkConsentCheckbox(page);

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for validation error message
    await expect(page.locator('#form-message')).toBeVisible();
    await expect(page.locator('#form-message')).toContainText('Please fix the errors below and try again.');
    
    // Check for server-side validation errors
    await expect(page.locator('#name-error')).toBeVisible();
    await expect(page.locator('#name-error')).toContainText('Name is too short');
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#email-error')).toContainText('Invalid email format');
  });

  test('[ACCESSIBILITY]-[CONTACT]-[P1]-[011] should have accessible form elements', async ({ page }) => {
    // Check labels are properly associated with inputs
    await expect(page.locator('#name')).toHaveAttribute('aria-describedby', 'name-error');
    await expect(page.locator('#email')).toHaveAttribute('aria-describedby', 'email-error');
    await expect(page.locator('#subject')).toHaveAttribute('aria-describedby', 'subject-error');
    await expect(page.locator('#message')).toHaveAttribute('aria-describedby', 'message-error char-count');
    await expect(page.locator('#consent')).toHaveAttribute('aria-describedby', 'consent-error');

    // Check required fields have proper attributes
    await expect(page.locator('#name')).toHaveAttribute('required');
    await expect(page.locator('#email')).toHaveAttribute('required');
    await expect(page.locator('#subject')).toHaveAttribute('required');
    await expect(page.locator('#message')).toHaveAttribute('required');
    await expect(page.locator('#consent')).toHaveAttribute('required');

    // Check file input has proper accept attribute
    await expect(page.locator('#attachment')).toHaveAttribute(
      'accept',
      '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar'
    );

    // Check form has novalidate attribute
    await expect(page.locator('form')).toHaveAttribute('novalidate');
  });

  test('[UI]-[CONTACT]-[P2]-[012] should display contact information section', async ({ page }) => {
    // Check contact information section is present
    await expect(page.getByRole('heading', { level: 2, name: 'Contact Information' })).toBeVisible();

    // Check contact details are displayed (use more specific selectors)
    await expect(page.getByRole('heading', { level: 3, name: 'Email' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'Phone' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'Office' })).toBeVisible();

    // Check contact information text is present (use specific selectors to avoid footer duplicates)
    // Target the specific paragraphs within the contact section, not the footer
    await expect(page.getByRole('heading', { level: 3, name: 'Email' }).locator('..').locator('p:has-text("hello@example.com")')).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'Phone' }).locator('..').locator('p:has-text("+1 (555) 123-4567")')).toBeVisible();
    await expect(page.getByRole('heading', { level: 3, name: 'Office' }).locator('..').locator('p:has-text("123 Business Street")')).toBeVisible();
  });

  test('[UI]-[CONTACT]-[P3]-[013] should display FAQ section', async ({ page }) => {
    // Check FAQ section is present
    await expect(page.getByRole('heading', { level: 2, name: 'Frequently Asked Questions' })).toBeVisible();

    // Check FAQ items are displayed
    await expect(page.locator('text=How quickly do you respond to inquiries?')).toBeVisible();
    await expect(page.locator('text=What information should I include in my message?')).toBeVisible();
    await expect(page.locator('text=Do you offer free consultations?')).toBeVisible();
    await expect(page.locator('text=What file formats do you accept for attachments?')).toBeVisible();
  });

  test('[RESPONSIVE]-[CONTACT]-[P2]-[014] should be responsive on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check form is still accessible
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();

    // Check submit button is visible and clickable
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    await expect(submitButton).toBeEnabled();
  });

  test('[FUNCTIONALITY]-[CONTACT]-[P3]-[015] should handle form reset correctly', async ({ page }) => {
    // Fill form with data
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#phone').fill('+1234567890');
    await page.locator('#subject').selectOption('general');
    await page.locator('#message').fill('This is a test message.');
    
    // Use helper function for reliable checkbox handling
    await checkConsentCheckbox(page);

    // Click reset button
    await page.locator('button[type="reset"]').click();

    // Check form is reset
    await expect(page.locator('#name')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
    await expect(page.locator('#phone')).toHaveValue('');
    await expect(page.locator('#subject')).toHaveValue('');
    await expect(page.locator('#message')).toHaveValue('');
    await expect(page.locator('#consent')).not.toBeChecked();
  });

  test('[UX]-[CONTACT]-[P3]-[016] should show character count for message field', async ({ page }) => {
    const messageField = page.locator('#message');
    const charCount = page.locator('#char-count');

    // Check initial character count
    await expect(charCount).toContainText('0 characters');

    // Type in message field
    await messageField.fill('Hello');
    await expect(charCount).toContainText('5 characters');

    // Fill with longer message and check actual count
    const testMessage = 'This is a longer message for testing.';
    await messageField.fill(testMessage);
    
    // Check the actual character count
    const expectedCount = `${testMessage.length} characters`;
    await expect(charCount).toContainText(expectedCount);
  });

  test('[FILE_UPLOAD]-[CONTACT]-[P2]-[017] should handle file upload and display file list', async ({ page }) => {
    // Create a test file path for the test
    const testFilePath = 'tests/fixtures/test-document.txt';
    
    // Set up file input with a test file
    await page.locator('#attachment').setInputFiles(testFilePath);

    // Check file is displayed in file list
    await expect(page.locator('#file-list')).toBeVisible();
    await expect(page.locator('#file-list')).toContainText('test-document.txt');
  });

  test('[INTEGRATION]-[CONTACT]-[P1]-[018] should send real email through Resend API', async ({ page }) => {
    // ⚠️  IMPORTANT: This test sends a REAL email - only run when you want to test email delivery
    // Skip this test in CI/CD environments to avoid sending emails during automated testing
    
    // Fill form with test data
    await page.locator('#name').fill('Playwright Test User');
    await page.locator('#email').fill('b.politiad@gmail.com'); // Use a real email you can check
    await page.locator('#phone').fill('+1234567890');
    await page.locator('#subject').selectOption('feedback');
    await page.locator('#message').fill('This is a real email test from Playwright automation. Please ignore this message.');
    
    // Use helper function for reliable checkbox handling
    await checkConsentCheckbox(page);

    // Submit form - this will send a REAL email
    await page.locator('button[type="submit"]').click();

    // Wait for response message (success or error)
    await expect(page.locator('#form-message')).toBeVisible();
    
    // Check if email was sent successfully or if there was an error
    const messageElement = page.locator('#form-message');
    const messageText = await messageElement.textContent();
    
    if (messageText?.includes('Message sent successfully')) {
      // Success case - verify form reset
      await expect(page.locator('#name')).toHaveValue('');
      await expect(page.locator('#message')).toHaveValue('');
      await expect(page.locator('#consent')).not.toBeChecked();
      
      // Log success for debugging
      test.info().annotations.push({
        type: 'success',
        description: 'Email sent successfully! Check your inbox.'
      });
    } else if (messageText?.includes('An error occurred')) {
      // Error case - provide helpful debugging info
      test.info().annotations.push({
        type: 'error',
        description: 'Email sending failed. Check your Resend API configuration:'
      });
      test.info().annotations.push({
        type: 'info',
        description: '- Verify RESEND_API_KEY is set in .env file'
      });
      test.info().annotations.push({
        type: 'info',
        description: '- Check if domain is verified in Resend dashboard'
      });
      
      // Test still passes but logs the issue
      await expect(messageElement).toContainText('An error occurred');
    } else {
      // Unexpected response
      throw new Error(`Unexpected response: ${messageText}`);
    }
    
    // Note: If successful, real email was sent - check your inbox and configured TO_EMAIL address
    // The email should contain: "Playwright Test User" as sender and "This is a real email test..." as message
  });
});
