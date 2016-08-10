$("#userLogin").click(	
		function() {
			$.ajax({
				url : '/user/login.json',
				method : 'post',
				dataType : 'json',
				data : {
					email : $('#userEmail').val(),
					password : $('#userPassword').val()
				},
				success : function(result) {
					if (result.status != 'success') {
						alert('실행중 오류 발생');
						return;
					}
					
					alert(result.data.image);
					
					alert(result.data.toString());
					
					$('#profileImg').html("<img id='profileImg' class='rcp-img img-circle' src='"+result.data.image+"'/>");
					$('#profileEmail').html('<a id="profileEmail" href="#" class="dropdown__header rcp-infobox-text">'+result.data.email+'</a>');
					$('#profileName').html('<h6 id="profileName" class="rcp-nickname">'+result.data.userName+'</h6>');
					$('#profileGrade').html('<span id="profileGrade" class="dropdown__title rcp-infobox-text">'+result.data.recipeUrl+'</span>');
					
					
					alert(result.data.userName+ '님 환영합니다.');
					$('#login-pop-up-banner').bPopup().close();

					sessionStorage.setItem('userNo',result.data.userNo);
					sessionStorage.setItem('role',result.data.role);
					
					var userNo = sessionStorage.getItem('userNo');
					var role = sessionStorage.getItem('role');
					location.reload();
					//location.href = "http://127.0.0.1:8080";

					/*  $('#profileEmail').html('<a href="#" class="dropdown__header rcp-infobox-text" id="profileId">'+result.data.email+'</a> ');
									 $('#profileName').html('<h6 class="rcp-nickname" id="profileName">'+result.data.userName+'</h6>');
									 $('#profileGrade').html('<span  class="dropdown__title rcp-infobox-text" id="profileGrade"><img src="img/star.png" >'+head Chef+'</span>'); */
					
				},
				error : function() {
					alert('서버 요청 오류');
				}
			}); /* end of ajax */
}); /* end of jquery */

/*로그아웃 버튼*/
$(function(){

	
	if(sessionStorage.getItem('userNo')!=null){
		$('#signUpBtn').hide();
		$('#loginBtn').html('<a href="http://127.0.0.1:8080/" id="logoutBtn"><span class="rcp-btn-default-2">로그아웃</span></a>');

		
		
		$("#logoutBtn").click(
				function(){
						
					sessionStorage.removeItem('role');
					sessionStorage.removeItem('userNo');
					location.reload();
		});
	};
});


