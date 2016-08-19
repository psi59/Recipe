package com.recipe.dao;

import java.util.List;
import java.util.Map;

import com.recipe.domain.User;

public interface UserDao {
  void insert(User user);
  List<User> selectList(Map<String,Object> params);
  User selectOne(int no);
  User checkDuplication(String email);
  User checkDuplicationUserName(String userName);
  void update(User user);
  int delete(int no);
  User findUser(String email);//Read or Retrieve
  User selectFromEmail(String email);    //Mypage 이메일로 유저정보 가져오
}
