
  var mainSection = $('#recipe-card-section').html();
  var comMainSection = Handlebars.compile(mainSection); 
  
  var source = $('#recipe-card-template').html();
  var template = Handlebars.compile(source); 


  $(function(){
  $.ajax({
    url:'recipe/list.json',
    dataType:'json',
    method:'get',
    success:function(result){
      if (result.status !='success'){
        alert('실행중 오류 발생');
        return;
      }
      var list = result.data;
 

      $('#main-list > div').append( comMainSection(result) );

      
    for(var i=0; i<$('.rcp-list').length; i++){
    	$('.list'+i+' > .row').append( template(result) );
    	
    for(var j=0; j<list.length; j++){
        $('.list'+i+' > .row > div:nth-child('+(j+1)+') #myCarousel').attr("id","list"+i+"myCarousel"+j);
        $('.list'+i+' > .row > div:nth-child('+(j+1)+') .rcp-left-slideButton').attr("href","#list"+i+"myCarousel"+j);
        $('.list'+i+' > .row > div:nth-child('+(j+1)+') .rcp-right-slideButton').attr("href","#list"+i+"myCarousel"+j);
        $('.list'+i+' > .row > div:nth-child('+(j+1)+') .image1').attr("id","list"+i+"image"+j);
        
        

        var time;
        	$("#list"+i+"image"+j).hover(function(event){
        	   this.src = "images/3.jpg";
        	  time= setTimeout(function(){
        		  console.log("event target"+$(event.target).attr("src"));
        		   $(event.target).attr('src',"images/4.jpg");
        	    	},1500);
        	}, function(){
        	    this.src = "images/2.jpg";
        	}).mouseleave(function(){
        		clearTimeout(time);
        		  });
        
   
    
    	if(list[1]){
    		$('.list'+i+' > .row > div:nth-child(2)').attr("class","col-xs-3 col-sm-3 col-md-3 visible-sm rcp-list-margin rcp-list-margin");
    	     }
    	  if(list[2]){
    	       $('.list'+i+' > .row > div:nth-child(3)').attr("class","col-sm-3 col-md-3 visible-md rcp-list-margin rcp-list-margin");
    	     }
    	      
    	  if(list[3]){
    	       $('.list'+i+' > .row > div:nth-child(4) ').attr("class","col-md-3 visible-lg rcp-list-margin rcp-list-margin");
    	    
    }
     
    }
   }
      
    },
    error : function(){
      alert('서버 요청 오류');
    }
  });
  });