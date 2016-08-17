var oddSubscribe = $('#subscribe-recipe-template').html();
var comOddSubscribe = Handlebars.compile(oddSubscribe); 
 
//
//$(function(){
//	$('.rcp-subscribe-detail').append( comOddSubscribe() );
//	$('.rcp-subscribe-detail').append( comOddSubscribe() );
//	$('.rcp-subscribe-detail .rcp-subscribe-column:nth-child(1) .rcp-left-div').attr('class','rcp-left-div rcp-float-left-div');
//	
//})
$(function(){
//	$('#subsLink').on('click',function(){
		$.ajax({
			
			url:'/recipe/subscribe.json',
			data:{
				userNo : '2'//eval(sessionStorage.getItem('data'))[0].userNo,
			},
			dataType:'json',
			method:'post',
			  success:function(subscribe){
				  console.log(subscribe);
		$('#tabs-2 .rcp-subscribe').append( comOddSubscribe(subscribe) );
		
	
			  },
			  error:function(){
				  alert('like : 서버 요청 오류');
			
			  }

	})
})