var word = document.getElementById("word");
var current;
var controller = Leap.loop({ enableGestures : true }, function(frame) {
    if (frame.valid && frame.gestures.length > 0) {
        frame.gestures.forEach(function(gesture) {
            if (gesture.id !== current) {
                current = gesture.id;
                processGesture(gesture);
            }
        })
    } else if (frame.valid && frame.hands.length > 0) {
        var fingerA, fingerB = 0;
        frame.hands[0].fingers.forEach(function(finger) {
            if (fingerA == 0)
                fingerA = finger;
            else
                fingerB = finger;
        })
    }
});

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
            word.innerHTML += "<br>Center is: " + gesture.center;
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
            console.log("swipe");
            break;
    }
}