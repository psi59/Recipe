package com.recipe.dao;

import java.util.List;
import java.util.Map;

import com.recipe.domain.Visitor;

public interface VisitorDao {
  void insert(Visitor visitor);
  List<Visitor> selectList(Map<String,Object> params);
  Visitor selectOne(int no);
  void update(Visitor visitor);
  int delete(int no);
  
  int loadMyPageLike(int userNo); //mypage 총 방문자 가지고 오기 준모
  int loadMyPageScr(int userNo); 
  int loadMyPageSum(int userNo); 
  int loadMyPageAvg(int userNo); 
}
