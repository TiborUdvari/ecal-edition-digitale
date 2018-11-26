
// Custom events for time
// Do not use vars names var t, pt or loop

/*****************************
*   Socket connection
*****************************/

// Connect to server (where to send and receive data from)
var serverAddress = "https://socket-io-server.glitch.me";
var socket = io(serverAddress);

/*****************************
* Get DOM element references
*****************************/

var elBody = document.querySelector("body");

var elData = document.querySelector("#data");

/*****************************
*      Event listeners
*****************************/

// Server callback
socket.on("echo-callback", function(payload) {
	console.log("Received " + JSON.stringify(payload) + " from server");
	if (payload.id == "jonathan") {
		console.log("Got this from server " + payload.data);
		elData.innerHTML = payload.data;
	}
});
