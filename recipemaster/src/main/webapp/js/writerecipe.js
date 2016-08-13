$(function () {
	
	$('#userNo').val('1'); //hidden 태그에 userNo set
	
	$('#appmtbtn')
	.click(
			function() {
				$("#appendSlot")
				.append(
						'<div name="addSlot">'
						+'<div class="row form-group form-group-lg form-group-md form-group-sm">'
						+'<span class="lablebox col-md-7">'
						+'<input name="materialName" type="text" placeholder="재료명"class="inputbox">'
						+'<span class="inputname">재료명</span>'
						+'</span>'
						+'<span class="lablebox col-md-3">'
						+'<input name="materialAmount" type="text" placeholder="분량(예:400g)"class="inputbox">'
						+'<span class="inputname">분량</span>'
						+'</span>'
						+'<span class="col-md-2" name="delMt">'
						+'<button type="button" class="btn btn-default rcp-delMtSlot"id="delMtBtn" name="delMtSlot">삭제</button>'
						+'</span>'
						+'</div>'
						+'</div>');
			})

			$(document).on('click', "button[name='delMtSlot']", function() {
//				if($(this).parent().parent().length==1){
//					alert('재료는 하나 이상 등록하셔야 합니다.')
//				} else {
					$(this).parent().parent().remove();
//				}
			});
	
	var filesList = new Array();
    'use strict';
    // Change this to the location of your server-side upload handler:
    var url = 'recipe/addRecipe.do', 
        uploadButton = $('<button/>')
            .addClass('btn btn-primary');
    $('#fileupload').fileupload({
        dataType: 'json',
        autoUpload: false,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 999000,
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 150,
        previewMaxHeight: 150,
        previewCrop: true,
        dropZone : $('#dropzone')
    }).on('fileuploadadd', function (e, data) {
        data.context = $('<div/>').appendTo('#files');
        $.each(data.files, function (index, file) {
        	  filesList.push(data.files[index]);
            var node = $('<div class="row"/>');
            var textarea = $('<span class="lablebox  col-md-9"/>').append($('<textarea name="recipeProduce" class="height_150px inputbox" placeholder="조리과정을 설명해주세요."/>')).append($('<span class="inputname">조리과정</span>'));
            if (!index) {  }
            textarea.appendTo(node);
            node.appendTo(data.context);            
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
        	  var canvasIntodiv = $('<div class="col-md-3"/>').append(file.preview);
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
    		alert('레시피 등록 실패');
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
        
        if (filesList.length > 0) {
          console.log("multi file submit");
          event.preventDefault();
          $('#fileupload').fileupload('send', {
            files : filesList
          });
//          .success(function(result, textStatus, jqXHR) {
//            console.log('success');
//          }).error(function(jqXHR, textStatus, errorThrown) {
//            console.log('error');
//          }).complete(function(result, textStatus, jqXHR) {
//            console.log('complete: ' + JSON.stringify(result));
//            // window.location='back to view-page after submit?'
//          });
        } else {
          console.log("이미지 등록해주세용 ㅎㅎ");
        }
      });
//    if(eval(sessionStorage.getItem('data'))[0].userNo!=null){
//    	$('userNo').val(eval(sessionStorage.getItem('data'))[0].userNo);
//    } else {
//    	alert('로그인 하고 오세욤 ㅎㅎ');
//    	location = "index.html";
//    }
    
});
