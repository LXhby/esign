(function () {
  var html = document.querySelector("html");
  var width = html.getBoundingClientRect().width;
  html.style.fontSize = width /10 +'px';
})()
