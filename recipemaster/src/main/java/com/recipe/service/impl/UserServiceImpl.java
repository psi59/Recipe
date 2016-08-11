package com.recipe.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.dao.UserDao;
import com.recipe.domain.User;
import com.recipe.service.UserService;

@Service
public class UserServiceImpl implements UserService {
  @Autowired UserDao userDao;
  
  @Override
  public void addUser(User user) {
    userDao.insert(user);
  }

  @Override
  public List<User> getUserList(int pageNo, int pageSize) {
    HashMap<String,Object> params= new HashMap<>();    
    params.put("startIndex", (pageNo - 1) * pageSize);
    params.put("len", pageSize);    
    
    return userDao.selectList(params);
  }

  @Override
  public User getUser(int no) {    
    return userDao.selectOne(no);
  }
  
  // 이메일 중복 검사
  @Override
  public boolean checkDuplication(String email) {  
    boolean result = true;    
    User user = userDao.checkDuplication(email);
    if (user != null){      
      result = false;
    }    
    return result;
  }
  
  // 닉네임 중복 검사
  @Override
  public boolean checkDuplicationUserName(String userName) {
    boolean result = true;    
    User user = userDao.checkDuplicationUserName(userName);
    if (user != null){      
      result = false;
    }    
    return result;
  } 

  @Override
  public int deleteUser(int no) {
    userDao.delete(no);
    return 0;
  }


  @Override
  public User loginUser(User user) {
    // TODO Auto-generated method stub
    User dbUser=userDao.findUser(user.getEmail());
    if(! dbUser.getPassword().equals(user.getPassword()))
      System.out.println("login 실패하였습니다.");
    return dbUser;
  }
  
  @Override
  public void updateUser(User user) {
    userDao.update(user);
  }
}
