
package com.recipe.service;

import java.util.HashMap;
import java.util.List;

import com.recipe.domain.Visitor;

public interface VisitorService {
  void addVisitor(Visitor visitor);
  List<Visitor> getVisitorList(int userNo,int pageNo, int pageSize);
  Visitor getVisitor(int no);
  void updateVisitor(Visitor visitor); 
  int deleteVisitor(int no);
  
  HashMap<String,Object> loadMyPage(int userNo);//준모 mypage
}