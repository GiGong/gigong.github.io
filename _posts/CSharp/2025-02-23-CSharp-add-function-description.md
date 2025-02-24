---
title:  "C# 함수 설명 추가하기 (Add function description)"
date:   2025-02-23 20:34
categories: [C#]
tags: [c#, 씨샵, add, addition, attach, function, func, description, desc, information, info, summary, documentation, 함수, 툴팁, 문서화, 설명, 추가]
---


<!-- header for toc -->
{% include post_function/post_navigation_heading.html level="1" number="0" content="시작" %}

<!--start excerpt-->
개발을 하다 보면 함수의 용도나 파라미터 정보를 **툴팁**으로 간략히 볼 수 있으면 편리할 때가 있습니다.  
C#에서는 **문서 주석(Documentation Comments)**을 통해 개발자가 만든 함수에 
자동으로 함수 설명을 표시할 수 있습니다.  
<!--read more-->
이를 활용하면 코드의 가독성을 높이고, 함수의 목적과 사용 방법을 보다 명확하게 전달할 수 있습니다.  


<sub>*※ 이 포스트는 과거 [티스토리 블로그][Origin-Tistory-Post]의 글을 개선한 글입니다.*</sub>


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="1" content="코드 먼저 보기" %}

C#에서 함수(또는 클래스, 필드 등) 위에 `///`를 입력하면  
IDE(e.g. Visual Studio)가 자동으로 `<summary>` 및 `<param>` 태그를 생성해 줍니다.

아래는 문서화 주석을 등록한 간단한 예시입니다.  
다른 곳에서 `ApplyTextToLabel()` 함수를 호출할 때, 함수에 대한 설명(`summary`)과 파라미터(`param`)에 대한 툴팁을 볼 수 있습니다.

{% highlight xml linenos %}
/// <summary>
/// Function for applying various font settings to a Label
/// </summary>
/// <param name="lbl">적용 대상 Label 컨트롤</param>
/// <param name="text">적용할 텍스트</param>
public void ApplyTextToLabel(Label lbl, string text)
{
    lbl.Content = text;
}
{% endhighlight %}

- `///`를 입력해도 자동 주석 양식이 뜨지 않는다면 `<summary>`와 `<param>` 등 직접 입력해줍니다.
- 함수에 대한 간단한 설명, 매개변수 각각에 대한 의미 등을 넣어주면 IDE에서 편리하게 확인할 수 있습니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="2" content="알아보기" %}

<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.1" content="XML Documentation Comments" %}

C#에서의 문서화 주석은 다음과 같은 태그를 제공합니다.

- `<summary>`: 해당 함수 또는 클래스 등 의 **주요 기능** 또는 간략한 설명 작성합니다.
- `<param>`: 매개변수 이름을 지정하고, 각 매개변수의 설명을 작성합니다.
- `<returns>`: 반환값이 있는 경우, 함수가 어떤 형태 또는 의미의 값을 반환하는지 설명을 작성합니다.
- `<see>`: 다른 클래스, 메서드, 웹 등 추가로 참고할 대상의 링크를 작성합니다.

이 외에 `<example>`, `<remarks>` 등 다양한 태그가 있지만,
일반적으로 가장 많이 쓰이는 것은 `<summary>`와 `<param>`, `<returns>`입니다.


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.2" content="실제 사용 예시" %}

팀 프로젝트 혹은 오픈소스 처럼 타인와 코드를 공유할 때 코드 가독성을 높이는 데 유용합니다.  
> API 라이브러리에 문서화 주석을 잘 활용하면, 사용자가 함수의 용도와 사용 방법을 쉽게 이해할 수 있습니다.

아래는 간단한 ViewModel 작성 예시입니다.

{% highlight xml linenos %}
/// <summary>
/// MainViewModel 클래스 - MainView의 로직 처리
/// </summary>
public class MainViewModel
{
    /// <summary>
    /// 해당 View의 Title
    /// </summary>
    public string Title { get; set; }

    /// <summary>
    /// ViewModel 생성자
    /// </summary>
    public MainViewModel()
    {
        Title = "Hello World!";
    }

    /// <summary>
    /// 두 int를 더하는 함수
    /// </summary>
    /// <param name="a">첫 번째 숫자</param>
    /// <param name="b">두 번째 숫자</param>
    /// <returns>두 숫자의 합</returns>
    /// <example>
    /// 두 int를 더하는 예시
    /// <code>
    /// int sum = Add(3, 5);  // 결과: 8
    /// </code>
    /// </example>
    public static int Add(int a, int b)
    {
        return a + b;
    }
}
{% endhighlight %}

- Visual Studio에서는 함수를 호출할 때는 물론 클래스 자체나 프로퍼티에 마우스를 올려도 `<summary>`가 보여집니다.
- 협업 시 코드 문서화를 쉽게 할 수 있어, 유지보수 효율이 높아집니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="000" content="그 외" %}

*C#에서 XML 주석을 활용해 함수를 문서화하는 방법*을 알아보았습니다.  
매개변수가 많거나 구분이 필요한 속성 외에도 다른 사람들과 공유할 코드에는 이러한 주석을 달아두면 IDE 차원에서 가이드를 제공해주기 때문에 개발자 모두가 쉽고 빠르게 코드를 이해할 수 있습니다.  
C# IDE 및 VS Code 등 툴에서는 Ext를 통해서라도 문서화 주석을 지원하기에, C#에서 문서화 주석은 꼭 사용하는 것이 좋을 것 같습니다.




<!-- reference area -->
  - <https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/xmldoc/recommended-tags>
{% include post_function/reference_area_setter.html %}




[Origin-Tistory-Post]: https://gigong.tistory.com/45
[MSDN-Tags]: https://learn.microsoft.com/ko-kr/dotnet/csharp/language-reference/xmldoc/recommended-tags
