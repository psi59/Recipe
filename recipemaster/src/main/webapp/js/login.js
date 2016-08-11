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
						$( "#userPassword" ).effect('bounce');
						$('#loginInputBox > .warning').remove();
						$('#loginInputBox').append("<div id='warning' class='warning'>아이디 또는 비밀번호를 다시 확인하세요.</div>");
						$('#warning').css('color','red').css('font-size', '13px');
						
						return;
					} 
 
					if(result.data != null){
					alert(result.data.userName+ '님 환영합니다.');
					
					var data = [];
					data.push({
						userNo : result.data.userNo,
						userName : result.data.userName,
						email : result.data.email,
						image : result.data.image,
						intro : result.data.intro,
						role : result.data.role,
						joinDate : result.data.joinDate,
						recipeUrl : result.data.recipeUrl,
						recipeCount : result.data.recipeCount,
						subsCount : result.data.subsCount
					});
					

					var jsonData = JSON.stringify(data);
					
					
					
					/*eval 사용 방법, eval(jsonData)[0].email*/
					/*alert('1111'+eval(jsonData)[0].role);*/
					sessionStorage.setItem('data', jsonData);
					location.reload();
					
					$('#login-pop-up-banner').bPopup().close();
					} else {
						alert('비밀번호를 다시 입력해주세요');
					}
					
					
					/*$('#profileEmail').text(eval(sessionStorage.getItem('data'))[0].email);
					$('#profileName').text(eval(sessionStorage.getItem('data'))[0].userName);
					$('#profileGrade').text(eval(sessionStorage.getItem('data'))[0].recipeUrl);*/
					//location.href = "http://127.0.0.1:8080";

				},
				error : function() {
					alert('서버 요청 오류');
				}
			}); /* end of ajax */
}); /* end of jquery */

/*로그아웃 버튼*/
$(function(){
	$('#profileView').removeClass().addClass("main-nav__dropdown top-main-nav__dropdown profile-dropdown");
	
	if(eval(sessionStorage.getItem('data'))[0].userNo!=null){
		$('#signUpBtn').hide();
		$('#loginBtn').hide();
		$('#signUpTopBtn').hide();
		$('#loginIcon').html('<img id="loginIconAction" class="rcp-barimg dropdown-trigger img-circle"src="img/Chef3.jpg" />');
	
		
			/*$(window).bind('scroll', function(e) {
				$('#profileView').removeClass().addClass("main-nav__dropdown profile-dropdown");
			});*/
		
		$("#logoutBtn").click(
				function(){
						
					sessionStorage.removeItem('data');
					location.reload();
		});
	};
});


var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   
   if (st <= 50){
	   $('#profileView').removeClass().addClass("main-nav__dropdown top-main-nav__dropdown profile-dropdown");
   } else {
	   $('#profileView').removeClass().addClass("main-nav__dropdown bottom-main-nav__dropdown profile-dropdown");
   }
   lastScrollTop = st;
   
   
});



	
	$('#TopBtn').on('click', function(){
		$('#login-pop-up-banner').bPopup();
	});






