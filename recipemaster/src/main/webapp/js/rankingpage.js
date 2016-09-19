$(function() {
	loadUsers();
//	$('.rankingWrapper').bxSlider({
//	startSlide : 0,
//	pager : false,
//	moveSlides : 1,
//	infiniteLoop : true
//	});
	loadMonthRank();
	loadTodayRank();

	function loadUsers() {
		var source = $('#main-chefRanking').text();
		var template = Handlebars.compile(source);

		$.ajax({
			url : contextRoot+'user/top3.json',
			dataType : 'json',
			method : 'get',
			async : false,
			success : function(result) {
				if (result.status != 'success') {
					swal('chefCard.js 오류');
					return;
				}
				console.log("result : " +result)
				console.log("result.data : " +result.data)
				for (var i = 0; i < result.data.length; i++) {
					if (result.data[i].subscribeUser == 0) {
						result.data[i].status = null;
					} else {
						result.data[i].status = Boolean(true);
					}
				}

				$('.wrapper-chefs').append(template(result));
			},
			error : function() {
				swal('서버 요청 오류!...')
			}
		});
	}// end of 쉐프카드

	function loadMonthRank() {
		var source = $('#chef-card-template').text();
		var template = Handlebars.compile(source);

		$.ajax({
			url : contextRoot+'user/monthtop3.json',
			dataType : 'json',
			method : 'get',
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
				$('#rcp-chef-rank-month').append(template(result));
			},
			error : function() {
				swal('서버 요청 오류!...')
			}
		});
	}// end of 쉐프카드

	function loadTodayRank() {
		var source = $('#chef-card-template').text();
		var template = Handlebars.compile(source);

		$.ajax({
			url : contextRoot+'user/todaytop3.json',
			dataType : 'json',
			method : 'get',
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
				$('#rcp-chef-rank-today').append(template(result));
			},
			error : function() {
				swal('서버 요청 오류!...')
			}
		});
	}// end of 쉐프카드
});

$(document).on('click', '.rcp-userName, .rcp-nickname , .rcp-profile',function(event){
	event.preventDefault();
	console.log( "event target : "+$(event.target).attr('class') )
	$(location).attr('href',contextRoot+'/mypage.html?'+$(event.target).parent().children('input[type="hidden"]').val() );
	console.log("email val()"+$(event.target).parent().children('input[name="email"]').val() );
})

$('.rcp-BoC').on('click',function(){
	$(location).attr('href',contextRoot+'ranking.html');
})

