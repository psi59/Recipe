package com.recipe.service.impl;

import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.dao.UserDao;
import com.recipe.domain.User;
import com.recipe.service.UserService;
import com.recipe.util.CommonUtil;

@Service
public class UserServiceImpl implements UserService {
	@Autowired UserDao userDao;

	@Override
	public void addUser(User user) throws Exception {
		user.setImage("default.jpg");
		//unique key 생성
		user.setAuthenticationKEY(UUID.randomUUID().toString());
		user.setAuthentication(0);
		user = CommonUtil.sha1(user);
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
	public User loginUser(User user) throws Exception {
		user=CommonUtil.sha1(user);
		return userDao.selectLoginUser(user);
	}

	@Override
	public String updateUser(User user) throws Exception {
		String nextPassword=CommonUtil.nextPassword().toString();
		user.setPassword(CommonUtil.sha1(nextPassword));
		userDao.update(user);
		return nextPassword;
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
