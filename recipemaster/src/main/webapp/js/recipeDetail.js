//$(function(){
//	$(document).on('click','.detail', function(){
//		$('#detail_pop_up').bPopup({
//			follow: [false, false], //x, y
//			onOpen:function(){
//				$("body").css("overflow", "hidden");
//			},
//			onClose:function(){ 
//				$("body").css("overflow", "auto");
//			}
//			
//			});
//			
//		});
//	});

$(function(){
  var detailTemp = $('#recipe-detail-template').html();
  var comDetailTemp = Handlebars.compile(detailTemp); 

  var detailInfoTemp = $('#recipe-detail-304-info-template').html();
  var comDetailInfoTemp = Handlebars.compile(detailInfoTemp);   
  
  var detailImageMain = $('#recipe-detail-main-images-template').html();
  var comDetailImageMain = Handlebars.compile(detailImageMain); 

  var detailImageStep = $('#recipe-detail-step-images-template').html();
  var comDetailImageStep = Handlebars.compile(detailImageStep); 
  
  var slider;


  Handlebars.registerHelper("inc", function(value, options)
		  {
		      return parseInt(value) + 1;
 });
  
	$(function(){
//		
//		var lastScrollTop = 0, delta = 5;
//		 $(window).scroll(function(){
//			 var nowScrollTop = $(this).scrollTop();
//			 if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
//				 if (nowScrollTop > lastScrollTop){
//					 slider.goToNextSlide();
//				 } else {
//					 slider.goToPrevSlide();
//				 }
//				 lastScrollTop = nowScrollTop;
//			 }
//		 });
		
		
		$(document).on('click','.detail',function(event) {
			console.log($(event.target).parent().children('input[name="recipeNo"]').val());
			$.ajax({
				url : 'recipe/recipeDetail.json?recipeNo=' + $(event.target).parent().children('input[name="recipeNo"]').val(),
				method : 'get',
				dataType : 'json',
				success : function(result) {
					if (result.status != 'success') {
						alert('게시물 조회 오류');
						return;
					}
					$('.rcp-header > .title').text(result.data.recipeName);
					$('.rcp-header > .date').text(result.data.recipeDate);
					$('#detail_pop_up').bPopup({
						follow: [false, false], //x, y
						onOpen:function(){
							$("body").css("overflow", "hidden");
							$('.rcp-detail-body').append( comDetailTemp(result) );
							$('.rcp-304').append( comDetailInfoTemp(result) );
							$('.rcp-info-images').append( comDetailImageMain(result) );
							$('.rcp-detail-step').append( comDetailImageStep(result) );
							slider = $('.rcp-detail-body').bxSlider({
//								  mode:'vertical',
								  pager: false,
								  moveSlides: 1
							});
						},
						onClose:function(){ 
							$("body").css("overflow", "auto");
							$(".detail-images").remove();
							$(".rcp-body").remove();
							$(".rcp-main").remove();
							$(".rcp-detail-step").remove();
							$(".bx-wrapper").remove();
							$(".rcp-720").html('<div class="rcp-header">'
									+'<h2 class="title">매콤 대패삼겹살 볶음</h2>'
									+'<p class="hash">#돼지고기 #대패삼겹살 #야식 #간단고기요리 #매콤고기</p>'
									+'<p class="date">2016.07.21</p><hr /></div>'
									+'<div class="rcp-detail-body"></div>');
						}
						
						});
						
					} 
			,
			error : function(){
				alert('서버 요청 오류');
			}
			});
		});		
	})
});		
//	$(function(){
//		$('.detail').click(function() {
//			$.ajax({
//				url : 'recipe/recipeDetail.json?recipeNo=' + $('input[name="recipeNo"]').val(),
//				method : 'get',
//				dataType : 'json',
//				success : function(result) {
//					if (result.status != 'success') {
//						alert('게시물 조회 오류');
//						return;
//					}
//					
//				}
//			,
//			error : function(){
//				alert('서버 요청 오류');
//			}
//			});
//		});		
//	})