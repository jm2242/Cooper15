var word = document.getElementById("word");
var element = false;;

var controller = Leap.loop({ enableGestures : true }, function(frame) {
    if (frame.valid && frame.hands.length > 0){
      switch (frame.hands.length){
        case 1:
          var hand = frame.hands[0];
          var previousFrame = controller.frame(1);
          var totalRotation = hand.rotationAngle(previousFrame);

          if (getExtendedFingers(hand) == 5){
            var swipe = false;
            frame.gestures.forEach(function(gesture){
              if (gesture.type == "swipe"){
                swipe = true;
              }
            })
            if (swipe && element){
              element = false;
              console.log("five-swipe")
              document.getElementById("snap").click();
              document.getElementById("snap-audio").play();
              console.log("PLAY");
            }
          } else if (getExtendedFingers(hand) == 4){
            var swipe = false;
            frame.gestures.forEach(function(gesture){
              if (gesture.type == "swipe"){
                swipe = true;
              }
            })
            if (swipe && element){
              element = false;
              console.log("four-swipe");
            }
          } else if (getExtendedFingers(hand) == 2){
            var swipe = false;
            frame.gestures.forEach(function(gesture){
              if (gesture.type == "swipe"){
                swipe = true;
              }
            })
            var extendedFingers = findExtendedFingers(hand);
            if (swipe && element){
              if (extendedFingers.indexOf(0) != -1 && extendedFingers.indexOf(4) != -1){
                  element = false;
                  console.log("thumb-pinky");
              } else if (extendedFingers.indexOf(0) != -1 && extendedFingers.indexOf(1) != -1){
                  element = false;
                  console.log("thumb-index")
              } else if (extendedFingers.indexOf(1) != -1 && extendedFingers.indexOf(2) != -1){
                  element = false;
                  console.log("index-middle")
              } else if (extendedFingers.indexOf(0) != -1 && extendedFingers.indexOf(1) != -1) {
                  element = false;
                  console.log("index-")
              }
            }
          } else if (getExtendedFingers(hand) == 1){
            var swipe = false;
            frame.gestures.forEach(function(gesture){
              if (gesture.type == "swipe"){
                swipe = true;
              }
            })
            var extendedFinger = findExtendedFinger(hand);
            if (element && swipe) {
                if (extendedFinger.type == 0){
                element = false;
                console.log("thumb");
              } else if (extendedFinger.type == 1){
                element = false;
                document.getElementById("send").click();
                console.log("index");
              } else if (extendedFinger.type == 2){
                element = false;
                console.log("middle")
              } else if (extendedFinger.type == 3){
                element = false;
                console.log("ring");
              } else if (extendedFinger.type == 4){
                element = false;
                console.log("pinky");
              }
            }
          } else if (getExtendedFingers(hand) == 0){
            // var circle = false;
            // frame.gestures.forEach(function(gesture){
            //   if (gesture.type == "circle"){
            //     circle = true;
            //   }
            // })
            if (!element){
              element = true;
              console.log("circle");
            }
          }
          break;
        case 2:
          var hand1 = frame.hands[0];
          var hand2 = frame.hands[1];
          break;
      }
    }
});

function getExtendedFingers(hand){
   var f = 0;
   for(var i=0;i<hand.fingers.length;i++){
      if(hand.fingers[i].extended){
         f++;
      }
   }
   return f;
}

function findExtendedFinger(hand){
  var extendedFinger;
  var f = 0;
  for (var i = 0; i < hand.fingers.length; i++){
    var finger = hand.fingers[i];
    if (finger.extended){
      f++;
      extendedFinger = finger;
    }
  }
  if (f == 1){
    return extendedFinger;
  }
}

function findExtendedFingers(hand){
  var extendedFingers = [];
  var f = 0;
  for (var i = 0; i < hand.fingers.length; i++){
    var finger = hand.fingers[i];
    if (finger.extended){
      f++;
      extendedFingers.push(finger.type);
    }
  }
    return extendedFingers;
}

function generateRandomColor() {
    var letters = "789EDF";
    var color = "#";
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 6)];
    return color;
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
