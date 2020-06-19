var originalWid = 1600;
var originalHei = 1000;
var w, h, screen, containScale;
function mobileRatio(){
	w = $(window).width();
	h = $(window).height();
	var ratio = Math.min(w / originalWid, h / originalHei);
	var containScaleWid = (originalWid * ratio) / originalWid;
	$('.container').css({'transform':'scale('+ (w / originalWid) +', '+ (h / originalHei) +')'});
}
$(window).on('load resize', function(){
	mobileRatio();
})