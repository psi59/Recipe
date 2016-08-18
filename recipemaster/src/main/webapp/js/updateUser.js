$(function(){
	

	if(sessionStorage.getItem('data') != null){
	$('#updateFormUserNo').val(eval(sessionStorage.getItem('data'))[0].userNo);
	$('#updateFormEmail').val(eval(sessionStorage.getItem('data'))[0].email);
	}
	var profileImage;

	$('#userInfoEditBtn').on('click', function() {
		$('#editUserInfo-pop-up-banner').bPopup();
		if (eval(sessionStorage.getItem('data'))[0].userNo != null) {
			$('#updateBoxEmail').text(eval(sessionStorage.getItem('data'))[0].email);
			$('#updateBoxName').text(eval(sessionStorage.getItem('data'))[0].userName);
			$('#profileGrade').text(eval(sessionStorage.getItem('data'))[0].recipeUrl);
		}
	});

	$('#profileImage').fileupload({
		dataType: 'json',
		autoUpload: false,
		acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
		maxFileSize: 999000
		// Enable image resizing, except for Android and Opera,
		// which actually support image resizing, but fail to
		// send Blob objects via XHR requests:
	}).on('fileuploadadd', function (e, data) {
		profileImage = data.files[0];
	}).on('fileuploaddone', function (e, data) {
		if (data.result.status == 'pwdFail'){
			$('#beforePwd-div').removeClass().addClass("rcp-mar rcp-info form-group form-group-md has-error has-feedback");
			alert('이전 비밀번호 불일치');
			$('#beforePwd').focus();
			return;
		} else if(data.result.status == 'failure'){
			alert('서버 오류');
			return;
		} 
		alert('정보수정 완료');
		location.reload();
		    	
    }).on('fileuploadfail', function (e, data) {
    	console.log(data)
    });

	$("#updateUserForm").submit(function(event) {
		var formData = new FormData(this);
		var formURL = $(this).attr("action");
		event.preventDefault();
		$('#profileImage').fileupload('send', {
			files : profileImage
		});
	});

	$('#updateUserInfo').click(function(event){
		/* 폼 입력 유무 확인 */
		event.preventDefault();
		if( $('#beforePwd').val() == ""){
			alert('이전비밀번호를 입력해주세요');
			return;
		}else if( $('#afterPwd').val() == ""){
			alert('변경할 비밀번호를 입력해주세요');
			return;
		}else if( $('#afterPwdcf').val() == ""){
			alert('변경할 비밀번호확인을 입력해주세요');
			return;
		}
		/* 일치 불일치 확인 */
		if($('#afterPwd').val()!=$('#afterPwdcf').val()){
			alert('변경 비밀번호 불일치');
			return;
		}

		$("#updateUserForm").submit();

//		$.post('/user/update.json', {
//			sUno : eval(sessionStorage.getItem('data'))[0].userNo,
//			email : $('#updateBoxEmail').text(),
//			bfPwd : $('#beforePwd').val(),
//			password : $('#afterPwd').val(),
//			intro : $('#introduce').val(),
//		}, function(result) {   	  
//			if (result.status == 'pwdFail'){
//				$('#beforePwd-div').removeClass().addClass("rcp-mar rcp-info form-group form-group-md has-error has-feedback");
//				alert('이전 비밀번호 불일치');
//				$('#beforePwd').focus();
//				return;
//			} else if(result.status == 'failure'){
//				alert('서버 오류');
//				return;
//			} else {
//				alert('정보수정 완료');
//				$('#editUserInfo-pop-up-banner').bPopup().close();
//			}
//		}, 'json');
	});

	/* 비밀번호 폼 색상변화 */
	$('#afterPwd').keyup(function(){
		if($('#afterPwd').val().length>5){
			$('#afterPwd-div').removeClass().addClass("rcp-mar rcp-info form-group form-group-md has-success has-feedback");
		}else if($('#afterPwd').val().length>0){
			$('#afterPwd-div').removeClass().addClass("rcp-mar rcp-info form-group form-group-md has-error has-feedback");
		}else{
			$('#afterPwd-div').removeClass().addClass("rcp-mar rcp-info form-group form-group-md has-warning has-feedback")
		}
	})

	$('#afterPwdcf').keyup(function(){
		if($('#afterPwdcf').val()==$('#afterPwd').val()){
			$('#afterPwdcf-div').removeClass().addClass("rcp-mar rcp-info form-group form-group-md has-success has-feedback");
		}else{
			$('#afterPwdcf-div').removeClass().addClass("rcp-mar rcp-info form-group form-group-md has-error has-feedback")
		}
	})


	$('#updateUserReset').click(function(event){
		event.preventDefault();
		$('#editUserInfo-pop-up-banner').bPopup().close();
	});
});


