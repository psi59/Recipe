
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

//		var lastScrollTop = 0, delta = 5;
//		$(window).scroll(function(){
//		var nowScrollTop = $(this).scrollTop();
//		if(Math.abs(lastScrollTop - nowScrollTop) >= delta){
//		if (nowScrollTop > lastScrollTop){
//		slider.goToNextSlide();
//		} else {
//		slider.goToPrevSlide();
//		}
//		lastScrollTop = nowScrollTop;
//		}
//		});


		$(document).on('click','.detail',function(event) {
			event.preventDefault();
			console.log($(event.target).parent().children('input[name="recipeNo"]').val());
			$.ajax({
				url : 'recipe/recipeDetail.json',
				method : 'post',
				data:{
					recipeNo:$(event.target).parent().children('input[name="recipeNo"]').val()
				},
				dataType : 'json',
				success : function(result) {
					if (result.status != 'success') {
						swal('게시물 조회 오류');
						return;
					}
					console.log(result);
					console.log(result.data.recipeDetail.indexOf('ge"'));
					$('.rcp-header > .title').text(result.data.recipeName);
					$('.rcp-header > .date').text(result.data.recipeDate);
					$('.hash').text(result.data.intro);
					$('#detail_pop_up').bPopup({
						follow: [false, false], //x, y
						onOpen:function(){
							$("body").css("overflow", "hidden");
							$('.rcp-detail-body').append( comDetailTemp(result) );
							$('.rcp-304').append( comDetailInfoTemp(result) );
							$('.rcp-info-images').append( comDetailImageMain(result) );
							$('.rcp-detail-step').append( comDetailImageStep(result) );
							slider = $('.rcp-detail-body').bxSlider({
								mode:'vertical',
								pager: false,
								moveSlides: 1
							});

							if( eval(sessionStorage.getItem('data')) != null ){			
								if(result.data.scrapUser == eval(sessionStorage.getItem('data'))[0].userNo){
									$('.rcp-scrap-button-text').attr('name','scrap');
									$('.rcp-scrap-button-text').css('border','1px solid #ffce6e');
									$('.rcp-detail-scrap').attr('style','color:#ffce6e');
									$('.rcp-detail-scrap i').attr('style','color:#ffce63');
								}else{
									$('.rcp-scrap-button-text').attr('name','');
									$('.rcp-scrap-button-text').css('border','1px solid white');
									$('.rcp-detail-scrap').css('color','white');
									$('.rcp-detail-scrap i').css('color','white');	
								}
							}
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
					swal('서버 요청 오류');
				}
			});
		});		
	})
});		
//$(function(){
//$('.detail').click(function() {
//$.ajax({
//url : 'recipe/recipeDetail.json?recipeNo=' + $('input[name="recipeNo"]').val(),
//method : 'get',
//dataType : 'json',
//success : function(result) {
//if (result.status != 'success') {
//swal('게시물 조회 오류');
//return;
//}

//}
//,
//error : function(){
//swal('서버 요청 오류');
//}
//});
//});		
//})


//----------------------스크랩 요청 AJAX--------------------

//--------------------스크랩 해제 ------------------------------		
$(function(){
	$(document).on('click','.rcp-detail-scrap',function(event){
		event.preventDefault();
		if($(event.target).parent().is('[name="scrap"]')){
			console.log('여기옴?');			
			$.ajax({
				url:'recipe/deleteScrap.json',
				method:'post',
				dataType:'json',
				data: {
					recipeNo:$('.rcp-hidden-recipeNo').val()
				},
				success:function(result){
					if (result.status != 'success') {
						swal('게시물 조회 오류');
						return;
					}
					$('.rcp-scrap-button-text').attr('name','');
					$('.rcp-scrap-button-text').css('border','1px solid white');
					$('.rcp-detail-scrap').attr('style','color:white');
					$('.rcp-detail-scrap i').attr('style','color:white');
				},
				error : function(){
					swal('서버 요청 오류');

				}
			})

		}else{
//			-------------------------------스크랩 등록 --------------------------------
			console.log('여기옴? else문 ');	
			event.preventDefault();	
			$.ajax({
				url:'recipe/scrap.json',
				method:'post',
				dataType:'json',
				data: {
					recipeNo:$('.detail-images .rcp-hidden-recipeNo').val()
				},
				success:function(result){


					if(result.status == 'notLogin'){
						swal('로그인 부탁염 ^^*');
						return;
					}

					$('.rcp-scrap-button-text').attr('name','scrap');
					$('.rcp-scrap-button-text').css('border','1px solid #ffce6e');
					$('.rcp-detail-scrap').attr('style','color:#ffce6e');
					$('.rcp-detail-scrap i').attr('style','color:#ffce63');
				},
				error : function(){
					swal('서버 요청 오류');
				}
			})
		}
//		----------------------스크랩 요청 AJAX 끝--------------------
	})
});
