---
layout: default
title: "Detection Engineering — In Development"
permalink: /detection-engineering/
---

<section class="page-hero">
  <p class="eyebrow">Detection Engineering</p>
  <h1>Detection Engineering — In Development</h1>
  <p class="page-intro">Detection Engineering is an active area of development within this Cyber Threat Intelligence Lab. I am currently studying Practical Detection Engineering and building the foundation for future detection artifacts that connect threat investigations, ATT&amp;CK mapping, telemetry analysis, and defensible detection logic.</p>
  <div class="research-status">
    <span class="status-badge status-dev">In Development</span>
    <span class="status-badge">Study in Progress</span>
  </div>
</section>

<section class="home-section" id="status">
  <div class="section-heading"><p class="section-kicker">Current Status</p><h2>Current status</h2></div>
  <ul class="activity-list">
    <li>Studying Practical Detection Engineering.</li>
    <li>Building foundational knowledge in threat-informed detection development.</li>
    <li>Learning how to translate attacker behavior and investigation findings into detection logic.</li>
    <li>Preparing to publish only artifacts that can be explained, tested, and defended.</li>
  </ul>
</section>

<section class="home-section" id="planned">
  <div class="section-heading">
    <p class="section-kicker">Future Portfolio</p>
    <h2>What this section will include</h2>
    <p class="section-intro">As the capability matures, this section will grow into a portfolio of defensible detection artifacts. Planned content types:</p>
  </div>
  <div class="home-summary">
    <article class="summary-card"><h3>Sigma Rules <span class="tag-dev">Planned</span></h3><p>Portable detection signatures mapped to adversary techniques.</p></article>
    <article class="summary-card"><h3>KQL Detections <span class="tag-dev">Planned</span></h3><p>Detection and hunting queries for endpoint and network telemetry.</p></article>
    <article class="summary-card"><h3>YARA Rules <span class="tag-dev">Planned</span></h3><p>Pattern-based detection for files and malware artifacts.</p></article>
    <article class="summary-card"><h3>Detection Validation Reports <span class="tag-dev">Planned</span></h3><p>Evidence that a detection fires on true positives and survives testing.</p></article>
    <article class="summary-card"><h3>Threat-Informed Detection Case Studies <span class="tag-dev">Planned</span></h3><p>Detections derived from documented investigation findings.</p></article>
    <article class="summary-card"><h3>ATT&amp;CK-Mapped Detection Logic <span class="tag-dev">Planned</span></h3><p>Coverage tied explicitly to MITRE ATT&amp;CK techniques.</p></article>
    <article class="summary-card"><h3>False Positive Analysis <span class="tag-dev">Planned</span></h3><p>Documented tuning, noise considerations, and limitations for each rule.</p></article>
    <article class="summary-card"><h3>Detection Coverage Notes <span class="tag-dev">Planned</span></h3><p>Where coverage exists, where gaps remain, and why.</p></article>
  </div>
</section>

<section class="home-section" id="workflow">
  <div class="section-heading">
    <p class="section-kicker">Method</p>
    <h2>Future detection workflow</h2>
    <p class="section-intro">This is the workflow I intend to follow for published detections — the intended future process, not a claim that completed detections already exist.</p>
  </div>
  <ol class="workflow-list">
    <li>Investigation or threat scenario</li>
    <li>ATT&amp;CK mapping</li>
    <li>Telemetry requirement</li>
    <li>Detection logic</li>
    <li>Rule implementation</li>
    <li>Validation</li>
    <li>False-positive review</li>
    <li>Documentation</li>
    <li>Publication</li>
  </ol>
</section>

<section class="home-section" id="from-investigations">
  <div class="section-heading"><p class="section-kicker">Investigations → Detections</p><h2>Relationship to investigations</h2></div>
  <p>As this lab develops, selected investigations may later produce corresponding detection artifacts. Those detections will only be published when the logic, assumptions, telemetry requirements, validation steps, and limitations can be clearly documented.</p>
  <p class="research-note">No production-ready detections are published yet. This page exists to document the direction of the work honestly — Detection Engineering is a capability in progress, not a completed portfolio.</p>
</section>
