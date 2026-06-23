---
layout: default
title: Blog
permalink: /blog/
---

<div class="blog-hero">
  <h1 class="blog-title">Blog & Portfolio<span class="cursor"></span></h1>
  <p class="blog-subtitle">Insights on cryptography, cybersecurity, and end-to-end incident response investigations.</p>
</div>

<div class="blog-controls">
  <div class="filter-tabs">
    <button class="filter-btn active" data-filter="all">All Posts</button>
    <button class="filter-btn" data-filter="dfir-portfolio">DFIR Portfolio</button>
    <button class="filter-btn" data-filter="threat-detection">Threat Detection Engineering</button>
    <button class="filter-btn" data-filter="study-notes">Study Notes</button>
    <button class="filter-btn" data-filter="reflection">Reflections</button>
    <button class="filter-btn" data-filter="cryptography">Cryptography</button>
  </div>
  <div class="view-toggle">
    <button class="view-btn active" data-view="grid" title="Grid View">
      <span class="view-icon">▦</span>
    </button>
    <button class="view-btn" data-view="list" title="List View">
      <span class="view-icon">≡</span>
    </button>
  </div>
</div>

<div class="posts-count">
  <span class="count-text">Showing <span id="visible-count">{{ site.posts.size }}</span> of {{ site.posts.size }} posts</span>
</div>

<div class="category-notice cryptography-notice hidden" id="cryptography-notice">
  <strong>Paused for Academic reasons.</strong>
</div>

{% assign non_portfolio_posts = site.posts | reject_exp: "item", "item.categories contains 'dfir-portfolio'" %}
{% if non_portfolio_posts.size > 0 %}
  {% assign latest_post = non_portfolio_posts.first %}
  <article class="featured-post" data-type="{{ latest_post.type | slugify | escape }}" data-discipline="{{ latest_post.discipline | slugify | escape }}" data-tags="{% for cat in latest_post.categories %}{{ cat | slugify }} {% endfor %}">
    <div class="featured-label">
      <span class="pulse"></span>
      Latest Post
    </div>
    <div class="featured-content">
      <h2 class="featured-title"><a href="{{ latest_post.url | relative_url | escape }}">{{ latest_post.title | escape }}</a></h2>
      <div class="featured-meta">
        <time datetime="{{ latest_post.date | date_to_xmlschema }}">
          <span class="meta-icon">📅</span> {{ latest_post.date | date: "%B %d, %Y" }}
        </time>
        {% if latest_post.discipline %}
          <span class="meta-tag discipline">{{ latest_post.discipline | escape }}</span>
        {% endif %}
        {% if latest_post.type %}
          <span class="meta-tag type">{{ latest_post.type | escape }}</span>
        {% endif %}
      </div>
      <p class="featured-description">
        {{ latest_post.description | default: latest_post.excerpt | strip_html | truncatewords: 60 | escape }}
      </p>
      <a href="{{ latest_post.url | relative_url | escape }}" class="featured-link">
        Read Full Article <span class="arrow">→</span>
      </a>
    </div>
  </article>
{% endif %}

<div class="posts-grid" id="posts-container">
  {% for post in site.posts %}
    {% if latest_post and post.url == latest_post.url %}
      {% continue %}
    {% endif %}

    {% assign is_portfolio = false %}
    {% if post.categories contains 'dfir-portfolio' %}
      {% assign is_portfolio = true %}
    {% endif %}

    {% if is_portfolio %}
      <article class="post-card portfolio-card{% if post.status == 'Coming Soon' %} coming-soon-card{% endif %}" data-type="{{ post.type | slugify | escape }}" data-discipline="{{ post.discipline | slugify | escape }}" data-tags="{% for cat in post.categories %}{{ cat | slugify }} {% endfor %}">
        <div class="card-header">
          <div class="portfolio-badges">
            {% for tag in post.tags %}
              {% assign tag_lower = tag | downcase %}
              {% if tag_lower contains 'critical' or tag_lower contains 'infrastructure' %}
                <span class="portfolio-badge badge-amber">{{ tag | escape }}</span>
              {% elsif tag_lower contains 'supply' or tag_lower contains 'chain' or tag_lower contains 'tracking' %}
                <span class="portfolio-badge badge-blue">{{ tag | escape }}</span>
              {% elsif tag_lower contains 'insider' or tag_lower contains 'threat' or tag_lower contains 'loss' %}
                <span class="portfolio-badge badge-rose">{{ tag | escape }}</span>
              {% elsif tag_lower contains 'apt' or tag_lower contains 'campaign' %}
                <span class="portfolio-badge badge-purple">{{ tag | escape }}</span>
              {% else %}
                <span class="portfolio-badge badge-slate">{{ tag | escape }}</span>
              {% endif %}
            {% endfor %}
          </div>
        </div>
        <div class="card-body">
          <h3 class="card-title">
            {% if post.status == 'Coming Soon' %}
              {{ post.title | escape }}
            {% else %}
              <a href="{{ post.url | relative_url | escape }}">{{ post.title | escape }}</a>
            {% endif %}
          </h3>
          <p class="card-excerpt">
            {{ post.description | default: post.excerpt | strip_html | escape }}
          </p>
        </div>
        <div class="card-footer portfolio-footer">
          <span class="focus-text">
            {% if post.status == 'Coming Soon' %}
              Status: Investigation in Progress
            {% else %}
              Focus: {{ post.focus | escape }}
            {% endif %}
          </span>
          {% if post.status == 'Coming Soon' %}
            <span class="coming-soon-badge">Coming Soon</span>
          {% else %}
            <a href="{{ post.url | relative_url | escape }}" class="card-link font-medium">Read Report &rarr;</a>
          {% endif %}
        </div>
      </article>
    {% else %}
      <article class="post-card" data-type="{{ post.type | slugify | escape }}" data-discipline="{{ post.discipline | slugify | escape }}" data-tags="{% for cat in post.categories %}{{ cat | slugify }} {% endfor %}">
        <div class="card-header">
          <time datetime="{{ post.date | date_to_xmlschema }}" class="post-date">
            {{ post.date | date: "%b %d" }}
            <span class="post-year">{{ post.date | date: "%Y" }}</span>
          </time>
          {% if post.type %}
            <span class="card-badge">{{ post.type | escape }}</span>
          {% endif %}
        </div>
        <div class="card-body">
          <h3 class="card-title"><a href="{{ post.url | relative_url | escape }}">{{ post.title | escape }}</a></h3>
          <p class="card-excerpt">
            {{ post.description | default: post.excerpt | strip_html | truncatewords: 25 | escape }}
          </p>
        </div>
        <div class="card-footer">
          {% if post.discipline %}
            <span class="card-tag">{{ post.discipline | escape }}</span>
          {% endif %}
          <a href="{{ post.url | relative_url | escape }}" class="card-link">Read more →</a>
        </div>
      </article>
    {% endif %}
  {% endfor %}
</div>

<div class="no-posts-message hidden" id="no-posts">
  <div class="empty-state">
    <span class="empty-icon">🔍</span>
    <p>No posts found in this category.</p>
    <button class="filter-btn" data-filter="all">Show All Posts</button>
  </div>
</div>

<div class="blog-footer">
  <a href="/" class="btn btn-outline">← Back to Home</a>
</div>
