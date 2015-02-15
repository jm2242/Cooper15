var word = document.getElementById("word");
var current;
var element;
const minValue = 0.5;

var controller = Leap.loop({ enableGestures : true }, function(frame) {
  // if (frame.valid && frame.gestures.length > 0) {
  //   frame.gestures.forEach(function(gesture) {
  //     if (gesture.id != current) {
  //       current = gesture.id;
  //       processGesture(gesture);
  //     }
  //   })
  // } else if (frame.hands.length > 0){
  //   frame.hands.forEach(function(hand){
  //     processHand(hand);
  //   })
  // }
  if (frame.hands.length > 0){
    frame.hands.forEach(function(hand){
      if (getExtendedFingers(hand) == 1){
        var extendedFinger = findExtendedFinger(hand);
        if (extendedFinger.type == 0 && element != "thumb"){
          element = "thumb";
          console.log("thumb");
        } else if (extendedFinger.type == 1 && element != "index"){
          element = "index";
          console.log("index");
        } else if (extendedFinger.type == 2 && element != "middle"){
          element = "middle";
          console.log("middle")
        } else if (extendedFinger.type == 3 && element != "ring"){
          element = "ring";
          console.log("ring");
        } else if (extendedFinger.type == 4 && element != "pinky"){
          element = "pinky";
          console.log("pinky");
        }
      } else if (getExtendedFingers(hand) == 2){
        
      }
    })
  }

});


function processHand(hand){
  if (checkFist(hand) != isFist) {
    isFist = checkFist(hand);
    if (checkFist(hand)){
      console.log("fist");
    }
  } else if(hand.pinchStrength > 0){
    var pinchingFinger = findPinchingFingerType(hand);
    console.log(pinchingFinger.type);
  }
}

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

function findTwoExtendedFingers(hand){
  var extendedFinger;
  var e = 0;
  var f = 0;
  for (var i = 0; i < hand.fingers.length; i++){
    var finger = hand.fingers[i];
    if (finger.extended){
      f++;
      extendedFinger = finger;
    }
  }
  if (f == 2){

    return extendedFinger;
  }
}

function checkFist(hand){
   var sum = 0;
   for(var i=0;i<hand.fingers.length;i++){
      var finger = hand.fingers[i];
      var meta = finger.bones[0].direction();
      var proxi = finger.bones[1].direction();
      var inter = finger.bones[2].direction();
      var dMetaProxi = Leap.vec3.dot(meta,proxi);
      var dProxiInter = Leap.vec3.dot(proxi,inter);
      sum += dMetaProxi;
      sum += dProxiInter
   }
   sum = sum/10;

   if(sum<=minValue && getExtendedFingers(hand)==0){
       return true;
   }else{
       return false;
   }
}


function findPinchingFingerType(hand){
    var pincher;
    var closest = 500;
    for(var f = 1; f < 5; f++)
    {
        current = hand.fingers[f];
        distance = Leap.vec3.distance(hand.thumb.tipPosition, current.tipPosition);
        if(current != hand.thumb && distance < closest)
        {
            closest = distance;
            pincher = current;
        }
    }
    return pincher;
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
