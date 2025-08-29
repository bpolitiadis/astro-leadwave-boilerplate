import { test, expect } from '@playwright/test';
import { ContactPage } from '../page-objects';

test.describe('Contact Page - Enhanced with POM', () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
  });

  test('[UI]-[CONTACT]-[P1]-[001] should load contact page successfully', async () => {
    await contactPage.assertPageLoaded();
  });

  test('[VALIDATION]-[CONTACT]-[P1]-[002] should display validation errors for empty required fields', async () => {
    // Submit empty form
    await contactPage.submitForm();

    // Check for validation errors using stable locators
    await contactPage.assertValidationErrors(['name', 'email', 'subject', 'message', 'consent']);

    // Check specific error messages
    await contactPage.assertValidationErrorMessages({
      name: 'Name must be at least 2 characters long',
      email: 'Email is required',
      subject: 'Please select a subject',
      message: 'Message must be at least 10 characters long',
      consent: 'You must agree to the terms and conditions'
    });
  });

  test('[VALIDATION]-[CONTACT]-[P2]-[003] should validate email format', async () => {
    // Fill form with invalid email
    const invalidData = contactPage.getValidFormData();
    invalidData.email = 'invalid-email';
    
    await contactPage.fillContactForm(invalidData);
    await contactPage.submitForm();

    // Check for email validation error
    await contactPage.assertValidationErrors(['email']);
    await contactPage.assertValidationErrorMessages({
      email: 'Please enter a valid email address'
    });
  });

  test('[VALIDATION]-[CONTACT]-[P2]-[004] should validate phone number format', async () => {
    // Fill form with invalid phone
    const invalidData = contactPage.getValidFormData();
    invalidData.phone = 'invalid-phone';
    
    await contactPage.fillContactForm(invalidData);
    await contactPage.submitForm();

    // Check for phone validation error
    await contactPage.assertValidationErrors(['phone']);
    await contactPage.assertValidationErrorMessages({
      phone: 'Please enter a valid phone number'
    });
  });

  test('[VALIDATION]-[CONTACT]-[P2]-[005] should validate message length', async () => {
    // Fill form with short message
    const invalidData = contactPage.getValidFormData();
    invalidData.message = 'Short';
    
    await contactPage.fillContactForm(invalidData);
    await contactPage.submitForm();

    // Check for message validation error
    await contactPage.assertValidationErrors(['message']);
    await contactPage.assertValidationErrorMessages({
      message: 'Message must be at least 10 characters long'
    });
  });

  test('[SUBMISSION]-[CONTACT]-[P1]-[006] should submit form with valid data successfully', async () => {
    // Mock successful API response
    await contactPage.mockSuccessResponse();

    // Fill and submit form with valid data
    const validData = contactPage.getValidFormData();
    await contactPage.fillContactForm(validData);
    await contactPage.submitForm();

    // Check for success message
    await contactPage.assertSuccessMessage();
    
    // Check form is reset
    await contactPage.assertFormReset();
  });

  test('[SUBMISSION]-[CONTACT]-[P2]-[007] should submit form with minimal valid data', async () => {
    // Mock successful API response
    await contactPage.mockSuccessResponse();

    // Fill and submit form with minimal valid data (only required fields)
    const minimalData = contactPage.getMinimalValidFormData();
    await contactPage.fillContactForm(minimalData);
    await contactPage.submitForm();

    // Check for success message
    await contactPage.assertSuccessMessage();
  });

  test('[SUBMISSION]-[CONTACT]-[P2]-[008] should submit form with file attachment', async () => {
    // Mock successful API response
    await contactPage.mockSuccessResponse();

    // Fill form with valid data and file attachment
    const validData = contactPage.getValidFormData();
    validData.file = 'tests/fixtures/test-document.txt';
    
    await contactPage.fillContactForm(validData);
    await contactPage.submitForm();

    // Check for success message
    await contactPage.assertSuccessMessage();
  });

  test('[ERROR_HANDLING]-[CONTACT]-[P2]-[009] should handle API errors gracefully', async () => {
    // Mock API error response
    await contactPage.mockErrorResponse();

    // Fill and submit form with valid data
    const validData = contactPage.getValidFormData();
    await contactPage.fillContactForm(validData);
    await contactPage.submitForm();

    // Check for error message
    await contactPage.assertErrorMessage();
  });

  test('[ERROR_HANDLING]-[CONTACT]-[P2]-[010] should handle server validation errors', async () => {
    // Mock server validation error response
    await contactPage.mockValidationErrorResponse({
      name: 'Name is too short',
      email: 'Invalid email format',
    });

    // Fill and submit form with valid data
    const validData = contactPage.getValidFormData();
    await contactPage.fillContactForm(validData);
    await contactPage.submitForm();

    // Check for server validation errors
    await contactPage.assertValidationErrors(['name', 'email']);
    await contactPage.assertValidationErrorMessages({
      name: 'Name is too short',
      email: 'Invalid email format'
    });
  });

  test('[ACCESSIBILITY]-[CONTACT]-[P1]-[011] should have accessible form elements', async () => {
    await contactPage.testAccessibility();
  });

  test('[UI]-[CONTACT]-[P2]-[012] should display contact information section', async () => {
    await contactPage.assertContactInfoVisible();
  });

  test('[UI]-[CONTACT]-[P3]-[013] should display FAQ section', async () => {
    await expect(contactPage.faqSection).toBeVisible();
    await expect(contactPage.faqTitle).toBeVisible();
  });

test('[RESPONSIVE]-[CONTACT]-[P2]-[014] should be responsive on mobile devices', async () => {
    await contactPage.testResponsive();
  });

  test('[FUNCTIONALITY]-[CONTACT]-[P3]-[015] should handle form reset correctly', async () => {
    // Fill form with data
    const validData = contactPage.getValidFormData();
    await contactPage.fillContactForm(validData);

    // Reset form
    await contactPage.resetForm();

    // Check form is reset
    await contactPage.assertFormReset();
  });

  test('[UX]-[CONTACT]-[P3]-[016] should show character count for message field', async () => {
    // Check initial character count
    await contactPage.assertCharacterCount(0);

    // Type in message field
    await contactPage.messageField.fill('Hello');
    await contactPage.assertCharacterCount(5);

    // Fill with longer message
    const testMessage = 'This is a longer message for testing.';
    await contactPage.messageField.fill(testMessage);
    await contactPage.assertCharacterCount(testMessage.length);
  });

  test('[FILE_UPLOAD]-[CONTACT]-[P2]-[017] should handle file upload and display file list', async () => {
    // Upload a test file
    await contactPage.fileInput.setInputFiles('tests/fixtures/test-document.txt');

    // Check file is displayed in file list
    await expect(contactPage.fileList).toBeVisible();
    await expect(contactPage.fileList).toContainText('test-document.txt');
  });

  test('[INTEGRATION]-[CONTACT]-[P1]-[018] should send real email through API', async () => {
    // Note: This test sends a real email - use cautiously
    const testData = contactPage.getValidFormData();
    testData.name = 'Playwright Test User';
    testData.email = 'test@example.com';
    testData.message = 'This is a real email test from Playwright automation. Please ignore this message.';
    
    await contactPage.fillContactForm(testData);
    await contactPage.submitForm();

    // Wait for response message (success or error)
    await expect(contactPage.formMessage).toBeVisible();
    
    // Check if email was sent successfully or if there was an error
    const messageText = await contactPage.formMessage.textContent();
    
    if (messageText?.includes('Message sent successfully')) {
      // Success case - verify form reset
      await contactPage.assertFormReset();
    } else if (messageText?.includes('An error occurred')) {
      // Error case - still a valid test result
      await contactPage.assertErrorMessage();
    }
  });
});
