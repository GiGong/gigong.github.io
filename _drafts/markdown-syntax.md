---
layout: post
title:  "Unused code"
date:   
categories: [C#, WPF]
---


<ul class="posts-list">
  
  {% assign category = page.category | default: page.title %}
  {% for post in site.categories[category] %}
    <li>
      <h3>
        <a href="{{ site.baseurl }}{{ post.url }}">
          {{ post.title }}
        </a>
        <small>{{ post.date | date_to_string }}</small>
      </h3>
    </li>
  {% endfor %}
  
</ul>

<!-- ------------ -->


{% assign sorted_cats = site.categories %}
{% for category in sorted_cats %}
{% assign sorted_posts = category[1] | reversed %}
<h3 class="home title">{{category[0] | camelcase }}</h3>
<ul class="home_category {{category[0] | uri_escape | downcase}}">
    {% for post in sorted_posts %}
    {% unless post.draft %}

    {% if post.menutitle %}
    {% assign title = post.menutitle %}
    {% else %}
    {% assign title = post.title %}
    {% endif %}

    <li>
        <div class="article">
            <span class="title"><a itemprop="name" href="{{ post.url | absolute_url | remove: ".html"}}"
                    title="{{ title }}">{{ title }}</a></span>
            <time class="date" itemprop="datePublished"
                datetime="{{post.date | date: "%Y-%m-%d"}}">{{post.date | date: "%Y-%m-%d"}}</time>
        </div>
    </li>
    {% endunless %}
    {% endfor %}
</ul>
{% endfor %}


  - ul을 쓸 때
  - 아래와 같이
  - `{: #id .class1 .class2 }`
  - 를 쓰면 
  - 해당 ul에 id와 class가 들어간다.
{: .post .skills}
