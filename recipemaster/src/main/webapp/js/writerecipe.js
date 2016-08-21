$(function () {
	var imageList = new Array();
	var rcpPdImgList = new Array();
	var rcpRepresentImgList = new Array();
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

	$('#userNo').val('1'); //hidden 태그에 userNo set

	$('#appmtbtn')
	.click(
			function() {
				$("#appendSlot")
				.append(
						'<div name="addSlot">'
						+'<div class="rcp-form-row">'
						+'<div class="inputwrapper form_70_width">'
						+'<label for="d1">재료명</label> '
						+'<input name="materialName" type="text" />'
						+'</div>'
						+'<div class="inputwrapper form_15_width">'
						+'<label for="d1">분량</label>'
						+'<input name="materialAmount" type="text" placeholder="(예:400g)"/>'
						+'</div>'
						+'<span class="form_15_width" name="delMt">'
						+'<button type="button" class="btn btn-default rcp-delMtSlot"id="delMtBtn" name="delMtSlot">삭제</button>'
						+'</span></div></div>'
				);
			}) 

			$(document).on('click', "button[name='delMtSlot']", function() {
//				if($(this).parent().parent().length==1){
//				swal('재료는 하나 이상 등록하셔야 합니다.')
//				} else {
				$(this).parent().parent().remove();
//				}
			});

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
				console.log(imageList);
			}
			var node = $('<span/>');
			var fileNameTag = $('<input type="hidden" name="representImgNames">');
			fileNameTag.attr('value', data.files[index].name+"/"+data.files[index].size);
			node.appendTo(data.context);
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
				console.log(imageList);
			}
			var node = $('<div class="row"/>');
			var textarea = $('<span/>').append($('<textarea name="recipeProduce" class="height_150px" placeholder="조리과정을 설명해주세요."/>'));
			var fileNameTag = $('<input type="hidden" name="produceImgNames">');
			fileNameTag.attr('value', data.files[index].name+"/"+data.files[index].size);
			textarea.appendTo(node);
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
		$(this).on('focus', function() {  $(this).parent('.inputwrapper').addClass('active');
		});
		$(this).on('blur', function() {
			if ($(this).val().length == 0) {
				$(this).parent('.inputwrapper').removeClass('active');
			}
		});
		if ($(this).val() != '') $(this).parent('.inputwrapper').addClass('active');
	});
});
