// Connect to server (where to send and receive data from)
var serverAddress = "https://socket-io-server.glitch.me";
var socket = io(serverAddress);

// frame de 0 à 84

let front = document.querySelector("#front");
let back  = document.querySelector("#back");

var loopPoint = 3.4;
var staticPoint = 6.4;

var ct = front.currentTime;
var pt = 0;

var state = "loop";

// States: loop, fadeOut, cal1, cal2, cal3, fadeIn
// Transitions
// Todo - replace this with distance sensor events

document.addEventListener("click", function() {
	if (state == "loop") {
		state = "fadeOut";
	} else if (state == "fadeOut") {
		front.play();
		state = "loop";
	}
});

function loop() {
	ct = front.currentTime; 

	if (state == "loop") {
		if (ct >= loopPoint && pt < loopPoint) {
			console.log("remettre a zero")
			front.currentTime = 0;
		}
	} else if (state == "fadeOut") {
		if (ct >= staticPoint && pt < staticPoint) {
			front.pause();
		}
	} 

	pt = ct;
	requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
