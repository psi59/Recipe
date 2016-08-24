
  $(function(){
	  console.log(location.href.split('?')[1])
	  
    	$('.rcp-topbtn').on('click',function(evnet){
    		if($(event.target).is('#subscribeComplete')){
    			$.ajax({
	    			url:'recipe/deleteSubscribe.json',
	    			datatype:'json',
	    			data:{
	    				fromUserNo:4
	    			},
	    			method:'post',
	    			success:(function(){
	    				console.log('구독하기 해제 성공성공')
	    				$('.rcp-topbtn').text('구독하기');
	    				$('.rcp-topbtn').attr('id','');
	    			}),
	    			error:(function(){
	    				console.log('구독하기 서버요청 error');
	    			})
	    		});    			
    		}else{
	    		$.ajax({
	    			url:'recipe/addSubscribe.json',
	    			datatype:'json',
	    			data:{
	    				fromUserNo:4
	    			},
	    			method:'post',
	    			success:(function(){
	    				console.log('구독하기 성공성')
	    				$('.rcp-topbtn').text('구독하기 완료');
	    				$('.rcp-topbtn').attr('id','subscribeComplete');
	    			}),
	    			error:(function(){
	    				console.log('구독하기 서버요청 error');
	    			})
	    		});
    	}
    	})
    	
 
    })
    

  


/*탑바 js(common.js 에 공통적으로 들어갈부분 일단 넣음*/
   $(function() {
      //getWeather();
      //getRealTimeRank();

      /* 준모3 */
      if (eval(sessionStorage.getItem('data')) != null) {

        $('#topbarUserImg')
            .html(
                "<img class='rcp-barimg dropdown-trigger img-circle' src='img/Chef3.jpg' />");

      }

      $('.profile-dropdown:has(.active)').bind('click', function() {

      });

      $(window).bind('scroll', function(e) {
        $('.main-nav__dropdown').removeClass('active');
      });

      $('.dropdown-trigger')
          .on(
              'click',
              function(event) {
                event.preventDefault();
                dropdownClick('.profile-dropdown',
                    '.mobile-menu-dropdown');
                /* 용이 추가() */
                if (eval(sessionStorage.getItem('data'))[0].userNo != null) {
                  $('#profileEmail')
                      .text(
                          eval(sessionStorage
                              .getItem('data'))[0].email);
                  $('#profileName')
                      .text(
                          eval(sessionStorage
                              .getItem('data'))[0].userName);
                  $('#profileGrade')
                      .text(
                          eval(sessionStorage
                              .getItem('data'))[0].recipeUrl);
                  /* 용이 추가() */
                  $('#introduce')
                      .text(
                          eval(sessionStorage
                              .getItem('data'))[0].intro);
                }
              });
      $('.dropdown-trigger').on('scroll', function() {
        dropdownClick('.profile-dropdown', '.mobile-menu-dropdown');
      });

      $('.dropdown-trigger--mobile').on('click', function() {
        dropdownClick('.mobile-menu-dropdown', '.profile-dropdown');
      });
  });
	/*탑바 js 끝*/

	var sourceVisitor = $('#visitor-template').html();
    var templateVisitor = Handlebars.compile(sourceVisitor);
    
    loadVisitor();
    
    function loadVisitor(){
      $.ajax({
        url :'/visitor/list.json',
        dataType : 'json',
        method : 'get',
        success : function(result) {
          if (result.status != 'success') {
            swal('실행 중 오류 발생');
            return;
          }

          $('#Vst').append(templateVisitor(result));
        },
        error : function() {
          swal('서버 요청 오류!...')
        }
      }); 
    }  
      
      /* Add */
      $('#rcp-rpBtn').click(function() {
    	  /* swal({   title: "방명록 작성 완료!",   
    		  html: true }); */
    	  
      $.ajax({
        url : 'visitor/add.json',
        method : 'post',
        data : {
          visitorContent : $('#rcp-rpcontent').val()
        },
        dataType : 'json',
        success : function(result) {
          if (result.status != 'success') {
            swal('등록 오류입니다.');
            return;
          }
                    
          $('#Vst>').remove(); 
          loadVisitor(); // 테이블 데이터를 갱신한다.
        },
        error : function() {
          swal('서버 요청 오류 !')
        }
      })
      $('#rcp-rpcontent').val("");
    });

      $(document).on('click','.vstDeleteBtn',function(event) {
    	   var vNo = $(this).attr('data-index');
    	    swal({   title: "방명록 삭제?",   
    	        text: "진짜 지울꺼야??",   
    	        type: "warning",   
    	        showCancelButton: true,
    	        confirmButtonColor: "#DD6B55",   
    	        confirmButtonText: "delete",   
    	        closeOnConfirm: false }, function(){
    	    $.getJSON('visitor/delete.json?no=' + vNo,
    	                 function(result) {
    	                if (result.status != 'success') {
    	                    swal('게시물 삭제 오류');
    	                    return;
    	                  }
    	                $(this).parent().parent().parent().parent().remove();
    	                $('#Vst>').remove(); 
    	                  loadVisitor();
    	        });
    	     swal.close();
    	    });
    	   });
      
      
    /* 업데이트 */
    
      $(document).on('click','.vstUpdateBtn',function(event) {
      event.preventDefault();
      $('.vst-contents[data-index='+$(this).attr('data-index')+']').html(
                    '<div class="rcp-Vst-contents"><textarea id="updatevContent" rows="3" cols="34" placeholder="편집해주세요" style="resize:none;"></textarea></div>');
      $('.editBtn1[data-index='+$(this).attr('data-index')+']').html('<img class="vstConfirmBtn" id="vstConfirmBtn" data-index="'+$(this).attr('data-index')+' "'+
                'src="/img/vstConfirmBtn.png">')
                
          });
   
	    $(document).on('click','.vstConfirmBtn',function(event) {
	    	event.preventDefault();
	    	/* swal({   title: "방명록 업데이트 완료!",   
	            html: true }); */
	      $.post('visitor/update.json', 
	    	{
	    	  visitorNo : $(this).attr('data-index'),
	    	  visitorContent : $('#updatevContent').val()
	      }, function(result) {
	        if (result.status != 'success') {
	          swal('변경 오류입니다.');
	          return;
	        }
	    	  $('#Vst>').remove(); 
	          loadVisitor(); // 테이블 데이터를 갱신한다.
	      }, 'json');
	      event.preventDefault();
	    });
	      
		$(document).on('mouseenter','.rcp-Vst-slotRp',function(){
			$('.addDelete').html('<img id="addDeleteBtn"'+
			        'src="/img/vstDeleteBtnWt.png">');
		});
		
		$(document).on('mouseleave','.rcp-Vst-slotRp',function(){
			$('.addDelete').text('');
		    });
		
		$(document).on('click','#addDeleteBtn',function(evenet){
			event.preventDefault();
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

    /*$(document).ready(function() {
      //setInterVal(사용할 함수, 1/1000초)  즉 quick함수를 1/1000초마다 실행
      setInterval(quick, 1);
    });

    function quick() {
      //현재 스크롤바 top 위치, .scrollTop() - 선택한 element의 scroll 가능한 영역에서 가장 위쪽 위치
      //currentY = $(window).scrollTop();

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
      $("#quick").css("left", -13);
    }
    */
    
  