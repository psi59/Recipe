$(document).ready(function() {
	// 검색창에서 엔터시 파라미터와 list.html로 이동
	$('#searchKeyword').keydown(function(key){
		if(key.keyCode == 13){
			/*window.location.href = "list.html?sc="+$(this).prev().val()+"&sk="+$(this).val();*/
			window.location.href = "list.html?sk="+$(this).val();
		}
	})
	// 검색버튼 클릭시 파라미터와 list.html로 이동
	/*$('.rcp-search-button').click(function(){
		window.location.href = "list.html?sc="+$(this).prev().prev().val()+"&sk="+$(this).prev().val();
	})*/
})