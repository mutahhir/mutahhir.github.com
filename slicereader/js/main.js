'use strict';

function arcFromPerc(ctx, perc) {
	var startAngle = -Math.PI / 2,
		endAngle = (perc * 360.0) * Math.PI / 180;

	endAngle += startAngle;

	ctx.arc(8, 8,
		8,
		startAngle,
		endAngle,
		false
		);
}

function draw(perc) {
	var canvas = document.getElementById('progresspie');
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.beginPath();
	ctx.moveTo(8,8);
	ctx.lineTo(8,0);
	arcFromPerc(ctx, perc);
	//ctx.arc(8, 8, 8, -90 * Math.PI / 180, 180 * Math.PI / 180, false);
	ctx.lineTo(8,8);
	ctx.fillStyle = '#85a5cc';
	ctx.fill();
}

function recalcProgressPieLocation(perc) {
	var canvas = document.getElementById('progresspie');
	var carousel = document.getElementById('carousel');

	var carouselBounds = carousel.getBoundingClientRect();
	canvas.style.position = 'absolute';
	canvas.style.left = (carouselBounds.right - 89) + 'px';
	canvas.style.top = (carouselBounds.bottom - 109) + 'px';

	draw(perc);
}

/*globals $:true*/
$(function() {
	var perc = 0.25;
	$(document).on('keydown', function(e) {
		if (e.which === 37) {
			perc -= 0.1;
			if (perc < 0) {
				perc = 1;
			}
			draw(perc);
		} else if (e.which === 39) {
			perc += 0.1;
			if (perc > 1) {
				perc = 0;
			}
			draw(perc);
		}
	});

	$(window).on('resize', function() {
		recalcProgressPieLocation(perc);
	});

	recalcProgressPieLocation(perc);
});
