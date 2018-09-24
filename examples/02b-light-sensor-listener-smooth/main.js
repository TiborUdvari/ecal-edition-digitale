// Connect to server (where to send and receive data from)
var serverAddress = "https://socket-io-server.glitch.me";
var socket = io(serverAddress);

// 800 pas beaucoup de lumiere
// 70 beaucoup de lumiere
// calibrage automatique

var body = document.querySelector("body");
var alpha = 0;

var min = 70;
var max = 800;

var t = Date.now();
var pt = Date.now();

// Intuition: since values come in at about the same time
// we can just ease to the next value
socket.on("light", function(data) {
	t = Date.now(); 
	var deltaT = t - pt;
	pt = t;

	// Mettre à jour le valuers min et max
	if (data < min) {
		min = data;
	}

	if (data > max) {
		max = data;
	}

	// Map value from between min and max to between 0 and 1
	var len = max - min;
	var minOffset = data - min;
	var pct = minOffset / len;
	
	TweenLite.to(body, deltaT/1000 , {backgroundColor: "rgba(0, 0, 0, " + pct + ")"});
});

