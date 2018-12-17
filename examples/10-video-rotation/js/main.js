// Rotate the video
// Rotate the video from a keypoint
// Set the video to a point according to the clock

/*****************************
*     Helper functions
*****************************/

// Zero padding function. For example zp(2) = 02 
const zp = n => { return n.toString().padStart(2, "0")}

/*****************************
*     DOM Elements 
*****************************/

let elClock = document.querySelector("#clock");
let elVideo = document.querySelector("video");

/*****************************
*    	 Variables
*****************************/

var speedIdx = 0;
const speeds = [1, 10, 100, 1000];

const getSpeed = () => {
	return speeds[speedIdx];
}

/*****************************
*     	Listeners
*****************************/

window.addEventListener('load', () => {
	elVideo.src = 'assets/big_buck_bunny.mp4';
	elVideo.play();
})

window.addEventListener('new_s', function (e) {
    elClock.innerText = `${ zp(e.detail.h) }:${zp(e.detail.m)}:${zp(e.detail.s)} ${getSpeed()}x`;
});

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  console.log(keyName);

  switch(keyName) {
  	case "ArrowUp":
  	speedIdx = (speedIdx + 1) % speeds.length;
  	break;

  	case "ArrowDown":
  	speedIdx = (speeds.length + speedIdx - 1) % speeds.length;
  	break;

  	case "Enter":
  	reset();
  	break;
  }
});

var pmillis = new Date().getTime();
var cmillis = new Date().getTime();

var ct = new Date().getTime();
var pt = new Date().getTime();

var d = new Date(ct);
var pd = new Date(ct);

function reset(){
	pmillis = new Date().getTime();
	cmillis = new Date().getTime();

	ct = new Date().getTime();
	pt = new Date().getTime();

	d = new Date(ct);
	pd = new Date(ct);
	speedIdx = 0;
}

function draw() {
	// $("video").style.transform = "rotate(240deg)"
	// $("video").style.transform = "translateX(100px) rotate(180deg)"

	cmillis = new Date().getTime();
	let deltaMillis = cmillis - pmillis;
	ct += deltaMillis * getSpeed();

	d = new Date(ct);

	if (d.getSeconds() !== pd.getSeconds()) {
	    var evt = new CustomEvent('new_s', { detail: {
	      "h": d.getHours(), 
	      "m": d.getMinutes(), 
	      "s": d.getSeconds() }
	    });
	    window.dispatchEvent(evt);
	}

	pt = ct;
	pd = d;
	pmillis = cmillis;

	let millisInMinute = d.getSeconds() * 1000 + d.getMilliseconds();
	let millisInHour = d.getMinutes() * 60 * 1000 + millisInMinute;
	let millisInDay = d.getHours() * 60 * 60 * 1000 + millisInHour;
	
	const millisPerMinute = 60 * 1000;
	const millisPerHour = 60 * millisPerMinute;
	const millisPerDay = 24 * millisPerHour;

	let mPct = millisInMinute / millisPerMinute;
	let hPct = millisInHour / millisPerHour;
	let dPct = millisInDay / millisPerDay;

	let vidTime = elVideo.duration * mPct;
	if (vidTime) {
		elVideo.currentTime = parseFloat(vidTime);
		let degrees = 360 * mPct;

		//elVideo.style.transform = `rotate(${degrees}deg)`;
	}

	requestAnimationFrame(draw);
}

draw();

