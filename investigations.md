---
layout: default
title: "Investigations"
permalink: /investigations/
redirect_from:
  - /blog/
  - /blog/index.html
---

<section class="page-hero">
  <p class="eyebrow">Investigation Portfolio</p>
  <h1>Threat Investigations</h1>
  <p class="page-intro">Structured cyber threat investigations completed using realistic enterprise scenarios from the KC7 Cyber Security Analyst program. Each report documents analytical methodology, evidence collection, KQL investigations, IOC analysis, MITRE ATT&amp;CK mapping, and investigation findings. These are scenario-based investigations developed in a training environment not real-world client engagements.</p>
  <p class="page-hero-actions">
    <a class="btn btn-outline" href="https://kc7cyber.com/profile/dd63b85e" target="_blank" rel="noopener noreferrer">View my KC7 Cyber profile →</a>
  </p>
</section>

<div class="investigation-controls">
  <input type="search" id="investigation-search" class="investigation-search" placeholder="Search by title, sector, threat type, or tag…" aria-label="Search investigations">
  <div class="investigation-filters" role="group" aria-label="Filter investigations by status">
    <button class="filter-btn active" type="button" data-inv-filter="all">All</button>
    <button class="filter-btn" type="button" data-inv-filter="completed">Completed</button>
    <button class="filter-btn" type="button" data-inv-filter="in-progress">In Progress</button>
  </div>
</div>

<div class="investigation-grid" id="investigation-list">
  {% assign items = site.investigations | sort: "date" | reverse %}
  {% for inv in items %}
    {% assign inv_status = inv.status | default: "Completed" %}
    {% assign status_slug = inv_status | slugify %}
    <article class="investigation-card" data-status="{{ status_slug }}" data-search="{{ inv.title | downcase }} {{ inv.sector | downcase }} {{ inv.threat_type | downcase }} {% for tag in inv.tags %}{{ tag | downcase }} {% endfor %}">
      <div class="ic-tags">
        {% if inv.sector %}<span class="ic-tag">{{ inv.sector | escape }}</span>{% endif %}
        {% if inv.threat_type %}<span class="ic-tag">{{ inv.threat_type | escape }}</span>{% endif %}
        {% if inv_status == "Coming Soon" %}<span class="ic-tag ic-tag-soon">In Progress</span>{% endif %}
      </div>
      <h2 class="ic-title">
        {% if inv_status == "Coming Soon" %}{{ inv.title | escape }}{% else %}<a href="{{ inv.url | relative_url }}">{{ inv.title | escape }}</a>{% endif %}
      </h2>
      <p class="ic-desc">{{ inv.description | strip_html | truncatewords: 30 | escape }}</p>
      <div class="ic-metarow">
        {% if inv.attack_count %}<span class="ic-meta-item">ATT&amp;CK · {{ inv.attack_count }}</span>{% endif %}
        {% if inv.confidence %}<span class="ic-meta-item">Confidence · {{ inv.confidence | escape }}</span>{% endif %}
        {% unless inv_status == "Coming Soon" %}{% assign rt = inv.content | number_of_words | divided_by: 200 | plus: 1 %}<span class="ic-meta-item">{{ rt }} min read</span>{% endunless %}
        <span class="ic-meta-item ic-meta-status">{{ inv_status | escape }}</span>
      </div>
      {% if inv.tags %}
        <div class="ic-tagrow">
          {% for tag in inv.tags %}<span class="ic-minitag">{{ tag | escape }}</span>{% endfor %}
        </div>
      {% endif %}
      <div class="ic-meta">
        {% if inv_status == "Coming Soon" %}<span class="ic-status">Coming soon</span>{% else %}<a class="ic-link" href="{{ inv.url | relative_url }}">Read investigation →</a>{% endif %}
      </div>
    </article>
  {% endfor %}
</div>

<p class="no-results hidden" id="inv-no-results">No investigations match your search.</p>
