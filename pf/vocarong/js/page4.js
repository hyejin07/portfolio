$(function(){
	/***************************
		init page 4
	****************************/
	var cntLesson = parent.cntLesson;
	var cntPage = parent.cntPage;
	var currentXml = parent.xmlDoc;
	//console.log("lesson:", cntLesson, " / page:", cntPage);
	//console.log("xmlData == > ", currentXml);
	//console.log("sceneData == > ", currentXml.getElementsByTagName("scene"+cntPage)[cntLesson-1]);

	//xml 데이터
	/*
		sentenceNum 문제 번호 0~9번까지
		sentenceArr xml 데이터 배열
		dicLen 문제 보기 총갯수

		조건 - 
		1. 총 10문제, 초록 좌우버튼으로 문제 변경가능.
		2. 문제 보기는 랜덤으로 나열되며, 위 문장에 알맞는 보기를 클릭하면 정답, 맞지않는 보기를 선택하면 오답.
		3. 정답인 경우 빨간색 박스에 차례대로 문장이 나옴. 정답된 보기는 초록색 박스로 바뀜.
		4. 보기를 모두 선택해 문제를 맞췄을 경우 1초후에 다음 문제로 넘어간다.
	*/
	//변수
	var sentenceNum = 0;
	var sentenceTotal = 9;	// 총 10개 0~9까지
	var stepLen; 			//4개
	var sentenceArr = currentXml.getElementsByTagName("scene"+cntPage)[cntLesson-1].getElementsByTagName("voca");	//xml 데이터

	var splitArr = [];
	var questionNum, answerNum;

	//이벤트
	$('.stepBtn_prev').on("click", stepHandler);
	$('.stepBtn_next').on("click", stepHandler);
	$('.vocaBtn_game').on("click", function(e){
		parent.cntPage = "game";
		parent.bgmPlay(parent.cntPage);
		parent.effectPlay("click_eff");
		parent.narr4Play(-1);
	});

	//함수 실행
	view();

	//함수
	function stepHandler(e){
		parent.effectPlay("click_eff");
		parent.narr4Play(-1);
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
				if(sentenceNum==sentenceTotal+1){
					sentenceNum = 0;
				}
				break;
		}
		var stepNum = sentenceNum +1;
		if(stepNum < 10) stepNum = '0'+stepNum;
		$('.stepNum').text(stepNum);
		view();
	}

	function view(){
		$('.english').css('vertical-align','baseline');
		$('.english').children().remove();
		$('.inventory').children().remove();
		// 문제 붙이기 - appendchild
		console.log("해석 == > ", sentenceArr[sentenceNum].getAttribute("sentence"));
		$('.korean').text(sentenceArr[sentenceNum].getAttribute("sentence"));

		// 문장 붙이기 - appendchild
		console.log("문장 == > ", sentenceArr[sentenceNum].getElementsByTagName("dic_all")[0].textContent);
		var sentence = sentenceArr[sentenceNum].getElementsByTagName("dic_all")[0].textContent;


		console.log("몇번째 단어가 문제인지 == > ", sentenceArr[sentenceNum].getElementsByTagName("dic_all")[0].getAttribute("question"));
		console.log("몇번쨰 보기가 정답인지 == > ", sentenceArr[sentenceNum].getElementsByTagName("dic_all")[0].getAttribute("correct"));

		questionNum = sentenceArr[sentenceNum].getElementsByTagName("dic_all")[0].getAttribute("question")-1;
		answerNum = sentenceArr[sentenceNum].getElementsByTagName("dic_all")[0].getAttribute("correct")-1;

		splitArr = sentence.split('^');
		console.log(splitArr);

		for(var i = 0; i < splitArr.length; i++){
			if(i != questionNum){
				var newP = $('<p></p>');
				newP.css('margin','0 5px')
				newP.text(splitArr[i]);
				$('.english').append(newP);
			}else {
				var divAnswer = $('<div class="answer_box"></div>');
				var markImg = $('<img src="images/qu_icon.png" alt="question mark" class="question">');
				var textAnswer = $('<p class="answer"></p>');
				textAnswer.css('vertical-align','top');
				textAnswer.text(splitArr[questionNum]);
				divAnswer.append(markImg);
				divAnswer.append(textAnswer);
				$('.english').append(divAnswer);
			}
		}

		var plus = 0;
		for(var i = 0;i<4;i++){
			if(localStorage.getItem("product"+parent.cntLesson+"_"+sentenceNum+"_"+i) != null){
				plus++;
				var newWord = sentenceArr[sentenceNum].getElementsByTagName("dic")[i].textContent;
				var newItem = $('<p></p>');
				newItem.addClass('word_card_0'+plus).text(newWord).css('cursor','pointer');
				$('.inventory').append(newItem);
			}
		}

		//이벤트 선언
		$('[class^="word_card_"]').on("click", clickWord);

		//상점
		storeView();
	}

	function clickWord(e){
		if($(this).text() == sentenceArr[sentenceNum].getElementsByTagName("dic")[answerNum].textContent){
			$(this).addClass('word_card_over');
			parent.effectPlay("right_eff");
			$('.answer_box img').css('opacity','0');
			$('.answer').css('opacity',1);
			$('[class^="word_card_"]').off("click", clickWord);
			setTimeout(function(e){parent.narr4Play(sentenceNum)}, 800);
		}else{
			//오답 일때
			parent.effectPlay("wrong_eff");
		}
	}
	readyClosure = function(){
		//정답 맞추면 nextStage
        sentenceNum++;
		if(sentenceNum==sentenceTotal+1){
			sentenceNum = 0;
		}
		var stepNum = sentenceNum +1;
		if(stepNum < 10) stepNum = '0'+stepNum;
		$('.stepNum').text(stepNum);
		view();
    }

    /***************************
		상점
	****************************/
	function storeView(){
		for(var i = 0;i<4;i++){
			$('.storeList .ex').eq(i).text(sentenceArr[sentenceNum].getElementsByTagName("dic")[i].textContent);
			if(localStorage.getItem("product"+parent.cntLesson+"_"+sentenceNum+"_"+i) != null){
				$('.storeList:eq('+i+') .gold').css('background-image', 'url(images/store_order.png)');
			}else{
				$('.storeList:eq('+i+') .gold').css('background-image', 'url(images/store_gold.png)');
			}
		}
		try{
			$('.storeList .gold').off("click", priceHandler);
			$('.storeList .gold').on("click", priceHandler);
		}catch(e){}
		$('.coin_box span').text(parent.numberWithCommas(localStorage.getItem("coin")));
		$('.coin p').text(parent.numberWithCommas(localStorage.getItem("coin")));
	}

	function priceHandler(e){
		var choice = $(this).parent().index();
		if(localStorage.getItem("product"+parent.cntLesson+"_"+sentenceNum+"_"+choice) == null){
			if(localStorage.getItem("coin")>= parent.price){
				parent.effectPlay("purchase_eff");
				localStorage.setItem("product"+parent.cntLesson+"_"+sentenceNum+"_"+choice, "1");
				localStorage.setItem("coin", parseInt(localStorage.getItem("coin"))-parent.price);
				view();
			}else{
				//console.log("돈이 부족함");
			}
		}else{
			//console.log("이미 구매함")
		}
	}
})
var readyClosure;
function page4(){readyClosure();}