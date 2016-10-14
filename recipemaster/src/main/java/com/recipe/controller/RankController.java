package com.recipe.controller;

import java.util.HashMap;
import java.util.List;

import javax.enterprise.inject.Default;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.recipe.domain.Rank;
import com.recipe.domain.Recipe;
import com.recipe.domain.User;
import com.recipe.service.RankService;
import com.recipe.util.CommonUtil;

@Controller
@RequestMapping("/rank/")
public class RankController {
	
	@Autowired
	RankService rankService;

	public RankController() {	}

	@RequestMapping(path = "userRank", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String userRank(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
		HashMap<String, Object> result = new HashMap<>();
		try {
			List<Rank> list = rankService.getUserRankList(pageNo, pageSize);
			result.put("status", "success");
			result.put("data", list);
		} catch (Exception e) {
			result.put("status", "failure");
		}

		return new Gson().toJson(result);
	}
	
	@RequestMapping(path = "myrank", produces = "application/json;charset=UTF-8")
	@ResponseBody//html을 보내지 않고 data 몸체(body만 보낸다는 것)
	public String selectMyRank(HttpSession session) {
		HashMap<String, Object> result = new HashMap<>();

		try {
			result.put("data", rankService.selectMyRank(CommonUtil.getSessionUser(session)));
			result.put("status", "success");
		} catch (Exception e) {
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
	}


	@RequestMapping(path = "recipeRank", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String recipeRank(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
		HashMap<String, Object> result = new HashMap<>();
		List<Rank> list = rankService.getRecipeRankList(pageNo, pageSize);
		try {
			result.put("status", "success");
			result.put("data", list);
		} catch (Exception e) {
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}
	
	@RequestMapping(path = "getTop3Rank", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String getTop3Rank(int param) {
		HashMap<String, Object> result = new HashMap<>();
		
		try {
			List<Rank> list = rankService.getTop3Rank(param);
			result.put("status", "success");
			result.put("data", list);
		} catch (Exception e) {
			e.printStackTrace();
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
	}
}