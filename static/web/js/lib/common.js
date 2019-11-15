/*-----------------------------------------------------------
jquery-rollover.js　※「_on」画像を作成し、class="over"を付ければOK
-------------------------------------------------------------*/
function initRollOverImages() {
  var image_cache = new Object();
  $("img.over").each(function(i) {
    var imgsrc = this.src;
    var dot = this.src.lastIndexOf('.');
    var imgsrc_on = this.src.substr(0, dot) + '_on' + this.src.substr(dot, 4);
    image_cache[this.src] = new Image();
    image_cache[this.src].src = imgsrc_on;
    $(this).hover(
      function() { this.src = imgsrc_on; },
      function() { this.src = imgsrc; });
  });
}
$(document).ready(initRollOverImages);

/*-----------------------------------------------------------
common
-------------------------------------------------------------*/
$(function() {
	var isiDevice = /android|ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
	if (!isiDevice) {
		$(".calling").unwrap();
	}
	
	/* menu header SP */
	// $('.hamburger, .naviSet .close, .naviSet .gNavi li a').click(function(){
	// 	$("body").toggleClass("layerOn");  //origin
	// });
	$('.hamburger').click(function(){
		$("body").toggleClass("layerOn"); //edited, dont add class layerOn into "body" to load script. dont know why, but it ran :D
	});
	
	/* pageTop */
	$(window).scroll(function(){
		if($(this).scrollTop() > 0){
			$(".pageTop").addClass('show');
		}else{
			$(".header").removeClass('show');
		}
	});
	
	/* for gNavi PC */
	if($(window).width() > 767){
		var btn = $(".jubeno_subMenu");
		
		var submenu = $(".navSub");

		$(btn).click(function(){
			var shownav = $(this).find(".navSub");
			if($(shownav).css("display")=="none") {
				$(shownav).slideDown("fast");
				$(this).addClass('active');
			}else{
				$(shownav).slideUp("fast");
				$(this).removeClass('active');
			}
		})

		$(btn).hover(function() {
			var shownav = $(this).find(".navSub");
			if($(shownav).css("display")=="none") {
				$(shownav).slideDown("fast");
				$(this).addClass('active');
			}else{
				$(shownav).slideUp("fast");
				$(this).removeClass('active');
			}
		},
		function(){
			$(submenu).slideUp("fast");
			$(this).removeClass('active');
		});
	}
	/* end gNavi PC */
	
	
	
	
	
	
	
});