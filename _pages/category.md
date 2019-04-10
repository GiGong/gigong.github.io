---
layout: home
title: Category
permalink: /Category
---

{% for category in site.categories %}
<div class="category name title">
    <a href="{{category[0] | replace: "#", "%23" }}">{{category | first}}</a> 
</div>
{% endfor %}
