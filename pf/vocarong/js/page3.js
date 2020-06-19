$(function(){
	/***************************
		init page 3
	****************************/
	var cntLesson = parent.cntLesson;
	var cntPage = parent.cntPage;
	var currentXml = parent.xmlDoc;
	console.log("lesson:", cntLesson, " / page:", cntPage);
	console.log("xmlData == > ", currentXml);
	console.log("sceneData == > ", currentXml.getElementsByTagName("scene"+cntPage)[cntLesson-1]);

	//xml 데이터
	/*
		currentVoca = myvoca 받아오는 배열
		localStorage.getItem("myvoca"); 		= myvoca란 저장소에 쿠키값 가져오기
		localStorage.setItem("myvoca", 배열); 	= myvoca란 저장소에 배열값 저장

		조건 - 
		1. 하단에 my voca박스는 myvoca란 저장소에서 쿠키값 가져오기, 없을경우 빈칸.
		2. 하단에 my voca 단어 클릭시 input box로 문제 출제.
		3. input box에 알맞게 정답을 기입하면 O, 틀리면 X 아이콘 등장.
	*/

	//변수
	var currentVoca = [];	// myvoca 받아오는 배열
	var currentSucces = "";
	var sentenceArr = currentXml.getElementsByTagName("scene"+cntPage)[cntLesson-1].getElementsByTagName("voca");	//xml 데이터
	var narrArr = [];
	var narrArr2 = [];
	var narrSelect;

	var tabNum = 1;
	var scrollWrap = $('<div class="scrollWrap'+tabNum+'"></div>');

	var isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
		isMobile = true;
	}
	var dragstart = isMobile ? "touchstart" : "mousedown";
	var dragend = isMobile ? "touchend" : "mouseup";
	var dragmove = isMobile ? "touchmove" : "mousemove";

	//
	if(localStorage.getItem("myvoca") != null){
		myVocaView();
	}else{
		tabNum = 2;
		$('[class^="listContents_"]').removeClass('blind');
		$('[class^="listTab"]').removeClass('listTab1_over listTab2_over').css('cursor','pointer');
		$('.listTab2').addClass('listTab2_over').css('cursor','default');
		$('.listContents_1').addClass('blind');			
		$('.delete').css({
			'opacity':0,
			'pointer-events':'none;'
		});
		view();
	}

	//함수 선언
	function view(){ //library
		$('.listBox_2').children().remove();
		customScroll();
		//if(localStorage.getItem("myvoca") != null){
			//currentVoca = localStorage.getItem("myvoca");
			//currentVoca = currentVoca.split(',');
			for(var i = 0; i < sentenceArr.length; i++) {
				/*
				console.log("===========================");
				console.log("단어 == > ", sentenceArr[i].textContent);
				console.log("해석 == > ", sentenceArr[i].getAttribute("sentence"));
				console.log("문장 == > ", sentenceArr[i].getAttribute("example"));
				console.log("===========================");
				*/
				narrArr2.push(i);
				var listWord2 = $('<div class="list_word_2"></div>');
				var wordList = $('<div class="wordList"></div>');
				var meanList = $('<div class="meanList"></div>');
				var exList = $('<div class="exList"></div>');

				wordList.text(sentenceArr[i].textContent);
				meanList.text(sentenceArr[i].getAttribute("sentence"));
				exList.text(sentenceArr[i].getAttribute("example"));
				listWord2.append(wordList).append(meanList).append(exList);
				$('.scrollWrap2').append(listWord2);
			}
		//}
		attachScroll();
	}
	
	function myVocaView(){ // my voca
		narrArr = [];
		$('.listBox_1').children().remove();
		if(localStorage.getItem("myvoca") != null){
			currentVoca = localStorage.getItem("myvoca");
			currentVoca = currentVoca.split(',');
			customScroll();
			for(var i = 0;i<currentVoca.length;i++){
				var len = sentenceArr.length;
				for(var j = 0;j<len;j++){
					if(sentenceArr[j].textContent==currentVoca[i]){
						narrArr.push(j);
						/*
						console.log("===========================");
						console.log("단어 == ", currentVoca[i]);
						console.log("해석 == > ", sentenceArr[j].getAttribute("sentence"));
						console.log("예문 == > ", sentenceArr[j].getAttribute("example"));
						console.log("===========================");
						*/
						var listWord1 = $('<div class="list_word_1"></div>');
						var checkBox = $('<div class="checkBox"></div>');
						var wordList = $('<div class="wordList"></div>');
						var meanList = $('<div class="meanList"></div>');
						var exList = $('<div class="exList"></div>');

						wordList.text(currentVoca[i]);
						meanList.text(sentenceArr[j].getAttribute("sentence"));
						exList.text(sentenceArr[j].getAttribute("example"));
						listWord1.append(checkBox).append(wordList).append(meanList).append(exList);
						$('.scrollWrap1').append(listWord1);
						break;
					}
				}
			}
		}
		attachScroll();	
	}

	

	function customScroll(){
		$('.scroll').remove();
		scrollWrap= $('<div class="scrollWrap'+tabNum+'"></div>');
		$('.listBox_'+tabNum).append(scrollWrap);
		//if(currentVoca.length > 5 || $('.list_word_2').length > 5){
		var scrollbar = $('<div class="scroll"></div>');
		var scrollThumb = $('<div class="scrollThumb"></div>');
		scrollbar.css({
			'position':'absolute',
			'right':'10px',
			'top':'82px',
			'width':'40px',
			'height' :'525px',
			'background': 'url(images/scroll_base.png) center 0 / 11px 525px no-repeat',
		})
		scrollThumb.css({
			'position':'relative',
			'width' : '40px',
			'height' : '132px',
			'background': 'url(images/scroll_bar.png) center 0 / 40px no-repeat',
		})
		scrollbar.append(scrollThumb);
		$('.listBox_'+tabNum).append(scrollbar);
		//}
	}
	var totScroll = $('.scroll').height()-$('.scrollThumb').height();//parseInt($('.scroll').css('height'))-defScroll;
	function attachScroll(){
		if($('.list_word_'+tabNum).length <= 5)$('.scroll').remove();
		var scrollThumb = $('.listContents_'+tabNum+' .scrollThumb');
		scrollThumb.css('top',0);
		$('.listBox_'+tabNum).scrollTop(0);
		$('.listBox_'+tabNum).on('scroll',function(e){
			if(!movebool){
				var defPage = parseInt($(this).css('height'));
				var curPage = parseInt($(this).scrollTop());
				var totPage = parseInt($('.listBox_'+tabNum).prop('scrollHeight'))-defPage;

				var defScroll = parseInt($('.scrollThumb').css('height'));
				totScroll = parseInt($('.scroll').css('height'))-defScroll;

				var t = totScroll*curPage/totPage;

				scrollThumb.css('top', t);
			}
		})
		var curScroll = parseInt($('.scroll').css('top'))-parseInt($('.scroll').css('top'));
		try{
			$('[class^="listTab"]').off('click', toggleTab);
			$('.list_word_1').off("click", checkWord);
			$('.list_word_2').off("click", checkWord);
			$('.delete').off("click", deleteWord);
			$('.search').off("keydown", searchWord);
			$('[class^="listTab"]').on('click', toggleTab);
			$('.list_word_1').on("click", checkWord);
			$('.list_word_2').on("click", checkWord);
			$('.delete').on("click", deleteWord);
			$('.search').on("keydown", searchWord);
		}catch(e){}
		try{
			scrollThumb.off(dragstart, scollEvent);
			$(document).off(dragmove, scollEvent);
			$(document).off(dragend, scollEvent);
			scrollThumb.on(dragstart, scollEvent);
			$(document).on(dragmove, scollEvent);
			$(document).on(dragend, scollEvent);
		}catch(e){}
	}

	var movebool = false;
	var _this;
	//$('.list_word_1').on('dragstart', function(e){return false;})
	function scollEvent(e){
		switch(e.type){
			case dragstart:
				console.log('start');
				_this = $(this);
				movebool = true;
				var y = e.touches ? e.touches[0].clientY : e.clientY;
				//_this.css({'left':x, 'top':y});
				break;
			case dragmove:
				if(movebool) {
					console.log("move");
					var y = e.touches ? e.changedTouches[0].clientY : e.clientY;
					//해당 오브젝트 드레그 이동
					var dragY = y-totScroll-($('.listContents_'+tabNum+' .scrollThumb').height()/2);
					var moveY = y-totScroll-($('.listContents_'+tabNum+' .scrollThumb').height()/2);
					if(dragY < 0)moveY = 0;
					if(dragY > totScroll)moveY = totScroll;
					_this.css({'top':moveY});
					var abc = parseInt($('.listBox_'+tabNum).prop('scrollHeight'))*parseInt(_this.css('top'))/totScroll;
					$('.listBox_'+tabNum).animate({scrollTop : abc}, 0);
				}
				break;
			case dragend:
				movebool = false;
				break;
		}
	}

	function toggleTab(){
		parent.effectPlay("click_eff");
		tabNum = $(this).attr('class').split(' ')[0].replace('listTab','');
		$('[class^="listContents_"]').removeClass('blind');
		$('[class^="listTab"]').removeClass('listTab1_over listTab2_over').css('cursor','pointer');
		$(this).addClass('listTab'+tabNum+' listTab'+tabNum+'_over').css('cursor','default');

		if(tabNum == 1){			
			$('.listContents_2').addClass('blind');
			$('.delete').css({
				'opacity':1,
				'pointer-events':'all'
			});
			myVocaView();
		}else {			
			$('.listContents_1').addClass('blind');			
			$('.delete').css({
				'opacity':0,
				'pointer-events':'none;'
			});
			view();
		}
		try{
			$('[class^="listTab"]').off('click', toggleTab);
			$('.list_word_1').off("click", checkWord);
			$('.list_word_2').off("click", checkWord);
			$('.delete').off("click", deleteWord);
			$('.search').off("keydown", searchWord);
		}catch(e){

		}
		$('[class^="listTab"]').on('click', toggleTab);
		$('.list_word_1').on("click", checkWord);
		$('.list_word_2').on("click", checkWord);
		$('.delete').on("click", deleteWord);
		$('.search').on("keydown", searchWord);

		//$('.list_word_1 .checkBox').removeClass('checkIcon');
	}

	function checkWord(e){
		parent.effectPlay("click_eff");
		if(e.currentTarget.className.substr(-1, 1)==1){
			if($(this).find('.checkBox').hasClass('checkIcon')){
				$(this).find('.checkBox').removeClass('checkIcon');
			}else{
				$(this).find('.checkBox').addClass('checkIcon');	
			}
			narrSelect = narrArr[$(this).index()];
		}else{
			narrSelect = narrArr2[$(this).index()];
		}
		setTimeout(function(e){parent.narr2Play(narrSelect);}, 300);
	}

	function deleteWord(){
		parent.effectPlay("click_eff");
		var delArr = [];
		var delbool = false;
		for(var i = 0; i < currentVoca.length; i++){
			delArr.push($('.list_word_1').eq(i).find('.checkBox').hasClass('checkIcon'));
			if($('.list_word_1').eq(i).find('.checkBox').hasClass('checkIcon'))delbool = true;
		}
		if(delbool){
			console.log("delbool");
			var _this = $('.popup_char3');
			if(_this.hasClass("blind")){
				_this.removeClass("blind");
				$('.opacity').removeClass("blind");
				TweenMax.to(_this, 0, {opacity:0, y:-200});
				TweenMax.to(_this, 0.2, {opacity:1, y:0});
			}else{
				$('.opacity').addClass("blind");
				TweenMax.to(_this, 0, {opacity:1, y:0});
				TweenMax.to(_this, 0.2, {opacity:0, y:-200, onComplete:function(e){
					_this.addClass("blind");
				}});
			}
		}
	}
	readyClosure = function(){
		//삭제
		var delArr = [];
		var delbool = false;
		for(var i = 0; i < currentVoca.length; i++){
			delArr.push($('.list_word_1').eq(i).find('.checkBox').hasClass('checkIcon'));
			if($('.list_word_1').eq(i).find('.checkBox').hasClass('checkIcon'))delbool = true;
		}
		for(var i = 0; i < currentVoca.length; i++){
			if(delArr[i]){
				currentVoca.splice(i, 1);
				delArr.splice(i, 1);
				i--;
			}
		}
		if(currentVoca[0] == undefined){
			//배열에 아무것도 없을경우 쿠키값 삭제
			localStorage.removeItem("myvoca");
		}else{
			//배열에 있을때만 쿠키값 등록
			localStorage.setItem("myvoca", currentVoca);
		}
		myVocaView();
    }

	var top = 0;

	function searchWord(e){
		if($(this).find('input').val() != ''){
			for(var i = 0; i < $('.list_word_'+tabNum).children('.wordList').length; i++){
				if($(this).find('input').val() == $('.list_word_'+tabNum+' .wordList').eq(i).text() && e.keyCode == 13){
					var wordY = $('.list_word_'+tabNum+' .wordList').eq(i).offset().top - $('.list_word_'+tabNum+' .wordList').eq(0).offset().top
					var t = wordY/$('.scrollWrap'+tabNum).height()*100+'%';
					if($('.listBox_'+tabNum).scrollTop() != wordY){
						$('.listBox_'+tabNum).animate({scrollTop: wordY});	
					}
					parent.effectPlay("click_eff");
					if(tabNum==1){
						narrSelect = narrArr[i];
					}else{
						narrSelect = narrArr2[i];
					}
					setTimeout(function(e){parent.narr2Play(narrSelect);}, 300);
				}
			}
		}
	}
})
var readyClosure;
function page3(){readyClosure();}