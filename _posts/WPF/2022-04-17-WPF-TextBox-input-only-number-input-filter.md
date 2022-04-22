---
layout: post
title:  "WPF TextBox 숫자만 입력 하기(입력 필터)"
date:   2022-04-17 17:35
categories: [WPF]
tags: [wpf, textbox, input, input_filter, previewkeydown, event_handler]
excerpt_separator: <!--read more-->
---


<!-- header for toc -->
{% include post_function/post_navigation_heading.html level="1" number="0" content="시작" %}

<!--start excerpt-->
WPF에서 TextBox로 입력을 받을 때 숫자 혹은 특정 문자만 입력하게 해야할 때가 있습니다.
그 방법에 대해 알아보겠습니다.
<!--read more-->

<sub>*※ 이 포스트는 과거 [티스토리 블로그][Origin-Tistory-Post]의 글을 개선한 글입니다.*</sub>


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="1" content="코드 먼저 보기" %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.1" content="Event Handler 추가" %}

먼저 해당 TextBox의 **PreviewKeyDown** Event Handler를 추가해주어야 합니다.

다음과 같이 xaml에서 추가하는 방법,
{% highlight xml linenos %}
<TextBox ... PreviewKeyDown="textBoxNumber_PreviewKeyDown" ... />
{% endhighlight %}

behind code에서 추가하는 방법이 있습니다.
{% highlight csharp linenos %}
...
textBoxNumber.PreviewKeyDown += textBoxNumber_PreviewKeyDown;
...
{% endhighlight %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.2" content="Event Handler" %}

Event Handler 코드 입니다.
{% highlight csharp linenos %}
private void textBoxNumber_PreviewKeyDown(object sender, KeyEventArgs e)
{
    if (!((Key.D0 <= e.Key && e.Key <= Key.D9)
        || (Key.NumPad0 <= e.Key && e.Key <= Key.NumPad9)
        || e.Key == Key.Back))
    {
        e.Handled = true;
    }
}
{% endhighlight %}


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="2" content="알아보기" %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.1" content="PreviewKeyDown Event" %}

[PreviewKeyDown][Preview-Key-Down-Event] 이벤트는 [KeyDown][Key-Down-Event] 이벤트보다 앞서 발생되며,
입력된 Key의 정보를 갖고 있는 [KeyEventArgs][Key-Event-Args] 를 전달합니다.

해당 매개변수(여기선 e)의 Key 속성이 입력된 키이며 KeyDown Event에서는 Space와 Backspace 같은 키들을 처리할 수 없습니다.  
때문에 우리는 Space 입력도 막기 위해 PreviewKeyDown 이벤트를 활용합니다.

<sub>*※ Space와 Bakcspace같은 키를 제외하곤 KeyDown Event에서도 동일하게 활용할 수 있습니다.*</sub>


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.2" content="코드 설명" %}

Event Handler에서 정해진 키가 아니면 if 문을 실행시킵니다.  
여기서 조건은 원하는 키가 아닐 경우이며 !를 활용해 원하는 키의 범위를 조정해줍니다.  
ascii와 유사하게 [Key의 값][Key-Value]들 또한 연관된 Key끼리 범위를 이루며, 예를 들어 다음과 같습니다.

 - D0 ~ D9 : 키보드 qwerty 위쪽 부분 숫자 0 ~ 9 (Character keys 상단)
 - NumPad0 ~ NumPad9 : 키보드 우측 NumPad 부분 숫자 0 ~ 9 (Numeric keypad 부분)
 - A ~ Z : 알파벳 A ~ Z (Character keys 알파벳 부분)
 - Back : BackSpace, 지우기 키 (Enter and editing keys 부분 ← 키)

<!-- include for image -->
{% include post_function/figure_image.html url="https://upload.wikimedia.org/wikipedia/commons/9/9c/ISO_keyboard_%28105%29_QWERTY_UK.svg" description="Keyboard Layout" %}

최종적으로 7번 줄 if 문 안에서 EventArgs의 Handled를 true로 바꾸어 더이상 Route되지 못하게 막습니다. 
또한 이 문단에서 MessageBox를 통해 경고 메세지를 보여주는 등 추가 작업을 할 수 있습니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="000" content="그 외" %}

이를 활용하여 문자만 입력 or 특수문자만 입력 등의 처리를 할 수 있으며,  
string.Contains 혹은 Filter를 만들어 e.Key의 ToString으로 처리할 수도 있습니다.

{% highlight csharp linenos %}
// private HashSet<string> inputFilter = new HashSet<string>();
// inputFilter.Add("Left");
// inputFilter.Add("Right");
...
if (!("ABCDEF".Contains(e.Key.ToString())
// or inputFilter.Contains(e.Key.ToString())
    || e.Key == Key.Back))
{
    e.Handled = true;
}
...
{% endhighlight %}

\
KeyConverter, keyInterop.VirtualKeyFromKey 등의 방법으로는 NumPad를 처리하지 못하여 지금과 같은 방법으로 처리하였습니다.

샘플 WPF 프로젝트를 [GitHub][GitHub-Sample]에 올려놓았으니 보시면서 이해, 활용하시면 좋을 것 같습니다.




<!-- reference area -->
  - [Keyboard-Layout-Wikipedia][Keyboard-Layout-Image]
{% include post_function/reference_area_setter.html %}




[GitHub-Sample]: https://github.com/GiGong/BlogPostSample/tree/master/WPF/TextBox_Input_Filter
[Origin-Tistory-Post]: https://gigong.tistory.com/5
[Preview-Key-Down-Event]: https://docs.microsoft.com/ko-kr/dotnet/api/system.windows.uielement.previewkeydown
[Key-Down-Event]: https://docs.microsoft.com/ko-kr/dotnet/api/system.windows.uielement.keydown
[Key-Event-Args]: https://docs.microsoft.com/ko-kr/dotnet/api/system.windows.input.keyeventargs
[Key-Value]: https://docs.microsoft.com/ko-kr/dotnet/api/system.windows.input.key
[Keyboard-Layout-Image]: https://en.wikipedia.org/wiki/Keyboard_layout