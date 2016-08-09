package com.recipe.service;

import java.util.List;

import com.recipe.domain.User;

public interface UserService {
  void addUser(User user);
  List<User> getUserList(int pageNo, int pageSize);
  User getUser(int no);
  boolean checkDuplication(String email); // email 중복체크
  boolean checkDuplicationUserName(String userName); // 닉네임 중복체크
  int updateUser(User user);
  int deleteUser(int no);
}
