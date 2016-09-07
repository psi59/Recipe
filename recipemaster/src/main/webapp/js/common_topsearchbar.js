$(document).ready(function(){
	
	// signUpBtn 팝업 , 불투명 배경 띄우기
	$('#signUpTopBtn').on('click', function(event){
		event.preventDefault();
		$('#signup-pop-up-banner').bPopup();
	});

	// loginBtn 팝업 , 불투명 배경 띄우기
	$('#topLoginBtn').on('click', function(event){
		event.preventDefault();
		$('#login-pop-up-banner').bPopup();
	});
});