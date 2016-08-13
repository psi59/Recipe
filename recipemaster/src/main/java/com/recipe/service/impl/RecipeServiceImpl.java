package com.recipe.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.dao.RecipeDao;
import com.recipe.domain.Recipe;
import com.recipe.service.RecipeService;

@Service
public class RecipeServiceImpl implements RecipeService {
	@Autowired RecipeDao recipeDao;

	@Override
	public int addRecipe(Map map) {
		recipeDao.insert(map);
		return (int)map.get("recipeNo");
	}

	@Override
	public List<Recipe> getRecipeList(int pageNo, int pageSize) {
		HashMap<String,Object> params = new HashMap<>();
		params.put("startIndex", (pageNo-1)*pageSize);
		params.put("len", pageSize);
		return recipeDao.selectList(params);
	}

	@Override
	public Recipe getRecipe(int recipeNo) {

		return recipeDao.selectOne(recipeNo);
	}

	@Override
	public int updateRecipe(Recipe recipe) {
		return 0;
	}

	@Override
	public int deleteRecipe(int no) {
		return 0;
	}

	@Override
	public List<String> getMaterial(String materialName) {
		return recipeDao.selectMaterialName(materialName);
	}

	@Override
	public void addMaterials(Map map) {
		recipeDao.insertMaterials(map);
	}
	@Override
	public int updateHits(Recipe recipe) {
		return recipeDao.updateHits(recipe);
	}

	@Override
	public int likeUp(Recipe recipe) {
		return recipeDao.likeUp(recipe);
	}

	@Override
	public int registyProduce(Map map) {
		return recipeDao.insertProduce(map);
	}
}
