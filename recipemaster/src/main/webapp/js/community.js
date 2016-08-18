  $(function(){
    	$('.rcp-topbtn').on('click',function(){
    		$.ajax({
    			url:'recipe/addSubscribe.json',
    			datatype:'json',
    			data:{
    				fromUserNo:1
    			},
    			method:'post',
    			succeess:(function(){
    				
    			}),
    			error:(function(){
    				
    			})
    		})
    	})
    })
	

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
		
	
		
	/*화면관리*/	
    $(function() {
      $("#tabs").tabs();
    });
    //마지막 스크롤 TOP 위치
    var lastScrollY = 0;

    $(document).ready(function() {
      //setInterVal(사용할 함수, 1/1000초)  즉 quick함수를 1/1000초마다 실행
      setInterval(quick, 1);
    });

    function quick() {
      //현재 스크롤바 top 위치, .scrollTop() - 선택한 element의 scroll 가능한 영역에서 가장 위쪽 위치
      currentY = $(window).scrollTop();

      //위치가 틀린 경우
      if (currentY != lastScrollY) {
        //percent=움직임속도 * (현재 scrollTop위치) - (마지막 scrollTop위치) 
        percent = 0.1 * (currentY - lastScrollY);
        //percent가 0보다 크면 수를 올림  작으면 수를 내림. 
        percent = (percent > 0 ? Math.ceil(percent) : Math
            .floor(percent));
        //quick의 style:top을 현재의 top에서 percent를 더한 값(음수라면 빼지겠지?)으로 바꿔준다. 
        $("#quick").css("top",
            parseInt($("#quick").css("top")) + percent);
        //현재 위치를 lastScrollY에 저장해준다.
        lastScrollY = lastScrollY + percent;
      }
      //현재 ((윈도우넓이/2) +480) 을 left로 지정
      $("#quick").css("left", ($(window).width() / 2) + 580);
    }
    
    
  