document.write('<script type"text/javascript" src="js/common.js"></script>')
document.write('<script type"text/javascript" src="js/login.js"></script>')
document.write('<script type"text/javascript" src="js/template/naverLogin_implicit-1.0.2.js"></script>')

  var mainSection = $('#recipe-1-section').html();
  var comMainSection = Handlebars.compile(mainSection); 
  
  var main2Section = $('#recipe-2-section').html();
  var comMain2Section = Handlebars.compile(main2Section); 
  
  var mainRecomSection = $('#recipe-3-section').html();
  var comMainRecomSection = Handlebars.compile(mainRecomSection); 

  var mainRecomCtSection = $('#recipe-4-section').html();
  var comMainRecomCtSection = Handlebars.compile(mainRecomCtSection);   
  
  var source = $('#recipe-card-template').html();
  var template = Handlebars.compile(source); 
  
  var mainSubscribe = $('#temp').html();
  var commainSubscribe = Handlebars.compile(mainSubscribe);   
  
  var mainTemp = $('#mainTemp').html();
  var comMainTemp = Handlebars.compile(mainTemp);   
  
  var userInfo;
  $(function(){

	  // 네이버 사용자 프로필 조회
	  //naver_id_login.get_naver_userprofile("naverSignInCallback()");
	  
	  userInfo = getUserInfo();
	  Main1List();
	  likeLogic();
	  comList();	
	  goMyPage();
	  scroll();
	  scrapLogic();
  });
  

//--------------------------  인기 레시피 ---------------------------------
  
  function Main1List(){
	  
	  var userNo = 0;
	  
	  if(userInfo != null){
		  userNo = userInfo.userNo;
	  }	  
	  
	  $.ajax({	  		  
		  url:contextRoot+'recipe/list.json',
		  dataType:'json',
		  data:{
			userNo : userNo,  
			request : 1
		  },
		  method:'post',
		  success:function(result){
			  if (result.status !='success'){
				  swal('실행중 오류 발생');
				  return;
			  }
//			  $('#main-list > div').append( comMainSection(result) );
//			  $('.list0 > .row').append( template(result) );
			  
			  $('#tabs-1 .hs-content .container .row ').append(comMainTemp( result ) );
			  
//			  for(var i=0; i<result.data.length; i++){
//				  if(result.data[i].length > 1){				  
//					  $('.rcp-main-subscribe-userName0').attr('class','rcp-main-subscribe-userName'+i+1);
//					  $('.rcp-main-subscribe-userName'+i+1).text( (result.data[i] )[0].user.userName+"님의 레시피 정보");
//				  }
//			  }
			  
			  mouseMoveEventForImage(result);
			  mouseMoveEventForSubscribeImage(result);
			  
			  methods();
			  Main2List();
			  $('#popular-rcp-more').click(function(){
				  window.location.href = contextRoot+"list.html?more=popular";
			  })
		  },
		  error : function(){
			  console.log('ajax list1: 서버 요청 오류');
		  }
	  });
  }  
  
//--------------------------  최신 레시피---------------------------------
  
  function Main2List(){
	  
	  var userNo = 0;
	  
	  if(userInfo != null){
		  userNo = userInfo.userNo;
	  }	  
	  
	  $.ajax({
		  url:contextRoot+'recipe/list.json',
		  dataType:'json',
		  data:{
				userNo : userNo,  
				request : 2
			  },
		  method:'post',
		  success:function(result){
			  if (result.status !='success'){
				  swal('실행중 오류 발생');
				  return;
			  }
			  var list = result.data;
//			  $('#main-list > div').append( comMain2Section(result) );
//			  $('.list1 > .row').append( template(result) );
//			 
			  $('#tabs-2 .hs-content .container .row ').append(comMainTemp( result ) );
			  console.log('tab2'+result)
//			  for(var i=0; i<result.data.length; i++){
////				  for(var j=0; j<result.data[i].representImages.length; j++){
//					  $('.list1 div[name="recipe-image"]:eq('+i+')').attr('style','background-image:url(img/representImg/'+result.data[i].representImages[0]+')');
//
////				  }
//			  }
				
			  methods();
			  if(userInfo != null)
			  main3List();
			  MainRecomList()
			  // more 클릭시 리스트 페이지로 이동
			  $('#newest-rcp-more').click(function(){
				  window.location.href = contextRoot+"list.html";
			  })
		  },
		  error : function(){
			  console.log('ajax list2:서버 요청 오류');
		  }
	  });
  }  
  
  function main3List(){	  
	  $.ajax({
		  url :contextRoot+'recipe/userPage.json',
		  dataType : 'json',
		  method : 'post',
		  data:{
			  email: userInfo.email,
			  request:5
		  },
		  success : function(result) {
			 
			  if (result.status != 'success') {
				  alert('comList 실행 중 오류 발생');
				  return;
			  }
			  console.log(result.data.length);
			  if(result.data.length > 1  ){
				  $('.tabs-5 .rcp-h2-25px').text("구독정보");
			  }
			  console.log("dddddd: "+result.data[0]);
			  
			  for(var i=0; i<result.data.length; i++){
				  //console.log(result.data[i])
				  if(result.data[i].length > 1){	
					  console.log("if절 왔나요 ?? ");
					  $('#tabs-5 .hs-content .container .row ').append(commainSubscribe( (result.data[i]) ) );
					  $('.rcp-main-subscribe-userName0').attr('class','rcp-main-subscribe-userName'+i+1);
					  $('.rcp-main-subscribe-userName'+i+1).text( (result.data[i] )[0].user.userName+"님의 레시피 정보");
				  }
			  }
		  },
  error : function() {
	 alert('Main 구독 서버 요청 오류!...')
  }
});
}
  
function scroll(){
	$(window).scroll(function() { 
	    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
	    	console.log("scroll");
	    }
	});
}
  
  function methods(){
  	  idOptions();	
  	  mouseHover();
  	  
  }

  Handlebars.registerHelper('isLike', function(options) {
	  if (this.likeUser!=0) {
	    return options.fn(this);
	  } else {
	    return options.inverse(this);
	  }
});
  
  Handlebars.registerHelper('isScrap', function(options) {
	  if (this.scrapUser!=0) {
	    return options.fn(this);
	  } else {
	    return options.inverse(this);
	  }
});
  

  
  Handlebars.registerHelper('sessionUser', function(options) {
	  console.log("session : "+userInfo.email);
	  if ( userInfo != null) {
		  if( userInfo.email != null)			  
	    return options.fn(this);
	  } 
});
  
	Handlebars.registerHelper("countImage", function(value, options){
		{
			return "1 / "+value.length;
			//return "1 / ";
		}
});
 
	Handlebars.registerHelper("representImages", function(value, options){
		{			
			return value[0]
			//return value;
		}
});  
	
  
  
	  
  
//--------------------좋아요 등록, 해제 로직-------------------------------  
function likeLogic(){
	$(document).on('click','.rcp-like',function(event){
		  event.preventDefault();
		  if($(event.target).parent().is('.active') ){
			  $.ajax({
				  url:contextRoot+'recipe/likeDown.json?recipeNo=' + $(event.target).parent().parent().parent()
				  .children('input[name="recipeNo"]').val()+"&userNo="
				  + userInfo.userNo,
				  dataType:'json',
				  method:'get',
				  success:function(){
					  console.log("like down 성공성공");
					  $(event.target).css('color','#231f20');
					  $(event.target).parent().css('color','#231f20');
					  $(event.target).parent().children('.glyphicon-heart-empty').attr('class','glyphicon glyphicon-heart-empty')
					  $(event.target).parent().removeClass('active');
					  $(event.target).children('span').text( parseInt($(event.target).children('span').text())-1);

				  },
				  error:function(){
					  swal('like : 서버 요청 오류');
				
				  }
			  });
		  }
		  else{
	
			  $.ajax({
				  url:contextRoot+'recipe/likeUp.json?recipeNo=' + $(event.target).parent().parent().parent()
				 .children('input[name="recipeNo"]').val()+"&userNo="
				  +  userInfo.userNo,
				  dataType:'json',
				  method:'get',
				  success:function(){
					  console.log("like up 성공성공");
					  $(event.target).css('color','#337ab7');
					  $(event.target).parent().css('color','#337ab7');
					  $(event.target).parent().addClass('active');
					  $(event.target).children('span').text( parseInt($(event.target).children('span').text())+1 );
//					  $('[name="rcp-custom-list"]').remove();
//					  Main1List();
//					  
				  },
				  error:function(){
					  swal('ajax likeclick: 서버 요청 오류');
				  }
			  });
		  }
	  });
}

function scrapLogic(){
	$(document).on('click','.rcp-scrap',function(event){
		  event.preventDefault();
		  if($(event.target).parent().is('.active') ){
			  console.log("scrap if")
			  $.ajax({
				  url:contextRoot+'recipe/deleteScrap.json',
				  dataType:'json',
				  data:{
					recipeNo:$(event.target).parent().children('input[name="recipeNo"]').val() 
				  },
				  method:'post',
				  success:function(){
					  console.log("scrap down 성공성공");
					  $(event.target).css('color','#231f20');
					  $(event.target).parent().parent().css('color','#231f20');
					//  $(event.target).parent().parent().children('.glyphicon-heart-empty').attr('class','glyphicon glyphicon-heart-empty')
					  $(event.target).parent().removeClass('active');
					  $(event.target).children('span').text( parseInt($(event.target).children('span').text())-1);

				  },
				  error:function(){
					  swal('like : 서버 요청 오류');
				
				  }
			  });
		  }
		  else{
			  console.log("scrap else")
			  $.ajax({
				  url:contextRoot+'recipe/scrap.json',
				  dataType:'json',
				  data:{
					  recipeNo:$(event.target).parent().children('input[name="recipeNo"]').val() 
				  },
				  method:'post',
				  success:function(){
					  console.log("scrap up 성공성공");
					  $(event.target).css('color','#337ab7');
					  $(event.target).parent().parent().css('color','#337ab7');
					  $(event.target).parent().addClass('active');
					  $(event.target).children('span').text( parseInt($(event.target).children('span').text())+1 );
//					  $('[name="rcp-custom-list"]').remove();
//					  Main1List();
//					  
				  },
				  error:function(){
					  swal('ajax likeclick: 서버 요청 오류');
				  }
			  });
		  }
	  });
}

  
  
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

function mouseMoveEventForImage(result){
			$(document).on('mousemove','.rcp-image-scale',function(event){			
				var imageChange = parseInt( $('.rcp-image-scale').width() + 1)  / $(event.target).parent().children('input[type="hidden"]').length;				
				var image = parseInt(event.offsetX / imageChange);								
				this.style = "background-image:url(img/representImg/"+$(event.target).parent().children('input[type="hidden"]:eq('+image+')').val()+")";
				
				if(image != $(event.target).parent().children('input[type="hidden"]').length + 1){
				$(event.target).parent().children('.rcp-count-images').text(image+1+" / "+$(event.target).parent().children('input[type="hidden"]').length);
				}else{
					return;
				}
			})	
}


function mouseMoveEventForSubscribeImage(result){
			$(document).on('mousemove','.entry-action, .entry-action-inner',function(event){
				if( $(event.target).attr('class') == 'entry-action' ){					
					var imageChange = parseInt( $('.entry-action').width() + 1)  / $(event.target).parent().parent().children('input[type="hidden"]').length;					
					var image = parseInt(event.offsetX / imageChange);					
					$(event.target).attr("style", "background-image:url(img/representImg/"
						+$(event.target).parent().parent().children('input[type="hidden"]:eq('+image+')').val()+"); background-size : cover;");
					
					if(image != $(event.target).parent().children('input[type="hidden"]').length + 1){
						$(event.target).parent().children('.rcp-count-images').text(image+1+" / "+$(event.target).parent().children('input[type="hidden"]').length);
						}else{
							return;
						}
					
					
				}else{
					console.log('여기옴 ? actioninner');
					var imageChange = parseInt( $('.entry-action-inner').width() + 1)  / $(event.target).parent().parent().parent().children('input[type="hidden"]').length;
					var image = parseInt(event.offsetX / imageChange);								
					$(event.target).parent().attr("style", "background-image:url(img/representImg/"
							+$(event.target).parent().parent().parent().children('input[type="hidden"]:eq('+image+')').val()+"); background-size : cover;");
					
					if(image != $(event.target).parent().children('input[type="hidden"]').length + 1){
						$(event.target).parent().children('.rcp-count-images').text(image+1+" / "+$(event.target).parent().children('input[type="hidden"]').length);
						}else{
							return;
						}
					
				}
			})
}
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
  
 
  function goMyPage(){
	  $('#profileView .goMyPageBtn').on('click',function(event){
		  event.preventDefault();
		  if(userInfo != null){
			 
			  $(location).attr('href',contextRoot+'/mypage.html?'+ userInfo.email);
		  }
		  
	  })
  }
  

  
  
  function MainRecomList(){
	  
	  $.ajax({
		  url:contextRoot+'recipe/recomList.json',
		  dataType:'json',
		  method:'post',
		  success:function(result){
			  if (result.status !='success'){
				  swal('실행중 오류 발생');
				  return;
			  }
			  var list = result.data;
//			  $('#main-list > div').append( comMainRecomSection(result) );
//			  $('.list2 > .row').append( template(result) );
			 
			  $('#tabs-3 .hs-content .container .row ').append(comMainTemp( result ) ); 
			  
			  for(var i=0; i<result.data.length; i++){
				  if(result.data[i].length > 1){				  
					  $('.rcp-main-subscribe-userName0').attr('class','rcp-main-subscribe-userName'+i+1);
					  $('.rcp-main-subscribe-userName'+i+1).text( (result.data[i] )[0].user.userName+"님의 레시피 정보");
				  }
			  }
			  MainRecomCtList();
			  methods();
			  
			  $('#recommendation-rcp-more').click(function(){
				  window.location.href = contextRoot+"list.html";
			  })
		  },
		  error : function(){
			  console.log('ajax list2:서버 요청 오류');
		  }
	  });
  }  
  
function MainRecomCtList(){
	  
	  $.ajax({
		  url:contextRoot+'recipe/recomCtList.json',
		  dataType:'json',
		  method:'post',
		  success:function(result){
			  if (result.status !='success'){
				  swal('실행중 오류 발생');
				  return;
			  }
			  var list = result.data;
			  
			  $('#tabs-4 .hs-content .container .row ').append(comMainTemp( result ) );
			  $('#ctg-more').html('추천 카테고리 : '+result.data[0].ctgName+' <a id="ctg-rcp-more" class="More">more</a>');
			  
			  for(var i=0; i<result.data.length; i++){
				  if(result.data[i].length > 1){				  
					  $('.rcp-main-subscribe-userName0').attr('class','rcp-main-subscribe-userName'+i+1);
					  $('.rcp-main-subscribe-userName'+i+1).text( (result.data[i] )[0].user.userName+"님의 레시피 정보");
				  }
			  }
			  methods();
			  $('#ctg-rcp-more').click(function(){
				  window.location.href = contextRoot+"list.html?ctg="+result.data[0].ctgName;
			  })
		  },
		  error : function(){
			  console.log('ajax list2:서버 요청 오류');
		  }
	  });
}
