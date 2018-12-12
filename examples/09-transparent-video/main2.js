// Connect to server (where to send and receive data from)
var serverAddress = "https://socket-io-server.glitch.me";
var socket = io(serverAddress);

socket.on("connect", function() {
	console.log("connected")
})

socket.on("distance", function(data) {
	console.log(data);
});

const setup = function() {
	this.segment = 0;
	this.pt = 0;
	this.segmentLoop = false;

	this.draw();
}

const playSegment = function(segment, loop = false) {
	console.log(this.id + " PLAY SEGMENT " + segment + " loop " + loop);

	if (this.paused) {
		this.play();
	}
	this.segment = segment;
	this.segmentLoop = loop;

	let currentSeg = this.segments[this.segment];
	this.currentTime = currentSeg[0];
	this.pt = this.currentTime;

	if (currentSeg[0] == currentSeg[1]){
		this.pause();
	}
}

const playNextSegment = function(loop = false) {
	let segment = (this.segment + 1) % this.segments.length;
	this.playSegment(segment, loop);
}

const draw = function() {
	let ct = this.currentTime;
	let segStart = this.segments[this.segment][0];
	let segEnd = this.segments[this.segment][1];

	if (ct >= segEnd && this.pt <= segEnd) {
		// console.log("LOOP POINT " + this.id)

		if (this.segmentLoop) {
			this.currentTime = segStart;
			// console.log(segStart)
		}

		if (this.onSegmentEnded) {
			this.onSegmentEnded();
		}
	}

	this.pt = this.currentTime;
	requestAnimationFrame(this.draw);
}


let front = document.querySelector("#front");
let back  = document.querySelector("#back");

const videos = [front, back];
const functions = [draw, setup, playSegment, playNextSegment];
videos.forEach(v => {
	functions.forEach(f => {
		v[f.name] = f.bind(v);
	})
});

var State = {
  Loop: 1,
  FadeInCal: 2,
  CalMonth: 3,
  CalWeek: 4, 
  CalDay: 5,
  FadeOut: 6
};

front.segments = [
					[0, 3.4],    // Beginning loop
				  	[3.4, 6.4],  // fade in
				  	[6.4, 6.4],  // fade out
				  	[6.4, front.duration] // end
				];

front.setup();
front.playSegment(0, true);

back.segments = [
					[2.35, 2.35],    // calendar far
				  	[2.35, 6.9],  // transition
				  	[6.9, back.duration] // end ???
				];

back.setup();
back.pause();

var state = State.Loop;

// distance sensor
// Simulate distance sensor with keys
document.addEventListener('keyup', e => {
  const keyName = e.key;
  const keys = ['1', '2', '3'];

  if (keys.includes(keyName)) {
	let event = new CustomEvent('distance', { detail: keyName });
	document.dispatchEvent(event);
  }

});

document.addEventListener('distance', e => {
	// 1 far, 2 medium, 3 close, 4 very far
	console.log("Distance event " + e.detail);
	const distCategory = e.detail;


	switch (state) {
		case State.Loop:
			console.log("distance event in loop state");
			
			//transitioning = true;
			front.onSegmentEnded = () => {
				console.log("front segment ended after loop")

				// Start FadeInCal when loop finished
				state = State.FadeInCal;
				front.playSegment(1, false);
				//back.playSegment(0, true);
				//transitioning = false;

				front.onSegmentEnded = () => {
					// CalMonth
					front.onSegmentEnded = null;
					front.playSegment(2, true);
					console.log("front segment ended after fadein")
					state = State.CalMonth;
				}

			}
		break;
		case State.FadeInCal:
			// Does nothing with distance events

		break;
		case State.CalMonth:
			if (distCategory == 3) {
				state = State.CalWeek;
				back.playSegment(3, false); // transition
				back.onSegmentEnded = () => {
					back.playSegment(4);
					back.onSegmentEnded = null;
				}
			}
		break;
		case State.CalWeek:
		
		break;
		case State.CalDay:
		
		break;
		case State.FadeOut:
			
		break;
		default:
			console.log("default")
		break;

	}
});
