// Put event listeners into place
var canvas, context, video, videoObj;

window.addEventListener("DOMContentLoaded", function() {
  // Grab elements, create settings, etc.
   canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    video = document.getElementById("video");
    videoObj = { "video": true };
    errBack = function(error) {
      console.log("Video capture error: ", error.code); 
    };

  // Put video listeners into place
  if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia(videoObj, function(stream) {
      video.src = stream;
      video.play();
    }, errBack);
  } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia(videoObj, function(stream){
      video.src = window.webkitURL.createObjectURL(stream);
      video.play();
    }, errBack);
  }
  else if(navigator.mozGetUserMedia) { // Firefox-prefixed
    navigator.mozGetUserMedia(videoObj, function(stream){
      video.src = window.URL.createObjectURL(stream);
      video.play();
    }, errBack);
  }
}, false);

// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
  
  context.drawImage(video, 0, 0, 640, 480);
  var image = canvas.toDataURL('image/jpeg', 1.0);
  console.log("Got a pic!!");
  console.log(image);
  sendImageToAPI(image);
});

// 'image' should be a encoded image
function sendImageToAPI(image) {
  // send the image to the API, and do whatcha gotta do after that
  console.log("Sending " + image.length + " bytes to the api");
}

// function convertCanvasToImage(canvas) {
//   var image = new Image();
//   image.src = canvas.toDataURL("./");
//   return image;
// }