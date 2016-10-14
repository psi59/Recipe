function loadTop3Rank(param) {
	$.ajax({
		url : contextRoot+'rank/getTop3Rank.json',
		data : {
			param : param
		},
		dataType : 'json',
		method : 'get',
		async : false,
		success : function(result) {
			if (result.status != 'success') {
				swal('chefCard.js 오류');
				return;
			}
			for (var i = 0; i < result.data.length; i++) {
				if (result.data[i].subscribeUser == 0) {
					result.data[i].status = null;
				} else {
					result.data[i].status = Boolean(true);
				}
			}

			switch(param) {
				case 0:
					getTop3RankTemplate('.wrapper-chefs', result);
					break;
				case 1:
					getTop3RankTemplate('#rcp-chef-rank-month', result);
					break;
				case 2:
					getTop3RankTemplate('#rcp-chef-rank-today', result);
					break;
			}
		},
		error : function() {
			swal('서버 요청 오류!...')
		}
	});
}// end of 쉐프카드

function loadRanking(url, hbsFileName, target) {
	$.ajax({
		url : url,
		dataType : 'json',
		method : 'get',
		success : function(result) {
			if (result.status != 'success') {
				alert('실행중 오류 발생');
				return;
			}
			hbsTemplate(hbsFileName, target, result);
		},
		error : function() {
			alert('서버 요청 오류');
		}
	});
}

function loadMyRanking() {
	$.ajax({
		url : 'rank/myrank.json',
		dataType : 'json',
		method : 'get',
		success : function(result) {
			if (result.status != 'success') {
				alert('실패');
				return;
			}
			var list = result.data;
			if(list!=null){
				var appendData = 
					'<h2 class="rcp-ranking-middle-background-comment" id="chefMyRanking">'
					+'내 순위는 ' +list.rownum+'등 입니다. [ '+list.grade+' ] <br/>'+
					'레시피 '+list.recipeCount+'개 / 구독자 '+list.subsCount+'명 / 토탈포인트 '
					+list.totalPoint+'점</h2>'
			} else {
				var appendData = 
					'<h2 class="rcp-ranking-middle-background-comment" id="chefMyRanking">로그인 하시면 나의 랭킹을 확인할 수 있습니다.</h2>'
			}
			$('.rcp-profileCover').append($(appendData));
			console.log(result);
		},
		error : function() {
			alert('서버 요청 오류');
		}
	});
}  

$(document).on('click', '.rcp-userName, .rcp-nickname , .rcp-profile',function(event){
	event.preventDefault();
	console.log( "event target : "+$(event.target).attr('class') )
	$(location).attr('href',contextRoot+'mypage.html?'+$(event.target).parent().children('input[type="hidden"]').val() );
	console.log("email val()"+$(event.target).parent().children('input[name="email"]').val() );
})

$('.rcp-BoC').on('click',function(){
	$(location).attr('href',contextRoot+'ranking.html');
})