package com.recipe.dao;

import java.util.List;
import java.util.Map;

import com.recipe.domain.Rank;
import com.recipe.domain.User;

public interface RankDao {
	List<Rank> selectRankListSCS(Map<String,Object> params); //랭크 리스트+구독 정보 추가
	List<Rank> selectTop3Rank(int index);
	Rank selectMyRank(int uno);
	List<Rank> selectRankList(Map<String,Object> params); //용이추가
	List<Rank> recipeRankList(Map<String,Object> params); //용이
}
