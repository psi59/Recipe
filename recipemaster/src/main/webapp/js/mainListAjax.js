
  var mainSection = $('#recipe-1-section').html();
  var comMainSection = Handlebars.compile(mainSection); 
  
  var main2Section = $('#recipe-2-section').html();
  var comMain2Section = Handlebars.compile(main2Section); 
  
  var source = $('#recipe-card-template').html();
  var template = Handlebars.compile(source); 
  
  $(function(){
	  Main1List();
	  likeLogin();
	  comList();	  
  });
  

  
//--------------------------  인기 레시피 ---------------------------------
  
  function Main1List(){
	  
	  var userNo = 0;
	  var a = eval(sessionStorage.getItem('data'));
	  
	  
	  if( a != null ){
		  userNo = a[0].userNo;
	  }
	  
	  $.ajax({	  		  
		  url:'recipe/list.json',
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
			  var list = result.data;
			  
			  $('#main-list > div').append( comMainSection(result) );
			  $('.list0 > .row').append( template(result) );
			  
			  for(var i = 0 ; i<result.data.length; i++){
			  var list=JSON.stringify(result.data[i].rpimg);
				var firstParse= list.substring(4,(list.length-4));
			

				 $('div[name="recipe-image"]:eq('+i+')').attr('style','background-image:url(img/representImg/'+firstParse+')');
			  }
			  
			  methods();
			  Main2List();
		  },
		  error : function(){
			  console.log('ajax list1: 서버 요청 오류');
		  }
	  });
  }  
  
//--------------------------  최신 레시피---------------------------------
  
  function Main2List(){
	  

	  var userNo = 0;
	  var a = eval(sessionStorage.getItem('data'));
	  
	  
	  if( a != null ){
		  userNo = a[0].userNo;
	  }
	  
	  $.ajax({
		  url:'recipe/list.json',
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
			  $('#main-list > div').append( comMain2Section(result) );
			  $('.list1 > .row').append( template(result) );
			  
			  for(var i = 0 ; i<result.data.length; i++){
				  var list=JSON.stringify(result.data[i].rpimg);
					var firstParse= list.substring(4,(list.length-4));
					
					console.log(result.data[i].user.image);
					 $('.list1 div[name="recipe-image"]:eq('+i+')').attr('style','background-image:url(img/representImg/'+firstParse+')');
				  }
				  
			  methods();
		  },
		  error : function(){
			  console.log('ajax list2:서버 요청 오류');
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
	  
  
//--------------------좋아요 등록, 해제 로직-------------------------------  
function likeLogin(){
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
					  $(event.target).parent().append('<b class="rcp-like active" name="rcp-like">좋아요</b>');
					  $(event.target).remove();
					  
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
		  $(location).attr('href','http://localhost:8080/community.html' );
		  
	
		  
		  $.ajax({
			  url :'recipe/userPage.json',
			  dataType : 'json',
			  method : 'post',
			  data:{
				 email:$(event.target).parent().children('input[type="hidden"]').val()
			  },
			  success : function(result) {
				  console.log(result);
				  if (result.status != 'success') {
					  alert('comList 실행 중 오류 발생');
					  return;
				  }
				  console.log(result.data);
				 
				  var sourceCRList = $('#comRcpList-template').text();
				  var templateCRList = Handlebars.compile(sourceCRList);
				  
				  console.log(result.data);
				 
				  	$('.rcp-userName').text(result.user);
			    	
				  //$('#tabs-1 .rcp-subscribe').append(templateCRList(result));
			  },
			  error : function() {
				 alert('community 서버 요청 오류!...')
			  }
		  });
		  
	  })
  }
  