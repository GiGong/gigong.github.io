---
layout: post
title:  "WPF 음악 파일 재생하기"
date:   2022-04-22 21:56
categories: [WPF]
tags: [wpf, media, music, play, file, musicfile, mediaplayer, 음악, 파일, 재생]
excerpt_separator: <!--read more-->
---


<!-- header for toc -->
{% include post_function/post_navigation_heading.html level="1" number="0" content="시작" %}

<!--start excerpt-->
WPF 프로그램에서 음악 파일을 재생하는 방법에 대한 글입니다.
<!--read more-->

<sub>*※ 이 포스트는 과거 [티스토리 블로그][Origin-Tistory-Post]의 글을 개선한 글입니다.*</sub>


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="1" content="코드 먼저 보기" %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.1" content="기본적인 사용법" %}

편의를 위해 using을 추가해줍니다.

{% highlight csharp linenos %}
using System.Windows.Media;
...
private readonly MediaPlayer player = new MediaPlayer();
...
player.Open(new System.Uri(file.FileName));
player.Play();
player.Position.ToString(@"mm\:ss");
player.Pause();
player.Stop();
player.Close();
...
{% endhighlight %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="1.2" content="간단한 예시" %}

OpenFileDialog를 활용해 간단하게 만든 예시입니다.

{% highlight csharp linenos %}
using Microsoft.Win32;
using System;
using System.Windows;
using System.Windows.Media;
...
public partial class MainWindow : Window
{
    private readonly MediaPlayer player = new MediaPlayer();

    ...

    private void Open_Click(object sender, RoutedEventArgs e)
    {
        OpenFileDialog file = new OpenFileDialog();
        if (file.ShowDialog() == true)
        {
            player.Open(new Uri(file.FileName));
            lblFileName.Content = System.IO.Path.GetFileNameWithoutExtension(file.FileName);
        }
    }

    private void Pause_Click(object sender, RoutedEventArgs e)
    {
        player.Pause();
    }

    private void Play_Click(object sender, RoutedEventArgs e)
    {
        player.Play();
        lblMusicPosition.Content = player.Position.ToString(@"mm\:ss");
    }

    private void Stop_Click(object sender, RoutedEventArgs e)
    {
        player.Stop();
    }

    private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
    {
        player.Close();
    }
}
{% endhighlight %}


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="2" content="알아보기" %}


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.1" content="기본 기능" %}

먼저 MediaPlayer라는 클래스를 선언, 초기화해준 뒤 사용할 수 있습니다.
Player변수 하나하나가 각각 플레이어라고 생각하시면 됩니다.

 - Open() : Uri를 전달받아 해당 파일을 사용하게 됩니다.
 - Play() : 해당 Media를 재생합니다.
 - Pause() : Media를 일시정지합니다. 다시 Play 시 일시정지 한 곳에서부터 재생됩니다.
 - Stop() : Media를 정지합니다. 다시 Play 시 처음부터 재생됩니다.
 - Close() : 현재 Media를 Player에서 없앱니다.
 - Position.ToString() : 현재 재생 위치를 문자열로 반환해줍니다.  
  @"mm\:ss" 의 경우 "분:초", "02:07" 의 형태로 나타내줍니다.


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="2" number="2.2" content="예시 설명" %}

 - Microsoft.Win32.OpenFileDialog 를 활용하여 파일경로를 읽어옵니다.  
MediaPlayer에 전달하고 파일의 이름을 확장명 없이 Label에 전달해 파일 이름을 표시합니다.
 - Play 버튼을 누를 경우에만 Label에 Media의 현재 재생 위치를 표시합니다.
 - Window가 종료되기 전 Player를 Close 해줍니다.  

현재 Single Window이기 때문에 Close를 해주지 않아도 큰 문제가 없지만 
Multi Window 상황에서 Close를 해주지 않을 경우
해당 Window를 닫아도 Media가 계속 재생되는 상황이 발생할 수 있습니다.


----


<!-- include for toc -->
{% include post_function/post_navigation_heading.html level="1" number="000" content="그 외" %}

포스트의 예시를 사용한 샘플 WPF 프로젝트를 [GitHub][GitHub-Sample]에 올려놓았으니 보시면서 이해, 활용하시면 좋을 것 같습니다.




[Origin-Tistory-Post]: https://gigong.tistory.com/8
[GitHub-Sample]: https://github.com/GiGong/BlogPostSample/tree/main/WPF/PlayMusicFile