package com.recipe.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.recipe.domain.Recipe;
import com.recipe.domain.User;
import com.recipe.service.RecipeService;
import com.recipe.util.CommonUtil;

@Controller
@RequestMapping("/recipe/")
public class RecipeController {
	@Autowired
	RecipeService recipeService;

	CommonUtil commonUtil = new CommonUtil();

	@RequestMapping("list")
	public String list(@RequestParam(defaultValue = "1") int pageNo, @RequestParam(defaultValue = "4") int pageSize,
			Model model) {
		model.addAttribute("list", recipeService.getRecipeList(pageNo, pageSize));
		return "list";
	}

	@RequestMapping(path = "addRecipe")
	@ResponseBody
	public String addRecipe(Recipe recipe,
			// @RequestParam("userNo") int userNo,
			@RequestParam("materialName") String[] materialNames,
			@RequestParam("materialAmount") String[] materialAmounts,
			@RequestParam("recipeProduce") String[] recipeProduce,
			@RequestParam("files") MultipartFile[] recipeProduceImage,
			@RequestParam("representImage") List<MultipartFile> rcpRepresentImage,
			HttpServletRequest request) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> map = new HashMap<>();
		Map<String, Object> recipeDatas = new HashMap<>();
		List<Map> materialList = new ArrayList<>();
		JsonArray recipeProduceDatas = new JsonArray();
		JsonArray recipeRepresentImages = new JsonArray();
		
		User user = new User();
		user.setUserNo(1);
			
		for (int i = 0; i < materialNames.length; i++) {
			Map<String, String> matertialInfo = new HashMap<>();
			matertialInfo.put("materialName", materialNames[i]);
			matertialInfo.put("materialAmount", materialAmounts[i]);
			materialList.add(matertialInfo);
		}
		
		map.put("user", user);
		map.put("recipe", recipe);
		int recipeNo = recipeService.addRecipe(map);
		recipeDatas.put("recipeNo", recipeNo);
		recipeDatas.put("materialList", materialList);
		
		try {
			/*대표사진 등록*/
			for(MultipartFile image : rcpRepresentImage){
				int no = rcpRepresentImage.indexOf(image);
				String fileName = recipeNo + "_" + user.getUserNo() + "_" + commonUtil.nowData() + "_" + no+".png";
				File file = new File(commonUtil.getImageFolderPath("representImg", request)+"/"+fileName);
				image.transferTo(file);
				recipeRepresentImages.add(fileName);
			} //end of for
			
			/*조리과정 등록*/
			for (int i = 0; i < recipeProduceImage.length; i++) {
				JsonObject obj = new JsonObject();
				String fileName = recipeNo + "_" + user.getUserNo() + "_" + commonUtil.nowData() + "_" + i+".png";
				File file = new File(commonUtil.getImageFolderPath("recipeImg", request)+"/"+fileName);
				obj.addProperty("recipeProduceImage", fileName);
				obj.addProperty("recipeProduce", recipeProduce[i]);
				recipeProduceDatas.add(obj);
				recipeProduceImage[i].transferTo(file);
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

	@RequestMapping("materialSearch")
	public void mts(@RequestParam String materialName, Model model) {
		model.addAttribute("list", recipeService.getMaterial(materialName));
	}
}
