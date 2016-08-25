

$(function(){
	$('#scsPage').click(function(){
	scsRcpListScroll();	
	
		$(window).scroll(function() { 
		    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
		    	scsRcpListScrollAppend();
		    }
		   
		});
	});
	
	
});

function scsRcpListScroll(){ 
	
		var oddSubscribe = $('#subscribe-recipe-template').html();
		var comOddSubscribe = Handlebars.compile(oddSubscribe); 
	
	var userNo = 0; 
	  var a = eval(sessionStorage.getItem('data'));   
	  if(a != null){
	    userNo = eval(sessionStorage.getItem('data'))[0].userNo;
	  }
	
	$.ajax({

		url:'/recipe/subscribe.json',
		data:{
			userNo : userNo
		},
		dataType:'json',
		method:'post',
		success:function(subscribe){
			$('#tabs-2 .rcp-subscribe').append( comOddSubscribe(subscribe) );
			$('#scsRcpList-pageNo').attr('value', '1');
		},
		error:function(){
			alert('like : 서버 요청 오류');
		}
	})
};


function scsRcpListScrollAppend(){ 
	var userNo = 0; 
	  var a = eval(sessionStorage.getItem('data'));   
	  if(a != null){
	    userNo = eval(sessionStorage.getItem('data'))[0].userNo;
	  }
	  if(isNaN(parseInt($('#scsRcpList-pageNo').val())+1)){
		  return;
	  }
	  var oddSubscribe = $('#subscribe-recipe-template').html();
	  var comOddSubscribe = Handlebars.compile(oddSubscribe); 
	   
	  $.ajax({
	    url:'/recipe/subscribe.json',
	    method : 'post',
	    data : {
	      userNo : userNo,
	      pageNo : parseInt($('#scsRcpList-pageNo').val())+1
	    },
	    dataType : 'json',
	    success : function(result) {
	      if (result.status != 'success') {
	        swal('실패 ~');
	        return;
	      }
	     
	    	  $('#tabs-2 .rcp-subscribe').append( comOddSubscribe(result) );   
		      $('#scsRcpList-pageNo').val(result.pageNo);
		
	    	 
	    },
	    error : function() {
	      swal('오호라~','더이상 데이터가 없습니다.')
	    }
	    
	    
	  })  
	}

/*
$(function(){
	loadComRcpList();	
});

function loadComRcpList(){ 
	
	var userNo = 0; 
	  var a = eval(sessionStorage.getItem('data'));   
	  if(a != null){
	    userNo = eval(sessionStorage.getItem('data'))[0].userNo;
	  }
	  
	  var source = $('#comRcpList-template').text();
	  var template = Handlebars.compile(source);  
	  $.ajax({
	    url : 'recipe/comList.json',
	    method : 'post',
	    data : {
	      userNo : userNo
	    },
	    dataType : 'json',
	    success : function(result) {
	      if (result.status != 'success') {
	        swal('실패 ~');
	        return;
	      }
	      //$('#search-result > div').remove();    
	      $('#tabs-1 .rcp-subscribe').append(template(result));
	      $('#rcpList-pageNo').attr('value', '1');
	    },
	    error : function() {
	      swal('더이상 데이터가 없습니다.')
	    }
	  })  
	}

function rcpListScrollAppend(){ 
	var userNo = 0; 
	  var a = eval(sessionStorage.getItem('data'));   
	  if(a != null){
	    userNo = eval(sessionStorage.getItem('data'))[0].userNo;
	  }
	  if(isNaN(parseInt($('#rcpList-pageNo').val())+1)){
		  return;
	  }
	  var source = $('#comRcpList-template').text();
	  var template = Handlebars.compile(source);  
	   
	  $.ajax({
	    url : 'recipe/comList.json',
	    method : 'post',
	    data : {
	      userNo : userNo,
	      pageNo : parseInt($('#rcpList-pageNo').val())+1
	    },
	    dataType : 'json',
	    success : function(result) {
	      if (result.status != 'success') {
	        swal('실패 ~');
	        return;
	      }
	      $('#tabs-1 .rcp-subscribe').append(template(result));     
	      $('#rcpList-pageNo').val(result.pageNo);
	    },
	    error : function() {
	      swal('오호라~','더이상 데이터가 없습니다.')
	    }
	  })  
	}

$(function(){
  loadMyPage(); 
});

function loadMyPage(){ 
  
  var userNo = 0; 
    var a = eval(sessionStorage.getItem('data'));   
    if(a != null){
      userNo = eval(sessionStorage.getItem('data'))[0].userNo;
    }
    $.ajax({
      url : 'visitor/loadMyPage.json',
      method : 'post',
      data : {
        userNo : userNo
      },
      dataType : 'json',
      success : function(result) {
        if (result.status != 'success') {
          swal('로그인 해주시기 바랍니다.');
          return;
        }
        $('#visitNum').text(result.sum+"명");
        $('#likeNum').text(result.like+"개");
        $('#scrapNum').text(result.scr+"개");
        $('#gradeNum').text(result.avg+"점");
      
      },
      error : function() {
        swal('더이상 데이터가 없습니다.')
      }
    })  
  }
*/