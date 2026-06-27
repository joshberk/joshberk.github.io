---
layout: default
---

{% assign completed_investigations = site.investigations | where: "status", "Completed" %}
{% assign completed_count = completed_investigations.size %}

<section class="hero-section lab-hero">
  <div class="hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Cyber Threat Intelligence - Threat Hunting - Dark-Web Research</p>
      <h1>Tracking adversaries.<br>Hunting threats.<br>Producing actionable intelligence.</h1>
      <p class="hero-description">I'm Joshua Berkoh - a cybersecurity professional and PhD researcher working in threat investigations, threat hunting, and dark-web intelligence research. Through scenario-based investigations and security research, I reconstruct intrusion activity, map observed tradecraft to MITRE ATT&amp;CK, and turn raw telemetry into clear, defensible intelligence.</p>
      <div class="hero-buttons">
        <a href="{{ '/investigations/' | relative_url }}" class="btn btn-primary">View Investigations</a>
        <a href="{{ '/research/' | relative_url }}" class="btn btn-outline">Read Research</a>
        <a href="{{ '/resume/' | relative_url }}" class="btn btn-outline">Download Resume</a>
      </div>
      <div class="hero-stack" aria-label="Core methods">
        <span>MITRE ATT&amp;CK</span>
        <span>KQL</span>
        <span>OSINT</span>
        <span>IOC Pivoting</span>
        <span>Python</span>
        <span>Graph Analysis</span>
      </div>
    </div>

    <aside class="hero-intel-panel" aria-label="Lab index">
      <p class="panel-label">Lab Index</p>
      <dl class="hero-metrics">
        <div><dt>Investigation Files Published</dt><dd>{% if completed_count < 10 %}0{% endif %}{{ completed_count }}</dd></div>
        <div><dt>Active Research</dt><dd>I2P Mapping</dd></div>
        <div><dt>Discipline</dt><dd>CTI - DFIR - OSINT</dd></div>
      </dl>
    </aside>
  </div>
</section>

<section class="home-section compact-section section-capabilities" id="capabilities">
  <div class="section-heading split-heading">
    <div>
      <p class="section-kicker">01 - Capabilities</p>
      <h2>What I do</h2>
    </div>
    <p class="section-intro">Demonstrated competencies across the intelligence cycle - collection, analysis, and reporting - grounded in completed investigative and research work.</p>
  </div>
  <div class="home-summary capability-grid">
    <article class="summary-card"><span class="card-number">01</span><span class="card-badge">CTI</span><h3>Cyber Threat Intelligence</h3><p>Collect, analyze, and report structured intelligence on threat activity, tradecraft, indicators, and investigative findings.</p></article>
    <article class="summary-card"><span class="card-number">02</span><span class="card-badge">Hunt</span><h3>Threat Hunting</h3><p>Hypothesis-driven hunts across endpoint and network telemetry using KQL and ATT&amp;CK.</p></article>
    <article class="summary-card"><span class="card-number">03</span><span class="card-badge">DFIR</span><h3>Threat Investigations</h3><p>End-to-end intrusion reconstruction - timelines, evidence, IOCs, and assessments.</p></article>
    <article class="summary-card"><span class="card-number">04</span><span class="card-badge">I2P</span><h3>Dark-Web Intelligence</h3><p>Research into anonymity networks, hidden services, and underground infrastructure.</p></article>
    <article class="summary-card"><span class="card-number">05</span><span class="card-badge">SATI</span><h3>Intelligence Research</h3><p>Structured analytic methods, source evaluation, and confidence-based judgments.</p></article>
    <article class="summary-card"><span class="card-number">06</span><span class="card-badge">Method</span><h3>Security Research</h3><p>Tooling, measurement, and methodology that extend how threats are studied.</p></article>
  </div>
</section>

<section class="home-section home-section-emphasis section-investigations" id="investigations">
  <div class="section-heading">
    <p class="section-kicker">02 - Investigations</p>
    <h2>Featured investigations</h2>
    <p class="section-intro">Threat-investigation case studies: full intrusion reconstructions with timelines, IOC analysis, and MITRE ATT&amp;CK mapping. Developed from KC7 threat scenarios and written to professional intelligence-reporting standards.</p>
  </div>
  <div class="investigation-grid">
    {% assign investigations = site.investigations | sort: "date" | reverse %}
    {% for post in investigations limit:3 %}
      <article class="investigation-card case-file-card{% if post.status == 'Coming Soon' %} case-file-muted{% endif %}">
        <div class="case-card-body">
          <div class="case-file-topline">
            <span class="case-label">Case-{{ post.date | date: "%Y-%m" }}</span>
            {% if post.sector %}<span class="case-label">{{ post.sector | escape }}</span>{% endif %}
            {% if post.threat_type %}<span class="case-label">{{ post.threat_type | escape }}</span>{% endif %}
          </div>
          <h3 class="ic-title">
            {% if post.status == 'Coming Soon' %}{{ post.title | escape }}{% else %}<a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>{% endif %}
          </h3>
          <p class="ic-desc">{{ post.description | strip_html | truncatewords: 24 | escape }}</p>
        </div>
        <div class="case-card-metrics">
          {% if post.attack_count %}<div><strong>{{ post.attack_count }}</strong><span>ATT&amp;CK techniques</span></div>{% endif %}
          {% if post.confidence %}<div><strong>{{ post.confidence }}</strong><span>Confidence</span></div>{% endif %}
          {% if post.status == 'Coming Soon' %}
            <span class="case-status">In Progress - Coming Soon</span>
          {% else %}
            <a class="ic-link" href="{{ post.url | relative_url }}">Read investigation -></a>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
  <a href="{{ '/investigations/' | relative_url }}" class="btn btn-outline">View all investigations -></a>
</section>

<section class="home-section research-panel-section" id="research">
  <div class="section-heading">
    <p class="section-kicker">03 - Research</p>
    <h2>Current research - dark-web intelligence</h2>
  </div>
  <div class="research-feature research-lab-panel">
    <div class="research-copy">
      <h3>Mapping the I2P anonymous network</h3>
      <p>I'm building a cross-layer framework that fuses network-layer routing data with application-layer hidden-service ("eepsite") crawls into a single graph - making it possible to study anonymity infrastructure and the services riding on it as one connected hidden-service ecosystem. The work spans hidden-service discovery, infrastructure mapping, large-scale collection, and graph analysis.</p>
      <div class="research-tags">
        <span class="ic-tag">Hidden-Service Discovery</span>
        <span class="ic-tag">Infrastructure Mapping</span>
        <span class="ic-tag">Graph Analysis</span>
      </div>
      <a href="{{ '/research/' | relative_url }}" class="btn btn-outline">Explore the research -></a>
    </div>
    <div class="method-panel intel-graph-panel" aria-label="I2P graph illustration">
      <span class="graph-node graph-node-a"></span>
      <span class="graph-node graph-node-b"></span>
      <span class="graph-node graph-node-c"></span>
      <span class="graph-node graph-node-d"></span>
      <span class="graph-node graph-node-e"></span>
      <span class="graph-node graph-node-f"></span>
      <span class="graph-node graph-node-core"></span>
      <p>I2P-LAB - Graph Relationship System</p>
    </div>
  </div>
</section>

<section class="home-section section-activity" id="activity">
  <div class="section-heading">
    <p class="section-kicker">04 - Lab Activity</p>
    <h2>Recent intelligence activity</h2>
  </div>
  <div class="activity-grid">
    <div class="activity-col">
      <p class="activity-label">Currently working on</p>
      <ul class="activity-list">
        {% for item in site.data.current_work limit:4 %}
        <li>{% if item.link %}<a href="{{ item.link | relative_url }}">{{ item.title | escape }}</a>{% else %}{{ item.title | escape }}{% endif %} <span class="tag-dev">{{ item.status | escape }}</span>{% if item.category %}<span class="muted">{{ item.category | escape }}</span>{% endif %}</li>
        {% endfor %}
      </ul>
    </div>
    <div class="activity-col">
      <p class="activity-label">Timeline</p>
      <ul class="timeline-list">
        {% for entry in site.data.timeline limit:9 %}
        <li><span class="tl-date">{{ entry.date | escape }}</span>{% if entry.link %}<a href="{{ entry.link | relative_url }}">{{ entry.title | escape }}</a>{% else %}{{ entry.title | escape }}{% endif %} <span class="tag-dev">{{ entry.status | escape }}</span></li>
        {% endfor %}
      </ul>
    </div>
  </div>
</section>

<section class="home-section section-publications" id="publications">
  <div class="section-heading split-heading">
    <div>
      <p class="section-kicker">05 - Publications</p>
      <h2>Reports &amp; papers</h2>
    </div>
    <div>
      <p class="section-intro">Finished intelligence products and research output - investigation reports, research papers, and technical articles.</p>
      <p>Published investigation reports are listed under <a href="{{ '/investigations/' | relative_url }}">Investigations</a>; academic and research output is collected on the Publications page.</p>
      <a href="{{ '/publications/' | relative_url }}" class="btn btn-outline">View publications -></a>
    </div>
  </div>
</section>

<section class="home-section section-about" id="about">
  <div class="about-content">
    <div class="profile-section">
      <img src="{{ '/assets/images/joshua_berkoh.jpg' | relative_url }}" alt="Joshua Berkoh" class="profile-image" loading="lazy" width="1400" height="2100" />
    </div>
    <div class="about-text">
      <p class="section-kicker">06 - About</p>
      <h2>Researcher &amp; threat investigator</h2>
      <p>I'm a PhD researcher in Information Technology and a practicing security professional. My work sits where intelligence analysis meets hands-on investigation: reconstructing intrusions, hunting for adversary activity in telemetry, and researching the infrastructure that threats rely on.</p>
      <p>I write every investigation to be defensible - evidence-first, mapped to MITRE ATT&amp;CK, and honest about confidence. Detection engineering is an area I'm actively studying and will publish as the work matures.</p>
      <div class="about-proof-grid">
        <span>SOC Analyst - 2021-22</span>
        <span>Security Engineer Intern - 2023</span>
        <span>Bug Bounty Hall of Fame</span>
        <span>PhD Researcher - 2025-</span>
      </div>
      <a href="{{ '/about/' | relative_url }}" class="btn btn-outline">More about me -></a>
    </div>
  </div>
</section>

<section class="home-section contact-section" id="contact">
  <div class="section-heading split-heading">
    <div>
      <p class="section-kicker">07 - Contact</p>
      <h2>Open to threat intelligence work</h2>
      <p class="section-intro">If your team works in cyber threat intelligence, threat hunting, or security research, I'd welcome a conversation.</p>
    </div>
    <div class="contact-card">
      <ul class="contact-links">
        <li><strong>LinkedIn</strong> <a href="https://linkedin.com/in/joshfiifi" rel="me">Joshua Berkoh -></a></li>
        <li><strong>GitHub</strong> <a href="https://github.com/joshberk" rel="me">@joshberk -></a></li>
        <li><strong>Resume</strong> <a href="{{ '/resume/' | relative_url }}">View / download CV -></a></li>
      </ul>
    </div>
  </div>
</section>
