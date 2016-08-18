
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


  Handlebars.registerHelper("inc", function(value, options)
		  {
		      return parseInt(value) + 1;
 });
  
	$(function(){
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
						alert('게시물 조회 오류');
						return;
					}
					console.log(result);
					$('.rcp-header > .title').text(result.data.recipeName);
					$('.rcp-header > .date').text(result.data.recipeDate);
					$('.hash').text(result.data.intro);
					$('#detail_pop_up').bPopup({
						follow: [false, false], //x, y
						onOpen:function(){
							$("body").css("overflow", "hidden");
							$('.rcp-720 > .rcp-detail-body').append( comDetailTemp(result) );
							$('.rcp-304').append( comDetailInfoTemp(result) );
							$('.rcp-304 .rcp-info-images').append( comDetailImageMain(result) );
							$('.rcp-304 .rcp-info-images > .rcp-detail-step').append( comDetailImageStep(result) );
				
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
							$(".rcp-304 > .detail-images").remove();
							$(".rcp-body").remove();
							$(".rcp-main").remove();
							$(".rcp-detail-step").remove();
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
	
//	----------------------스크랩 요청 AJAX--------------------
	
//	--------------------스크랩 해제 ------------------------------		
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
							alert('게시물 조회 오류');
							return;
						}
						$('.rcp-scrap-button-text').attr('name','');
						$('.rcp-scrap-button-text').css('border','1px solid white');
						$('.rcp-detail-scrap').attr('style','color:white');
						$('.rcp-detail-scrap i').attr('style','color:white');
					},
					error : function(){
						alert('서버 요청 오류');
						
					}
				})
			
		}else{
//		-------------------------------스크랩 등록 --------------------------------
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
					alert('로그인 부탁염 ^^*');
					return;
					}
					
					$('.rcp-scrap-button-text').attr('name','scrap');
					$('.rcp-scrap-button-text').css('border','1px solid #ffce6e');
					$('.rcp-detail-scrap').attr('style','color:#ffce6e');
					$('.rcp-detail-scrap i').attr('style','color:#ffce63');
				},
				error : function(){
					alert('서버 요청 오류');
					}
				})
		}
//		----------------------스크랩 요청 AJAX 끝--------------------
			})
})	
})