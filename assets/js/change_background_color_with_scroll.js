const scrollThreshold = document.getElementsByTagName("header")[0].scrollHeight / 2;

window.addEventListener('scroll', () => {
  if (window.scrollY > scrollThreshold) {
    document.body.setAttribute('data-scroll', 'down');
  }
  else {
    document.body.setAttribute('data-scroll', 'none');
  }
});