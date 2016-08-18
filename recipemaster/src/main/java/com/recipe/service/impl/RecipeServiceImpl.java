package com.recipe.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.recipe.dao.RecipeDao;
import com.recipe.domain.Recipe;
import com.recipe.domain.Search;
import com.recipe.service.RecipeService;

@Service
public class RecipeServiceImpl implements RecipeService {
	@Autowired RecipeDao recipeDao;
	
	@Override
  public List<Recipe> getRecipeSearchList(int pageNo, int pageSize, Search search, int userNo) {	
	  Map<String,Object> params = new HashMap<>();
	  params.put("startIndex", (pageNo - 1) * pageSize);
	  params.put("len", pageSize);
	  params.put("search", search);
	  params.put("userNo", userNo);
    
    return recipeDao.recipeSearch(params);
  }	

  @Override
  public int getRecipeCount(int pageNo, int pageSize, Search search, int userNo) {
    Map<String,Object> params = new HashMap<>();
    params.put("startIndex", (pageNo - 1) * pageSize);
    params.put("len", pageSize);
    params.put("search", search);
    params.put("userNo", userNo);
    return recipeDao.recipeCount(params);
  }

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
	public int registyImageAndProduce(Map map) {
		return recipeDao.insertImageAndProduce(map);
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
	
	 @Override
	  public List<Recipe> selectSubscribeUno(int userNo) {
	   
	    return recipeDao.selectSubscribeUno(userNo);
	  }

	  @Override
	  public List<Recipe> selectSbuscribe(String userNo) {

	    return recipeDao.selectSbuscribe(userNo);
	  }

    @Override
    public int addScrap(int userNo, int recipeNo) {
      HashMap<String,Object> params = new HashMap<>();
      params.put("userNo", userNo);
      params.put("recipeNo", recipeNo);
      return recipeDao.addScrap(params);
    }
	
}
