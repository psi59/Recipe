var detailTemp = $('#recipe-detail-template').html();
var comDetailTemp = Handlebars.compile(detailTemp); 

var detailInfoTemp = $('#recipe-detail-304-info-template').html();
var comDetailInfoTemp = Handlebars.compile(detailInfoTemp);   

var detailImageMain = $('#recipe-detail-main-images-template').html();
var comDetailImageMain = Handlebars.compile(detailImageMain); 

var detailImageStep = $('#recipe-detail-step-images-template').html();
var comDetailImageStep = Handlebars.compile(detailImageStep); 

var recipeComment = $('#recipe-comment').html();
var comRecipeComment = Handlebars.compile(recipeComment); 

var slider;


$(function(){
	handlebarsIndexNumbering();
	handlebarsRecipeBodys();
	recipeDetail();
	comment();
	
})


function handlebarsIndexNumbering(){
	Handlebars.registerHelper("inc", function(value, options)
			{
		return parseInt(value) + 1;
			});
}

function handlebarsRecipeBodys(){
	Handlebars.registerHelper("rcpBody", function(value1,value2, options){
		console.log("parse1"+(value1.length));
		console.log("parse2"+(value2));
		return (value1) + (value2);
	});
}




function recipeDetail(){	
	$(document).on('click','.detail',function(event) {		
		event.preventDefault();
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
				$('.rcp-header > .title').text(result.data.recipeName);
				$('.rcp-header > .date').text(result.data.recipeDate);
				$('.hash').text(result.data.intro);
				$('#detail_pop_up').bPopup({
					follow: [false, false], //x, y
					onOpen:function(){
						$("body").css("overflow", "hidden");						
						$('.rcp-304').append( comDetailInfoTemp(result) );
						$('.rcp-info-images').append( comDetailImageMain(result) );
						$('.rcp-detail-step').append( comDetailImageStep(result) );
						$('.rcp-detail-body').append( comDetailTemp(result) );
						slider = $('.rcp-detail-body').bxSlider({
							mode:'vertical',
							pager: false,
							moveSlides: 1

						});
						console.log("result data ll : "+result.data);
//						for(var i = 0 ; i < result.data.representImages.length; i++){
//							console.log("result Data : "+result.data.representImages);
//							$('div[name="rcp-body"]:eq('+i+') .rcp-images').attr('src','img/representImg/'+result.data.representImages[i]);
//				
//						}
						for(var i = 0; i <result.data.recipeProcedure.length; i++){

							$('div[name="rcp-body"]:eq('+(i)+') .rcp-images').attr('src','img/recipeImg/'+result.data.recipeProcedure[i].recipeProduceImage);
							$('div[name="rcp-body"]:eq('+(i)+') .rcp-explanation p').text(result.data.recipeProcedure[i].recipeProduce);

						}



						if( eval(jsonData) != null ){										
							if(result.data.scrapUser == eval(jsonData)[0].userNo){
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
						$(".rcp-detail-body").remove();
						$(".bx-wrapper").remove();
						$(".rcp-720").html('<div class="rcp-header">'
								+'<h2 class="title">매콤 대패삼겹살 볶음</h2>'
								+'<p class="hash">#돼지고기 #대패삼겹살 #야식 #간단고기요리 #매콤고기</p>'
								+'<p class="date">2016.07.21</p><hr /></div>'
								+'<div class="rcp-detail-body"></div>');
//						$("#detail_pop_up_reload").attr('id','detail_pop_up');
					}

				});

			} 
			,
			error : function(){
				swal('서버 요청 오류');
			}
		});
	});
}

function comment(){
	$(document).on('click','.rcp-seconde-info',function(evnet){
		evnet.preventDefault();
		$.ajax({
			url : 'recipe/recipeComment.json',
			method : 'post',
			data:{
				recipeNo:$('.rcp-hidden-recipeNo').val()
			},
			dataType : 'json',
			success : function(result) {
				$(".rcp-detail-body").remove();

				console.log(result.data);
				console.log(result.user);
				$(".rcp-720").html('<div class="rcp-header">'
						+'<h2 class="title">댓글</h2>'
						+'<h3 class="rcp-comment-count"></h3>'
						+'</div>'
						+'<div class="rcp-detail-body"></div>');
						
				$('.rcp-comment-count').text(result.data[0].countComment+" Comments");
				$('.rcp-detail-body').append( comRecipeComment(result) );

			},error : function(){
				swal('서버 요청 오류');
			}		
		})
	})
}



function recipeScrap(){
	$(document).on('click','.rcp-detail-scrap',function(event){
		event.preventDefault();
		if($(event.target).parent().is('[name="scrap"]')){
			console.log('여기옴?');			
			$.ajax({
				url:'recipe/deleteScrap.json',
				method:'post',
				dataType:'json',
				data: {
					recipeNo : $(event.target).parent().parent().parent().children('input[class="rcp-hidden-recipeNo"]').val()
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
			console.log($(event.target).parent().parent().parent().children('input[class="rcp-hidden-recipeNo"]').val());
			event.preventDefault();	
			$.ajax({
				url:'recipe/scrap.json',
				method:'post',
				dataType:'json',
				data: {
					recipeNo : $(event.target).parent().parent().parent().children('input[class="rcp-hidden-recipeNo"]').val()
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
};
