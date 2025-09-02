# Security Headers Configuration

> **Template/Boilerplate Notice**
>
> This document describes the security headers configuration for the Astro Tailwind boilerplate deployed on Vercel.

## Overview

Security headers are configured in `vercel.json` to provide defense-in-depth security for the application. All headers are applied at the Vercel edge for optimal performance.

## Current Headers

The following security headers are currently configured:

### Core Security Headers

- **Strict-Transport-Security**: `max-age=31536000; includeSubDomains; preload`
  - Enforces HTTPS for 1 year across all subdomains
  - Includes preload directive (manual submission required)

- **X-Frame-Options**: `SAMEORIGIN`
  - Prevents clickjacking attacks
  - Allows framing from same origin only

- **X-Content-Type-Options**: `nosniff`
  - Prevents MIME type sniffing attacks
  - Forces browsers to respect declared content types

- **Referrer-Policy**: `strict-origin-when-cross-origin`
  - Controls referrer information sent with requests
  - Balances privacy and functionality

### Content Security Policy (Report-Only)

**Current CSP (Report-Only)**:
```
default-src 'self'; 
img-src 'self' data: blob: https:; 
script-src 'self'; 
style-src 'self' 'unsafe-inline'; 
font-src 'self' data:; 
connect-src 'self' https:; 
frame-ancestors 'self'; 
base-uri 'self'; 
form-action 'self';
```

This policy:
- Restricts all resources to same origin by default
- Allows images from HTTPS sources (for external images)
- Permits inline styles (required for Tailwind CSS)
- Allows connections to HTTPS endpoints
- Prevents framing from external origins

## Configuration Location

**Single Source of Truth**: `vercel.json`

Headers are configured in the `headers` array under the `/(.*)` source pattern, ensuring they apply to all routes.

## Adding New Allowed Origins

To safely add a new external origin to the CSP:

1. **Identify the directive**: Determine which CSP directive needs the new origin
   - `img-src` for images
   - `script-src` for JavaScript
   - `style-src` for CSS
   - `connect-src` for API calls
   - `font-src` for fonts

2. **Update vercel.json**: Add the origin to the appropriate directive
   ```json
   {
     "key": "Content-Security-Policy-Report-Only",
     "value": "default-src 'self'; img-src 'self' data: blob: https: https://new-origin.com; ..."
   }
   ```

3. **Test thoroughly**: Deploy to preview and verify no violations in browser console

4. **Monitor reports**: Check for any CSP violations before enforcing

## Switching to Enforced CSP

**Current Status**: Report-Only mode (safe for production)

To switch to enforced CSP:

1. **Verify zero violations**: Ensure no CSP violations in browser console
2. **Update header name**: Change `Content-Security-Policy-Report-Only` to `Content-Security-Policy`
3. **Deploy and monitor**: Watch for any broken functionality

**Enforced CSP version** (ready for production):
```
Content-Security-Policy: default-src 'self'; img-src 'self' data: blob: https:; script-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'self'; base-uri 'self'; form-action 'self';
```

## Testing

### Local Testing
```bash
# Start development server
pnpm dev

# Check headers in browser DevTools
# Network tab → Response Headers
```

### Production Testing
1. Deploy to Vercel preview
2. Visit preview URL
3. Open DevTools → Network → Response Headers
4. Verify all security headers are present
5. Check Console for CSP violations

### Header Verification
Use online tools or browser DevTools to verify:
- [ ] Strict-Transport-Security present
- [ ] X-Frame-Options: SAMEORIGIN
- [ ] X-Content-Type-Options: nosniff
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Content-Security-Policy-Report-Only present

## External Origins Detected

Based on codebase analysis, the following external origins are used:
- `github.com` - Social links
- `twitter.com` - Social links
- `your-domain.com` - Placeholder domain (update in production)

## Security Considerations

- **HSTS Preload**: The preload directive is included but requires manual submission to [hstspreload.org](https://hstspreload.org)
- **CSP Evolution**: Start with Report-Only, monitor violations, then enforce
- **Regular Review**: Periodically review and update CSP as new features are added
- **No Unsafe Directives**: Avoid `'unsafe-eval'` and `'unsafe-inline'` in script-src unless absolutely necessary

## Troubleshooting

### Common Issues

1. **CSP Violations**: Check browser console for specific violations
2. **Broken Styles**: Ensure `'unsafe-inline'` is in `style-src` for Tailwind
3. **External Resources**: Add required origins to appropriate directives
4. **API Calls**: Include API endpoints in `connect-src`

### Debugging Steps

1. Check browser console for CSP violations
2. Verify external origins are properly whitelisted
3. Test with CSP disabled temporarily to isolate issues
4. Use CSP evaluator tools for policy validation

## References

- [OWASP Security Headers](https://owasp.org/www-project-secure-headers/)
- [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Vercel Headers Documentation](https://vercel.com/docs/concepts/edge-network/headers)
