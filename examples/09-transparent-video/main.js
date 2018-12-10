// Connect to server (where to send and receive data from)
var serverAddress = "https://socket-io-server.glitch.me";
var socket = io(serverAddress);

// frame de 0 à 84

let front = document.querySelector("#front");
let back  = document.querySelector("#front");

var loopPoint = 3.4;
var staticPoint = 6.4;

var ct = front.currentTime;
var pt = 0;

var state = "loop";

document.addEventListener("click", function() {
	console.log("click");
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
