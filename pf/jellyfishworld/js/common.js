$(function(){	
	var isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
		isMobile = true;}
		if(!isMobile) {
			$('#company .modal, #news-wrap').addClass('on');
		}
	$('#news-wrap .close').on('click', function(){
		$(".modal").hide();
	})
	

	$('#navBtn').on('click', function(){		
		$(this).toggleClass('active');
		$('#nav').toggleClass('on');
		setTimeout(function(){
			$('#gnb').toggleClass('on');
		},50)
		return false;
	})
	portfolio();
	history();
})

function portfolio() {
	var $pfNav = $('#pfNav ul li a');	
	var BgColor = ['e96865','f7bb30', '4dbbc1', '02b87a', 'f78c34', 'b273d8'];
	var NavBgColor = ['bb5351','c69626','3e969b', '029362', 'c6702a', '8f5cad'];
	var $contentsBox = $('#contentsBox > div');
	var $vedioList = $('.video-list .thumbnail li a');
	var $videoPlayer = $('.player iframe');	
	var $next = $('.video-list .btn-wrap .next');
	var $prev = $('.video-list .btn-wrap .prev');
	var w=0;
	
	$videoPlayer.on('load', function(){
		$(this).show();
	});
	

	$pfNav.on('click', function(){
		var cnt = $(this).parent('li').index();
		var current = $(this).attr('href');

		//current 바뀔 때마다 위치값 잡아주기 위해서
		w = 0; 
		$('#'+current).find('.thumbnail').css({transform:'translateX('+ w +'px)'});
		$('#'+current).find('.thumbnail li').removeClass('on');
		$('#'+current).find('.thumbnail li:first').addClass('on');
		
		$videoPlayer.hide(); 
		$videoPlayer.attr('src',$('#'+current).find('li.on a').attr('href'));
		// $videoPlayer.on('load', function(){
		// 	$(this).show();
		// });

		if($(window).width() < 720) {
			// var cnt = $pfNav.parent('li').index();
			$pfNav.css('backgroundColor','transparent');
			$(this).css('backgroundColor','#'+NavBgColor[cnt]);
		}

		$('body').css({"backgroundColor":"#"+BgColor[cnt]});
		
		$pfNav.parent('li').removeClass('on');
		$(this).parent('li').addClass('on');

		$contentsBox.stop().fadeOut();
		$('#'+current).stop().fadeIn();

		
		$('#contentsBox').find('div').removeClass('on');
		$('#'+current).addClass('on');

		if($(this).attr('href') == 'digitalTextbook') {
			$('#digitalTextbook').find('.player').addClass('bookslider');
			$('#digitalTextbook').find('.img-view').show();
		}
		
		return false;
	})

	$vedioList.on('click', function(){						
		var current = $pfNav.parent('li.on').find('a').attr('href');
		var videoSrc = $(this).attr('href');

		$videoPlayer.hide();
		$videoPlayer.attr("src",videoSrc);
		$videoPlayer.on('load', function(){
			$(this).show();
		})
		
		$('#'+current+' .thumbnail li').removeClass('on');
		$(this).parent('li').addClass('on')	;

		return false;
	})

	$next.on('click', function(){
		var current = '#'+$pfNav.parent('li.on').find('a').attr('href');		
		var $thumbnail = $(current).find('.thumbnail');	  
		var $liLength = $thumbnail.find('li').length -1;
		var str = $thumbnail.css('transform');

		// matrix 값 배열에 넣기
		var values = str.split('(')[1];
			values = values.split(')')[0];
			values = values.split(',');

		var $thumbnailX = values[4];
		var slideW = $thumbnail.parent('.video-list').width();

			
		if($thumbnailX  > (-132 * $liLength) + slideW )  { // x좌표가 -
			w -= 132;	
			$thumbnail.css({transform:'translateX('+ w +'px)'});
			return false;
		}else if($thumbnailX  < (-132 * $liLength) + slideW) {
			return false;
		}

		return false;
	})

	$prev.on('click', function(){
		var current = '#'+$pfNav.parent('li.on').find('a').attr('href');		
		var $thumbnail = $(current).find('.thumbnail');	  
		var $liLength = $thumbnail.find('li').length -1;
		var str = $thumbnail.css('transform');

		// matrix 값 배열에 넣기
		var values = str.split('(')[1];
			values = values.split(')')[0];
			values = values.split(',');

		var $thumbnailX = values[4];
		var slideW = $thumbnail.parent('.video-list').width();

				
		if($thumbnailX > -132 ) {
			return false;			
		}else if($thumbnailX < (132 * $liLength) - slideW ) {
			w += 132
			$thumbnail.css({transform:'translateX('+ w +'px)'});

			return false;
		}
		return false;
	})

	//동영상이 없을시 bookSlider {}
	bookSlider();
	
	function bookSlider() {
		var $prev = $('.gallery-btn > li.prev');
		var $next = $('.gallery-btn > li.next');
		var $gallery, $first, $last, index, $img, imgUrl, oldFolder, $title, $sub_title;

		$next.on('click', function() {
			var current = $('#pfNav li.on a').attr('href');
			var $gallery = $('#'+current).find('.gallery');
			
			if($('#'+current+' .player').hasClass('bookslider')){
				$first = $gallery.find('li').first();
				$gallery.find('ul').append($first);
			}

			return false;
		})

		$prev.on('click', function(){
			var current = $('#pfNav li.on a').attr('href');
			var $gallery = $('#'+current).find('.gallery');
			if($('#'+current+' .player').hasClass('bookslider')){
				$last = $gallery.find('li').last();
				$gallery.find('ul').prepend($last);
			}

			return false;
		})

		$vedioList.on('click',function(){
			var current = $('#pfNav li.on a').attr('href');
			var $gallery = $('#'+current).find('.gallery');
			$title = $(this).find('strong').text();
			$sub_title = $(this).find('span').text();

			$('#'+current+' .book-info strong').text($title);
			$('#'+current+' .book-info span').text($sub_title);

			if($(this).hasClass('book')){
				$('#digitalTextbook .player').addClass('bookslider');
				$('#digitalTextbook .player iframe').hide();
				$('#digitalTextbook .player .img-view').show();
			}else {
				$('#digitalTextbook .player').removeClass('bookslider');
				$('#digitalTextbook .player .img-view').hide();
				$('#digitalTextbook .player iframe').show();
			}

			if($('#'+current+' .player').hasClass('bookslider')){
				$img = $gallery.find('img');
				currentFolder = parseInt($(this).parents('li').index()) + 1;

				imgUrl = $img.attr('src');
				oldFolder = imgUrl.substr(imgUrl.length-12,2);
				if(currentFolder < 10 ) {
					currentFolder = '0' + currentFolder; 
				}

				$gallery.attr('id',$(this).attr('href'));
				$img.attr('alt', $gallery.attr('id'));

				for(var i = 0; i < $img.length; i++){
					imgUrl = $img.eq(i).attr('src');
					imgUrl = imgUrl.replace(oldFolder, currentFolder);

					$img.eq(i).attr('src',imgUrl);
				}
			}
		})
	}
}

// history page
function history() {
	var $dl = $('#history dl');
	var $dt = $('#history dl dt');
	var $dd = $('#history dl dd');
	var cnt = $dt.index();	
	var wheel;

	$dt.on('click', function(){
		cnt = $(this).index()/2;
		$dt.not(this).next().slideUp();		
		$dt.removeClass('on');
		$(this).addClass('on');
		$(this).next().slideDown();
	})

	$('body').on('mousewheel DOMMouseScroll', function(e){
		wheel = e.originalEvent.wheelDelta;
		if(wheel < 0) {			
			cnt ++;
			if(cnt > $('dl dt').length-1) {cnt = 0};
			$dd.slideUp();
			$dt.removeClass('on');
			$dt.not().eq(cnt).next().slideUp();
			$dt.eq(cnt).addClass('on').next().slideDown(240,function(){$ (this).stop( true, true )});
		} else { 			
			cnt --;
			if(cnt < 0) {cnt = $('dl dt').length-1};
			$dd.slideUp();
			$dt.removeClass('on');
			$dt.not().eq(cnt).next().slideUp();
			$dt.eq(cnt).addClass('on').next().slideDown(240,function(){$(this).stop( true, true )});
		}
	})
};

