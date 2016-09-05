$(function(){
		
	$('input[name="rating"]').change(function() {
		$('#rcp-starrating-grade').html($('input[name="rating"]:checked').val()+' 점');
	})
	
	// 별점주기 팝업
	$('.rcp-star-rating').on('click', function(){
		$('.rcp-starrating').bPopup();
	})
	
	// 별점주기 팝업 끄기
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
					if (result.status != 'success') {
						swal('실패 ~');
						return;
					}
					swal($('input[name="rating"]:checked').val()+'점을 주셨습니다 !');
					$('.rcp-starrating').bPopup().close();					
					// rating 라디오 버튼 체크 해제
					$('input:radio[name="rating"]').removeAttr("checked");
					$('#rcp-starrating-grade').html('&nbsp;');					
				},
				error : function() {
					swal('서버 요청 오류 !')
				}
			})
		} else {
			swal('별점을 매겨주세요');
		}
	})
});