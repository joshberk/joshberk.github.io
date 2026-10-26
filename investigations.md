---
layout: default
title: "Investigations"
permalink: /investigations/
redirect_from:
  - /blog/
  - /blog/index.html
---

{% comment %}
  Investigations redesign (2026-10-26), designer layout in site colours.
  Case cards are the designer's four cases. Flare Darkroom parts link
  to their live report pages; Solvi / Encryptodera / Valdoria link to theirs.
  Filter wiring verified against assets/js/main.js: the grid carries
  id="investigation-list", each card carries .investigation-card with
  data-source, and the source buttons carry data-filter-group="source".
{% endcomment %}

<div class="rd-wrap">
  <section class="rd-hero">
    <p class="rd-kicker">Case Files</p>
    <h1>Threat investigations</h1>
    <p class="rd-lead">Intrusion scenarios from KC7 Cyber and Flare Darkroom, worked end to end and written up as finished CTI reports: scope, pivots, timeline, ATT&amp;CK mapping and findings.</p>
    <p class="rd-meta">
      <a href="https://kc7cyber.com/profile/dd63b85e" target="_blank" rel="noopener noreferrer">My KC7 profile →</a>
      <a href="https://flare.io" target="_blank" rel="noopener noreferrer">Flare Darkroom →</a>
    </p>
    <div class="rd-filter investigation-filters" role="group" aria-label="Filter investigations by source" data-filter-group="source">
      <button class="filter-btn active" type="button" aria-pressed="true" data-filter-value="all">All sources · 4</button>
      <button class="filter-btn" type="button" aria-pressed="false" data-filter-value="kc7-cyber">KC7 Cyber · 3</button>
      <button class="filter-btn" type="button" aria-pressed="false" data-filter-value="flare-darkroom">Flare Darkroom · 1</button>
    </div>
    <p class="rd-note">Every case is a simulated training environment, not a client incident. &ldquo;ATT&amp;CK techniques&rdquo; counts the distinct MITRE ATT&amp;CK techniques mapped in each report.</p>
  </section>

  <div class="rd-case-grid" id="investigation-list">
    <article class="rd-case investigation-card" data-source="flare-darkroom">
      <div class="rd-case-top"><span>CASE-2026-001 · Aug 2026</span><span class="rd-pill rd-pill-ok">Complete</span></div>
      <h2>Inside Flare Darkroom</h2>
      <p class="rd-sector">Dark-web intelligence · 3-part series</p>
      <p>From initial access brokers to the ransomware and credential economy, ending in cross-forum correlation and simulated threat-actor engagement.</p>
      <ul class="rd-parts">
        <li><a href="{{ '/investigations/flare-darkroom/initial-access-credential-exposure/' | relative_url }}">Part 1 · From initial access to credential exposure</a><span>9 min</span></li>
        <li><a href="{{ '/investigations/flare-darkroom/ransomware-credential-economy/' | relative_url }}">Part 2 · Following the ransomware and credential economy</a><span>8 min</span></li>
        <li><a href="{{ '/investigations/flare-darkroom/cross-forum-intelligence/' | relative_url }}">Part 3 · Cross-forum intelligence and simulated engagement</a><span>14 min</span></li>
      </ul>
      <div class="rd-tags"><span class="rd-tag">Flare Darkroom</span><span class="rd-tag">31 min total</span></div>
      <a class="rd-cta" href="{{ '/investigations/flare-darkroom/initial-access-credential-exposure/' | relative_url }}">Start with Part 1 →</a>
    </article>

    <article class="rd-case investigation-card" data-source="kc7-cyber">
      <div class="rd-case-top"><span>CASE-2026-004 · Jun 2026</span><span class="rd-pill rd-pill-amber">Part 1 of 2</span></div>
      <h2>Valdoria Votes</h2>
      <p class="rd-sector">Public sector / elections · APT campaign</p>
      <p>An election-themed APT campaign, tracked through its infrastructure.</p>
      <div class="rd-tags"><span class="rd-tag">KC7 Cyber</span><span class="rd-tag">7 ATT&amp;CK techniques</span><span class="rd-tag">8 min</span></div>
      <a class="rd-cta" href="{{ '/investigations/valdoria-votes/' | relative_url }}">Read Part 1 →</a>
    </article>

    <article class="rd-case investigation-card" data-source="kc7-cyber">
      <div class="rd-case-top"><span>CASE-2026-003 · Jun 2026</span><span class="rd-pill rd-pill-ok">Complete</span></div>
      <h2>Solvi Systems</h2>
      <p class="rd-sector">Energy / ICS · Supply-chain espionage</p>
      <p>A supply-chain intrusion into an industrial control systems operator: 470 C2 connections traced across 38 endpoints.</p>
      <div class="rd-tags"><span class="rd-tag">KC7 Cyber</span><span class="rd-tag">8 ATT&amp;CK techniques</span><span class="rd-tag">11 min</span></div>
      <a class="rd-cta" href="{{ '/investigations/solvi-systems/' | relative_url }}">Read the report →</a>
    </article>

    <article class="rd-case investigation-card" data-source="kc7-cyber">
      <div class="rd-case-top"><span>CASE-2026-002 · Jun 2026</span><span class="rd-pill rd-pill-ok">Complete</span></div>
      <h2>Inside Encryptodera</h2>
      <p class="rd-sector">Financial services · Insider threat → AD ransomware</p>
      <p>An insider-threat case escalating to Active Directory ransomware: 306 endpoints and a 27-day exfiltration window.</p>
      <div class="rd-tags"><span class="rd-tag">KC7 Cyber</span><span class="rd-tag">8 ATT&amp;CK techniques</span><span class="rd-tag">9 min</span></div>
      <a class="rd-cta" href="{{ '/investigations/inside-encryptodera/' | relative_url }}">Read the report →</a>
    </article>
  </div>
</div>
