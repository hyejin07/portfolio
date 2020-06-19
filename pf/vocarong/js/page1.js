$(function(){
	//localStorage.setItem("coin", 100000);
	/***************************
		init page 1
	****************************/
	var cntLesson = parent.cntLesson;
	var cntPage = parent.cntPage;
	var currentXml = parent.xmlDoc;
	//console.log("lesson:", cntLesson, " / page:", cntPage);
	//console.log("xmlData == > ", currentXml);
	//console.log("sceneData == > ", currentXml.getElementsByTagName("scene"+cntPage)[cntLesson-1]);

	//xml 데이터
	/*
		sentenceNum = 문제 번호 0~9번까지
		sentenceArr = xml 데이터 배열
		currentVoca = myvoca 받아오는 배열
		localStorage.getItem("myvoca"); 		= myvoca란 저장소에 쿠키값 가져오기
		localStorage.setItem("myvoca", 배열); 	= myvoca란 저장소에 배열값 저장

		조건 -
		1. 총 10문장, 초록 좌우버튼으로 문장 변경가능.
		2. 문장에 단어 드레그시 하단에 myvoca에 드레그드랍이 가능함.
		3. 드레그드랍시 myvoca는 쿠키값에 배열로 저장된다.
	*/

	//변수
	var sentenceNum = 0;
	var sentenceTotal = 9;	// 총 10개 0~9까지
	var currentVoca = [];	// myvoca 받아오는 배열
	var sentenceArr = currentXml.getElementsByTagName("scene"+cntPage)[cntLesson-1].getElementsByTagName("voca");	//xml 데이터

	var isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
		|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
		isMobile = true;
	}
	var dragstart = isMobile ? "touchstart" : "mousedown";
	/*
	if(isMobile){
		dragstart = "touchstart";
	}else{
		dragstart = "mousedown";
	}
	*/
	var dragend = isMobile ? "touchend" : "mouseup";
	var dragmove = isMobile ? "touchmove" : "mousemove";

	var _this, newItem;
	var movebool = false;
	var dropbool = false;
	var clickbool = false;
	var pageCnt = 0;

	//이벤트
	console.log("test =============", cntPage);
	$('.stepBtn_prev').on("click", stepHandler);
	$('.stepBtn_next').on("click", stepHandler);

	//함수 실행
	view();
	myVocaView();
	//localStorage.clear();

	//함수
	function stepHandler(e){
		parent.effectPlay("click_eff");
		var _path = e.currentTarget.className.substr(-4, 4);
		switch(_path){
			case "prev":
				sentenceNum--;
				if(sentenceNum==-1){
					sentenceNum = 9;
				}
				break;
			case "next":
				sentenceNum++;
				if(sentenceNum==sentenceTotal){
					sentenceNum = 0;
				}
				break;
		}
		var stepNum = sentenceNum +1;
		if(stepNum < 10) stepNum = '0'+stepNum;
		$('.stepNum').text(stepNum);
		view();
	}


	function myVocaView(){
		//
		$('.vocaBtn_next').removeClass('vocaBtn_next_over');
		if(localStorage.getItem("myvoca") != null){
			currentVoca = localStorage.getItem("myvoca");
			currentVoca = currentVoca.split(',');
			//console.log(currentVoca);
			//console.log('length ==============> ', currentVoca.length);
			for(var i = 0;i<currentVoca.length;i++){
				// myvoca 붙이기 - appendchild
				var vocDiv = $('<div class="word_card"></div>');
				vocDiv.text(currentVoca[i]);
				$('.word').append(vocDiv);
			}

			if(currentVoca.length >8) {
				pageCnt = 0;
				console.log('pageCnt++ ==== >', pageCnt);
				$('.vocaBtn_next').addClass('vocaBtn_next_over').css('cursor', 'pointer');
			}

			$('.word_card').css('display','none');
			for(var i = 0; i < 8; i++){
				$('.word_card').eq((i % 8)+(pageCnt*8)).css('display','block');
			}
		}
		$('.vocaBtn_next').on('click',scrollnextPage);
		$('.vocaBtn_prev').on('click',scrollprevPage);
	}

	
	function view(){
		parent.narr4Play(-1);
		if(parent.frsbool){
			parent.frsbool = false;
			setTimeout(function(e){parent.narr4Play(sentenceNum)}, 1300);
		}else{
			setTimeout(function(e){parent.narr4Play(sentenceNum)}, 300);
		}
		

		$('.sentens').text('');
		$('.sentens').children().remove();

		console.log("문장 == > ", sentenceArr[sentenceNum].textContent);
		var dicArr = sentenceArr[sentenceNum].textContent.split("^");

		for(var i = 0;i<dicArr.length;i++){
			// 문장 붙이기(한 단어씩) - appendchild
			console.log("단어 == > ", dicArr[i]);

			var newItem = $('<span class="drag"></span>')
			newItem.text(dicArr[i]).css({'margin-right':'10px', 'cursor':'pointer'});
			if(i == dicArr.length-1){
				newItem.css('margin-right','0');
			}
			$('.sentens').append(newItem);
		}
		$('.drag').on(dragstart, dragItem);
		$(document).on(dragmove, dragItem);
		$(document).on(dragend, dragItem);
	}



	function scrollnextPage() {
		if(pageCnt < parseInt(currentVoca.length / 8)) {
			parent.effectPlay("click_eff");
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
			parent.effectPlay("click_eff");
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

	function dragItem(e){
		//console.log("dragItem", e.type, dragmove, movebool);
		switch(e.type){
			case dragstart:
				//해당 오브젝트 드레그 시작
				newItem = $('<div class="word_card drag"></div>');
				newItem.text($(this).text().replace('.','')).css({'position':'absolute'});
				_this = newItem;
				movebool = true;
				dropbool = true;
				$('.word').append(_this);
				
				var x = e.touches ? e.touches[0].clientX -$('.voca').offset().left -_this.width()/2 : e.clientX -$('.voca').offset().left -_this.width()/2;
				var y = e.touches ? e.touches[0].clientY - $('.voca').offset().top -_this.height()/2 : e.clientY - $('.voca').offset().top -_this.height()/2;
				_this.css({'left':x, 'top':y});

				break;
			case dragmove:
				if(movebool) {
					var x = e.touches ? e.changedTouches[0].clientX -$('.voca').offset().left -_this.width()/2 : e.clientX -$('.voca').offset().left -_this.width()/2;
					var y = e.touches ? e.changedTouches[0].clientY - $('.voca').offset().top -_this.height()/2 : e.clientY - $('.voca').offset().top -_this.height()/2;
					//해당 오브젝트 드레그 이동
					_this.css({'left':x, 'top':y, 'cursor':'move'});
					dropbool = true;
				}
				break;
			case dragend:
				//해당 오브젝트 드레그 멈춤 및 리셋
				if(dropbool){
					var x = e.touches ? e.changedTouches[0].clientX -$('.voca').offset().left -_this.width()/2 : e.clientX -$('.voca').offset().left -_this.width()/2;
					var y = e.touches ? e.changedTouches[0].clientY - $('.voca').offset().top -_this.height()/2 : e.clientY - $('.voca').offset().top -_this.height()/2;
					var chk = false;
					//currentVoca = [];
					if(localStorage.getItem("myvoca") != null){  //마이보카가 비어 있지 않으면;

						//currentVoca = localStorage.getItem("myvoca");
						for(var i = 0; i<currentVoca.length;i++){
							if(_this.text() == currentVoca[i]) {
								chk = true;
								_this.remove();
								//alert('이미 저장한 단어입니다.');
							}
						}
					}
					if(!chk){
						//드랍
						if(x >= 0
							&& x < $('.word').width() - _this.width()/2
							&& y > $('.word').offset().top - $('.voca').offset().top
							&& y < ($('.word').offset().top - $('.voca').offset().top) + $('.word').height()){
							console.log(currentVoca.length == $('.word').children().length);
							console.log('droped');
							$('.word_card').css('display','none');
							//단어 추가
							parent.effectPlay("click_eff");
							_this.css({'position':'static'}).removeClass('drag');
							currentVoca.push(_this.text());
							localStorage.setItem("myvoca", currentVoca);
							console.log('currentVoca arr ==============> ',currentVoca);

							if(currentVoca.length !=  $('.word').children().length) currentVoca.pop();
							console.log(currentVoca.length, $('.word').children().length);


							if(currentVoca.length >= 8 && (currentVoca.length-1) % 8  == 0) {
								pageCnt = parseInt(currentVoca.length / 8);

								$('.vocaBtn_next').removeClass('vocaBtn_next_over').css('cursor','pointer');
								$('.vocaBtn_prev').addClass('vocaBtn_prev_over').css('cursor','pointer');


							}
							console.log('pageCnt ==== >', pageCnt);
							if(pageCnt < parseInt((currentVoca.length-1) / 8)) {
								pageCnt = parseInt(currentVoca.length / 8);
								$('.vocaBtn_prev').addClass('vocaBtn_prev_over').css('cursor','pointer');
								if(pageCnt == 1) $('.vocaBtn_next').removeClass('vocaBtn_next_over').css('cursor','pointer');
							}
							console.log('pageCnt ================>', pageCnt);

							$('.word_card').css('display','none');
							for(var i = 0; i < 8; i++){
								//$('.word_card').css('display','none');
								$('.word_card').eq((i % 8)+(pageCnt*8)).css('display','block');
								console.log((i % 8)+(pageCnt*8));
							}

							movebool = false;
							dropbool = false;
						}else {
							//드랍 안됨
							console.log('removed');
							_this.remove();
							movebool = false;
							dropbool = false;
						}
					}
				}

				break;
		}
	}
})
