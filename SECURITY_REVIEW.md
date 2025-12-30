# Security Review (OWASP Top 10)

## Scope and approach
Static Jekyll site hosted on GitHub Pages. Review covers repository content (layouts, scripts, configuration) against OWASP Top 10 2021 with emphasis on client-side behavior, supply chain, and hosting-layer headers. No server-side code or data processing is present.

## Current controls and observations
- **Hardened response headers (A05 Security Misconfiguration):** The layout sets a meta-delivered Content Security Policy, Referrer-Policy, and Permissions-Policy to constrain external resources and disable powerful browser features by default.【F:_layouts/default.html†L4-L15】
- **Supply-chain pinning (A06 Vulnerable and Outdated Components):** Jekyll dependencies are pinned via `github-pages` and the `jekyll-theme-hacker` gem rather than a remote theme fetch, reducing runtime code drift.【F:Gemfile†L1-L16】
- **Client-side output handling (A03 Injection):** Dynamic text rendering in the faux terminal uses `textContent`-based escaping to avoid DOM injection.【F:assets/js/main.js†L113-L140】

## Risk assessment by OWASP category
1. **A01 Broken Access Control** – Not applicable: no authenticated routes or protected resources exist.
2. **A02 Cryptographic Failures** – Low risk: the site does not handle secrets or user data; TLS enforcement depends on GitHub Pages configuration (not in-repo).
3. **A03 Injection** – Low risk: there are no server-side inputs; limited client-side rendering escapes user-supplied strings before insertion.【F:assets/js/main.js†L125-L140】
4. **A04 Insecure Design** – Low risk: static content only. Future interactive features should design for least privilege and explicit trust boundaries.
5. **A05 Security Misconfiguration** – Moderate residual risk: CSP still allows `'unsafe-inline'` scripts/styles to accommodate inline configuration blocks, leaving room for DOM-based injection if new inline scripts are added.【F:_layouts/default.html†L6-L8】 Consider migrating inline scripts to external files with nonces/hashes to remove this allowance.
6. **A06 Vulnerable and Outdated Components** – Moderate residual risk: dependency versions are pinned but rely on the GitHub Pages stack; no automated vulnerability scanning is configured in-repo. Adding periodic `bundler-audit` or Dependabot checks would improve coverage.【F:Gemfile†L1-L16】
7. **A07 Identification and Authentication Failures** – Not applicable for a static site without authentication flows.
8. **A08 Software and Data Integrity Failures** – Moderate residual risk: external scripts (MathJax, Google Analytics) rely on CDN integrity and CSP. Keep SRI hashes current when upgrading, and prefer self-hosting or subresource pinning to limit tampering exposure.【F:_layouts/default.html†L21-L36】
9. **A09 Security Logging and Monitoring Failures** – Low inherent risk: no server-side events. Operational visibility should rely on GitHub Pages logs or CSP report endpoints if enabled.
10. **A10 Server-Side Request Forgery** – Not applicable: no server-side network calls exist.

## Recommendations (prioritized)
1. Remove `'unsafe-inline'` from the CSP by moving inline configuration/analytics scripts to external files and applying nonces or hashes; verify CSP after changes.【F:_layouts/default.html†L6-L8】
2. Add automated dependency and vulnerability scanning (e.g., GitHub Dependabot and `bundler-audit`) to detect outdated gems despite pinning.【F:Gemfile†L1-L16】
3. Periodically validate deployed response headers (CSP, Referrer-Policy, Permissions-Policy) on GitHub Pages and add a CSP reporting endpoint to surface violations.【F:_layouts/default.html†L4-L15】
4. Document a policy that any new external scripts or `target="_blank"` links include SRI (where applicable) and `rel="noopener noreferrer"` to preserve tab isolation.【F:_layouts/default.html†L43-L48】
