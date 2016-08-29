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
    
    System.out.println("loadMyPageServiceImpl안"+userNo);
    
    HashMap<String,Object> result = new HashMap<>();
    
    System.out.println("1::"+visitorDao.loadMyPageSum(userNo));
    System.out.println("2::"+visitorDao.loadMyPageAvg(userNo));
    System.out.println("3::"+visitorDao.loadMyPageScr(userNo));
    System.out.println("4::"+visitorDao.loadMyPageLike(userNo));
    
    result.put("sum", visitorDao.loadMyPageSum(userNo));
    result.put("avg", visitorDao.loadMyPageAvg(userNo));
    result.put("scr", visitorDao.loadMyPageScr(userNo));
    result.put("like", visitorDao.loadMyPageLike(userNo));
    
    System.out.println("service나와라 ㅅㅂ::"+result);
    
    return result;
  }
}
