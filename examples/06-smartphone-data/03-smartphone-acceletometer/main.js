
/*****************************
*   Socket connection
*****************************/

// Connect to server (where to send and receive data from)
var serverAddress = "https://socket-io-server.glitch.me";
var socket = io(serverAddress);

/*****************************
* Get DOM element references
*****************************/

var elValue = document.querySelector("#value");

/*****************************
*      Event listeners
*****************************/

/*****************************
*      Gyroscope listeners
*****************************/

// See documentation here
// https://github.com/dorukeker/gyronorm.js/

var gn = new GyroNorm();

gn.init().then(function(){
  gn.start(function(data){
	var d = data.do.beta;
	var payload = {"id": "jonathan", "data": d};
	elValue.innerHTML = d;
	socket.emit("echo", payload); // Send data to server
  });
}).catch(function(e){
  // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
});
