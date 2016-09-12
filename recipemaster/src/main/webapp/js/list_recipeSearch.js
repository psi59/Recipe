
//document.write('<script type"text/javascript" src="js/recipeDetail.js"></script>')



/* 검색 및 정렬 이벤트 -성현 */
$(document).ready(function(){
	
	// url에 QueryString의 검색어로 검색결과 보여줌
	urlParams = getUrlParams();	
	if(urlParams.sk != undefined){		
		$('#searchKeyword').val(decodeURIComponent(urlParams.sk));
	}	
	if(urlParams.sc != undefined){		
		$('#searchCondition-select').val(decodeURIComponent(urlParams.sc));
	}
	
	// 처음화면에 모든 레시피들을 보여준다
	search('newest', $('#order-latest-btn').val());
	
	// 검색창에 포커스
	$('#searchKeyword').focus();
	
	// 검색버튼 클릭 검색 이벤트
	$('#searchBtn').click(function() {
		$("body").scrollTop(0);
		search('newest', $('#order-latest-btn').val());			    
	});
	// 키보드에서 뗐을때의 검색 이벤트	
	$('#searchKeyword').keyup(function(){
		$("body").scrollTop(0);
		search('newest', $('#order-latest-btn').val());		
	})
	
	// 카테고리 라벨 변경 이벤트
	$('input[type=checkbox]').change(function(){		
		$("body").scrollTop(0);
		search('newest', $('#order-latest-btn').val());
	})
		
	// 최신순 정렬
	$('#order-latest-btn').click(function(){		
		if($('#order-latest-btn').val() == 'DESC'){
			$('#order-latest-btn h2').text('최신순▲');
			$('#order-latest-btn').val('ASC')
		} else if($('#order-latest-btn').val() == 'ASC'){
			$('#order-latest-btn h2').text('최신순▼');
			$('#order-latest-btn').val('DESC')
		}
		$('#sort-condition').val('newest');
		search($('#sort-condition').val(), $('#order-latest-btn').val());
	});
	
	// 평점순 정렬
	$('#order-grade-btn').click(function(){
		if($('#order-grade-btn').val() == 'DESC'){
			$('#order-grade-btn h2').text('평점순▲');
			$('#order-grade-btn').val('ASC')
		} else if($('#order-grade-btn').val() == 'ASC'){
			$('#order-grade-btn h2').text('평점순▼');
			$('#order-grade-btn').val('DESC')
		}
		$('#sort-condition').val('grade');
		search($('#sort-condition').val(), $('#order-grade-btn').val());
	});
	
	// 스크롤을 끝까지 내렸을때 레시피 카드 생성
	$(window).scroll(function() { 
	    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
	    	searchScrollAppend();
	    }
	});

	// 자동완성 기능
	var options = {
			  url: function(phrase) {
				  console.log(phrase);
			    return "recipe/recipeSearchAutoComplete.json?searchValue="+phrase;
			  },

			  getValue: function(element) {
				console.log(element);
			    return element;
			  },

			  ajaxSettings: {
			    dataType: "json",
			    method: "GET"
			  },
			  requestDelay: 400,
			  
		      list: {
		          showAnimation: {
		            type: "slide", //normal|slide|fade
		            time: 200
		          },

		          hideAnimation: {
		            type: "slide", //normal|slide|fade
		            time: 200
		          },
		          onChooseEvent: function() {
		            
		          }
		      }
		};
		
	//$('#searchKeyword').easyAutocomplete(options);
	
	// 고재현
	$(document).on('click',('.rcp-like'),function(event){
		  event.preventDefault();
		  if($(event.target).is('.active') ){
			  $.ajax({
				  url:'recipe/likeDown.json?recipeNo=' + $(event.target).parent()
				  .parent().parent().children('input[name="recipeNo"]').val()+"&userNo="
				  + eval(sessionStorage.getItem('data'))[0].userNo,
				  dataType:'json',
				  method:'get',
				  success:function(){
					  console.log("like down 성공성공");
					  $(event.target).css('color','#231f20');
					  $(event.target).parent().parent().css('color','#231f20');
					  $(event.target).parent().parent().children('.glyphicon-heart-empty').attr('class','glyphicon glyphicon-heart-empty')
					  $(event.target).parent().append('<b class="rcp-like" name="rcp-like">좋아요</b>');
					  $(event.target).remove();
					  
				  },
				  error:function(){
					  alert('like : 서버 요청 오류');
					  
				  }
			  });
		  }
		  else{
			  $.ajax({
				  url:'recipe/likeUp.json?recipeNo=' + $(event.target).parent()
				  .parent().parent().children('input[name="recipeNo"]').val()+"&userNo="
				  +  eval(sessionStorage.getItem('data'))[0].userNo,
				  dataType:'json',
				  method:'get',
				  success:function(){
					  console.log("like up 성공성공");
					  $(event.target).css('color','#337ab7');
					  $(event.target).parent().parent().css('color','#337ab7');
					  $(event.target).parent().append('<b class="rcp-like active" name="rcp-like">좋아요</b>');
					  $(event.target).remove();
					  
				  },
				  error:function(){
					  alert('ajax likeclick: 서버 요청 오류');
				  }
			  });
		  }
	  });

});

// 처음 검색했을때의 1페이지 결과 가져오기 -이성현
function search(sort,order){ 
			
	var page = $('#recipe-card-searchPage-template').text();
	var compilePage = Handlebars.compile(page);
	
	var source = $('#temp').text();
	var template = Handlebars.compile(source);
	
	var categoryList = '';
	$('#rcp-category-section input[type=checkbox]:checked').each(function(index){
		if(index !== ($('#rcp-category-section input[type=checkbox]:checked').length-1)){
			categoryList += $(this).val()+','; 
		} else {
			categoryList += $(this).val();
		}				
	})	
	
	$.ajax({
		url : 'recipe/listSearch.json',
		method : 'post',
		data : {
			searchKeyword : $('#searchKeyword').val(),
			searchCondition : $("#searchCondition-select option:selected").val(),
			sortCondition : sort,
			orderCondition : order,
			categoryList : categoryList	
		},		
		dataType : 'json',
		success : function(result) {
			setTimeout(function() {
				if (result.status != 'success') {
					swal('실패 ~');
					return;
				}
				$('.wrap-loading').removeClass('display-none');
				$('#tabs-1 .hs-content .container .row div').remove();			
				$('#tabs-1 .hs-content .container .row').append(template(result));
	
				mouseMoveEventForSubscribeImage(result);
				$('#recipe-count').text('총 '+result.recipeCount+'개의 레시피가 검색되었습니다.');
				$('#search-pageNo').attr('value', '1');	
			}, 1100)
		},
		// 데이터 조회 중일때 로딩 이미지 보여주기
		beforeSend:function(){			  
			$('.wrap-loading').removeClass('display-none');
			$('html').css("cursor","wait");
		},
		// 데이터 받아왔을때 로딩 이미지 감추기
		complete:function(){
			setTimeout(function() {
				$('.wrap-loading').addClass('display-none');
				$('html').css("cursor","auto");
			}, 1100)
		},
		error : function() {
			swal('서버 요청 오류 !')
		}
	})	
}



Handlebars.registerHelper("representImages", function(value, options){
	{			
		return value[0]
		//return value;
	}
});  



// 스크롤 끝까지 내렸을때 추가될 결과 한페이지씩 가져오기 -이성현
function searchScrollAppend(){ 
		
	var page = $('#recipe-card-searchPage-template').text();
	var compilePage = Handlebars.compile(page);
	
	var source = $('#temp').text();
	var template = Handlebars.compile(source);
		
	if($('#sort-condition').val() == 'newest'){
		var order = $('#order-latest-btn').val();		
	} else {
		var order = $('#order-grade-btn').val();
	}
	
	var categoryList = '';
	$('#rcp-category-section input[type=checkbox]:checked').each(function(index){
		if(index !== ($('#rcp-category-section input[type=checkbox]:checked').length-1)){
			categoryList += $(this).val()+','; 
		} else {
			categoryList += $(this).val();
		}				
	})	
	
	if($('#search-pageNo').val() != 'lastPage'){
		var pageNo = parseInt($('#search-pageNo').val())+1;
		$.ajax({
			url : 'recipe/listSearch.json',
			method : 'post',
			data : {					
				pageNo : pageNo,
				searchKeyword : $('#searchKeyword').val(),
				searchCondition : $("#searchCondition-select option:selected").val(),
				sortCondition : $('#sort-condition').val(),
				orderCondition : order,
				categoryList : categoryList	
			},
			dataType : 'json',
			success : function(result) {
				setTimeout(function() {
					if (result.status != 'success') {
						swal('실패 ~');
						return;
					}
					$('#tabs-1 .hs-content .container .row').append(template(result));
					
					mouseMoveEventForSubscribeImage(result);
					
					if(result.data != 'lastPage'){
						$('#search-pageNo').val(result.pageNo);
					} else {
						$('#search-pageNo').val('lastPage');
					}					
				}, 500)
			},
			// 데이터 조회 중일때 로딩 이미지 보여주기
			beforeSend:function(){			  
				$('.wrap-loading').removeClass('display-none');
				$('html').css("cursor","wait");
			},
			// 데이터 받아왔을때 로딩 이미지 감추기
			complete:function(){
				setTimeout(function() {
					$('.wrap-loading').addClass('display-none');
					$('html').css("cursor","auto");
				}, 500)
			},
			error : function() {
				swal('서버 요청 오류 !')
			}

		})
	}
}

// url QueryString 가져오는 function
function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
} 






//----------------------------------------고재현 부분--------------------------------------------//


Handlebars.registerHelper('isLike', function(options) {
	 
	  if (this.likeUser!=0) {
	    return options.fn(this);
	  } else {
	    return options.inverse(this);
	  }
});
	  


//-------------고재현 09-05 수정-----------------------
$(function(){
	
	Handlebars.registerHelper("representImages", function(value, options){
		{			
	return value[0];
		}
});  	
	
})

function mouseMoveEventForSubscribeImage(result){
				$(document).on('mousemove','.entry-action',function(event){
					if( $(event.target).attr('class') == 'entry-action' ){					
						var imageChange = parseInt( $('.entry-action').width() + 1)  / $(event.target).parent().parent().children('input[type="hidden"]').length;					
						var image = parseInt(event.offsetX / imageChange);					
						$(event.target).parent().attr("style", "background-image:url(img/representImg/"
							+$(event.target).parent().parent().children('input[type="hidden"]:eq('+image+')').val()+"); background-size : cover;");
						
						
						
					}else{
						console.log('여기옴 ? actioninner');
						var imageChange = parseInt( $('.entry-action-inner').width() + 1)  / $(event.target).parent().parent().parent().children('input[type="hidden"]').length;
						var image = parseInt(event.offsetX / imageChange);								
						$(event.target).parent().attr("style", "background-image:url(img/representImg/"
								+$(event.target).parent().parent().parent().children('input[type="hidden"]:eq('+image+')').val()+"); background-size : cover;");
						
					}
				})
	}


	






