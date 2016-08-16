/* 검색버튼 이벤트 -성현 */
$(function() {	
		
	$('#searchBtn').click(function() {
		search();			    
	});
	
	$('#searchKeyword').keydown( function(){
		if(event.keyCode == '13') search();
	});
});

function search(){
	var userNo = 0; 
	var a = eval(sessionStorage.getItem('data'));		
	if(a != null){
		userNo = eval(sessionStorage.getItem('data'))[0].userNo;
	}
	
	var source = $('#recipe-card-search-template').text();
	var template = Handlebars.compile(source);			

	$.ajax({
		url : 'recipe/listSearch.json',
		method : 'post',
		data : {
			searchKeyword : $('#searchKeyword').val(),				
			userNo : userNo
		},
		dataType : 'json',
		success : function(result) {
			if (result.status != 'success') {
				alert('실패 ~');
				return;
			}			
			$('#search-result > div').remove();
			$('.searchResult > .row').append(template(result));
			$('#recipe-count').text(result.recipeCount+' 개의 레시피가 검색되었습니다.');
		},
		error : function() {
			alert('서버 요청 오류 !')
		}
	})	
}






