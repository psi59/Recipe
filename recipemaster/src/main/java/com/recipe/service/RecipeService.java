package com.recipe.service;

import java.util.List;
import java.util.Map;

import com.recipe.domain.Recipe;

public interface RecipeService {
  int addRecipe(Map map); 
  void addMaterials(Map map);
  List<Recipe> getRecipeList(int pageNo, int pageSize);
  Recipe getRecipe(int recipeNo);
  int updateRecipe(Recipe recipe);
  int updateHits(Recipe recipe);
  int deleteRecipe(int no);
  List<String> getMaterial(String materialName);
}
