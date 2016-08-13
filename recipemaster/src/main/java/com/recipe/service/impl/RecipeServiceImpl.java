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
	public List<Recipe> getRecipeList(int userNo, int pageSize) {
		HashMap<String,Object> params = new HashMap<>();
		params.put("userNo", userNo);
		params.put("len", pageSize);
		return recipeDao.recipeList(params);
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

	@Override
	public List<Recipe> getRecipeList2(int userNo, int pageSize) {
		HashMap<String,Object> params = new HashMap<>();
		params.put("userNo", userNo);
		params.put("len", pageSize);
		return recipeDao.recipeList2(params);
	}

	@Override
	public void likeDown(Recipe recipe) {
		recipeDao.likeDown(recipe);
	}
}
