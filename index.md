---
layout: default
---

{% assign completed_investigations = site.investigations | where: "status", "Completed" %}
{% assign completed_count = completed_investigations.size %}

<section class="hero-section lab-hero">
  <div class="hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Cyber Threat Intelligence · Threat Hunting · Dark-Web Research</p>
      <h1>Tracking adversaries. Hunting threats. Producing actionable intelligence.</h1>
      <p class="hero-description">I'm Joshua Berkoh — a cybersecurity professional and PhD researcher working in threat investigations, threat hunting, and dark-web intelligence research. Through scenario-based investigations and security research, I reconstruct intrusion activity, map observed tradecraft to MITRE ATT&amp;CK, and turn raw telemetry into clear, defensible intelligence.</p>
      <div class="hero-buttons">
        <a href="{{ '/investigations/' | relative_url }}" class="btn btn-primary">View investigations</a>
        <a href="{{ '/research/' | relative_url }}" class="btn btn-outline">Read research</a>
        <a href="{{ '/resume/' | relative_url }}" class="btn btn-outline">Download résumé</a>
      </div>
      <div class="hero-stack" aria-label="Core methods">
        <span>MITRE ATT&amp;CK</span>
        <span>KQL</span>
        <span>OSINT</span>
        <span>IOC Pivoting</span>
        <span>Threat Hunting</span>
        <span>Python</span>
        <span>Graph Analysis</span>
      </div>
    </div>

    <aside class="hero-intel-panel" aria-label="Lab index">
      <p class="panel-label"><span>Lab Index</span><span class="panel-live">// LIVE</span></p>
      <dl class="hero-metrics">
        <div><dt>Investigations published</dt><dd>{% if completed_count < 10 %}0{% endif %}{{ completed_count }}</dd></div>
        <div><dt>ATT&amp;CK techniques mapped</dt><dd>40+</dd></div>
        <div><dt>Active research</dt><dd class="metric-sm">I2P Mapping</dd></div>
        <div><dt>Discipline</dt><dd class="metric-mono">CTI · DFIR · OSINT</dd></div>
      </dl>
    </aside>
  </div>
</section>

<section class="home-section section-capabilities" id="capabilities">
  <div class="section-heading split-heading">
    <div>
      <p class="section-kicker">01 — Capabilities</p>
      <h2>What I do</h2>
    </div>
    <p class="section-intro">Demonstrated competencies across the intelligence cycle — collection, analysis, and reporting — grounded in completed investigative and research work.</p>
  </div>
  <div class="capability-grid">
    <article class="summary-card"><div class="card-top"><span class="card-number">01</span><span class="card-badge">Intel Cycle</span></div><h3>Cyber Threat Intelligence</h3><p>Collect, analyze, and report structured intelligence on threat activity, tradecraft, indicators, and investigative findings.</p></article>
    <article class="summary-card"><div class="card-top"><span class="card-number">02</span><span class="card-badge">KQL · ATT&amp;CK</span></div><h3>Threat Hunting</h3><p>Hypothesis-driven hunts across endpoint and network telemetry using KQL and the ATT&amp;CK framework.</p></article>
    <article class="summary-card"><div class="card-top"><span class="card-number">03</span><span class="card-badge">DFIR</span></div><h3>Threat Investigations</h3><p>End-to-end intrusion reconstruction — timelines, evidence, IOCs, and defensible assessments.</p></article>
    <article class="summary-card"><div class="card-top"><span class="card-number">04</span><span class="card-badge">I2P · Hidden Services</span></div><h3>Dark-Web Intelligence</h3><p>Research into anonymity networks, hidden services, and privacy-preserving infrastructure.</p></article>
    <article class="summary-card"><div class="card-top"><span class="card-number">05</span><span class="card-badge">Analytic Methods</span></div><h3>Intelligence Research</h3><p>Structured analytic methods, source evaluation, and confidence-based judgments.</p></article>
    <article class="summary-card"><div class="card-top"><span class="card-number">06</span><span class="card-badge">Method</span></div><h3>Security Research</h3><p>Tooling, measurement, and methodology that extend how threats are studied.</p></article>
  </div>
</section>

<section class="home-section section-investigations" id="investigations">
  <div class="section-heading">
    <p class="section-kicker">02 — Investigations</p>
    <h2>Featured investigations</h2>
    <p class="section-intro">Threat-investigation case studies: full intrusion reconstructions with timelines, IOC analysis, and MITRE ATT&amp;CK mapping — developed from KC7 scenarios and written to professional intelligence-reporting standards.</p>
  </div>
  <div class="investigation-grid">
    {% assign investigations = site.investigations | sort: "date" | reverse %}
    {% for post in investigations limit:3 %}
      {% assign post_status = post.status | default: "Completed" %}
      {% capture cid %}00{{ forloop.index }}{% endcapture %}
      <article class="investigation-card case-file-card{% if post_status == 'Coming Soon' %} case-file-muted{% endif %}">
        <div class="case-card-body">
          <div class="case-file-topline">
            <span class="case-label">CASE-{{ post.date | date: "%Y" }}-{{ cid | slice: -3, 3 }}</span>
            {% if post.tags %}<span class="case-themes">{{ post.tags | join: " · " | escape }}</span>{% endif %}
          </div>
          <h3 class="ic-title">
            {% if post_status == 'Coming Soon' %}{{ post.title | escape }}{% else %}<a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>{% endif %}
          </h3>
          <p class="ic-desc">{{ post.description | strip_html | truncatewords: 28 | escape }}</p>
        </div>
        <div class="case-card-metrics">
          {% if post_status == 'Coming Soon' %}
            <span class="case-status">In progress · Coming soon</span>
          {% else %}
            <div class="metric-row">
              {% if post.attack_count %}<div class="metric"><strong>{{ post.attack_count }}</strong><span>Techniques</span></div>{% endif %}
              {% if post.confidence %}<div class="metric"><strong>{{ post.confidence | escape }}</strong><span>Confidence</span></div>{% endif %}
            </div>
            <a class="ic-link" href="{{ post.url | relative_url }}">Read investigation →</a>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
  <a href="{{ '/investigations/' | relative_url }}" class="btn btn-outline">View all investigations →</a>
</section>

<section class="home-section section-research" id="research">
  <div class="section-heading">
    <p class="section-kicker">03 — Research</p>
    <h2>Current research — dark-web intelligence</h2>
  </div>
  <div class="research-feature research-lab-panel">
    <div class="research-copy">
      <h3>Mapping the I2P anonymous network</h3>
      <p>A cross-layer framework that fuses network-layer routing data with application-layer hidden-service ("eepsite") crawls into a single graph — making it possible to study anonymity infrastructure and the services riding on it as one connected hidden-service ecosystem.</p>
      <p>The work spans hidden-service discovery, infrastructure mapping, large-scale collection, and graph analysis.</p>
      <div class="research-tags">
        <span class="ic-tag">Hidden-Service Discovery</span>
        <span class="ic-tag">Infrastructure Mapping</span>
        <span class="ic-tag">Graph Analysis</span>
      </div>
      <a href="{{ '/research/' | relative_url }}" class="btn btn-outline btn-sm">Explore the research →</a>
    </div>
    <figure class="method-panel intel-graph-panel" aria-label="I2P eepsite relationship graph">
      <svg viewBox="0 0 400 300" role="presentation" aria-hidden="true">
        <g stroke="#6e665b" stroke-width="1">
          <line x1="200" y1="150" x2="90" y2="70"></line><line x1="200" y1="150" x2="320" y2="80"></line>
          <line x1="200" y1="150" x2="110" y2="230"></line><line x1="200" y1="150" x2="310" y2="225"></line>
          <line x1="90" y1="70" x2="40" y2="150"></line><line x1="320" y1="80" x2="360" y2="170"></line>
          <line x1="110" y1="230" x2="200" y2="270"></line><line x1="310" y1="225" x2="200" y2="270"></line>
          <line x1="90" y1="70" x2="200" y2="40"></line><line x1="320" y1="80" x2="200" y2="40"></line>
        </g>
        <g>
          <circle cx="200" cy="150" r="9" fill="#8f2d22"></circle>
          <circle cx="90" cy="70" r="6" fill="#cbb8a0"></circle><circle cx="320" cy="80" r="6" fill="#cbb8a0"></circle>
          <circle cx="110" cy="230" r="6" fill="#cbb8a0"></circle><circle cx="310" cy="225" r="6" fill="#cbb8a0"></circle>
          <circle cx="40" cy="150" r="4" fill="#9a9183"></circle><circle cx="360" cy="170" r="4" fill="#9a9183"></circle>
          <circle cx="200" cy="270" r="4" fill="#9a9183"></circle><circle cx="200" cy="40" r="4" fill="#9a9183"></circle>
        </g>
      </svg>
      <figcaption>Fig.01 — Eepsite relationship graph</figcaption>
    </figure>
  </div>
</section>

<section class="home-section section-activity" id="activity">
  <div class="section-heading">
    <p class="section-kicker">04 — Lab Activity</p>
    <h2>Recent intelligence activity</h2>
  </div>
  <div class="activity-grid">
    <div class="activity-col">
      <p class="activity-label is-live">Currently working on</p>
      <ul class="activity-list">
        {% for item in site.data.current_work limit:4 %}
        <li>
          <div class="activity-row">
            {% if item.link %}<a href="{{ item.link | relative_url }}">{{ item.title | escape }}</a>{% else %}<strong>{{ item.title | escape }}</strong>{% endif %}
            <span class="tag-dev">{{ item.status | escape }}</span>
          </div>
          {% if item.description %}<p class="activity-desc">{{ item.description | escape }}</p>{% endif %}
        </li>
        {% endfor %}
      </ul>
    </div>
    <div class="activity-col">
      <p class="activity-label">Timeline</p>
      <ul class="timeline-list">
        {% for entry in site.data.timeline limit:9 %}
        <li>
          <span class="tl-date">{{ entry.date | escape }}</span>
          {% if entry.link %}<a href="{{ entry.link | relative_url }}">{{ entry.title | escape }}</a>{% else %}<span>{{ entry.title | escape }}</span>{% endif %}
          <span class="tl-status">{{ entry.status | escape }}</span>
        </li>
        {% endfor %}
      </ul>
    </div>
  </div>
</section>

<section class="home-section section-about" id="about">
  <div class="about-content">
    <div class="profile-section">
      <img src="{{ '/assets/images/joshua_berkoh.jpg' | relative_url }}" alt="Joshua Berkoh" class="profile-image" loading="lazy" width="1400" height="2100" />
      <p class="profile-caption">Joshua Berkoh — Researcher &amp; threat investigator</p>
    </div>
    <div class="about-text">
      <p class="section-kicker">05 — About</p>
      <h2>Researcher &amp; threat investigator</h2>
      <p>I'm a PhD researcher in Information Technology and a practicing security professional. My work sits where intelligence analysis meets hands-on investigation: reconstructing intrusions, hunting suspicious activity in telemetry, and researching the infrastructure that threats rely on.</p>
      <p>I write every investigation to be defensible — evidence-first, mapped to MITRE ATT&amp;CK, and honest about confidence. Detection engineering is an area I'm actively studying and will publish as the work matures.</p>
      <div class="about-proof-grid">
        <div><strong>SOC Analyst</strong><span>Financial sector · 2021–22</span></div>
        <div><strong>Security Engineer Intern</strong><span>Intuit · 2023</span></div>
        <div><strong>Bug-Bounty Hall of Fame</strong><span>Multiple programs</span></div>
        <div><strong>PhD Researcher</strong><span>Information Tech · 2025–</span></div>
      </div>
      <a href="{{ '/about/' | relative_url }}" class="btn btn-outline btn-sm">More about me →</a>
    </div>
  </div>
</section>

<section class="home-section contact-section" id="contact">
  <div class="section-heading split-heading">
    <div>
      <p class="section-kicker">06 — Contact</p>
      <h2>Open to threat intelligence work</h2>
      <p class="section-intro">If your team works in cyber threat intelligence, threat hunting, or security research, I'd welcome a conversation.</p>
    </div>
    <div class="contact-card">
      <ul class="contact-links">
        <li><strong>LinkedIn</strong> <a href="https://linkedin.com/in/joshfiifi" rel="me">Joshua Berkoh →</a></li>
        <li><strong>GitHub</strong> <a href="https://github.com/joshberk" rel="me">@joshberk →</a></li>
        <li><strong>Résumé</strong> <a href="{{ '/resume/' | relative_url }}">View / download CV →</a></li>
      </ul>
    </div>
  </div>
</section>
