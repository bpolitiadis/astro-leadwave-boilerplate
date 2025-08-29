import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

/**
 * Base Page Object Model providing common functionality for all pages
 */
export class BasePage {
  readonly page: Page;
  
  // Common elements
  readonly header: Locator;
  readonly footer: Locator;
  readonly headerLogo: Locator;
  readonly headerNav: Locator;
  readonly headerNavHome: Locator;
  readonly headerNavContact: Locator;
  readonly headerCta: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Header elements
    this.header = page.getByTestId('header');
    this.headerLogo = page.getByTestId('header-logo');
    this.headerNav = page.getByTestId('header-nav');
    this.headerNavHome = page.getByTestId('header-nav-home');
    this.headerNavContact = page.getByTestId('header-nav-contact');
    this.headerCta = page.getByTestId('header-cta');
    
    // Footer elements
    this.footer = page.getByTestId('footer');
  }

  /**
   * Navigate to a specific path
   */
  async goto(path: string = '/') {
    await this.page.goto(path);
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad() {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Check if header is visible and functional
   */
  async assertHeaderVisible() {
    await expect(this.header).toBeVisible();
    await expect(this.headerLogo).toBeVisible();
    await expect(this.headerNav).toBeVisible();
    await expect(this.headerNavHome).toBeVisible();
    await expect(this.headerNavContact).toBeVisible();
  }

  /**
   * Check if footer is visible
   */
  async assertFooterVisible() {
    await expect(this.footer).toBeVisible();
  }

  /**
   * Navigate using header navigation
   */
  async navigateToHome() {
    await this.headerNavHome.click();
  }

  async navigateToContact() {
    await this.headerNavContact.click();
  }

  async clickHeaderCta() {
    await this.headerCta.click();
  }

  /**
   * Check page title contains expected text
   */
  async assertPageTitle(expectedTitle: string | RegExp) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Check page URL matches pattern
   */
  async assertPageUrl(expectedUrl: string | RegExp) {
    await expect(this.page).toHaveURL(expectedUrl);
  }

  /**
   * Check for accessibility - proper heading structure
   */
  async assertHeadingStructure() {
    const headings = this.page.locator('h1, h2, h3, h4, h5, h6');
    const firstHeading = headings.first();
    await expect(firstHeading).toBeVisible();
  }

  /**
   * Check all images have alt text
   */
  async assertImagesHaveAltText() {
    const images = this.page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  }

  /**
   * Set viewport size for responsive testing
   */
  async setViewportSize(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }

  /**
   * Test responsive behavior - mobile
   */
  async setMobileViewport() {
    await this.setViewportSize(375, 667);
  }

  /**
   * Test responsive behavior - tablet
   */
  async setTabletViewport() {
    await this.setViewportSize(768, 1024);
  }

  /**
   * Test responsive behavior - desktop
   */
  async setDesktopViewport() {
    await this.setViewportSize(1280, 720);
  }
}
