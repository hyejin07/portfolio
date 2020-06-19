var originalWid = 1600;
var originalHei = 1000;
var w, h, screen, containScale;
var loading = false;
function mobileRatio(){
	w = $(window).width();
	h = $(window).height();
	var ratio = Math.min(w / originalWid, h / originalHei);
	var containScale = (originalWid * ratio) / originalWid;
	$('.container').css({'transform':'scale('+ (w / originalWid) +', '+ (h / originalHei) +')'});
	loading = true;
}
$(window).on('load resize', function(){
	mobileRatio();
	if(loading){
		$('.loadWrap').addClass('on');
        TweenMax.to($('.container'), 0, {opacity:0});
        TweenMax.to($('.container'), 0.5, {delay:0, opacity:1});
	}
})