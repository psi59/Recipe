$('#updateUserInfo').click(function(){
	  /* 폼 입력 유무 확인 */
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
	  $.post('/user/update.json', {
	        sUno : eval(sessionStorage.getItem('data'))[0].userNo,
		    email : $('#updateBoxEmail').text(),
	        bfPwd : $('#beforePwd').val(),
	        password : $('#afterPwd').val(),
	        intro : $('#introduce').val(),
	      }, function(result) {   	  
	        if (result.status == 'pwdFail'){
	        	 $('#beforePwd-div').removeClass().addClass("rcp-mar rcp-info form-group form-group-md has-error has-feedback");
	        	alert('이전 비밀번호 불일치');
	        	$('#beforePwd').focus();
	        	return;
	        } else if(result.status == 'failure'){
	        	alert('서버 오류');
	        	return;
	        } else {
	        	alert('정보수정 완료');
	        	$('#editUserInfo-pop-up-banner').bPopup().close();
	        }
	      }, 'json');
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


$('#updateUserReset').click(function(){
	  $('#editUserInfo-pop-up-banner').bPopup().close();
});


