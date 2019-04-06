---
layout: default
title: category
permalink: /category
---

{% for category in site.categories %}
<div>{{category | first}} </div>
{% endfor %}
