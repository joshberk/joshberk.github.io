---
layout: default
title: Blog
permalink: /blog/
---

<div class="blog-hero">
  <h1 class="blog-title">Blog<span class="cursor"></span></h1>
  <p class="blog-subtitle">Insights on cryptography, cybersecurity, and my journey through PhD research.</p>
</div>

<div class="blog-controls">
  <div class="filter-tabs">
    <button class="filter-btn active" data-filter="all">All Posts</button>
    <button class="filter-btn" data-filter="study-notes">Study Notes</button>
    <button class="filter-btn" data-filter="reflection">Reflections</button>
    <button class="filter-btn" data-filter="cryptography">Cryptography</button>
    <button class="filter-btn" data-filter="threat-detection">Threat Detection Engineering</button>
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

<div class="category-notice cryptography-notice" id="cryptography-notice" style="display: none;">
  <strong>Paused for Academic reasons.</strong>
</div>

<div class="category-notice threat-detection-notice" id="threat-detection-notice" style="display: none;">
  <strong>Coming soon.</strong>
</div>

{% if site.posts.size > 0 %}
  {% assign latest_post = site.posts.first %}
  <article class="featured-post" data-category="{{ latest_post.type | slugify }}" data-tags="{{ latest_post.categories | join: ' ' }}">
    <div class="featured-label">
      <span class="pulse"></span>
      Latest Post
    </div>
    <div class="featured-content">
      <h2 class="featured-title"><a href="{{ latest_post.url }}">{{ latest_post.title }}</a></h2>
      <div class="featured-meta">
        <time datetime="{{ latest_post.date | date_to_xmlschema }}">
          <span class="meta-icon">📅</span> {{ latest_post.date | date: "%B %d, %Y" }}
        </time>
        {% if latest_post.discipline %}
          <span class="meta-tag discipline">{{ latest_post.discipline }}</span>
        {% endif %}
        {% if latest_post.type %}
          <span class="meta-tag type">{{ latest_post.type }}</span>
        {% endif %}
      </div>
      <p class="featured-description">
        {{ latest_post.description | default: latest_post.excerpt | strip_html | truncatewords: 60 }}
      </p>
      <a href="{{ latest_post.url }}" class="featured-link">
        Read Full Article <span class="arrow">→</span>
      </a>
    </div>
  </article>
{% endif %}

<div class="posts-grid" id="posts-container">
  {% for post in site.posts offset:1 %}
    <article class="post-card" data-category="{{ post.type | slugify }}" data-tags="{{ post.categories | join: ' ' }}">
      <div class="card-header">
        <time datetime="{{ post.date | date_to_xmlschema }}" class="post-date">
          {{ post.date | date: "%b %d" }}
          <span class="post-year">{{ post.date | date: "%Y" }}</span>
        </time>
        {% if post.type %}
          <span class="card-badge">{{ post.type }}</span>
        {% endif %}
      </div>
      <div class="card-body">
        <h3 class="card-title"><a href="{{ post.url }}">{{ post.title }}</a></h3>
        <p class="card-excerpt">
          {{ post.description | default: post.excerpt | strip_html | truncatewords: 25 }}
        </p>
      </div>
      <div class="card-footer">
        {% if post.discipline %}
          <span class="card-tag">{{ post.discipline }}</span>
        {% endif %}
        <a href="{{ post.url }}" class="card-link">Read more →</a>
      </div>
    </article>
  {% endfor %}
</div>

<div class="no-posts-message" id="no-posts" style="display: none;">
  <div class="empty-state">
    <span class="empty-icon">🔍</span>
    <p>No posts found in this category.</p>
    <button class="filter-btn" data-filter="all">Show All Posts</button>
  </div>
</div>

<div class="blog-footer">
  <a href="/" class="btn btn-outline">← Back to Home</a>
</div>
