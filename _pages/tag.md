---
layout: home
title: Tag
permalink: /tags
---

<h1 class="tag title">TAG</h1>
<div class="tag tag_list">
{% for tag in site.tags %}
    <a href="/tags/posts#{{tag[0] | strip_html }}">{{tag | first}}</a>
{% endfor %}
</div>
