package com.recipe.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.recipe.domain.Recipe;
import com.recipe.domain.User;
import com.recipe.service.RankService;

@Controller
@RequestMapping("/rank/")
public class RankController {
	
	@Autowired
	RankService rankService;

	public RankController() {	}
	
	@RequestMapping(path = "best", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String best(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "3") int pageSize) {
		HashMap<String, Object> result = new HashMap<>();
		try {
			List<User> list = rankService.getUserRankList(pageNo, pageSize);
			result.put("status", "success");
			result.put("data", list);
		} catch (Exception e) {
			result.put("status", "failure");
		}

		return new Gson().toJson(result);
	}


	@RequestMapping(path = "userRank", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String userRank(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
		HashMap<String, Object> result = new HashMap<>();
		try {
			List<User> list = rankService.getUserRankList(pageNo, pageSize);
			result.put("status", "success");
			result.put("data", list);
		} catch (Exception e) {
			result.put("status", "failure");
		}

		return new Gson().toJson(result);
	}
	

	@RequestMapping(path = "top3", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String top3(@RequestParam(defaultValue = "0") int pageNo, @RequestParam(defaultValue = "4") int pageSize
			, HttpSession session) {
		HashMap<String, Object> result = new HashMap<>();
		User loginUser = new User();
		if(session.getAttribute("loginUser")!=null){
			loginUser=(User) session.getAttribute("loginUser");  
		}else{
			loginUser.setUserNo(0);
		}

		try {
			int uno=loginUser.getUserNo();
			List<User> list = rankService.selectRankListSCS(pageNo, pageSize, uno);
			result.put("status", "success");
			result.put("data", list);
		} catch (Exception e) {
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
	}

	@RequestMapping(path = "monthtop3", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String monthtop3(HttpSession session) {
		HashMap<String, Object> result = new HashMap<>();
		User loginUser = new User();
		if(session.getAttribute("loginUser")!=null){
			loginUser=(User) session.getAttribute("loginUser");  
		}else{
			loginUser.setUserNo(0);
		}

		try {
			int uno=loginUser.getUserNo();
			List<User> list = rankService.selectMonthRank(uno);
			result.put("status", "success");
			result.put("data", list);
		} catch (Exception e) {
			e.printStackTrace();
			result.put("status", "failure");
		}
		return new Gson().toJson(result);
	}
	@RequestMapping(path = "todaytop3", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String todaytop3(HttpSession session) {
		HashMap<String, Object> result = new HashMap<>();
		User loginUser = new User();
		if(session.getAttribute("loginUser")!=null){
			loginUser=(User) session.getAttribute("loginUser");  
		}else{
			loginUser.setUserNo(0);
		}

		try {
			int uno=loginUser.getUserNo();
			List<User> list = rankService.selectTodayRank(uno);
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
		User loginUser = new User();
		if(session.getAttribute("loginUser")!=null){
			loginUser=(User) session.getAttribute("loginUser");  
		}else{
			loginUser.setUserNo(0);
		}
		try {
			int uno=loginUser.getUserNo();
			System.out.println("uno:"+uno);
			result.put("data", rankService.selectMyRank(uno));
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
		List<Recipe> list = rankService.getRecipeRankList(pageNo, pageSize);
		try {
			result.put("status", "success");
			result.put("data", list);
		} catch (Exception e) {
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}
}