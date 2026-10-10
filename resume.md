---
layout: default
title: Resume
permalink: /resume/
description: "Resume of Joshua Offe Berkoh — cyber threat intelligence, threat investigations, threat hunting, and dark-web intelligence research, presented as a native, readable CV."
---

<section class="page-hero resume-hero">
  <p class="eyebrow">Curriculum Vitae</p>
  <h1>Joshua Offe Berkoh</h1>
  <p class="resume-tagline">Threat Intelligence &amp; Security Research · Threat Hunting · Dark-Web Intelligence</p>
  <ul class="resume-contact">
    <li><span class="rc-key">Based in</span><span class="rc-val">Cincinnati, OH</span></li>
    <li><span class="rc-key">LinkedIn</span><a class="rc-val" href="https://linkedin.com/in/joshfiifi" rel="me">/in/joshfiifi</a></li>
    <li><span class="rc-key">GitHub</span><a class="rc-val" href="https://github.com/joshberk" rel="me">@joshberk</a></li>
    <li><span class="rc-key">Lab</span><a class="rc-val" href="{{ '/' | relative_url }}">joshuaberkoh.engineer</a></li>
  </ul>
  <div class="page-hero-actions">
    <a class="btn btn-primary" href="{{ '/investigations/' | relative_url }}">Investigation portfolio</a>
    <a class="btn btn-outline" href="{{ '/contact/' | relative_url }}">Get in touch</a>
  </div>
</section>

<section class="home-section resume-section" id="summary">
  <div class="section-heading"><p class="section-kicker">Professional Summary</p><h2>Summary</h2></div>
  <p class="resume-summary">Cybersecurity professional and PhD researcher focused on threat investigations, threat hunting, OSINT, and dark-web intelligence research. I publish scenario-based investigation reports through the Cyber Threat Intelligence Lab — KQL and Azure Data Explorer analysis, IOC pivoting, timeline reconstruction, MITRE ATT&amp;CK mapping — built on SOC experience, security engineering, and Python-driven research workflows.</p>
</section>

<section class="home-section resume-section" id="competencies">
  <div class="section-heading"><p class="section-kicker">Core Competencies</p><h2>What I do</h2></div>
  <div class="home-summary">
    <div class="summary-card">
      <h3>Threat Investigations</h3>
      <p>KQL log analysis, Azure Data Explorer, telemetry correlation, intrusion timeline reconstruction, and IOC pivoting.</p>
    </div>
    <div class="summary-card">
      <h3>Cyber Threat Intelligence</h3>
      <p>Intelligence collection, source evaluation, ATT&amp;CK mapping, indicator analysis, structured reporting, and confidence-based assessment.</p>
    </div>
    <div class="summary-card">
      <h3>Threat Hunting &amp; SOC</h3>
      <p>Hypothesis-driven hunting, alert triage, SIEM monitoring, incident response support, and network traffic analysis.</p>
    </div>
    <div class="summary-card">
      <h3>Dark-Web Research</h3>
      <p>I2P hidden-service measurement, longitudinal churn analysis, link-graph analysis, and Python / MariaDB workflows.</p>
    </div>
    <div class="summary-card">
      <h3>Technical Tooling</h3>
      <p>Python, SQL, KQL, Wireshark, Splunk, Burp Suite, Nmap, Metasploit, Nessus, Docker, Kali Linux, and MariaDB.</p>
    </div>
  </div>
</section>

<section class="home-section resume-section section-investigations" id="portfolio">
  <div class="section-heading"><p class="section-kicker">Public Threat Investigation Portfolio</p><h2>Cyber Threat Intelligence Lab</h2></div>

  <article class="resume-entry">
    <div class="resume-entry-head">
      <div class="resume-entry-id">
        <h3 class="resume-role">Scenario-Based Threat Investigations</h3>
        <p class="resume-org">Cyber Threat Intelligence Lab</p>
      </div>
      <p class="resume-dates">2026 – Present</p>
    </div>
    <ul class="resume-bullets">
      <li>Publish professional investigation reports built on KC7 realistic enterprise scenarios, clearly marked as training-environment investigations rather than client incidents.</li>
      <li>Apply KQL and Azure Data Explorer to analyze email, process, authentication, network-flow, file-creation, passive-DNS, and web telemetry.</li>
      <li>Document incident timelines, IOCs, confidence levels, observed TTPs, MITRE ATT&amp;CK mappings, investigative conclusions, and evidence screenshots.</li>
    </ul>
  </article>

  <div class="resume-cases">
    <article class="resume-case">
      <p class="resume-case-label">Case File</p>
      <h4 class="resume-case-title"><a href="{{ '/investigations/solvi-systems/' | relative_url }}">Solvi Systems — A Tale of Supply Chains &amp; ICS</a></h4>
      <p class="resume-case-desc">Reconstructed a critical-infrastructure supply-chain intrusion against an ICS software vendor — from web reconnaissance and spear phishing to C2 persistence, lateral movement, and SDLC source-code exfiltration.</p>
      <div class="resume-case-metrics">
        <div><strong>470</strong><span>C2 connections</span></div>
        <div><strong>38</strong><span>endpoints</span></div>
        <div><strong>8</strong><span>ATT&amp;CK techniques</span></div>
      </div>
    </article>

    <article class="resume-case">
      <p class="resume-case-label">Case File</p>
      <h4 class="resume-case-title"><a href="{{ '/investigations/inside-encryptodera/' | relative_url }}">Inside Encryptodera — An Insider-Threat Scenario</a></h4>
      <p class="resume-case-desc">Analyzed a dual-track financial-services compromise: a 27-day FTP exfiltration of cold-storage wallet data alongside hijacked-identity Active Directory ransomware, correlating network, file, process, and authentication telemetry.</p>
      <div class="resume-case-metrics">
        <div><strong>306</strong><span>endpoints impacted</span></div>
        <div><strong>27</strong><span>day exfiltration</span></div>
        <div><strong>8</strong><span>ATT&amp;CK techniques</span></div>
      </div>
    </article>

    <article class="resume-case">
      <p class="resume-case-label">Case File</p>
      <h4 class="resume-case-title"><a href="{{ '/investigations/valdoria-votes/' | relative_url }}">Valdoria Votes</a></h4>
      <p class="resume-case-desc">Investigating a public-sector election-infrastructure APT scenario focused on persistence mechanisms, multi-hop C2, domain-registrar anomalies, and infrastructure tracking.</p>
      <p class="resume-case-status">In progress</p>
    </article>
  </div>
</section>

<section class="home-section resume-section" id="experience">
  <div class="section-heading"><p class="section-kicker">Professional Experience</p><h2>Experience</h2></div>

  <div class="resume-entries">
    <article class="resume-entry">
      <div class="resume-entry-head">
        <div class="resume-entry-id">
          <h3 class="resume-role">Security Engineer Intern</h3>
          <p class="resume-org">Intuit Inc. <span class="resume-loc">· San Diego, CA</span></p>
        </div>
        <p class="resume-dates">Jun 2023 – Sep 2023</p>
      </div>
      <ul class="resume-bullets">
        <li>Consolidated security repositories into red-team toolsets, improving operational efficiency by 20%.</li>
        <li>Automated code-based compliance validation through Tox integration, reducing manual review effort by 30%.</li>
        <li>Resolved compliance-related security issues before deployment, contributing to remediation of 70% of identified vulnerabilities.</li>
        <li>Collaborated with cross-functional teams to improve security controls, deployment readiness, and control-validation workflows.</li>
      </ul>
    </article>

    <article class="resume-entry">
      <div class="resume-entry-head">
        <div class="resume-entry-id">
          <h3 class="resume-role">Adjunct Instructor</h3>
          <p class="resume-org">University of Cincinnati <span class="resume-loc">· Cincinnati, OH</span></p>
        </div>
        <p class="resume-dates">Jan 2023 – Apr 2023</p>
      </div>
      <ul class="resume-bullets">
        <li>Delivered hands-on cybersecurity learning activities focused on practical security concepts, applied investigation, and problem solving.</li>
        <li>Improved student performance by 15% through applied exercises, structured feedback, and technical mentoring.</li>
      </ul>
    </article>

    <article class="resume-entry">
      <div class="resume-entry-head">
        <div class="resume-entry-id">
          <h3 class="resume-role">Security Operations Center Analyst</h3>
          <p class="resume-org">Virtual Infosec Africa <span class="resume-loc">· Accra, Ghana</span></p>
        </div>
        <p class="resume-dates">Oct 2021 – Jun 2022</p>
      </div>
      <ul class="resume-bullets">
        <li>Monitored and analyzed network activity supporting a 95% intrusion-detection rate for a major financial institution.</li>
        <li>Investigated security events and supported incident response, reducing response times by 30%.</li>
        <li>Assisted with deployment and operation of SOC security solutions that contributed to a 20% reduction in cybersecurity incidents.</li>
        <li>Performed threat monitoring, alert triage, and suspicious-activity analysis to support proactive mitigation.</li>
      </ul>
    </article>
  </div>
</section>

<section class="home-section resume-section" id="research">
  <div class="section-heading"><p class="section-kicker">Research &amp; Technical Writing</p><h2>Research</h2></div>

  <div class="resume-entries">
    <article class="resume-entry">
      <div class="resume-entry-head">
        <div class="resume-entry-id">
          <h3 class="resume-role">I2P Hidden Service Ecosystem Analysis</h3>
          <p class="resume-org">PhD Research · University of Cincinnati</p>
        </div>
        <p class="resume-dates">2025 – Present</p>
      </div>
      <ul class="resume-bullets">
        <li>Lead a three-study PhD research program measuring the I2P anonymity network's hidden-service (eepsite) ecosystem.</li>
        <li>Study 1 (completed): built XL-I2P, a verify-then-crawl measurement framework, and benchmarked it against the c4i2p baseline — 1,400 eepsites crawled, 366,304 hyperlinks extracted; manuscript under review; validation datasets published on IEEE DataPort (DOI: 10.21227/rkan-zq07).</li>
        <li>Study 2 (in progress): longitudinal campaign collecting epoch-tagged observations to measure eepsite churn against application-layer link-graph change, with survival analysis.</li>
        <li>Engineer Python/MariaDB collection pipelines with immutable audit trails, error taxonomies, and provenance-separated network-layer observations; all reachability measured from a single disclosed vantage.</li>
      </ul>
    </article>

    <article class="resume-entry">
      <div class="resume-entry-head">
        <div class="resume-entry-id">
          <h3 class="resume-role">Threat Analysis, Detection &amp; Mitigation</h3>
          <p class="resume-org">University of Cincinnati</p>
        </div>
        <p class="resume-dates">Jan 2023 – Apr 2023</p>
      </div>
      <ul class="resume-bullets">
        <li>Researched APT tactics, techniques, procedures, and defensive countermeasures.</li>
        <li>Applied behavioral analytics and threat-intelligence concepts to support detection and mitigation planning.</li>
      </ul>
    </article>
  </div>
</section>

<section class="home-section resume-section" id="publications">
  <div class="section-heading"><p class="section-kicker">Research Papers</p><h2>Publications</h2></div>
  <ul class="activity-list">
    <li><strong>A Behavioral Temporal Graph Neural Network Framework for Detecting Botnets</strong> <span class="muted">— Accepted, IEEE iThings 2026.</span></li>
    <li><strong>Chrono-GINE: A Chronological Edge-Aware Graph Isomorphism Network for Self-Supervised I2P Network Behavior Modeling</strong> <span class="muted">— Accepted, IEEE Smart Data 2026.</span></li>
    <li><strong>XL-I2P: Cross-Layer I2P Darkweb Mapper</strong> <span class="muted">— Under review, CSET.</span></li>
  </ul>
</section>

<section class="home-section resume-section" id="vulnerability">
  <div class="section-heading"><p class="section-kicker">Vulnerability Research &amp; OSINT</p><h2>Vulnerability research</h2></div>

  <div class="resume-entries">
    <article class="resume-entry">
      <div class="resume-entry-head">
        <div class="resume-entry-id">
          <h3 class="resume-role">Bug Bounty Hunter</h3>
          <p class="resume-org">Bugcrowd <span class="resume-loc">· Remote</span></p>
        </div>
        <p class="resume-dates">Jan 2021 – Dec 2021</p>
      </div>
      <ul class="resume-bullets">
        <li>Identified and responsibly disclosed vulnerabilities across seven programs.</li>
        <li>Earned Hall of Fame recognition from multiple organizations, including Centrify, Arlo, and Humble Bundle.</li>
      </ul>
    </article>

    <article class="resume-entry">
      <div class="resume-entry-head">
        <div class="resume-entry-id">
          <h3 class="resume-role">Security Competitions &amp; Practical Assessments</h3>
          <p class="resume-org">Hacker101, MetaCTF, AppSec Challenges <span class="resume-loc">· Remote</span></p>
        </div>
        <p class="resume-dates">2021 – Present</p>
      </div>
      <ul class="resume-bullets">
        <li>Completed practical web-security, forensics, reconnaissance, cryptography, and exploitation challenges.</li>
        <li>Identified SQL injection, cross-site scripting, and server-side request forgery vulnerabilities through application-security challenges.</li>
      </ul>
    </article>

    <article class="resume-entry">
      <div class="resume-entry-head">
        <div class="resume-entry-id">
          <h3 class="resume-role">OSINT CTF Player &amp; Judge</h3>
          <p class="resume-org">TraceLabs <span class="resume-loc">· Remote</span></p>
        </div>
        <p class="resume-dates">Jan 2021 – Dec 2022</p>
      </div>
      <ul class="resume-bullets">
        <li>Applied OSINT techniques to identify critical leads in missing-persons cases and provided judging feedback for CTF competitions.</li>
      </ul>
    </article>
  </div>
</section>

<section class="home-section resume-section" id="education">
  <div class="section-heading"><p class="section-kicker">Education</p><h2>Education</h2></div>
  <ul class="resume-facts">
    <li>
      <div><strong>PhD, Information Technology</strong><span>University of Cincinnati</span></div>
      <span class="resume-dates">Expected Spring 2028</span>
    </li>
    <li>
      <div><strong>Master of Science, Information Technology</strong><span>University of Cincinnati</span></div>
      <span class="resume-dates">Aug 2024</span>
    </li>
  </ul>
</section>

<section class="home-section resume-section" id="toolkit">
  <div class="section-heading"><p class="section-kicker">Technical Toolkit</p><h2>Tools &amp; methods</h2></div>
  <div class="focus-grid">
    <span class="ic-tag">Python</span>
    <span class="ic-tag">SQL</span>
    <span class="ic-tag">KQL</span>
    <span class="ic-tag">Azure Data Explorer</span>
    <span class="ic-tag">MariaDB</span>
    <span class="ic-tag">Splunk</span>
    <span class="ic-tag">Wireshark</span>
    <span class="ic-tag">Burp Suite</span>
    <span class="ic-tag">Nmap</span>
    <span class="ic-tag">Metasploit</span>
    <span class="ic-tag">Nessus</span>
    <span class="ic-tag">Docker</span>
    <span class="ic-tag">Kali Linux</span>
    <span class="ic-tag">MITRE ATT&amp;CK</span>
    <span class="ic-tag">OSINT</span>
  </div>
</section>

<section class="home-section resume-section" id="development">
  <div class="section-heading"><p class="section-kicker">Professional Development &amp; Community</p><h2>Development &amp; community</h2></div>
  <ul class="activity-list">
    <li><strong>Practical Detection Engineering Study</strong> <span class="muted">— in progress; building future capability in threat-informed detection logic and validation.</span></li>
    <li><strong>KC7 Cyber Security Analyst Modules</strong> <span class="muted">— scenario-based investigation and analysis practice.</span></li>
    <li><strong>OWASP Cincinnati</strong> <span class="muted">— Bugbash Mentor.</span></li>
    <li><strong>ISC2</strong> <span class="muted">— Examination Developer.</span></li>
    <li><strong>AWS Community Builder</strong> <span class="muted">— Security Division.</span></li>
  </ul>
</section>
