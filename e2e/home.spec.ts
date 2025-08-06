import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Astro Tailwind Boilerplate/);

    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Modern Web Development');

    // Check navigation
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/');

    // Check meta description
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /production-ready boilerplate/
    );

    // Check Open Graph tags
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      /Astro Tailwind Boilerplate/
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');

    // Check Twitter Card
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image'
    );
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toHaveText(/Modern Web Development/);

    // Check for proper alt text on images
    const images = page.locator('img');
    for (const img of await images.all()) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // Check for proper ARIA labels
    await expect(page.getByRole('button', { name: /Open main menu/ })).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');

    // Test About link
    await page.getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveURL(/.*about/);

    // Test Contact link
    await page.goto('/');
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/.*contact/);
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');

    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('nav')).toBeVisible();

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('button', { name: /Open main menu/ })).toBeVisible();

    // Test mobile menu toggle
    await page.getByRole('button', { name: /Open main menu/ }).click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
  });

  test('should have proper form functionality', async ({ page }) => {
    await page.goto('/');

    // Test CTA buttons
    const getStartedButton = page.getByRole('link', { name: 'Get Started' });
    await expect(getStartedButton).toBeVisible();
    await expect(getStartedButton).toHaveAttribute('href', '/about');

    const contactButton = page.getByRole('link', { name: 'Contact Us' });
    await expect(contactButton).toBeVisible();
    await expect(contactButton).toHaveAttribute('href', '/contact');
  });

  test('should load assets correctly', async ({ page }) => {
    await page.goto('/');

    // Wait for page to load completely
    await page.waitForLoadState('networkidle');

    // Check that no console errors occurred
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // Wait a bit more to catch any late errors
    await page.waitForTimeout(1000);

    expect(consoleErrors).toHaveLength(0);
  });
});
