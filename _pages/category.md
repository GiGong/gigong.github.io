---
layout: home
title: Category
permalink: /category
---

{% for category in site.categories %}
<div class="category_name center_title">
  <a href="/category/{{category[0] | url_encode }}">{{category | first}}</a>
</div>
{% endfor %}
