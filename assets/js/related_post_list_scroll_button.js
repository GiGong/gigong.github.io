document.getElementById("btn-related-post-left")
  .addEventListener('click', function (event) {
    targetList = document.getElementById("related-post-list")
    targetList.scrollLeft -= targetList.clientWidth / 2;
  });

document.getElementById("btn-related-post-right")
  .addEventListener('click', function (event) {
    targetList = document.getElementById("related-post-list")
    targetList.scrollLeft += targetList.clientWidth / 2;
  });