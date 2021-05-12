---
layout: post
title:  "구글도메인(io 도메인) 구매하기"
date:   2021-05-10 20:44
categories: [Diary]
tags: [diary, google_domain, io_domain]
excerpt_separator: <!--read more-->
---


{% include post_navigation_heading.html level="2" number="0" content="서론" %}

새로 블로그를 시작하면서 새롭게 custom domain을 등록하기로 했습니다.
gigong.io를 사용하기로 정하고 구매방법을 찾아보니, 구글 도메인에서 구매하는게 가장 나아보였습니다.
구매하는 과정에 주소 입력부분에서 조금 헤맸기에 구글 도메인에서 도메인 구입하는 방법을 정리합니다.  
(**개인**이 **처음** 구매한다는 가정입니다.)  
준비물: 해외 결제 가능한 카드
<!--read more-->


{% include post_navigation_heading.html level="2" number="1" content="구글 도메인" %}

우리가 일반적으로 알고 있는 도메인 업체처럼, 구글도 도메인을 살 수 있습니다.
구글 도메인([링크][google-domain])을 검색해서 들어가시면 아래와 같은 창으로 넘어갈 겁니다.

{% include figure.html url="/assets/images/google-domain/google-domain.jpg" description="구글 도메인" %}


{% include post_navigation_heading.html level="3" number="1.1" content="장바구니" %}

최적의 도메인 찾기를 누르고 원하는 도메인을 검색합니다. 구매가 가능하다면 장바구니에 추가한 뒤, 바로 장바구니로 이동합니다.

{% include figure.html url="/assets/images/google-domain/basket.jpg" description="장바구니 화면" %}

먼저 등록 기간을 정해주고, 원하는 내용을 체크합니다.

- 개인정보 보호는 WHOIS같은 곳에서 사이트 정보를 검색하면 개인정보가 아니라  
구글 도메인의 정보가 뜨게 해주므로 해놓으면 좋습니다.
- 자동 갱신은 말 그대로 자동 갱신입니다.
- Google Workspace는 유료이므로 원치 않으면 체크하지 않습니다.


{% include post_navigation_heading.html level="3" number="1.2" content="국가 설정" %}

처음 구매하신다면, 확인을 눌러서 넘어갈 때 대한민국은 구글 도메인을 지원하지 않으므로 청구서 수신 국가를 설정하라고 나옵니다.
국가를 미국으로 설정하고 넘어갑니다.

{% include figure.html url="/assets/images/google-domain/nation.jpg" description="국가 설정" %}

다른나라로 설정해도 되는지 테스트해보지 않았지만, 저는 미국으로 설정하고 진행했습니다.  
뒤에 따로 우리 정보를 입력하는 곳에서 대한민국으로 입력하면 됩니다.


{% include post_navigation_heading.html level="3" number="1.3" content="정보 입력" %}

이제 우리의 정보를 입력해야 합니다. 개인정보들을 입력하는데, **영어**로 입력해야 합니다.

{% include figure.html url="/assets/images/google-domain/information.jpg" description="정보 입력" %}

모든 주소는 영어로 입력해야 하므로 네이버 영어주소의 도움을 받습니다. ([링크][naver-english-address])
- 국가를 대한민국으로 설정합니다.
- 사는 도시를 선택합니다. (ex. 서울, 경기, 강원 등등)  
- 다음 단위의 주소를 입력합니다. (ex. 위에서 서울일 경우 ㅇㅇ구 입력)  
영어로 종로구 같은 경우 Jongno-gu 로 - 까지 입력해줍니다.
- 최종 도로명 주소를 입력합니다. (ex. ㅇㅇ로 00길 00-00)
- 주소 입력란 2 에는 상세주소를 입력합니다. (ex. 000동 00호 등)
- 5자리의 우편번호를 입력합니다. (ex. 00000)
- 전화번호를 입력합니다. (ex. 000-0000-0000)

서울특별시청의 경우 주소는 "서울특별시 중구 세종대로 110 (태평로1가, 서울특별시청)"이고,  
영어 주소가 "110, Sejong-daero, Jung-gu" 이므로  
*도/시*는 "서울" *도시*는 "Jung-gu" *주소 입력란 1*은 "110, Sejong-daero, Jung-gu" 가 됩니다.  
그리고 *주소 입력란 2*에는 "Taepyeong-ro 1-ga, Seoul Metropolitan Government"를 입력하게 됩니다.


{% include post_navigation_heading.html level="3" number="1.4" content="구매" %}

입력을 제대로 **영어**로 했다면, 구매화면으로 갈 수 있습니다. 해외결제가 되는 카드를 등록하고 구매하면 되며, 갱신시에는 등록된 카드로 다시 결제됩니다.  
결제는 달려 $ 단위이므로 환율에따라 달라집니다.. (저는 60$ -> 68096원 나왔습니다.)


{% include post_navigation_heading.html level="2" number="000" content="완료" %}

구매를 잘 하셨다면 축하합니다! 도메인의 주인이 되셨습니다.  
github pages같은 곳에 연결하는 경우 메뉴에서 DNS로 들어가신 후 "맞춤 리소스 레코드"를 통해 연결하시면 됩니다.




[google-domain]:  https://domains.google.com/registrar/
[naver-english-address]: https://search.naver.com/search.naver?query=%EC%98%81%EC%96%B4%EC%A3%BC%EC%86%8C