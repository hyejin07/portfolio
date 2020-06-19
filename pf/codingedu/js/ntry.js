
$(function(){
	var arr = [];
	var $item = [];
	var hei = 52;

	var play_bool = false;
	var moveNum = 80;
	var moveH = parseInt($('.canvaswrapper .char-wrap').css('left'));
	var moveV = parseInt($('.canvaswrapper .char-wrap').css('top'));
	var cnt = 0;
	var pathArr = [];

	var stageNum = 1;
	var charMove = [[1,3],[4,3],[3,5],[3,2],[2,4],[2,4],[1,3],[2,2],[1,4],[2,4],[1,3],[2,5]]; //[[]];
	var clear_bool = false;

	var char = [[1,3],[4,3],[3,5],[3,2],[2,4],[2,4],[1,3],[2,2],[1,4],[2,4],[1,3],[2,5]];
	var road = [[[1,3],[2,3],[3,3],[4,3]],
					[[4,3],[3,3],[2,3],[1,3]],
					[[3,5],[3,4],[3,3],[3,2]],
					[[3,2],[3,3],[3,4],[3,5]],
					[[2,4],[2,3],[3,3],[3,2]],
					[[2,4],[3,4],[3,3],[4,3],[4,2]],
					[[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]],
					[[2,2],[3,2],[4,2],[4,3],[4,4],[3,4],[2,4]],
					[[1,4],[2,2],[2,3],[2,4],[2,5],[3,2],[3,4],[3,5],[4,2],[4,3],[4,5],[5,2],[5,3],[5,4],[5,5]], //9단계 최단 코스
					[[2,4],[2,3],[2,2],[3,2],[4,2],[4,3],[5,3]],
					[[1,3],[2,3],[3,3],[4,3],[5,3],[6,3]],
					[[2,5],[3,5],[3,4],[4,4],[4,3],[5,3],[5,2]]];
	var complete_road = [[4,3],[1,3],[3,2],[3,5],[3,2],[4,2],[6,3],[2,4],[5,2],[5,3],[6,3],[5,2]];
	var candy = [ [[]],[[]],[[]],[[]],[[]],[[]],[[3,3],[5,3]],[[4,3]],[[]],[[2,2],[4,3]],[[]],[[]] ];
	var candy_length = 0;
	var candy_count = [ [[]],[[]],[[]],[[]],[[]],[[]],[[3,3],[5,3]],[[4,3]],[[]],[[2,2],[4,3]],[[]],[[]] ];
	
	// 블록 박스 꽉차게 
	var screenWidth = $(window).width();

	$('.stage-container section').css('width',screenWidth-640);	

	$(window).on('resize', function(){
		screenWidth = $(window).width();
		$('section').css('width',screenWidth-640);
	})

	$('.missionGuide .close').on('click',function(){
		$(this).parents('.missionGuide').hide();
	})

	$('.canvas-btn').on('click', function(){
		if($(this).hasClass('start')){
			$(this).removeClass('start').addClass('play');
			$(this).find('span').text('실행중...');
		}else if($(this).hasClass('restart')){
			$('.canvas-btn').removeClass('restart').addClass('start');
			$('.canvas-btn').find('span').text('시작하기');
			return false;
		}
	})

	$('.order-number').on('click', function(){
		console.log("down scroll")
		$(this).next().toggleClass('on');
	})

	$('.select-box li').on('click', function(){
		var howmany = $(this).text();
		$(this).parent().prev().text(howmany);
		$(this).parent().removeClass('on');
	})

	var $stageList = $('ul.stage li');
	var $activeList = $('ul.stage li.on');
	var $stageWrapper;
	var $star = $('#stage'+stageNum + ' .block-number li');

	$('.goNextStage').on('click',function(){

		$stageWrapper = $(this).find('a').attr('href');
		$activeList = $('ul.stage li.on');

		console.log(candy[stageNum-1][candy[stageNum-1].length]);

		$('.clearbox').removeClass('show');

		$('.canvas-btn').removeClass('restart');
		$('.canvas-btn').find('span').text('시작하기');

		$($activeList.find('a').attr('href')).addClass('cleared');
		$activeList.removeClass('on').addClass('cleared');
		$activeList.next().addClass('on cleared');

		$('.stage-container').removeClass('active');
		$($stageWrapper).addClass('active');			
		$('.drop').find('*').remove();

		stageNum++;
		resetHandler();

		$star = $('#stage'+stageNum + ' .block-number li');
		
		return false;	
	})

	//stage play 완료후 팝업 닫기 기능
	$('.clearbox .close, .replay').on('click', function(){
		$('.clearbox').removeClass('show');
		clear_bool = false;
	})

	//header 부분 스테이지 클릭시
	$stageList.on('click', function(){
		if($($stageWrapper).hasClass('cleared') || $(this).hasClass('cleared')){
		$('.missionGuide').css('display','block');

		$stageWrapper = $(this).find('a').attr('href');
		stageNum = $(this).index()+1;

		$star = $('#stage'+stageNum + ' .block-number li');
		
		if($stageWrapper == '#'+$('.stage-container.active').attr('id')) return false;

		
			var goOut = confirm('확인을 누르면 진행된 내용이 모두 사라집니다. 계속 하시겠습니까?');
			if(goOut) {
				$stageList.removeClass('on');
				$(this).addClass('on');
				$('.stage-container').removeClass('active');
				$($stageWrapper).addClass('active');

				resetHandler();
			}else {
				return false;
			}	
		

		$('.canvas-btn').removeClass('start play restart')
		$('.canvas-btn').addClass('start').find('span').text('시작하기');		
		}else {
			alert('이전 단계를 먼저 완료해 주십시오.');
		}
		return false;
	})

	/* drag */
	var tarX = 0;
	var tarY = 0;
	var defX = 0;
	var defY = 0;

	var _wid = 134;
	var _hei = 50;

	var top_magin = 20;
	var drop_bool = false;
	var current_target = -1;

	var total_arr_w = [];
	var total_arr_n = [];

	var total_item = [];
	var path = "";
	var repeat_bool = false;

	var drag_cnt = 0;
	//퍼즐 드래그 
	$(document).on("mouseover", '.drag .obj, .drop .obj', function() {
		$('.drag .obj, .drop .obj').draggable({
			opacity: "0.3",
			helper: "clone",
			containment: '.stage-container.active .assembly-station',
			distance: 3,
			drag: function( event, ui ) {
				path = ui.helper.context.className.substr(4, ui.helper.context.className.indexOf("ui")-5);
				tarX = ui.offset.left-890;
				tarY = ui.offset.top-160;
				current_target = 0;
				var arr = [];
				for(var i=0;i<total_arr_w.length;i++){
					var num = 0;
					if(i != 0){
						num = arr[i-1];
					}
					switch(total_arr_w[i]){
						case 0:
							arr.push(num+50);
							break;
						case 1:
							arr.push(num+50);
							break;
						case 2:
							arr.push(num+80);
							break;
					}
					if(ui.offset.top-210 < arr[i]){
						//console.log(i+1);
						current_target = i + 1;
						break;
					}else if(ui.offset.top-210 < arr[arr.length-1]+50){
						//console.log(i+2);
						current_target = i + 2;
					}
				}
				//console.log("current_target", current_target);
				if(total_arr_w.length == 0){
					current_target = parseInt((ui.offset.top-160)/50);
				}
				if(tarX >= defX && tarX <= defX+_wid){
					if(current_target>=1 && current_target <= total_arr_w.length+1){
						drop_bool = true;
					}else{
						drop_bool = false;
					}
				}else{
					drop_bool = false;
				}
				for(var i=0;i<total_item.length;i++){
					if(total_item[i] == this){
						total_item.pop(this);
					}
				}
				if(ui.helper.hasClass('add')){
					//console.log("delete");
					//if(total_arr_n[current_target] == 1){
						var j = 1;
						while(-1){
							if(total_arr_w[current_target-j] == 1){
								if(total_arr_n[current_target-j]!=0){
									total_arr_n[current_target-j]--;
									//console.log("--");
								}
								//console.log("delete break;");
								break;
							}
							if(total_arr_w.length == j){
								//console.log("delete break;");
								break;
							}
							j++;

						}
					//}
					if(total_arr_w[current_target-2] == 2){
						total_item.splice(current_target-2, 1);
					}else{
						total_item.splice(current_target-1, 1);
					}
					//console.log(path);
					if(path == "repeat"){
						total_arr_n.splice(current_target-1, 1);
						total_arr_w.splice(current_target-1, 1);
						var j = 1;
						while(-1){
							console.log(j, total_arr_w[current_target-j]);
							if(total_arr_w[current_target-j] == 2){
								//if(total_arr_n[current_target-j]!=0){
									console.log("break--");
									total_arr_n.splice(current_target-j, 1);
									total_arr_w.splice(current_target-j, 1);
									break;
								//}
							}
							j--;
							if(j==-100)break;
						}
						
						
					}else{
						total_arr_n.splice(current_target-1, 1);
						total_arr_w.splice(current_target-1, 1);
					}
					ui.helper.removeClass('add');
					
				}
				//console.log(total_arr_w.length, current_target, drop_bool);
				object_array(false);
			}
		})
	});
	
	//퍼즐 드랍
	$('.drop').droppable({
		accept: '.obj',
		drop: function( event, ui ) {
			var $item = ui.draggable.hasClass('clone') ? ui.draggable : ui.draggable.clone().addClass('clone');
			if(drop_bool){
				path = ui.helper.context.className.substr(4, ui.helper.context.className.indexOf("ui")-5);
				if($item.hasClass('add'))$item.removeClass('add');
				$item.addClass('add');
				if(path == "repeat"){
					$('.blockpackage .drag .repeat').hide();
					//console.log($item.context.innerText.substr(0, 1));
					var $arr = [1, 1, $item]; //안에들어가는 개수, 반복회수, 해당아이템
					if(current_target>=1 && current_target <= total_item.length+1){
						arrayUtil(total_item, current_target, $item);
						arrayUtil(total_arr_w, current_target, 2);
						arrayUtil(total_arr_w, current_target, 1);
						arrayUtil(total_arr_n, current_target, 1);
						arrayUtil(total_arr_n, current_target, 0);
						console.log("if");
						
					}else{
						console.log('else');
						total_item.push($item);
						total_arr_w.push(1);
						total_arr_w.push(2);
						total_arr_n.push(0);
						total_arr_n.push(1);
					}
				}else{
					if(current_target>=1 && current_target <= total_item.length+1){
						arrayUtil(total_item, current_target, $item);
						arrayUtil(total_arr_w, current_target, 0);
						arrayUtil(total_arr_n, current_target, 0);
						var j = 1;
						while(-1){
							if(total_arr_w[current_target-j] == 1){
								total_arr_n[current_target-j]++;
								console.log("break;");
								break;
							}
							if(total_arr_w.length == j){
								console.log("break;");
								break;
							}
							j++;
						}
					}else{
						total_item.push($item);
						total_arr_w.push(0);
						total_arr_n.push(0);
					}
				}
				$(this).append(total_item);
			}else{
				if(path != "repeat"){
					$(this).append($item);
					$item.css({left:tarX, top:tarY});
					if($item.hasClass('add'))$item.removeClass('add'); 
				}else{
					$item.remove();
					$('.blockpackage .drag .repeat').show();
				}
			}
			
			//console.log(total_item);
			for(var i=0;i<$star.length;i++){
				if(total_item[i]){
					$star.eq(i).addClass('on');
				}else{
					$star.eq(i).removeClass('on');
				}
			}

			if($star.length < total_item.length){
				$('.stage-container.active .block-number').addClass('over');
			}else{
				$('.stage-container.active .block-number').removeClass('over');
			}
			object_array(true);
			$('.order-number').on('click', function(){ //반복수 정하는 곳
				console.log("down scroll");
				$(this).next('ul').addClass('on');
			})
			$('.select-box li').on('click', function(){
				var howmany = $(this).text(); //반복횟수 텍스트
				$(this).parent().prev().text(howmany);
				$(this).parent().removeClass('on');
			})
			console.log(total_arr_w);
			console.log(total_arr_n);
		}
		
	})

	//퍼즐 지우는 드래그 기능
	$('.trashbox, .drag').droppable({
		accept: '.obj',
		drop: function( event, ui ){
			console.log("remove");
			var $item = ui.draggable.hasClass('clone') ? ui.draggable : ui.draggable.clone().addClass('clone');
			$item.remove();
			if(path == "repeat")$('.blockpackage .drag .repeat').show();
			for(var i=0;i<$star.length;i++){
				if(total_item[i]){
					$star.eq(i).addClass('on');
				}else{
					$star.eq(i).removeClass('on');
				}
			}

			if($star.length < total_item.length){
				$('.stage-container.active .block-number').addClass('over');
			}else{
				$('.stage-container.active .block-number').removeClass('over');
			}
			
			//쓰레기통에 버릴시 쓰레기 이미지 생성
			if($(this).hasClass('trashbox') && path != "repeat"){
				$(this).addClass('throw');
			}
		}
	})

	function arrayUtil($arr, $num, $add){
		var return_array = $arr;
		for(var i = $arr.length;i>0;i--){
			if(i>=$num){
				return_array[i] = $arr[i-1];
			}
		}
		return_array[$num-1] = $add;
		return return_array;
	}

	function object_array($first){
		//console.log(path);
		var arr = [];
		for(var i=0;i<total_arr_w.length;i++){
			var num = 0;
			if(i != 0){
				num = arr[i-1];
			}
			switch(total_arr_w[i]){
				case 0:
					arr.push(num+50);
					break;
				case 1:
					arr.push(num+50);
					break;
				case 2:
					arr.push(num+120);
					break;
			}
		}
		var object_cnt = 0;
		for(var i=0;i<total_item.length;i++){
			var num = 1;
			if(drop_bool && i >= current_target-1) num = 2;
			if($first)num = 1;
			if(total_arr_w[i] == 1){
				var j = 1;
				while(-1){
					if(total_arr_w[current_target-j] == 1){
						if(total_arr_n[current_target-j]!=0)object_cnt = total_arr_n[current_target-j];
						break;
					}
					if(total_arr_w.length == j){
						break;
					}
					j++;
				}
				if(total_item[i])total_item[i].css('height', 133+(total_arr_n[i]*50));
				if(total_item[i])total_item[i].find('.side-bar').css('height', total_item[i].height()-80);
			}
			total_item[i].css({left:20, top:(arr[i])+top_magin});
		}
	}

	$('.canvas-btn').on('click',function(){
		$('.canvaswrapper .char').removeClass('success').removeClass('fail');
		$('.canvaswrapper .char').css({'background-image':'url(images/walk_front.png)', 'background-position-x':'0'});
		$('.candy').removeClass('hide');
		if(!play_bool){
			play_bool = true;
			pathArr = [];
			charMove[stageNum-1][0] = char[stageNum-1][0];
			charMove[stageNum-1][1] = char[stageNum-1][1];

			for(var i = 0; i < candy_length; i++ ){
				candy_count[stageNum-1][i][0] = candy[stageNum-1][i][0];
				candy_count[stageNum-1][i][1] = candy[stageNum-1][i][1];
			}

			for(var i = 0; i < total_item.length; i++){
				var direction = total_item[i].attr('class');
				var str = direction.split(' ');
					str = str[1];
					console.log(i, str);
					pathArr.push(str);
			}
			moveHandler();

			//시작버튼 반복문 정렬
			var arr = [];
			for(var i=0;i<total_arr_w.length;i++){
				var num = 0;
				if(i != 0){
					num = arr[i-1];
				}
				switch(total_arr_w[i]){
					case 0:
						arr.push(num+50);
						break;
					case 1:
						arr.push(num+50);
						break;
					case 2:
						arr.push(num+50);
						break;
				}
			}
			var repeat_pass = 0;
			for(var i=0;i<total_item.length;i++){
				if(total_item[i].context.className.substr(4, total_item[i].context.className.indexOf("ui")-5) == "repeat"){
					if(133+(total_arr_n[i]*50) != 133){
						repeat_pass++;
						total_item[i].css('height', 133+(total_arr_n[i]*50-50));
						total_item[i].find('.side-bar').css('height', total_item[i].height()-80);
					}
				}
				if(repeat_pass == total_arr_n[i] &&
					total_item[i].context.className.substr(4, total_item[i].context.className.indexOf("ui")-5) != "repeat"){
					if(repeat_pass!=0)total_item[i].css({left:20, top:(arr[i])+top_magin+20});
				}else{
					total_item[i].css({left:20, top:(arr[i])+top_magin});
				}
			}
		}
		if($(this).hasClass('start')){
			// 돌아가는 부분
			console.log("돌아가");
			object_array(false);
			play_bool = false;
			cnt = 0;
			charMove[stageNum-1][0] = char[stageNum-1][0];
			charMove[stageNum-1][1] = char[stageNum-1][1];

			for(var i = 0; i < candy_length; i++ ){
				candy_count[stageNum-1][i][0] = candy[stageNum-1][i][0];
				candy_count[stageNum-1][i][1] = candy[stageNum-1][i][1];
			}

			$('.canvaswrapper .char-wrap').css('left', char[stageNum-1][0]*moveNum).css('transition','none');
			$('.canvaswrapper .char-wrap').css('top', (char[stageNum-1][1]-1)*moveNum).css('transition','none');
		}
	})

	// 인증서 받기
	var userName;
	$('#submitUsername').submit(function(event){
		userName = $('.winnername.on').val();
		console.log('hi');
		console.log(userName);
		if(userName == false){
			alert('이름을 입력해주세요.');
			return false;
		}
	});
	//인증서 날짜
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth()+1;
	var yaer = today.getFullYear();

	if(day < 10) {
		day='0'+day;
	}
	if(month < 10) {
	   month='0'+month;
	}

	today = yaer+'년 ' +month+'월 '+ day+'일';

	$('.today').text(today);

	//인증서 프린트
	$('.btn.print').on('click', function(){
		var agent = navigator.userAgent.toLowerCase();
		if ( (navigator.appName == 'Netscape' && agent.indexOf('trident') != -1) || (agent.indexOf("msie") != -1)) {
			// ie 브라우저
			alert('[설정 > 인쇄 > 페이지 설정 > 배경색 및 이미지 인쇄]에 체크하여 주시기 바랍니다.');
		}else if(agent.indexOf("chrome") != -1){
			 // chrome 브라우저
			 alert('[인쇄 > 설정더보기 > 옵션 > 배경그래픽]에 체크하여 주시기 바랍니다.');
		}else if(agent.indexOf("firefox") != -1){
			//firefox 브라우저
			alert('[인쇄 > 페이지설정 > 용지 및 배경 > 설정 배경인쇄(색상 및 이미지)]에 체크하여 주시기 바랍니다.');
		}else if(agent.indexOf("opera") != -1){
			//opera 브라우저
		}

		$('body').addClass('print');
		window.print();
		setTimeout(function(){
			$('body').removeClass('print');
		},400);
	})	
	var repeat_num = 0;
	var repeat_cnt = 0;
	//캐릭터 움직이는 방향
	function moveHandler(){
		if(total_arr_w[cnt]==1){
			//반복 지정
			repeat_num = total_item[cnt].find('.order-number').text()-1;
			repeat_cnt = total_arr_n[cnt];
			console.log("반복지정", repeat_num);
			//console.log(total_item[cnt].find('.order-number').text());
		}
		
		console.log("moveHandler", cnt, total_arr_w);
		var suv_b = false;
		var comp_b = false;
		var number = 0;
		var sugar_fail = false;
		var candy_clear = false;

		switch(pathArr[cnt]){
			//오른쪽
			case 'right':
				right();
				var goRight = setInterval( right , 200 );
				
				function right(){
					$('.canvaswrapper .char').css({'background-image':'url(images/walk_right.png)', 'background-position-x':'-76'*number});
					if(number == 3){ 
						number = 0;
						clearInterval(goRight);
					}
					number++;
				}

				charMove[stageNum-1][0]++;
			break;

			//왼쪽
			case 'left':
				left();
				var goLeft = setInterval( left , 200 );
				
				function left(){
					$('.canvaswrapper .char').css({'background-image':'url(images/walk_left.png)', 'background-position-x':'-76'*number});
					if(number == 3){ 
						number = 0;
						clearInterval(goLeft);
					}
					number++;
				}
				charMove[stageNum-1][0]--;
			break;

			//위쪽
			case 'top':
				back();
				var goBack = setInterval( back , 200 );
				
				function back(){
					$('.canvaswrapper .char').css({'background-image':'url(images/walk_back.png)', 'background-position-x':'-76'*number});
					if(number == 3){ 
						number = 0;
						clearInterval(goBack);
					}
					number++;
				}
				charMove[stageNum-1][1]--;
			break;

			//아래쪽
			case 'bottom':
				front();
				var goFront = setInterval( front , 200 );
				
				function front(){
					$('.canvaswrapper .char').css({'background-image':'url(images/walk_front.png)', 'background-position-x':'-76'*number});
					if(number == 3){ 
						number = 0;
						clearInterval(goFront);
					}
					number++;
				}
				charMove[stageNum-1][1]++;
			break;

			//솜사탕 먹을 때
			case 'sugarcandy':
				// fallDown();
				// var sitDown = setInterval( fallDown , 200 );
				//console.log(candy.length);
				//console.log(candy[stageNum-1].length);
				var cnt_c = 0;
				for(var j = 0; j<candy.length;j++){
					if(j == stageNum-1){
						break;
					}
					for(var k = 0; k<candy[j].length;k++){
						if(candy[j][k] != ""){
							cnt_c++;
						}
					}
				}
				for(var i = 0; i < candy_length; i++ ){
					if(candy[stageNum-1][i][0] == charMove[stageNum-1][0] &&
						candy[stageNum-1][i][1] == charMove[stageNum-1][1]) {
						console.log('위치 일치', (i+cnt_c)+1);
						$('.candy').eq(i+cnt_c).addClass('hide');
						console.log('candy index : ', $('.candy').eq());
						candy_count[stageNum-1][i][0] = -1; //++;
						candy_count[stageNum-1][i][1] = -1;
						//지워주는거랑 모션
						sugar_fail = true;
					}
				}
				/*
				function fallDown(){
					$('.canvaswrapper .char').css({'background-image':'url(images/walk_back.png)', 'background-position-x':'-76'*number});
					if(number == 3){ 
						number = 0;
						clearInterval(sitDown);
					}
					number++;
				}
				*/
			break;
		}

		//반복 블록
		var chk = 0;
		for(var i = 0; i < candy[stageNum-1].length; i++ ){
			if(candy_count[stageNum-1][i][0] == -1 &&
				candy_count[stageNum-1][i][1] == -1) {
				chk++;
			}
		}

		console.log("len", candy_length);
		if(chk == candy_length || candy_length == 0){
			candy_clear = true;
		}
		for(var i = 0;i<road[stageNum-1].length;i++){
			if(charMove[stageNum-1][0] == road[stageNum-1][i][0] && charMove[stageNum-1][1] == road[stageNum-1][i][1]){
				suv_b = true;
			}
		}
		if(charMove[stageNum-1][0] == complete_road[stageNum-1][0]&& charMove[stageNum-1][1] == complete_road[stageNum-1][1]){
			comp_b = true;
		}
		if(pathArr[cnt] == "sugarcandy" && !sugar_fail){
			suv_b = false;
		}

		console.log(suv_b, comp_b);
		if(suv_b){
			if(comp_b){
				clear_bool = true;
				if(cnt == total_item.length-1){
					console.log($star.length);
					if(cnt == $star.length-1 && repeat_num == 0){	
						console.log("perfect", candy_clear);
						if(candy_clear){
							setTimeout(function (){
								console.log("perfect clear", repeat_num, repeat_cnt);
								animationComplete();
								$('.clearbox').addClass('show');
								$('#stage12 .situation').css('padding-top',10);
								$('.situation, .character').addClass('success');
								$('.text.perfect, .text.perfect .winnername').addClass('on');
								$('.canvaswrapper .char').addClass('success');
								
							}, 500);
						}else{
							console.log("솜사탕 안먹고 목적지 도착");
							setTimeout(function (){
								animationComplete();
								$('.clearbox').addClass('show');
								$('.situation, .character').addClass('fail candymiss');
								$('.text.candy-miss').addClass('on');
								$('.canvaswrapper .char').addClass('fail');
							}, 500);
						}	
					}else{
						if(candy_clear){
							console.log("over clear1", candy_clear);
							setTimeout(function (){
								animationComplete();
								$('.clearbox').addClass('show');
								$('.situation, .character').addClass('success');
								$('.text.over, .text.over .winnername').addClass('on');
								$('.canvaswrapper .char').addClass('success');
							}, 500);
						}else{
							console.log("솜사탕 안먹고 목적지 도착");
							setTimeout(function (){
								animationComplete();
								$('.clearbox').addClass('show');
								$('.situation, .character').addClass('fail').addClass('candymiss');
								$('.text.candy-miss').addClass('on');
								$('.canvaswrapper .char').addClass('fail');
							}, 500);
						}
					}
				}else{
					if(candy_clear){
						console.log("over clear2", candy_clear);
						setTimeout(function (){
							animationComplete();
							$('.clearbox').addClass('show');
							$('.situation, .character').addClass('success');
							$('.text.over, .text.over .winnername').addClass('on');
							$('.canvaswrapper .char').addClass('success');
						}, 500);
					}else{
						console.log("솜사탕 안먹고 목적지 도착");
						setTimeout(function (){
							animationComplete();
							$('.clearbox').addClass('show');
							$('.situation, .character').addClass('fail').addClass('candymiss');
							$('.text.candy-miss').addClass('on');
							$('.canvaswrapper .char').addClass('fail');
						}, 500);
					}
				}
			}
			if(total_item.length > cnt){
				moveChar();
			}else{
				//길을 잃었어요.
				console.log("fail2");
				animationComplete();
				$('.clearbox').addClass('show');
				$('.situation, .character').addClass('fail');
				$('.text.lost').addClass('on');
				$('.canvaswrapper .char').addClass('fail');
			}
			cnt++;
		}else if(pathArr[cnt] == "sugarcandy" && !sugar_fail){
			console.log("fail3 솜사탕 없는 곳에서 주움");
			animationComplete();
			$('.clearbox').addClass('show');
			$('.situation, .character').addClass('fail candymiss');
			$('.text.candy-pick').addClass('on');
			$('.canvaswrapper .char').addClass('fail');
		}else{
			//길이 없어요.
			console.log("fail1");
			animationComplete();
			$('.clearbox').addClass('show');
			$('.situation, .character').addClass('fail');
			$('.text.not-enough').addClass('on');
			$('.canvaswrapper .char').addClass('fail');
		}
		if(total_arr_w[cnt]==2 && repeat_num!=0){
			console.log("반복실행", repeat_num);
			repeat_num--;
			cnt = cnt - repeat_cnt;
		}
	}

	function animationComplete(){
		$('.canvas-btn').removeClass('play').addClass('restart');
		$('.canvas-btn').find('span').text('돌아가기');
		$('.situation, .situation .character').removeClass('fail').removeClass('success');
		$('.situation .character').removeClass('candymiss');
		$('.canvaswrapper .char').css('background-image','url(images/walk_front.png)');
		$('.text, .winnername').removeClass('on');
	}

	function resetHandler(){
		console.log("reset");
		$('.blockpackage .drag .repeat').show();
		$('.drop').find('*').remove();
		total_item = [];
		total_arr_w = [];
		total_arr_n = [];
		object_array(false);
		clear_bool = false;
		play_bool = false;
		cnt = 0;
		if(typeof candy[stageNum-1][0][0] == 'number'){
			candy_length = candy[stageNum-1].length;
		}else{
			candy_length = 0;
		}
		
		charMove[stageNum-1][0] = char[stageNum-1][0];
		charMove[stageNum-1][1] = char[stageNum-1][1];
		for(var i = 0; i < candy_length; i++ ){
			candy_count[stageNum-1][i][0] = candy[stageNum-1][i][0];
			candy_count[stageNum-1][i][1] = candy[stageNum-1][i][1];
		}
		$('.canvaswrapper .char-wrap').css('left', char[stageNum-1][0]*moveNum).css('transition','none');
		$('.canvaswrapper .char-wrap').css('top', (char[stageNum-1][1]-1)*moveNum).css('transition','none');
		$('.canvaswrapper .char').removeClass('success').removeClass('fail');
		$('.canvaswrapper .char').css({'background-image':'url(images/walk_front.png)', 'background-position-x':'0'});

		$star.removeClass('on');
		$star.parent('.block-number').removeClass('over');
		$('.candy').removeClass('hide');
		$('.trashbox').removeClass('throw');
	}

	// 애니메이션 캐릭터 무브
	function moveChar(){
		$('.canvaswrapper .char-wrap').css('left', charMove[stageNum-1][0]*moveNum).css('transition','1s');
		$('.canvaswrapper .char-wrap').css('top', (charMove[stageNum-1][1]-1)*moveNum).css('transition','1s');
		console.log(!clear_bool);
		if(!clear_bool)setTimeout(moveHandler, 1000);

	}
})

