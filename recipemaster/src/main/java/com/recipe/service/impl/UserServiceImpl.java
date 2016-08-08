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
    userDao.selectOne(no);
    return null;
  }

  @Override
  public int updateUser(User user) {
    userDao.update(user);
    return 0;
  }

  @Override
  public int deleteUser(int no) {
    userDao.delete(no);
    return 0;
  }

}
