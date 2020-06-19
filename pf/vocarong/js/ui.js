$(function(){
	/***************************
		ui
	****************************/
	//공통 작업
	//초기화 작업
	optionInit();

	//이벤트 선언
	$('.trailMap').on("click", popupHandler);
	$('.exit_btn').on("click", popupHandler);

	$('.option').on("click", popupHandler);
	$('.options_exit_btn').on("click", popupHandler);
	
	$('.close').on("click", popupHandler);
	$('.popup_btn_yes6').on("click", popupHandler);
	$('.popup_btn_no6').on("click", popupHandler);
	$('.popup_btn_yes1').on("click", popupHandler);
	$('.popup_btn_no1').on("click", popupHandler);
	$('.popup_btn_yes3').on("click", popupHandler);
	$('.popup_btn_no3').on("click", popupHandler);

	//상점 팝업
	$('.vocaBtn_store').on("click", popupHandler);
	$('.exitBtn').on("click", popupHandler);

	$('.setting_btn1').on("click", optionClick);
	$('.setting_btn2').on("click", optionClick);
	
	$('.stageBtn_next').on("click", stageMove);
	$('.stageBtn_prev').on("click", stageMove);

	//함수들
	function stageMove(e){
		var _path = e.currentTarget.className.substr(-4, 4);
		console.log(parent.cntPage, _path);
		if(localStorage.getItem("myvoca") == null && parent.cntPage==1 && _path=="next"){
			var _this = $('.popup_char1');
			//$('.popup_char1');.removeClass('blind');
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
		}else if(localStorage.getItem("myvoca") == null && parent.cntPage==3 && _path=="prev"){
			parent.movePage(1);
		}else{
			parent.movePage(_path);
		}
	}
	function popupHandler(e){
		parent.effectPlay("click_eff");
		var _path = e.currentTarget.className;
		console.log(_path);
		var _this;
		switch(_path){
			case "trailMap": case "exit_btn":
				_this = $('.map_popup');
				break;
			case "option": case "options_exit_btn":
				_this = $('.options_popup');
				break;
			case "close": case "popup_btn_no6":
				_this = $('.popup_char6');
				break;
			case "popup_btn_yes6":
				parent.bgmPlay(-1);
				try{window.project_control.callExit();//앱종료
				}catch(e){console.log(e, "웹에서 실행중!");}
				break;
			case "popup_btn_yes1":
				parent.movePage(3);
				break;
			case "popup_btn_yes3":
				page3();
				_this = $('.popup_char3');
				break;
			case "popup_btn_no1":
				_this = $('.popup_char1');
				break;
			case "popup_btn_no3":
				_this = $('.popup_char3');
				break;
			case "vocaBtn_store": case "exitBtn":
				_this = $('.store');
				break;
		}
		try{
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
		}catch(e){

		}
	}

	function optionClick(e){
		var _path = e.currentTarget.className.substr(-1, 1);
		switch(_path){
			case "1":
				//배경음
				if(localStorage.getItem("bgmVolume") == 0.3){
					localStorage.setItem("bgmVolume", 0);
					parent.bgmPlay(parent.cntPage);
				}else{
					localStorage.setItem("bgmVolume", 0.3);
					parent.bgmPlay(parent.cntPage);
				}
				break;
			case "2":
				//효과음
				if(localStorage.getItem("effVolume") == 0.3){
					localStorage.setItem("effVolume", 0);
					parent.narr2Play(-1);
					parent.narr4Play(-1);
				}else{
					localStorage.setItem("effVolume", 0.3);
					parent.effectPlay("click_eff");
				}
				break;
		}
		optionInit();
	}
	function optionInit(){
		if(localStorage.getItem("bgmVolume") == 0){$('.setting_btn1 img').attr("src", 'images/setting_off.png');}
		else{$('.setting_btn1 img').attr("src", 'images/setting_on.png');}
		if(localStorage.getItem("effVolume") == 0){$('.setting_btn2 img').attr("src", 'images/setting_off.png');}
		else{$('.setting_btn2 img').attr("src", 'images/setting_on.png');}
	}
})