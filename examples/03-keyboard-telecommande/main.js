/*****************************
* Get DOM element references
*****************************/

var elBody = document.querySelector("body");


var colors = ["white", "red", "green", "blue", "yellow"];
var colIdx = 0;

/*****************************
*     Keyboard events
*****************************/

// keyboard events: keydown, keypress, keyup

// keydown example
window.addEventListener("keydown", checkKeyPressed, false);
 
function checkKeyPressed(e) {
	console.log(e.keyCode);
	// left 37
	// right 39

    if (e.keyCode == "37") {
    	console.log("left");
    	colIdx = colIdx - 1;
    	if (colIdx < 0) {
    		colIdx = colors.length - 1;
    	} 
    	elBody.style.backgroundColor = colors[colIdx];
    } else if (e.keyCode == "39") {
    	console.log("right");
    	colIdx = (colIdx + 1) % colors.length; // wrap to 0 if gets larger than length
    	elBody.style.backgroundColor = colors[colIdx];
    }
}