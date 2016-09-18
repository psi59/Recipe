	
  <script id="chef-card-template" type="text/x-handlebars-template"> 
{{#each data}}
<div class="fresh-ui-wrap col-md-3">
 {{#if @first}}    
    <img class="rcp-rankmedal" src="/img/medal1.png"/>
  {{else if @last}}    
    <img class="rcp-rankmedal" src="/img/medal3.png"/>
  {{else}}   
    <img class="rcp-rankmedal" src="/img/medal2.png"/>
  {{/if}}
  
  <div class="fresh-ui">
    <div class="header">
      <div class="photo">     
      <input type="hidden" class="rcp-hidden-email" value="{{email}}">
             <img src="img/profileImg/{{image}}" class="img-circle rcp-profile">
      </div>
      <div class="social">
        <div class="list">
          <a data-title="Recipe">{{recipeCount}}</a>
          <a data-title="구독자">{{subsCount}}</a>
          <!--<a data-title="좋아요">{{likeCount}}</a>-->
          <a data-title="Total">{{totalPoint}}</a>
        </div>
      </div>
    </div>
        <div class="content introBox">
          <div class="name">
                   <p class="rcp-userName1">{{userName}}</p></div>
                    <p class="text">{{email}}</p>      
                  <div class="rcp-ranking"><h4>{{grade}}</h4></div>
          <div class="list clearfix">
        <p class="introfont">{{intro}}</p>
        </div>
        <div class="cardbtn">
         <button type="button" class="btn btn-default rcp-imp">
              <a href="/mypage.html?{{email}}" class="visitbtn">방문하기</a></button>
              {{#if status}}
              <button type="button" name="subscribeComplete" class="btn btn-default rcp-imp rank-scs" data-email="{{email}}" >구독중</button>
              {{else}}
              <button type="button" class="btn btn-default rcp-imp rank-scs" data-email="{{email}}" >구독하기</button>
               {{/if}}
      </div>
    </div>
  </div>
</div>
  {{/each}} 
  </script>

	<script id="chef-rank-template" type="text/x-handlebars-template">
  {{#each data}}
      <div class="row rcp-font hover effect8">
        <div class="col-md-2">{{rownum}}
      </div>
        <div class="col-md-2">
          <div class="name"><input type="hidden" value="{{email}}">
                   <a href="#" class="rcp-userName">{{userName}}</a></div>
        </div>
        <div class="col-md-2">{{recipeCount}} 개</div>
        <div class="col-md-2">{{subsCount}} 명</div>
        <div class="col-md-2">{{totalPoint}} 점</div>
        <div class="col-md-2 ">{{grade}}</div>
</div>
  {{/each}}
  </script>
  <script id="chef-myrank-template" type="text/x-handlebars-template">
  {{#each data}}
      <div class="row rcp-font hover effect8">
        <div class="col-md-2">{{rownum}}
      </div>
      <div class="col-md-2">
        <div class="name"><input type="hidden" value="{{email}}">
                   <a href="#" class="rcp-userName">{{userName}}</a></div>
        </div>
        <div class="col-md-2">{{recipeCount}} 개</div>
        <div class="col-md-2">{{subsCount}} 명</div>
        <div class="col-md-2">{{totalPoint}} 점</div>
        <div class="col-md-2 ">{{grade}}</div>
      </div>
  {{/each}}
  </script>
	<script>
    var sourceChef = $('#chef-rank-template').text();
    var templateChef = Handlebars.compile(sourceChef);
    loadChefRanking();

    function loadChefRanking() {
      $.ajax({
        url : 'user/rank.json',
        dataType : 'json',
        method : 'get',
        success : function(result) {
          if (result.status != 'success') {
            alert('실행중 오류 발생');
            return;
          }
          var list = result.data;
          $('#chefRanking').append(templateChef(result));
          console.log(result.data);
        },
        error : function() {
          alert('서버 요청 오류');
        }
      });
    }
  </script>
	<script id="recipe-rank-template" type="text/x-handlebars-template">
    {{#each data}}
      <div class="row rcp-font hover effect8">
        <div class="col-md-2">{{rownum}}</div>
        <div class="col-md-2">
          <a href="#" class="detail rcp-rcpName" style="z-index:9999">{{recipeName}} </a> 
          <input type="hidden" name="recipeNo" value="{{recipeNo}}"></div>
        <div class="col-md-2">{{countLike}} 개</div>
        <div class="col-md-2">{{countScrap}} 개</div>
        <div class="col-md-2">{{hits}} 개</div>
        <div class="col-md-2">{{totalPoint}} 점</div>
      </div>
  {{/each}}
  </script>
	<script>
    var sourceRcp = $('#recipe-rank-template').text();
    var templateRcp = Handlebars.compile(sourceRcp);
    loadRcpRanking();

    function loadRcpRanking() {
      $.ajax({
        url : 'recipe/rank.json',
        dataType : 'json',
        method : 'get',
        success : function(result) {
          if (result.status != 'success') {
             alert('실행중 오류 발생');
            return;
          }
          var list = result.data;
          $('#recipeRanking').append(templateRcp(result));
        },
        error : function() {
           alert('서버 요청 오류');
        }
      });
    }
  </script>
    <script>
    var sourceMy = $('#chef-myrank-template').text();
    var template1 = Handlebars.compile(sourceMy);
    loadMyRanking();

    function loadMyRanking() {
      $.ajax({
        url : 'user/myrank.json',
        dataType : 'json',
        method : 'get',
        success : function(result) {
          if (result.status != 'success') {
        	  alert('실패');
            return;
          }
          var list = result.data;
          if(list!=null){
        	  var appendData = '<div class="row rcp-font hover effect8">'
                  +'<div class="col-md-2">My Ranking : '+list.rownum+'</div>'
                  +'<div class="col-md-2"><div class="name">'
                  +'<input type="hidden" value="'+list.email+'">'
                  +'<a href="#" class="rcp-userName">'+list.userName+'</a></div>'
                  +'</div><div class="col-md-2">'+list.recipeCount+' 개</div>'
                  +'<div class="col-md-2">'+list.subsCount+' 명</div>'
                  +'<div class="col-md-2">'+list.totalPoint+' 점</div>'
                  +'<div class="col-md-2 ">'+list.grade+'</div></div>'
                  
                  $('#chefMyRanking').append($(appendData));
          }
          
          console.log(result);
        },
        error : function() {
          alert('서버 요청 오류');
        }
      });
    }
  </script>
	<script>
    $(function() {
      getWeather();
      getRealTimeRank();
      $('#footer').load("../copyright.html");
      
      $('.profile-dropdown:has(.active)').bind('click', function() {

      });

      $(window).bind('scroll', function(e) {
        $('.main-nav__dropdown').removeClass('active');
      });

      $('.dropdown-trigger').on('scroll', function() {
        dropdownClick('.profile-dropdown', '.mobile-menu-dropdown');
      });

      $('.dropdown-trigger--mobile').on('click', function() {
        dropdownClick('.mobile-menu-dropdown', '.profile-dropdown');
      });
    });
  </script>
  <script type="text/javascript">
    var naver_id_login = new naver_id_login("oZ3ZBiNctenY6ix5st7G",
        "http://127.0.0.1:8080/index.html");
    var state = naver_id_login.getUniqState();
    naver_id_login.setButton("green", 2, 40);
    naver_id_login.setDomain(".service.com");
    naver_id_login.setState(state);
   // naver_id_login.init_naver_id_login();
  </script>

  <script type="text/javascript">
    // 네이버 사용자 프로필 조회 이후 프로필 정보를 처리할 callback function
    function naverSignInCallback() {
      // naver_id_login.getProfileData('프로파일항목명');
      // 프로필 항목은 개발가이드를 참고하시기 바랍니다.
      console.log("nickName : "
          + naver_id_login.getProfileData('nickname'));
      console.log("email : " + naver_id_login.getProfileData('email'));
      $
          .ajax({
            url : '/user/loginNaver.json',
            method : 'post',
            dataType : 'json',
            data : {
              userName : naver_id_login
                  .getProfileData('nickname'),
              email : naver_id_login.getProfileData('email')
            },
            success : function(result) {
              if (result.status == 'failure') {

                swal('잘못입력하셨습니다.', '아이디 또는 비밀번호를 다시 확인하여 주세요.',
                    "error");

                return;
              }

              if (result.status == 'success') {

              } else {
                swal('비밀번호를 다시 입력해주세요');
              }

            },
            error : function() {
              swal('서버 요청 오류');
            }
          }); /* end of ajax */

    }

    // 네이버 사용자 프로필 조회
    naver_id_login.get_naver_userprofile("naverSignInCallback()");
  </script>/**
 * 
 */