document.write('<script type"text/javascript" src="js/login.js"></script>')
$(function () {
	
	$.ajax({
		url : '/user/loginCheck.json', 
		method : 'get',
		dataType : 'json',
		success : function(result) {
			if (result.status == 'failure') {
				swal({
					title: "로그인 후 사용하실 수 있습니다.",
					type: "warning",
					confirmButtonClass: "btn-danger",
					confirmButtonText: "확인",
					closeOnConfirm: false
				},
				function(isConfirm) {
					location.href = "index.html"
				}); 
			} 
			if(result.status == 'success'){

				var data = [];
				data.push({
					userNo : result.data.userNo,
					userName : result.data.userName,
					email : result.data.email,
					image : result.data.image,
					intro : result.data.intro,
					role : result.data.role,
					joinDate : result.data.joinDate,
					recipeUrl : result.data.recipeUrl,
					recipeCount : result.data.recipeCount,
					subsCount : result.data.subsCount
				});

				jsonData = JSON.stringify(data);

				/*eval 사용 방법, eval(jsonData)[0].email*/
				if(jsonData!=null){
					$('#signUpBtn').hide();
					$('#loginBtn').hide();
					$('#signUpTopBtn').hide();
					$('#loginIcon').html('<img id="loginIconAction1" class="rcp-barimg dropdown-trigger img-circle" src="img/Chef3.jpg" />');
					$('#topbarUserImg').html('<img id="loginIconAction2" class="rcp-barimg dropdown-trigger img-circle" src="img/Chef3.jpg" />');
				}
			} 
		},
		error : function() {
			swal('서버 요청 오류');
		}
	}); /* end of ajax */

	var imageList = new Array();

	'use strict';

	$( "#representImgs" ).sortable({
		revert: true,
		containment: 'parent',
		tolerance: 'representImgs',
		axis: 'x'
	});

	$( "#files" ).sortable({
		revert: true
	});
	$( "#files" ).disableSelection();

//	대표사진등록관련 js
	$('#representImage').fileupload({
		dataType: 'json',
		autoUpload: false,
		acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
		disableImageResize: /Android(?!.*Chrome)|Opera/
			.test(window.navigator.userAgent),
			previewMaxWidth: 150,
			previewMaxHeight: 150,
			previewCrop: true,
			dropZone : $('#representImgDropzone')
	}).on('fileuploadadd', function (e, data) {
		data.context = $('<span class="scroll"/>').appendTo('#representImgs');
		$.each(data.files, function (index, file) {
			if(imageDuplicationCheck(data.files[index])){
				imageList.push(data.files[index]);
			}
			var node = $('<span/>');
			var close = $('<a href="#"><span class="closeBtn thick rpImg"></span></a>');
			var fileNameTag = $('<input type="hidden" name="representImgNames">');
			fileNameTag.attr('value', data.files[index].name+"/"+data.files[index].size);
			node.appendTo(data.context);
			close.appendTo(data.context);
			fileNameTag.appendTo(data.context);
		});
	}).on('fileuploadprocessalways', function (e, data) {
		var index = data.index,
		file = data.files[index],
		node = $(data.context.children()[index]);
		if (file.preview) {
			node.prepend(file.preview);
		}
		if (file.error) {
			node
			.append('<br>')
			.append($('<span class="text-danger"/>').text(file.error));
		}
	});


//	조리과정 js    
	$('#fileupload').fileupload({
		dataType: 'json',
		autoUpload: false,
		acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
		disableImageResize: /Android(?!.*Chrome)|Opera/
			.test(window.navigator.userAgent),
			previewMaxWidth: 150,
			previewMaxHeight: 150,
			previewCrop: true,
			dropZone : $('#dropzone')
	}).on('fileuploadadd', function (e, data) {
		data.context = $('<div/>').appendTo('#files');
		$.each(data.files, function (index, file) {
			if(imageDuplicationCheck(data.files[index])){
				imageList.push(data.files[index]);
			}
			var node = $('<div class="row"/>');
			var close = $('<a href="#"><span class="closeBtn thick pdImg"></span></a>');
			var textarea = $('<span/>').append($('<textarea name="recipeProduce" class="height_150px" placeholder="조리과정을 설명해주세요."/>'));
			var fileNameTag = $('<input type="hidden" name="produceImgNames">');
			fileNameTag.attr('value', data.files[index].name+"/"+data.files[index].size);
			textarea.appendTo(node);
			close.appendTo(node);
			node.appendTo(data.context);
			fileNameTag.appendTo(data.context);
		});
	}).on('fileuploadprocessalways', function (e, data) {
		var index = data.index,
		file = data.files[index],
		node = $(data.context.children()[index]);
		if (file.preview) {
			var canvasIntodiv = $('<span class="imagewrapper"/>').append(file.preview);
			//node.prepend(file.preview);
			node.prepend(canvasIntodiv);
		}
		if (file.error) {
			node
			.append('<br>')
			.append($('<span class="text-danger"/>').text(file.error));
		}
		if (index + 1 === data.files.length) {
			data.context.find('button')
			.text('Upload')
			.prop('disabled', !!data.files.error);
		}
	}).on('fileuploaddone', function (e, data) {

		if(data.result.status=='success'){
			location="index.html";
		} else {
			swal('레시피 등록 실패');
		}
		console.log(data.result.status)

	}).on('fileuploadfail', function (e, data) {

		console.log(data)

	}).prop('disabled', !$.support.fileInput)
	.parent().addClass($.support.fileInput ? undefined : 'disabled');


	$('.inputbox').on('change', function() {
		var input = $(this);
		if (input.val().length) {
			input.addClass('populated');
		} else {
			input.removeClass('populated');
		}
	});


	$("#addRecipe").submit(function(event) {
		var formData = new FormData(this);
		var formURL = $(this).attr("action");

		if (imageList.length > 0) {
			console.log("multi file submit");
			event.preventDefault();
			$('#fileupload').fileupload('send', {
				files : imageList
			});
//			.success(function(result, textStatus, jqXHR) {
//			console.log('success');
//			}).error(function(jqXHR, textStatus, errorThrown) {
//			console.log('error');
//			}).complete(function(result, textStatus, jqXHR) {
//			console.log('complete: ' + JSON.stringify(result));
//			// window.location='back to view-page after submit?'
//			});
		} else {
			console.log("이미지 등록해주세용 ㅎㅎ");
		}
	});
//	if(eval(sessionStorage.getItem('data'))[0].userNo!=null){
//	$('userNo').val(eval(sessionStorage.getItem('data'))[0].userNo);
//	} else {
//	swal('로그인 하고 오세욤 ㅎㅎ');
//	location = "index.html";
//	}

	function imageDuplicationCheck(file){
		if(imageList.length>0){
			for(i=0; i<imageList.length; i++){
				if(file.name==imageList[i].name 
						&& file.size==imageList[i].size
						&& file.lastModified==imageList[i].lastModified){
					//return false;
					return false;
				}
			}
			return true;
		} else {
			return true;
		}
	}


	$('input').each(function() {
		$(this).on('focus', function() {  
			$(this).parent('.inputwrapper').addClass('active');
			$(this).parent().parent('.inputwrapper').addClass('active');
		});
		$(this).on('blur', function() {
			if ($(this).val().length == 0) {
				$(this).parent('.inputwrapper').removeClass('active');
				$(this).parent().parent('.inputwrapper').removeClass('active');
			}
		});
		if ($(this).val() != ''){
			$(this).parent('.inputwrapper').addClass('active');
			$(this).parent().parent('.inputwrapper').removeClass('active');
		}
	});

	$(document).on('click', '.rpImg', function(event) {
		event.preventDefault();
		$(this).parent().parent('.scroll').remove();
	});

	$(document).on('click', '.pdImg', function(event) {
		event.preventDefault();
		$(this).parent().parent().remove();
	});


	$('#addBtn').on('click', function() {
		if($('input[name="recipeName"]').val().length < 1){
			swal('레시피 제목을 입력해주세요.');
			return;
		} else if($('input[name="portion"]').val().length < 1){
			swal('몇 인분인지 입력해주세요.');
			return;
		} else if($('input[name="cookTime"]').val().length < 1){
			swal('조리시간을 입력해주세요.');
			return;
		} else if($('input[name="intro"]').val().length < 1){
			swal('요리설명을 입력해주세요.');
			return;
		} else if ($('input[name="representImgNames"]').length < 1) {
			swal('대표사진을 등록해주세요.');
			return;
		} else if ($('input[name="materialNo"]').length < 1) {
			swal('재료를 등록해주세요.');
			return;
		} else if ($('input[name="produceImgNames"]').length < 1) {
			swal('조리과정을 등록해주세요.');
			return;
		} 

		$('#addRecipe').submit();				
	});

	$('#imAddBtn').on('click', function() {
		$('input[name="regiStatus"]').val("1");
		$('#addRecipe').submit();
	});
});
