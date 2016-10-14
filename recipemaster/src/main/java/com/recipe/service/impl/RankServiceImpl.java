package com.recipe.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.dao.RankDao;
import com.recipe.domain.Rank;
import com.recipe.domain.User;
import com.recipe.service.RankService;

@Service
public class RankServiceImpl implements RankService {
	
	@Autowired
	RankDao rankDao;

	public RankServiceImpl() {	}
	
	@Override
	public List<Rank> getUserRankList(int pageNo, int pageSize) {
		HashMap<String,Object> params= new HashMap<>();    
		params.put("startIndex", (pageNo - 1) * pageSize);
		params.put("len", pageSize);   

		return rankDao.selectRankList(params);
	}
	
	
	
	@Override
	public Rank selectMyRank(User user) {    
		int uno= (user==null) ? 0:user.getUserNo();
		return rankDao.selectMyRank(uno);
	}
	
	@Override
	public List<Rank> getRecipeRankList(int pageNo,int pageSize) {
		HashMap<String,Object> params = new HashMap<>();
		params.put("startIndex", (pageNo - 1) * pageSize);
		params.put("len", pageSize);
		return rankDao.recipeRankList(params);
	}

	@Override
	public List<Rank> getTop3Rank(int index) {
		return rankDao.selectTop3Rank(index);
	}
}
