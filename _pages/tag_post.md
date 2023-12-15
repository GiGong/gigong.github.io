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
          {% include post_list_item.html %}
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