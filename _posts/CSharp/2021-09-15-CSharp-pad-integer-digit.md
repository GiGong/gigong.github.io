---
title:  "C# 정수형 자리수 맞추기 (앞에 0으로 채우기)"
date:   2021-09-15 21:31
categories: [C#]
tags: [c#, integer, int, digit, zero, 정수, 자리수]
---


<!-- header for toc -->
{% include post_function/post_navigation_heading.html level="1" number="0" content="시작" %}

<!--start excerpt-->
C#에서 정수형의 자릿수를 맞춰주고 싶을 때, 예를 들어 00001, 00123 이런 형태로 출력하는 방법입니다.  
[표준 숫자 서식 문자열][MSDN-Standard-Numeric-Format-String]을 활용하게 되며 소수를 포함한 숫자를 문자열로 바꾸는 여러가지 형태가 존재합니다.
<!--read more-->

<sub>*※ 이 포스트는 과거 [티스토리 블로그][Origin-Tistory-Post]의 글을 개선한 글입니다.*</sub>


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="1" content="코드 먼저 보기" %}

{% highlight csharp linenos %}
int i = 1524;
System.Console.WriteLine($"{i.ToString("D5")}"); // 01524
System.Console.WriteLine($"{i.ToString("X6")}"); // 0005F4
{% endhighlight %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="2" content="알아보기" %}

코드와 원리가 간단해서 가볍게 설명하겠습니다.  
해당 int 변수의 ToString에서 매개변수로 전달해주면 됩니다.

Code 2번째 줄: 10진수로 자리를 맞추고 싶다면, D와 숫자를 적으면 됩니다.  
여기서 D는 Decimal의 D 입니다.  
*ex) "D7", "D2"*

Code 3번째 줄: 16진수로 자리를 맞추고 싶다면, X 또는 x와 숫자를 적으면 됩니다.  
여기서 X는 Hex의 X로써 대문자 X와 소문자 x는 16진수에서 나오는 알파벳 A,B,C...이 소문자인지 대문자인지 결정합니다.  
*ex) "X3", "x8"*


----
<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="000" content="마무리" %}

표준 숫자 서식 문자열을 사용해서 우리가 원하는 형식으로 String의 형식을 정할 수 있으며, 이는 XAML에서도 사용 가능합니다.




<!-- reference area -->
  - [MSDN-Standard-Numeric-Format-String][MSDN-Standard-Numeric-Format-String]
  - [MSDN-Pad-Number][MSDN-Pad-Number]
  - [MSDN-C#-String-Interpolation][MSDN-C#-String-Interpolation]
{% include post_function/reference_area_setter.html %}




[Origin-Tistory-Post]: https://gigong.tistory.com/3
[MSDN-Standard-Numeric-Format-String]: https://docs.microsoft.com/ko-kr/dotnet/standard/base-types/standard-numeric-format-strings
[MSDN-Pad-Number]: https://docs.microsoft.com/ko-kr/dotnet/standard/base-types/how-to-pad-a-number-with-leading-zeros
[MSDN-C#-String-Interpolation]: https://docs.microsoft.com/ko-kr/dotnet/csharp/tutorials/string-interpolation