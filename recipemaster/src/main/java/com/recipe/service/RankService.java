package com.recipe.service;

import java.util.List;

import com.recipe.domain.Recipe;
import com.recipe.domain.User;

public interface RankService {
	List<User> selectRankListSCS(int pageNo, int pageSize, int uno);//준모추가
	List<User> selectMonthRank(int uno);
	List<User> selectTodayRank(int uno);
	User selectMyRank(int uno);
	List<User> getUserRankList(int pageNo, int pageSize);//용이추가
	List<Recipe> getRecipeRankList(int pageNo, int pageSize);
}
