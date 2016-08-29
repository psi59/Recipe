$(function(){
	
	var profileImage;

	$('#userInfoEditBtn').on('click', function() {
		$('#editUserInfo-pop-up-banner').bPopup();
		if (eval(jsonData)[0].userNo != null) {
			$('#updateBoxEmail').text(eval(jsonData)[0].email);
			$('#updateBoxName').text(eval(jsonData)[0].userName);
			$('#profileGrade').text(eval(jsonData)[0].recipeUrl);
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
			swal('이전 비밀번호 불일치');
			$('#beforePwd').focus();
			return;
		} else if(data.result.status == 'failure'){
			swal('서버 오류');
			return;
		} 
		swal('정보수정 완료');
		location.reload();
		    	
    }).on('fileuploadfail', function (e, data) {
    	console.log(data);
    }).prop('disabled', !$.support.fileInput)
	.parent().addClass($.support.fileInput ? undefined : 'disabled');

	$("#updateUserForm").submit(function(event) {
		var formData = new FormData(this);
		var formURL = $(this).attr("action");
		
		if (profileImage != null) {
			event.preventDefault();
			$('#profileImage').fileupload('send', {
				files : profileImage
			});
		} 
	});

	$(document).on('click', '#updateUserInfo', function(event){
		/* 폼 입력 유무 확인 */
//		if( $('#beforePwd').val() == ""){
//			swal('이전비밀번호를 입력해주세요');
//			return;
//		}else if( $('#afterPwd').val() == ""){
//			swal('변경할 비밀번호를 입력해주세요');
//			return;
//		}else if( $('#afterPwdcf').val() == ""){
//			swal('변경할 비밀번호확인을 입력해주세요');
//			return;
//		}
//		/* 일치 불일치 확인 */
//		if($('#afterPwd').val()!=$('#afterPwdcf').val()){
//			swal('변경 비밀번호 불일치');
//			return;
//		}
		
		console.log($('#beforePassword').val());
		console.log($('#afterPwd').val());
		console.log($('#afterPwdcf').val());
		
//		if($('#afterPwd').val()!== undefined || $('#afterPwd').val()!== null || $('#beforePassword').val()!== undefined|| $('#beforePassword').val()!== null|| $('#afterPwdcf').val()!== undefined || $('#afterPwdcf').val()!== null){
//			if($('#beforePassword').val() === undefined){
//				swal('이전비밀번호를 입력해주세요');
//				return;
//			} else if( $('#afterPwd').val()=== undefined){
//				swal('변경할 비밀번호를 입력해주세요');
//				return;
//			} else if( $('#afterPwdcf').val()===undefined){
//				swal('변경할 비밀번호를 다시 한번 입력해주세요');
//				return;
//			}
//		}

		$('#updateUserForm').submit();
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


