# Test Naming Convention Guide

## Overview
This document outlines the standardized naming convention for all Playwright test cases in our Astro Tailwind Boilerplate project. This convention ensures consistency, traceability, and efficient test management across the QA automation team.

## Naming Convention Format
```
[CATEGORY]-[MODULE]-[PRIORITY]-[SEQUENCE]
```

### Components Breakdown

#### 1. CATEGORY
Identifies the type of test being performed:

| Category | Description | Examples |
|----------|-------------|----------|
| `[UI]` | User Interface tests | Page loading, element visibility, layout |
| `[VALIDATION]` | Form and input validation tests | Field validation, error messages |
| `[SUBMISSION]` | Form submission and API tests | Happy path, success scenarios |
| `[ERROR_HANDLING]` | Error scenario tests | API errors, validation failures |
| `[ACCESSIBILITY]` | Accessibility compliance tests | ARIA attributes, screen reader support |
| `[RESPONSIVE]` | Responsive design tests | Mobile, tablet, desktop layouts |
| `[FUNCTIONALITY]` | Feature functionality tests | Form reset, character counting |
| `[FILE_UPLOAD]` | File handling tests | Upload, validation, display |
| `[SEO]` | Search Engine Optimization tests | Meta tags, structured data |
| `[NAVIGATION]` | Navigation and routing tests | Links, menus, routing |
| `[PERFORMANCE]` | Performance and loading tests | Asset loading, console errors |

#### 2. MODULE
Identifies the specific module or page being tested:

| Module | Description |
|--------|-------------|
| `[CONTACT]` | Contact form and page |
| `[HOME]` | Homepage and landing page |
| `[AUTH]` | Authentication (future) |
| `[DASHBOARD]` | User dashboard (future) |
| `[PROFILE]` | User profile (future) |

#### 3. PRIORITY
Indicates the business criticality of the test:

| Priority | Description | Business Impact |
|----------|-------------|-----------------|
| `[P1]` | Critical | Core functionality, blocking issues |
| `[P2]` | High | Important features, major user flows |
| `[P3]` | Medium | Nice-to-have features, edge cases |
| `[P4]` | Low | Minor features, cosmetic issues |

#### 4. SEQUENCE
Three-digit sequential number for unique identification:

- `[001]` - First test in the module
- `[002]` - Second test in the module
- `[017]` - Seventeenth test in the module

## Examples

### Contact Form Tests
```
[UI]-[CONTACT]-[P1]-[001] should load contact page with form
[VALIDATION]-[CONTACT]-[P1]-[002] should display validation errors for empty required fields
[SUBMISSION]-[CONTACT]-[P1]-[007] should submit form with valid data successfully
[ACCESSIBILITY]-[CONTACT]-[P1]-[011] should have accessible form elements
```

### Homepage Tests
```
[UI]-[HOME]-[P1]-[001] should load homepage successfully
[SEO]-[HOME]-[P2]-[002] should have proper SEO meta tags
[ACCESSIBILITY]-[HOME]-[P1]-[003] should be accessible
[RESPONSIVE]-[HOME]-[P2]-[005] should be responsive
```

## Benefits of This Convention

### 1. **Test Identification**
- Quick identification of test purpose and scope
- Easy filtering in test reports and CI/CD pipelines
- Clear categorization for test execution strategies

### 2. **Priority Management**
- Focus on critical tests during smoke testing
- Efficient regression testing based on priority
- Better resource allocation for test execution

### 3. **Maintenance and Debugging**
- Easy to locate specific test types
- Clear understanding of test dependencies
- Simplified test case management

### 4. **Reporting and Analytics**
- Categorized test results for stakeholders
- Priority-based failure analysis
- Module-specific test coverage metrics

## Test Execution Strategies

### Smoke Testing (P1 Only)
```bash
npx playwright test -g "P1"
```

### Critical Path Testing (P1 + P2)
```bash
npx playwright test -g "P1|P2"
```

### Module-Specific Testing
```bash
# Contact form tests only
npx playwright test -g "CONTACT"

# UI tests only
npx playwright test -g "UI"
```

### Category-Based Testing
```bash
# All validation tests
npx playwright test -g "VALIDATION"

# All accessibility tests
npx playwright test -g "ACCESSIBILITY"
```

## Adding New Tests

### 1. **Determine Category**
- What type of test is this?
- Which category best describes the test purpose?

### 2. **Identify Module**
- Which page or component is being tested?
- Use existing module names or create new ones

### 3. **Set Priority**
- How critical is this functionality?
- Consider business impact and user experience

### 4. **Assign Sequence Number**
- Check existing tests in the module
- Use the next available sequence number

### Example: Adding a New Contact Form Test
```typescript
test('[VALIDATION]-[CONTACT]-[P2]-[018] should validate company field format', async ({ page }) => {
  // Test implementation
});
```

## Best Practices

### 1. **Consistency**
- Always use the exact format: `[CATEGORY]-[MODULE]-[PRIORITY]-[SEQUENCE]`
- Maintain consistent spacing and brackets
- Use descriptive test names after the convention

### 2. **Priority Assignment**
- P1: Core functionality that blocks user workflows
- P2: Important features that significantly impact user experience
- P3: Secondary features and edge cases
- P4: Minor features and cosmetic elements

### 3. **Category Selection**
- Choose the most specific category that applies
- Avoid generic categories when specific ones exist
- Use multiple categories if a test covers multiple areas

### 4. **Sequence Management**
- Keep sequence numbers sequential within each module
- Don't reuse sequence numbers
- Document any gaps in sequence for future reference

## Maintenance and Updates

### 1. **Regular Reviews**
- Monthly review of test categorization
- Quarterly priority reassessment
- Annual convention optimization

### 2. **Team Training**
- New team members should read this guide
- Regular team discussions about convention improvements
- Feedback collection for convention updates

### 3. **Documentation Updates**
- Keep this guide updated with new categories
- Document any convention changes
- Maintain examples for each category

## Troubleshooting

### Common Issues

#### 1. **Test Not Found**
- Check category spelling and case
- Verify module name matches existing conventions
- Ensure sequence number is unique

#### 2. **Priority Conflicts**
- Review business requirements for priority justification
- Consult with product team for priority clarification
- Update priorities based on changing business needs

#### 3. **Category Overlap**
- Choose the most specific category
- Consider splitting tests if they cover multiple areas
- Document category selection rationale

## Conclusion

This naming convention provides a structured approach to test management that:
- Improves test organization and discoverability
- Enables efficient test execution strategies
- Facilitates better reporting and analytics
- Supports scalable test automation practices

By following this convention consistently, the QA automation team can maintain high-quality test suites that are easy to understand, maintain, and execute.
