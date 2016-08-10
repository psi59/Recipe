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

  @RequestMapping(path="login", method=RequestMethod.POST, produces="application/json;charset=UTF-8")
  @ResponseBody //URL에 넣지 않고 바디에 넣어 데이터만 보내겠다는 것
  public String login(User user) {
    //index.html에서 name으로 되어있는 RequestParam이 넘어 온다.
    System.out.println(user.toString());
    HashMap<String,Object> result = new HashMap<>();
    try {
      User logUser = userService.loginUser(user);
      result.put("status", "success");
      result.put("data", logUser);
      System.out.println("logUser:"+logUser.toString());
    } catch (Exception e) {
      result.put("status", "failure");
    }
    return new Gson().toJson(result);
    //result.data로 하면 logUser의 도메인 값을 가져 올 수 있다.
  }
}
