---
layout: post
title:  "C# 정수형 자리수 맞추기 (앞에 0으로 채우기)"
date:   2021-09-15 21:31
categories: [C#]
tags: [c#, integer, int, digit, zero]
excerpt_separator: <!--read more-->
---


<!-- header for toc -->
{% include post_navigation_heading.html level="1" number="0" content="시작" %}

C#에서 정수형의 자릿수를 맞춰주고 싶을 때,  
예를 들어 00001, 00123 이런 형태로 출력하는 방법입니다.
<!--read more-->

이 글을 처음 쓸 당시엔 MSDN에 자세한 방법까지는 없었지만, 최근 최근엔 있더라구요.  
MSDN 링크입니다.([숫자_앞에_0으로_채우기_MSDN][Pad-Number-Zeros-MSDN])

---

*※ 이 포스트는 과거 [티스토리 블로그][Origin-Tistory-Post]에 포스팅 했던 글을 개선한 글입니다.*


<!-- include for toc -->
{% include post_navigation_heading.html level="1" number="1" content="코드 먼저 보기" %}

{% highlight csharp linenos %}
int i = 1524;
System.Console.WriteLine($"{i.ToString("D5")}"); // 01524
System.Console.WriteLine($"{i.ToString("X6")}"); // 0005F4
{% endhighlight %}


---
<!-- include for toc -->
{% include post_navigation_heading.html level="1" number="2" content="알아보기" %}

코드와 원리가 간단해서 가볍게 설명하겠습니다.  
해당 int 변수의 ToString에서 매개변수로 전달해주면 됩니다.

Code 2번째 줄: 10진수로 자리를 맞추고 싶다면, D와 숫자를 적으면 됩니다.  
여기서 D는 Decimal의 D 입니다.  
ex) "D7", "D2"

Code 3번째 줄: 16진수로 자리를 맞추고 싶다면, X 또는 x와 숫자를 적으면 됩니다.  
여기서 X는 Hex의 X로써 대문자 X와 소문자 x는 16진수에서 나오는 알파벳 A,B,C...이 소문자인지 대문자인지 결정합니다.  
ex) "X3", "x8"


---
<!-- include for toc -->
{% include post_navigation_heading.html level="1" number="000" content="완료" %}

그 외 C#의 표준 서식 문자열 정보는 [MSDN][Standard-Numeric-Format-String-MSDN]에 있으니, 더 궁금하시다면 들어가 보시기 바랍니다.



[Origin-Tistory-Post]: https://gigong.tistory.com/3
[Pad-Number-Zeros-MSDN]: https://docs.microsoft.com/ko-kr/dotnet/standard/base-types/how-to-pad-a-number-with-leading-zeros
[Standard-Numeric-Format-String-MSDN]: https://docs.microsoft.com/ko-kr/dotnet/standard/base-types/standard-numeric-format-strings