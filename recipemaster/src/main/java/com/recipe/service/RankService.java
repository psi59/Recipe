package com.recipe.service;

import java.util.List;

import com.recipe.domain.Rank;
import com.recipe.domain.User;

public interface RankService {
	List<Rank> getTop3Rank(int index);
	Rank selectMyRank(User user);
	List<Rank> getUserRankList(int pageNo, int pageSize);//용이추가
	List<Rank> getRecipeRankList(int pageNo, int pageSize);
}
