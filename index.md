---
layout: default
---

<section class="hero-section lab-hero">
  <div class="hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Cyber Threat Intelligence Lab</p>
      <h1>Tracking adversaries.<br>Hunting threats.<br>Producing actionable intelligence.</h1>
      <p class="hero-description">I'm Joshua Berkoh - a cybersecurity professional and PhD researcher working in threat investigations, threat hunting, and dark-web intelligence research. Through scenario-based investigations and security research, I reconstruct intrusion activity, map observed tradecraft to MITRE ATT&amp;CK, and turn raw telemetry into clear, defensible intelligence.</p>
      <div class="hero-buttons">
        <a href="{{ '/investigations/' | relative_url }}" class="btn btn-primary">View Investigations</a>
        <a href="{{ '/research/' | relative_url }}" class="btn btn-outline">Read Research</a>
        <a href="{{ '/resume/' | relative_url }}" class="btn btn-outline">Download Resume</a>
      </div>
      <div class="hero-stack" aria-label="Core focus areas">
        <span>Threat Investigations</span>
        <span>Dark-Web Intelligence Research</span>
        <span>Security Research</span>
        <span>Threat Hunting</span>
      </div>
    </div>

    <aside class="hero-intel-panel" aria-label="Analyst profile summary">
      <div class="intel-panel-grid" aria-hidden="true">
        <span class="node node-a"></span>
        <span class="node node-b"></span>
        <span class="node node-c"></span>
        <span class="node node-d"></span>
      </div>
      <p class="panel-label">Lab Snapshot</p>
      <h2>Evidence-first threat intelligence work</h2>
      <dl class="hero-metrics">
        <div><dt>Primary Work</dt><dd>Scenario-based investigations</dd></div>
        <div><dt>Research</dt><dd>I2P hidden-service ecosystem analysis</dd></div>
        <div><dt>Methods</dt><dd>KQL, OSINT, IOC pivoting, graph analysis</dd></div>
      </dl>
      <div class="analyst-card">
        <span class="analyst-status"></span>
        <div>
          <p class="analyst-name">Joshua Berkoh</p>
          <p class="analyst-role">Cybersecurity professional and PhD researcher</p>
        </div>
      </div>
    </aside>
  </div>
</section>

<section class="home-section home-section-emphasis" id="investigations">
  <div class="section-heading">
    <p class="section-kicker">Investigations</p>
    <h2>Featured investigations</h2>
    <p class="section-intro">Threat-investigation case studies: full intrusion reconstructions with timelines, IOC analysis, and MITRE ATT&amp;CK mapping. Developed from KC7 threat scenarios and written to professional intelligence-reporting standards.</p>
  </div>
  <div class="investigation-grid">
    {% assign investigations = site.investigations | sort: "date" | reverse %}
    {% for post in investigations limit:3 %}
      <article class="investigation-card case-file-card">
        <div class="case-file-topline">
          <span class="case-label">Case File</span>
          <span class="case-status">{% if post.status == 'Coming Soon' %}In Progress{% else %}{{ post.status | default: "Completed" | escape }}{% endif %}</span>
        </div>
        <div class="ic-tags">
          {% if post.sector %}<span class="ic-tag">{{ post.sector | escape }}</span>{% endif %}
          {% if post.threat_type %}<span class="ic-tag">{{ post.threat_type | escape }}</span>{% endif %}
          {% for tag in post.tags %}<span class="ic-tag">{{ tag | escape }}</span>{% endfor %}
        </div>
        <h3 class="ic-title">
          {% if post.status == 'Coming Soon' %}{{ post.title | escape }}{% else %}<a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>{% endif %}
        </h3>
        <p class="ic-desc">{{ post.description | strip_html | truncatewords: 26 | escape }}</p>
        <div class="case-methods">
          {% if post.attack_count %}<span>ATT&amp;CK: {{ post.attack_count }}</span>{% endif %}
          {% if post.confidence %}<span>Confidence: {{ post.confidence | escape }}</span>{% endif %}
          <span>KC7 Scenario</span>
        </div>
        <div class="ic-meta">
          {% if post.status == 'Coming Soon' %}<span class="ic-status">Coming soon</span>{% else %}<a class="ic-link" href="{{ post.url | relative_url }}">Read investigation -></a>{% endif %}
        </div>
      </article>
    {% endfor %}
  </div>
  <a href="{{ '/investigations/' | relative_url }}" class="btn btn-outline">View all investigations -></a>
</section>

<section class="home-section research-panel-section" id="research">
  <div class="section-heading">
    <p class="section-kicker">Research</p>
    <h2>Current research - dark-web intelligence</h2>
    <p class="section-intro">An intelligence-collection lens on anonymity infrastructure: discovering hidden services, mapping the relationships between them, and measuring how the ecosystem behaves at scale.</p>
  </div>
  <div class="research-feature research-lab-panel">
    <div>
      <div class="case-file-topline">
        <span class="case-label">Research Project</span>
        <span class="case-status">In Progress</span>
      </div>
      <h3>Mapping the I2P anonymous network</h3>
      <p>I'm building a cross-layer framework that fuses network-layer routing data with application-layer hidden-service ("eepsite") crawls into a single graph - making it possible to study anonymity infrastructure and the services riding on it as one connected hidden-service ecosystem. The work spans hidden-service discovery, infrastructure mapping, large-scale collection, and graph analysis.</p>
      <div class="research-tags">
        <span class="ic-tag">Dark-Web Intelligence</span>
        <span class="ic-tag">Hidden-Service Discovery</span>
        <span class="ic-tag">Infrastructure Mapping</span>
        <span class="ic-tag">Graph Analysis</span>
      </div>
      <a href="{{ '/research/' | relative_url }}" class="ic-link">Explore the research -></a>
    </div>
    <div class="method-panel" aria-label="Research methodology summary">
      <p class="activity-label">Methodology</p>
      <ol>
        <li>Discover hidden services</li>
        <li>Collect application-layer observations</li>
        <li>Fuse network and service relationships</li>
        <li>Analyze ecosystem structure as a graph</li>
      </ol>
    </div>
  </div>
</section>

<section class="home-section compact-section" id="capabilities">
  <div class="section-heading">
    <p class="section-kicker">Capabilities</p>
    <h2>What I do</h2>
    <p class="section-intro">Demonstrated competencies across the intelligence cycle - collection, analysis, and reporting - grounded in completed investigative and research work.</p>
  </div>
  <div class="home-summary capability-grid">
    <article class="summary-card"><h3>Cyber Threat Intelligence</h3><p>Collect, analyze, and report structured intelligence on threat activity, tradecraft, indicators, and investigative findings.</p></article>
    <article class="summary-card"><h3>Threat Hunting</h3><p>Hypothesis-driven hunts across endpoint and network telemetry using KQL and ATT&amp;CK.</p></article>
    <article class="summary-card"><h3>Threat Investigations</h3><p>End-to-end intrusion reconstruction - timelines, evidence, IOCs, and assessments.</p></article>
    <article class="summary-card"><h3>Dark-Web Intelligence</h3><p>Research into anonymity networks, hidden services, and underground infrastructure.</p></article>
    <article class="summary-card"><h3>Intelligence Research</h3><p>Structured analytic methods, source evaluation, and confidence-based judgments.</p></article>
    <article class="summary-card"><h3>Security Research</h3><p>Tooling, measurement, and methodology that extend how threats are studied.</p></article>
  </div>
</section>

<section class="home-section" id="activity">
  <div class="section-heading">
    <p class="section-kicker">Lab activity</p>
    <h2>Recent intelligence activity</h2>
    <p class="section-intro">A working record of what I'm building now and how the lab is growing over time.</p>
  </div>
  <div class="activity-grid">
    <div class="activity-col">
      <p class="activity-label">Currently working on</p>
      <ul class="activity-list">
        {% for item in site.data.current_work %}
        <li>{% if item.link %}<a href="{{ item.link | relative_url }}">{{ item.title | escape }}</a>{% else %}{{ item.title | escape }}{% endif %} <span class="tag-dev">{{ item.status | escape }}</span>{% if item.category %}<span class="muted">{{ item.category | escape }}</span>{% endif %}</li>
        {% endfor %}
      </ul>
    </div>
    <div class="activity-col">
      <p class="activity-label">Timeline</p>
      <ul class="timeline-list">
        {% for entry in site.data.timeline limit:7 %}
        <li><span class="tl-date">{{ entry.date | escape }}</span>{% if entry.link %}<a href="{{ entry.link | relative_url }}">{{ entry.title | escape }}</a>{% else %}{{ entry.title | escape }}{% endif %} <span class="tag-dev">{{ entry.status | escape }}</span>{% if entry.type %}<span class="muted">{{ entry.type | escape }}</span>{% endif %}</li>
        {% endfor %}
      </ul>
      <details class="timeline-more">
        <summary>Earlier milestones</summary>
        <ul class="timeline-list">
          {% for entry in site.data.timeline offset:7 %}
          <li><span class="tl-date">{{ entry.date | escape }}</span>{% if entry.link %}<a href="{{ entry.link | relative_url }}">{{ entry.title | escape }}</a>{% else %}{{ entry.title | escape }}{% endif %} <span class="tag-dev">{{ entry.status | escape }}</span>{% if entry.type %}<span class="muted">{{ entry.type | escape }}</span>{% endif %}</li>
          {% endfor %}
        </ul>
      </details>
    </div>
  </div>
</section>

<section class="home-section" id="publications">
  <div class="section-heading">
    <p class="section-kicker">Publications</p>
    <h2>Reports &amp; papers</h2>
    <p class="section-intro">Finished intelligence products and research output - investigation reports, research papers, and technical articles.</p>
  </div>
  <p>Published investigation reports are listed under <a href="{{ '/investigations/' | relative_url }}">Investigations</a>; academic and research output is collected on the Publications page.</p>
  <a href="{{ '/publications/' | relative_url }}" class="btn btn-outline">View publications -></a>
</section>

<section class="home-section" id="about">
  <div class="section-heading">
    <p class="section-kicker">About</p>
    <h2>Researcher &amp; threat investigator</h2>
  </div>
  <div class="about-content">
    <div class="profile-section">
      <img src="{{ '/assets/images/jjc.JPG' | relative_url }}" alt="Joshua Berkoh" class="profile-image" loading="lazy" width="200" height="300" />
    </div>
    <div class="about-text">
      <p>I'm a PhD researcher in Information Technology and a practicing security professional. My work sits where intelligence analysis meets hands-on investigation: reconstructing intrusions, hunting for adversary activity in telemetry, and researching the infrastructure that threats rely on. I've served as a SOC analyst defending financial institutions and as a security engineering intern, and I hold hall-of-fame recognition from multiple bug-bounty programs.</p>
      <p>I write every investigation to be defensible - evidence-first, mapped to MITRE ATT&amp;CK, and honest about confidence. Detection engineering is an area I'm actively studying and will publish as the work matures.</p>
      <a href="{{ '/about/' | relative_url }}" class="ic-link">More about me -></a>
    </div>
  </div>
</section>

<section class="home-section contact-section" id="contact">
  <div class="section-heading">
    <p class="section-kicker">Contact</p>
    <h2>Open to threat intelligence work</h2>
    <p class="section-intro">If your team works in cyber threat intelligence, threat hunting, or security research, I'd welcome a conversation.</p>
  </div>
  <div class="contact-card">
    <ul class="contact-links">
      <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/joshfiifi" rel="me">Joshua Berkoh</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/joshberk" rel="me">@joshberk</a></li>
      <li><strong>Resume:</strong> <a href="{{ '/resume/' | relative_url }}">View / download CV</a></li>
    </ul>
  </div>
</section>
