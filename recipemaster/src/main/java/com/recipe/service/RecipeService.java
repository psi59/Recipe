package com.recipe.service;

import java.util.List;
import java.util.Map;

import com.recipe.domain.Material;
import com.recipe.domain.Recipe;
import com.recipe.domain.Search;
import com.recipe.domain.User;

public interface RecipeService {
  int addRecipe(Map map); 
  void addMaterials(Map map);
  int likeUp(Recipe recipe);
  void likeDown(Recipe recipe);
  List<Recipe> getRecipeList(int pageNo, int pageSize, int request);
  
  List<Recipe> getRecipeSearchList(int pageNo, int pageSize, Search search, int userNo);
  int getRecipeCount(int pageNo, int pageSize, Search search, int userNo);
  List<Recipe> selectSbuscribe2(String userNo, int pageNo, int pageSize); //준모,용이형
  int addSubscribe(int toUserNo, int fromUserNo);
  int deleteSubscribe(int toUserNo, int fromUserNo);
  List<Recipe> selectSubscribeUno(int userNo);
  List<Recipe> selectSbuscribe(String scsUserNo, int pageNo, int pageSize); //준모 수정
  List<Recipe> selectMypage(int userNo);    
  List<Recipe> selectScrapUserNoMypage(int userNo);
  List<Recipe> selectScrapMypage(String userNumbers, int userNo);
  Recipe getRecipe(int recipeNo,int userNo);
  int updateRecipe(Recipe recipe);
  int updateHits(Recipe recipe);
  int deleteRecipe(int no);
  List<Material> getMaterial(String materialName);
  int registyImageAndProduce(Map map);
  int addScrap(int userNo, int recipeNo);
  int deleteScrap(int userNo, int recipeNo);
}
