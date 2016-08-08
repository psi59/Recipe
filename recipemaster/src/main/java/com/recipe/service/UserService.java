package com.recipe.service;

import java.util.List;

import com.recipe.domain.User;

public interface UserService {
  void addUser(User user);
  List<User> getUserList(int pageNo, int pageSize);
  User getUser(int no);
  int updateUser(User user);
  int deleteUser(int no);
}
