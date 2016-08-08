$(function(){
	$('.detail').on('click', function(){
		$('#detail_pop_up').bPopup({
			follow: [false, false], //x, y
			onOpen:function(){
				$("body").css("overflow", "hidden");
			},
			onClose:function(){ 
				$("body").css("overflow", "auto");
			}
			
			});
			
		});
	});
//
//(function($){
//    $.aniPage=function(e,type){
//        if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0){
//            $(".contInner").animate({
//                scrollTop:$(window).scrollTop()-$(window).height()
//            },800,function(){
//                    $.aniOk = 0;
//            });
//        }else{
//            $(".rcp-body").animate({
//                scrollTop:$(window).scrollTop()+$(window).height()
//            },800,function(){
//                    $.aniOk = 0;
//            });
//        }
//    };
//})(jQuery);
//$(function(){
//    $(".contInner").height($(window).height());
//    $.aniOk=0;
//    $(window).scrollTop(0);
//});
//$(document).on("mousewheel DOMMouseScroll",function(e){
//    e.preventDefault();
//    if($.aniOk == 0){
//        $.aniPage(e,e.type);
//        $.aniOk = 1;
//    }
//});
