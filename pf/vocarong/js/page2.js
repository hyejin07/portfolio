$(function(){
	/***************************
		init page 2
	****************************/
	var cntLesson = parent.cntLesson;
	var cntPage = parent.cntPage;
	var currentXml = parent.xmlDoc;
	//console.log("lesson:", cntLesson, " / page:", cntPage);
	//console.log("xmlData == > ", currentXml);
	//console.log("sceneData == > ", currentXml.getElementsByTagName("scene"+cntPage)[cntLesson-1]);

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
	var pageCnt = 0;
	var narrSelect = 0;

	//함수 실행
	myVocaView();
	view();	//테스트용

	//함수 선언
	function view($path){
		var len = sentenceArr.length;
		for(var i = 0;i<len;i++){
			if(sentenceArr[i].textContent==$path){
				console.log(i);
				narrSelect = i;
				console.log("단어 == > ", sentenceArr[i].textContent);
				console.log("해석 == > ", sentenceArr[i].getAttribute("sentence"));
				currentSucces = sentenceArr[i].textContent;
				
				var $span = $('<span></span>');
				$span.text(sentenceArr[i].textContent).css({
					'display':'block',
					'width':'455px',
					'position':'absolute',
					'left':'-72px',
					'top':'-20px',
					'line-height':'1.5'
				});
				$('.learn_word').append($span);
				$('.learn_mean').text(sentenceArr[i].getAttribute("sentence")).css({
					'display':'block',
					'width':'455px',
					'left':'5px',
				});
			}
		}
	}
	function myVocaView(){
		$('.stepBtn_prev, .stepBtn_next').css('display','none')
		$('.word_txt').css({
			'cursor':'initial',
			'line-height':'1.5',
			'height':'auto',
			'top':'100px',
		});
		$('.answer').children().hide();

		if(localStorage.getItem("myvoca") != null){
			currentVoca = localStorage.getItem("myvoca");
			currentVoca = currentVoca.split(',');
			for(var i = 0;i<currentVoca.length;i++){
				// myvoca 붙이기 - appendchild
				var vocDiv = $('<div class="word_card"></div>');
				vocDiv.text(currentVoca[i]).css('cursor','pointer');
				$('.word').append(vocDiv);

			}
			console.log(currentVoca.length);
			$('.vocaBtn_next').removeClass('vocaBtn_next_over');
			$('.vocaBtn_prev').removeClass('vocaBtn_prev_over');
			if(currentVoca.length > 8) {
				pageCnt = 0;
				console.log('pageCnt++ ==== >', pageCnt);
				$('.vocaBtn_next').addClass('vocaBtn_next_over').css('cursor', 'pointer');
			}

			$('.word_card').css('display','none');	
			for(var i = 0; i < 8; i++){
				$('.word_card').eq((i % 8)+(pageCnt*8)).css('display','block');	
			}
			
			$('.vocaBtn_next').on('click',scrollnextPage);
			$('.vocaBtn_prev').on('click',scrollprevPage);
			$('.word_card').on("click", question);
		}
	}

	function scrollnextPage() {		
		if(pageCnt < parseInt(currentVoca.length / 8)) {
			pageCnt++;
			$('.vocaBtn_prev').addClass('vocaBtn_prev_over').css('cursor', 'pointer');
			$('.word_card').css('display','none');	
			for(var i = 0; i < 8; i++){
				$('.word_card').eq((i % 8)+(pageCnt*8)).css('display','block');	
			}
		}
		if(pageCnt == parseInt(currentVoca.length / 8)){
			$(this).removeClass('vocaBtn_next_over').css('cursor', 'default');
		}
	}
	function scrollprevPage() {	
		if(pageCnt > 0) {
			pageCnt--;
			$('.vocaBtn_next').addClass('vocaBtn_next_over').css('cursor', 'pointer');
			$('.word_card').css('display','none');	
			for(var i = 0; i < 8; i++){
				$('.word_card').eq((i % 8)+(pageCnt*8)).css('display','block');	
			}
		}
		if(pageCnt == 0){
			$(this).removeClass('vocaBtn_prev_over').css('cursor', 'default');
		}
	} 
	function question(e){
		parent.effectPlay("click_eff");
		$('.answer').children().hide();
		$('.word_txt').val('');

		var path = $(this).index();
		var $word_card_over = $('<div class="word_card_over"></div>');
		$('.word_txt').attr('placeholder','Enter text...');

		$('.qu').hide();
		$('.word_card_over').remove();
		$('.learn_word').children().remove();
		$(this).append($word_card_over);
		console.log("index ==================>", path);

		view(currentVoca[path]);
		$(document).on('keydown', textInput);
	}
	
	function textInput(e){
		if(e.keyCode == 13){
			if(currentSucces == $('.word_txt').val()){
				console.log('정답');
				$('.answer').children().hide();
				$('.circle').show();
				parent.effectPlay("right_eff");
				setTimeout(function(e){parent.narr2Play(narrSelect);}, 300);
			}else{
				console.log('오답');
				$('.answer').children().hide();				
				$('.cross').show();
				parent.effectPlay("wrong_eff");
			}
		}else {
			//$(document).off('keydown', textInput);
		}
	}
})
