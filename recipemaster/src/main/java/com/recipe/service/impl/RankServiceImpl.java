package com.recipe.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.dao.RankDao;
import com.recipe.domain.Recipe;
import com.recipe.domain.User;
import com.recipe.service.RankService;

@Service
public class RankServiceImpl implements RankService {
	
	@Autowired
	RankDao rankDao;

	public RankServiceImpl() {	}
	
	@Override
	public List<User> getUserRankList(int pageNo, int pageSize) {
		HashMap<String,Object> params= new HashMap<>();    
		params.put("startIndex", (pageNo - 1) * pageSize);
		params.put("len", pageSize);   

		return rankDao.selectRankList(params);
	}

	@Override
	public List<User> selectRankListSCS(int pageNo, int pageSize, int uno) {
		HashMap<String,Object> params= new HashMap<>();
		params.put("startIndex", (pageNo - 1) * pageSize);
		params.put("len", pageSize);
		params.put("uno", uno);

		return rankDao.selectRankListSCS(params);
	}

	@Override
	public List<User> selectMonthRank(int uno) {
		HashMap<String,Object> params= new HashMap<>();  
		params.put("uno", uno);

		return rankDao.selectMonthRank(params);
	}

	@Override
	public List<User> selectTodayRank(int uno) {
		HashMap<String,Object> params= new HashMap<>();
		params.put("uno", uno);
		return rankDao.selectTodayRank(params);
	}

	@Override
	public User selectMyRank(int uno) {    
		return rankDao.selectMyRank(uno);
	}
	
	@Override
	public List<Recipe> getRecipeRankList(int pageNo,int pageSize) {
		HashMap<String,Object> params = new HashMap<>();
		params.put("startIndex", (pageNo - 1) * pageSize);
		params.put("len", pageSize);
		return rankDao.recipeRankList(params);
	}

}
