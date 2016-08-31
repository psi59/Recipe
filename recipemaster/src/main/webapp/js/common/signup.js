// 이성현
$(document).ready(function(){

	///// 회원가입 팝업창 가입 버튼 이벤트 /////
	/*$('#signup-addBtn').click(function() {*/
	$(document).on('click', '#signup-addBtn', function() {
		if( $('#signup-e-mail').val() == ""){
			swal('이메일을 입력해주세요');			
		}else if( $('#signup-userName').val() == ""){
			swal('닉네임을 입력해주세요');			
		}else if( $('#signup-password').val() == ""){
			swal('비밀번호를 입력해주세요');
		}else if($('#signup-password').val().length < 6){
			swal('비밀번호 6자리 이상 입력해주세요');			
		}else if( $('#signup-passwordCheck').val() == ""){
			swal('비밀번호 확인을 입력해주세요');	
		}else if( !$('#agrchk').is(":checked") ){
			swal('약관에 동의해주세요.');
		}
		if($('#signup-e-mail').val() != "" && $('#signup-userName').val() != "" &&
		   $('#signup-password').val() != "" && $('#signup-passwordCheck').val() != "" && $('#agrchk').is(":checked")
		   && $('#signup-password').val().length > 5){
			$.ajax({
				url : 'user/add.json',
				method : 'post',
				data : {
					email : $('#signup-e-mail').val(),
					userName : $('#signup-userName').val(),
					password : $('#signup-password').val(),		
					passwordCheck : $('#signup-passwordCheck').val()
				},
				dataType : 'json',
				success : function(result) {				
					// 중복된 이메일이거나 형식 오류일 경우
					if (result.status != 'success') {
						swal('이메일과 비밀번호를 확인해주세요.');
						return;
					} 				
					swal($('#signup-userName').val()+'님 환영합니다 !')						
					$('#signup-pop-up-banner').bPopup().close(); // 팝업창 닫기												
				},
				error : function() {
					alert('서버 요청 오류 !')
				}
			})	
		}
	});
	
	///// 회원가입 팝업창 취소 이벤트 /////
	$('#signup-resetBtn').click(function(){
		$('#signup-pop-up-banner').bPopup().close(); // 팝업창 닫기
	})	
	
	///// 이메일 유효성 검사 및 중복검사 /////
    $('#signup-e-mail').keyup(function(){ 
        var email = $(this).val();        
        // 값을 입력안한경우는 아예 체크를 하지 않는다.
        if( email == '' || email == 'undefined') return;
 
        // 이메일 유효성 검사
        if(! email_check(email) ) {
        	/*swal('잘못된 형식의 이메일 주소입니다.');*/
        	$('#signup-e-mail-div').removeClass().addClass('form-group has-error has-feedback');
			$('#signup-e-mail-span').removeClass().addClass('glyphicon glyphicon-remove form-control-feedback');
        	$('#signup-e-mail-label').text('잘못된 형식의 이메일 주소입니다.');        	
            $(this).focus();
            return false;
        } else {
        	///// node.js를 이용한 이메일 중복검사 테스트 /////	        	    
	        if ( $('#signup-e-mail').val().length > 6) {
	          var email = $(this).val();
	            $.ajax({
	            	type : 'GET',
	                url : 'http://192.168.0.50:9999/user/checkDuplication.do?email='+email,
	                success : function(result) {					
	                    if (result == 'true') {
							// 사용가능한 이메일
							$('#signup-e-mail-div').removeClass().addClass('form-group has-success has-feedback');
							$('#signup-e-mail-span').removeClass().addClass('glyphicon glyphicon-ok form-control-feedback');
							$('#signup-e-mail-label').text('사용가능한 이메일입니다.');
	                    } else {
							// 중복된 이메일
							$('#signup-e-mail-div').removeClass().addClass('form-group has-error has-feedback');
							$('#signup-e-mail-span').removeClass().addClass('glyphicon glyphicon-remove form-control-feedback');
							$('#signup-e-mail-label').text('중복된 이메일입니다.');
							$(this).focus();
	                    }
						
	                } // end success
	            }); // end ajax
			} else {
				$('#signup-e-mail-div').removeClass().addClass('form-group has-warning has-feedback');
				$('#signup-e-mail-span').removeClass().addClass('glyphicon glyphicon-warning-sign form-control-feedback');
				$('#signup-e-mail-label').text('');
			} // end if        	
        }
    });	
	
	///// 닉네임 중복 체크 /////	
    $('#signup-userName').keyup(function(){	
        if ( $('#signup-userName').val().length > 2) {
          var userName = $(this).val();
            $.ajax({
            	type : 'POST',
                url : 'user/checkDuplicationUserName.json',
                data:
                {
                    userName : userName
                },
                success : function(result) {					
                    if (result.data) { 
						// 사용가능한 이메일
						$('#signup-userName-div').removeClass().addClass('form-group has-success has-feedback');
						$('#signup-userName-span').removeClass().addClass('glyphicon glyphicon-ok form-control-feedback');
						$('#signup-userName-label').text('사용가능한 닉네임입니다.');
                    } else {
						// 중복된 이메일
						$('#signup-userName-div').removeClass().addClass('form-group has-error has-feedback');
						$('#signup-userName-span').removeClass().addClass('glyphicon glyphicon-remove form-control-feedback');
						$('#signup-userName-label').text('중복된 닉네임입니다.');						
                    }
                } // end success
            }); // end ajax
		} else {
			$('#signup-userName-div').removeClass().addClass('form-group has-warning has-feedback');
			$('#signup-userName-span').removeClass().addClass('glyphicon glyphicon-warning-sign form-control-feedback');
			$('#signup-userName-label').text('');
		} // end if
    }); // end keyup

	///// 비밀번호 체크 /////
    $('#signup-password').keyup(function(){	
        if ( $('#signup-password').val().length > 5 ) {
			$('#signup-password-div').removeClass().addClass('form-group has-success has-feedback');
			$('#signup-password-span').removeClass().addClass('glyphicon glyphicon-ok form-control-feedback');
			$('#signup-password-label').text('');          				
        } else if ( $('#signup-password').val().length > 1 ) {
			$('#signup-password-div').removeClass().addClass('form-group has-warning has-feedback');
			$('#signup-password-span').removeClass().addClass('glyphicon glyphicon-warning-sign form-control-feedback');
			$('#signup-password-label').text('6자리 이상 입력해주세요');          
		} else if ( $('#signup-password').val().length == 0 ) {
			$('#signup-password-div').removeClass().addClass('form-group has-error has-feedback');
			$('#signup-password-span').removeClass().addClass('glyphicon glyphicon-remove form-control-feedback');
			$('#signup-password-label').text('6자리 이상 입력해주세요');          
		}// end if
    }); // end keyup

    ///// 비밀번호 확인 체크 /////
    $('#signup-passwordCheck').keyup(function(){	
        if ( $('#signup-passwordCheck').val() == $('#signup-password').val() ) {
			$('#signup-passwordCheck-div').removeClass().addClass('form-group has-success has-feedback');
			$('#signup-passwordCheck-span').removeClass().addClass('glyphicon glyphicon-ok form-control-feedback');
			$('#signup-passwordCheck-label').text('일치합니다');
        } else {
			$('#signup-passwordCheck-div').removeClass().addClass('form-group has-error has-feedback');
			$('#signup-passwordCheck-span').removeClass().addClass('glyphicon glyphicon-remove form-control-feedback');
			$('#signup-passwordCheck-label').text('일치하지 않습니다.');              
		} // end if
    }); // end keyup
});

///// 정규표현식 검사 함수 /////
function email_check( email ) {    
    var regex=/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return (email != '' && email != 'undefined' && regex.test(email) === true); 
}

