// 이성현

$(document).ready(function(){
	
	// Lift card and show stats on Mouseover
	$('.product-card').hover(function(){
			$(this).addClass('animate');
			$('div.carouselNext, div.carouselPrev').addClass('visible');			
		 }, function(){
			$(this).removeClass('animate');			
			$('div.carouselNext, div.carouselPrev').removeClass('visible');
	});	
	
	// Flip card to the back side
	$('.view_details').click(function(){		
		$('div.carouselNext, div.carouselPrev').removeClass('visible');
		$('.product-card').addClass('flip-10');
		setTimeout(function(){
			$('.product-card').removeClass('flip-10').addClass('flip90').find('div.shadow').show().fadeTo( 80 , 1, function(){
				$('.product-front, #product-front div.shadow').hide();			
			});
		}, 50);
		
		setTimeout(function(){
			$('.product-card').removeClass('flip90').addClass('flip190');
			$('.product-back').show().find('div.shadow').show().fadeTo( 90 , 0);
			setTimeout(function(){				
				$('.product-card').removeClass('flip190').addClass('flip180').find('div.shadow').hide();						
				setTimeout(function(){
					$('.product-card').css('transition', '100ms ease-out');			
					$('.cx, .cy').addClass('s1');
					setTimeout(function(){$('.cx, .cy').addClass('s2');}, 100);
					setTimeout(function(){$('.cx, .cy').addClass('s3');}, 200);				
					$('div.carouselNext, div.carouselPrev').addClass('visible');				
				}, 100);
			}, 100);			
		}, 150);			
	});			
	
	// Flip card back to the front side
	$('.flip-back').click(function(){		
		
		$('.product-card').removeClass('flip180').addClass('flip190');
		setTimeout(function(){
			$('.product-card').removeClass('flip190').addClass('flip90');
	
			$('.product-back div.shadow').css('opacity', 0).fadeTo( 100 , 1, function(){
				$('.product-back, .product-back div.shadow').hide();
				$('.product-front, .product-front div.shadow').show();
			});
		}, 50);
		
		setTimeout(function(){
			$('.product-card').removeClass('flip90').addClass('flip-10');
			$('.product-front div.shadow').show().fadeTo( 100 , 0);
			setTimeout(function(){						
				$('.product-front div.shadow').hide();
				$('.product-card').removeClass('flip-10').css('transition', '100ms ease-out');		
				$('.cx, .cy').removeClass('s1 s2 s3');			
			}, 100);			
		}, 150);			
		
	});	

	
	/* ----  Image Gallery Carousel   ---- */
	
	var carousel = $('.carousel ul');
	var carouselSlideWidth = 335;
	var carouselWidth = 0;	
	var isAnimating = false;
	
	// building the width of the casousel
	$('.carousel li').each(function(){
		carouselWidth += carouselSlideWidth;
	});
	$(carousel).css('width', carouselWidth);
	
	// Load Next Image
	$('div.carouselNext').on('click', function(){
		var currentLeft = Math.abs(parseInt($(carousel).css("left")));
		var newLeft = currentLeft + carouselSlideWidth;
		if(newLeft == carouselWidth || isAnimating === true){return;}
		$('.carousel ul').css({'left': "-" + newLeft + "px",
							   "transition": "300ms ease-out"
							 });
		isAnimating = true;
		setTimeout(function(){isAnimating = false;}, 300);			
	});
	
	// Load Previous Image
	$('div.carouselPrev').on('click', function(){
		var currentLeft = Math.abs(parseInt($(carousel).css("left")));
		var newLeft = currentLeft - carouselSlideWidth;
		if(newLeft < 0  || isAnimating === true){return;}
		$('.carousel ul').css({'left': "-" + newLeft + "px",
							   "transition": "300ms ease-out"
							 });
	    isAnimating = true;
		setTimeout(function(){isAnimating = false;}, 300);			
	});
	
	// 쉐프카드
	loadUsers();
	
	function loadUsers() {

		var source = $('#chef-card-template').text();
		var template = Handlebars.compile(source);

		$.ajax({
			url : 'user/top3.json',
			dataType : 'json',
			method : 'get',
			success : function(result) {
				if (result.status != 'success') {
					swal('chefCard.js 오류');
					return;
				}

				$('#rcp-chef-rank').append(template(result));
			},
			error : function() {
				swal('서버 요청 오류!...')
			}
		});		
	}
	
	/*---------start of checkSubscribe----------*/
	/*$.ajax({
		url : 'recipe/checkSubscribe.json',
		datatype : 'json',
		data : {
			email : $('#rankcard0').attr('data-email')
		},
		method : 'post',
		success : function(result) {
			if (result.status == 'false') {
				// swal('실행 중 오류 발생');
				return;
			}
			$('.rcp-imp').text('구독중');
			$('.rcp-imp').attr('id', 'subscribeComplete');
		},
		error : function() {
			swal('서버 요청 오류!...')
		}
	});*/
	/*---------end of checkSubscribe----------*/
	
	
	
	$(document).on('click', '.rank-scs', function(evnet) {
		var target =$(this); 
		if ($(event.target).is('#subscribeComplete')) {
			$.ajax({
				url : 'recipe/deleteSubscribe.json',
				datatype : 'json',
				data : {
					email : target.attr('data-email')
				},
				method : 'post',
				success : (function() {

					console.log('구독하기 해제 성공성공')
					target.text('구독하기');
					target.attr('id', '');
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
					email : target.attr('data-email')
				},
				method : 'post',
				success : (function(result) {
					if (result.status == 'failure') {
						console.log(result);
						swal('로그인 후 이용가능합니다.');
						return;
					} else {
						console.log('구독하기 성공성')
						
						target.text('구독중');
						target.attr('id', 'subscribeComplete');
						
					}
				}),
				error : (function(result) {
					console.log('구독하기 서버요청 error');
				})
			});
		}

	});
	/*----------------*/
	
	
	
});
