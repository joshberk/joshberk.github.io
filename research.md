---
layout: default
title: "Research"
permalink: /research/
manuscripts:
  - title: "XL-I2P: Cross-Layer I2P Darkweb Mapper"
    authorship: "First author"
    status: "Under review"
    venue: "Workshop on Cyber Security Experimentation and Test (CSET)"
  - title: "A Behavioral Temporal Graph Neural Network Framework for Detecting Botnets"
    authorship: "Second author"
    status: "Accepted"
    venue: "IEEE iThings 2026"
  - title: "Chrono-GINE: A Chronological Edge-Aware Graph Isomorphism Network for Self-Supervised I2P Network Behavior Modeling"
    authorship: "Last author"
    status: "Accepted"
    venue: "2026 IEEE International Conference on Smart Data"
---

<section class="page-hero">
  <p class="eyebrow">Security &amp; Intelligence Research</p>
  <h1>Research</h1>
  <p class="page-intro">This section collects my security research, dark-web intelligence work, and lab-based technical studies structured research into how anonymity infrastructure and hidden-service ecosystems behave, and the collection and analysis workflows that make that research reproducible.</p>
</section>

<section class="home-section home-section-emphasis" id="featured-research">
  <div class="section-heading">
    <p class="section-kicker">Featured Research</p>
    <h2>I2P Hidden Service Ecosystem Analysis</h2>
  </div>
  <div class="research-status">
    <span class="status-badge status-progress">PhD Research · In Progress</span>
  </div>
  <p>A PhD research program measuring the I2P anonymity network's hidden-service (eepsite) ecosystem across three sequential studies. Study 1 validated the measurement methodology, comparing the purpose-built XL-I2P crawler against the c4i2p baseline. Study 2 is a longitudinal campaign now collecting epoch-tagged observations to measure eepsite churn against application-layer link-graph change. Study 3 will test the resulting theories for generality against published measurements of other anonymity networks. Network-layer observations are recorded with strict provenance separation from application-layer crawls, so cross-layer claims are made only where the data supports them.</p>
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

<section class="home-section research-manuscripts" id="research-manuscripts" aria-labelledby="manuscripts-heading">
  <div class="section-heading">
    <p class="section-kicker">Manuscripts</p>
    <h2 id="manuscripts-heading">Research manuscripts</h2>
    <p class="section-intro">Current manuscripts spanning I2P network mapping, botnet detection, and graph-based network behavior modeling.</p>
  </div>
  <div class="pub-list">
    {% for manuscript in page.manuscripts %}
    <article class="pub-card">
      <div class="pub-card-head">
        <h3 class="pub-title">{{ manuscript.title | escape }}</h3>
        <span class="status-badge">{{ manuscript.status | escape }}</span>
      </div>
      <p class="pub-meta-line"><strong>Authorship:</strong> {{ manuscript.authorship | escape }}</p>
      <p class="pub-meta-line"><strong>Submitted to:</strong> {{ manuscript.venue | escape }}</p>
    </article>
    {% endfor %}
  </div>
</section>

<section class="home-section" id="research-questions">
  <div class="section-heading">
    <p class="section-kicker">Objectives</p>
    <h2>Research questions</h2>
    <p class="section-intro">The program is organized around three research questions, one per study, about how the I2P hidden-service ecosystem is structured and how it can be observed responsibly.</p>
  </div>
  <ul class="research-qs">
    <li>Can a single-vantage crawler recover the I2P application-layer graph with coverage and resilience sufficient for rigorous structural analysis? <span class="muted">(Study 1 — completed)</span></li>
    <li>How do eepsites appear, persist, and disappear over a longitudinal window, and how does that churn relate to application-layer link-graph change? <span class="muted">(Study 2 — in progress)</span></li>
    <li>Do the resulting theories generalize to other anonymity networks such as Tor and Freenet? <span class="muted">(Study 3)</span></li>
  </ul>
</section>

<section class="home-section" id="methodology">
  <div class="section-heading">
    <p class="section-kicker">Methodology</p>
    <h2>Collection &amp; analysis approach</h2>
  </div>
  <p>At a high level, the framework runs a verify-then-crawl pipeline against I2P hidden services ("eepsites") through the I2P HTTP proxy: sites are verified for reachability, then crawled for pages and hyperlinks, with every attempt recorded in an immutable audit trail. Network-layer observations (netDB records visible to a participating router) are stored in separate, provenance-tagged tables — never silently counted as confirmed application-layer crawls. For analysis, hyperlinks form a directed graph (nodes are eepsites, edges carry epoch tags) supporting churn, survival, and structural analysis. All crawl reachability is measured from a single vantage, and findings are reported with that condition attached.</p>
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
    <li><a href="#research-manuscripts">Three research manuscripts <span class="muted">— two accepted, one under review</span></a></li>
    <li>Study 1 validation datasets &amp; artifacts <span class="muted">— <a href="https://doi.org/10.21227/rkan-zq07">IEEE DataPort (DOI: 10.21227/rkan-zq07)</a></span></li>
    <li>Study 2 crawler &amp; dashboard code <span class="muted">— <a href="https://github.com/joshberk/XL-I2P-Study2">GitHub: joshberk/XL-I2P-Study2</a></span></li>
    <li>Related lab artifacts <span class="muted">— see Security Lab Artifacts below</span></li>
  </ul>
  <p class="muted">See the <a href="{{ '/publications/' | relative_url }}">Publications</a> page for additional technical writing.</p>
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
    <p class="ic-desc">Security lab infrastructure for static and dynamic malware analysis, built on Proxmox alongside a detection-engineering stack feeding Elastic SIEM. Documented as a malware-analysis lab environment not a CTI report or investigation.</p>
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
    <article class="summary-card"><h3>Threat-informed detection engineering</h3><p>Translating observed tradecraft into detections once the detection-engineering capability is established.</p></article>
    <article class="summary-card"><h3>AI-enabled threat analysis</h3><p>Applying machine learning to security measurement and triage.</p></article>
    <article class="summary-card"><h3>Intelligence collection methodology</h3><p>Reproducible, defensible collection workflows for hard-to-observe networks.</p></article>
    <article class="summary-card"><h3>Security measurement research</h3><p>Empirical measurement of security-relevant network ecosystems.</p></article>
  </div>
</section>
