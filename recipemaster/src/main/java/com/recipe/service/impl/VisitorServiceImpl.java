package com.recipe.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.dao.VisitorDao;
import com.recipe.domain.Visitor;
import com.recipe.service.VisitorService;

@Service
public class VisitorServiceImpl implements VisitorService {
  @Autowired VisitorDao visitorDao;
  
  @Override
  public void addVisitor(Visitor visitor) {
    visitorDao.insert(visitor);
  }

  @Override
  public List<Visitor> getVisitorList(int userNo,int pageNo, int pageSize) {
    HashMap<String,Object> params= new HashMap<>();    
    params.put("startIndex", (pageNo - 1) * pageSize);
    params.put("len", pageSize);    
    params.put("userNo", userNo);
    return visitorDao.selectList(params);
  }

  @Override
  public Visitor getVisitor(int no) {    
    return visitorDao.selectOne(no);
  }
  
  @Override
  public int deleteVisitor(int no) {
    visitorDao.delete(no);
    return 0;
  }

  @Override
  public void updateVisitor(Visitor visitor) {
    visitorDao.update(visitor);
  }

  //mypage 가져오기
  @Override
  public HashMap<String,Object> loadMyPage(int userNo) {
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("sum", visitorDao.loadMyPageSum(userNo));
    params.put("avg", visitorDao.loadMyPageAvg(userNo));
    params.put("scr", visitorDao.loadMyPageScr(userNo));
    params.put("like", visitorDao.loadMyPageLike(userNo));
    
    System.out.println("service"+params);
    
    return params;
  }
}
