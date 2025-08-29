import { test, expect } from '@playwright/test';
import { HomePage } from '../page-objects';

test.describe('Homepage', () => {
  test('[UI]-[HOME]-[P1]-[001] should load homepage successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    await homePage.assertPageLoaded();
  });

  test('[SEO]-[HOME]-[P2]-[002] should have proper SEO meta tags', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    await homePage.assertSeoTags();
  });

  test('[ACCESSIBILITY]-[HOME]-[P1]-[003] should be accessible', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    await homePage.testAccessibility();
  });

  test('[NAVIGATION]-[HOME]-[P2]-[004] should have working navigation links', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();

    // Test Contact link using stable locator
    await homePage.navigateToContact();
    await homePage.assertPageUrl(/.*contact/);

    // Test Home link
    await homePage.goto();
    await homePage.navigateToHome();
    await homePage.assertPageUrl(/.*\/$/);
  });

  test('[RESPONSIVE]-[HOME]-[P2]-[005] should be responsive', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    await homePage.testResponsive();
  });

  test('[FUNCTIONALITY]-[HOME]-[P2]-[006] should have proper CTA buttons', async ({ page }) => {
    const homePage = new HomePage(page);
    
    await homePage.goto();
    await homePage.testCtaButtons();
  });

  test('[PERFORMANCE]-[HOME]-[P3]-[007] should load assets correctly', async ({ page }) => {
    const homePage = new HomePage(page);

    // Check that no console errors occurred
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await homePage.goto();
    await homePage.waitForPageLoad();

    // Wait a bit more to catch any late errors
    await page.waitForTimeout(1000);

    expect(consoleErrors).toHaveLength(0);
  });
});
