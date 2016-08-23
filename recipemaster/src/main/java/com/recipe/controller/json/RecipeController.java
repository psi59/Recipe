package com.recipe.controller.json;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.recipe.domain.Material;
import com.recipe.domain.Recipe;
import com.recipe.domain.Search;
import com.recipe.domain.User;
import com.recipe.service.RecipeService;
import com.recipe.service.UserService;

@Controller
@RequestMapping("/recipe/")
public class RecipeController {

	@Autowired RecipeService recipeService;
	@Autowired UserService userService;
	
	// 리스트 검색 -이성현
	@RequestMapping(path="listSearch",produces="application/json;charset=UTF-8")
  @ResponseBody
  public String listSearch(@RequestParam(defaultValue="1") int pageNo,
                           @RequestParam(defaultValue="8") int pageSize,
                           Search search, HttpSession session){
    HashMap<String,Object> result = new HashMap<>();     
    int recipeCount = 0;    
    
    int userNo = 0;    
    if(session.getAttribute("userNo") != null){
      userNo = (Integer)(session.getAttribute("userNo"));
    }
    
    List<Recipe> list = recipeService.getRecipeSearchList(pageNo, pageSize, search, userNo);
    
    // 처음에만 레시피카드들을 카운트 한다.
    if(pageNo == 1){
      recipeCount = recipeService.getRecipeCount(pageNo, pageSize, search, userNo);
    }    
    
    try{      
      result.put("status","success");      
      result.put("data", list);
      if(list.isEmpty()){
        result.put("data", "lastPage"); 
      }
      result.put("recipeCount", recipeCount);      
      result.put("pageNo", pageNo);
    }catch (Exception e){
      result.put("status", "false");
    }

    return new Gson().toJson(result);
  }
	
	//리스트 페이지 레시피 검색 자동완성 -이성현
	@RequestMapping(path="recipeSearchAutoComplete",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String recipeSearchAutoComplete(@RequestParam String searchValue){
	  HashMap<String, Object> result = new HashMap<>();
	  List<String> recipeNameList = recipeService.getRecipeNameList(searchValue);
	  for (String recipeName : recipeNameList) {
      System.out.println("Recipe Name : "+recipeName);
    }
	  try{
	    result.put("status","success");        
      result.put("data", recipeNameList);
	  }catch(Exception e){
	    result.put("status", "false");
	  }	  
	  return new Gson().toJson(recipeNameList);
	}
	
	@RequestMapping(path="addRecipe",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String addRecipe(Recipe recipe, @RequestParam("materialName") String[] materialNames, @RequestParam("materialAmount") String[] materialAmounts, @RequestParam("files") List<MultipartFile> images){
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> map = new HashMap<>();
		User user = new User();
		user.setUserNo(1);
		List<Map<String, String>> materialList = new ArrayList<>();

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
	      @RequestParam(defaultValue="4") int pageSize,int request){
	    HashMap<String,Object> result = new HashMap<>();
	    /*System.out.println("userNo"+userNo);*/
	    List<Recipe> list = recipeService.getRecipeList(userNo, pageSize,request);
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
	
	//준모수정
	@RequestMapping(path="subscribe",produces="application/json;charset=UTF-8")
  @ResponseBody
  public String subscribe(@RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="4") int pageSize,HttpSession session,int userNo ){
    HashMap<String,Object> result = new HashMap<>();
    Recipe recipe = new Recipe();
    try{
      System.out.println("오냐??"+userNo);
    //구독한 사람 뽑는다.
      List<Recipe> userNoList = recipeService.selectSubscribeUno(userNo);
      
    
      for(int i =0; i<userNoList.size(); i++){ 
        if(recipe.getSubscribe() == null){    
          recipe.setSubscribe(String.valueOf(userNoList.get(0).getSubscribeNum()));
        }else{
          
          recipe.setSubscribe(recipe.getSubscribe()+","+userNoList.get(i).getSubscribeNum());
        }
      }
      String scsUserNo=recipe.getSubscribe();
      List<Recipe> subscribe = recipeService.selectSbuscribe(scsUserNo,pageNo,pageSize);
      result.put("status","success");
      result.put("data", subscribe);
      result.put("pageNo", pageNo);
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
      }else{
      userNo.setUserNo((int)session.getAttribute("userNo"));      
      recipeService.addScrap(userNo.getUserNo(), recipeNo);
      result.put("status","success");
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
	  System.out.println(materialName);
		Map<String,Object> result = new HashMap<>();
		List<Material> list = recipeService.getMaterial(materialName);
		List<Map<String,Object>> foodstuffList = new ArrayList<>();
		List<Map<String,Object>> seasoningList = new ArrayList<>();
		System.out.println(list);
		try{		
			for(Material mt : list){
				Map<String,Object> seasoning = new HashMap<>();
				Map<String,Object> foodstuff = new HashMap<>();
				if(mt.getMaterialStatement()==1){
					foodstuff.put("name", mt.getMaterialName());
					foodstuff.put("no", mt.getMaterialNo());
					foodstuffList.add(foodstuff);
				} else {
					seasoning.put("name", mt.getMaterialName());
					seasoning.put("no", mt.getMaterialNo());
					seasoningList.add(seasoning);
				}
				result.put("foodstuff", foodstuffList);
				result.put("seasoning", seasoningList);
			}
		}catch (Exception e){
			result.put("status", "false");
		}
		System.out.println(new Gson().toJson(result));
		return new Gson().toJson(result);
	}

	@RequestMapping(path="rank",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String rank(
			@RequestParam(defaultValue="1") int pageNo, 
			@RequestParam(defaultValue="10") int pageSize,int request){
		HashMap<String,Object> result = new HashMap<>();
		List<Recipe> list = recipeService.getRecipeList(pageNo, pageSize,request);
		try{
			result.put("status","success");
			result.put("data", list);
		}catch (Exception e){
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}

	//커뮤니티 레시피 리스트 : 용  ----  고재현 수정. 
	@RequestMapping(path="comListKo",produces="application/json;charset=UTF-8")
  @ResponseBody 
  public String comListKo(String email){
	  HashMap<String,Object> result = new HashMap<>();
    Recipe recipe = new Recipe();
    try{
      User user = userService.selectFromEmail(email);
      List<Recipe> userScrapNumbers = recipeService.selectScrapUserNoMypage(user.getUserNo());
      for(int i =0; i<userScrapNumbers.size(); i++){
        if(recipe.getScrap() == null){    
          recipe.setScrap(String.valueOf(userScrapNumbers.get(0).getRecipeNo()));
        }else{
          recipe.setScrap(recipe.getScrap()+","+ userScrapNumbers.get(i).getRecipeNo());
        }
      }
      List<Recipe> scrapList = recipeService.selectScrapMypage(recipe.getScrap(), user.getUserNo());
      result.put("status","success");
      result.put("data",scrapList);
    }catch (Exception e){
      e.printStackTrace();
      result.put("status", "false");
    }
 
    return new Gson().toJson(result);
  }




  //community준모,용이형
  @RequestMapping(path="comList",produces="application/json;charset=UTF-8")
  @ResponseBody 
  public String comList( @RequestParam(defaultValue="1") int pageNo,
                          @RequestParam(defaultValue="4") int pageSize,HttpSession session){

    HashMap<String,Object> result = new HashMap<>();
    Recipe recipe = new Recipe();
    try{
      List<Recipe> myRecipeList = recipeService.selectSbuscribe2((session.getAttribute("userNo")).toString(),pageNo,pageSize);
      result.put("status","success");
      result.put("data", myRecipeList);
      result.put("pageNo",pageNo);
    }catch (Exception e){ 
      result.put("status", "false");
    }
    System.out.println(result);
    return new Gson().toJson(result);
  }
    }

