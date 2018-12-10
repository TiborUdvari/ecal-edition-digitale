//  baudrate: 57600,

const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/cu.usbserial-MBXFW80A', {
  baudRate: 57600
})

const ByteLength = require('@serialport/parser-byte-length')

// const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
// parser.on('data', console.log)

port.on('error', function(err) {
  console.log('Error: ', err.message)
})

// Switches the port into "flowing mode"
// port.on('data', function (data) {
//   console.log('Data:', data)
// })

// port.on('readable', function () {
//   console.log('Data:', port.read())
// })

// The open event is always emitted
port.on('open', function() {
	console.log("port open")
})

const parser = port.pipe(new ByteLength({length: 8}));
//const lineStream = port.pipe(new Readline())