import ndarray from "ndarray";

export default function getPixels(url, cb) {
  var img = new Image();
  img.crossOrigin = "Anonymous";
  img.onload = function () {
    let { width, height } = img;
    var canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    var pixels = context.getImageData(0, 0, width, height);

    // for ndarray
    // first the height, second the width, height the rvba
    cb(null, ndarray(pixels.data, [height, width, 4]), [width, height]);
  };
  img.onerror = function (err) {
    cb(err);
  };
  img.src = url;
}
