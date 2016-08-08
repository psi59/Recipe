// 이성현

$(function() {

	///// 회원가입 팝업창 가입 버튼 이벤트 /////
	$('#signup-addBtn').click(function() {
		$.ajax({
			url : 'user/add.json',
			method : 'post',
			data : {
				email : $('#signup-e-mail').val(),
				userName : $('#signup-userName').val(),
				password : $('#signup-password').val()			 
			},
			dataType : 'json',
			success : function(result) {
				if ( $('#signup-password').val() != ($('#signup-passwordCheck').val()) ){
					alert('비번 틀림');
					return;
				}
				if (result.status != 'success') {
					alert('등록 오류입니다.');
					return;
				}
				alert($('#signup-userName').val()+"님 가입을 추카추카 ~")						
				$('#signup-pop-up-banner').bPopup().close(); // 팝업창 닫기												
			},
			error : function() {
				alert('서버 요청 오류 !')
			}
		})
	});
	///// 회원가입 팝업창 취소 이벤트 /////
	$('#signup-resetBtn').click(function(){
		$('#signup-pop-up-banner').bPopup().close(); // 팝업창 닫기
	})
});