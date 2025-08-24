---
layout: default
title: Blog
permalink: /blog/
---

# Blog

Welcome to my blog where I share insights on cryptography, cybersecurity, and my journey through PhD research.

## All Posts

<div class="posts-list">
  {% for post in site.posts %}
    <article class="post-preview">
      <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
      <div class="post-meta">
        <time datetime="{{ post.date | date_to_xmlschema }}">
          {{ post.date | date: "%B %d, %Y" }}
        </time>
        {% if post.discipline %}
          <span class="post-discipline">{{ post.discipline }}</span>
        {% endif %}
        {% if post.type %}
          <span class="post-type">{{ post.type }}</span>
        {% endif %}
      </div>
      {% if post.description %}
        <p class="post-description">{{ post.description }}</p>
      {% else %}
        <p>{{ post.excerpt | strip_html | truncatewords: 50 }}</p>
      {% endif %}
      <a href="{{ post.url }}" class="read-more">Read more →</a>
    </article>
  {% endfor %}
</div>

## Categories

### Cryptography
<div class="category-posts">
  {% for post in site.categories.cryptography %}
    <div class="category-post">
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span class="post-date">{{ post.date | date: "%b %Y" }}</span>
    </div>
  {% endfor %}
</div>

### Study Notes
<div class="category-posts">
  {% assign study_posts = site.posts | where: "type", "Study Notes" %}
  {% for post in study_posts %}
    <div class="category-post">
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span class="post-date">{{ post.date | date: "%b %Y" }}</span>
    </div>
  {% endfor %}
</div>

### Reflections
<div class="category-posts">
  {% assign reflection_posts = site.posts | where: "type", "Reflection" %}
  {% for post in reflection_posts %}
    <div class="category-post">
      <a href="{{ post.url }}">{{ post.title }}</a>
      <span class="post-date">{{ post.date | date: "%b %Y" }}</span>
    </div>
  {% endfor %}
</div>