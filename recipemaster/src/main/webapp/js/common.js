var source = $('#recipe-card-template').html();
var template = Handlebars.compile(source);
function onlyNumber()
{
	if ((event.keyCode<48)||(event.keyCode>57))
	event.returnValue = false;
}

//날씨 정보 받는 function
function getWeather(){
	$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=37.541&lon=126.986&appid=a0ccb666270bab97723eace09ed1b61c',
            function(result) {
//			swal(result.weather[0].main);
    });
}
//날씨 정보 받는 function 종료 - 박상일

//실시간 랭크 function 시작
function getRealTimeRank(){
	var recipe = [ "<a href='#'>1.  준모준모준모띠</a>",
					"<a href='#'>2.  냉장고를 부탁해</a>",
					"<a href='#'>3.  집밥백선생</a>", "<a href='#'>4.  쿡가대표</a>",
					"<a href='#'>5.  보노보노 구이</a>", "<a href='#'>6.  포로리찜</a>",
					"<a href='#'>7.  너부리라면</a>", "<a href='#'>8.  까르보나라</a>",
					"<a href='#'>9.  빠네</a>", "<a href='#'>10. 아메리카노</a>" ];

	var chef = [ "<a href='#'>1.  박상일</a>", "<a href='#'>2.  이성현</a>",
			"<a href='#'>3.  길용이</a>", "<a href='#'>4.  성준모</a>",
			"<a href='#'>5.  고재현</a>", "<a href='#'>6.  엄진영강사님</a>",
			"<a href='#'>7.  김영진강사님</a>", "<a href='#'>8.  강소희매니저</a>",
			"<a href='#'>9.  최현석</a>", "<a href='#'>10. 이연복</a>" ];
	$("#rt_rank_recipe").srolling({
		data : recipe,
		auto : true,
		delay : 3000, // 자동 이동 후 대기 시간
		item_count : 5, // 블릿은 아이템 1개만 사용할 수 있습니다.
		width : 110,
		height : 25,
		delay_frame : 400,
		move : 'up'
	});

	$("#rt_rank_chef").srolling({
		data : chef,
		auto : true,
		delay : 3000, // 자동 이동 후 대기 시간
		item_count : 5, // 블릿은 아이템 1개만 사용할 수 있습니다.
		width : 110,
		height : 25,
		delay_frame : 400,
		move : 'up'
	});	
}
//실시간 랭크 function 종료	- 박상일

//userInfoBox 드롭다운 function 시작
function dropdownClick(target, other) {
	if ($(other).hasClass('active')) {
		$(other).removeClass('active');
	}
	$(target).toggleClass('active');
}
//userInfoBox 드롭다운 function 종료 - 박상일

//signUpBtn 팝업 , 불투명 배경 띄우기
$('#signUpBtn').on('click', function(event){
	event.preventDefault();
	$('#signup-pop-up-banner').bPopup();
});

$('#signUpTopBtn').on('click', function(event){
	event.preventDefault();
	$('#signup-pop-up-banner').bPopup();
});

//loginBtn팝업 , 불투명 배경 띄우기
$('#loginBtn').on('click', function(event){
	event.preventDefault();
	$('#login-pop-up-banner').bPopup();
});

//스크롤 내리면 생기는 loginBtn팝업 , 불투명 배경 띄우기
$('#topLoginBtn').on('click', function(event){
	event.preventDefault();
	$('#login-pop-up-banner').bPopup();
});

//-----------------------------랜덤 레시피 ---------------------------------
  $('#rcp-random-recipe').on('click',function(event){
    event.preventDefault();
    randomRecipe();    
	$('#random-pop-up-banner').bPopup();
	var slot_roll1 = new Slot_roll('#rcp-randomRacipeCardWrapper-slot');
	if( $('#rcp-randomRacipeCardWrapper-slot').is(':not(:animated)') ){
		slot_roll1.dice();
	}	
  });
  
  $(document).on('click','#rcp-re-recipe',function(){
	 randomRecipe();
	 var slot_roll1 = new Slot_roll('#rcp-randomRacipeCardWrapper-slot');
	 if( $('#rcp-randomRacipeCardWrapper-slot').is(':not(:animated)') ){
			slot_roll1.dice();
		}	 
  });
  
  function randomRecipe(){
  	  $.ajax({	  		  
  		  url:'recipe/randomList.json',
  		  dataType:'json',
  		  method:'post',
  		  async: false,
  		  success:function(result){
  			  if (result.status !='success'){
  				  swal('실행중 오류 발생');
  				  return;
  			  }
  			  var list = result.data;
  			  $('#rcp-randomRacipeCardWrapper').html('');
  			  $('#rcp-randomRacipeCardWrapper').append( template(result) );
			  for(var i=0; i<result.data.length; i++){
					  $('#rcp-randomRacipeCardWrapper div[name="recipe-image"]:eq('+i+')').attr('style','background-image:url(img/representImg/'+result.data[i].representImages[0]+')');
			  }
  			  methods();  			  
  		  },
  		  error : function(){
  			  console.log('randomList: 서버 요청 오류');
  		  }
  	  });
  }


Handlebars.registerHelper('defaultImage', function(options) {
		 
	  if (this.user.image == null || this.user.image =='') {
		  return options.inverse(this);
	  } else {
	    return options.fn(this);
	  }
});

function comList(){
	  $(document).on('click', '.rcp-userName, .rcp-nickname , .rcp-profile',function(event){
		  event.preventDefault();
		  console.log( "event target : "+$(event.target).attr('class') )
		  $(location).attr('href','/mypage.html?'+$(event.target).parent().children('input[type="hidden"]').val() );
		  console.log("email val()"+$(event.target).parent().children('input[name="email"]').val() );
	  })
}

function slotRoller(spd, selector) {
	var speed = 80; // slot 회전 속도
	var firstChild = $("#rcp-randomRacipeCardWrapper-slot .slotCard:first-child");
		lastChild = $("#rcp-randomRacipeCardWrapper-slot .slotCard:last-child");

	// slot 목록을 순환
	$(selector).animate({ 
		marginTop: "-950px"
		}, speed + (spd * 30 + spd), "linear", function(){
			// 첫째 목록을 마지막으로 이동
			firstChild = $("rcp-randomRacipeCardWrapper-slot:first-child", this);
			$(this).append(firstChild);
			$(this).css({ marginTop: "-425px"});
	});
}

/* 슬롯 객체를 정의 */
function Slot_roll(slotName){
	this.dice = function(){
		for (var i = 0; i < 8; i++) {
			slotRoller(i, slotName);
		}
	}
}