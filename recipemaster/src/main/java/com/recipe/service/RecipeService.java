package com.recipe.service;

import java.util.List;
import java.util.Map;

import com.recipe.domain.Recipe;
import com.recipe.domain.Search;

public interface RecipeService {
  int addRecipe(Map map); 
  void addMaterials(Map map);
  int likeUp(Recipe recipe);
  void likeDown(Recipe recipe);
  List<Recipe> getRecipeList(int pageNo, int pageSize);
  List<Recipe> getRecipeList2(int pageNo, int pageSize);
  
  List<Recipe> getRecipeSearchList(int pageNo, int pageSize, Search search, int userNo);
  int getRecipeCount(int pageNo, int pageSize, Search search, int userNo);

  int addSubscribe(int toUserNo, int fromUserNo);
  List<Recipe> selectSubscribeUno(int userNo);
  List<Recipe> selectSbuscribe(String userNo);
  Recipe getRecipe(int recipeNo,int userNo);
  int updateRecipe(Recipe recipe);
  int updateHits(Recipe recipe);
  int deleteRecipe(int no);
  List<String> getMaterial(String materialName);
  int registyImageAndProduce(Map map);
  int addScrap(int userNo, int recipeNo);
  int deleteScrap(int userNo, int recipeNo);
}
