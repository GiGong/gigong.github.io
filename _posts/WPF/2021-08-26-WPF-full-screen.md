---
layout: post
title:  "WPF 프로그램 전체화면"
date:   2021-08-26 11:11
categories: [WPF]
tags: [wpf, c#, full_screen]
excerpt_separator: <!--read more-->
---


<!-- header for toc -->
{% include post_function/post_navigation_heading.html level="1" number="0" content="시작" %}

<!--start excerpt-->
WPF로 프로그램을 개발하다 보면 파워포인트의 '슬라이드 쇼'처럼 전체화면이 필요할 때가 있습니다.  
프로그램을 전체화면 시키는 방법과 원리에 관한 글입니다.
<!--read more-->

<sub>*※ 이 포스트는 과거 [티스토리 블로그][Origin-Tistory-Post]의 글을 개선한 글입니다.*</sub>


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="1" content="코드 먼저 보기" %}

바로 WPF에서 특정 Window를 전체화면 시키는 코드입니다.
해당 Window의 code behind에서 실행시켜야 하며 여기서 this는 해당 window가 됩니다. (ex. MainWindow.xaml.cs)

{% highlight csharp linenos %}
if (this.WindowState == WindowState.Maximized)
{ // 이미 전체화면 -> 원래 상태
  this.WindowStyle = WindowStyle.SingleBorderWindow;
  this.WindowState = WindowState.Normal;
  // this.Topmost = false;
}
else
{ // 전체화면 아니면 -> 전체화면
  this.WindowStyle = WindowStyle.None;
  this.WindowState = WindowState.Maximized;
  // this.Topmost = true;
}
{% endhighlight %}

원하는 곳, 예를 들어 KeyDown Event Handler같은 곳에 넣고 전체화면을 전환하면 됩니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="2" content="알아보기" %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.1" content="WindowState와 WindowStyle 속성" %}

Window는 WindowState라는 속성과 WindowStyle이라는 속성이 있습니다.  
([WindowState_MSDN][WindowState-MSDN])
([WindowStyle_MSDN][WindowStyle-MSDN])

전체화면의 기준은 먼저 **Window**의 *State*가 **Maximized** 여야 합니다.
여기서 *State*만 **Maximized**일 경우 우리가 프로그램 우측 상단의 ㅡㅁX에서 ㅁ을 누른 것과 같은 상태가 됩니다.

그래서 필요한 것이 *WindowStyle*입니다. *WindowStyle*을 바꾸지 않고 **Maximized**가 될 경우 화면 아래 작업표시줄이 남게 됩니다. 우리가 ㅁ버튼을 누른것과 똑같은 것이죠.  
하지만 *WindowStyle*을 **None**으로 바꾸고 **Maximized**를 할 경우 작업표시줄까지 가리게 됩니다.(!!)

그래서 7번 줄 `else` 문단에서 *WindowStyle*을 먼저 바꾸고, *WindowState*를 바꾸게 된 것입다.
그리고 1번 줄 `if` 문단에서는 윈래 상태로 돌아가려 하는데, *WindowState*는 기본 상태가 **Normal**이기 때문에 **Normal**로 대입하고, *WindowStyle*은 우리가 아는 ㅡㅁX의 상태인 **SingleBorderWindow**로 대입합니다.  
다른 원하는 상태가 있다면 해당 상태를 대입해주면 됩니다.  
*WindowStyle*의 예시는 [MSDN][WindowStyle-MSDN]에 나와있습니다.


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.2" content="Topmost 속성" %}

마지막은 5번과 11번 줄의 *Topmost* 속성입니다. ([Topmost_MSDN][Topmost-MSDN])  
이 속성은 "항상 위로" 속성이라고 생각하시면 됩니다. 어떤 상황에서도 해당 Window가 가장 위에 떠서 화면을 가리게 되며 다른 창을 다 가리게 됩니다.  
간혹 Windows 7이나 몇몇 PC에서 *WindowStyle*과 *WindowState*를 다 설정해도 작업표시줄을 가리지 못할 때가 있습니다. 그런 때 *Topmost*를 **True**로 해줄 경우 작업표시줄까지 가리게 됩니다.

***하지만 모든 화면을 가릴 수 있으니 조심해서 사용해야 합니다.***


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="000" content="완료" %}

WPF에서 원하는 Window를 전체화면 시키는 방법과 원리에 대해 알아보았습니다.

code behind외에도 xaml에서 Binding과 Trigger를 통해 적용시키는 방법이 있지만, 추후 포스팅하도록 하겠습니다.  
여기선 간단히 xaml 코드만 적어놓겠습니다.

{% highlight xml linenos %}
<Style TargetType="{x:Type Window}">
    <Style.Triggers>
        <DataTrigger Binding="{Binding IsFullScreen}" Value="True">
            <Setter Property="WindowStyle" Value="None"/>
            <Setter Property="WindowState" Value="Maximized"/>
            <!--<Setter Property="Topmost" Value="True"/>-->
        </DataTrigger>
        <DataTrigger Binding="{Binding IsFullScreen}" Value="False">
            <Setter Property="WindowStyle" Value="SingleBorderWindow"/>
            <Setter Property="WindowState" Value="Normal"/>
            <!--<Setter Property="Topmost" Value="False"/>-->
        </DataTrigger>
    </Style.Triggers>
</Style>
{% endhighlight %}



[Origin-Tistory-Post]: https://gigong.tistory.com/28
[WindowState-MSDN]: https://docs.microsoft.com/ko-kr/dotnet/api/system.windows.window.windowstate
[WindowStyle-MSDN]: https://docs.microsoft.com/ko-kr/dotnet/api/system.windows.window.windowstyle
[Topmost-MSDN]: https://docs.microsoft.com/ko-kr/dotnet/api/system.windows.window.topmost