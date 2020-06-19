$(function(){
	/***************************
		init page 5
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
		2. 문제 보기는 랜덤으로 나열되며, 문장에 맞게 순서대로 보기를 클릭하면 정답, 순서에 맞지않는 보기를 선택하면 오답.
		3. 정답인 경우 빨간색 박스에 차례대로 문장이 나옴. 정답된 보기는 초록색 박스로 바뀜.
		4. 보기를 모두 선택해 문제를 맞췄을 경우 1초후에 다음 문제로 넘어간다.
	*/
	//변수
	var sentenceNum = 0;
	var sentenceTotal = 9;	// 총 10개 0~9까지
	var stepLen; 			//1~6개 사이
	var sentenceArr = currentXml.getElementsByTagName("scene"+cntPage)[cntLesson-1].getElementsByTagName("voca");	//xml 데이터
	
	var answerText = '';
	var clickText = '';
	var correctCnt = 0;

	//이벤트
	$('[class^="stepBtn_"]').css('cursor','pointer');
	$('.stepBtn_prev').on("click", stepHandler);
	$('.stepBtn_next').on("click", stepHandler);
	
	//함수 실행
	view();

	//함수
	function stepHandler(e){
		answerText = "";
		parent.effectPlay("click_eff");
		parent.narr4Play(-1);
		var _path = e.currentTarget.className.substr(-4, 4);
		switch(_path){
			case "prev":
				sentenceNum--;
				if(sentenceNum==-1){
					sentenceNum = 9;
				}
				var stepNum = sentenceNum+1;
				if(stepNum < 10) stepNum = '0'+(sentenceNum+1);
				$('.stepNum').text(stepNum);
				break;
			case "next":
				sentenceNum++;
				console.log(sentenceNum,sentenceTotal);
				if(sentenceNum==sentenceTotal+1){
					sentenceNum = 0;
				}
				var stepNum = (sentenceNum+1);
				if(stepNum < 10) stepNum = '0'+ stepNum;
				$('.stepNum').text(stepNum);
				console.log(sentenceNum,sentenceTotal);
				break;
		}

		view();
	}
	function view(){

		correctCnt = 0;
		$('.answerBox').text('');
		for(var i = 0 ; i < $('.word_card').length; i++){
			$('.word_card').remove();
		}

		// 문제 붙이기 - appendchild
		console.log("해석 == > ", sentenceArr[sentenceNum].getAttribute("sentence"));
		$('.question').text(sentenceArr[sentenceNum].getAttribute("sentence"));

		// 문장 붙이기 - appendchild
		console.log("문장 == > ", sentenceArr[sentenceNum].getElementsByTagName("dic_all")[0].textContent);
		stepLen = sentenceArr[sentenceNum].getElementsByTagName("dic").length;
		
		console.log("보기수 == > ", stepLen);
		//보기 랜덤
		for(var i = 0;i<stepLen;i++){
			console.log("문제"+(i)+" == > ", sentenceArr[sentenceNum].getElementsByTagName("dic")[i].textContent);
			//보기 붙이기 - appendchild
			clickText = sentenceArr[sentenceNum].getElementsByTagName("dic")[i].textContent;
			var appendItem = $('<div class="word_card"></div>');
			appendItem.text(clickText);
			appendItem.css('cursor','pointer');
			$('.word').append(appendItem);

			var parent = $(".word");
			var divs = parent.children();
			while (divs.length) {
			    parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
			}
		}
		//이벤트선언
		$('.word_card').on("click", clickWord);
		
	}
	

	function clickWord(e){
		if($(this).text() == sentenceArr[sentenceNum].getElementsByTagName("dic")[correctCnt].textContent){ //정답 조건
			console.log('딩동댕~~~');
			parent.effectPlay("right_eff");
			correctCnt++;
			$(this).addClass('word_card_over');
			$(this).css('pointer-events','none');
			answerText = answerText+' '+ $(this).text();
			$('.answerBox').text(answerText);			
		}else{ //오답
			console.log('땡!!!');
			parent.effectPlay("wrong_eff");
		}
		
		if(correctCnt == stepLen){
			setTimeout(function(e){parent.narr4Play(sentenceNum)}, 800);
		}
	}
	readyClosure = function(){
		//정답 맞추면 nextStage
        answerText = '';
		sentenceNum++;
		if(sentenceNum==sentenceTotal+1){
			sentenceNum = 0;
		}
		var stepNum = (sentenceNum+1);
		if(stepNum < 10) stepNum = '0'+ stepNum;
		$('.stepNum').text(stepNum);
		view();
    }
	
})
var readyClosure;
function page5(){readyClosure();}