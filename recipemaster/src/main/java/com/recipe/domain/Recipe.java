package com.recipe.domain;

import java.util.Date;

import com.google.gson.JsonArray;

public class Recipe {

	private int recipeNo;
	private int userNo;
	private String recipeName;
	private String intro;
	private JsonArray representImages;
	private JsonArray materials;
	private JsonArray recipeProcedure;
	private int cookTime;
	private int portion;
	private Date recipeDate;
	private int hits;
	private int regiStatus;
	private int gradePoint;
	private User user;
	private Date likeDate;
	private int likeUser;
	private int countLike;
	
	//Constructor
	public Recipe() {
		super();
	}
	
	//Method
	public int getRecipeNo() {
		return recipeNo;
	}
	public void setRecipeNo(int recipeNo) {
		this.recipeNo = recipeNo;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public String getRecipeName() {
		return recipeName;
	}
	public void setRecipeName(String recipeName) {
		this.recipeName = recipeName;
	}
	public String getIntro() {
		return intro;
	}
	public void setIntro(String intro) {
		this.intro = intro;
	}
	public JsonArray getRepresentImages() {
		return representImages;
	}
	public void setRepresentImages(JsonArray representImages) {
		this.representImages = representImages;
	}
	public JsonArray getMaterials() {
		return materials;
	}
	public void setMaterials(JsonArray materials) {
		this.materials = materials;
	}
	public JsonArray getRecipeProcedure() {
		return recipeProcedure;
	}
	public void setRecipeProcedure(JsonArray recipeProcedure) {
		this.recipeProcedure = recipeProcedure;
	}
	public int getCookTime() {
		return cookTime;
	}
	public void setCookTime(int cookTime) {
		this.cookTime = cookTime;
	}
	public int getPortion() {
		return portion;
	}
	public void setPortion(int portion) {
		this.portion = portion;
	}
	public Date getRecipeDate() {
		return recipeDate;
	}
	public void setRecipeDate(Date recipeDate) {
		this.recipeDate = recipeDate;
	}
	public int getHits() {
		return hits;
	}
	public void setHits(int hits) {
		this.hits = hits;
	}
	public int getRegiStatus() {
		return regiStatus;
	}
	public void setRegiStatus(int regiStatus) {
		this.regiStatus = regiStatus;
	}
	public int getGradePoint() {
		return gradePoint;
	}
	public void setGradePoint(int gradePoint) {
		this.gradePoint = gradePoint;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Date getLikeDate() {
		return likeDate;
	}
	public void setLikeDate(Date likeDate) {
		this.likeDate = likeDate;
	}
	public int getLikeUser() {
		return likeUser;
	}
	public void setLikeUser(int likeUser) {
		this.likeUser = likeUser;
	}
	public int getCountLike() {
		return countLike;
	}
	public void setCountLike(int countLike) {
		this.countLike = countLike;
	}
	
	@Override
	public String toString() {
		return "Recipe [recipeNo=" + recipeNo + ", userNo=" + userNo + ", recipeName=" + recipeName + ", intro=" + intro
				+ ", representImages=" + representImages + ", materials=" + materials + ", recipeProcedure="
				+ recipeProcedure + ", cookTime=" + cookTime + ", portion=" + portion + ", recipeDate=" + recipeDate
				+ ", hits=" + hits + ", regiStatus=" + regiStatus + ", gradePoint=" + gradePoint + ", user=" + user
				+ ", likeDate=" + likeDate + ", likeUser=" + likeUser + ", countLike=" + countLike + "]";
	}
}