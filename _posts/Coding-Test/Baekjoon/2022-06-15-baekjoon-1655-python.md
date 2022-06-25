---
layout: post
title:  "[백준 1655 파이썬] - 가운데를 말해요"
date:   2022-06-15 13:14
categories: [Coding Test]
tags: [codingtest, acmicpc, baekjoon, 1655, python, heapq, 파이썬, 코딩테스트, 백준]
excerpt_separator: <!--read more-->
---


<!-- header for toc -->
{% include post_function/post_navigation_heading.html level="1" number="0" content="시작" %}

<!--start excerpt-->
[백준 온라인 저지 1655번 문제][baekjoon-problem]의 파이썬 풀이입니다.
<!--read more-->
파이썬의 heapq를 활용하였습니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="1" content="문제 생각" %}

단순히 가운데 숫자만 말하는 것 같지만, 매번 정수가 주어질 때 현재까지 주어진 모든 수 중에서 중간 값을 말해야 한다는 점에서 복잡해진다.  
짝수개일 경우 작은 수, 그러니까 오름차순 정렬 시 왼쪽에 있는 수를 말해야 한다.

처음엔 단순히 bisect를 통해 이진탐색을 했지만 시간 초과가 발생했고, 힙 큐를 활용하기로 했다.  
힙큐의 nsmallest를 사용해 보았지만 역시 시간 초과가 발생했고 중간 값을 기준으로 left와 right를 만들기로 했다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="2" content="풀이" %}

left_q, middle, right_q 의 순서로 입력을 정렬한다.  
> ex. 12345 -> [1, 2] 3 [4, 5]

각각 left_q와 right_q는 **우선순위 큐**로 left_q는 가장 큰 값이 root가 되도록, right_q는 가장 작은 값이 root가 되도록 설정한다.
매 입력마다 left, right를 번갈아 삽입하며 그 과정에서 middle값과 비교하여 middle을 수정하거나 큐에 삽입한다.  
또한 짝수개일 경우 작은 수를 출력하라 했으므로 right_q에 먼저 삽입하며 연산을 시작한다.

1. 첫 값은 middle로 설정
2. 각 입력 값, middle, queue로 값 설정
    1. right_q 값 설정
    2. left_q 값 설정
3. 현재 middle 값 출력
4. 2 ~ 3 반복


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="000" content="마무리" %}

정답 코드 입니다.

{% highlight python linenos %}
from sys import stdin
import heapq

N = int(input())

left_q, right_q = [], []
middle = int(input())
is_left = False
answer = [middle]

for line in stdin:
    value = int(line)

    if is_left:
        if value > middle:
            heapq.heappush(left_q, -middle)
            middle = heapq.heappushpop(right_q, value)
        else:
            heapq.heappush(left_q, -value)
    else:
        if value < middle:
            heapq.heappush(right_q, middle)
            middle = -heapq.heappushpop(left_q, -value)
        else:
            heapq.heappush(right_q, value)

    is_left = not is_left
    answer.append(middle)

print('\n'.join(map(str, answer)))
{% endhighlight %}

최대 100,000개의 입력이 들어올 수 있으므로 시간 최적화를 위해 출력을 list에 보관 후 join으로 print한다. ([join을 쓰는 이유][python-print-list-performance])

<!-- include for image -->
{% include post_function/figure_image.html url="/assets/images/baekjoon-result/1655.webp" description="백준 채점 결과" width="720"%}




[baekjoon-problem]: https://www.acmicpc.net/problem/1655
[python-print-list-performance]: https://www.gigong.io/2022/06/14/python-print-list-performance