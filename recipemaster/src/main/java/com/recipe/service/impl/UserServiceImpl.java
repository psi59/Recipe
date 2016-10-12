package com.recipe.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.dao.UserDao;
import com.recipe.domain.User;
import com.recipe.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	@Autowired UserDao userDao;

	@Override
	public void addUser(User user) {
		userDao.insertUser(user);
	}
	
	// 이메일 중복 검사
	@Override
	public boolean checkDuplication(String email) {  
		boolean result = true;    
		User user = userDao.checkDuplication(email);
		if (user != null){      
			result = false;
		}    
		return result;
	}

	// 닉네임 중복 검사
	@Override
	public boolean checkDuplicationUserName(String userName) {
		boolean result = true;    
		User user = userDao.checkDuplicationUserName(userName);
		if (user != null){      
			result = false;
		}    
		return result;
	} 

	@Override
	public int deleteUser(int no) {
		userDao.delete(no);
		return 0;
	}


	@Override
	public User loginUser(User user) {
		return userDao.selectLoginUser(user);
	}

	@Override
	public void updateUser(User user) {
		userDao.update(user);
	}

	@Override
	public User getFromEmail(String email) {
		return userDao.selectFromEmail(email);
	}

	@Override
	public int addUserInNaver(User user) {
		return userDao.addUserInNaver(user);
	}

	public void authUpdate(String authKEY, int auth, String inputEmail) {
		HashMap<String,Object> params= new HashMap<>();    
		System.out.println("이곳은 authUpdat을 하는  service impl입니다."+authKEY+"?"+auth);
		params.put("authKEY", authKEY);
		params.put("auth", auth);   
		params.put("inputEmail", inputEmail); 
		userDao.authUpdate(params);
	}

	@Override
	public void addHits(int userNo) {
		userDao.updateHits(userNo);
	}
}
