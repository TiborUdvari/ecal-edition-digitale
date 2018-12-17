
var currentStep = 0;
var clickCount = 0;

function goNextStep() {
	$('.step-' + currentStep).removeClass('step--active');
	currentStep++;
	$('.step-' + currentStep).addClass('step--active');
}

$(document).ready(function(){

		// goNextStep()

		var background = $('.background');
		var intro = $('.intro');
		var step1 = $('.step1');
		var step2 = $('.step2')

		setTimeout(function () {
			// First step after 10 miliseconds
			background.addClass('background--show');
			intro.addClass('step--show');
		}, 10)

		setTimeout(function () {
			intro.removeClass('step--show');
			step1.addClass('step--show');
		}, 2500)

		var energizing = $('.energizing');
		var relaxing = $('.relaxing');
		
		energizing.click(function () {
			relaxing.addClass('circle--small');
			// var rp = relaxing.find('p');
			// rp.html("5 minutes");
			$(this).addClass('circle--small');
			// var p = $(this).find('p');
			// p.html('Loop');
			step1.removeClass('step--show');
			step2.addClass('step--show');

		})

		relaxing.click(function () {
			energizing.addClass('circle--small');
			// var rp = energizing.find('p');
			// rp.html("Loop");
			$(this).addClass('circle--small');
			var p = $(this).find('p');
			// p.html('5 minutes');
			step1.removeClass('step--show');
			step2.addClass('step--show');
		})
		

		// $('#circletest').click(function () {
		// 	clickCount += 1;
		// 	if (clickCount === 1) {
		// 		$('#circletest2').addClass('transition');
		// 		$('.text').html('Loop');
		// 		$('.text2').html('5 minutes');
		// 		$(this).addClass('transition');
		// 	}
		// 	else {
		// 		window.location = 'page2.html'
		// 	}
		// })
})

// $(document).ready(function(){
// 		$('#circletest2').click(function () {
// 			clickCount += 1;
// 			if (clickCount === 1) {
// 				$('#circletest').addClass('transition');
// 				$('.text').html('Energizing');
// 				$('.text2').html('Relaxing');
// 				$(this).addClass('transition');
// 			}
// 			else {
// 				window.location = 'page3.html'
// 				}
				
// 		})
// })

