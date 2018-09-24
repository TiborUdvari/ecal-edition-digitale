// Sends light sensor data to our glitch.com server 
// Launch with `node hardware.js` in the terminal
// Based on `eg/photoresistor.js` example from johnny-five
// 

var five = require("./node_modules/johnny-five/lib/johnny-five.js"), board, photoresistor;
var io = require('socket.io-client');

board = new five.Board();

board.on("ready", function() {

  // Create a new `photoresistor` hardware instance.
  photoresistor = new five.Sensor({
    pin: "A2",
    freq: 250
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: photoresistor
  });

// Socket code to send to the server
  var serverAddress = "https://socket-io-server.glitch.me";
  var socket = io.connect(serverAddress, {reconnect: true});

  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    console.log(this.value);
    socket.emit("light", this.value);
  });
});
