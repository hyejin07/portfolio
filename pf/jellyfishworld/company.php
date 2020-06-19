<!DOCTYPE html>
<html lang="ko">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">	
	<title>Jellyfish World</title>	
	<link rel="shortcut icon" href="images/favicon.ico" />
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
	<link rel="stylesheet" href="css/font.css">
	<link rel="stylesheet" href="css/layout2.css">
	<link rel="stylesheet" href="css/sub.css">
	<script type="text/javascript" src="js/jquery-3.3.1.min.js"></script>
	<script type="text/javascript" src="js/common.js"></script>
	
</head>
<body id="company">
	<div id="modal" class="modal">	
		<div id="news-wrap">
			<div class="news-img">
				<img src="images/news.jpg" alt="젤리피쉬월드, 교육용 솔루션 r&d로 신 비즈니스 영역 확장" />
			</div>
			<div class="close-wrap cf">
				<a href="javascript:;" class="not-today"><span></span>오늘 이 창을 보지 않음</a>
				<a href="#" class="close">닫기</a>
			</div>
		</div>
	</div>
	<?include 'include/header.php' ?>
	<!-- //header -->
	<!-- container -->
	<div class="container">
		<h2>COMPANY</h2>
		<h3><em>젤리피쉬월드</em>는 <em>새로운 상상</em>을 <span>꿈꾸는 크리에이티브 집단입니다.</span></h3>
		<strong>당신의 꿈을 창작합니다.<br/>미래를 기획하고 상상을 제작합니다.	</strong>
		<p>
			젤리피쉬월드를 찾아주신 당신을 진심으로 환영합니다.	<br/>
			젤리피쉬월드는 2008년 6월 애니메이션 스튜디오로 멀티미디어콘텐츠 기획·제작을 시작했습니다. <br/>		
			현재 <strong>TV 애니메이션, E-BOOK, 디지털 교과서, 홍보·CF 동영상, 캐릭터</strong> 등 다양한 분야의 콘텐츠 기획·제작을 맡고 있습니다.<br/>
			고부가가치의 콘텐츠 기술(CT)은 전세계가 주목하는 사업입니다. <br/>
			하루가 다르게 변하고 진화하는 시장 상황에 맞춰 저희 젤리피쉬월드는 새로운 스토리와 참신한 아이디어로 기획력을 강화하고, <br/>
			제작 및 마케팅, 영업을 분담하는 네트워크를 구축하여 고객의 니즈를 충족하는 사업체로 자리잡고 있습니다.<br/>
			<br/>
			감사합니다.
		</p>
	</div>
	<!-- //container -->
	<!-- animation_container -->
	<div class="company_ani">
		<img class="on" src="ani/4/1.png" alt="history animation" />
	</div>
	<script>
		var aninum = 60,
			newsImg;
		var ani_cnt = 0;
		var chkbool = false;

		for (var i = 0; i < aninum ; i++){			
			newImg = '<img src="ani/4/' + (i+1) + '.png" alt="history animation"/>';
			$('.company_ani').append(newImg);
		}
		
		setInterval(ani , 1000/24);
		function ani() {
			$('.company_ani img').removeClass('on');
			$('.company_ani img').eq(ani_cnt).addClass('on');
			if(ani_cnt == aninum){
				ani_cnt = 0;
				chkbool = true;	
			}else {
				ani_cnt++;
			}
			if(chkbool){
				$('.company_ani img').removeClass('on');
				$('.company_ani img').eq(ani_cnt).addClass('on');
			}else{
				$('.company_ani img').eq(ani_cnt).addClass('on');
				$('.company_ani img').eq(ani_cnt).ready(function(){
					$('.company_ani img').eq(ani_cnt-2).removeClass('on');
				})
			}
		}

		$('#news-wrap .not-today').on('click', function(){
			setCookieMobile( "todayCookie", "done" , 1);
			$(".modal").hide();
		})

		getCookieMobile();

		function setCookieMobile ( name, value, expiredays ) {
		    var todayDate = new Date();
		    todayDate.setDate( todayDate.getDate() + expiredays );
		     console.log(name, value, expiredays);
		    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
		    console.log(document.cookie);

		}
		function getCookieMobile () {
		    var cookiedata = document.cookie;
		    console.log(cookiedata.indexOf("todayCookie=done"));
		    if ( cookiedata.indexOf("todayCookie=done") < 0 ){
		         $(".modal").show();
		    }
		    else {
		        $(".modal").hide();
		    }
		}

	</script>
</body>
</html>