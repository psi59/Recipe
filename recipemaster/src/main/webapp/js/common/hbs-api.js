/*
 * 생성 : 2016-10-13
 * 최종수정 : 2016-10-13
 * 모든 템플릿 호출 펑션 
 */
function hbsTemplate(hbsFileName, targetHtml, result){
	$.ajax({
        url : '/js/hbs-templates/'+hbsFileName,
        success : function(template_hbs) {
        	var template=Handlebars.compile(template_hbs);
    		$(targetHtml).append(template(result));
        },
        async : false,
        cache : true
    });
}

/*
 * 생성 : 2016-10-13
 * 최종수정 : 2016-10-13
 * 랭킹 카드 템플릿 호출 펑션 
 */
function getTop3RankTemplate(targetHtml, result){
	hbsTemplate('rankcard.hbs', targetHtml, result);
}

/*
 * 생성 : 2016-10-13
 * 최종수정 : 2016-10-13
 * 랭킹 카드 템플릿 호출 펑션 
 */
function getChefRankTemplate(targetHtml, result){
	hbsTemplate('chefrank.hbs', targetHtml, result);
}

/*
 * 생성 : 2016-10-13
 * 최종수정 : 2016-10-13
 * 랭킹 카드 템플릿 호출 펑션 
 */
function getRecipeRankTemplate(targetHtml, result){
	hbsTemplate('reciperank.hbs', targetHtml, result);
}