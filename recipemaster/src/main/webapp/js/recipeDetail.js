document.write('<script type"text/javascript" src="js/common.js"></script>')
document.write('<script type"text/javascript" src="js/login.js"></script>')


var userInfo = getUserInfo();
var detailInfoTemp = $('#recipe-detail-304-info-template').html();
var comDetailInfoTemp = Handlebars.compile(detailInfoTemp);   

var detailImageMain = $('#recipe-detail-main-images-template').html();
var comDetailImageMain = Handlebars.compile(detailImageMain); 

var detailImageStep = $('#recipe-detail-step-images-template').html();
var comDetailImageStep = Handlebars.compile(detailImageStep); 

var recipeComment = $('#recipe-comment').html();
var comRecipeComment = Handlebars.compile(recipeComment);

var recipeAddComment = $('#recipe-comment-addForm').html();
var comRecipeAddComment = Handlebars.compile(recipeAddComment); 

var slider;

$(function(){

	recipeDetail();
	comment();
	addComment();
	deleteComment();
	recipeScrap();
})


	Handlebars.registerHelper("inc", function(value, options){
			{
		return parseInt(value) + 1;
			}
	});

Handlebars.registerHelper('x-button', function(options) {
	console.log("userNo : "+this.userNo)
	if(userInfo != null && userInfo.userNo == this.userNo){
	
	    return options.fn(this); 
	}
	});




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
				$('div[name="rcp-explanation"]:eq(1)').text(result.data.intro);
				
				$('#detail_pop_up').bPopup({
					position: (['auto','auto']),
					positionStyle :[('fixed')],
					follow: [false, false], //x, y
					onOpen:function(){
						var detailMainTemp = $('#recipe-detail-main-template').html();
						var comDetailMainTemp = Handlebars.compile(detailMainTemp); 

						var detailTemp = $('#recipe-detail-template').html();
						var comDetailTemp = Handlebars.compile(detailTemp); 

 						
						$("body").css("overflow", "hidden");						
						$('.rcp-304').append( comDetailInfoTemp(result) );
						$('.rcp-info-images').append( comDetailImageMain(result.data) );										
						$('.rcp-detail-body').append( comDetailMainTemp(result.data) );
						$('.rcp-detail-body').append( comDetailTemp(result.data) );
						$('.rcp-info-images').append( comDetailImageStep(result.data) );		
						slider = $('.rcp-detail-body').bxSlider({
							startSlide:0,
							mode:'vertical',
							pager: false,
							moveSlides: 1,
							infiniteLoop:false
						});
						console.log("result data ll : "+result.data);
						
						$('.rcp-detail-body').css('transform', 'translate3d(0px, 0px, 0px)');
						
						for(var i=0; i<$('.rcp-body').length; i++){
							$('div[name="rcp-body"]:eq('+i+')').attr('id',"div"+i);
							$('a[name="rcp-nav-images"]:eq('+i+')').attr('href','#div'+i);
							$('a[name="rcp-nav-bgImages-button"]:eq('+i+')').attr('href','#div'+i);
						}
//						
//						$(document).on('click','.rcp-info-images-emts',function(event){
//							event.preventDefault();
//							var div = $(event.target).parent().attr('href');
//							console.log(div);
//							$(location).attr('href',div);
//						})


						if( userInfo != null ){										
							if(result.data.scrapUser == userInfo.userNo){
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
						$(".rcp-detail-body").remove()
						$(".bx-wrapper").remove();;
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
		commentFunction();
		
	})
}

function commentFunction(){
	$.ajax({
		url : 'recipe/recipeComment.json',
		method : 'post',
		data:{
			recipeNo:$('.rcp-hidden-recipeNo').val()
		},
		dataType : 'json',
		success : function(result) {
			$(".rcp-detail-body").remove();
			$(".rcp-720").html('<div class="rcp-header">'
					+'<h2 class="title">댓글</h2>'
					+'<h3 class="rcp-comment-count"></h3>'
					+'</div>'
					+'<div class="rcp-detail-body"></div>');
		
			if(result.data.length <1) {
				$('.rcp-comment-count').text("등록된 댓글이 아직 없습니다.");
			}else{					
				$('.rcp-comment-count').text(result.data[0].countComment+" Comments");
				
			}		
		
			$('.rcp-detail-body').append( comRecipeComment(result) );				
			$('.rcp-detail-body').append( comRecipeAddComment(result) );
			$('#forCommentRecipeNumber').val( $('.rcp-hidden-recipeNo').val());
			
		},error : function(){
			swal('서버 요청 오류');
		}		
	})
}

function addComment(){
	$(document).on('click','input[name="rcp-submit"]',function(){
		$.ajax({
			url:'recipe/addComment.json',
			dataType:'json',
			method:'post',
			data:{
				recipeNo:$('#forCommentRecipeNumber').val(),
				recipeComment:$('textarea[name="recipeComment"').val()
			},
			success:function(result){
				if(userInfo == null){
					swal('로그인 부탁염 ^오^');
					return ;
				}
				console.log('커맨트 성공성공')
				commentFunction();
			},
			error:function(){
				alert('addComment 에러욤 !!')
			}
		})
	})
}

function deleteComment(){
	$(document).on('click','#deleteComment',function(event){
	event.preventDefault();
	deleteCommentFunction(event);
	})
}

function deleteCommentFunction(event){
	console.log('펑션왔나요 ')
		$.ajax({
			url:'recipe/deleteComment.json',
			dataType:'json',
			method:'post',		
			data:{
				commentNo : $(event.target).parent().children('#commentNo').val()
			},
			success:function(result){
				console.log('comment delete 성공성공 ^^');
				commentFunction();
			},
			error:function(){
				console.log('comment delete 실패실패 ㅠㅠ');
			}
		
		})	
}

function recipeScrap(){
	$(document).on('click','.rcp-detail-scrap',function(event){
		event.preventDefault();
		if($(event.target).parent().is('[name="scrap"]')){
			console.log(' 딜리트 여기옴?');			
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
