
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

var elButton = document.querySelector("#button");
var elInput = document.querySelector("#input");

/*****************************
*      Event listeners
*****************************/

// Click callback
elButton.addEventListener("click", function() { 
	var data = elInput.value;
	console.log("Sending " + data + " to server");
	var payload = {"id": "tibor", "data": data};
	socket.emit("echo", payload); // Send data to server
});

// Server callback
socket.on("echo-callback", function(data) {
	console.log("Received " + JSON.stringify(data) + " from server");
	if (data.id == "tibor") {
		console.log("Got this from server " + data.data);
	}

});
