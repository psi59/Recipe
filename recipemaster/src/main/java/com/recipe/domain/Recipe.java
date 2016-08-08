package com.recipe.domain;

import java.util.Date;

public class Recipe {
  
  private int recipeNo;
  private int userNo;
  private String recipeName;
  private String intro;
  private int cookTime;
  private int portion;
  private Date recipeDate;
  private int hits;
  private int regiStatus;
  private int gradePoint;
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
  @Override
  public String toString() {
    return "Recipe [recipeNo=" + recipeNo + ", userNo=" + userNo + ", recipeName=" + recipeName + ", intro=" + intro
        + ", cookTime=" + cookTime + ", portion=" + portion + ", recipeDate=" + recipeDate + ", hits=" + hits
        + ", regiStatus=" + regiStatus + ", gradePoint=" + gradePoint + "]";
  }
 
}