/**
 * Page Object Models Export
 * 
 * This file exports all Page Object Models for easy importing in test files.
 * 
 * Usage:
 * import { HomePage, ContactPage } from '../page-objects';
 */

export { BasePage } from './BasePage';
export { HomePage } from './HomePage';
export { ContactPage, type ContactFormData } from './ContactPage';

// Re-export common Playwright types for convenience
export type { Page, Locator } from '@playwright/test';
