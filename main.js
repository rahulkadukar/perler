$(document).ready(function () {
  var arr = {};

  let size = 5;
  let zoom = 200;
  arr.width = 5;
  arr.height = 5;
  arr.data = [];

  for (var x = 0; x < arr.width * arr.height; x++) {
    let y = 0;
    do {
      if (y === 3) {
        arr.data.push(255);
      } else {
        arr.data.push(Math.floor(Math.random() * 255));
      }
    } while (++y < 4);
  }

  console.log(arr);

  var imgData = new ImageData(size * zoom, size * zoom);
  let xp;
  let yp;

  for (var x = 0; x < imgData.data.length; ++x) {
    xp = Math.floor(x / (size * 4 * zoom));
    yp = (Math.floor(x / 4)) % (size * zoom);

    xp = Math.floor(xp / zoom);
    yp = Math.floor(yp / zoom);

    imgData.data[x] = arr.data[(((xp * size) + yp) * 4) + (x % 4)];
    // console.log(xp * 4 + yp);
  }

  console.log(imgData);
  console.log(xp + ' ' + yp);

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.putImageData(imgData, 0, 0);

  var finale = document.getElementById('finale');
  ctx = finale.getContext('2d');
  ctx.putImageData(imgData, 0, 0);

  var tester = document.getElementById('tester');
  ctx = tester.getContext('2d');

  let bgColor = arr.data.slice(-4);
  ctx.fillStyle = "rgba(" + bgColor[0] + "," + bgColor[1] + "," + bgColor[2] + "," + bgColor[3] + ")";
  ctx.fillRect(0, 0, 1000, 250);

  var finito = document.getElementById('finito');
  ctx = finito.getContext('2d');

  bgColor = arr.data.slice(-4);
  ctx.fillStyle = "rgba(" + bgColor[0] + "," + bgColor[1] + "," + bgColor[2] + "," + bgColor[3] + ")";
  ctx.fillRect(0, 0, 1000, 250);

});
