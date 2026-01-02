jQuery(document).ready(function($){
	$('.site_color').click(function(){
		var colorcode = $(this).attr('theme-color');
		$('.site_color').removeClass('coloractive');
		$(this).addClass('coloractive');
		var colorbcode = $('.site_color.coloractive').attr('id');
		$('body').attr('id', colorbcode);
	});

	$('.color-picker li').each(function(){
		var colorcodeback = $(this).find('.site_color').attr('theme-color');
		$(this).find('.site_color').css('background-color', colorcodeback);
	});

	$('body').addClass("light-mode");
	$('.theme_mode a').click(function(){
		var colormode = $(this).attr('id');
		$('body').removeClass('dark-mode light-mode');
		$('body').addClass(colormode+"-mode");
		$('.realock-logo').attr('src','assets/images/logo/realock-logo-'+colormode+'.png');
	});

	$(".setting_icon").click(function(){
		$(".under_left").toggleClass("out_left");
	});

	$('.theme_mode a').click(function(){
		$('.theme_mode a').removeClass("active");
		$(this).addClass("active");
	});
	
});