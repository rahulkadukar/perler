$(document).ready(function () {
  var arr = {};
  var data = {};
  data.height = window.innerHeight;
  data.width = window.innerWidth;
  
  $(window).resize(function() {
    data.height = window.innerHeight;
    data.width = window.innerWidth;
  });

  var e = new ImageData(data.width, data.height);

  for (let x = 0; x < e.data.length; ++x) {
    e.data[x] = Math.floor(Math.random() * 255);
  }

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.putImageData(e, 0, 0);

});