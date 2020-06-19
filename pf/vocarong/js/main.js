var cntLesson = 1;
var totalLesson = 10;
var cntPage = 0;
var totalPage = 5;
var frsbool = true;
var coinplus = 1000;
var price = 10000;

if(localStorage.getItem("lesson") == null)localStorage.setItem("lesson", 1);
cntLesson = localStorage.getItem("lesson");

if(localStorage.getItem("coin") == null)localStorage.setItem("coin", 0);

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function movePage($path){
	console.log("movePage", $path);
	switch($path){
		case "prev":
			if(cntPage!=1){
				parent.effectPlay("click_eff");
				parent.narr2Play(-1);
				parent.narr4Play(-1);
				cntPage--;
				$('iframe').attr('src', 'page'+cntPage+'.html');
				TweenMax.to($('.container'), 0, {opacity:0.5});
      			TweenMax.to($('.container'), 0.5, {delay:0, opacity:1});
			}
			break;
		case "next":
			if(cntPage!=totalPage){
				parent.effectPlay("click_eff");
				parent.narr2Play(-1);
				parent.narr4Play(-1);
				cntPage++;
				$('iframe').attr('src', 'page'+cntPage+'.html');
				TweenMax.to($('.container'), 0, {opacity:0.5});
      			TweenMax.to($('.container'), 0.5, {delay:0, opacity:1});
			}
			break;
		case $path:
			cntPage = $path;
			$('iframe').attr('src', 'page'+cntPage+'.html');
			//TweenMax.to($('iframe'), 0, {opacity:0});
			//TweenMax.to($('iframe'), 0.5, {delay:2, opacity:1});
			break;
	}
}
$(function(){
	$('.start_btn').on("click", function(e){
		console.log("start");
		parent.effectPlay("start_eff");
	});
})
function mainCall(e){
	console.log('mainCall');
	window.location.href = 'http://www.geniehye.com/pf/vocarong/main.html';
}