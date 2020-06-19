var loading;

var sequenceArr = [60, 80, 164];
var ani_check = [0, 0, 0];
var generateImg;
var ani_cnt = [0, 0, 0];

var cnt = 0;
var txt = "Loading...";
var speed = 100;


$(function(){
	aniLoad();
	init();	
	$('svg, img, a').on('dragstart', function(){return false});
	setInterval(function(){
		mainAnimation(1);
		mainAnimation(2);
		mainAnimation(3);
	}, 1000/24);
})

function init(){
	typeWriter();
	setTimeout(function(){
		$('#loading').addClass('loaded');
	},3000)
}

// 로딩화면 타입 문자
function typeWriter() {
  if (cnt < txt.length) {
		document.getElementById("demo").innerHTML += txt.charAt(cnt);
		cnt++;
		setTimeout(typeWriter, speed);
  }
}

function aniLoad(){
	for(var i =0; i < 3; i++){
		while(ani_check[i] < sequenceArr[i]){
			ani_check[i]++;
			generateImg = '<img src="ani/'+ (i+1) +'/'+ani_check[i]+'.png" alt="animation'+(i+1)+'"/>';
			$('.ani'+(i+1)).append(generateImg);
		}	
	}	
}
var chkbool = false;
function mainAnimation(num) {
	if(ani_cnt[num-1] == sequenceArr[num-1]){
		 ani_cnt[num-1]=0;
	}else {
		ani_cnt[num-1]++;
	}

	//console.log("num", num);
	if(ani_cnt[num-1]==164){
		chkbool = true;
	}
	if(chkbool){
		$('.ani'+num+' img').removeClass('on');
		$('.ani'+num+' img').eq(ani_cnt[num-1]).addClass('on');
	}else{
		$('.ani'+num+' img').eq(ani_cnt[num-1]).addClass('on');
		$('.ani'+num+' img').eq(ani_cnt[num-1]).ready(function(){
			$('.ani'+num+' img').eq(ani_cnt[num-1]-2).removeClass('on');
		})
	}
}