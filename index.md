---
layout: default
title: Home
---

<div class="hero-section">
  <h1>Hi, I'm <span class="accent-text">{{ site.title }}</span></h1>
  <p class="hero-description">{{ site.description }}</p>
  <div class="hero-buttons">
    <a href="#about-me" class="btn btn-primary">Learn More</a>
    <a href="assets/resume.pdf" class="btn btn-outline" target="_blank" rel="noopener noreferrer">View CV</a>
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

## About Me

<div class="about-content">
  <div class="profile-section">
    <img src="assets/images/jjc.JPG" alt="Joshua Offe Berkoh profile photo" class="profile-image" loading="lazy" width="200" height="300" />
  </div>
  
  <div class="about-text">
    <p>
     I am a PhD candidate in Information Technology at the University of Cincinnati, with an anticipated graduation in August 2028. 
     My research focuses on applied cryptography, secure systems, and the design of privacy-preserving infrastructure especially within 
     anonymous communication networks like I2P. At the core of my work is a commitment to developing secured search solutions but also practical, 
     scalable, and impactful in real-world security settings.
    </p>
    
    <p>
      My academic foundation was shaped through both master's and doctoral studies at the University of Cincinnati, 
      where I earned my MS in Information Technology in August 2024. I have a multi-phase research roadmap to bridge the gap between cryptographic theory and practice. 
      It starts with the foundational number theory and provable security required for academic rigor and extends through practical implementation to ensure the results 
      are industry ready.
    </p>

    <details>
      <summary>Read More</summary>
      <p>
        Professionally, I've built experience across academia, industry, and high-stakes security environments. As a Security Engineer Intern at Intuit Inc.,
        I contributed to internal security tooling and infrastructure hardening within a large-scale cloud environment. As an Adjunct Instructor at the University of Cincinnati,
        I redesigned and delivered undergraduate curricula in IT fundamentals, introducing hands-on labs that emphasized secure coding and systems thinking,
        training nearly 50 students in each cohort.
      </p>
      <p>
        Previously, I served as a Security Operations Analyst at Virtual Infosec Africa, where I monitored critical financial infrastructure, 
        helping the Banking system achieve > 60% detection rate and significantly reduce incident response times. I continue to sharpen my offensive 
        and defensive skills by actively participating in Capture The Flag competitions and bug bounty programs, 
        with acknowledgments from platforms like HackerOne and MetaCTF and hackinghub.
      </p>
      <p>
        I'm equally passionate about community and mentorship. As a lead mentor with OWASP Cincinnati, an ISC² examination developer, and an AWS Community Builder, 
        I contribute to open-source documentation, support peer learning, and guide aspiring security professionals. Currently, I'm also building tooling for 
        cryptographic protocol analysis, integrating Python and Rust for practical implementations of secure systems.
      </p>
      <p>
        Long term, I aim to advance the state of applied cryptography by bridging academic research and industry deployment pioneering systems 
        that are both provably secure and operationally robust.
      </p>
    </details>
  </div>
</div>

## Latest Blog Posts

<div class="posts-grid">
  {% for post in site.posts limit:3 %}
    <article class="post-preview">
      <h3><a href="{{ post.url }}">{{ post.title }}</a></h3>
      <p class="post-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
        {% if post.discipline %} • {{ post.discipline }}{% endif %}
        {% if post.type %} • {{ post.type }}{% endif %}
      </p>
      <p>{{ post.description | default: post.excerpt | strip_html | truncatewords: 30 }}</p>
    </article>
  {% endfor %}
</div>

<a href="/blog" class="btn btn-outline">View All Posts →</a>

## Skills

#### Programming Languages
<div class="skills-group">
  <span class="skill-badge">Python</span>
  <span class="skill-badge">HTML &amp; CSS</span>
  <span class="skill-badge">JavaScript</span>
  <span class="skill-badge">SQL</span>
  <span class="skill-badge">Rust</span>
</div>

#### Cybersecurity &amp; Cryptography
<div class="skills-group">
  <span class="skill-badge">Applied Cryptography</span>
  <span class="skill-badge">Security Analysis</span>
  <span class="skill-badge">Vulnerability Assessment</span>
  <span class="skill-badge">Incident Response</span>
  <span class="skill-badge">Secure Systems Design</span>
</div>

#### Tools &amp; Frameworks
<div class="skills-group">
  <span class="skill-badge">Git &amp; Version Control</span>
  <span class="skill-badge">Linux / Unix</span>
  <span class="skill-badge">AWS</span>
  <span class="skill-badge">Docker</span>
  <span class="skill-badge">Research &amp; Academic Writing</span>
</div>

## Publications & Research

{% include publications.html %}

## Contact

Ready to collaborate on cryptography research or cybersecurity projects? Let's connect:

- **LinkedIn**: [Joshua Berkoh](https://linkedin.com/in/joshua-berkoh){:rel="me"}
- **GitHub**: [@joshberk](https://github.com/joshberk){:rel="me"}