# Test Naming Convention - Quick Reference

## Format
```
[CATEGORY]-[MODULE]-[PRIORITY]-[SEQUENCE]
```

## Categories
- `[UI]` - User Interface (page loading, elements, layout)
- `[VALIDATION]` - Form validation, error messages
- `[SUBMISSION]` - Form submission, API calls
- `[ERROR_HANDLING]` - Error scenarios, failures
- `[ACCESSIBILITY]` - ARIA, screen reader support
- `[RESPONSIVE]` - Mobile, tablet, desktop layouts
- `[FUNCTIONALITY]` - Feature functionality, form reset
- `[FILE_UPLOAD]` - File handling, upload validation
- `[SEO]` - Meta tags, structured data
- `[NAVIGATION]` - Links, menus, routing
- `[PERFORMANCE]` - Loading, assets, console errors

## Modules
- `[CONTACT]` - Contact form and page
- `[HOME]` - Homepage and landing page
- `[AUTH]` - Authentication (future)
- `[DASHBOARD]` - User dashboard (future)

## Priorities
- `[P1]` - Critical (core functionality, blocking)
- `[P2]` - High (important features, major flows)
- `[P3]` - Medium (nice-to-have, edge cases)
- `[P4]` - Low (minor features, cosmetic)

## Examples
```
[UI]-[CONTACT]-[P1]-[001] should load contact page with form
[VALIDATION]-[CONTACT]-[P1]-[002] should display validation errors
[ACCESSIBILITY]-[HOME]-[P1]-[003] should be accessible
```

## Quick Commands
```bash
# Run P1 tests only (smoke testing)
npx playwright test -g "P1"

# Run all contact tests
npx playwright test -g "CONTACT"

# Run all validation tests
npx playwright test -g "VALIDATION"

# Run P1 + P2 tests (critical path)
npx playwright test -g "P1|P2"
```

## Adding New Tests
1. Choose category from list above
2. Select module (CONTACT, HOME, etc.)
3. Set priority (P1, P2, P3, P4)
4. Use next available sequence number
5. Add descriptive test name

**Example:**
```typescript
test('[VALIDATION]-[CONTACT]-[P2]-[018] should validate company field', async ({ page }) => {
  // Test implementation
});
```
