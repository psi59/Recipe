package com.recipe.controller.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

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
                           @RequestParam(defaultValue="8") int pageSize,
                           Search search, String sort, int userNo){
    HashMap<String,Object> result = new HashMap<>();     
    int recipeCount = 0;
    // TEST용으로 searchCondition, sortCondition 때려박음
    search.setSearchCondition("name"); 
    search.setSortCondition(sort);   
    
    System.out.println("pageNo : "+pageNo);
    
    List<Recipe> list = recipeService.getRecipeSearchList(pageNo, pageSize, search, userNo);
    
    if(pageNo == 1){
      recipeCount = recipeService.getRecipeCount(pageNo, pageSize, search, userNo);
    }
    try{
      result.put("status","success");
      result.put("data", list);
      result.put("recipeCount", recipeCount);      
      result.put("pageNo", pageNo);
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
	public String recipeDetail(int recipeNo,HttpSession session){
		HashMap<String,Object> result = new HashMap<>();
		
		Recipe recipe = new Recipe();
		if(session.getAttribute("userNo") != null){
		recipe = recipeService.getRecipe(recipeNo,(int)session.getAttribute("userNo"));
		}else{
		  recipe = recipeService.getRecipe(recipeNo,0);
		}
		//System.out.println("controller  : "+recipeNo+(int)session.getAttribute("userNo") );
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
	
	
	@RequestMapping(path="subscribe",produces="application/json;charset=UTF-8")
  @ResponseBody
  public String subscribe(int userNo ){
    HashMap<String,Object> result = new HashMap<>();
    Recipe recipe = new Recipe();
    try{
      System.out.println(userNo);
      List<Recipe> userNoList = recipeService.selectSubscribeUno(userNo);
      
      for(int i =0; i<userNoList.size(); i++){
        if(recipe.getSubscribe() == null){    
          recipe.setSubscribe(String.valueOf(userNoList.get(0).getSubscribeNum()));
        }else{
          
          recipe.setSubscribe(recipe.getSubscribe()+","+userNoList.get(i).getSubscribeNum());
          System.out.println(userNoList.get(i).getSubscribeNum());
          System.out.println(recipe.getSubscribe());
        }
      }
      List<Recipe> subscribe = recipeService.selectSbuscribe(recipe.getSubscribe());
      System.out.println(subscribe);
      result.put("status","success");
      result.put("data", subscribe);
    }catch (Exception e){
      result.put("status", "false");
    }
    return new Gson().toJson(result);
  }
  
	@RequestMapping(path="scrap",produces="application/json;charset=UTF-8")
  @ResponseBody
  public String scrap(int recipeNo, HttpSession session){
    HashMap<String,Object> result = new HashMap<>();
    User userNo = new User();    
  
    try{
      
      if(session.getAttribute("userNo") == null){
        result.put("status", "notLogin");
        System.out.println("notLogin");
      }else{
      userNo.setUserNo((int)session.getAttribute("userNo"));      
      recipeService.addScrap(userNo.getUserNo(), recipeNo);
      result.put("status","success");
      System.out.println("success");
      }      
    }catch(Exception e){
      result.put("status", "false");
    }
    return new Gson().toJson(result);
  }
	
	@RequestMapping(path="deleteScrap",produces="application/json;charset=UTF-8")
  @ResponseBody
  public String deleteScrap(int recipeNo, HttpSession session){
    HashMap<String,Object> result = new HashMap<>();
    
    User userNo = new User();
    userNo.setUserNo((int)session.getAttribute("userNo"));
    System.out.println(userNo.getUserNo());
    
    recipeService.deleteScrap(userNo.getUserNo(), recipeNo);
    try{
      result.put("status","success");
    }catch(Exception e){
      result.put("status", "false");
    }
    return new Gson().toJson(result);
  }
	
	@RequestMapping(path="addSubscribe",produces="application/json;charset=UTF-8")
  @ResponseBody
  public String addSubscribe(HttpSession session,int fromUserNo){
    HashMap<String,Object> result = new HashMap<>();
    
    //toUserNo = 구독자, fromUserNo = 회원번호 (해당 회원 페이지)
    User user = new User();
    int toUserNo=(int)session.getAttribute("userNo");
    System.out.println(user.getUserNo());
    
    recipeService.deleteScrap(toUserNo, fromUserNo );
    try{
      result.put("status","success");
    }catch(Exception e){
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
	//커뮤니티 레시피 리스트 : 용
	@RequestMapping(path="comList",produces="application/json;charset=UTF-8")
  @ResponseBody 
  public String comList(HttpSession session){
    HashMap<String,Object> result = new HashMap<>();
    try{
      List<Recipe> myRecipeList = recipeService.selectSbuscribe((session.getAttribute("userNo")).toString());
      result.put("status","success");
      result.put("data", myRecipeList);
    }catch (Exception e){
      result.put("status", "false");
    }
    return new Gson().toJson(result);
  }
	
}
