package com.recipe.dao;

import java.util.Map;

import com.recipe.domain.User;

public interface UserDao {
  void insertUser(User user);
  User checkDuplication(String email);
  User checkDuplicationUserName(String userName);
  void update(User user);
  int delete(int no);
  User selectLoginUser(User user);//Read or Retrieve
  User selectFromEmail(String email);    //Mypage 이메일로 유저정보 가져오
  int addUserInNaver(User user);
  void authUpdate(Map<String,Object> params); //인증update
  void updateHits(int userNo);
}
