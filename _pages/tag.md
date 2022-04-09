---
layout: home
title: Tag
permalink: /tags
---

<h1 class="tag_page_title center_title">TAG</h1>
<ul id="tag-page-tag-list" class="tags_list">
{% for tag in site.tags %}
    <li>
        <a href="/tags/posts#{{tag[0] | strip_html }}">{{tag | first}}</a>
    </li>
{% endfor %}
</ul>
