import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  priority?: 'low' | 'medium' | 'high';
  message: string;
  consent: boolean;
  file?: string;
}

/**
 * Contact Page Object Model
 * Provides stable, comprehensive locators for the contact page and form
 */
export class ContactPage extends BasePage {
  // Hero section elements
  readonly heroSection: Locator;
  readonly heroTitle: Locator;
  readonly heroDescription: Locator;
  readonly heroImage: Locator;

  // Form section elements
  readonly formSection: Locator;
  readonly formTitle: Locator;
  readonly formDescription: Locator;
  readonly formContainer: Locator;

  // Contact form elements
  readonly form: Locator;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly phoneField: Locator;
  readonly companyField: Locator;
  readonly subjectField: Locator;
  readonly prioritySection: Locator;
  readonly priorityLow: Locator;
  readonly priorityMedium: Locator;
  readonly priorityHigh: Locator;
  readonly messageField: Locator;
  readonly charCount: Locator;
  readonly fileUpload: Locator;
  readonly fileInput: Locator;
  readonly fileList: Locator;
  readonly consentSection: Locator;
  readonly consentCheckbox: Locator;
  readonly formActions: Locator;
  readonly submitButton: Locator;
  readonly resetButton: Locator;
  readonly formMessage: Locator;

  // Error elements
  readonly nameError: Locator;
  readonly emailError: Locator;
  readonly phoneError: Locator;
  readonly subjectError: Locator;
  readonly messageError: Locator;
  readonly fileError: Locator;
  readonly consentError: Locator;

  // Contact info section
  readonly contactInfoSection: Locator;
  readonly contactInfo: Locator;
  readonly contactInfoTitle: Locator;
  readonly contactInfoDescription: Locator;

  // FAQ section
  readonly faqSection: Locator;
  readonly faqTitle: Locator;

  constructor(page: Page) {
    super(page);
    
    // Hero section
    this.heroSection = page.getByTestId('contact-hero');
    this.heroTitle = page.getByTestId('contact-hero-title');
    this.heroDescription = page.getByTestId('contact-hero-description');
    this.heroImage = page.getByTestId('contact-hero-image');

    // Form section
    this.formSection = page.getByTestId('contact-form-section');
    this.formTitle = page.getByTestId('contact-form-title');
    this.formDescription = page.getByTestId('contact-form-description');
    this.formContainer = page.getByTestId('contact-form-container');

    // Contact form
    this.form = page.getByTestId('contact-form');
    this.nameField = page.getByTestId('contact-form-name');
    this.emailField = page.getByTestId('contact-form-email');
    this.phoneField = page.getByTestId('contact-form-phone');
    this.companyField = page.getByTestId('contact-form-company');
    this.subjectField = page.getByTestId('contact-form-subject');
    this.prioritySection = page.getByTestId('contact-form-priority');
    this.priorityLow = page.getByTestId('contact-form-priority-low');
    this.priorityMedium = page.getByTestId('contact-form-priority-medium');
    this.priorityHigh = page.getByTestId('contact-form-priority-high');
    this.messageField = page.getByTestId('contact-form-message');
    this.charCount = page.getByTestId('contact-form-char-count');
    this.fileUpload = page.getByTestId('contact-form-file-upload');
    this.fileInput = page.getByTestId('contact-form-file');
    this.fileList = page.getByTestId('contact-form-file-list');
    this.consentSection = page.getByTestId('contact-form-consent-section');
    this.consentCheckbox = page.getByTestId('contact-form-consent');
    this.formActions = page.getByTestId('contact-form-actions');
    this.submitButton = page.getByTestId('contact-form-submit');
    this.resetButton = page.getByTestId('contact-form-reset');
    this.formMessage = page.getByTestId('contact-form-status');

    // Error elements
    this.nameError = page.getByTestId('contact-form-name-error');
    this.emailError = page.getByTestId('contact-form-email-error');
    this.phoneError = page.getByTestId('contact-form-phone-error');
    this.subjectError = page.getByTestId('contact-form-subject-error');
    this.messageError = page.getByTestId('contact-form-message-error');
    this.fileError = page.getByTestId('contact-form-file-error');
    this.consentError = page.getByTestId('contact-form-consent-error');

    // Contact info section
    this.contactInfoSection = page.getByTestId('contact-info-section');
    this.contactInfo = page.getByTestId('contact-info');
    this.contactInfoTitle = page.getByTestId('contact-info-title');
    this.contactInfoDescription = page.getByTestId('contact-info-description');

    // FAQ section
    this.faqSection = page.getByTestId('contact-faq');
    this.faqTitle = page.getByTestId('contact-faq-title');
  }

  /**
   * Navigate to contact page
   */
  async goto() {
    await super.goto('/contact');
    await this.waitForPageLoad();
  }

  /**
   * Assert page loads successfully
   */
  async assertPageLoaded() {
    await this.assertPageTitle(/Contact Us/);
    await this.assertHeaderVisible();
    await this.assertHeroVisible();
    await this.assertFormVisible();
    await this.assertContactInfoVisible();
    await this.assertFooterVisible();
  }

  /**
   * Assert hero section is visible
   */
  async assertHeroVisible() {
    await expect(this.heroSection).toBeVisible();
    await expect(this.heroTitle).toBeVisible();
    await expect(this.heroDescription).toBeVisible();
    await expect(this.heroImage).toBeVisible();
  }

  /**
   * Assert form section is visible
   */
  async assertFormVisible() {
    await expect(this.formSection).toBeVisible();
    await expect(this.formTitle).toBeVisible();
    await expect(this.formDescription).toBeVisible();
    await expect(this.formContainer).toBeVisible();
    await expect(this.form).toBeVisible();
    
    // Assert all form fields are visible
    await expect(this.nameField).toBeVisible();
    await expect(this.emailField).toBeVisible();
    await expect(this.phoneField).toBeVisible();
    await expect(this.companyField).toBeVisible();
    await expect(this.subjectField).toBeVisible();
    await expect(this.prioritySection).toBeVisible();
    await expect(this.messageField).toBeVisible();
    await expect(this.fileUpload).toBeVisible();
    await expect(this.consentSection).toBeVisible();
    await expect(this.formActions).toBeVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.resetButton).toBeVisible();
  }

  /**
   * Assert contact info section is visible
   */
  async assertContactInfoVisible() {
    await expect(this.contactInfoSection).toBeVisible();
    await expect(this.contactInfo).toBeVisible();
    await expect(this.contactInfoTitle).toBeVisible();
    await expect(this.contactInfoDescription).toBeVisible();
  }

  /**
   * Fill the contact form with provided data
   */
  async fillContactForm(data: ContactFormData) {
    await this.nameField.fill(data.name);
    await this.emailField.fill(data.email);
    
    if (data.phone) {
      await this.phoneField.fill(data.phone);
    }
    
    if (data.company) {
      await this.companyField.fill(data.company);
    }
    
    await this.subjectField.selectOption(data.subject);
    
    if (data.priority) {
      switch (data.priority) {
        case 'low':
          await this.priorityLow.check();
          break;
        case 'medium':
          await this.priorityMedium.check();
          break;
        case 'high':
          await this.priorityHigh.check();
          break;
      }
    }
    
    await this.messageField.fill(data.message);
    
    if (data.file) {
      await this.fileInput.setInputFiles(data.file);
    }
    
    if (data.consent) {
      await this.checkConsent();
    }
  }

  /**
   * Reliable consent checkbox handling
   */
  async checkConsent() {
    await this.consentCheckbox.waitFor({ state: 'visible' });
    
    // Try clicking multiple times if needed
    let attempts = 0;
    while (attempts < 3 && !(await this.consentCheckbox.isChecked())) {
      await this.consentCheckbox.click();
      await this.page.waitForTimeout(100);
      attempts++;
    }
    
    // Verify checkbox is checked
    await expect(this.consentCheckbox).toBeChecked();
  }

  /**
   * Submit the form
   */
  async submitForm() {
    await this.submitButton.click();
  }

  /**
   * Reset the form
   */
  async resetForm() {
    await this.resetButton.click();
  }

  /**
   * Assert validation errors are visible
   */
  async assertValidationErrors(fields: string[]) {
    for (const field of fields) {
      switch (field) {
        case 'name':
          await expect(this.nameError).toBeVisible();
          break;
        case 'email':
          await expect(this.emailError).toBeVisible();
          break;
        case 'phone':
          await expect(this.phoneError).toBeVisible();
          break;
        case 'subject':
          await expect(this.subjectError).toBeVisible();
          break;
        case 'message':
          await expect(this.messageError).toBeVisible();
          break;
        case 'file':
          await expect(this.fileError).toBeVisible();
          break;
        case 'consent':
          await expect(this.consentError).toBeVisible();
          break;
      }
    }
  }

  /**
   * Assert specific validation error messages
   */
  async assertValidationErrorMessages(expectedErrors: Record<string, string>) {
    for (const [field, expectedMessage] of Object.entries(expectedErrors)) {
      switch (field) {
        case 'name':
          await expect(this.nameError).toContainText(expectedMessage);
          break;
        case 'email':
          await expect(this.emailError).toContainText(expectedMessage);
          break;
        case 'phone':
          await expect(this.phoneError).toContainText(expectedMessage);
          break;
        case 'subject':
          await expect(this.subjectError).toContainText(expectedMessage);
          break;
        case 'message':
          await expect(this.messageError).toContainText(expectedMessage);
          break;
        case 'file':
          await expect(this.fileError).toContainText(expectedMessage);
          break;
        case 'consent':
          await expect(this.consentError).toContainText(expectedMessage);
          break;
      }
    }
  }

  /**
   * Assert success message is displayed
   */
  async assertSuccessMessage() {
    await expect(this.formMessage).toBeVisible();
    await expect(this.formMessage).toContainText("Message sent successfully! We'll get back to you soon.");
  }

  /**
   * Assert error message is displayed
   */
  async assertErrorMessage() {
    await expect(this.formMessage).toBeVisible();
    await expect(this.formMessage).toContainText('An error occurred. Please try again later.');
  }

  /**
   * Assert form is reset to initial state
   */
  async assertFormReset() {
    await expect(this.nameField).toHaveValue('');
    await expect(this.emailField).toHaveValue('');
    await expect(this.phoneField).toHaveValue('');
    await expect(this.companyField).toHaveValue('');
    await expect(this.subjectField).toHaveValue('');
    await expect(this.messageField).toHaveValue('');
    await expect(this.consentCheckbox).not.toBeChecked();
  }

  /**
   * Assert character count is working
   */
  async assertCharacterCount(expectedCount: number) {
    await expect(this.charCount).toContainText(`${expectedCount} characters`);
  }

  /**
   * Test form accessibility
   */
  async testAccessibility() {
    // Check labels are properly associated with inputs
    await expect(this.nameField).toHaveAttribute('aria-describedby', 'name-error');
    await expect(this.emailField).toHaveAttribute('aria-describedby', 'email-error');
    await expect(this.subjectField).toHaveAttribute('aria-describedby', 'subject-error');
    await expect(this.messageField).toHaveAttribute('aria-describedby', 'message-error char-count');
    await expect(this.consentCheckbox).toHaveAttribute('aria-describedby', 'consent-error');

    // Check required fields have proper attributes
    await expect(this.nameField).toHaveAttribute('required');
    await expect(this.emailField).toHaveAttribute('required');
    await expect(this.subjectField).toHaveAttribute('required');
    await expect(this.messageField).toHaveAttribute('required');
    await expect(this.consentCheckbox).toHaveAttribute('required');

    // Check file input has proper accept attribute
    await expect(this.fileInput).toHaveAttribute(
      'accept',
      '.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif,.zip,.rar'
    );

    // Check form has novalidate attribute
    await expect(this.form).toHaveAttribute('novalidate');
  }

  /**
   * Test responsive behavior
   */
  async testResponsive() {
    // Test mobile viewport
    await this.setMobileViewport();
    await this.assertFormVisible();
    await expect(this.submitButton).toBeVisible();
    await expect(this.submitButton).toBeEnabled();
  }

  /**
   * Mock API responses for testing
   */
  async mockSuccessResponse() {
    await this.page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Email sent successfully',
        }),
      });
    });
  }

  async mockErrorResponse() {
    await this.page.route('/api/contact', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          error: 'Failed to send email. Please try again later.',
        }),
      });
    });
  }

  async mockValidationErrorResponse(errors: Record<string, string>) {
    await this.page.route('/api/contact', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          errors,
        }),
      });
    });
  }

  /**
   * Get valid form data for testing
   */
  getValidFormData(): ContactFormData {
    return {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      company: 'Test Company',
      subject: 'general',
      priority: 'medium',
      message: 'This is a test message with more than 10 characters to validate the form submission.',
      consent: true,
    };
  }

  /**
   * Get minimal valid form data (only required fields)
   */
  getMinimalValidFormData(): ContactFormData {
    return {
      name: 'Jane Doe',
      email: 'jane@example.com',
      subject: 'support',
      message: 'This is a minimal test message with required fields only.',
      consent: true,
    };
  }
}
