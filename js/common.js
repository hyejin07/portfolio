$(function(){

	var scroll_h;
	$('#nav li a').on('click', function(){
		scroll_h = $($(this).attr('href')).offset().top;
		$('html, body').animate({scrollTop : scroll_h});
		return false;
	})

	/*
	* pf menu click event 
	*/

	var text = '100% hard coding!';
	var typeText = '';
	var speed = 300;
	var i = 0 ;
	console.log(text);
	console.log(text.length);

	typeWriter();
	function typeWriter() {
		if(i < text.length){
			typeText = typeText + text.charAt(i);
			$('.pr_text strong').text(typeText);
			i++;			
		}
		if(i == text.length) {
			typeText = '';
			i = 0;
		}

		setTimeout(typeWriter, speed);
		
	}

	$('.nav_pf li').on('click', function(){
		if(!$(this).hasClass('on')){
			var menu = $(this).attr('data-item');
			var pf = $('#portfolio [class^="pf_"]');
			var pfLen = pf.length;

			$('.nav_pf li').removeClass('on');
			$(this).addClass('on');
			
			for(var  i = 0; i< pfLen; i++){
				var pfVal = pf.eq(i).attr('class').split(' ')[1];
				// console.log(pfVal);
				if(pfVal ==  menu) {
					pf.eq(i).show();
				}else {
					pf.eq(i).hide();
				}
			}
			if(menu == 'all'){
				pf.show();
			}
		}
	})

	/*
	* menubar scroll
	*/
	$(document).on('scroll', function(){
		if($(this).scrollTop() >= $('#skill').offset().top-1){
			$('#nav').addClass('on');
		}else {
			$('#nav').removeClass('on');
		}

		for(var i = 0 ; i < $('.chart').length; i++){
			if($(this).scrollTop() > $('.skill_'+(i+1)).offset().top - 150){
				var skill1 = $('.skill_'+(i+1)+' .percent-number').text();
				var newPer = 180*(skill1-50)/50;
				$('.skill_'+(i+1)+' .circle-mask-outer.right .circle-mask-inner').css('transform','rotate(180deg)');
				$('.skill_'+(i+1)+' .circle-mask-outer.left .circle-mask-inner').delay(1000).css('transform','rotate('+newPer+'deg)');
			}
		}
		
	})


})