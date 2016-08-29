package com.recipe.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.multipart.MultipartFile;

import com.recipe.domain.User;

public class CommonUtil {

	public CommonUtil() {
		// TODO Auto-generated constructor stub
	}
	
	public static User getSessionUser(HttpSession session){
		return (User) session.getAttribute("loginUser");
	}
	
	public static String getImageFolderPath(String folderName, HttpServletRequest request){
		return request.getServletContext().getRealPath("img/"+folderName+"/");
	}
	
	public static MultipartFile findImageFile(String[] fileInfo, List<MultipartFile> imageFiles){
		for(MultipartFile file : imageFiles){
			System.out.println(file.getOriginalFilename());
			if(file.getSize()==Integer.parseInt(fileInfo[1]) && file.getOriginalFilename().equals(fileInfo[0])){
				System.out.println(file);
				return file;
			}
		}
		return null;
	}
	
	public static String nowData(){
		Date now = new Date();
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");
		return format.format(now);
	}

}
