$(function(){
	/***************************
		init
	****************************/
	$('.coin span').text(parent.numberWithCommas(localStorage.getItem("coin")));
	



	var ran, obj;
	var comboCnt = 0;
	var railCnt = 0;
	var readyCnt = 3;
	var clickbool = false;
	var time = 60;
	var min = parseInt(time / 60);
		if(min < 10) min = '0'+min;
	var sec = time % 60 ;
		if(sec < 10) sec = '0'+sec;
	var gameTimer;

	//초기 화면 타이머 텍스트 설정
	$('.time p').text(min+':'+sec);

	//이미지 태그 복사 드래그 방지
	$('img').on('dragstart',function(){ return false;})

	//a태그 클릭시 url에 #안생기도록 방지
	$('a').on('click', function(e){ e.preventDefault();})

	//처음에 안보여야 할 개체들
	$('.combo').hide();
	$('.text .number').hide();
	$('.l_btn, .r_btn').css('cursor','default');

	//setting
	$('.progress').css('transition', 'width 1s linear');

	

	/***************************
		click event
	****************************/
	//닫기 버튼
	$('.exit_btn').on("click", function(e){
		parent.cntPage = 4;
		parent.movePage(4);
		parent.bgmPlay(parent.cntPage);
	});
	//게임 시작 버튼 클릭 이벤트
	$('.start_btn').on('click', function(e){
		//화면전환
		$('.intro').hide();
		$('.main').show();
		
		//오브젝트 랜덤 생성
		ranObj();
		parent.effectPlay("ready_eff");

		//ready timer
		var readyTimer = setInterval(function(){
			parent.effectPlay("click_eff");
			$('.text img').eq(0).hide();
			$('.text .number').show().text(readyCnt);
			readyCnt--;
			if(readyCnt == -1) {
				//parent.effectPlay("go_eff");
				var audio = new Audio('audio/go.mp3');
				audio.volume = localStorage.getItem("effVolume");
				audio.play();
				clearInterval(readyTimer);
				$('.text .number').hide();
				$('.text img').eq(1).show();
				setTimeout(function(){
					$('.text img').eq(1).hide();
					clickbool = true;
					$('.l_btn, .r_btn').css('cursor','pointer');
					gameTimer();
				},1000)
			}
		},1000);
	})

	//왼쪽버튼 눌렀을 때
	$('.l_btn').on('click', function(){
		if(clickbool){
			var obj = $('.group div').eq(0);
			var objName = $('.group div').eq(0).attr('class').split('_')[1];
			$('.char_0, .char_1, .char_2').hide();
			if( objName == 'candy'){
				//정답처리
				$('.char_1').show();
				answerAct();
			}else {
				//오답 처리
				wrongAct();
			}
		}
	})

	//오른쪽 버튼 눌렀을 때
	$('.r_btn').on('click', function(){
		if(clickbool){
			var obj = $('.group div').eq(0);
			var objName = $('.group div').eq(0).attr('class').split('_')[1];
			$('.char_0, .char_1, .char_2').hide();
			if( objName == 'peanut'){
				//정답처리
				$('.char_2').show();
				answerAct();
			}else {
				//오답 처리
				wrongAct();
			}
		}
	})

	$(document).on('keydown', function(e){
		if(clickbool){
			if(event.keyCode == '37') {
				var obj = $('.group div').eq(0);
				var objName = $('.group div').eq(0).attr('class').split('_')[1];
				$('.char_0, .char_1, .char_2').hide();
				if( objName == 'candy'){
					//정답처리
					$('.char_1').show();
					answerAct();
				}else {
					//오답 처리
					wrongAct();
				}
			}else if(event.keyCode == '39') {
				var obj = $('.group div').eq(0);
				var objName = $('.group div').eq(0).attr('class').split('_')[1];
				$('.char_0, .char_1, .char_2').hide();
				if( objName == 'peanut'){
					//정답처리
					$('.char_2').show();
					answerAct();
				}else {
					//오답 처리
					wrongAct();
				}

			}
		}

	})


	/***************************
		function collection
	****************************/
	

	function gameTimer() {
		gameTimeCall();
		gameTimer = setInterval(gameTimeCall,1000);
	}

	function gameTimeCall() {
		
		time--;

		min = parseInt(time / 60);
		if(min < 10) min = '0'+min;
		sec = time % 60 ;
		if(sec < 10) sec = '0'+sec;
		$('.time p').text(min+':'+sec);

		var renewWidth = parseInt(((time-1/time)/60) *100) ;
		//console.log(renewWidth);
		$('.progress').css('width', renewWidth+'%');
		if(time == 0) {
			parent.effectPlay("over_eff");
			clearInterval(gameTimer);
			clickbool = false;
			$('.text img').eq(2).show();
			$('.l_btn, .r_btn').css('cursor','default');
		}
	}

	function ranObj() {
		for(var i = 0; i < $('.group div').length; i++){
			ran = Math.floor(Math.random() * 10);
			if( ran % 2 == 1) {
				ranClass = 'candy';
			}else {
				ranClass = 'peanut';
			}
			$('.move_candy_0'+(i+1)).attr('class', 'move_'+ranClass+'_0'+(i+1))
		}
	}

	function charMotionReset() {
		$('.char_0, .char_1, .char_2').hide();
		$('.char_0').show();
	}

	function answerAct(){
		localStorage.setItem("coin", parseInt(localStorage.getItem("coin"))+parent.coinplus);
		$('.coin span').text(parent.numberWithCommas(localStorage.getItem("coin")));

		parent.effectPlay("right_eff");
		var obj = $('.group div').eq(0);
		obj.remove(); //첫번재 오브젝트 삭제

		//2~6번째 오브젝트 앞으로 당김
		for(var i = 0; i < $('.group div').length; i++) {
			var currentClass = $('.group div').eq(i).attr('class');
			var lastChar = currentClass.substr(currentClass.length-1);
			var newClass = currentClass.replace('0'+lastChar, '0'+(lastChar-1));
			$('.group div').eq(i).attr('class',newClass);
		}

		//마지막 오브젝트 랜덤 생성
		ran = Math.floor(Math.random() * 10);
		if( ran % 2 == 1) {
			ranClass = 'candy';
		}else {
			ranClass = 'peanut';
		}
		var newItem = '<div class="move_' + ranClass + '_06"></div>'
		$('.group').append(newItem);

		//콤보박스
		comboCnt++;
		$('.combo').fadeIn();
		if(comboCnt >= 10 ){
			if(comboCnt  == 10 || comboCnt == 100) {
				var newCombo = $('<img src="images/combo/combo_num_000'+(comboCnt/10)+'.png">');
				newCombo.addClass('number');
				$('.combo').prepend(newCombo);	
			}
			for(var i = 0 ; i < $('.combo img').length-1; i++){
				$('.combo img').eq(i).attr('src','images/combo/combo_num_000'+comboCnt.toString().substr(i,1) +'.png')
			}
		}else {
			$('.combo img').eq(0).attr('src','images/combo/combo_num_000'+comboCnt+'.png')
		}

		//0.1s 후 캐릭터 제자리로
		setTimeout(charMotionReset,100)

		//레일 움직이기
		/*
		railCnt++;
		$('.rail').css('background-image','url(images/game_rail_motion/rail_motion_000'+((railCnt%9)+1)+'.png)');
		*/
	}

	function wrongAct(){
		console.log('틀림====================>');
		parent.effectPlay("wrong_eff");
		$('.combo').hide();

		if(comboCnt >= 10 ){
			$('.combo img').eq(0).remove();
			$('.combo img').eq(0).attr('src','images/combo/combo_num_0001.png')

		}else if(comboCnt >= 100 ){
			$('.combo img').eq(0).remove();
			$('.combo img').eq(0).remove();
			$('.combo img').eq(0).attr('src','images/combo/combo_num_0001.png')
			
		}else {
			$('.combo img').eq(0).attr('src','images/combo/combo_num_0001.png')
		}
		comboCnt=0;

		//캐릭터 제자리로
		charMotionReset();		

		//obj 컬러 교체
		$('.group div').eq(0).css('background-blend-mode','luminosity');

		//obj 컬러 원상복귀
		setTimeout(function(){
			$('.group div').eq(0).css('background-blend-mode','initial');
		},500)
	}

})