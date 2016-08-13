package com.recipe.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CommonUtil {

	public CommonUtil() {
		// TODO Auto-generated constructor stub
	}
	
	public String nowData(){
		Date now = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		return format.format(now);
	}

}
