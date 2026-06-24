---
layout: default
title: Home
---

<div class="hero-section">
  <div class="hero-grid">
    <div class="hero-copy">
      <p class="eyebrow">Security Research · Applied Cryptography · Detection Engineering</p>
      <h1>Hi, I'm <span class="accent-text">{{ site.title | escape }}</span></h1>
      <p class="hero-description">{{ site.description | escape }}</p>
      <div class="hero-buttons">
        <a href="#about-me" class="btn btn-primary">Learn More</a>
        <a href="https://linkedin.com/in/joshfiifi" class="btn btn-outline" target="_blank" rel="me noopener noreferrer">LinkedIn</a>
        <a href="/resume/" class="btn btn-outline">View CV</a>
      </div>
    </div>
    <aside class="hero-panel">
      <p class="hero-panel-label">Current Focus</p>
      <ul class="hero-panel-list">
        <li>Privacy-preserving infrastructure research</li>
        <li>Detection engineering grounded in real telemetry</li>
        <li>Secure systems that bridge theory and deployment</li>
      </ul>
    </aside>
  </div>
</div>

<div class="philosophy-quote">
  <div class="terminal-header">
    <span class="terminal-dot red"></span>
    <span class="terminal-dot yellow"></span>
    <span class="terminal-dot green"></span>
    <span class="terminal-path">~/philosophy</span>
  </div>
  <div class="terminal-body">
    <p class="terminal-command"><span class="prompt">$</span> cat /etc/philosophy.conf</p>
    <blockquote class="terminal-quote">
      "Each problem that I solved became a rule which served afterwards to solve other problems."
    </blockquote>
    <p class="terminal-author"># — René Descartes</p>
  </div>
</div>

<div class="home-summary">
  <article class="summary-card">
    <p class="summary-label">Research</p>
    <p>Applied cryptography, secure systems, and privacy-preserving infrastructure.</p>
  </article>
  <article class="summary-card">
    <p class="summary-label">Practice</p>
    <p>Threat detection engineering, security tooling, and telemetry-driven validation.</p>
  </article>
  <article class="summary-card">
    <p class="summary-label">Direction</p>
    <p>Bridging academic rigor with operationally useful security outcomes.</p>
  </article>
</div>

<section class="home-section" id="about-me">
  <div class="section-heading">
    <p class="section-kicker">About</p>
    <h2>Researcher first, builder always</h2>
    <p class="section-intro">My work sits at the intersection of rigorous security research and practical implementation.</p>
  </div>

  <div class="about-content">
    <div class="profile-section">
      <img src="assets/images/jjc.JPG" alt="Joshua Offe Berkoh profile photo" class="profile-image" loading="lazy" width="200" height="300" />
    </div>
    
    <div class="about-text">
      <p>
        Joshua Berkoh is a PhD candidate in Information Technology at the University of Cincinnati, where his dissertation develops a cross-layer graph framework for measuring the I2P anonymous overlay network. His research fuses network-layer router data with application-layer eepsite crawls into a single directed multiplex graph, making it possible to study how anonymity infrastructure and the hidden services that ride on top of it interact as one system rather than two disconnected layers. Joshua's broader research interests center on the application of graph theory to complex, real-world systems, with extensions into anonymous communications, applied cryptography, detection engineering, and machine learning for security. He is particularly interested in research and applied settings, including national laboratories, federal research programs, and industry research labs where graph-theoretic methods can be brought to bear on hard problems in security, infrastructure, and large-scale networked systems.
      </p>

      <details>
        <summary>Read More</summary>
        <p>
          Alongside his academic work, Joshua is a practicing detection engineer and SOC analyst. He previously served as a Security Operations Center Analyst at Virtual Infosec Africa, defending the security systems of financial institutions, and as a Security Engineering Intern at Intuit, where he integrated automated compliance checks into the security pipeline. He maintains a home detection lab built on Elastic Stack, Sysmon, and KQL rules mapped to MITRE ATT&CK, which he uses both for self-directed research and as a teaching platform.
        </p>
        <p>
          Joshua's professional path has been shaped by a long history of community involvement and applied practice. He has served as an adjunct instructor at the University of Cincinnati, mentored at the OWASP Cincinnati Chapter, contributed to ISC2 as a certification examination developer, and held an AWS Community Builder role. He is also a former bug bounty researcher, with hall-of-fame recognition across multiple programs, and has competed in cybersecurity capture-the-flag events including Security Innovation, Hacker101, MetaCTF, and Tracelabs OSINT.
        </p>
      </details>
    </div>
  </div>
</section>

<section class="home-section home-section-emphasis">
  <div class="section-heading">
    <p class="section-kicker">Writing</p>
    <h2>Recent work and technical notes</h2>
    <p class="section-intro">A mix of research reflections, study notes, and engineering write-ups grounded in security practice.</p>
  </div>

  <div class="posts-grid">
    {% for post in site.posts limit:3 %}
      <article class="post-preview{% if post.status == 'Coming Soon' %} coming-soon-preview{% endif %}">
        <h3>
          {% if post.status == 'Coming Soon' %}
            {{ post.title | escape }}
          {% else %}
            <a href="{{ post.url | relative_url | escape }}">{{ post.title | escape }}</a>
          {% endif %}
        </h3>
        <p class="post-meta">
          <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
          {% if post.discipline %} • {{ post.discipline | escape }}{% endif %}
          {% if post.type %} • {{ post.type | escape }}{% endif %}
        </p>
        <p>{{ post.description | default: post.excerpt | strip_html | truncatewords: 30 | escape }}</p>
        {% if post.status == 'Coming Soon' %}
          <span class="coming-soon-badge">Coming Soon · Investigation in Progress</span>
        {% endif %}
      </article>
    {% endfor %}
  </div>

  <a href="/blog" class="btn btn-outline">View All Posts →</a>
</section>

<section class="home-section">
  <div class="section-heading">
    <p class="section-kicker">Projects</p>
    <h2>Public repositories and ongoing builds</h2>
    <p class="section-intro">Selected work that reflects my current engineering interests and experimentation.</p>
  </div>
  {% include github_contributions.html hide_title=true %}
</section>

<section class="home-section">
  <div class="section-heading">
    <p class="section-kicker">Capabilities</p>
    <h2>Technical focus areas</h2>
    <p class="section-intro">Core languages, security domains, and systems skills that shape my research and engineering work.</p>
  </div>

  <div class="skills-columns">
    <div class="skills-panel">
      <h4>Programming Languages</h4>
      <div class="skills-group">
        <span class="skill-badge">Python</span>
        <span class="skill-badge">HTML &amp; CSS</span>
        <span class="skill-badge">JavaScript</span>
        <span class="skill-badge">SQL</span>
        <span class="skill-badge">Rust</span>
      </div>
    </div>

    <div class="skills-panel">
      <h4>Cybersecurity &amp; Cryptography</h4>
      <div class="skills-group">
        <span class="skill-badge">Applied Cryptography</span>
        <span class="skill-badge">Security Analysis</span>
        <span class="skill-badge">Vulnerability Assessment</span>
        <span class="skill-badge">Incident Response</span>
        <span class="skill-badge">Secure Systems Design</span>
      </div>
    </div>

    <div class="skills-panel">
      <h4>Tools &amp; Frameworks</h4>
      <div class="skills-group">
        <span class="skill-badge">Git &amp; Version Control</span>
        <span class="skill-badge">Linux / Unix</span>
        <span class="skill-badge">AWS</span>
        <span class="skill-badge">Docker</span>
        <span class="skill-badge">Research &amp; Academic Writing</span>
      </div>
    </div>
  </div>
</section>

<section class="home-section">
  <div class="section-heading">
    <p class="section-kicker">Publications</p>
    <h2>Research in progress</h2>
    <p class="section-intro">Current academic work and emerging directions in secure systems and privacy-preserving infrastructure.</p>
  </div>
  {% include publications.html %}
</section>

<section class="home-section contact-section">
  <div class="section-heading">
    <p class="section-kicker">Contact</p>
    <h2>Open to research and security collaboration</h2>
    <p class="section-intro">If your work sits near applied cryptography, secure systems, or detection engineering, let’s talk.</p>
  </div>

  <div class="contact-card">
    <p>Ready to collaborate on cryptography research or cybersecurity projects? Let's connect.</p>
    <ul class="contact-links">
      <li><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/joshfiifi" rel="me">Joshua Berkoh</a></li>
      <li><strong>GitHub:</strong> <a href="https://github.com/joshberk" rel="me">@joshberk</a></li>
    </ul>
  </div>
</section>
