package com.recipe.controller.json;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.recipe.domain.Recipe;
import com.recipe.service.RecipeService;

@Controller
@RequestMapping("/recipe/")
public class RecipeController {

  @Autowired RecipeService recipeService;
  @RequestMapping(path="list",produces="application/json;charset=UTF-8")
  @ResponseBody
  public String list(
      @RequestParam(defaultValue="1") int pageNo, 
      @RequestParam(defaultValue="4") int pageSize){
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

}
