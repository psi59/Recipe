
package com.recipe.service;

import java.util.List;

import com.recipe.domain.Visitor;

public interface VisitorService {
  void addVisitor(Visitor visitor);
  List<Visitor> getVisitorList(int pageNo, int pageSize);
  Visitor getVisitor(int no);
  void updateVisitor(Visitor visitor); 
  int deleteVisitor(int no);
}