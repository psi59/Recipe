package com.recipe.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.multipart.MultipartFile;

import com.recipe.domain.Recipe;
import com.recipe.domain.User;

public class CommonUtil {

	public CommonUtil() {
		// TODO Auto-generated constructor stub
	}
	
	public static User getSessionUser(HttpSession session){
		User user = (User) session.getAttribute("loginUser");
		if(user==null){
			user = new User();
		}
		return user;
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


  public static Recipe functionForUserNumbers(List<Recipe> userNumbers, int request) {
    Recipe recipe = new Recipe();
    if (userNumbers.size() == 0 || userNumbers.equals("")) {
      recipe.setScrap("0");
    } else {
      for (int i = 0; i < userNumbers.size(); i++) {
        if (recipe.getScrap() == null) {
          if (request == 3) {
            recipe.setScrap(String.valueOf(userNumbers.get(0).getSubscribeNum()));
          } else {
            recipe.setScrap(String.valueOf(userNumbers.get(0).getRecipeNo()));
          }
        } else {
          if (request == 3) {
            recipe.setScrap(recipe.getScrap() + "," + userNumbers.get(i).getSubscribeNum());
          } else {
            recipe.setScrap(recipe.getScrap() + "," + userNumbers.get(i).getRecipeNo());
          }
        }
      }
    }
    return recipe;
  }
	
}



