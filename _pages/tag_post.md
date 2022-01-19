---
layout: default
title: Tag
permalink: /tags/posts
---

<div class="tag wrapper">
{% for tag in site.tags%}
  {% capture tag_name %}{{ tag | first | slugize }}{% endcapture %}
  <div id="{{ tag_name }}" class="tag post_wrapper">
    <h4 class="tag title">{{ tag_name }}</h4>
    <ul class="tag list tag_posts">
    {% for post in site.tags[tag_name] %}
        <a href="{{ post.url | absolute_url | remove: ".html"}}">
            <li class="tag item post_item">
                <span class="tag post_title">{{ post.title }}</span>
                <time class="tag date" datetime="{{post.date | date: "%Y-%m-%d"}}">{{post.date | date: "%Y-%m-%d"}}</time>
                <div class="tag preview">{{ post.excerpt | strip_html }}</div>
            </li>
        </a>
    {% endfor %}
    </ul>
  </div>
{% endfor %}
</div>

<script>
    const tag = decodeURI(location.hash);
    if (tag) {
        document.querySelectorAll(".tag.post_wrapper").forEach((s) => {
            s.hidden = true;
        });
        document.getElementById(tag.substring(1)).hidden = false;
    }
</script>