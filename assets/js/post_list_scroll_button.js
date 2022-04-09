document.getElementById("btn-left")
  .addEventListener('click', function (event) {
    targetList = document.getElementById("related-post-list")
    targetList.scrollLeft -= targetList.clientWidth / 2;
  });

document.getElementById("btn-right")
  .addEventListener('click', function (event) {
    targetList = document.getElementById("related-post-list")
    targetList.scrollLeft += targetList.clientWidth / 2;
  });