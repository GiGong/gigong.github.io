---
layout: post
title:  "C# DateTime ToString Format(오전/오후 표시 등)"
date:   2022-05-20 17:54
categories: [C#]
tags: [c#, datetime, tostring, format, format_string]
excerpt_separator: <!--read more-->
---


<!-- header for toc -->
{% include post_function/post_navigation_heading.html level="1" number="0" content="시작" %}

<!--start excerpt-->
C# DateTime은 날짜와 시간을 나타낼 때 사용합니다.  
우리가 원하는 방식으로 DateTime을 표현하는 방식을 알아봅니다.
<!--read more-->

ToString()을 기본으로 실행할 경우 ***2022-05-21 오후 7:14:19*** 와 같이 고정되어 있습니다.

특별한 형식을 원할 땐 **Format String**을 활용하여 ***5월 21일 7시 입니다*** 와 같이 표현할 수 있습니다.

<sub>*※ 이 포스트는 과거 [티스토리 블로그][Origin-Tistory-Post]의 글을 개선한 글입니다.*</sub>


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="1" content="코드 먼저 보기" %}

<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.1" content="코드" %}

{% highlight csharp linenos %}
DateTime now = DateTime.Now;

Console.WriteLine("{0:yyyy}년 {0:MM}월 {0:dd}일, {0:tt} {0:hh}시 {0:mm}분 {0:ss}초 입니다", now);
Console.WriteLine(now.ToString("yyyy.MM.dd HH:mm"));
Console.WriteLine(now.ToString("MM월 dd일 HH시 입니다."));
Console.WriteLine(now.ToString("현재 시각 HH:mm:ss"));
Console.WriteLine(now.ToString("tt h:mm:ss"));
Console.WriteLine(now.ToString("yyyy MM dd tt hh mm ss"));
{% endhighlight %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="1.2" content="실행 결과" %}

{% highlight text linenos %}
2022년 05월 21일, 오후 07시 14분 19초 입니다
2022.05.21 19:14
05월 21일 19시 입니다.
현재 시각 19:14:19
오후 7:14:19
2022 05 21 오후 07 14 19
{% endhighlight %}


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="2" content="알아보기" %}

***DateTime.Now**는 현재 시간을 반환합니다.*

실제 활용하는 방법은 DateTime의 ToString(), C#의 composite formatting(ex. {0:dd}) 등을 통해 원하는 형식으로 활용할 수 있습니다.  
다음은 자주 사용하는 Format String 입니다.

| Format String   | Content             |
|:---------------:|-------------------- |
| y               | 년                  |
| M               | 월                  |
| d               | 일                  |
| h               | 시간 (12시간 기준)  |
| H               | 시간 (24시간 기준)  |
| m               | 분                  |
| s               | 초                  |
| tt              | 오전/오후 구분자    |
{: .table_content}

각 Format은 단일로 사용 시 자릿수를 맞춰주지 않으며 한글의 경우 깨지는 경우가 생길 수 있습니다.
> tt: AM -> t: A (오후 -> 오)  
> mm: 06 -> m: 6

이 외 다양한 Format들과 예시들은 [MSDN][Custom-Date-and-Time-Format-Strings-MSDN]에서 확인하실 수 있습니다.

----
<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="000" content="마무리" %}

포스트의 예시를 사용한 샘플 WPF 프로젝트를 [GitHub][GitHub-Sample]에 올려놓았으니 다뤄보시면서 이해하고 활용하시면 좋을 것 같습니다.




<!-- reference area -->
  - [Custom-Date-and-Time-Format-Strings-MSDN][Custom-Date-and-Time-Format-Strings-MSDN]
{% include post_function/reference_area_setter.html %}




[Origin-Tistory-Post]: https://gigong.tistory.com/105
[Custom-Date-and-Time-Format-Strings-MSDN]: https://docs.microsoft.com/ko-kr/dotnet/standard/base-types/custom-date-and-time-format-strings
[GitHub-Sample]: https://github.com/GiGong/BlogPostSample/tree/master/Console/DateTimeToStringFormat