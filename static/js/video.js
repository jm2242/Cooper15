
// Put event listeners into place
var canvas, context, video, videoObj, image, sound;

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
  
  context.drawImage(video, 0, 0, 320, 240);
  image = canvas.toDataURL('image/jpeg', 1.0);
  console.log("Got a pic!!");

});

document.getElementById("send").addEventListener("click", function() {
  console.log(image);
  sendImageToAPI(image);
});


// 'image' should be a encoded image
function sendImageToAPI(image) {
  // send the image to the API, and do whatcha gotta do after that
  console.log("Sending " + image.length + " bytes to the api");
  post(image);


}

function playSound() {
  sound = new Audio('transcript.wav');
  sound.play();
}

function transcriptFail() {
  console.log("failed to transcribe");
}

function post(image) {
  $.ajax({
    type: 'POST',
    url: '../translate',
    contentType: 'application/json; charset=utf-8',
    data: image,
    success: playSound,
    error: transcriptFail,
    dataType: 'json'
  });
}




// function convertCanvasToImage(canvas) {
//   var image = new Image();
//   image.src = canvas.toDataURL("./");
//   return image;
// }