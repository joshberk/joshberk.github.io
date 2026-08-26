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
  <p class="page-intro">Structured cyber threat investigations worked end to end in realistic training environments. Each report documents analytical methodology, evidence collection, pivoting, and findings. Investigations are grouped by the platform they originated from. That source determines the kind of evidence available and the tradecraft the investigation demonstrates. These are scenario-based investigations, not real-world client engagements.</p>
  <p class="page-hero-actions">
    {% for platform in site.data.learning_platforms %}
      <a class="btn btn-outline" href="{{ platform.href | escape }}" target="_blank" rel="noopener noreferrer" aria-label="{{ platform.cta | escape }} (opens in a new tab)">{{ platform.cta | escape }} →</a>
    {% endfor %}
  </p>
</section>

<ul class="source-legend">
  {% for source in site.data.investigation_sources %}
    <li class="source-legend-item">
      <span class="source-legend-name">{{ source.name | escape }}</span>
      <span class="source-legend-focus">{{ source.focus | escape }}</span>
    </li>
  {% endfor %}
</ul>

<div class="investigation-controls">
  <input type="search" id="investigation-search" class="investigation-search" placeholder="Search by title, source, sector, threat type, or topic…" aria-label="Search investigations">
  <div class="investigation-filter-groups">
    {% comment %} Source buttons are generated from _data/investigation_sources.yml,
                  so adding a platform there adds its filter here. {% endcomment %}
    <div class="investigation-filters" role="group" aria-label="Filter investigations by source" data-filter-group="source">
      <button class="filter-btn active" type="button" aria-pressed="true" data-filter-value="all">All sources</button>
      {% for source in site.data.investigation_sources %}
        <button class="filter-btn" type="button" aria-pressed="false" data-filter-value="{{ source.id | escape }}">{{ source.name | escape }}</button>
      {% endfor %}
    </div>
    <div class="investigation-filters" role="group" aria-label="Filter investigations by status" data-filter-group="status">
      <button class="filter-btn active" type="button" aria-pressed="true" data-filter-value="all">All statuses</button>
      <button class="filter-btn" type="button" aria-pressed="false" data-filter-value="completed">Completed</button>
      <button class="filter-btn" type="button" aria-pressed="false" data-filter-value="in-progress">In Progress</button>
    </div>
  </div>
</div>

<div class="investigation-grid" id="investigation-list">
  {% assign items = site.investigations | sort: "date" | reverse %}
  {% for inv in items %}
    {% assign inv_status = inv.status | default: "Completed" %}
    {% if inv_status == "Completed" %}{% assign status_slug = "completed" %}{% else %}{% assign status_slug = "in-progress" %}{% endif %}
    {% assign inv_source = site.data.investigation_sources | where: "id", inv.source | first %}
    {% assign domains = inv.topics | default: inv.tags %}
    <article class="investigation-card"
             data-status="{{ status_slug }}"
             data-source="{{ inv.source | default: 'unattributed' | escape }}"
             data-search="{{ inv.title | downcase }} {{ inv_source.name | downcase }} {{ inv.sector | downcase }} {{ inv.threat_type | downcase }} {% for topic in domains %}{{ topic | downcase }} {% endfor %}">
      {% if inv_source %}
        <p class="inv-source">
          <span class="inv-source-name">{{ inv_source.name | escape }}</span>
          <span class="inv-source-sep" aria-hidden="true">·</span>
          <span class="inv-source-kind">Investigation</span>
        </p>
      {% endif %}
      <h2 class="ic-title">
        {% if inv_status == "Coming Soon" %}{{ inv.title | escape }}{% else %}<a href="{{ inv.url | relative_url }}">{{ inv.title | escape }}</a>{% endif %}
      </h2>
      <p class="ic-desc">{{ inv.description | strip_html | truncatewords: 30 | escape }}</p>
      {% comment %} Cards show at most three domains; the article header carries the full set. {% endcomment %}
      {% if domains %}
        {% assign shown_domains = domains | slice: 0, 3 %}
        <p class="ic-domains">{{ shown_domains | join: " · " | escape }}</p>
      {% endif %}
      <div class="ic-metarow">
        {% if inv.attack_count %}<span class="ic-meta-item">ATT&amp;CK · {{ inv.attack_count }}</span>{% endif %}
        {% unless inv_status == "Coming Soon" %}{% assign rt = inv.content | number_of_words | divided_by: 200 | plus: 1 %}<span class="ic-meta-item">{{ rt }} min read</span>{% endunless %}
        {% unless inv_status == "Completed" %}<span class="ic-meta-item ic-meta-status">{{ inv_status | escape }}</span>{% endunless %}
      </div>
      <div class="ic-meta">
        {% if inv.series and inv.part %}
          {% assign series_parts = site.investigations | where: "series", inv.series %}
          <span class="ic-part">Part {{ inv.part }} of {{ series_parts.size }}</span>
        {% endif %}
        {% if inv_status == "Coming Soon" %}
          <span class="ic-status">Coming soon</span>
        {% elsif inv_status == "Completed" %}
          <a class="ic-link" href="{{ inv.url | relative_url }}" aria-label="Read investigation: {{ inv.title | escape }}">Read investigation →</a>
        {% else %}
          <a class="ic-link" href="{{ inv.url | relative_url }}" aria-label="Read Part 1: {{ inv.title | escape }}">Read Part 1 →</a>
        {% endif %}
      </div>
    </article>
  {% endfor %}
</div>

<p class="no-results hidden" id="inv-no-results">No investigations match your search.</p>
