/* 검색 및 정렬 이벤트 -성현 */
$(function() {

	$('#searchKeyword').focus();
	
	// 처음화면에 모든 레시피들을 보여준다
	search('newest', $('#order-latest-btn').val());
	
	// 검색버튼 클릭 검색 이벤트
	$('#searchBtn').click(function() {
		$("body").scrollTop(0);
		search('newest', $('#order-latest-btn').val());			    
	});
	
	// 키보드에서 뗐을때의 검색 이벤트	
	$('#searchKeyword').keyup( function(){
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

// 처음 검색했을때의 1페이지 결과 가져오기
function search(sort,order){ 
			
	var page = $('#recipe-card-searchPage-template').text();
	var compilePage = Handlebars.compile(page);
	
	var source = $('#recipe-card-search-template').text();
	var template = Handlebars.compile(source);
	
	$.ajax({
		url : 'recipe/listSearch.json',
		method : 'post',
		data : {
			searchKeyword : $('#searchKeyword').val(),
			searchCondition : $("#searchCondition-select option:selected").val(),
			sortCondition : sort,
			orderCondition : order
		},
		dataType : 'json',
		success : function(result) {
			if (result.status != 'success') {
				swal('실패 ~');
				return;
			}
			
			$('#search-result > div').remove();			
			$('.searchResult > .row').append(template(result));

			methods();
			$('#recipe-count').text('총 '+result.recipeCount+'개의 레시피가 검색되었습니다.');
			$('#search-pageNo').attr('value', '1');
		},
		error : function() {
			swal('서버 요청 오류 !')
		}
	})	
}

// 스크롤 끝까지 내렸을때 추가될 결과 한페이지씩 가져오기
function searchScrollAppend(){ 
		
	var page = $('#recipe-card-searchPage-template').text();
	var compilePage = Handlebars.compile(page);
	
	var source = $('#recipe-card-search-template').text();
	var template = Handlebars.compile(source);
		
	if($('#sort-condition').val() == 'newest'){
		var order = $('#order-latest-btn').val();		
	} else {
		var order = $('#order-grade-btn').val();
	}
	
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
				orderCondition : order
			},
			dataType : 'json',
			success : function(result) {
				if (result.status != 'success') {
					swal('실패 ~');
					return;
				}
				$('.searchResult > .row').append(template(result));
				
				if(result.data != 'lastPage'){
					$('#search-pageNo').val(result.pageNo);
				} else {
					$('#search-pageNo').val('lastPage');
				}
				methods();
			},
			error : function() {
				swal('서버 요청 오류 !')
			}

		})
	}
}


function methods(){
	  idOptions();	
	  mouseHover();

// 자동완성 기능





//----------------------------------------고재현 부분--------------------------------------------//

}

Handlebars.registerHelper('isLike', function(options) {
	 
	  if (this.likeUser!=0) {
	    return options.fn(this);
	  } else {
	    return options.inverse(this);
	  }
});
	  
	  
//-------------------------- 화살표, 좋아요, 음식사진 ID로직 ---------------------------------

function idOptions(){
	  
	    for(var i=0; i<$('.thumbnail').length; i++){
	    	
//			Name태그는 동일한 이름이 있을 시, 먼저 있는것부터 index 값을 주게된다.  
//	    	eq로 몇번째의 타겟인지 판별해주면 그 것을 캐치해낼 수 있다.
	   
//	    	--------------------- 왼쪽, 오른쪽 화살표를 클릭하면 내용이 변동되는 부분 -----------------------	    	
	    	$('div[name="myCarousel"]:eq('+i+') > a').attr('href','div[name="myCarousel"]:eq('+i+')');
//	    	--------------------- 화살표 부분 끝 ---------------------------
	    	
//	    	--------------------- 화면이(width) 일정 이상 작아지면 리스트가 3,2,1개로 줄어드는 로직 ---------------- 	
	    	var index = i % 4;
	    	
	    	 if(index == 2){
				  $('.rcp-order > div:nth-child(2)').attr("class","col-xs-3 col-sm-3 col-md-3 visible-sm rcp-list-margin rcp-list-margin");
			  }
			  if(index == 3){
				  $('.rcp-order > div:nth-child(3)').attr("class","col-sm-3 col-md-3 visible-md rcp-list-margin rcp-list-margin");
			  }			  
			  if(index == 0 ){
				  $('.rcp-order > div:nth-child(4)').attr("class","col-md-3 visible-lg rcp-list-margin rcp-list-margin");
			  }
	    	
	    }
}
//	  -------------------------------------for 문 끝 -------------------------------------

//--------------------------  음식사진 커서 올리면 바뀌게 되는 로직 --------------------------------- 
function mouseHover(){
	  var time;
	  for(var j=0;  j<$('.thumbnail').length; j++){
		  $("img[name='rcp-list-images']:eq("+j+")").hover(function(event){
			  this.src = "img/3.jpg";
			  time= setTimeout(function(){
				  $(event.target).attr('src',"img/4.jpg");
			  },1500);
		  }, function(){
			  this.src = "img/2.jpg";
		  }).mouseleave(function(){
			  clearTimeout(time);
		  });
	  }
}
//--------------------------  음식사진 커서 올리면 바뀌게 되는 로직 끝 ---------------------------------

function comList(){
	  $(document).on('click', '.rcp-userName',function(event){
		  event.preventDefault();

		  $(location).attr('href','http://localhost:8080/community.html');

		  if($(event.target).is('b[name="like"]') ){
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
					 if($(event.target).is('b[name="like"]') ){
						 $(event.target).parent().append('<b class="rcp-like" id="rcp-like">좋아요</b>');
						 $(event.target).remove();
						 
					 }
					 
				  },
				  error:function(){
					  swal('like : 서버 요청 오류');
				
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
					  $(event.target).parent().append('<b class="rcp-like" id="rcp-like" name="like" style="color:#337ab7">좋아요</b>');
					  $(event.target).remove();
					  
				  },
				  error:function(){
					  swal('ajax likeclick: 서버 요청 오류');
				  }
			  });
		  }
	  })
}





//
////----------------------------------------고재현 부분--------------------------------------------//
//function mathods(listNum,result){
//	  idOptions(result);	
//	  mouseHover(result,listNum);
//	  likeUp(listNum,result);
//	  likeLogic(listNum,result);
//}
//
//
////-------------------------- 메인 펼쳐졌을 때 좋아요 누른 게시글 파랗게 보이게 하는 펑션 -----------------------
//
//function likeUp(listNum, result){
//
//
//	  for(var j=0; j< result.data.length; j++){
//		 
//		  if(result.data[j].likeDate != null &&  eval(sessionStorage.getItem('data'))[0].userNo == result.data[j].likeUser){
//			  $('#list'+listNum+'240'+j+' .rcp-heart b').attr('name','like');
//			  $('#list'+listNum+'240'+j+' .rcp-heart b').css('color','#337ab7');
//			  $('#list'+listNum+'240'+j+' .rcp-heart b').parent().parent().css('color','#337ab7');		
//		  }else{
//			  $('#list'+listNum+'240'+j+' .rcp-heart b').attr('name','');
//		  }
//	  }
//
//}
//
//
//
////-------------------------- 좋아요 등록, 해제 로직---------------------------------
//
//function likeLogic(listNum, result){
//	  
//	  $(document).on('click',('.list'+listNum+' .rcp-like'),function(event){
//		  event.preventDefault();
//		  if($(event.target).is('b[name="like"]') ){
//			  $.ajax({
//				  url:'recipe/likeDown.json?recipeNo=' + $(event.target).parent()
//				  .parent().parent().children('input[name="recipeNo"]').val()+"&userNo="
//				  + eval(sessionStorage.getItem('data'))[0].userNo,
//				  dataType:'json',
//				  method:'get',
//				  success:function(){
//					  console.log("like down 성공성공");
//					  $(event.target).css('color','#231f20');
//					  $(event.target).parent().parent().css('color','#231f20');
//					 if($(event.target).is('b[name="like"]') ){
//						 $(event.target).parent().append('<b class="rcp-like" id="rcp-like">좋아요</b>');
//						 $(event.target).remove();
//						 
//					 }
//					 
//				  },
//				  error:function(){
//					  alert('like : 서버 요청 오류');
//				
//				  }
//			  });
//		  }
//		  else{
//			  $.ajax({
//				  url:'recipe/likeUp.json?recipeNo=' + $(event.target).parent()
//				  .parent().parent().children('input[name="recipeNo"]').val()+"&userNo="
//				  +  eval(sessionStorage.getItem('data'))[0].userNo,
//				  dataType:'json',
//				  method:'get',
//				  success:function(){
//					  console.log("like up 성공성공");
//					  $(event.target).css('color','#337ab7');
//					  $(event.target).parent().parent().css('color','#337ab7');
//					  $(event.target).parent().append('<b class="rcp-like" id="rcp-like" name="like" style="color:#337ab7">좋아요</b>');
//					  $(event.target).remove();
//					  
//				  },
//				  error:function(){
//					  alert('ajax likeclick: 서버 요청 오류');
//				  }
//			  });
//		  }
//	  })
//}
//
//
////-------------------------- 화살표, 좋아요, 음식사진 ID로직 ---------------------------------
//
//function idOptions(result){
//	  
//	  var list= result.data;
//	  
//	  for(var k=0; k<$('.rcp-list').length; k++){		  
//		  for(var j=0; j<result.data.length; j++){
//
//			  $('.list'+k+' .row > div:nth-child('+(j+1)+') .rcp-240').attr("id","list"+k+"240"+j);
//			  $('.list'+k+' #search-result > div:nth-child('+(j+1)+') #myCarousel').attr("id","list"+k+"myCarousel"+j);
//			  $('.list'+k+' #search-result > div:nth-child('+(j+1)+') .rcp-left-slideButton').attr("href","#list"+k+"myCarousel"+j);
//			  $('.list'+k+' #search-result > div:nth-child('+(j+1)+') .rcp-right-slideButton').attr("href","#list"+k+"myCarousel"+j);
//			  $('.list'+k+' .row > div:nth-child('+(j+1)+') .image1').attr("id","list"+k+"image"+j);
//
//		  }
//	  }
//}
// 
//
////--------------------------  음식사진 커서 올리면 바뀌게 --------------------------------- 
//function mouseHover(result,listNum){
//	  var time;
//	  for(var j=0; j<result.data.length; j++){
//		  $("#list"+listNum+" #list"+listNum+"image"+j).hover(function(event){
//			  console.log("여기옴 ?");
//		  this.src = "img/3.jpg";
//		  time= setTimeout(function(){
//			  $(event.target).attr('src',"img/4.jpg");
//		  },1500);
//	  }, function(){
//		  this.src = "img/2.jpg";
//	  }).mouseleave(function(){
//		  clearTimeout(time);
//	  });
//	  }
//}








