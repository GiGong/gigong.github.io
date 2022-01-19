---
layout: default
title: Posts
permalink: /posts
---

<div class="all_posts wrapper">
    <h1 class="all_posts title">{{ page.title }}</h1>
    <ul class="all_posts list">
        {% for post in site.posts %}
        <a href="{{ post.url | absolute_url | remove: ".html"}}">
            <li class="all_posts item post_item">
                <span class="all_posts post_title">{{ post.title }}</span>
                <time class="all_posts date" datetime="{{post.date | date: "%Y-%m-%d"}}">{{post.date | date: "%Y-%m-%d"}}</time>
                <div class="all_posts preview">{{ post.excerpt | strip_html }}</div>
            </li>
        </a>
        {% endfor %}
    </ul>
</div>