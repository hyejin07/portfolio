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
<body id="contact">
	<!-- header -->
	<?include 'include/header.php' ?>
	<!-- //header -->
	<!-- container -->
	<div class="container">
		<h2><em><span>젤리피쉬월드</span>는 <span>새로운 상상</span>을 꿈꾸는</em><em> <span>크리에이티브 집단</span>입니다.</em></h2>
		<div id="map">
			<!-- 서버에 업로드 후 작업 -->
		</div>
		<ul class="pc">
			<li>서울특별시 강남구 논현로 24길 17(도곡동) 2층 ㈜젤리피쉬월드 (우)06302</li>
			<li><span>TEL. 02-523-1282</span><span>FAX.02-088-1282</span></li>
			<li>Email. melanie@jellyfish-world.com</li>
		</ul>
		<ul class="mobile">
			<li>서울특별시 강남구 논현로 24길 17(도곡동) 2F</li>
			<li>T 02.523.1282 / F 02.588.1282</li>
			<li>melanie@jellyfish-world.com</li>
		</ul>
		<a href="mailto:melanie@jellyfish-world.com">contact US</a>
		<p>Copyright&copy;JellyfishWorld. All rights reserved. Since 2013</p>
		<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f97120772950c560d0f233b6c74a6e2e"></script>
		<script>
			var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
				mapOption = {
					center: new daum.maps.LatLng(37.48190, 127.04439), // 지도의 중심좌표
					level: 1, // 지도의 확대 레벨
					mapTypeId : daum.maps.MapTypeId.ROADMAP // 지도종류
				}; 

			// 지도를 생성한다 
			var map = new daum.maps.Map(mapContainer, mapOption); 

			// 지도에 마커를 생성하고 표시한다
			var marker = new daum.maps.Marker({
				position: new daum.maps.LatLng(37.48190, 127.04439), // 마커의 좌표
				map: map // 마커를 표시할 지도 객체
			});
		</script>


	</div>
	<!-- //container -->
</body>
</html>