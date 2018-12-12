//  baudrate: 57600,
var io = require('socket.io-client');

var serverAddress = "https://socket-io-server.glitch.me";
var socket = io.connect(serverAddress, {reconnect: true});

const SerialPort = require('serialport')
const port = new SerialPort('/dev/cu.usbserial-MBXFW80A', {
  baudRate: 57600
});

port.on('error', function(err) {
  console.log('Error: ', err.message)
})

port.on('data', function (data) {
  var d = data.toString();
  if (d.length == 6) {
  	d = d.substr(1);
  	let num = parseInt(d);
  	if (num) {
  		console.log(num);
  		socket.emit("distance", num);
  	}
  }
})

port.on('open', function() {
	console.log("port open")
})
