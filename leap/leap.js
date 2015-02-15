var word = document.getElementById("word");
var current;
var isFist;

var controller = Leap.loop({ enableGestures : true }, function(frame) {
    var hand = frame.hands[0];
    if (frame.valid && frame.gestures.length > 0) {
        frame.gestures.forEach(function(gesture) {
            if (gesture.type !== current) {
                current = gesture.type;
                processGesture(gesture);
            }
        })
    } else if (frame.hands.length > 0 && checkFist(hand) != isFist){
      isFist = checkFist(hand);
      if (checkFist(hand)){
        console.log("fist");
      }
    }
});

function getExtendedFingers(hand){
  var f = 0;
  for (var i = 0; i < hand.fingers.length; i++){
    if(hand.fingers[i].extended){
      f++
    }
  }
  return f;
}

function checkFist(hand){
  return (getExtendedFingers(hand) == 0)
}

function generateRandomColor() {
    var letters = "789EDF";
    var color = "#";
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 6)];
    return color;
}

function processGesture(gesture) {
    word.innerHTML = gesture.type;
    switch (gesture.type) {
        case "circle":
            document.body.style.backgroundColor = "#999";
            console.log("circle");
            console.log(gesture.id);
            break;
        case "keyTap":
            console.log("key tap");
            break;
        case "screenTap":
            console.log("screen tap");
            break;
        case "swipe":
            document.body.style.backgroundColor = generateRandomColor();
            checkSwipe(gesture);
            break;
    }
}

function checkSwipe(gesture){
  var horizontal = gesture.direction[0];
  var vertical = gesture.direction[1];
  var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
  if (isHorizontal) {
    if (horizontal > 0){
      console.log("right");
    } else {
      console.log("left");
    }
  }
}
