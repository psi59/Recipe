package com.recipe.controller.json;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.recipe.domain.Material;
import com.recipe.domain.Recipe;
import com.recipe.domain.Search;
import com.recipe.domain.User;
import com.recipe.service.RecipeService;
import com.recipe.service.UserService;
import com.recipe.util.CommonUtil;

@Controller
@RequestMapping("/recipe/")
public class RecipeController {
	@Autowired
	RecipeService recipeService;
	@Autowired
	UserService userService;

	// 리스트 검색 -이성현
	@RequestMapping(path = "listSearch", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String listSearch(@RequestParam(defaultValue = "1") int pageNo,
			@RequestParam(defaultValue = "8") int pageSize, Search search, HttpSession session) {
		HashMap<String, Object> result = new HashMap<>();
		int recipeCount = 0;

		int userNo = 0;
		if (session.getAttribute("userNo") != null) {
			userNo = (Integer) (session.getAttribute("userNo"));
		}

		List<Recipe> list = recipeService.getRecipeSearchList(pageNo, pageSize, search, userNo);

		// 처음에만 레시피카드들을 카운트 한다.
		if (pageNo == 1) {
			recipeCount = recipeService.getRecipeCount(pageNo, pageSize, search, userNo);
		}

		try {
			result.put("status", "success");
			result.put("data", list);
			if (list.isEmpty()) {
				result.put("data", "lastPage");
			}
			result.put("recipeCount", recipeCount);
			result.put("pageNo", pageNo);
		} catch (Exception e) {
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}

	// 리스트 페이지 레시피 검색 자동완성 -이성현
	@RequestMapping(path = "recipeSearchAutoComplete", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String recipeSearchAutoComplete(@RequestParam String searchValue) {
		HashMap<String, Object> result = new HashMap<>();
		List<String> recipeNameList = recipeService.getRecipeNameList(searchValue);
		for (String recipeName : recipeNameList) {
			System.out.println("Recipe Name : " + recipeName);
		}
		try {
			result.put("status", "success");
			result.put("data", recipeNameList);
		} catch (Exception e) {
			result.put("status", "false");
		}
		return new Gson().toJson(recipeNameList);
	}

	@RequestMapping(path = "addRecipe")
	@ResponseBody
	public String addRecipe(Recipe recipe, @RequestParam("materialNo") String[] materialNos,
			@RequestParam("materialAmount") String[] materialAmounts,
			@RequestParam("recipeProduce") String[] recipeProduce,
			@RequestParam("imageFiles") List<MultipartFile> imageFiles,
			@RequestParam("representImgNames") List<String> representImgNames,
			@RequestParam("produceImgNames") List<String> produceImgNames, HttpServletRequest request,
			HttpSession session) {

		Map<String, Object> result = new HashMap<>();
		Map<String, Object> map = new HashMap<>();
		Map<String, Object> recipeDatas = new HashMap<>();
		List<Map> materialList = new ArrayList<>();
		JsonArray recipeProduceDatas = new JsonArray();
		JsonArray recipeRepresentImages = new JsonArray();

		System.out.println(recipe);

		User user = new User();
		user.setUserNo(1);

		for (int i = 0; i < materialNos.length; i++) {
			Map<String, String> matertialInfo = new HashMap<>();
			System.out.println(materialNos.toString());
			System.out.println(materialAmounts.toString());
			matertialInfo.put("materialNo", materialNos[i]);
			matertialInfo.put("materialAmount", materialAmounts[i]);
			materialList.add(matertialInfo);
		}

		map.put("user", user);
		map.put("recipe", recipe);
		int recipeNo = recipeService.addRecipe(map);
		recipeDatas.put("recipeNo", recipeNo);
		recipeDatas.put("materialList", materialList);

		try {
			for (int i = 0; i < representImgNames.size(); i++) {
				Thread.sleep(1);
				// MultipartFile image = null;
				String[] fileInfo = representImgNames.get(i).split("/");
				// image = CommonUtil.findImageFile(fileInfo, imageFiles);
				String fileName = recipe.getRecipeNo() + "_" + user.getUserNo() + "_" + System.currentTimeMillis() + ".png";
				// File newFile = new
				// File(CommonUtil.getImageFolderPath("representImg", request) +
				// "/" + fileName);
				// CommonUtil.findImageFile(fileInfo,
				// imageFiles).transferTo(newFile);
				FileCopyUtils.copy(CommonUtil.findImageFile(fileInfo, imageFiles).getBytes(),
						new FileOutputStream(CommonUtil.getImageFolderPath("representImg", request) + "/" + fileName));
				recipeRepresentImages.add(fileName);
			} // end of for

			/* 조리과정 등록 */
			for (int i = 0; i < produceImgNames.size(); i++) {
				Thread.sleep(1);
				String[] fileInfo = produceImgNames.get(i).split("/");
				JsonObject obj = new JsonObject();
				String fileName = recipe.getRecipeNo() + "_" + user.getUserNo() + "_" + System.currentTimeMillis() + ".png";
				obj.addProperty("recipeProduceImage", fileName);
				obj.addProperty("recipeProduce", recipeProduce[i]);
				recipeProduceDatas.add(obj);
				FileCopyUtils.copy(CommonUtil.findImageFile(fileInfo, imageFiles).getBytes(),
						new FileOutputStream(CommonUtil.getImageFolderPath("recipeImg", request) + "/" + fileName));
			} // end of for
			recipeDatas.put("recipeProduceDatas", recipeProduceDatas.toString());
			recipeDatas.put("recipeRepresentImages", recipeRepresentImages.toString());
			recipeService.registyImageAndProduce(recipeDatas);
			recipeService.addMaterials(recipeDatas);
			result.put("status", "success");
		} catch (Exception e) {
			e.printStackTrace();
			result.put("status", "false");
		}
		return new Gson().toJson(result);
	}

	@RequestMapping(path = "checkMyRecipe")
	@ResponseBody
	public String checkMyRecipe(int recipeNo, HttpSession session){
		Map<String, Object> result = new HashMap<>();

		try{
			User user = CommonUtil.getSessionUser(session);

			Map<String, Object> dataForCheckMyRecipe = new HashMap<>();
			dataForCheckMyRecipe.put("userNo", user.getUserNo());
			dataForCheckMyRecipe.put("recipeNo", recipeNo);
			if(recipeService.checkMyRecipe(dataForCheckMyRecipe) != null) {
				result.put("status", "success");
			} else {
				result.put("status", "fail");
			}
		} catch(Exception e){
			result.put("status", "nologin");
		}

		return new Gson().toJson(result);		
	}

	@RequestMapping(path = "updateRecipe")
	@ResponseBody
	public String updateRecipe(Recipe recipe, @RequestParam("materialNo") String[] materialNos,
			@RequestParam("materialAmount") String[] materialAmounts,
			@RequestParam("recipeProduce") String[] recipeProduce,
			@RequestParam("imageFiles") List<MultipartFile> imageFiles,
			@RequestParam("representImgNames") List<String> representImgNames,
			@RequestParam("produceImgNames") List<String> produceImgNames, HttpServletRequest request,
			HttpSession session) {

		Map<String, Object> result = new HashMap<>();
		User user = CommonUtil.getSessionUser(session);

		Map<String, Object> recipeDatas = new HashMap<>();
		List<Map> materialList = new ArrayList<>();
		JsonArray recipeProduceDatas = new JsonArray();
		JsonArray recipeRepresentImages = new JsonArray();

		for (int i = 0; i < materialNos.length; i++) {
			Map<String, String> matertialInfo = new HashMap<>();
			System.out.println(materialNos.toString());
			System.out.println(materialAmounts.toString());
			matertialInfo.put("materialNo", materialNos[i]);
			matertialInfo.put("materialAmount", materialAmounts[i]);
			materialList.add(matertialInfo);
		}

		try {
			for (int i = 0; i < representImgNames.size(); i++) {
				// MultipartFile image = null;
				Thread.sleep(1);
				String[] fileInfo = representImgNames.get(i).split("/");
				String fileName = recipe.getRecipeNo() + "_" + user.getUserNo() + "_" + System.currentTimeMillis() + ".png";
				if(fileInfo.length>1){
					FileCopyUtils.copy(CommonUtil.findImageFile(fileInfo, imageFiles).getBytes(),
							new FileOutputStream(CommonUtil.getImageFolderPath("representImg", request) + "/" + fileName));
				}
				recipeRepresentImages.add(fileName);
			} // end of for

			/* 조리과정 등록 */
			for (int i = 0; i < produceImgNames.size(); i++) {
				Thread.sleep(1);
				String[] fileInfo = produceImgNames.get(i).split("/");
				JsonObject obj = new JsonObject();
				String fileName = recipe.getRecipeNo() + "_" + user.getUserNo() + "_" + System.currentTimeMillis() + ".png";
				obj.addProperty("recipeProduceImage", produceImgNames.get(i));
				if(fileInfo.length>1){
					FileCopyUtils.copy(CommonUtil.findImageFile(fileInfo, imageFiles).getBytes(),
							new FileOutputStream(CommonUtil.getImageFolderPath("recipeImg", request) + "/" + fileName));
					obj.addProperty("recipeProduceImage", fileName);
				}					
				obj.addProperty("recipeProduce", recipeProduce[i]);
				recipeProduceDatas.add(obj);
			} // end of for

			recipe.setRecipeProcedure(recipeProduceDatas);
			recipe.setRepresentImages(recipeRepresentImages);				
			recipeService.updateRecipe(recipe);
			recipeService.deleteMaterials(recipe.getRecipeNo());

			recipeDatas.put("materialList", materialList);
			recipeDatas.put("recipeNo", recipe.getRecipeNo());

			recipeService.addMaterials(recipeDatas);

			//recipeService.addMaterials(recipeDatas);
			result.put("status", "success");
		} catch (Exception e) {
			e.printStackTrace();
			result.put("status", "false");
		} 
		return new Gson().toJson(result);
	}

	// ---------------------고재현 -------------------------
	@RequestMapping(path = "list", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String list(@RequestParam int userNo, @RequestParam(defaultValue = "4") int pageSize, int request) {
		HashMap<String, Object> result = new HashMap<>();
		List<Recipe> list = recipeService.getRecipeList(userNo, pageSize, request);
		for (int i = 0; i < list.size(); i++) {
		}
		try {
			result.put("status", "success");
			result.put("data", list);
			System.out.println(list);
		} catch (Exception e) {
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}

	@RequestMapping(path = "recipeDetail", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String recipeDetail(int recipeNo, HttpSession session) {
		HashMap<String, Object> result = new HashMap<>(); 
		List<Material> materials = new ArrayList<>();
		Recipe recipe = new Recipe();
		if (session.getAttribute("userNo") != null) {
			recipe = recipeService.getRecipe(recipeNo, (int) session.getAttribute("userNo"));
		} else {
			recipe = recipeService.getRecipe(recipeNo, 0);
		}
		materials = recipeService.getRecipeMaterial(recipeNo);
		System.out.println("재료 : "+materials);

		// System.out.println("controller :
		// "+recipeNo+(int)session.getAttribute("userNo") );
		recipe.setHits(recipe.getHits() + 1);
		recipeService.updateHits(recipe);
		try {
			result.put("status", "success");
			result.put("data", recipe);
			result.put("materials", materials);
			System.out.println(recipe);
		} catch (Exception e) {
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}

	@RequestMapping(path = "recipeComment", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String recipeComment(int recipeNo) {
		HashMap<String, Object> result = new HashMap<>();
		System.out.println(recipeNo);
		List<Recipe> recipeComment = recipeService.recipeComment(recipeNo);

		System.out.println("comment : " + recipeComment);

		try {

			result.put("status", "success");
			result.put("data", recipeComment);
			// result.put("user", recipeCommentUser);
		} catch (Exception e) {
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}

	@RequestMapping(path = "likeUp", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String recipeLikeUp(@RequestParam("recipeNo") int recipeNo, @RequestParam("userNo") int userNo) {
		HashMap<String, Object> result = new HashMap<>();

		Recipe recipe = new Recipe();
		recipe.setRecipeNo(recipeNo);
		recipe.setUserNo(userNo);
		recipeService.likeUp(recipe);

		try {
			result.put("status", "success");
			result.put("data", recipe);
		} catch (Exception e) {
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}

	@RequestMapping(path = "likeDown", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String recipeLikeDown(@RequestParam("recipeNo") int recipeNo, @RequestParam("userNo") int userNo) {
		Recipe recipe = new Recipe();
		recipe.setRecipeNo(recipeNo);
		recipe.setUserNo(userNo);
		recipeService.likeDown(recipe);

		HashMap<String, Object> result = new HashMap<>();
		try {
			result.put("status", "success");
		} catch (Exception e) {
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}

	@RequestMapping(path = "scrap", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String scrap(int recipeNo, HttpSession session) {
		HashMap<String, Object> result = new HashMap<>();
		User userNo = new User();

		try {

			if (session.getAttribute("userNo") == null) {
				result.put("status", "notLogin");
			} else {
				userNo.setUserNo((int) session.getAttribute("userNo"));
				recipeService.addScrap(userNo.getUserNo(), recipeNo);
				result.put("status", "success");
			}
		} catch (Exception e) {
			result.put("status", "false");
		}
		return new Gson().toJson(result);
	}

	@RequestMapping(path = "deleteScrap", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String deleteScrap(int recipeNo, HttpSession session) {
		HashMap<String, Object> result = new HashMap<>();

		User userNo = new User();
		userNo.setUserNo((int) session.getAttribute("userNo"));

		recipeService.deleteScrap(userNo.getUserNo(), recipeNo);
		try {
			result.put("status", "success");
		} catch (Exception e) {
			result.put("status", "false");
		}
		return new Gson().toJson(result);
	}
//
//	@RequestMapping(path = "addSubscribe", produces = "application/json;charset=UTF-8")
//	@ResponseBody
//	public String addSubscribe(HttpSession session, int fromUserNo) {
//		HashMap<String, Object> result = new HashMap<>();
//
//		// toUserNo = 구독자, fromUserNo = 회원번호 (해당 회원 페이지)
//		User user = new User();
//		int toUserNo = (int) session.getAttribute("loginUser");
//		System.out.println(user.getUserNo());
//
//		recipeService.addSubscribe(toUserNo, fromUserNo);
//		try {
//			result.put("status", "success");
//		} catch (Exception e) {
//			result.put("status", "false");
//		}
//		return new Gson().toJson(result);
//	}

	//준모수정
	@RequestMapping(path="subscribe",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String subscribe(@RequestParam(defaultValue="1") int pageNo,
			@RequestParam(defaultValue="4") int pageSize,HttpSession session,int userNo ){
		HashMap<String,Object> result = new HashMap<>();
		Recipe recipe = new Recipe();
		try{
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
		System.out.println(result);
		return new Gson().toJson(result);
	}

	/*	@RequestMapping(path="addSubscribe",produces="application/json;charset=UTF-8")
  @ResponseBody
  public String addSubscribe(HttpSession session,int fromUserNo){
    HashMap<String,Object> result = new HashMap<>();
    //toUserNo = 구독자, fromUserNo = 회원번호 (해당 회원 페이지)
    User user = new User();
    int toUserNo=((User)session.getAttribute("loginUser")).getUserNo();
    System.out.println("toUserNo::"+toUserNo);
    System.out.println("fromUserNo::"+fromUserNo);
    recipeService.addSubscribe(toUserNo, fromUserNo);
    try{
      result.put("status","success");
    }catch(Exception e){
      result.put("status", "false");
    }
    return new Gson().toJson(result);
  }*/

	@RequestMapping(path="addSubscribe",produces="application/json;charset=UTF-8")
    @ResponseBody
    public String addSubscribe(HttpSession session,String email){
      HashMap<String,Object> result = new HashMap<>();
      //toUserNo = 구독자, fromUserNo = 회원번호 (해당 회원 페이지)
      
      if(((User)session.getAttribute("loginUser"))==null){
        
        result.put("status", "failure");
        System.out.println("login안함");
        System.out.println(result);
        return new Gson().toJson(result);
       }
      
      int toUserNo=((User)session.getAttribute("loginUser")).getUserNo();
      System.out.println("toUserNo::"+toUserNo);
      System.out.println("fromUserNo_email::"+email);
      
      int fromUserNo=userService.selectFromEmail(email).getUserNo();
      
      recipeService.addSubscribe(toUserNo, fromUserNo);
      try{
        result.put("status","success");
      }catch(Exception e){
        result.put("status", "false");
      }
      return new Gson().toJson(result);
    }

	@RequestMapping(path="deleteSubscribe",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String deleteSubscribe(HttpSession session,String email){
		HashMap<String,Object> result = new HashMap<>();
		//toUserNo = 구독자, fromUserNo = 회원번호 (해당 회원 페이지)
		User user = new User();
		int toUserNo=((User)session.getAttribute("loginUser")).getUserNo();
		System.out.println("toUserNo::"+toUserNo);
		System.out.println("fromUserNo_email::"+email);

		int fromUserNo=userService.selectFromEmail(email).getUserNo();

		recipeService.deleteSubscribe(toUserNo, fromUserNo);

		try{
			result.put("status","success");
		}catch(Exception e){
			result.put("status", "false");
		}
		return new Gson().toJson(result);
	}

	@RequestMapping(path="checkSubscribe",produces="application/json;charset=UTF-8")
	@ResponseBody
	public String checkSubscribe(HttpSession session,String email){
		HashMap<String,Object> result = new HashMap<>();
		//toUserNo = 구독자, fromUserNo = 회원번호 (해당 회원 페이지)
		User user = new User();

		if(((User)session.getAttribute("loginUser"))==null){
			result.put("status","false");
			return new Gson().toJson(result);
		}

		//login한 사람 userNo
		int toUserNo=((User)session.getAttribute("loginUser")).getUserNo();
		//참조하고 있는 사람 userNo
		user=userService.selectFromEmail(email);
		int fromUserNo=user.getUserNo();
		try{

			if (recipeService.checkSubscribe(toUserNo, fromUserNo)!=null) {
				result.put("status","success");
			}else{
				result.put("status","false");
			}

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
		Map<String, Object> result = new HashMap<>();
		List<Material> list = recipeService.getMaterial(materialName);
		List<Map<String, Object>> foodstuffList = new ArrayList<>();
		List<Map<String, Object>> seasoningList = new ArrayList<>();
		System.out.println(list);
		try {
			for (Material mt : list) {
				Map<String, Object> seasoning = new HashMap<>();
				Map<String, Object> foodstuff = new HashMap<>();
				if (mt.getMaterialStatement() == 1) {
					foodstuff.put("name", mt.getMaterialName());
					foodstuff.put("no", mt.getMaterialNo());
					foodstuff.put("category", mt.getMaterialStatement());
					foodstuffList.add(foodstuff);
				} else {
					seasoning.put("name", mt.getMaterialName());
					seasoning.put("no", mt.getMaterialNo());
					seasoning.put("category", mt.getMaterialStatement());
					seasoningList.add(seasoning);
				}
				result.put("foodstuff", foodstuffList);
				result.put("seasoning", seasoningList);
			}
		} catch (Exception e) {
			result.put("status", "false");
		}
		System.out.println(new Gson().toJson(result));
		return new Gson().toJson(result);
	}

	@RequestMapping(path = "rank", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String rank(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "10") int pageSize) {
		HashMap<String, Object> result = new HashMap<>();
		List<Recipe> list = recipeService.getRecipeRankList(pageNo, pageSize);
		try {
			result.put("status", "success");
			result.put("data", list);
		} catch (Exception e) {
			result.put("status", "false");
		}

		return new Gson().toJson(result);
	}

	// 커뮤니티 레시피 리스트 : 용 ---- 고재현 수정.
	@RequestMapping(path = "userPage", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String userPage(String email, int request, HttpSession session) {
		HashMap<String, Object> result = new HashMap<>();
		  System.out.println("email : "+email);
		try {
			List<Recipe> recipeList = new ArrayList<Recipe>();
			List<Recipe> userNumbers = new ArrayList<Recipe>();
			int userNo = CommonUtil.getSessionUser(session).getUserNo(); 
			User user = userService.selectFromEmail(email);
			System.out.println("email로 뽑아온 User정보 : "+user);

			userNumbers = recipeService.selectScrapUserNoMypage(user.getUserNo());
			Recipe recipe = functionForUserNumbers(userNumbers,request);
			//getSession(userNo, session);

			if(request == 1){
				recipeList = recipeService.selectMypageRecipe(String.valueOf(user.getUserNo()), userNo,request);      
			}else if(request == 2){
				recipeList = recipeService.selectMypageRecipe(recipe.getScrap(), userNo,request);
			}else if(request == 3){
				userNumbers = recipeService.selectSubscribeMypage(user.getUserNo());
				System.out.println("request3 userNumbers : "+ userNumbers);
				Recipe subscribeRecipe = functionForUserNumbers(userNumbers,request);
				System.out.println("subscribeRecipeNumbers : "+subscribeRecipe);
				//getSession(userNo, session);
				recipeList = recipeService.selectMypageRecipe(subscribeRecipe.getScrap(), userNo,request);
			}



			result.put("status","success");
			result.put("data",recipeList);
			result.put("user", user);
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
		try{
			List<Recipe> myRecipeList = recipeService.selectSbuscribe2((session.getAttribute("userNo")).toString(),pageNo,pageSize);
			result.put("status","success");
			result.put("data", myRecipeList);
			result.put("pageNo",pageNo);
			System.out.println("pageNo::"+result.get("pageNo"));
			System.out.println("data::"+result.get("data"));
		}catch (Exception e){ 
			result.put("status", "false");
		} 
		return new Gson().toJson(result);
	}

	public int getSession(int userNo, HttpSession session) {
		// User user = new User();
		if (session.getAttribute("loginUser") == null) {
			userNo = 0;
		} else {
			userNo = ((User) session.getAttribute("loginUser")).getUserNo();
		}
		return userNo;
	}

	public Recipe functionForUserNumbers(List<Recipe> userNumbers, int request) {
		Recipe recipe = new Recipe();
		if (userNumbers.size() == 0 || userNumbers.equals("")) {
			recipe.setScrap("0");
		} else {
			for (int i = 0; i < userNumbers.size(); i++) {
				if (recipe.getScrap() == null) {
					if (request == 3) {
						recipe.setScrap(String.valueOf(userNumbers.get(0).getSubscribeNum()));
					} else {
						recipe.setScrap(String.valueOf(userNumbers.get(0).getRecipeNo()));
					}
				} else {
					if (request == 3) {
						recipe.setScrap(recipe.getScrap() + "," + userNumbers.get(i).getSubscribeNum());
					} else {
						recipe.setScrap(recipe.getScrap() + "," + userNumbers.get(i).getRecipeNo());
					}
				}
			}
		}
		return recipe;
	}
	
	@RequestMapping(path="addComment" , produces ="application/json; charset=UTF-8")
	@ResponseBody
	public String addComment(int recipeNo,String recipeComment , HttpSession session){
	  HashMap<String, Object> result = new HashMap<>();
	  Recipe recipe = new Recipe();
	  recipe.setRecipeNo(recipeNo);
	  recipe.setRecipeComment(recipeComment);
	   
	  if ( (User)session.getAttribute("loginUser") == null ) {
	    result.put("status", "notLogin");
	  }else{	  
	    recipeService.addComment(recipe, ((User)session.getAttribute("loginUser")).getUserNo());
	  }
	  result.put("status", "success");
	  return new Gson().toJson(result);
	}
	
	@RequestMapping(path="deleteComment" , produces ="application/json; charset=UTF-8")
  @ResponseBody
  public String deleteComment(int commentNo){
	  HashMap<String, Object> result = new HashMap<>();
	  recipeService.deleteComment(commentNo);
	  
	  result.put("status", "success");
	  
	  return new Gson().toJson(result);
	}
	
	@RequestMapping(path = "imageDelete", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String imageDelete(@RequestParam("category") String category, @RequestParam("imageName") String imageName, HttpServletRequest request) {
		HashMap<String, Object> result = new HashMap<>();
		File file = new File(CommonUtil.getImageFolderPath(category, request)+"/"+imageName);

		if(file.exists()){
			file.delete();
			result.put("status", "success");
		} else {
			result.put("status", "fail");
		}

		return new Gson().toJson(result);
	}
}
