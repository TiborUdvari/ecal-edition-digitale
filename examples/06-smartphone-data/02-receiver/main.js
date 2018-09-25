
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

elBody.style.position = "absolute";

/*****************************
*      Event listeners
*****************************/

// Server callback
socket.on("echo-callback", function(payload) {
	console.log("Received " + JSON.stringify(payload) + " from server");
	if (payload.id == "tibor") {
		console.log("Got this from server " + payload.data);
		
		// number of headers
		var elFirstChild = elBody.firstElementChild;
		var elNewH1 = document.createElement("h1");
		elNewH1.textContent = payload.data;
		elBody.insertBefore(elNewH1, elFirstChild);

		elBody.style.top = "-" + elFirstChild.clientHeight + "px";
		TweenLite.to(elBody, 0.2, {
		  	top:"0px"
		});

	}
});
