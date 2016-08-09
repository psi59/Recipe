package com.recipe.service;

import java.util.List;

import com.recipe.domain.Recipe;

public interface RecipeService {
  void addRecipe(Recipe recipe); 
  List<Recipe> getRecipeList(int pageNo, int pageSize);
  Recipe getRecipe(int recipeNo);
  int updateRecipe(Recipe recipe);
  int updateHits(Recipe recipe);
  int deleteRecipe(int no);
  List<String> getMaterial(String materialName);
}
