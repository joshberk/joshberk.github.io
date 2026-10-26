---
layout: default
---

{% comment %}
  Home redesign (2026-10-26), designer layout in site colours (.rd-* in
  style.scss). Global header/footer from default.html are reused.
  Email joshuaberkoh19@gmail.com is on the About contact panel; the Home Email
  button links there.
  XL-I2P CSET entry removed from the Now list 2026-10-26 after the
  CSET rejection (see Publications, Research, Resume).
{% endcomment %}

<div class="rd-wrap">
  <section class="rd-hero">
    <p class="rd-kicker">PhD Researcher · Threat Hunter</p>
    <h1>I map the I2P darknet and write up threat investigations, case by case.</h1>
    <p class="rd-lead">I&rsquo;m Joshua Berkoh, a PhD researcher at the University of Cincinnati and a former security engineering intern. I publish network-measurement research on anonymous overlays and CTI reports mapped to MITRE ATT&amp;CK.</p>
    <div class="rd-hero-actions">
      <a href="{{ '/research/' | relative_url }}" class="btn btn-primary">Read the research</a>
      <a href="{{ '/investigations/' | relative_url }}" class="btn btn-outline">View investigations</a>
      <a href="{{ '/resume/' | relative_url }}">Resume</a>
    </div>
    <div class="rd-stats">
      <div class="rd-stat"><strong>2</strong><span>IEEE papers accepted in 2026 (iThings, Smart Data)</span></div>
      <div class="rd-stat"><strong>1,400</strong><span>I2P eepsites crawled</span></div>
      <div class="rd-stat"><strong>366,304</strong><span>hyperlinks mapped into a relationship graph</span></div>
      <div class="rd-stat"><strong>Open data</strong><span>Validation dataset on <a href="https://doi.org/10.21227/rkan-zq07">IEEE DataPort</a></span></div>
    </div>
  </section>

  <section class="rd-section">
    <div class="rd-grid-32">
      <article class="rd-card">
        <p class="rd-kicker">Featured Research</p>
        <h3>Measuring the I2P hidden-service ecosystem</h3>
        <div class="rd-fig rd-fig-img"><img src="{{ '/assets/images/eepsite-graph-dark.png' | relative_url }}" alt="Eepsite relationship graph: clusters of linked hidden services" width="1672" height="940" loading="lazy" /></div>
        <p>A three-study, cross-layer measurement program using a directed multiplex graph framework. Study 1 is complete; Study 2 is under way.</p>
        <a href="{{ '/research/' | relative_url }}">Read about the project →</a>
      </article>
      <article class="rd-card">
        <p class="rd-kicker">Latest Investigations</p>
        <h3>Case files</h3>
        <ul class="rd-now">
          <li><span><span class="rd-muted">CASE-2026-001 · Aug 2026 · Simulated</span><br><a href="{{ '/investigations/flare-darkroom/initial-access-credential-exposure/' | relative_url }}"><strong>Inside Flare Darkroom</strong></a><br><span class="rd-muted">Initial access brokers to cross-forum intel · 3-part series</span></span></li>
          <li><span><span class="rd-muted">CASE-2026-003 · Jun 2026 · Simulated</span><br><a href="{{ '/investigations/solvi-systems/' | relative_url }}"><strong>Solvi Systems</strong></a><br><span class="rd-muted">ICS supply-chain intrusion · 8 ATT&amp;CK techniques</span></span></li>
          <li><span><span class="rd-muted">CASE-2026-002 · Jun 2026 · Simulated</span><br><a href="{{ '/investigations/inside-encryptodera/' | relative_url }}"><strong>Inside Encryptodera</strong></a><br><span class="rd-muted">Insider threat to AD ransomware · 8 ATT&amp;CK techniques</span></span></li>
        </ul>
        <a href="{{ '/investigations/' | relative_url }}">All investigations →</a>
      </article>
    </div>
  </section>

  <section class="rd-section">
    <p class="rd-kicker">What I Do</p>
    <h2>Three areas, one method: collect, pivot, map, write it up.</h2>
    <div class="rd-cols-3">
      <div>
        <h3>Anonymity-network research</h3>
        <p>Measuring how I2P hidden services link, churn and cluster, using crawling and graph analysis that others can reproduce.</p>
        <a href="{{ '/research/' | relative_url }}">Research →</a>
      </div>
      <div>
        <h3>Threat investigations &amp; CTI</h3>
        <p>Working intrusion scenarios end to end: scoping, IOC pivoting, timeline reconstruction and ATT&amp;CK mapping, written as finished reports.</p>
        <a href="{{ '/investigations/' | relative_url }}">Case files →</a>
      </div>
      <div>
        <h3>Threat hunting &amp; detection</h3>
        <p>KQL and Splunk hunting from SOC work, and a detection-engineering study turning investigation findings into tested rules.</p>
        <a href="{{ '/about/' | relative_url }}">Background →</a>
      </div>
    </div>
  </section>

  <section class="rd-section">
    <div class="rd-grid-2">
      <article class="rd-card">
        <div class="rd-section-head"><h3>Now</h3><span class="rd-muted">Updated Oct 2026</span></div>
        <ul class="rd-now">
          <li><span>I2P Study 2: eepsite churn and link-graph change</span><span class="rd-status">In progress</span></li>
          <li><span>Valdoria Votes, Part 2</span><span class="rd-status">Writing</span></li>
          <li><span>Practical Detection Engineering study</span><span class="rd-status">Studying</span></li>
        </ul>
      </article>
      <article class="rd-card">
        <div class="rd-section-head"><h3>About me</h3></div>
        <img src="{{ '/assets/images/joshua_berkoh.jpg' | relative_url }}" alt="Joshua Berkoh" class="rd-photo" loading="lazy" />
        <p>SOC analyst turned researcher. I started in incident triage, did security engineering, and now study how anonymous networks are structured.</p>
        <ul class="rd-now">
          <li><span>2024 –</span><span>PhD researcher, University of Cincinnati</span></li>
          <li><span>2023</span><span>Security Engineer Intern</span></li>
          <li><span>2021 – 22</span><span>SOC Analyst, Virtual Infosec Africa</span></li>
        </ul>
        <a href="{{ '/about/' | relative_url }}">More about me →</a>
      </article>
    </div>
  </section>

  <section class="rd-dark">
    <div>
      <p class="rd-kicker">Hiring</p>
      <h2>Hiring for CTI, threat hunting or security research?</h2>
      <p>I&rsquo;m open to internships and full-time roles. Email is the fastest way to reach me.</p>
    </div>
    <div class="rd-hero-actions">
      <!-- TODO: public email address, currently [your email] in the mock -->
      <a href="{{ '/about/#contact' | relative_url }}" class="btn btn-primary">Email</a>
      <a href="https://linkedin.com/in/joshfiifi" rel="me" class="btn btn-outline">LinkedIn</a>
    </div>
  </section>
</div>
