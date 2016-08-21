var oddSubscribe = $('#subscribe-recipe-template').html();
var comOddSubscribe = Handlebars.compile(oddSubscribe); 
 
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
			$('#tabs-2 .rcp-subscribe').append( comOddSubscribe(subscribe) );
		},
		error:function(){
			alert('like : 서버 요청 오류');
		}
	})
})