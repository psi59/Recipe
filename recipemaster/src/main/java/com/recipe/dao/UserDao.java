package com.recipe.dao;

import java.util.List;
import java.util.Map;

import com.recipe.domain.User;

public interface UserDao {
  void insert(User user);
  List<User> selectList(Map<String,Object> params);
  User selectOne(int no);
  int update(User user);
  int delete(int no);
}
