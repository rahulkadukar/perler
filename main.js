$(document).ready(function () {
  var arr = {};

  let size = 100;
  let zoom = 10;
  arr.width = 100;
  arr.height = 100;
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

  var imgData = new ImageData(size * zoom, size * zoom);
  let xp;
  let yp;

  for (var x = 0; x < imgData.data.length; ++x) {
    xp = (Math.floor(x / 4)) % (size * zoom);
    yp = Math.floor(x / (size * 4 * zoom));
    
    xp = Math.floor(xp / zoom);
    yp = Math.floor(yp / zoom);

    imgData.data[x] = arr.data[(((yp * size) + xp) * 4) + (x % 4)];
  }

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
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

  $("#convert").click(function () {
    let factor = 5;
    let initArr = [];
    
    for (let x = 0; x < ((arr.width > arr.height) ? arr.width : arr.height); x += factor) {
      initArr.push(x);
    }

    let interArray = [];

    for (let x = 0; x < arr.height; x++) {
      for (let y = 0; y < arr.width; y++) {
        if (initArr.includes(x) && initArr.includes(y)) {
          interArray.push({'x': x, 'y': y});
        }
      }
    }

    console.log(interArray);

    let arrConv = new ImageData(Math.ceil(arr.width / factor), Math.ceil(arr.height / factor));
    let arrCounter = 0;

    for (let a = 0; a < interArray.length; ++a) {
      let begin = interArray[a];
      
      let pixBegin = (begin.x * 4 * arr.width) + (begin.y * 4);
      let x = 0;
      do {
        arrConv.data[arrCounter++] = arr.data[pixBegin + x];
      } while (++x < 4);
    }

    drawImage(arrConv, '#finale');
  })

  function drawImage(e, l) {
    let zoom = 1000 / e.width;
    let size = e.width;

    let imgData = new ImageData(size * zoom, size * zoom);
    let xp;
    let yp;
    for (let x = 0; x < imgData.data.length; ++x) {
      xp = Math.floor(x / (e.width * 4 * zoom));
      yp = (Math.floor(x / 4)) % (size * zoom);

      xp = Math.floor(xp / zoom);
      yp = Math.floor(yp / zoom);

      imgData.data[x] = e.data[(((xp * size) + yp) * 4) + (x % 4)];
    }

    var finale = document.getElementById('finale');
    ctx = finale.getContext('2d');
    ctx.putImageData(imgData, 0, 0);
  }

  $('#loadImage').click(function () {
    let myImage = document.getElementById('original');
    let w = myImage.width, h = myImage.height;

    // Create a Canvas element
    var canvas = document.getElementById('canvas');

    // Size the canvas to the element
    canvas.width = w;
    canvas.height = h;

    // Draw image onto the canvas
    var ctx = canvas.getContext('2d');
    ctx.drawImage(myImage, 0, 0);

    let arr = ctx.getImageData(0, 0, w, h);

    let factor = 10;
    let initArr = [];
    
    for (let x = 0; x < ((arr.width > arr.height) ? arr.width : arr.height); x += factor) {
      initArr.push(x);
    }

    let interArray = [];

    for (let x = 0; x < arr.height; x++) {
      for (let y = 0; y < arr.width; y++) {
        if (initArr.includes(x) && initArr.includes(y)) {
          interArray.push({'x': x, 'y': y});
        }
      }
    }

    console.log(interArray);

    let arrConv = new ImageData(Math.ceil(arr.width / factor), Math.ceil(arr.height / factor));
    let arrCounter = 0;

    for (let a = 0; a < interArray.length; ++a) {
      let begin = interArray[a];
      
      let pixBegin = (begin.x * 4 * arr.width) + (begin.y * 4);
      let x = 0;
      do {
        arrConv.data[arrCounter++] = arr.data[pixBegin + x];
      } while (++x < 4);
    }

    console.log(arrConv);
    drawImage(arrConv, '#finale');
  });
});
