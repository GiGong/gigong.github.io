// when copy text in post, source also copied
// 자동 출처 표기
// code referenced from
// https://stackoverflow.com/a/55466400

document.addEventListener('copy', function (e) {
    var text = window.getSelection().toString() + "\n\n출처: " + location.href + " [GiGong Blog]";
    e.clipboardData.setData('text/plain', text);
    e.preventDefault();
});