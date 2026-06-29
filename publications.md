---
layout: default
title: "Publications & Technical Writing"
permalink: /publications/
---

<section class="page-hero">
  <p class="eyebrow">Publications &amp; Technical Writing</p>
  <h1>Publications &amp; Technical Writing</h1>
  <p class="page-intro">A record of my written work scenario-based investigation reports, research manuscripts, and technical articles. This archive shows how I document investigations, communicate technical findings, and structure analytical writing.</p>
</section>

<section class="home-section" id="investigation-reports">
  <div class="section-heading">
    <p class="section-kicker">Investigation Reports</p>
    <h2>Scenario-based investigation reports</h2>
    <p class="section-intro">Full cyber threat investigations completed in the KC7 Cyber Security Analyst program, written to professional intelligence-reporting standards. Scenario-based not real-world client incidents.</p>
  </div>
  <div class="pub-list">
    {% assign reports = site.investigations | sort: "date" | reverse %}
    {% for inv in reports %}
      {% assign inv_status = inv.status | default: "Completed" %}
      <article class="pub-card">
        <div class="pub-card-head">
          <h3 class="pub-title">{% if inv_status == "Coming Soon" %}{{ inv.title | escape }}{% else %}<a href="{{ inv.url | relative_url }}">{{ inv.title | escape }}</a>{% endif %}</h3>
          <span class="status-badge">{% if inv_status == "Coming Soon" %}In Progress{% else %}{{ inv_status | escape }}{% endif %}</span>
        </div>
        <p class="pub-type">Scenario-Based Investigation Report · KC7 Cyber{% if inv.date %} · {{ inv.date | date: "%b %Y" }}{% endif %}</p>
        {% if inv.sector or inv.threat_type %}<p class="pub-meta-line">{% if inv.sector %}{{ inv.sector | escape }}{% endif %}{% if inv.threat_type %} · {{ inv.threat_type | escape }}{% endif %}</p>{% endif %}
        <p class="pub-summary">{{ inv.description | strip_html | truncatewords: 28 | escape }}</p>
        {% if inv.tags %}<div class="ic-tagrow">{% for tag in inv.tags %}<span class="ic-minitag">{{ tag | escape }}</span>{% endfor %}</div>{% endif %}
        {% unless inv_status == "Coming Soon" %}<a class="ic-link" href="{{ inv.url | relative_url }}">Read full report →</a>{% endunless %}
      </article>
    {% endfor %}
  </div>
</section>

<section class="home-section" id="research-manuscripts">
  <div class="section-heading">
    <p class="section-kicker">Research Manuscripts</p>
    <h2>Research manuscripts</h2>
    <p class="section-intro">Manuscripts from my doctoral research working papers and manuscripts not yet peer reviewed.</p>
  </div>
  <div class="pub-list">
    {% for pub in site.data.publications %}
      <article class="pub-card">
        <div class="pub-card-head">
          <h3 class="pub-title">{{ pub.title | escape }}</h3>
          {% if pub.status %}<span class="status-badge">{{ pub.status | escape }}</span>{% endif %}
        </div>
        <p class="pub-type">{{ pub.type | default: "Research Manuscript" }}{% if pub.venue %} · {{ pub.venue | escape }}{% endif %}{% if pub.year %} · {{ pub.year }}{% endif %}</p>
        {% if pub.research_area %}<p class="pub-meta-line">{{ pub.research_area | escape }}</p>{% endif %}
        {% if pub.summary %}<p class="pub-summary">{{ pub.summary | escape }}</p>{% endif %}
        {% if pub.related %}<p class="pub-related">Related project: {{ pub.related | escape }}</p>{% endif %}
        {% if pub.links %}{% for link in pub.links %}<a class="ic-link" href="{{ link.url | escape }}">{{ link.text | escape }} →</a> {% endfor %}{% endif %}
      </article>
    {% endfor %}
  </div>
</section>

<section class="home-section" id="technical-articles">
  <div class="section-heading">
    <p class="section-kicker">Technical Articles</p>
    <h2>Technical articles &amp; lab writeups</h2>
    <p class="section-intro">Security lab infrastructure writeups, methodology notes, and research notes.</p>
  </div>
  <div class="pub-list">
    <article class="pub-card">
      <div class="pub-card-head">
        <h3 class="pub-title"><a href="{{ '/research/malware-reversing-lab/' | relative_url }}">Building a Malware Reversing Lab on Proxmox</a></h3>
        <span class="status-badge">Lab Writeup</span>
      </div>
      <p class="pub-type">Security Lab Infrastructure · Malware Analysis Lab Environment</p>
      <p class="pub-summary">A technical walkthrough of a Proxmox-based malware-analysis lab environment running alongside a detection-engineering stack feeding Elastic SIEM. Documented as lab infrastructure not a CTI report.</p>
      <a class="ic-link" href="{{ '/research/malware-reversing-lab/' | relative_url }}">Read the writeup →</a>
    </article>
  </div>
</section>

<section class="home-section" id="peer-reviewed">
  <div class="section-heading">
    <p class="section-kicker">Conference / Journal Publications</p>
    <h2>Peer-reviewed publications</h2>
  </div>
  <p class="pub-empty">No peer-reviewed conference or journal publications yet. Research manuscripts are in progress — see <a href="#research-manuscripts">Research Manuscripts</a> above. This section will list work here only once it has been formally accepted or published.</p>
</section>
