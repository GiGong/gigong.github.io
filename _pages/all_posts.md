---
layout: home
title: Posts
permalink: /posts
---

<div id="all_posts">
  <h1 class="all_posts_title center_title">{{ page.title }}</h1>
  <ul id="all_posts_list">
    {% for post in site.posts %}
      <li class="item_post">
        <a href="{{ post.url | relative_url | remove: ".html"}}" class="post_title">
          {{ post.title }}
        </a>
        <div class="post_meta">
          <ul class="tag_list">
            {% for post_tag in post.tags %}
              <li><a href="/tags/posts#{{ post_tag }}">{{ post_tag }}</a></li>
            {% endfor %}
          </ul>
          <time datetime="{{post.date | date: "%Y-%m-%d"}}">{{ post.date | date: "%Y-%m-%d" }}</time>
        </div>
        <a href="{{ post.url | relative_url | remove: ".html"}}">
          <div class="post_preview">{% include post_excerpt.html %}</div>
        </a>
      </li>
    {% endfor %}
  </ul>
</div>