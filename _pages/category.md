---
layout: default
title: category
permalink: /Category
---

{% for category in site.categories %}
<div>{{category | first}} </div>
{% endfor %}
