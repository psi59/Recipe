$(function(){
		
	$('input[name="rating"]').change(function() {
		$('#rcp-starrating-grade').html($('input[name="rating"]:checked').val()+' 점');
	})
	
	// 평가하기 팝업
	$('#rcp-star-rating').on('click', function(){
		$('.rcp-starrating').bPopup();
	})
	
	// 평가하기 팝업 끄기
	$('#rcp-starrating-btn-close').on('click', function(){
		$('.rcp-starrating').bPopup().close();
		// rating 라디오 버튼 체크 해제
		$('input:radio[name="rating"]').removeAttr("checked");
		$('#rcp-starrating-grade').html('&nbsp;');
	})
	
	// 별점 등록
	$('#rcp-starrating-btn-apply').on('click', function(){		
		if($('input[name="rating"]:checked').val() != undefined){
			$.ajax({
				url : 'recipe/starRate.json',
				method : 'post',
				data : {
					grade : $('input[name="rating"]:checked').val(),
					recipeNo : $('#detail-recipeNo').val()
				},
				dataType : 'json',
				success : function(result) {				
					if (result.status != 'success'){
						swal('에러');
						return;
					}
					if (result.loginCheck == true){
						swal('뭐지?'+result.checkDuplicateGrade);
						if(result.checkDuplicateGrade == true){
							swal($('input[name="rating"]:checked').val()+'점을 주셨습니다 !');
							$('.rcp-starrating').bPopup().close();					
							// rating 라디오 버튼 체크 해제
							$('input:radio[name="rating"]').removeAttr("checked");
							$('#rcp-starrating-grade').html('&nbsp;');
						} else if(result.checkDuplicateGrade == false) {
							swal('이미 점수를 입력하셨습니다.');
						}
					} else if (result.loginCheck == false){
						swal('로그인 하셔야 이용하실수 있습니다.');
					}
				},
				error : function(request,status,error) {
					alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
				}
			})
		} else {
			swal('별점을 매겨주세요');
		}
	})
});