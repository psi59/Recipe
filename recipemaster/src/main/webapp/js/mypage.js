document.write('<script type"text/javascript" src="js/common.js"></script>')
$(function() {
	console.log(location.href.split('?')[1]);

	$.ajax({
		url : 'recipe/userPage.json',
		dataType : 'json',
		method : 'post',
		data : {
			email : location.href.split('?')[1],
			request : 1
		},
		success : function(result) {

			if (result.status != 'success') {
				alert('comList 실행 중 오류 발생');
				return;
			}

			$('#updateFormUserNo').val(result.user.userNo);

			var sourceCRList = $('#temp').text();
			var templateCRList = Handlebars.compile(sourceCRList);

			$('.rcp-userPage-userName').text(result.user.userName);
			console.log("userProfile : "+result.user.image);
			
			if(result.user.image != null && result.user.image !=''){
			$('.rcp-topimg').attr('src','img/profileImg/'+result.user.image);
			}
			
			$('#tabs-1 .hs-content .container .row .rcp-mypage-section')
			.append(templateCRList(result));
			console.log(result.data);

			$('.rcp-Vst').remove();
			/*$('.rcp-Vst-write').remove();*/

			for(var i=0; i<result.data.length; i++){
//				for(var j=0; j<result.data[i].representImages.length; j++){
				$('div[name="recipe-image"]:eq('+i+')').attr('style','background-image:url(img/representImg/'+result.data[i].representImages[0]+')');

//				}
			}
		},
		error : function() {
			// alert('community 서버 요청 오류!...')
		}
	});

	// checkSubscribe
	$.ajax({
		url : 'recipe/checkSubscribe.json',
		datatype : 'json',
		data : {
			email : location.href.split('?')[1]
		},
		method : 'post',
		success : function(result) {
			if (result.status == 'false') {
				// swal('실행 중 오류 발생');
				return;
			}
			$('.rcp-topbtn').text('구독중');
			$('.rcp-topbtn').attr('id', 'subscribeComplete');
		},
		error : function() {
			swal('서버 요청 오류!...')
		}
	});

	$('.rcp-topbtn').on('click', function(evnet) {
		if ($(event.target).is('#subscribeComplete')) {
			$.ajax({
				url : 'recipe/deleteSubscribe.json',
				datatype : 'json',
				data : {
					email : location.href.split('?')[1]
				},
				method : 'post',
				success : (function() {

					console.log('구독하기 해제 성공성공')
					$('.rcp-topbtn').text('구독하기');
					$('.rcp-topbtn').attr('id', '');
				}),
				error : (function() {
					console.log('구독하기 서버요청 error');
				})
			});
		} else {
			$.ajax({
				url : 'recipe/addSubscribe.json',
				datatype : 'json',
				data : {
					email : location.href.split('?')[1]
				},
				method : 'post',
				success : (function(result) {
					if (result.status == 'failure') {
						console.log(result);
						swal('로그인 후 이용가능합니다.');
						return;
					} else {
						console.log('구독하기 성공성')
						$('.rcp-topbtn').text('구독중');
						$('.rcp-topbtn').attr('id', 'subscribeComplete');
					}
				}),
				error : (function(result) {
					console.log('구독하기 서버요청 error');
				})
			});
		}

	});

	pageTabs();
	loadMyPage();
});

/* 탑바 js(common.js 에 공통적으로 들어갈부분 일단 넣음 */
$(function() {
	// getWeather();
	// getRealTimeRank();

	/* 준모3 */

	$('#topbarUserImg')
	.html(
	"<img class='rcp-barimg dropdown-trigger img-circle' src='img/Chef3.jpg' />");

	$('.profile-dropdown:has(.active)').bind('click', function() {

	});

	$(window).bind('scroll', function(e) {
		$('.main-nav__dropdown').removeClass('active');
	});

	$('.dropdown-trigger').on(
			'click',
			function(event) {
				event.preventDefault();
				dropdownClick('.profile-dropdown', '.mobile-menu-dropdown');
				/* 용이 추가() */
				if (eval(sessionStorage.getItem('data'))[0].userNo != null) {
					$('#profileEmail').text(
							eval(sessionStorage.getItem('data'))[0].email);
					$('#profileName').text(
							eval(sessionStorage.getItem('data'))[0].userName);
					$('#profileGrade').text(
							eval(sessionStorage.getItem('data'))[0].recipeUrl);
					/* 용이 추가() */
					$('#introduce').text(
							eval(sessionStorage.getItem('data'))[0].intro);
				}
			});
	$('.dropdown-trigger').on('scroll', function() {
		dropdownClick('.profile-dropdown', '.mobile-menu-dropdown');
	});

	$('.dropdown-trigger--mobile').on('click', function() {
		dropdownClick('.mobile-menu-dropdown', '.profile-dropdown');
	});
});
/* 탑바 js 끝 */

var sourceVisitor = $('#visitor-template').html();
var templateVisitor = Handlebars.compile(sourceVisitor);

function loadVisitor() {
	$.ajax({
		url : '/visitor/list.json',
		dataType : 'json',
		method : 'get',
		data : {
			email : location.href.split('?')[1],
		},
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
$(document).on('click','#rcp-rpBtn', function() {
	$.ajax({
		url : 'visitor/add.json',
		method : 'post',
		data : {
			visitorContent : $('#rcp-rpcontent').val(),
			toUser : $('#updateFormUserNo').val()
		},
		dataType : 'json',
		success : function(result) {
			if (result.status != 'success') {
				swal('로그인해라.');
				$('#login-pop-up-banner').bPopup();//20160830 용이 추가
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

$(document).on('click', '.vstDeleteBtn', function(event) {
	event.preventDefault();
	var vNo = $(this).attr('data-index');
	swal({
		title : "방명록 삭제?",
		text : "진짜 지울꺼야??",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : "#DD6B55",
		confirmButtonText : "delete",
		closeOnConfirm : false
	}, function() {
		$.getJSON('visitor/delete.json?no=' + vNo, function(result) {
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
	$(
			'.vst-contents[data-index='
			+ $(this).attr('data-index') + ']')
			.html(
			'<div class="rcp-Vst-contents"><textarea id="updatevContent" rows="7" cols="43" placeholder="편집해주세요" style="resize:none;"></textarea></div>');
	$(
			'.editBtn1[data-index='
			+ $(this).attr('data-index') + ']').html(
					'<button type="button" class="btn btn-success btn-xs vstConfirmBtn" id="vstConfirmBtn" data-index="'
					+ $(this).attr('data-index') + ' "'
					+ '>완료</button>');
	$(
			'.editBtn2[data-index='
			+ $(this).attr('data-index') + ']').html(
					'<button type="button" class="btn btn-warning btn-xs vstResetBtn" id="vstResetBtn" data-index="'
					+ $(this).attr('data-index') + ' "'
					+ '>취소</button>');

});

$(document).on('click','.vstResetBtn',function(event) {
	event.preventDefault();
	$('#Vst>').remove();
	loadVisitor();
});

$(document).on('click', '.vstConfirmBtn', function(event) {
	event.preventDefault();
	/*
	 * swal({ title: "방명록 업데이트 완료!", html: true });
	 */
	$.post('visitor/update.json', {
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

function pageTabs() {
	$('.rcp-Vst-write').hide();
	$('.isotope-filter a')
	.on(
			'click',
			function(event) {
				event.preventDefault();
				var request;
				var url = 'recipe/userPage.json';

				if($(event.target).is('#searchRecipe')){
					request=1;
					$('.rcp-Vst').hide();
					$('.rcp-Vst-write').hide();
				}
				else if($(event.target).is('#searchScrap')){
					request=2;
					$('.rcp-Vst').hide();
					$('.rcp-Vst-write').hide();
				}else if($(event.target).is('#searchSubscribe')){
					request=3;
					$('.rcp-Vst').hide();
					$('.rcp-Vst-write').hide();
				}else{
					request = 4;
					$('.rcp-Vst').remove();
					loadVisitor();
				}

				$
				.ajax({
					url : url,
					dataType : 'json',
					method : 'post',
					data : {
						email : location.href.split('?')[1],
						request : request
					},
					success : function(result) {

						if (result.status != 'success') {
							alert('comList 실행 중 오류 발생');
							return;
						}

						var sourceCRList = $('#temp').text();
						var templateCRList = Handlebars
						.compile(sourceCRList);

						console.log(result.data);

						$(
								'#tabs-'
								+ $('#tabId').val()
								+ ' .hs-content .container .row .rcp-mypage-section div')
								.remove();
						$(
								'#tabs-'
								+ request
								+ ' .hs-content .container .row .rcp-mypage-section')
								.append(templateCRList(result));
						$('#tabId').val(request);

						console.log(result.data);
						for (var i = 0; i < result.data.length; i++) {
							// for(var j=0;
							// j<result.data[i].representImages.length;
							// j++){
							$(
									'div[name="recipe-image"]:eq('
									+ i + ')')
									.attr(
											'style',
											'background-image:url(img/representImg/'
											+ result.data[i].representImages[0]
											+ ')');

							// }
						}
					},
					error : function() {
						alert('community 서버 요청 오류!...')
					}
				});
			})
}


function loadMyPage(){



	$.ajax({
		url : '/visitor/loadMyPage.json',
		datatype:'json',
		data:{
			email:location.href.split('?')[1]
		},
		method:'post',
		success : function(result) {
			if (result.status == 'false') {
				//swal('로그인 해주시기 바랍니다.');
				return;
			}
			$('#visitNum').text(result.sum+"명");
			$('#likeNum').text(result.like+"개");
			$('#scrapNum').text(result.scr+"개");
			$('#gradeNum').text(result.avg+"점");

		},
		error : function() {
			//swal('더이상 데이터가 없습니다.')
		}
	})  
};
