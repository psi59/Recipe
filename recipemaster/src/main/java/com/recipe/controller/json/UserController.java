package com.recipe.controller.json;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.recipe.domain.User;
import com.recipe.service.UserService;

@Controller
@RequestMapping("/user/")
public class UserController {
  @Autowired UserService userService;

  @RequestMapping(path="list", produces="application/json;charset=UTF-8")
  @ResponseBody
  public String list(@RequestParam(defaultValue="1")int pageNo,
                     @RequestParam(defaultValue="3")int pageSize){
    HashMap<String, Object> result = new HashMap<>();
    try{
      List<User> list = userService.getUserList(pageNo, pageSize);

      result.put("status", "success");
      result.put("data", list);
    }catch(Exception e){
      result.put("status", "failure");
    }

    return new Gson().toJson(result);
  }
  
  @RequestMapping(path="add", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  @ResponseBody
  public String add(User user, String passwordCheck){    
    HashMap<String,Object> result = new HashMap<>();
    try{
      // 이메일 중복 확인
      System.out.println("Null Check : _"+user.getEmail()+"_"+user.getPassword()+"_");
      if(userService.checkDuplication(user.getEmail()) && user.getPassword().equals(passwordCheck)){
        userService.addUser(user);
        result.put("status", "success");
      }
    }catch(Exception e){
      result.put("status", "failure");
    }    
    return new Gson().toJson(result);
  }  
  
  // 이메일 중복 체크
  @RequestMapping(path="checkDuplication", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  @ResponseBody
  public String checkDuplication(String email){    
    HashMap<String,Object> result = new HashMap<>();    
    try{
      result.put("status", "success");      
      result.put("data", userService.checkDuplication(email));
    }catch(Exception e){
      result.put("status", "failure");
    }
    return new Gson().toJson(result);
  }
    
  // 닉네임 중복 체크
  @RequestMapping(path="checkDuplicationUserName", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  @ResponseBody
  public String checkDuplicationUserName(String userName){    
    HashMap<String,Object> result = new HashMap<>();     
    try{
      result.put("status", "success");      
      result.put("data", userService.checkDuplicationUserName(userName));
    }catch(Exception e){
      result.put("status", "failure");
    }
    return new Gson().toJson(result);
  }

  @RequestMapping(path="detail", produces="application/json;charset=UTF-8")
  @ResponseBody
  public String detail(int no){    
    HashMap<String,Object> result = new HashMap<>();    
    try{      
      result.put("status", "success");      
      result.put("data", userService.getUser(no));
    }catch(Exception e){
      result.put("status", "failure");
    }
    return new Gson().toJson(result);
  }

  @RequestMapping(path="update", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  @ResponseBody
  public String update(User user){    
    HashMap<String,Object> result = new HashMap<>();
    try{      
      userService.updateUser(user);
      result.put("status", "success");      
    }catch(Exception e){
      result.put("status", "failure");
    }
    return new Gson().toJson(result);
  }

  @RequestMapping(path="delete", produces="application/json;charset=UTF-8")
  @ResponseBody
  public String delete(int no){    
    HashMap<String,Object> result = new HashMap<>();
    try{      
      userService.deleteUser(no);
      result.put("status", "success");      
    }catch(Exception e){
      result.put("status", "failure");
    }
    return new Gson().toJson(result);
  }
  
  @RequestMapping(path="rank", produces="application/json;charset=UTF-8")
  @ResponseBody
  public String rank(@RequestParam(defaultValue="1")int pageNo,
                     @RequestParam(defaultValue="10")int pageSize){
    HashMap<String, Object> result = new HashMap<>();
    try{
      List<User> list = userService.getUserList(pageNo, pageSize);

      result.put("status", "success");
      result.put("data", list);
    }catch(Exception e){
      result.put("status", "failure");
    }

    return new Gson().toJson(result);
  }
  
  
}
