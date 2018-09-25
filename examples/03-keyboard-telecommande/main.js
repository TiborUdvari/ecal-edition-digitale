window.addEventListener("keydown", checkKeyPressed, false);
 
function checkKeyPressed(e) {
	console.log(e.keyCode);
	// left 37
	// right 39

    if (e.keyCode == "37") {
    	console.log("left");
    } else if (e.keyCode == "39") {
    	console.log("right");
    }
}