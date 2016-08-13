package com.recipe.dao;

import java.util.List;
import java.util.Map;

import com.recipe.domain.Recipe;

public interface RecipeDao {
  int insert(Map map); // Create
  void insertMaterials(Map map); // Create
  List<Recipe> selectList(Map<String,Object> params); // Read or Retrieve
  Recipe selectOne(int recipeNo); // Read or Retrieve
  int update(Recipe recipe); // Update
  int updateHits(Recipe recipe);
  int delete(int no); // Delete
  List<String> selectMaterialName(String materialName);
  int likeUp(Recipe recipe);
  int insertProduce(Map map);
}
