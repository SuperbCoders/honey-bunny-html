window.jQuery(function ($) {
	'use strict';
	$('.ingredients-popup').webuiPopover({
		placement: 'top',
		trigger: 'hover'
	});

	// Переключение краткого / подробного описания товара
	$('.bi-button .short').click(function () {
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
		$('section.ingredients .short-descr').show();
		$('section.ingredients .full-descr').hide();
	});
	$('.bi-button .full').click(function () {
		$(this).siblings().removeClass('current');
		$(this).addClass('current');
		$('section.ingredients .short-descr').hide();
		$('section.ingredients .full-descr').show();
	});
});