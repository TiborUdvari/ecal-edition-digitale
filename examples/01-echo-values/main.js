// Connect to server (where to send and receive data from)
var serverAddress = "https://socket-io-server.glitch.me";
var socket = io(serverAddress);

// Get UI element references
var elResult = document.querySelector("#result"); // elResult - element result
var elButton = document.querySelector("#button");
var elInput = document.querySelector("#input");

elButton.addEventListener("click", function() { 
	var data = elInput.value;
	console.log("Sending " + data + " to server");
	socket.emit("echo", {"data": data}); // Send data to server
});

socket.on("echo-callback", function(data) {
	console.log("Received " + JSON.stringify(data) + " from server");
	elResult.textContent = data.data;
});
