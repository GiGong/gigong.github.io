---
layout: home
title: Posts
permalink: /posts
---

<div id="all_posts">
  <h1 class="all_posts_title center_title">{{ page.title }}</h1>
  <ul id="all_posts_list">
    {% for post in site.posts %}
      {% include post_list_item.html %}
    {% endfor %}
  </ul>
</div>