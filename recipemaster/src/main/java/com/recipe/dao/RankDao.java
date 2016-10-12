package com.recipe.dao;

import java.util.List;
import java.util.Map;

import com.recipe.domain.Recipe;
import com.recipe.domain.User;

public interface RankDao {
	List<User> selectRankListSCS(Map<String,Object> params); //랭크 리스트+구독 정보 추가
	List<User> selectMonthRank(Map<String,Object> params);
	List<User> selectTodayRank(Map<String,Object> params);
	User selectMyRank(int uno);
	List<User> selectRankList(Map<String,Object> params); //용이추가
	List<Recipe> recipeRankList(Map<String,Object> params); //용이
}
