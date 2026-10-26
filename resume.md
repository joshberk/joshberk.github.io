---
layout: default
title: Resume
permalink: /resume/
description: "Resume of Joshua Offe Berkoh — cyber threat intelligence, threat investigations, threat hunting, and dark-web intelligence research, presented as a native, readable CV."
---

{% comment %}
  Resume redesign, implemented from the designer's PNG + HTML mockup.
  Layout, type scale, spacing, radii and structure follow the mockup;
  colours follow this site's own system (cream / paper / ink / brick-red
  accent via the --bg / --paper / --line / --accent tokens in style.scss),
  NOT the mockup's grey-green page or teal accent. The global site header
  and footer from default.html are reused, so the mockup's header is not
  duplicated here.
  Content follows the new design only (2026-10-26 clarification: if
  the new design does not include it, it is not included here):
  Email joshuaberkoh19@gmail.com added 2026-10-26 from the INL resume PDF; no
  [co-authors] / [exact title] placeholders, no
  extra Study 2 bullet, and no Valdoria note beyond the design's two
  selected investigations. XL-I2P CSET entry removed 2026-10-26
  after the CSET rejection.
{% endcomment %}

<div class="resume-redesign">
  <header class="rr-head">
    <p class="rr-kicker">Resume · Updated Oct 2026</p>
    <h1>Joshua Offe Berkoh</h1>
    <p class="rr-tagline">Cyber Threat Intelligence &amp; Threat Hunting · PhD Researcher, I2P Network Measurement</p>
    <p class="rr-contact">
      <span>Cincinnati, OH</span>
      <a href="mailto:joshuaberkoh19@gmail.com">joshuaberkoh19@gmail.com</a>
      <a href="https://linkedin.com/in/joshfiifi" rel="me">linkedin.com/in/joshfiifi</a>
      <a href="https://github.com/joshberk" rel="me">github.com/joshberk</a>
      <a href="{{ '/' | relative_url }}">joshuaberkoh.engineer</a>
    </p>
  </header>

  <section class="rr-summary" aria-labelledby="rr-sum">
    <h2 id="rr-sum">Summary</h2>
    <p>Cybersecurity professional and PhD researcher who measures the I2P anonymous network and publishes scenario-based threat investigations mapped to MITRE ATT&amp;CK. Background in SOC monitoring and incident triage, and in security engineering at Intuit. Two IEEE papers accepted in 2026.</p>
  </section>

  <div class="rr-layout">
    <div class="rr-main">
      <section class="rr-section" aria-labelledby="rr-exp">
        <h2 id="rr-exp">Experience</h2>

        <div class="rr-job">
          <div class="rr-job-head">
            <h3>PhD Researcher <span>· University of Cincinnati</span></h3>
            <span class="rr-dates">2024 – Present</span>
          </div>
          <ul>
            <li>Design and operate a Python-based collection and analysis framework for studying hidden services within the I2P anonymity network.</li>
            <li>Collect and structure application-layer observations from eepsite crawls and related network observations using MariaDB and reproducible pipelines.</li>
            <li>Analyze hidden-service connectivity, infrastructure relationships, and ecosystem behavior through graph-based workflows.</li>
            <li>Frame the work as dark-web intelligence research focused on infrastructure and ecosystem measurement, not real-world adversary attribution.</li>
          </ul>
        </div>

        <div class="rr-job">
          <div class="rr-job-head">
            <h3>Security Engineer Intern <span>· Intuit Inc., San Diego, CA</span></h3>
            <span class="rr-dates">Jun – Sep 2023</span>
          </div>
          <ul>
            <li>Consolidated security repositories into red-team toolsets, improving operational efficiency by 20%.</li>
            <li>Automated code-based compliance validation through Tox integration, reducing manual review effort by 30%.</li>
            <li>Resolved compliance-related security issues before deployment, contributing to remediation of 70% of identified vulnerabilities.</li>
            <li>Collaborated with cross-functional teams to improve security controls, deployment readiness, and control validation workflows.</li>
          </ul>
        </div>

        <div class="rr-job">
          <div class="rr-job-head">
            <h3>Adjunct Instructor <span>· University of Cincinnati</span></h3>
            <span class="rr-dates">Jan – Apr 2023</span>
          </div>
          <ul>
            <li>Delivered hands-on cybersecurity learning activities focused on practical security concepts, applied investigation, and problem solving.</li>
            <li>Improved student performance by 15% through applied exercises, structured feedback, and technical mentoring.</li>
          </ul>
        </div>

        <div class="rr-job">
          <div class="rr-job-head">
            <h3>Threat Analysis, Detection and Mitigation <span>· University of Cincinnati</span></h3>
            <span class="rr-dates">Jan – Apr 2023</span>
          </div>
          <ul>
            <li>Researched APT tactics, techniques, procedures, and defensive countermeasures.</li>
            <li>Applied behavioral analytics and threat intelligence concepts to support detection and mitigation planning.</li>
          </ul>
        </div>

        <div class="rr-job">
          <div class="rr-job-head">
            <h3>SOC Analyst <span>· Virtual Infosec Africa, Accra, Ghana</span></h3>
            <span class="rr-dates">Oct 2021 – Jun 2022</span>
          </div>
          <ul>
            <li>Monitored and analyzed network activity supporting a 95% intrusion detection rate for a major financial institution.</li>
            <li>Investigated security events and supported incident response activities, reducing response times by 30%.</li>
            <li>Assisted with deployment and operation of SOC security solutions that contributed to a 20% reduction in cybersecurity incidents.</li>
          </ul>
        </div>
      </section>

      <section class="rr-section" aria-labelledby="rr-pub">
        <h2 id="rr-pub">Publications &amp; Data</h2>

        <div class="rr-pub">
          <span class="rr-pill rr-pill-accepted">Accepted</span>
          <p><strong>A Behavioral Temporal Graph Neural Network Framework for Detecting Botnets.</strong> <em>IEEE iThings</em>, 2026.</p>
        </div>
        <div class="rr-pub">
          <span class="rr-pill rr-pill-accepted">Accepted</span>
          <p><strong>Chrono-GINE: A Chronological Edge-Aware Graph Isomorphism Network for Self-Supervised I2P Network Behavior Modeling.</strong> <em>IEEE Smart Data</em>, 2026.</p>
        </div>
        <div class="rr-pub">
          <span class="rr-pill rr-pill-dataset">Dataset</span>
          <p>I2P crawler validation dataset. <em>IEEE DataPort</em>. <a href="https://doi.org/10.21227/rkan-zq07">doi.org/10.21227/rkan-zq07</a></p>
        </div>
      </section>

      <section class="rr-section" aria-labelledby="rr-inv">
        <h2 id="rr-inv">Selected Investigations</h2>
        <p class="rr-note">Simulated intrusion scenarios worked end to end on KC7 Cyber and written up as CTI reports. <a href="{{ '/investigations/' | relative_url }}">Full reports →</a></p>
        <div class="rr-table-wrap">
          <table class="rr-table">
            <thead>
              <tr>
                <th scope="col">Case</th>
                <th scope="col">Scenario</th>
                <th scope="col">Scope</th>
                <th scope="col" class="rr-num">ATT&amp;CK</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><a href="{{ '/investigations/solvi-systems/' | relative_url }}">Solvi Systems</a></td>
                <td>ICS supply-chain intrusion</td>
                <td class="rr-muted">470 C2 connections · 38 endpoints</td>
                <td class="rr-num">8</td>
              </tr>
              <tr>
                <td><a href="{{ '/investigations/inside-encryptodera/' | relative_url }}">Inside Encryptodera</a></td>
                <td>Insider threat, 27-day exfiltration</td>
                <td class="rr-muted">306 endpoints</td>
                <td class="rr-num">8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <aside class="rr-side" aria-label="Education, skills and community">
      <section class="rr-section" aria-labelledby="rr-edu">
        <h2 id="rr-edu">Education</h2>
        <div class="rr-edu">
          <p><strong>PhD, Information Technology</strong></p>
          <p>University of Cincinnati · Cybersecurity</p>
          <p class="rr-dates">Expected Spring 2028</p>
        </div>
        <div class="rr-edu">
          <p><strong>MS, Information Technology</strong></p>
          <p>University of Cincinnati</p>
          <p class="rr-dates">Aug 2024</p>
        </div>
      </section>

      <section class="rr-section" aria-labelledby="rr-skl">
        <h2 id="rr-skl">Skills</h2>
        <div class="rr-skill">
          <p><strong>Detection &amp; SIEM</strong></p>
          <p>Splunk, KQL, Azure Data Explorer</p>
        </div>
        <div class="rr-skill">
          <p><strong>Network &amp; offensive</strong></p>
          <p>Wireshark, Burp Suite, Nmap, Metasploit, Nessus</p>
        </div>
        <div class="rr-skill">
          <p><strong>Code &amp; data</strong></p>
          <p>Python, SQL, MariaDB, graph analysis</p>
        </div>
        <div class="rr-skill">
          <p><strong>Platforms</strong></p>
          <p>Docker, Kali Linux, AWS</p>
        </div>
        <div class="rr-skill">
          <p><strong>Methods</strong></p>
          <p>MITRE ATT&amp;CK mapping, OSINT, IOC pivoting, threat hunting</p>
        </div>
      </section>

      <section class="rr-section" aria-labelledby="rr-rec">
        <h2 id="rr-rec">Recognition</h2>
        <ul>
          <li>Bugcrowd Hall of Fame, 7 programs (2021)</li>
          <li>TraceLabs OSINT CTF player &amp; judge (2021–22)</li>
          <li>Hacker101, MetaCTF, AppSec challenges (2021–present)</li>
        </ul>
      </section>

      <section class="rr-section" aria-labelledby="rr-com">
        <h2 id="rr-com">Community</h2>
        <ul>
          <li>AWS Community Builder, Security</li>
          <li>OWASP Cincinnati, Bugbash mentor</li>
          <li>ISC2 examination developer</li>
        </ul>
      </section>

      <section class="rr-section" aria-labelledby="rr-now">
        <h2 id="rr-now">Currently learning</h2>
        <ul>
          <li>Practical Detection Engineering</li>
          <li>KC7 analyst modules</li>
        </ul>
      </section>
    </aside>
  </div>
</div>
