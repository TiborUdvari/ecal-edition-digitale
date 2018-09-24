/*****************************
*         Polyfill
*****************************/

(function () {

  if ( typeof window.CustomEvent === "function" ) return false;

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
})();

/*****************************
*     Custom event gen
*****************************/

var pt = new Date();
var t = new Date();

function loop(){
  t = new Date();

  var h = t.getHours();
  var m = t.getMinutes();
  var s = t.getSeconds();

  if (s !== pt.getSeconds()) {
    var evt = new CustomEvent('new_s', { detail: {
      "h": h, 
      "m": m, 
      "s": s }
    });
    window.dispatchEvent(evt);
  } 

  if (m !== pt.getMinutes()) {
    var evt = new CustomEvent('new_m', { detail: {
      'h': h, 
      'm': m, 
      's': s }
    });
    window.dispatchEvent(evt);
  }

  if (h !== pt.getHours()) {
    var evt = new CustomEvent('new_h', { detail: {
      'h': h, 
      'm': m, 
      's': s }
    });
    window.dispatchEvent(evt);
  }

  pt = t;
  requestAnimationFrame(loop); // Callback the function 
}

loop();