/* 검색버튼 이벤트 -성현 */
$(function() {	
		
	$('#searchBtn').click(function() {
		search();			    
	});
	
	$('#searchKeyword').keydown( function(){
		if(event.keyCode == '13') search();
	});
});

function search(){ 
	var userNo = 0; 
	var a = eval(sessionStorage.getItem('data'));		
	if(a != null){
		userNo = eval(sessionStorage.getItem('data'))[0].userNo;
	}
	
	var source = $('#recipe-card-search-template').text();
	var template = Handlebars.compile(source);			

	$.ajax({
		url : 'recipe/listSearch.json',
		method : 'post',
		data : {
			searchKeyword : $('#searchKeyword').val(),				
			userNo : userNo
		},
		dataType : 'json',
		success : function(result) {
			if (result.status != 'success') {
				alert('실패 ~');
				return;
			}			
			$('#search-result > div').remove();
			$('.searchResult > .row').append(template(result));
			mathods(0,result);
			$('#recipe-count').text(result.recipeCount+' 개의 레시피가 검색되었습니다.');
		},
		error : function() {
			alert('서버 요청 오류 !')
		}
	})	
}

function mathods(listNum,result){
	  idOptions(result);	
	  mouseHover(result,listNum);
	  likeUp(listNum,result);
	  likeLogic(listNum,result);
}


//-------------------------- 메인 펼쳐졌을 때 좋아요 누른 게시글 파랗게 보이게 하는 펑션 -----------------------

function likeUp(listNum, result){


	  for(var j=0; j< result.data.length; j++){
		 
		  if(result.data[j].likeDate != null &&  eval(sessionStorage.getItem('data'))[0].userNo == result.data[j].likeUser){
			  $('#list'+listNum+'240'+j+' .rcp-heart b').attr('name','like');
			  $('#list'+listNum+'240'+j+' .rcp-heart b').css('color','#337ab7');
			  $('#list'+listNum+'240'+j+' .rcp-heart b').parent().parent().css('color','#337ab7');		
		  }else{
			  $('#list'+listNum+'240'+j+' .rcp-heart b').attr('name','');
		  }
	  }

}



//-------------------------- 좋아요 등록, 해제 로직---------------------------------

function likeLogic(listNum, result){
	  
	  $(document).on('click',('.list'+listNum+' .rcp-like'),function(event){
		  event.preventDefault();
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
					  $(event.target).parent().append('<b class="rcp-like" id="rcp-like" name="like" style="color:#337ab7">좋아요</b>');
					  $(event.target).remove();
					  
				  },
				  error:function(){
					  alert('ajax likeclick: 서버 요청 오류');
				  }
			  });
		  }
	  })
}


//-------------------------- 화살표, 좋아요, 음식사진 ID로직 ---------------------------------

function idOptions(result){
	  
	  var list= result.data;
	  
	  for(var k=0; k<$('.rcp-list').length; k++){	
		  console.log(k);
		  for(var j=0; j<result.data.length; j++){

			  $('.list'+k+' .row > div:nth-child('+(j+1)+') .rcp-240').attr("id","list"+k+"240"+j);
			  $('.list'+k+' #search-result > div:nth-child('+(j+1)+') #myCarousel').attr("id","list"+k+"myCarousel"+j);
			  $('.list'+k+' #search-result > div:nth-child('+(j+1)+') .rcp-left-slideButton').attr("href","#list"+k+"myCarousel"+j);
			  $('.list'+k+' #search-result > div:nth-child('+(j+1)+') .rcp-right-slideButton').attr("href","#list"+k+"myCarousel"+j);
			  $('.list'+k+' .row > div:nth-child('+(j+1)+') .image1').attr("id","list"+k+"image"+j);

		  
//			  if(result.data[1]){
//				  $('.list'+k+' > .row > div:nth-child(2)').attr("class","col-xs-3 col-sm-3 col-md-3 visible-sm rcp-list-margin rcp-list-margin");
//			  }
//			  if(result.data[2]){
//				  $('.list'+k+' > .row > div:nth-child(3)').attr("class","col-sm-3 col-md-3 visible-md rcp-list-margin rcp-list-margin");
//			  }
//
//			  if(result.data[3]){
//				  $('.list'+k+' > .row > div:nth-child(4) ').attr("class","col-md-3 visible-lg rcp-list-margin rcp-list-margin");
//			  }
		  }
	  }
}
 

//--------------------------  음식사진 커서 올리면 바뀌게 --------------------------------- 
function mouseHover(result,listNum){
	  var time;
	  for(var j=0; j<result.data.length; j++){
		  $("#list"+listNum+" #list"+listNum+"image"+j).hover(function(event){
			  console.log("여기옴 ?");
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







