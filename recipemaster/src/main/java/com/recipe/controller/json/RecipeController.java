package com.recipe.controller.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.recipe.domain.Recipe;
import com.recipe.domain.Search;
import com.recipe.domain.User;
import com.recipe.service.RecipeService;

@Controller
@RequestMapping("/recipe/")
public class RecipeController {

	@Autowired RecipeService recipeService;
	
	// 이성현
	@RequestMapping(path="listSearch",produces="application/json;charset=UTF-8")
  @ResponseBody
  public String listSearch(@RequestParam(defaultValue="1") int pageNo,
                           @RequestParam(defaultValue="6") int pageSize,
                           Search search, int userNo){
    HashMap<String,Object> result = new HashMap<>();     
    
    // TEST용으로 searchCondition, sortCondition 때려박음
    search.setSearchCondition("name");
    search.setSortCondition("newest");   
    
    List<Recipe> list = recipeService.getRecipeSearchList(pageNo, pageSize, search, userNo);
    int recipeCount = recipeService.getRecipeCount(pageNo, pageSize, search, userNo);
   
    try{
      result.put("status","success");
      result.put("data", list);
      result.put("recipeCount", recipeCount);
    }catch (Exception e){
      result.put("status", "false");
    }

    return new Gson().toJson(result);
  }

	@RequestMapping(path="addRecipe",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String addRecipe(Recipe recipe, @RequestParam("materialName") String[] materialNames, @RequestParam("materialAmount") String[] materialAmounts, @RequestParam("files") List<MultipartFile> images){
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> map = new HashMap<>();
		User user = new User();
		user.setUserNo(1);
		List<Map> materialList = new ArrayList<>();

		for (MultipartFile mpf: images) {
            System.out.println(mpf.getOriginalFilename() + " uploaded");
		}
		
		for(int i=0; i<materialNames.length; i++){
			Map<String, String> matertialInfo = new HashMap<>();
			matertialInfo.put("materialName", materialNames[i]);
			matertialInfo.put("materialAmount", materialAmounts[i]);
			materialList.add(matertialInfo);
		}

		System.out.println(recipe);
		System.out.println(user);

		map.put("user", user);
		map.put("recipe", recipe);
		int recipeNo = recipeService.addRecipe(map);
		Map<String, Object> asdasd = new HashMap<>();
		asdasd.put("recipeNo", recipeNo);
		asdasd.put("materialList", materialList);
		try{
			recipeService.addMaterials(asdasd);
			result.put("status","success");
		}catch (Exception e){
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}

//---------------------고재현 -------------------------

	 @RequestMapping(path="list",produces="application/json;charset=UTF-8")
	  @ResponseBody
	  public String list(
	      @RequestParam int userNo, 
	      @RequestParam(defaultValue="4") int pageSize){
	    HashMap<String,Object> result = new HashMap<>();
	    /*System.out.println("userNo"+userNo);*/
	    List<Recipe> list = recipeService.getRecipeList(userNo, pageSize);
	    for(int i =0; i<list.size(); i++){
	    }
	    try{
	      result.put("status","success");
	      result.put("data", list);
	    }catch (Exception e){
	      result.put("status", "false");
	    }

	    return new Gson().toJson(result);
	  }
	 
	 @RequestMapping(path="list2",produces="application/json;charset=UTF-8")
   @ResponseBody
   public String list2(
       @RequestParam int userNo,
       @RequestParam(defaultValue="4") int pageSize){
     HashMap<String,Object> result = new HashMap<>();
     List<Recipe> list = recipeService.getRecipeList2(userNo, pageSize);
     for(int i =0; i<list.size(); i++){
     }
     try{
       result.put("status","success");
       result.put("data", list);
     }catch (Exception e){
       result.put("status", "false");
     }

     return new Gson().toJson(result);
   }
 
	 
	
	@RequestMapping(path="recipeDetail",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String recipeDetail(@RequestParam int recipeNo){
		HashMap<String,Object> result = new HashMap<>();
		Recipe recipe = recipeService.getRecipe(recipeNo);
		recipe.setHits(recipe.getHits()+1);
		recipeService.updateHits(recipe);
	try{
			result.put("status","success");
			result.put("data", recipe);
		}catch (Exception e){
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}
	
	@RequestMapping(path="likeUp",produces="application/json;charset=UTF-8")
  @ResponseBody
  public String recipeLikeUp(@RequestParam("recipeNo") int recipeNo,
                             @RequestParam("userNo") int userNo){
	  HashMap<String,Object> result = new HashMap<>();
	  
	  Recipe recipe = new Recipe();
	  recipe.setRecipeNo(recipeNo);
	  recipe.setUserNo(userNo);
	  recipeService.likeUp(recipe);
	  
    try{
      result.put("status","success");
      result.put("data", recipe);
    }catch (Exception e){
      result.put("status", "false");
    }

    return new Gson().toJson(result);
	}
	
	@RequestMapping(path="likeDown",produces="application/json;charset=UTF-8")
  @ResponseBody
  public String recipeLikeDown(@RequestParam("recipeNo") int recipeNo,
                             @RequestParam("userNo") int userNo){
	  Recipe recipe= new Recipe();
	  recipe.setRecipeNo(recipeNo);
	  recipe.setUserNo(userNo);
	  recipeService.likeDown(recipe);
	    
	  HashMap<String,Object> result = new HashMap<>();	  
	  try{
      result.put("status","success");
    }catch (Exception e){
      result.put("status", "false");
    }
	  
	  return new Gson().toJson(result);
	}
	
//	---------------------고재현 -------------------------
	@RequestMapping(path="materialSearch",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String mts(@RequestParam("searchValue") String materialName, Model model) {
		System.out.println("데헷데헷");
		Map<String,Object> result = new HashMap<>();
		List<String> list = recipeService.getMaterial(materialName);
		try{
			result.put("status","success");
			result.put("data", list);
		}catch (Exception e){
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}

	@RequestMapping(path="rank",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String rank(
			@RequestParam(defaultValue="1") int pageNo, 
			@RequestParam(defaultValue="10") int pageSize){
		HashMap<String,Object> result = new HashMap<>();
		List<Recipe> list = recipeService.getRecipeList(pageNo, pageSize);
		try{
			result.put("status","success");
			result.put("data", list);
		}catch (Exception e){
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}

}
