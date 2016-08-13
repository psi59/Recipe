package com.recipe.controller;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.recipe.domain.User;
import com.recipe.service.UserService;

@Controller
@RequestMapping("/user/")
public class UserController {
  @Autowired UserService userService;

  @RequestMapping(path="update")
  @ResponseBody
  public String update(@RequestParam("profileImage") MultipartFile profileImage){    
    HashMap<String,Object> result = new HashMap<>();
    
    System.out.println("file 명 : "+ profileImage.getOriginalFilename());
//    try{      
//      User dbUser = userService.getUser(sUno);
//      if(bfPwd.equals(dbUser.getPassword())){
//        /*파일업로드 추가*/
//        if(null!=file){
//          String fileName = file.getOriginalFilename();
//          user.setRecipeUrl(fileName);
//        File recipeUrl= new File("C:\\User\\BitCamp\\git\\Recipe_team\\recipemaster\\WebContent\\images\\"+fileName);
//        file.transferTo(recipeUrl);
//        }/*파일업로드 추가 끝*/
//        userService.updateUser(user);
//        result.put("status", "success");
//      } else {
//        result.put("status", "pwdFail");
//      }
//    }catch(Exception e){
//      result.put("status", "failure");
//    }
    return new Gson().toJson(result);
  }
}
