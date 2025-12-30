# Security Review (OWASP Top 10)

## Scope and approach
Re-evaluation of the static Jekyll site against OWASP Top 10 (2021) with emphasis on client-side, supply-chain, and hosting-layer misconfigurations relevant to GitHub Pages. The site remains static and does not process user data; therefore, authentication/authorization categories are low risk by design.

## Current findings

### A01: Broken Access Control
* No dynamic routes or authenticated resources are present. This category remains low risk for the current static deployment.

### A05: Security Misconfiguration
* **New-tab navigation hardened.** The CV link now includes `rel="noopener noreferrer"`, closing the reverse-tabnabbing vector for the PDF target.
  * Evidence: `_layouts/default.html` CV link now sets `rel="noopener noreferrer"`.【F:_layouts/default.html†L49-L52】

* **Baseline browser-hardening headers added.** A meta-delivered Content Security Policy restricts scripts to self, jsDelivr, and Google Tag Manager/Analytics; styles to self and Google Fonts; fonts to self and fonts.gstatic; images to self/data; and locks down framing/base/form origins. Referrer-Policy and Permissions-Policy are also defined for defensive privacy defaults.
  * Evidence: `_layouts/default.html` injects CSP, Referrer-Policy, and Permissions-Policy meta tags in the head.【F:_layouts/default.html†L6-L10】

### A06: Vulnerable and Outdated Components
* **Theme supply chain reduced.** The build now uses the pinned `jekyll-theme-hacker` gem instead of the remote theme fetch, removing network-time code retrieval and relying on the version locked in the repo.
  * Evidence: `_config.yml` uses `theme: jekyll-theme-hacker` and drops `jekyll-remote-theme`.【F:_config.yml†L6-L14】

* **External scripts protected with SRI.** MathJax and Google Analytics scripts include Subresource Integrity hashes and `crossorigin="anonymous"` to detect CDN tampering while retaining version pinning.
  * Evidence: `_layouts/default.html` script tags now include `integrity` attributes for both external scripts.【F:_layouts/default.html†L22-L35】

### A08: Software and Data Integrity Failures
* **Reduced external JavaScript risk.** CSP scoping and SRI on MathJax/Analytics shrink the supply-chain blast radius. Maintain hashes when upgrading versions and consider migrating inline scripts to nonce-based policies to remove the `'unsafe-inline'` allowance.

### A09: Security Logging and Monitoring Failures
* Application-level logging is not applicable to the static site; operational visibility should rely on hosting logs and analytics.

### Additional observations
* Client-side `localStorage` is used for theme and view preferences with try/catch guards; data stored is non-sensitive and low risk.

## Recommendations (prioritized)
1. When updating MathJax or Google Analytics, regenerate SRI hashes and validate the CSP still permits required domains without over-broadening it; progressively replace inline scripts with nonce-based ones to remove `'unsafe-inline'` from `script-src`.
2. Add operational validation: monitor for CSP violations (e.g., via `report-uri`/`report-to`) and confirm security headers are present on the deployed GitHub Pages response path.
3. Continue to pin or vendor the Hacker theme gem and track upstream changelogs for security fixes before bumping versions.
4. Ensure any future `target="_blank"` links include `rel="noopener noreferrer"` (or `rel="noreferrer"`) to preserve tab isolation.
