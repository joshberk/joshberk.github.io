---
layout: default
title: "Research"
permalink: /research/
---

<section class="page-hero">
  <p class="eyebrow">Security &amp; Intelligence Research</p>
  <h1>Research</h1>
  <p class="page-intro">This section collects my security research, dark-web intelligence work, and lab-based technical studies — structured research into how anonymity infrastructure and hidden-service ecosystems behave, and the collection and analysis workflows that make that research reproducible.</p>
</section>

<section class="home-section home-section-emphasis" id="featured-research">
  <div class="section-heading">
    <p class="section-kicker">Featured Research</p>
    <h2>I2P Hidden Service Ecosystem Analysis</h2>
  </div>
  <div class="research-status">
    <span class="status-badge status-progress">PhD Research · In Progress</span>
  </div>
  <p>A PhD research project focused on discovering, collecting, and analyzing application-layer and network-layer observations within the I2P anonymity network — to better understand hidden-service connectivity, infrastructure structure, and ecosystem behavior. The work treats anonymity infrastructure and the hidden services that ride on it as one connected system, and builds a reproducible collection-and-analysis framework around it.</p>
  <p class="research-note">This is a privacy-preserving hidden-service ecosystem study with relevance to cyber threat intelligence. It characterizes darknet infrastructure and connectivity; it does not identify, attribute, or track real-world adversary groups.</p>
  <div class="focus-grid">
    <span class="ic-tag">Hidden-service discovery</span>
    <span class="ic-tag">Intelligence collection framework</span>
    <span class="ic-tag">I2P ecosystem analysis</span>
    <span class="ic-tag">Graph-based relationship analysis</span>
    <span class="ic-tag">Application-layer crawling</span>
    <span class="ic-tag">Reproducible research workflows</span>
  </div>
</section>

<section class="home-section" id="research-questions">
  <div class="section-heading">
    <p class="section-kicker">Objectives</p>
    <h2>Research questions</h2>
    <p class="section-intro">The study is organized around a small set of questions about how the I2P hidden-service ecosystem is structured and how it can be observed responsibly.</p>
  </div>
  <ul class="research-qs">
    <li>How can hidden services on the I2P network be discovered and enumerated at scale using only application-layer and network-layer observations?</li>
    <li>What does connectivity between hidden services and the underlying routing infrastructure look like when the two layers are fused into a single graph?</li>
    <li>How is the darknet hidden-service ecosystem structured, and how does that structure change over time?</li>
    <li>What collection-and-analysis workflow makes this kind of darknet measurement reproducible and defensible?</li>
  </ul>
</section>

<section class="home-section" id="methodology">
  <div class="section-heading">
    <p class="section-kicker">Methodology</p>
    <h2>Collection &amp; analysis approach</h2>
  </div>
  <p>At a high level, the framework fuses two layers of observation — network-layer routing data and application-layer hidden-service ("eepsite") crawls — into a single directed graph for analysis.</p>
  <div class="home-summary">
    <article class="summary-card"><h3>Collection</h3><p>Application-layer crawling of I2P hidden services via the I2P HTTP proxy, with structured storage in MariaDB.</p></article>
    <article class="summary-card"><h3>Tooling</h3><p>Python collection and processing pipelines built for repeatable, scriptable runs.</p></article>
    <article class="summary-card"><h3>Analysis</h3><p>Graph-based relationship analysis to characterize connectivity and infrastructure structure.</p></article>
  </div>
  <p class="research-note">Methodology is described at the level appropriate for a public research summary; sensitive operational specifics are intentionally omitted.</p>
</section>

<section class="home-section" id="outputs">
  <div class="section-heading">
    <p class="section-kicker">Outputs</p>
    <h2>Research outputs</h2>
  </div>
  <ul class="activity-list">
    <li>Doctoral dissertation research <span class="tag-dev">In Progress</span></li>
    <li>Technical research notes <span class="muted">— published as the work matures</span></li>
    <li>Future conference / journal papers <span class="tag-dev">Planned</span></li>
    <li>Related lab artifacts <span class="muted">— see Security Lab Artifacts below</span></li>
  </ul>
  <p class="muted">See the <a href="{{ '/publications/' | relative_url }}">Publications</a> page for the formal record.</p>
</section>

<section class="home-section" id="lab-artifacts">
  <div class="section-heading">
    <p class="section-kicker">Lab</p>
    <h2>Security lab artifacts</h2>
    <p class="section-intro">Technical environments and lab build-outs that support hands-on research and skills development.</p>
  </div>
  <article class="investigation-card">
    <div class="ic-tags"><span class="ic-tag">Security Lab Infrastructure</span><span class="ic-tag">Malware Analysis Lab Environment</span></div>
    <h3 class="ic-title"><a href="{{ '/research/malware-reversing-lab/' | relative_url }}">Building a Malware Reversing Lab on Proxmox</a></h3>
    <p class="ic-desc">Security lab infrastructure for static and dynamic malware analysis, built on Proxmox alongside a detection-engineering stack feeding Elastic SIEM. Documented as a malware-analysis lab environment — not a CTI report or investigation.</p>
    <div class="ic-meta"><a class="ic-link" href="{{ '/research/malware-reversing-lab/' | relative_url }}">View the lab build →</a></div>
  </article>
</section>

<section class="home-section" id="current-activity">
  <div class="section-heading">
    <p class="section-kicker">Activity</p>
    <h2>Current research activity</h2>
  </div>
  <ul class="activity-list">
    {% for item in site.data.current_work %}
    <li>{% if item.link %}<a href="{{ item.link | relative_url }}">{{ item.title | escape }}</a>{% else %}{{ item.title | escape }}{% endif %} <span class="tag-dev">{{ item.status | escape }}</span>{% if item.description %}<span class="muted"> — {{ item.description | escape }}</span>{% endif %}</li>
    {% endfor %}
  </ul>
</section>

<section class="home-section" id="future">
  <div class="section-heading">
    <p class="section-kicker">Direction</p>
    <h2>Future research directions</h2>
    <p class="section-intro">Where the lab is headed as the work matures.</p>
  </div>
  <div class="home-summary">
    <article class="summary-card"><h3>Dark-web infrastructure analysis</h3><p>Extending ecosystem mapping to characterize darknet infrastructure at scale.</p></article>
    <article class="summary-card"><h3>Threat-informed detection engineering</h3><p>Translating observed tradecraft into detections — once the detection-engineering capability is established.</p></article>
    <article class="summary-card"><h3>AI-enabled threat analysis</h3><p>Applying machine learning to security measurement and triage.</p></article>
    <article class="summary-card"><h3>Intelligence collection methodology</h3><p>Reproducible, defensible collection workflows for hard-to-observe networks.</p></article>
    <article class="summary-card"><h3>Security measurement research</h3><p>Empirical measurement of security-relevant network ecosystems.</p></article>
  </div>
</section>
