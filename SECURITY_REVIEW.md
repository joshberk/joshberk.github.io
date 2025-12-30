# Security Code Review - OWASP Top 10 2021

**Date:** December 2025
**Scope:** Static Jekyll site hosted on GitHub Pages
**Reviewer:** Automated Security Analysis

---

## Executive Summary

This security review analyzes the repository against the OWASP Top 10 2021 framework. The codebase is a **static Jekyll site** with no backend, no database, and no authentication—significantly reducing the attack surface. The overall security posture is **good** for a static site, with several security controls already in place.

| Risk Level | Count | Categories |
|------------|-------|------------|
| **Critical** | 0 | — |
| **High** | 0 | — |
| **Medium** | 3 | A05, A06, A08 |
| **Low** | 2 | A02, A03 |
| **N/A** | 5 | A01, A04, A07, A09, A10 |

---

## Current Security Controls (Strengths)

### 1. Content Security Policy (CSP)
- Meta-delivered CSP in `_layouts/default.html:7`
- Restricts script sources to self, CDN, and analytics
- Blocks `frame-ancestors` (clickjacking protection)
- Limits `form-action` to self

### 2. Security Headers (.htaccess)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` with preload
- `Permissions-Policy` disabling sensitive APIs

### 3. XSS Mitigation in JavaScript
- Terminal command sanitization uses `textContent`-based escaping (`assets/js/main.js:222-225`)
- No `eval()`, `Function()`, or dynamic code execution
- Safe DOM manipulation patterns

### 4. Dependency Pinning
- `github-pages` gem pinned to `~> 231`
- `bundler-audit` included for vulnerability scanning
- Theme pinned as gem, not remote fetch

### 5. External Link Security
- CV link uses `rel="noopener noreferrer"` (`_layouts/default.html:61`)

---

## OWASP Top 10 2021 Analysis

### A01:2021 - Broken Access Control
**Status:** ✅ Not Applicable
**Risk Level:** N/A

**Analysis:**
This is a public static site with no:
- Authentication mechanisms
- Protected routes or resources
- User sessions or roles
- Administrative interfaces

**Recommendation:** None required for current architecture.

---

### A02:2021 - Cryptographic Failures
**Status:** ⚠️ Low Risk
**Risk Level:** LOW

**Analysis:**
- No secrets, passwords, or sensitive data in repository
- No cryptographic operations performed client-side
- TLS enforcement delegated to GitHub Pages (HTTPS by default)
- Google Analytics tracking ID (`G-7PNPWV5C4V`) exposed in `_config.yml:55` — expected behavior

**Findings:**
| ID | Finding | Location | Severity |
|----|---------|----------|----------|
| A02-01 | No in-repo TLS configuration | N/A | Info |

**Recommendation:** Ensure HSTS preload list inclusion for `joshuaberkoh.engineer` domain.

---

### A03:2021 - Injection
**Status:** ⚠️ Low Risk
**Risk Level:** LOW

**Analysis:**
- No server-side code or SQL databases
- No user-supplied input processing
- Client-side terminal simulation has proper sanitization

**Findings:**
| ID | Finding | Location | Severity |
|----|---------|----------|----------|
| A03-01 | Proper HTML sanitization implemented | `assets/js/main.js:222-225` | Good |
| A03-02 | innerHTML usage with sanitized input | `assets/js/main.js:236-238` | Low |
| A03-03 | querySelector with DOM href values | `assets/js/main.js:132` | Info |

**Code Review - Sanitization Function:**
```javascript
// assets/js/main.js:222-225
const sanitizeHTML = (str) => {
  const temp = document.createElement('div');
  temp.textContent = str;
  return temp.innerHTML;
};
```
**Assessment:** Correctly escapes HTML entities via `textContent`. This is a secure pattern.

**Recommendation:** Continue using this pattern for any future dynamic content rendering.

---

### A04:2021 - Insecure Design
**Status:** ✅ Not Applicable
**Risk Level:** N/A

**Analysis:**
Static content architecture with no:
- Business logic
- Trust boundaries to enforce
- User data flows

**Recommendation:** If future features introduce user interaction (comments, forms), implement:
- Input validation at boundaries
- Rate limiting
- CSRF tokens for forms

---

### A05:2021 - Security Misconfiguration
**Status:** ⚠️ Medium Risk
**Risk Level:** MEDIUM

**Analysis:**
Several security headers are properly configured, but CSP has notable weaknesses.

**Findings:**
| ID | Finding | Location | Severity |
|----|---------|----------|----------|
| A05-01 | CSP allows `'unsafe-inline'` for scripts | `_layouts/default.html:7` | Medium |
| A05-02 | CSP allows `'unsafe-inline'` for styles | `_layouts/default.html:7` | Low |
| A05-03 | Deprecated `X-XSS-Protection` header | `.htaccess:10` | Low |
| A05-04 | CSP discrepancy between meta and .htaccess | Multiple | Low |
| A05-05 | Missing MathJax CDN in .htaccess CSP | `.htaccess:16` | Low |

**Current CSP (meta tag):**
```
default-src 'self';
script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data:;
connect-src 'self' https://www.google-analytics.com;
frame-ancestors 'none';
base-uri 'self';
form-action 'self'
```

**Issue Details:**

1. **A05-01: `'unsafe-inline'` for scripts**
   - Allows inline `<script>` tags to execute
   - Weakens XSS protection if malicious content is injected
   - Required currently for MathJax config and GA initialization

2. **A05-03: X-XSS-Protection deprecated**
   - Modern browsers ignore this header
   - Can cause issues in legacy browsers
   - CSP is the modern replacement

**Recommendations:**
1. **Priority: Medium** - Migrate inline scripts to external files:
   - Move MathJax config to `/assets/js/mathjax-config.js`
   - Move GA initialization to `/assets/js/analytics.js`
   - Use CSP nonces or hashes instead of `'unsafe-inline'`

2. **Priority: Low** - Remove `X-XSS-Protection` header from `.htaccess`

3. **Priority: Low** - Synchronize CSP between meta tag and `.htaccess`

---

### A06:2021 - Vulnerable and Outdated Components
**Status:** ⚠️ Medium Risk
**Risk Level:** MEDIUM

**Analysis:**
Dependencies are pinned but lack automated vulnerability monitoring.

**Findings:**
| ID | Finding | Location | Severity |
|----|---------|----------|----------|
| A06-01 | No Dependabot/automated scanning | Repository | Medium |
| A06-02 | Jekyll 3.9.5 (current, no known vulns) | `Gemfile.lock:117` | Info |
| A06-03 | MathJax loaded from CDN | `_layouts/default.html:37` | Low |
| A06-04 | Google Fonts lacks SRI | `assets/css/style.scss:7` | Low |

**Dependency Analysis:**

| Component | Version | Status | Notes |
|-----------|---------|--------|-------|
| github-pages | ~> 231 | ✅ Current | Pinned |
| jekyll | 3.9.5 | ✅ Current | Via github-pages |
| nokogiri | 1.18.10 | ✅ Current | Security-sensitive |
| kramdown | 2.4.0 | ✅ Current | No known vulns |
| bundler-audit | 0.9.2 | ✅ Present | Good |
| MathJax | 3 (CDN) | ⚠️ External | Has SRI |
| Google Analytics | External | ⚠️ External | No SRI |

**Recommendations:**
1. **Priority: High** - Enable GitHub Dependabot:
   ```yaml
   # .github/dependabot.yml
   version: 2
   updates:
     - package-ecosystem: "bundler"
       directory: "/"
       schedule:
         interval: "weekly"
   ```

2. **Priority: Medium** - Run `bundle exec bundler-audit check --update` regularly

3. **Priority: Low** - Consider self-hosting critical JS libraries

---

### A07:2021 - Identification and Authentication Failures
**Status:** ✅ Not Applicable
**Risk Level:** N/A

**Analysis:**
No authentication mechanisms exist:
- No login forms
- No user sessions
- No password handling
- No OAuth/SSO integration

**Recommendation:** None required for current architecture.

---

### A08:2021 - Software and Data Integrity Failures
**Status:** ⚠️ Medium Risk
**Risk Level:** MEDIUM

**Analysis:**
External scripts rely on CDN integrity. Mixed SRI implementation.

**Findings:**
| ID | Finding | Location | Severity |
|----|---------|----------|----------|
| A08-01 | MathJax has SRI hash | `_layouts/default.html:37` | Good |
| A08-02 | Google Analytics SRI hash may be invalid | `_layouts/default.html:41` | Medium |
| A08-03 | Google Fonts lacks SRI | `assets/css/style.scss:7` | Low |
| A08-04 | No build artifact signing | Repository | Info |

**SRI Implementation Review:**

```html
<!-- MathJax - Has SRI (line 37) -->
<script id="MathJax-script" async
  src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
  integrity="sha384-OLBgp1GsljhM2TJ+sbHjaiH9txEUvgdDTAzHv2P24donTt6/529l+9Ua0vFImLlb"
  crossorigin="anonymous"></script>

<!-- Google Analytics - Has SRI but may be incorrect (line 41) -->
<script async
  src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"
  integrity="sha384-OLBgp1GsljhM2TJ+sbHjaiH9txEUvgdDTAzHv2P24donTt6/529l+9Ua0vFImLlb"
  crossorigin="anonymous"></script>
```

**Issue:** The same SRI hash is used for both MathJax and Google Analytics, which is incorrect. Google Analytics scripts have dynamic content and don't support SRI.

**Recommendations:**
1. **Priority: High** - Remove invalid SRI from Google Analytics tag:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"></script>
   ```
   (GA doesn't support SRI due to dynamic content)

2. **Priority: Medium** - Verify MathJax SRI hash is correct for the version used

3. **Priority: Low** - Document SRI policy for future external resources

---

### A09:2021 - Security Logging and Monitoring Failures
**Status:** ✅ Not Applicable
**Risk Level:** N/A

**Analysis:**
No server-side events to log:
- Static site with no backend
- No user actions to audit
- No security events to monitor

**Current Visibility:**
- GitHub Pages access logs (platform-managed)
- Google Analytics for traffic patterns
- No CSP violation reporting configured

**Recommendations:**
1. **Priority: Low** - Add CSP `report-uri` or `report-to` directive for violation monitoring
2. **Priority: Info** - Consider Cloudflare or similar for enhanced analytics

---

### A10:2021 - Server-Side Request Forgery (SSRF)
**Status:** ✅ Not Applicable
**Risk Level:** N/A

**Analysis:**
No server-side network calls exist:
- No backend to make outbound requests
- No URL fetching functionality
- No webhook integrations

**Recommendation:** None required for current architecture.

---

## Additional Security Observations

### localStorage Usage
**Location:** `assets/js/main.js:44-59, 331-350`

```javascript
const safeGet = (key) => {
  try {
    return localStorage.getItem(key);
  } catch (err) {
    return null;
  }
};
```

**Assessment:** Safe pattern with try-catch error handling. Stores only theme preference and view mode—no sensitive data. Would be exploitable only via XSS, which is mitigated.

### DOM Manipulation Safety
**Location:** `assets/js/main.js:129-140`

```javascript
anchor.addEventListener('click', function (e) {
  e.preventDefault();
  const target = document.querySelector(this.getAttribute('href'));
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
```

**Assessment:** `querySelector` receives href from anchor elements in the DOM, not user input. Safe pattern.

---

## Prioritized Recommendations

### High Priority
| # | Recommendation | Effort | Impact |
|---|----------------|--------|--------|
| 1 | Enable Dependabot for automated vulnerability scanning | Low | High |
| 2 | Remove invalid SRI from Google Analytics tag | Low | Medium |
| 3 | Run `bundler-audit` in CI/CD pipeline | Low | Medium |

### Medium Priority
| # | Recommendation | Effort | Impact |
|---|----------------|--------|--------|
| 4 | Migrate inline scripts to external files to enable strict CSP | Medium | High |
| 5 | Verify MathJax SRI hash matches current CDN version | Low | Medium |
| 6 | Synchronize CSP between meta tag and .htaccess | Low | Low |

### Low Priority
| # | Recommendation | Effort | Impact |
|---|----------------|--------|--------|
| 7 | Remove deprecated X-XSS-Protection header | Low | Low |
| 8 | Add CSP reporting endpoint | Medium | Low |
| 9 | Document external resource SRI policy | Low | Low |
| 10 | Verify HSTS preload list inclusion | Low | Low |

---

## Implementation Examples

### 1. Dependabot Configuration
Create `.github/dependabot.yml`:
```yaml
version: 2
updates:
  - package-ecosystem: "bundler"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 5
```

### 2. Fix Google Analytics Tag
In `_layouts/default.html`, change:
```html
<!-- Remove integrity attribute (GA doesn't support SRI) -->
<script async src="https://www.googletagmanager.com/gtag/js?id={{ site.google_analytics }}"></script>
```

### 3. Strict CSP with External Scripts
Move inline scripts to external files, then update CSP:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://cdn.jsdelivr.net https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data:;
  connect-src 'self' https://www.google-analytics.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self'
">
```

---

## Conclusion

This static Jekyll site demonstrates a **mature security posture** for its architecture. The primary areas for improvement are:

1. **Supply chain security** - Automated dependency scanning
2. **CSP hardening** - Removing `'unsafe-inline'` allowances
3. **SRI consistency** - Correcting invalid integrity hashes

The absence of backend code, user authentication, and data processing means most OWASP Top 10 categories are not applicable. The implemented controls (CSP, security headers, input sanitization) are appropriate and well-configured for a static site.

**Overall Risk Rating:** LOW (for a static site)

---

*Last Updated: December 2025*
