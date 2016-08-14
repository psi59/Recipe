package com.recipe.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

public class CommonUtil {

	public CommonUtil() {
		// TODO Auto-generated constructor stub
	}
	
	public String getImageFolderPath(String folderName, HttpServletRequest request){
		
		
		return request.getServletContext().getRealPath("img/"+folderName+"/");
	}
	
	public String nowData(){
		Date now = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		return format.format(now);
	}

}
