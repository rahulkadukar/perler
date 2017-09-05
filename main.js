$(document).ready(function () {
  var arr = {};

  let finalList = []; 
  finalList = ['ffffff', 'ffffcc', 'ffb266', 'ffcccc', 'ff0000', 'fef875', 'ffffff', 'ffff00',
               '663300', '111111', 'f5deb3', 'f6b3dd', 'ff6666', 'fef875', 'ffff00', 'ccffcc',
               'ccffff', '111111', 'b1b5b2', 'ffcccc', 'ff0000', 'ad98d4', 'ee82ee', '8a2be2', 
               '00bfff', '66b2ff', '0000ff', 'ffcccc', 'ff0000', '20b2aa', '228b22', 'ccffcc'
              ];

  finalList = finalList.reverse();
  drawGradient(finalList);

  let size = 4;
  let zoom = 250;
  arr.width = 4;
  arr.height = 4;
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
    xp = (Math.floor(x / 4)) % (size * zoom);
    yp = Math.floor(x / (size * 4 * zoom));
    
    xp = Math.floor(xp / zoom);
    yp = Math.floor(yp / zoom);

    imgData.data[x] = arr.data[(((yp * size) + xp) * 4) + (x % 4)];
  }

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  ctx.putImageData(imgData, 0, 0);

/* 
  var tester = document.getElementById('tester');
  ctx = tester.getContext('2d');

  let bgColor = arr.data.slice(-4);
  ctx.fillStyle = "rgba(" + bgColor[0] + "," + bgColor[1] + "," + bgColor[2] + "," + bgColor[3] + ")";
  ctx.fillRect(0, 0, 1000, 250);


  var cchart = document.getElementById('cchart1');
  ctx = cchart.getContext('2d');
  {
    let imgData = new ImageData(2000, 100);
    for (let x = 0; x < imgData.data.length; ++x) {
      if ((x + 1) % 4 == 0) {
        imgData.data[x] = 255;
      } else {
        let xp = Math.floor((Math.floor(x / 4) % 2000) / (2000 / 256));
        imgData.data[x] = xp;
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }
*/
  $("#convert").click(function () {
    let factor = 2;
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

    let arrConv = new ImageData(Math.ceil(arr.width / factor), Math.ceil(arr.height / factor));
    let arrCounter = 0;

    for (let a = 0; a < interArray.length; ++a) {
      let begin = interArray[a];
      
      let pixBegin = (begin.x * 4 * arr.width) + (begin.y * 4);
      let x = 0;
      do {
        let y = 0;
        let agg = 0;
        do {
          let z = 0;
          do {
            agg += arr.data[pixBegin + x + (4 * (y + (arr.width * z)))];
          } while (++z < factor);
        } while (++y < factor);
        arrConv.data[arrCounter++] = agg / (factor * factor);
        // arrConv.data[arrCounter++] = arr.data[pixBegin + x];
      } while (++x < 4);
    }

    console.log(arrConv);
    drawImage(arrConv, 'finale');
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

    var finale = document.getElementById(l);
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
        let y = 0;
        let agg = 0;
        do {
          let z = 0;
          do {
            agg += arr.data[pixBegin + x + (4 * (y + (arr.width * z)))];
          } while (++z < factor);
        } while (++y < factor);
        arrConv.data[arrCounter++] = agg / (factor * factor);
        // arrConv.data[arrCounter++] = arr.data[pixBegin + x];
      } while (++x < 4);
    }

    console.log(arrConv.data.length);
    sendOver(arrConv);
    drawImage(arrConv, 'finale');
  });

  function calcDiff(a, b) {
    let x = 0;
    
    x += Math.sqrt(
    Math.pow((parseInt(a.substr(0,2), 16) - parseInt(b.substr(0,2), 16)), 2) +
    Math.pow((parseInt(a.substr(2,2), 16) - parseInt(b.substr(2,2), 16)), 2) +
    Math.pow((parseInt(a.substr(4,2), 16) - parseInt(b.substr(4,2), 16)), 2)
    );
    
    return x;
  }

  function sendOver(imageData) {
    var e = new ImageData(imageData.width, imageData.height);
    for (let x = 0; x < imageData.data.length; ++x) {
      e.data[x] = imageData.data[x];
    }

    console.log(finalList);

    for (let a = 0; a < finalList.length; ++a) {
      console.log(parseInt(finalList[a], 16));
    }

    var r,g,b;

    for (let a = 0; a < e.data.length;) {
      let max = 16777216;
      let xp;
      for (let g = 0; g < finalList.length; ++g) {
        let x;
        x = e.data[a].toString(16).padStart(2,'0') + 
            e.data[a+1].toString(16).padStart(2,'0') + 
            e.data[a+2].toString(16).padStart(2,'0'); 
        let diff = calcDiff(x, finalList[g]);
        if (diff < max) {
          max = diff;
          xp = g;
        }
      }

      r = e.data[a] * ((parseInt('ffff', 16) + 1));
      g = e.data[a+1] * ((parseInt('ff', 16) + 1));
      b = e.data[a+2];
      
      var colorX = parseInt(finalList[xp], 16);
      colorX = colorX.toString(16).padStart(6, '0');
      e.data[a] = parseInt((colorX.substr(0,2)), 16);
      e.data[a+1] = parseInt((colorX.substr(2,2)), 16);
      e.data[a+2] = parseInt((colorX.substr(4,2)), 16);

      a += 4;
    }

    console.log(colorX);
    drawImage(e, 'canvas');
  }

  function drawGradient(e) {
    let imgData1 = new ImageData(1000, 100);
    let imgData2 = new ImageData(1000, 100);
    let imgData3 = new ImageData(1000, 100);
    let imgData4 = new ImageData(1000, 100);
  
    for (let x = 0; x < imgData1.data.length; x++) {
      if (((x + 1) % 4) == 0) {
        imgData1.data[x] = 255;
      } else {
        let xp = Math.floor((Math.floor(x / 4) % 1000) / (1000 / 8));
        imgData1.data[x] = parseInt((e[xp].substr((2 * ((x) % 4)),2)), 16);
      }
    }

    for (let x = 0; x < imgData2.data.length; x++) {
      if (((x + 1) % 4) == 0) {
        imgData2.data[x] = 255;
      } else {
        let xp = Math.floor((Math.floor(x / 4) % 1000) / (1000 / 8)) + 8;
        imgData2.data[x] = parseInt((e[xp].substr((2 * ((x) % 4)),2)), 16);
      }
    }

    for (let x = 0; x < imgData3.data.length; x++) {
      if (((x + 1) % 4) == 0) {
        imgData3.data[x] = 255;
      } else {
        let xp = Math.floor((Math.floor(x / 4) % 1000) / (1000 / 8)) + 16;
        imgData3.data[x] = parseInt((e[xp].substr((2 * ((x) % 4)),2)), 16);
      }
    }

    for (let x = 0; x < imgData4.data.length; x++) {
      if (((x + 1) % 4) == 0) {
        imgData4.data[x] = 255;
      } else {
        let xp = Math.floor((Math.floor(x / 4) % 1000) / (1000 / 8)) + 24;
        imgData4.data[x] = parseInt((e[xp].substr((2 * ((x) % 4)),2)), 16);
      }
    }

    var canvas = document.getElementById('cchart1');
    var ctx = canvas.getContext('2d');
    ctx.putImageData(imgData1, 0, 0);

    canvas = document.getElementById('cchart2');
    ctx = canvas.getContext('2d');
    ctx.putImageData(imgData2, 0, 0);

    canvas = document.getElementById('cchart3');
    ctx = canvas.getContext('2d');
    ctx.putImageData(imgData3, 0, 0);

    canvas = document.getElementById('cchart4');
    ctx = canvas.getContext('2d');
    ctx.putImageData(imgData4, 0, 0);
  }
});

