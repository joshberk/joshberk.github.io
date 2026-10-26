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

{% comment %}
  Research redesign (2026-10-26), designer layout in site colours.
  Open items: Study 2 expected completion, Study 3 planned start,
  and the XL-I2P "in review at CSET" lines (Study 1 card + Papers list)
  — known-stale since the CSET rejection, kept per the 2026-10-26
  direction that content follows the new design, so the batch matches.
  Advisor, dates and Study 1 figures are as in the mock / current site.
{% endcomment %}

<div class="rd-wrap">
  <section class="rd-hero">
    <p class="rd-kicker">PhD Research · University of Cincinnati</p>
    <h1>Measuring the I2P hidden-service ecosystem</h1>
    <p class="rd-lead">How do I2P eepsites link to each other, how fast do they appear and disappear, and do the answers hold on Tor and Freenet? I answer these with application-layer crawling and a directed multiplex graph that joins network-layer and application-layer views of the same network.</p>
    <p class="rd-meta"><span>Advisor: Dr. Jacques Bou Abdo</span><span>2024 – present</span><span>Dissertation expected Apr 2028</span></p>
  </section>

  <section class="rd-section">
    <h2>Three studies</h2>
    <div class="rd-grid-3">
      <article class="rd-study">
        <div class="rd-study-bar"><i style="width:100%"></i></div>
        <div class="rd-study-top"><span>Study 1</span><span class="rd-pill rd-pill-ok">Complete</span></div>
        <h3>Crawler coverage and resilience</h3>
        <p>Can an application-layer crawler find and keep up with I2P hidden services, and how much does it miss?</p>
        <dl>
          <dt>Crawled</dt><dd><strong>1,400 eepsites</strong></dd>
          <dt>Extracted</dt><dd><strong>366,304 hyperlinks</strong></dd>
          <dt>Data</dt><dd><a href="https://doi.org/10.21227/rkan-zq07">IEEE DataPort, DOI</a></dd>
          <dt>Paper</dt><dd>XL-I2P, in review at CSET</dd>
        </dl>
      </article>
      <article class="rd-study">
        <div class="rd-study-bar"><i class="amber" style="width:45%"></i></div>
        <div class="rd-study-top"><span>Study 2</span><span class="rd-pill rd-pill-amber">In progress</span></div>
        <h3>Eepsite churn and link-graph change</h3>
        <p>How quickly do eepsites appear, vanish and rewire, and what does that say about the ecosystem&rsquo;s stability?</p>
        <dl>
          <dt>Code</dt><dd><a href="https://github.com/joshberk/XL-I2P-Study2">GitHub repository</a></dd>
          <dt>Target</dt><dd>[Expected completion]</dd>
        </dl>
      </article>
      <article class="rd-study">
        <div class="rd-study-bar"><i style="width:0%"></i></div>
        <div class="rd-study-top"><span>Study 3</span><span class="rd-pill rd-pill-grey">Planned</span></div>
        <h3>Generalizing to Tor and Freenet</h3>
        <p>Do the same collection methods and graph findings carry over to other anonymity networks?</p>
        <dl>
          <dt>Start</dt><dd>[Planned start]</dd>
        </dl>
      </article>
    </div>
  </section>

  <section class="rd-section">
    <div class="rd-fig rd-fig-lg">[Fig. 01: eepsite relationship graph, full width]</div>
    <p class="rd-caption"><strong>Fig. 01.</strong> Eepsite relationship graph from Study 1. [One sentence on what the reader should notice: clusters, hubs, isolated sites.]</p>
  </section>

  <section class="rd-section">
    <h2>How the work is done</h2>
    <div class="rd-cols-3">
      <div>
        <h3>Collection</h3>
        <p>Application-layer crawling of eepsites, with coverage checked against a validation set.</p>
      </div>
      <div>
        <h3>Analysis</h3>
        <p>A directed multiplex graph joins application-layer hyperlinks with network-layer relationships between the same sites.</p>
      </div>
      <div>
        <h3>Reproducibility</h3>
        <p>Datasets go to IEEE DataPort and code to GitHub, so results can be checked and rerun.</p>
      </div>
    </div>
    <div class="rd-card" style="margin-top:24px;">
      <p><strong>Research ethics.</strong> This work measures structure, not people. It does not identify or attribute real-world actors, and operational details that could aid abuse are left out of public write-ups.</p>
    </div>
  </section>

  <section class="rd-section">
    <div class="rd-section-head"><h2>Papers from this work</h2><a href="{{ '/publications/' | relative_url }}">All publications →</a></div>
    <div class="rd-card">
      <div class="rd-paper">
        <span class="rd-pill rd-pill-amber">In review</span>
        <div><h3>XL-I2P: Cross-Layer I2P Darkweb Mapper</h3><p>CSET Workshop 2026 · First author · Study 1</p></div>
      </div>
      <div class="rd-paper">
        <span class="rd-pill rd-pill-ok">Accepted</span>
        <div><h3>Chrono-GINE: Chronological Edge-Aware GIN for I2P Behavior Modeling</h3><p>IEEE Intl. Conf. on Smart Data 2026 · Last author</p></div>
      </div>
      <div class="rd-paper">
        <span class="rd-pill rd-pill-ok">Accepted</span>
        <div><h3>A Behavioral Temporal Graph Neural Network Framework for Detecting Botnets</h3><p>IEEE iThings 2026 · Second author</p></div>
      </div>
    </div>
  </section>

  <section class="rd-section">
    <div class="rd-card">
      <div class="rd-section-head" style="margin-bottom:8px;"><div><p class="rd-kicker" style="margin-bottom:4px;">Lab Build</p><h3 style="margin:0;">Building a malware reversing lab on Proxmox</h3></div><a href="{{ '/research/malware-reversing-lab/' | relative_url }}" class="btn btn-outline">Read the write-up</a></div>
      <p>The isolated analysis environment behind the investigations, written up so others can build it.</p>
    </div>
  </section>
</div>
