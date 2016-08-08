package com.recipe.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.dao.RecipeDao;
import com.recipe.domain.Recipe;
import com.recipe.service.RecipeService;

@Service
public class RecipeServiceImpl implements RecipeService {
	@Autowired RecipeDao recipeDao;

	@Override
	public void addRecipe(Recipe recipe) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Recipe> getRecipeList(int pageNo, int pageSize) {
		HashMap<String,Object> params = new HashMap<>();
		params.put("startIndex", (pageNo-1)*pageSize);
		params.put("len", pageSize);
		return recipeDao.selectList(params);
	}

	@Override
	public Recipe getRecipe(int no) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int updateRecipe(Recipe recipe) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int deleteRecipe(int no) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public List<String> getMaterial(String materialName) {
		return recipeDao.selectMaterialName(materialName);
	}
}
