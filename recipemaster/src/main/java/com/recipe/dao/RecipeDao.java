package com.recipe.dao;

import java.util.List;
import java.util.Map;

import com.recipe.domain.Material;
import com.recipe.domain.Recipe;

public interface RecipeDao {
  int insert(Map map); // Create
  void insertMaterials(Map map); // Create
  int insertImageAndProduce(Map map);  
  List<Recipe> recipeList(Map<String,Object> params); // Read or Retrieve
  List<Recipe> recipeSearch(Map<String,Object> params); //Search 성현
  int recipeCount(Map<String,Object> params); //Recipe Count 성현
  List<String> selectRecipeName(String searchValue); //Recipe Name List 성현
  List<Recipe> selectSubscribe2(Map<String,Object> params); //준모
  int addSubscribe(Map<String,Object> params); //구독하기 추가 고재현
  int  deleteSubscribe(Map<String,Object> params);
  List<Recipe> selectSubscribeUno(int userNo); //구독하기한 userNo추출  고재현
  List<Recipe> selectSbuscribe(Map<String,Object> params); //구독한 리스트 고재현 //준모 수정
  List<Recipe> selectMypage(int userNo);      // mypage리스트  고재현
  List<Recipe> selectScrapUserNoMypage(int userNo);      // mypageScrap리스트  고재현
  List<Recipe> selectScrapMypage(Map<String,Object> params);      // mypageScrap리스트  고재현
  Recipe selectOne(Map<String,Object> params); // Read or Retrieve
  int update(Recipe recipe); // Update
  int updateHits(Recipe recipe);  //조회수 증가  고재현
  int delete(int no); // Delete
  List<Material> selectMaterialName(String materialName);
  int likeUp(Recipe recipe);  //좋아요 증가 고재현 
  void likeDown(Recipe recipe);//좋아요 취소  고재현 
  int addScrap(Map<String, Object> Numbers); //스크랩 하기 고재현
  int deleteScrap(Map<String, Object> Numbers); //스크랩 취소 고재현
}
