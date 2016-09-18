document.write('<script type"text/javascript" src="js/common.js"></script>')
document.write('<script type"text/javascript" src="js/login.js"></script>')
document.write('<script type"text/javascript" src="js/common/starrating.js"></script>')

var detailInfoTemp = $('#recipe-detail-304-info-template').html();
var comDetailInfoTemp = Handlebars.compile(detailInfoTemp);   

var detailImageMain = $('#recipe-detail-main-images-template').html();
var comDetailImageMain = Handlebars.compile(detailImageMain); 

var detailImageStep = $('#recipe-detail-step-images-template').html();
var comDetailImageStep = Handlebars.compile(detailImageStep);

var detailMainTemp = $('#recipe-detail-main-template').html();
var comDetailMainTemp = Handlebars.compile(detailMainTemp); 

var detailTemp = $('#recipe-detail-template').html();
var comDetailTemp = Handlebars.compile(detailTemp); 

var recipeComment = $('#recipe-comment').html();
var comRecipeComment = Handlebars.compile(recipeComment);

var recipeAddComment = $('#recipe-comment-addForm').html();
var comRecipeAddComment = Handlebars.compile(recipeAddComment); 

var slider;
var userInfo = getUserInfo();

$(function(){
	recipeDetail();
	starRatingBtn();
	comment();
	addComment();
	deleteComment();
	recipeScrap();
	recipeDetailLike();
	clickDetailInDetailFunction();
	timerStart();
	push((userInfo==null ? null:userInfo.email),'','login');
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

function timerStart() {
	$(document).on('click', '.timerBtn', function() {
		var $this = $(this);
		var node = $('<div class="timerObj"/>');
		var clock = $('<div class="timerClock float_left"></div>');		
		clock.countdown(getTimeStamp($this.next().next().val()))
		.on('update.countdown', function(event) {
		  var format = '%H:%M:%S';
		  $(this).html(event.strftime(format));
		})
		.on('finish.countdown', function(event) {
		  $(this).html('00:00:00').parent().css("color", "red")
		  $this.removeClass('display_none');
		  $this.next().addClass('display_none');
		  var audio = document.createElement('audio');
		  audio.src = 'audio/porori.mp3'
		  audio.play();
		});
		
		node.append($('<span class="float_left">'+$this.prev().text()+' -&nbsp;<span>'));
		node.append(clock);
		
		$('.timerZone').append(node);
		$this.addClass('display_none');
		$this.next().removeClass('display_none');
		
//		$(document).on('click', '.timerObj', function() {
//			console.log($(this).children('.timerClock'));
//			$($(this).children('.timerClock')).countdown('pause');
//		});
	});
}


function clickDetailInDetailFunction(){
	$(document).on('click','.rcp-first-info',function(event){
		event.preventDefault();
		$.ajax({
			url : contextRoot+'recipe/recipeDetail.json',
			method : 'post',
			data:{
				recipeNo:$(event.target).children('input[name="recipeNo"]').val()
			},
			dataType : 'json',
			success : function(result) {
				if (result.status != 'success') {
					swal('게시물 조회 오류');
					return;
				}
				//$('.rcp-720').remove();
				$(".rcp-720").html('<div class="rcp-header">'
									+'<h2 class="title"></h2>'
									+'<p class="hash"></p>'
									+'<p class="date"></p>'
									+'<div class="timerZone"></div>'
									+'<hr/></div>'
									+'<div class="rcp-detail-body"></div>');
				$('.rcp-header > .title').text(result.data.recipeName);
				$('.rcp-header > .date').text(result.data.recipeDate);
				$('.hash').text(result.data.intro);
				$('div[name="rcp-explanation"]:eq(1)').text(result.data.intro);
				
				$('.rcp-detail-body').append( comDetailMainTemp(result.data) );
				$('.rcp-detail-body').append( comDetailTemp(result.data) );
				
				
				// 별점주기 팝업
				$('#rcp-star-rating').on('click', function(){
					$('.rcp-starrating').bPopup();
				})
				
				slider = $('.rcp-detail-body').bxSlider({
					startSlide:0,
					mode:'vertical',
					pager: false,
					moveSlides: 1,
					infiniteLoop:false,
					controls:false
				});
				$('.rcp-mainSlider').bxSlider({
					startSlide:0,
					pager: false,
					moveSlides: 1,
					infiniteLoop:false, 
				});

				$('.rcp-detail-body').on("mousewheel", function (event) {
					var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
					init_scroll(event, delta, slider)
				});
				
				console.log("result data ll : "+result.data);
				
				$('.rcp-detail-body').css('transform', 'translate3d(0px, 0px, 0px)');
				
				for(var i=0; i<$('.rcp-body').length; i++){
					$('div[name="rcp-body"]:eq('+i+')').attr('id',"div"+i);
					$('a[name="rcp-nav-images"]:eq('+i+')').attr('href','#div'+i);
					$('a[name="rcp-nav-bgImages-button"]:eq('+i+')').attr('href','#div'+i);
				}
		}
	,
	error : function(){
		swal('서버 요청 오류');
	}
				
		})
		
	})
}

function recipeDetail(){
	$(document).on('click','.detail',function(event) {		
		event.preventDefault();
		console.log(event.target);
		$.ajax({
			url : contextRoot+'recipe/recipeDetail.json',
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
				$('.rcp-first-info').children('input[name="recipeNo"]').val(result.data.recipeNo);
				$('.rcp-header > .title').text(result.data.recipeName);
				$('.rcp-header > .date').text(result.data.recipeDate);
				$('.hash').text(result.data.intro);
				$('div[name="rcp-explanation"]:eq(1)').text(result.data.intro);
				
				$('#detail_pop_up').bPopup({
					position: (['auto','auto']),
					positionStyle :[('fixed')],
					follow: [false, false], //x, y
					onOpen:function(){
						checkDuplicateGrade();
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
							infiniteLoop:false,
							controls:false
						});
						console.log("result data ll : "+result.data);
						
						$('.rcp-detail-body').css('transform', 'translate3d(0px, 0px, 0px)');
						
						for(var i=0; i<$('.rcp-body').length; i++){
							$('div[name="rcp-body"]:eq('+i+')').attr('id',"div"+i);
							$('a[name="rcp-nav-images"]:eq('+i+')').attr('href','#div'+i);
							$('a[name="rcp-nav-bgImages-button"]:eq('+i+')').attr('href','#div'+i);
						}
						
					$('.rcp-mainSlider').bxSlider({
						startSlide:0,
						pager: false,
						moveSlides: 1,
						infiniteLoop:false, 
					});

					$('.rcp-detail-body').on("mousewheel", function (event) {
						var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
						init_scroll(event, delta, slider)
					});
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
								$('.rcp-scrap-button-text').css('color',' #ffce6e');
								$('.rcp-detail-scrap').attr('style','color:#ffce6e');
								$('.rcp-detail-scrap i').attr('style','color:#ffce63');
							}else{									
								$('.rcp-scrap-button-text').attr('name','');
								$('.rcp-scrap-button-text').css('border','1px solid white');
								$('.rcp-scrap-button-text').css('color','white');
								$('.rcp-detail-scrap').css('color','white');
								$('.rcp-detail-scrap i').css('color','white');	
							}
							
							if(result.data.likeUser != 0 ){
								$('.rcp-scrap-button-text-like').attr('name','like');
								$('.rcp-scrap-button-text-like').css('border','1px solid #ffce6e');
								$('.rcp-scrap-button-text-like').css('color',' #ffce6e');
								$('.rcp-detail-like').attr('style','color:#ffce6e');
								$('.rcp-detail-like i').attr('style','color:#ffce63');
							}else{									
								$('.rcp-scrap-button-text-like').attr('name','');
								$('.rcp-scrap-button-text-like').css('border','1px solid white');
								$('.rcp-scrap-button-text-like').css('color','white');
								$('.rcp-detail-like').css('color','white');
								$('.rcp-detail-like i').css('color','white');	
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
						$(".bx-wrapper").remove();
						$(".rcp-720").html('<div class="rcp-header">'
											+'<h2 class="title"></h2>'
											+'<p class="hash"></p>'
											+'<p class="date"></p></div>'
											+'<div class="timerZone"></div>'
											+'<hr/></div>'
											+'<div class="rcp-detail-body"></div>');
						// 별점주기 팝업
						$('#rcp-star-rating').on('click', function(){
							$('.rcp-starrating').bPopup();
						})
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


function recipeDetailLike(){	
	$(document).on('click','.rcp-scrap-button-text-like ',function(event){		
		console.log('event.target'+$(event.target).attr('class'));
console.log('button 시점 recipeNo : ' +$(event.target).parent().parent().children('input[class="rcp-hidden-recipeNo"]').val())


		event.preventDefault();
		if($(event.target).is('[name="like"]')){
			  $.ajax({
				  url:contextRoot+'recipe/likeDown.json?recipeNo=' + $(event.target).parent().parent().
				  children('input[class="rcp-hidden-recipeNo"]').val()+"&userNo="
				  + userInfo.userNo,
				  dataType:'json',
				  method:'get',
				  success:function(){
					  console.log("like down 성공성공");
						$('.rcp-scrap-button-text-like').attr('name','');
						$('.rcp-scrap-button-text-like').css('border','1px solid white');
						$('.rcp-scrap-button-text-like').css('color','white');
						$('.rcp-detail-like').attr('style','color:white');
						$('.rcp-detail-like i').attr('style','color:white');					  
				  },
				  error:function(){
					  swal('like : 서버 요청 오류');
				
				  }
			  });
		  }
		  else{
			  $.ajax({
				  url:contextRoot+'recipe/likeUp.json?recipeNo=' + $(event.target).parent().parent().
				  children('input[class="rcp-hidden-recipeNo"]').val()+"&userNo="
				  + userInfo.userNo,
				  dataType:'json',
				  method:'get',
				  success:function(){
					  console.log("like up 성공성공");
						$('.rcp-scrap-button-text-like').attr('name','like');
						$('.rcp-scrap-button-text-like').css('border','1px solid #ffce6e');
						$('.rcp-scrap-button-text-like').css('color',' #ffce6e');
						$('.rcp-detail-like').attr('style','color:#ffce6e');
						$('.rcp-detail-like i').attr('style','color:#ffce63');					  
				  },
				  error:function(){
					  swal('ajax likeclick: 서버 요청 오류');
				  }
			  });
		  }
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
		url : contextRoot+'recipe/recipeComment.json',
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
			url:contextRoot+'recipe/addComment.json',
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
				push('bbb@naver.com',("like"+"/"+userInfo.email+"/"+userInfo.name+"/"+userInfo.image+"/"+"13"+"/"+"타이머테스트2"), "message");
				console.log($('.rcp-hidden-email').val());
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
			url:contextRoot+'recipe/deleteComment.json',
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


//----------------------Like function 끝--------------------

function recipeScrap(){
	$(document).on('click','.rcp-scrap-button-text',function(event){		
		event.preventDefault();		
		if($(event.target).is('[name="scrap"]')){
			console.log(' 딜리트 여기옴?');			
			$.ajax({
				url:contextRoot+'recipe/deleteScrap.json',
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
					$('.rcp-scrap-button-text').css('color','white');
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
				url:contextRoot+'recipe/scrap.json',
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
					$('.rcp-scrap-button-text').css('color',' #ffce6e');
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

var lastAnimation =0;

function init_scroll(event, delta, slider) {
    deltaOfInterest = delta;
    var timeNow = new Date().getTime();
    // Cancel scroll if currently animating or within quiet period
    if(timeNow - lastAnimation < 500 + 700) {
        event.preventDefault();
        return;
    }

    if (deltaOfInterest < 0) {
      slider.goToNextSlide();
    } else {
      slider.goToPrevSlide();
    }
    lastAnimation = timeNow;
}

function getTimeStamp(time) {
	  var d = addMinutes(new Date(), time);
	  var s =
	    leadingZeros(d.getFullYear(), 4) + '/' +
	    leadingZeros(d.getMonth() + 1, 2) + '/' +
	    leadingZeros(d.getDate(), 2) + ' ' +

	    leadingZeros(d.getHours(), 2) + ':' +
	    leadingZeros(d.getMinutes(), 2) + ':' +
	    leadingZeros(d.getSeconds(), 2);

	  return s;
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

function leadingZeros(n, digits) {
	  var zero = '';
	  n = n.toString();

	  if (n.length < digits) {
	    for (i = 0; i < digits - n.length; i++)
	      zero += '0';
	  }
	  return zero + n;
}