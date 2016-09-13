document.write('<script type"text/javascript" src="js/template/notification.js"></script>')

//var source = $('#recipe-card-template').html();
//var template = Handlebars.compile(source);
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
//실시간 랭크 function 종료	- 박상일

//userInfoBox 드롭다운 function 시작
function dropdownClick(target, other) {
	if ($(other).hasClass('active')) {
		$(other).removeClass('active');
	}
	$(target).toggleClass('active');
}
//userInfoBox 드롭다운 function 종료 - 박상일


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
		  $(location).attr('href','/mypage.html?'+$(event.target).parent().children('input[class="rcp-hidden-email"]').val() );
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

function isNumber(s) {
	  s += ''; // 문자열로 변환
	  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
	  if (s == '' || isNaN(s)) return false;
	  return true;
}

function push(email, message, separation){
	var socket = io.connect('http://127.0.0.1:8081');
	
	if(email==null){
		return;
	}
	
	if(separation=='login'){
		data = {
			uid: email
		}
	} else if(separation=='message'){
		data={
			uid: email,
			msg: message
		}
	}
	
	socket.emit(separation, data);
	
	socket.on('message',function(data){
		console.log(data);
		notifyMe(data);
    });
}