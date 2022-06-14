---
layout: post
title:  "Python list print 방법과 성능"
date:   2022-06-14 14:28
categories: [Coding Test]
tags: [python, print, performance, asterisk, join]
excerpt_separator: <!--read more-->
---


<!-- header for toc -->
{% include post_function/post_navigation_heading.html level="1" number="0" content="시작" %}

<!--start excerpt-->
코딩테스트를 진행하다 보면 출력값이 굉장히 많아질 때가 있습니다. 그럴 때 출력하는 방법 중 가장 빠른 방법을 찾아봅니다.
<!--read more-->

파이썬의 time 모듈을 활용하여 진행했으며 동일한 list를 각각의 방법으로 print하고 수행하는데 걸린 시간을 계산하였습니다.  
list는 -21억 ~ 21억 사이 임의의 정수로 구성되어있습니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="1" content="출력 방법" %}

Python에서 리스트를 출력하는 다양한 방법들이 있는데, 대표적인 방법들을 알아보겠습니다.


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.1" content="for 문" %}

for 문을 통해 list의 각 element를 순회하며 print하는 방법입니다.

{% highlight python linenos %}
for number in output_list:
    print(number)
{% endhighlight %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.2" content=" * (Asterisk)" %}

파이썬의 * (Asterisk)를 사용한 방법입니다.

{% highlight python linenos %}
print(*output_list, sep='\n')
{% endhighlight %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.3" content="join" %}

파이썬 str의 join 함수를 활용한 방법입니다.
{% highlight python linenos %}
print('\n'.join(map(str, output_list)))
{% endhighlight %}

output_list에 str 형식으로 들어있다면 map 함수는 필요 없습니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="2" content="성능 비교" %}

BENCHMARK_LENGTH 길이를 가진 output_list를 BENCHMARK_COUNT 번 반복해서 평균 시간을 계산한 결과입니다.

> System Information  
> CPU: AMD Ryzen 7 5800H  
> RAM: 16GB  
> VER: Python 3.10  
> IDE: PyCharm Community Edition

<!-- include for image -->
{% include post_function/figure_image.html url="/assets/images/python-print-list-performance/bench_5000.webp" description="LENGTH = 5,000" width="360"%}

<!-- include for image -->
{% include post_function/figure_image.html url="/assets/images/python-print-list-performance/bench_100000.webp" description="LENGTH = 100,000" width="360" %}

<!-- include for image -->
{% include post_function/figure_image.html url="/assets/images/python-print-list-performance/bench_1000000.webp" description="LENGTH = 1,000,000" width="360" %}

BENCHMARK_LENGTH 가 작을 땐 서로 큰 차이가 없으나 LENGTH가 커지면 join의 성능이 좋은 것을 볼 수 있습니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="000" content="마무리" %}

결과적으로 str.join을 활용하는 것이 대부분의 상황에서 좋은 것으로 나타났고,
저 또한 출력이 많아질 경우 출력을 list에 임시 저장한 후 join하여 print하는 방식으로 진행하고 있습니다.

아래는 성능 측정에 사용한 코드입니다.  
개선 사항이 있다면 댓글 혹은 메일 부탁드립니다. 감사합니다.

*※ 도움이 되시길 바라며 replit에 코드를 올려놓았습니다.([코드][python-print-string-performance-replit])*

{% highlight python linenos %}
import random
import time

BENCHMARK_COUNT = 10
BENCHMARK_LENGTH = 1000000

output_list = [random.randint(-210000000, 210000000) for _ in range(BENCHMARK_LENGTH)]
ast_time, join_time, foreach_time, for_time = 0, 0, 0, 0

for _ in range(BENCHMARK_COUNT):
    start_time = time.time()
    print(*output_list, sep='\n')
    end_time = time.time()
    ast_time += end_time - start_time
ast_time /= BENCHMARK_COUNT

for _ in range(BENCHMARK_COUNT):
    start_time = time.time()
    print('\n'.join(map(str, output_list)))
    end_time = time.time()
    join_time += end_time - start_time
join_time /= BENCHMARK_COUNT

for _ in range(BENCHMARK_COUNT):
    start_time = time.time()
    for number in output_list:
        print(number)
    end_time = time.time()
    foreach_time += end_time - start_time
foreach_time /= BENCHMARK_COUNT

for _ in range(BENCHMARK_COUNT):
    start_time = time.time()
    for i in range(len(output_list)):
        print(output_list[i])
    end_time = time.time()
    for_time += end_time - start_time
for_time /= BENCHMARK_COUNT

print()
print(f"number of benchmark   : {BENCHMARK_COUNT}")
print(f"length of list        : {BENCHMARK_LENGTH}")
print(f"total time (asterisk) : {ast_time}")
print(f"total time (join)     : {join_time}")
print(f"total time (foreach)  : {foreach_time}")
print(f"total time (for)      : {for_time}")
{% endhighlight %}




[python-print-list-performance-replit]: https://replit.com/@GiGong/GiGong-Blog-Sources#print-list-benchmark.py