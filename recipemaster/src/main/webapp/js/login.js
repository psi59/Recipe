window.onload = function () {
	
	loadUsers();
	$('.rankingWrapper').bxSlider({
//	      startSlide:0,
	      pager: false,
	      moveSlides: 1,
	      infiniteLoop:true
	});
	loadMonthRank();
	loadTodayRank();
	
	var userInfo = getUserInfo();
	
	$('#signUpBtn').html("<span class='rcp-btn-default-2'>회원가입</span>");
	$('#loginBtn').html("<span class='rcp-btn-default-2'>로그인</span>");
	$('#profileView').removeClass().addClass("main-nav__dropdown top-main-nav__dropdown profile-dropdown");

	/*로그아웃 버튼*/
	$(document).on('click', '#logoutBtn', function(){
		logout(event);
		$(location).attr('href','/');
	});
		
	$(window).on('scroll', function(event){
		var lastScrollTop = 0;
		var st = $(this).scrollTop();

		if (st <= 50){
			$('#profileView').removeClass().addClass("main-nav__dropdown top-main-nav__dropdown profile-dropdown");
		} else {
			$('#profileView').removeClass().addClass("main-nav__dropdown bottom-main-nav__dropdown profile-dropdown");
		}
		lastScrollTop = st;
	});
	

	$(document).on('click', '#userLogin', function(){
		if($('#userEmail').val() == ''){
			swal('이메일을 입력해주세요.');		
			return;
		} else if($('#userPassword').val() == ''){
			swal('패스워드를 입력해주세요.');		
			return;
		}	
		login(event);
		loadUsers();
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
					.html(userInfo.grade);
					/* 용이 추가() */
					$('#introduce')
					.text(
							userInfo.intro);
					
					$('#profileImg').attr('src', 'img/profileImg/'+userInfo.image);
				}
	});
	
	
	//start of 쉐프카드
	
	
	function loadUsers() {
		var source = $('#chef-card-template').text();
		var template = Handlebars.compile(source);

		$.ajax({
			url : 'user/top3.json',
			dataType : 'json',
			method : 'get',
	        async: false,
			success : function(result) {
				if (result.status != 'success') {
					swal('chefCard.js 오류');
					return;
				}
				
				for (var i = 0; i < result.data.length; i++) {
					if (result.data[i].subscribeUser==0) {
						result.data[i].status = null;
						console.log('unlogin::'+result.data[i].status);
					}else {result.data[i].status = Boolean(true);
					console.log('login::'+result.data[i].status);
					}
				}
				
				$('#rcp-chef-rank').append(template(result));
			},
			error : function() {
				swal('서버 요청 오류!...')
			}
		});		
	}//end of 쉐프카드
	
	function loadMonthRank() {
		var source = $('#chef-card-template').text();
		var template = Handlebars.compile(source);

		$.ajax({
			url : 'user/monthtop3.json',
			dataType : 'json',
			method : 'get',
			success : function(result) {
				if (result.status != 'success') {
					swal('chefCard.js 오류');
					return;
				}
				
				for (var i = 0; i < result.data.length; i++) {
					if (result.data[i].subscribeUser==0) {
						result.data[i].status = null;
						console.log('unlogin::'+result.data[i].status);
					}else {result.data[i].status = Boolean(true);
					console.log('login::'+result.data[i].status);
					}
				}
				console.log("month rank : "+result.data);
				$('#rcp-chef-rank-month').append(template(result));
			},
			error : function() {
				swal('서버 요청 오류!...')
			}
		});		
	}//end of 쉐프카드
	
	function loadTodayRank() {
		var source = $('#chef-card-template').text();
		var template = Handlebars.compile(source);

		$.ajax({
			url : 'user/todaytop3.json',
			dataType : 'json',
			method : 'get',
			success : function(result) {
				if (result.status != 'success') {
					swal('chefCard.js 오류');
					return;
				}
				
				for (var i = 0; i < result.data.length; i++) {
					if (result.data[i].subscribeUser==0) {
						result.data[i].status = null;
						console.log('unlogin::'+result.data[i].status);
					}else {result.data[i].status = Boolean(true);
					console.log('login::'+result.data[i].status);
					}
				}
				console.log("today rank : "+result);
				$('#rcp-chef-rank-today').append(template(result));
			},
			error : function() {
				swal('서버 요청 오류!...')
			}
		});		
	}//end of 쉐프카드
	
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
		subsCount : obj.data.subsCount,
		grade:obj.data.grade
	};
	
	$('#signUpBtn').remove();
	$('#loginBtn').remove();
	$('#signUpTopBtn').remove();
	$('#loginIcon').html('<img id="loginIconAction1" class="rcp-barimg dropdown-trigger img-circle" src="img/profileImg/'+userInfo.image+'" />');
	$('#topbarUserImg').html('<img id="loginIconAction2" class="rcp-barimg dropdown-trigger img-circle" src="img/profileImg/'+userInfo.image+'" />');
	
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
