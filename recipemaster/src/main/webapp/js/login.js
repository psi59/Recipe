var jsonData;
window.onload = function () {
	loginCheck(event);
};

$("#userLogin").click(function(){
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
$("#loginBtn").click(function(){
	document.getElementById("userEmail").focus();
});
$("#topbarUserImg").click(function(){
	document.getElementById("userEmail").focus();
});


$("#userEmail").keyup(function(){
	if(event.keyCode == 9){
		document.getElementById("userPassword").focus();
	}
});

$('#userPassword').keyup(function(){
	if(event.keyCode == 13){
		if($('#userPassword').val() == ''){
			swal('패스워드를 입력해주세요.');		
			return;
		}
		login(event);
	}
});

//login check
function loginCheck(event) {
	event.preventDefault();

	$.ajax({
		url : '/user/loginCheck.json', 
		method : 'get',
		dataType : 'json',
		success : function(result) {
			if (result.status == 'failure') {
				
				return;
			} 
			if(result.status == 'success'){
				
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

				jsonData = JSON.stringify(data);
				
				/*eval 사용 방법, eval(jsonData)[0].email*/
				if(jsonData!=null){
					$('#signUpBtn').hide();
					$('#loginBtn').hide();
					$('#signUpTopBtn').hide();
					$('#loginIcon').html('<img id="loginIconAction1" class="rcp-barimg dropdown-trigger img-circle" src="img/Chef3.jpg" />');
					$('#topbarUserImg').html('<img id="loginIconAction2" class="rcp-barimg dropdown-trigger img-circle" src="img/Chef3.jpg" />');
				}
			} else {
						return
					}
					return jsonData;
				},
				error : function() {
					swal('서버 요청 오류');
				}
			}); /* end of ajax */
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
				
				return
				
			} 
			if(result.status == 'success'){
				
				jsonData=null;
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



$(function(){
	$('#profileView').removeClass().addClass("main-nav__dropdown top-main-nav__dropdown profile-dropdown");
	
		/*로그아웃 버튼*/
		$("#logoutBtn").click(
				function(){
					logout(event);
					location.reload();
				});
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

/*$('#TopBtn').on('click', function(){
	$('#login-pop-up-banner').bPopup();
});*/

$(document)
.on(
		'click', '.dropdown-trigger',
		function(event) {
			event.preventDefault();
			dropdownClick('.profile-dropdown',
					'.mobile-menu-dropdown');
			/* 용이 추가() */
			if (eval(jsonData)[0].userNo != null) {
				$('#profileEmail')
						.text(
								eval(jsonData)[0].email);
				$('#profileName')
						.text(
								eval(jsonData)[0].userName);
				$('#profileGrade')
						.text(
								eval(jsonData)[0].recipeUrl);
				/* 용이 추가() */
				$('#introduce')
						.text(
								eval(jsonData)[0].intro);
			}
		});
