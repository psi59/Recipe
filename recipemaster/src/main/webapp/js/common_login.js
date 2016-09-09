window.onload = function () {
	var userInfo = getUserInfo();
	
	$('#profileView').removeClass().addClass("main-nav__dropdown top-main-nav__dropdown profile-dropdown");

	/*로그아웃 버튼*/
	$(document).on('click', '#logoutBtn', function(){
		logout(event);
		$(location).attr('href','/');
	});
	
	// 회원정보창 위치 고정
	$('#profileView').removeClass().addClass("main-nav__dropdown bottom-main-nav__dropdown profile-dropdown");

	$(document).on('click', '#userLogin', function(){
		if($('#userEmail').val() == ''){
			swal('이메일을 입력해주세요.');		
			return;
		} else if($('#userPassword').val() == ''){
			swal('패스워드를 입력해주세요.');		
			return;
		}	
		login(event);
	});

	//로그인 버튼 누를시 포커스
	$(document).on('click', '#loginBtn', function(){
		document.getElementById("userEmail").focus();
	});
	
	$(document).on('click', '#topbarUserImg', function(){
		document.getElementById("userEmail").focus();
	});


	$(document).on('keyup', '#userEmail', function(){
		if(event.keyCode == 9){
			document.getElementById("userPassword").focus();
		}
		if(event.keyCode == 13){
			if($('#userPassword').val() == ''){
				swal('패스워드를 입력해주세요.');		
				document.getElementById("userPassword").focus();
			}
		}
	});

	$(document).on('keyup', '#userPassword', function(){
		if(event.keyCode == 13){
			if($('#userPassword').val() == ''){
				swal('패스워드를 입력해주세요.');		
				document.getElementById("userPassword").focus();
			}
			login(event);
		}
	});

	

	$(document)
	.on(
			'click', '.dropdown-trigger',
			function(event) {
				event.preventDefault();
				dropdownClick('.profile-dropdown',
				'.mobile-menu-dropdown');
				/* 용이 추가() */
				if (userInfo.userNo != null) {
					$('#profileEmail')
					.text(
							userInfo.email);
					$('#profileName')
					.text(
							userInfo.userName);
					$('#profileGrade')
					.text(
							userInfo.recipeUrl);
					/* 용이 추가() */
					$('#introduce')
					.text(
							userInfo.intro);
				}
	});
};


function getUserInfo(){
	var obj = loginCheck().responseJSON;
	if(obj.status!='success'){
		return;
	}
	
	var userInfo = {
		userNo : obj.data.userNo,
		userName : obj.data.userName,
		email : obj.data.email,
		image : obj.data.image,
		intro : obj.data.intro,
		role : obj.data.role,
		joinDate : obj.data.joinDate,
		recipeUrl : obj.data.recipeUrl,
		recipeCount : obj.data.recipeCount,
		subsCount : obj.data.subsCount
	};
	
	$('#signUpBtn').remove();
	$('#loginBtn').remove();
	$('#signUpTopBtn').remove();
	$('#loginIcon').html('<img id="loginIconAction1" class="rcp-barimg dropdown-trigger img-circle" src="img/Chef3.jpg" />');
	$('#topbarUserImg').html('<img id="loginIconAction2" class="rcp-barimg dropdown-trigger img-circle" src="img/Chef3.jpg" />');
	
	return userInfo;
}

function loginCheck() {
	return $.ajax({
		url : '/user/loginCheck.json', 
		method : 'get',
		dataType : 'json',
        async: false
	});
}; /* end of jquery */


//logout
function logout(event) {
	event.preventDefault();
	$.ajax({
		url : '/user/logout.json', 
		method : 'get',
		dataType : 'json',
		success : function(result) {
			if (result.status == 'failure') {
				swal('로그아웃 실패!!');
				return
			} 
			if(result.status == 'success'){
				userInfo=null;
			} else {
				swal('서버 요청 오류');
			}
		},
		error : function() {
			swal('서버 요청 오류');
		}
	}); /* end of ajax */
}; /* end of jquery */

function login(event) {
	event.preventDefault();
	$.ajax({
		url : '/user/login.json', 
		method : 'post',
		dataType : 'json',
		data : {
			email : $('#userEmail').val(),
			password : $('#userPassword').val()
		}, 
		success : function(result) {
			if (result.status == 'failure') {

				swal('잘못입력하셨습니다.','아이디 또는 비밀번호를 다시 확인하여 주세요.',"error");

				return;
			} 

			if(result.status == 'success'){
				location.reload();
				$('#login-pop-up-banner').bPopup().close();
			} else {
				swal('비밀번호를 다시 입력해주세요');
			}

		},
		error : function() {
			swal('서버 요청 오류');
		}
	}); /* end of ajax */
}; /* end of jquery */

/*$('#TopBtn').on('click', function(){
	$('#login-pop-up-banner').bPopup();
});*/
