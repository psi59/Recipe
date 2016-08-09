package com.recipe.dao;

import java.util.List;
import java.util.Map;

import com.recipe.domain.Recipe;

public interface RecipeDao {
  void insert(Recipe recipe); // Create
  List<Recipe> selectList(Map<String,Object> params); // Read or Retrieve
  Recipe selectOne(int recipeNo); // Read or Retrieve
  int update(Recipe recipe); // Update
  int updateHits(Recipe recipe);
  int delete(int no); // Delete
  List<String> selectMaterialName(String materialName);
}
