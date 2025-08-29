import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should load contact page with form', async ({ page }) => {
    // Check page title and heading
    await expect(page).toHaveTitle(/Contact Us/);
    await expect(page.locator('h1')).toContainText('Contact Us');

    // Check form elements are present
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('#name')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#phone')).toBeVisible();
    await expect(page.locator('#subject')).toBeVisible();
    await expect(page.locator('#message')).toBeVisible();
    await expect(page.locator('#attachment')).toBeVisible();
    await expect(page.locator('#consent')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should display validation errors for empty required fields', async ({ page }) => {
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

  test('should validate email format', async ({ page }) => {
    // Fill form with invalid email
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('invalid-email');
    await page.locator('#subject').selectOption('general');
    await page.locator('#message').fill('This is a test message with more than 10 characters.');
    await page.locator('#consent').check();

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for email validation error
    await expect(page.locator('#email-error')).toBeVisible();
    await expect(page.locator('#email-error')).toContainText('Please enter a valid email address');
  });

  test('should validate phone number format', async ({ page }) => {
    // Fill form with invalid phone
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#phone').fill('invalid-phone');
    await page.locator('#subject').selectOption('general');
    await page.locator('#message').fill('This is a test message with more than 10 characters.');
    await page.locator('#consent').check();

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for phone validation error
    await expect(page.locator('#phone-error')).toBeVisible();
    await expect(page.locator('#phone-error')).toContainText('Please enter a valid phone number');
  });

  test('should validate message length', async ({ page }) => {
    // Fill form with short message
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#subject').selectOption('general');
    await page.locator('#message').fill('Short');
    await page.locator('#consent').check();

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for message validation error
    await expect(page.locator('#message-error')).toBeVisible();
    await expect(page.locator('#message-error')).toContainText(
      'Message must be at least 10 characters long'
    );
  });

  test('should validate file upload', async ({ page }) => {
    // Fill form with valid data
    await page.locator('#name').fill('John Doe');
    await page.locator('#email').fill('john@example.com');
    await page.locator('#subject').selectOption('general');
    await page.locator('#message').fill('This is a test message with more than 10 characters.');
    await page.locator('#consent').check();

    // Upload a large file (simulate)
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator('#attachment').click();
    await fileChooserPromise; // Wait for file chooser but don't assign to unused variable

    // Create a mock large file (this would need to be adjusted for actual file size testing)
    // For now, we'll just test the file input is accessible
    await expect(page.locator('#attachment')).toBeVisible();
  });

  test('should submit form with valid data', async ({ page }) => {
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
    await page.locator('#consent').check();

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for success message
    await expect(page.locator('[role="alert"]')).toBeVisible();
    await expect(page.locator('[role="alert"]')).toContainText('Message sent successfully');
    await expect(page.locator('[role="alert"]')).toContainText('Thank you for your message');
  });

  test('should handle API errors gracefully', async ({ page }) => {
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
    await page.locator('#consent').check();

    // Submit form
    await page.locator('button[type="submit"]').click();

    // Check for error message
    await expect(page.locator('[role="alert"]')).toBeVisible();
    await expect(page.locator('[role="alert"]')).toContainText('Something went wrong');
    await expect(page.locator('[role="alert"]')).toContainText('Failed to send email');
  });

  test('should have accessible form elements', async ({ page }) => {
    // Check labels are properly associated with inputs
    await expect(page.locator('#name')).toHaveAttribute('aria-describedby');
    await expect(page.locator('#email')).toHaveAttribute('aria-describedby');
    await expect(page.locator('#subject')).toHaveAttribute('aria-describedby');
    await expect(page.locator('#message')).toHaveAttribute('aria-describedby');
    await expect(page.locator('#consent')).toHaveAttribute('aria-describedby');

    // Check required fields have proper attributes
    await expect(page.locator('#name')).toHaveAttribute('required');
    await expect(page.locator('#email')).toHaveAttribute('required');
    await expect(page.locator('#subject')).toHaveAttribute('required');
    await expect(page.locator('#message')).toHaveAttribute('required');
    await expect(page.locator('#consent')).toHaveAttribute('required');

    // Check file input has proper accept attribute
    await expect(page.locator('#attachment')).toHaveAttribute(
      'accept',
      '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif'
    );
  });

  test('should display contact information section', async ({ page }) => {
    // Check contact information section is present
    await expect(page.locator('h2')).toContainText('Other Ways to Reach Us');

    // Check contact details are displayed
    await expect(page.locator('text=Email')).toBeVisible();
    await expect(page.locator('text=Phone')).toBeVisible();
    await expect(page.locator('text=Address')).toBeVisible();
    await expect(page.locator('text=Business Hours')).toBeVisible();

    // Check email link is present
    await expect(page.locator('a[href="mailto:hello@example.com"]')).toBeVisible();
    await expect(page.locator('a[href="tel:+1 (555) 123-4567"]')).toBeVisible();
  });

  test('should be responsive on mobile devices', async ({ page }) => {
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
});
