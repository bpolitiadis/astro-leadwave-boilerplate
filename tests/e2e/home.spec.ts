import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('[UI]-[HOME]-[P1]-[001] should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Astro Tailwind Boilerplate/);

    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Astro Tailwind Boilerplate');

    // Check navigation
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('[SEO]-[HOME]-[P2]-[002] should have proper SEO meta tags', async ({ page }) => {
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

  test('[ACCESSIBILITY]-[HOME]-[P1]-[003] should be accessible', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading structure
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    await expect(headings.first()).toHaveText(/Astro Tailwind Boilerplate/);

    // Check for proper alt text on images
    const images = page.locator('img');
    for (const img of await images.all()) {
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
    }

    // Check for proper navigation role
    await expect(page.getByRole('navigation')).toBeVisible();
  });

  test('[NAVIGATION]-[HOME]-[P2]-[004] should have working navigation links', async ({ page }) => {
    await page.goto('/');

    // Test Contact link
    await page.getByRole('link', { name: 'Contact' }).click();
    await expect(page).toHaveURL(/.*contact/);

    // Test Home link
    await page.goto('/');
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(/.*\/$/);
  });

  test('[RESPONSIVE]-[HOME]-[P2]-[005] should be responsive', async ({ page }) => {
    await page.goto('/');

    // Test desktop view
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.locator('nav')).toBeVisible();

    // Test mobile view - navigation should still be visible
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('[FUNCTIONALITY]-[HOME]-[P2]-[006] should have proper CTA buttons', async ({ page }) => {
    await page.goto('/');

    // Test CTA buttons
    const getStartedButton = page.getByRole('link', { name: 'Get Started' });
    await expect(getStartedButton).toBeVisible();
    await expect(getStartedButton).toHaveAttribute('href', '/contact');

    const githubButton = page.getByRole('link', { name: 'View on GitHub' });
    await expect(githubButton).toBeVisible();
    await expect(githubButton).toHaveAttribute('href', 'https://github.com');
  });

  test('[PERFORMANCE]-[HOME]-[P3]-[007] should load assets correctly', async ({ page }) => {
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
