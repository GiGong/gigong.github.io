---
layout: post
title:  "WPF 듀얼(서브) 모니터에서 전체화면"
date:   2021-09-14 23:46
categories: [WPF]
tags: [wpf, c#, dual_monitor, sub_monitor, multi_monitor, full_screen]
excerpt_separator: <!--read more-->
---


<!-- header for toc -->
{% include post_function/post_navigation_heading.html level="1" number="0" content="시작" %}

<!--start excerpt-->
WPF 프로그램이 서브모니터에 전체화면이 되게 해야 할 때가 있습니다. 그 방법에 대해 알아보겠습니다.
<!--read more-->

기본적으로 WPF 프로그램을 전체화면 하는 방법은 [여기][wpf-full-screen]에 있습니다. 

----

*※ 이 포스트는 과거 [티스토리 블로그][Origin-Tistory-Post]에 포스팅 했던 글을 개선한 글입니다.*


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="1" content="코드 먼저 보기" %}

※ *참조를 추가해야 합니다.*

어셈블리 -> **System.Drawing**  
어셈블리 -> **System.Windows.Forms**

{% highlight csharp linenos %}
SubWindow sub = new SubWindow();
System.Drawing.Rectangle r1 = System.Windows.Forms.Screen.AllScreens[1].WorkingArea;

sub.WindowState = System.Windows.WindowState.Normal;
sub.WindowStyle = WindowStyle.None;
sub.WindowStartupLocation = System.Windows.WindowStartupLocation.Manual;

sub.Left = r1.Left;
sub.Top = r1.Top;
// sub.Topmost = true;

sub.Show();
sub.WindowState = System.Windows.WindowState.Maximized;
{% endhighlight %}

여기서 SubWindow는 임의로 만든 Window입니다.


----
<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="2" content="알아보기" %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.1" content="Screen과 WorkingArea" %}

먼저 2번째 줄에 있는 **System.Windows.Forms.Screen.AllScreens[1].WorkingArea** 입니다. ([AllScreens_MSDN][AllScreens-MSDN])

WPF에서는 Primary 모니터의 속성은 제공하지만 서브모니터는 기본적으로는 제공하지 않습니다. 그래서 Forms에 있는 값들을 가져오는 것이며, AllScreens는 이름 그대로 윈도우의 모든 화면의 정보를 갖고 있고, index는 화면의 순서입니다.

그리고 WorkingArea는 작업하는 공간을 나타내는 Rectangle인데, 문제는 Forms에서 AllScreens를 불러왔듯 이 Rectangle이 WPF가 아닌 Forms의 Rectangle이란 겁니다.  
그래서 필요한 내용만 빼내기 위해 r1으로 저장해놓고, 8번과 9번 줄에서 전체화면 시키려는 윈도우의 Left와 Top을 r1.Left와 r1.Top으로 설정합니다.

결과적으로 윈도우의 위치는 위에서 WorkingArea의 Left와 Top을 기준으로 위치가 설정되고, 그 위치에서 전체화면으로 전환되게 됩니다.


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.2" content="WindowStartupLocation" %}

다른 코드들은 WPF를 전체화면 하는 과정과 다른게 없지만, 창을 새로 띄우면서 전체화면 시킬 거라면 중요한 점이 있습니다. 이미 Window가 화면에 떠 있다면 상관이 없지만,   
6번줄의 ***WindowStartupLocation***을 꼭 Manual로 해주어야 우리가 원하는 위치에서 Window가 생기고, 그 화면에서 전체화면이 되기 때문입니다.  
([WindowStartupLocation_MSDN][WindowStartupLocation-MSDN])

WindowStartupLocation은 이름 그대로 Window가 시작될 때 어디서 시작할 지 기준을 정해주는 속성입니다. 
Manual이 아닐 경우 속성에 따라 정해진 위치에서 시작되기 때문에 위에서 우리가 설정한 Left와 Top 속성이 먹히지 않습니다.


----
<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="000" content="완료" %}

새 창을 띄우면서 전체화면 시키는 파워포인트 발표 슬라이드 쇼 처럼 서브 모니터에서 전체화면이 필요할 때 사용하는 코드입니다.
이 코드도 MVVM 과 결합하여 Command로 전달할 수 있지만, 나중에 MVVM을 포스팅하게 되면 같이 쓰도록 하겠습니다.

그 외 Topmost나 WindowState, WindowStyle의 정보는 위에 링크한 [이전 포스팅][wpf-full-screen]에서 다뤘으니 참고해주시기 바랍니다.



[wpf-full-screen]: {% post_url WPF/2021-08-26-WPF-full-screen %}
[Origin-Tistory-Post]: https://gigong.tistory.com/1
[AllScreens-MSDN]: https://docs.microsoft.com/ko-kr/dotnet/api/system.windows.forms.screen.allscreens
[WindowStartupLocation-MSDN]: https://docs.microsoft.com/ko-kr/dotnet/api/system.windows.window.windowstartuplocation