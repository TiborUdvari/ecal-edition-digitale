
// Custom events for time
// Do not use vars names var t, pt or loop

/*****************************
* Get DOM element references
*****************************/

var elH = document.querySelector("#hour");
var elM = document.querySelector("#minute");
var elS = document.querySelector("#second");

/*****************************
*   Clock Event Listeners
*****************************/

window.addEventListener('new_s', function (e) {
    //console.log("New second: " +  e.detail.h + " " + e.detail.m + " " + e.detail.s);
    elS.innerText = e.detail.s + elS.innerText;
    if (e.detail.second == 0) {
      elS.innerText = "Second";
    }
});

window.addEventListener('new_m', function (e) {
    //console.log("New minute: " +  e.detail.h + " " + e.detail.m + " " + e.detail.s);
    elM.innerText = e.detail.m + elM.innerText;
});

window.addEventListener('new_h', function (e) {
    //console.log("New hour: " +  e.detail.h + " " + e.detail.m + " " + e.detail.s);
    elH.innerText = e.detail.h + elH.innerText;

});