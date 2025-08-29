import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page Object Model
 * Provides stable, role-first, text-agnostic locators for the home page
 */
export class HomePage extends BasePage {
  // Hero section elements
  readonly heroSection: Locator;
  readonly heroTitle: Locator;
  readonly heroDescription: Locator;
  readonly heroCta: Locator;
  readonly heroGetStartedButton: Locator;
  readonly heroGithubButton: Locator;
  readonly heroImage: Locator;

  // Features section elements
  readonly featuresSection: Locator;
  readonly featuresTitle: Locator;
  readonly featuresDescription: Locator;
  readonly featuresGrid: Locator;
  readonly featureCardPerformance: Locator;
  readonly featureCardDesign: Locator;
  readonly featureCardTypescript: Locator;

  constructor(page: Page) {
    super(page);
    
    // Hero section
    this.heroSection = page.getByTestId('home-hero');
    this.heroTitle = page.getByTestId('home-hero-title');
    this.heroDescription = page.getByTestId('home-hero-description');
    this.heroCta = page.getByTestId('home-hero-cta');
    this.heroGetStartedButton = page.getByTestId('home-cta-get-started');
    this.heroGithubButton = page.getByTestId('home-cta-github');
    this.heroImage = page.getByTestId('home-hero-image');

    // Features section
    this.featuresSection = page.getByTestId('home-features');
    this.featuresTitle = page.getByTestId('home-features-title');
    this.featuresDescription = page.getByTestId('home-features-description');
    this.featuresGrid = page.getByTestId('home-features-grid');
    this.featureCardPerformance = page.getByTestId('home-feature-card-performance');
    this.featureCardDesign = page.getByTestId('home-feature-card-design');
    this.featureCardTypescript = page.getByTestId('home-feature-card-typescript');
  }

  /**
   * Navigate to home page
   */
  async goto() {
    await super.goto('/');
    await this.waitForPageLoad();
  }

  /**
   * Assert all hero elements are visible
   */
  async assertHeroVisible() {
    await expect(this.heroSection).toBeVisible();
    await expect(this.heroTitle).toBeVisible();
    await expect(this.heroDescription).toBeVisible();
    await expect(this.heroCta).toBeVisible();
    await expect(this.heroGetStartedButton).toBeVisible();
    await expect(this.heroGithubButton).toBeVisible();
    await expect(this.heroImage).toBeVisible();
  }

  /**
   * Assert features section is visible
   */
  async assertFeaturesVisible() {
    await expect(this.featuresSection).toBeVisible();
    await expect(this.featuresTitle).toBeVisible();
    await expect(this.featuresDescription).toBeVisible();
    await expect(this.featuresGrid).toBeVisible();
    await expect(this.featureCardPerformance).toBeVisible();
    await expect(this.featureCardDesign).toBeVisible();
    await expect(this.featureCardTypescript).toBeVisible();
  }

  /**
   * Click Get Started button and verify navigation
   */
  async clickGetStarted() {
    await this.heroGetStartedButton.click();
    await this.assertPageUrl(/.*contact/);
  }

  /**
   * Click GitHub button and verify it has correct href
   */
  async assertGithubButton() {
    await expect(this.heroGithubButton).toBeVisible();
    await expect(this.heroGithubButton).toHaveAttribute('href', 'https://github.com');
  }

  /**
   * Test CTA buttons functionality
   */
  async testCtaButtons() {
    // Test Get Started button
    await expect(this.heroGetStartedButton).toBeVisible();
    await expect(this.heroGetStartedButton).toHaveAttribute('href', '/contact');
    
    // Test GitHub button
    await this.assertGithubButton();
  }

  /**
   * Assert page loads successfully with all main elements
   */
  async assertPageLoaded() {
    await this.assertPageTitle(/Astro Tailwind Boilerplate/);
    await this.assertHeaderVisible();
    await this.assertHeroVisible();
    await this.assertFeaturesVisible();
    await this.assertFooterVisible();
  }

  /**
   * Test responsive behavior
   */
  async testResponsive() {
    // Test desktop
    await this.setDesktopViewport();
    await this.assertHeroVisible();
    await this.assertFeaturesVisible();

    // Test mobile
    await this.setMobileViewport();
    await this.assertHeroVisible();
    await this.assertFeaturesVisible();
    
    // Ensure navigation is still accessible on mobile
    await this.assertHeaderVisible();
  }

  /**
   * Test accessibility features
   */
  async testAccessibility() {
    await this.assertHeadingStructure();
    await this.assertImagesHaveAltText();
    
    // Check for proper navigation role
    await expect(this.page.getByRole('navigation')).toBeVisible();
  }

  /**
   * Test SEO meta tags
   */
  async assertSeoTags() {
    // Check meta description
    await expect(this.page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /Production-ready.*boilerplate/i
    );

    // Check Open Graph tags
    await expect(this.page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      /Astro Tailwind Boilerplate/
    );
    await expect(this.page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');

    // Check Twitter Card
    await expect(this.page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image'
    );
  }
}
