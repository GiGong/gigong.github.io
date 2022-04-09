---
layout: home
title: Tag
permalink: /tags/posts
---

<div id="tag_page">
  {% for tag in site.tags%}
  {% capture tag_name %}{{ tag | first | slugize }}{% endcapture %}
    <div id="{{ tag_name }}" class="tag_post_wrapper">
      <h2 class="tag_title center_title">{{ tag_name }}</h2>
      <ul class="tag_posts_list">
        {% for post in site.tags[tag_name] %}
          <li class="item_post">
            <a href="{{ post.url | relative_url | remove: ".html"}}">
              <div class="post_title">{{ post.title }}</div>
            </a>
            <div class="post_meta">
              <ul class="tag_list">
                {% for post_tag in post.tags %}
                  <li><a href="#{{ post_tag }}">{{ post_tag }}</a></li>
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
  {% endfor %}
</div>

<script defer>
function showTagPosts() {
  const tag = decodeURI(location.hash);
  if (tag) {
    target = tag.substring(1);
    document.querySelectorAll(".tag_post_wrapper").forEach((s) => {
      if (s.id !== target) {
        s.hidden = true;
      }
      else {
        s.hidden = false;
      }
    });
  }
}

showTagPosts();
window.addEventListener('hashchange', showTagPosts, false);
</script>