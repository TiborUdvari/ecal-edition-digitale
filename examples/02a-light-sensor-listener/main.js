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

socket.on("light", function(data) {

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
	
	body.style.backgroundColor = "rgba(0, 0, 0, " + pct + ")";
});

