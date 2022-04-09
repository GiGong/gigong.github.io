---
layout: post
title:  "Markdown Syntax file"
date:   2000-01-01 00:00
categories: [C#, WPF]
---

----

unordered list
  - ul을 쓸 때
  - 아래와 같이
  - `{: #id .class1 .class2 }`
  - 를 쓰면 
  - 해당 ul에 id와 class가 들어간다.
{: .post .skills}

----

code
{% highlight c linenos %}
#include <stdio.h>
int main() 
{
    printf("Hello World!");
    return 0;
}
{% endhighlight %}


아래는 config.yml에서  
```
kramdown:
  syntax_highlighter_opts:
    disable : true
```
를 지우면 적용

```ruby
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
```