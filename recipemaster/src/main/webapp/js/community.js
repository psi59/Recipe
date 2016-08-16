$(document).on('click','#vstUpdateBtn',function() {
							$('#vst-contents').html(
											'<div class="rcp-Vst-contents"><textarea rows="6" cols="30" style="resize:none;"></textarea></div>');
							$('#editBtn1').html('<img class="vstUpdateBtn" id="vstConfirmBtn"'+
									'src="/img/vstConfirmBtn.png">')
						});
		$(document).on('click','#vstConfirmBtn',function() {
        			$('#vst-contents').html(
                      '<div class="rcp-Vst-contents"><p>내용이다</p></div>');
              $('#editBtn1').html('<img class="vstUpdateBtn" id="vstUpdateBtn"'+
                  'src="/img/vstUpdateBtn.png">')
            });
		
		$('#vstDeleteBtn').click(function() {
			if (confirm("게시물을 삭제하시겠습니까?")) {
				  $('.Vst').remove();
			} else {
				return;
			}
		});
		
		$(document).on('mouseenter','.rcp-Vst-slotRp',function(){
			$('.addDelete').html('<img id="addDeleteBtn"'+
			        'src="/img/vstDeleteBtnWt.png">');
		});
		
		$(document).on('mouseleave','.rcp-Vst-slotRp',function(){
			$('.addDelete').text('');
		    });
		
		$(document).on('click','#addDeleteBtn',function(){
			if(confirm("댓글을 삭제하시겠습니까?")){
				$(this).parent().parent().remove();
			}else{
				return;
			}
		})
		
		$(document).on('click','#moreRp',function(){
			$('.rcp-Vst-slotRp').append('<div class="rcp-Vst-contents-rep">'+
			          '<img class="rcp-Vst-img-rep1 img-circle" src="/img/pika.jpg" />'+
			              '<span>박상일</span><span> &nbsp;</span> <span>잘보고갑니다.(Contents)</span>'+
			              '<span>2016-08-12-13:00</span><span class="addDelete"></span><hr style="border:solid 1px #b51515;width:90%"/></div>');
		
			$('#moreRp').parent().html('<span id="hideRp">댓글 숨기기</span>');   
		})
		
		$(document).on('click','#hideRp',function(){
			$('.rcp-Vst-slotRp').html('');
			
			$('#hideRp').parent().html('<span id="moreRp">댓글 더보기..(1)</span>');
		})
