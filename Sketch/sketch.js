// www.lomz.net - 2019.
// https://stihilus.github.io/lomz/generated_p5js_portraits.html

// For save image: Right click > Save image as

var video;
var video2;
var video3;
var vScale = 1;
var darkImage = false;
var assets_array = [];
var dark_array = [];
var downloadingImage = false;

function preload() {
  for (var i = 1; i < 10; i++) {
    assets_array.push(loadImage(`assets/img0${i}.jpg`));
  }

  for (var i = 10; i < 19; i++) {
    dark_array.push(loadImage(`assets/img${i}.jpg`));
  }
}

function setup() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  createCanvas(405, 805);
  pixelDensity(3);
  video = loadImage(urlParams.get("card1"));
  video2 = loadImage(urlParams.get("card2"));
  video3 = loadImage(urlParams.get("card3"));
  noStroke();
}

function draw() {
  darkImage = false;
  background('grey');
  video.loadPixels();
  video2.loadPixels();
  video3.loadPixels();
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {
      var index;
      var r;
      var g;
      var b;

      if (x % 2 == 0) {
        index = (video.width - x + 1 + (y * video.width)) * 4;
        r = video.pixels[index + 0];
        g = video.pixels[index + 1];
        b = video.pixels[index + 2];
      } else {
        if (Math.floor(random(0, 2)) == 0) {
          darkImage = true;
          index = (video2.width - x + 1 + (y * video2.width)) * 4;
          r = video2.pixels[index + 0];
          g = video2.pixels[index + 1];
          b = video2.pixels[index + 2];
        } else {
          index = (video3.width - x + 1 + (y * video3.width)) * 4;
          r = video3.pixels[index + 0];
          g = video3.pixels[index + 1];
          b = video3.pixels[index + 2];
        }
      }

      if (Math.floor(random(0, 100)) < 50) {
        erase();
      } else {
        noErase();
      }

      var bright = (r + g + b) / 3;
      if (isNaN(bright)) bright = 0;
      var w = Math.floor(map(bright, 0, 255, 0, 8));
      var asset = darkImage ? dark_array[w] : assets_array[w];
      image(asset, x * vScale, y * vScale, vScale, vScale);
    }
  }

}

function keyPressed() {
  if (keyCode == ENTER && !downloadingImage) {
    document.body.style.cursor = "progress";
    download();
    document.body.style.cursor = "context-menu";
  } else if (keyCode == LEFT_ARROW) {
    window.location.href = `index.html`;
  }
}

var download = function () {
  downloadingImage = true;
  var link = document.createElement('a');
  link.download = 'imagenArcana.jpg';
  link.href = document.getElementById('defaultCanvas0').toDataURL()
  link.click();
  downloadingImage = false;
}

var downloadLink = document.getElementById('imgDownload');
downloadLink.addEventListener("click", () => {
  var link = document.createElement('a');
  link.download = 'imagenArcana.jpg';
  link.href = document.getElementById('defaultCanvas0').toDataURL()
  link.click();
});