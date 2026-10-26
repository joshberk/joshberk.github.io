---
layout: default
title: "About"
permalink: /about/
---

{% comment %}
  About & Contact redesign (2026-10-26), designer layout in site colours.
  This page now carries the contact panel too, matching the designer's
  "About and contact" page. The site's separate /contact/ page and its
  nav link were removed 2026-10-26; contact now lives on this page's
  panel below.
  Email joshuaberkoh19@gmail.com added 2026-10-26 from the INL resume PDF.
  Open item: "[2 working days]" reply time (carried as text from the
  mock, not confirmed).
  Photo uses the site's existing /assets/images/joshua_berkoh.jpg.
{% endcomment %}

<div class="rd-wrap">
  <section class="rd-about">
    <img src="{{ '/assets/images/joshua_berkoh.jpg' | relative_url }}" alt="Joshua Berkoh" class="rd-photo" loading="lazy" />
    <div>
      <p class="rd-kicker">About</p>
      <h1 style="font-family:var(--sans);font-weight:700;letter-spacing:-0.015em;font-size:clamp(32px,4vw,44px);margin:0 0 16px;color:var(--text);">I&rsquo;m Joshua Offe Berkoh.</h1>
      <p class="rd-lead">I started in a SOC in Accra, triaging alerts and working incidents. That led to security engineering, and then to a PhD at the University of Cincinnati, where I measure how the I2P anonymous network is structured and how it changes.</p>
      <p class="rd-lead" style="margin-top:16px;">Outside the dissertation I work intrusion scenarios end to end and write them up as CTI reports, so my research and my analyst work keep each other honest.</p>
      <p class="rd-meta"><span>Cincinnati, OH</span><span>Open to internships and full-time roles</span></p>
    </div>
  </section>

  <section class="rd-section">
    <div class="rd-two-col">
      <div>
        <h2>Path so far</h2>
        <ul class="rd-timeline">
          <li><span class="rd-date">Apr 2028</span><span><strong>PhD, Information Technology</strong> (expected) · University of Cincinnati</span></li>
          <li><span class="rd-date">2026</span><span><strong>Two IEEE papers accepted</strong> · iThings and Smart Data</span></li>
          <li><span class="rd-date">2024 – now</span><span><strong>PhD researcher</strong> · I2P hidden-service measurement, University of Cincinnati</span></li>
          <li><span class="rd-date">Aug 2024</span><span><strong>MS, Information Technology</strong> · University of Cincinnati</span></li>
          <li><span class="rd-date">2023</span><span><strong>Security Engineer Intern</strong> · San Diego</span></li>
          <li><span class="rd-date">2023</span><span><strong>Adjunct Instructor</strong> · University of Cincinnati</span></li>
          <li><span class="rd-date">2021 – 22</span><span><strong>SOC Analyst</strong> · Virtual Infosec Africa, Accra</span></li>
          <li><span class="rd-date">2021</span><span><strong>Bugcrowd Hall of Fame</strong> · 7 programs; TraceLabs OSINT CTF player, later judge</span></li>
        </ul>
        <p style="margin-top:16px;"><a href="{{ '/resume/' | relative_url }}" style="font-weight:600;text-decoration:underline;text-decoration-color:var(--accent);">Full resume →</a></p>
      </div>
      <div>
        <h2>Community</h2>
        <div class="rd-side" style="gap:16px;">
          <div class="rd-side-card"><h3>AWS Community Builder</h3><p>Security category</p></div>
          <div class="rd-side-card"><h3>OWASP Cincinnati</h3><p>Bugbash mentor</p></div>
          <div class="rd-side-card"><h3>ISC2</h3><p>Examination developer</p></div>
          <div class="rd-side-card"><h3>TraceLabs</h3><p>OSINT CTF for missing persons</p></div>
        </div>
      </div>
    </div>
  </section>

  <section class="rd-dark" id="contact">
    <div>
      <p class="rd-kicker">Contact</p>
      <h2>Let&rsquo;s talk about CTI, threat hunting or security research roles.</h2>
      <p>Email is the fastest way to reach me. I usually reply within [2 working days].</p>
      <div class="rd-hero-actions">
        <a href="mailto:joshuaberkoh19@gmail.com" class="btn btn-primary">joshuaberkoh19@gmail.com</a>
        <a href="https://linkedin.com/in/joshfiifi" rel="me" class="btn btn-outline">LinkedIn</a>
        <a href="https://github.com/joshberk" rel="me" class="btn btn-outline">GitHub</a>
      </div>
    </div>
    <div>
      <h3 style="font-family:var(--sans);font-weight:600;font-size:17px;color:#f4f1ea;margin:0 0 8px;">Hiring? Start here</h3>
      <ul class="rd-dark-list">
        <li><a href="{{ '/research/' | relative_url }}">1. I2P research</a><span>Depth: a multi-year measurement program</span></li>
        <li><a href="{{ '/investigations/' | relative_url }}">2. Case files</a><span>Analyst work: pivots, timelines, ATT&amp;CK</span></li>
        <li><a href="{{ '/publications/' | relative_url }}">3. Publications</a><span>Peer-reviewed papers and open data</span></li>
        <li><a href="{{ '/resume/' | relative_url }}">4. Resume</a><span>Everything on one page</span></li>
      </ul>
    </div>
  </section>
</div>
