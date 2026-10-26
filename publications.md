---
layout: default
title: "Publications & Technical Writing"
permalink: /publications/
---

{% comment %}
  Publications redesign (2026-10-26), designer layout in site colours.
  Open items: Google Scholar and ORCID URLs (mock shows bracket
  placeholders, not invented here); DOI / BibTeX links once the two
  accepted papers are published (mock shows "[DOI once published]");
  malware-lab month ([Month 2026] in the mock); and the XL-I2P
  "In review" count/paper — known-stale since the CSET rejection,
  kept per the 2026-10-26 direction that content follows the new
  design, so the whole batch is consistent on that wording.
  Paper titles follow the mock (including its shortened Chrono-GINE
  title); the full title is in research.md's manuscript record.
{% endcomment %}

<div class="rd-wrap">
  <div class="rd-two-col">
    <div>
      <section class="rd-hero">
        <p class="rd-kicker">Publications</p>
        <h1>Papers, data and writing</h1>
        <p class="rd-lead">Peer-reviewed work first, then the datasets and code behind it, then technical write-ups. Investigation reports have their own page.</p>
      </section>

      <section class="rd-section">
        <div class="rd-section-head rd-rule"><h2>Papers</h2><span style="font-family:var(--mono);font-size:13px;">2026</span></div>
        <div class="rd-card">
          <div class="rd-paper">
            <span class="rd-pill rd-pill-ok">Accepted</span>
            <div>
              <h3>A Behavioral Temporal Graph Neural Network Framework for Detecting Botnets</h3>
              <p>Conference paper · Second author · IEEE International Conference on Internet of Things (iThings), 2026.</p>
              <p>Abstract · DOI once published · BibTeX</p>
            </div>
          </div>
          <div class="rd-paper">
            <span class="rd-pill rd-pill-ok">Accepted</span>
            <div>
              <h3>Chrono-GINE: Chronological Edge-Aware GIN for I2P Behavior Modeling</h3>
              <p>Conference paper · Last author · IEEE International Conference on Smart Data, 2026.</p>
              <p>Abstract · DOI once published · BibTeX</p>
            </div>
          </div>
          <div class="rd-paper">
            <span class="rd-pill rd-pill-amber">In review</span>
            <div>
              <h3>XL-I2P: Cross-Layer I2P Darkweb Mapper</h3>
              <p>Workshop paper · First author · Submitted to CSET Workshop, 2026.</p>
              <p><a href="{{ '/research/' | relative_url }}">Related: I2P research, Study 1</a></p>
            </div>
          </div>
        </div>
      </section>

      <section class="rd-section">
        <h2 class="rd-rule" style="border-bottom:2px solid var(--text);padding-bottom:10px;">Datasets &amp; code</h2>
        <div class="rd-card">
          <div class="rd-paper">
            <div>
              <h3>I2P crawler validation dataset</h3>
              <p>IEEE DataPort · Study 1 · 1,400 eepsites, 366,304 hyperlinks</p>
            </div>
            <a href="https://doi.org/10.21227/rkan-zq07" style="margin-left:auto;white-space:nowrap;">10.21227/rkan-zq07</a>
          </div>
          <div class="rd-paper">
            <div>
              <h3>I2P crawler and analysis code</h3>
              <p>GitHub · Study 2</p>
            </div>
            <a href="https://github.com/joshberk" rel="me" style="margin-left:auto;white-space:nowrap;">github.com/joshberk</a>
          </div>
        </div>
      </section>

      <section class="rd-section">
        <h2 class="rd-rule" style="border-bottom:2px solid var(--text);padding-bottom:10px;">Technical writing</h2>
        <div class="rd-card">
          <div class="rd-paper">
            <div>
              <h3><a href="{{ '/research/malware-reversing-lab/' | relative_url }}">Building a malware reversing lab on Proxmox</a></h3>
              <p>Lab write-up · [Month 2026]</p>
            </div>
          </div>
          <div class="rd-paper">
            <div>
              <h3><a href="{{ '/investigations/' | relative_url }}">Investigation reports</a></h3>
              <p>6 reports across 4 simulated cases · Jun – Aug 2026</p>
            </div>
            <a href="{{ '/investigations/' | relative_url }}" style="margin-left:auto;white-space:nowrap;">Case files →</a>
          </div>
        </div>
      </section>
    </div>

    <aside class="rd-side">
      <div class="rd-side-card">
        <h3>At a glance</h3>
        <div class="rd-side-row"><span>Accepted papers</span><strong>2</strong></div>
        <div class="rd-side-row"><span>In review</span><strong>1</strong></div>
        <div class="rd-side-row"><span>Open datasets</span><strong>1</strong></div>
      </div>
      <div class="rd-side-card">
        <h3>Scholarly profiles</h3>
        <!-- TODO: Google Scholar and ORCID URLs -->
        <p><a href="https://doi.org/10.21227/rkan-zq07">IEEE DataPort</a></p>
        <p>Google Scholar · ORCID iD (URLs to be added)</p>
      </div>
    </aside>
  </div>
</div>
