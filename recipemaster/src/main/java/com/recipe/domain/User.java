package com.recipe.domain;

import java.util.Date;

public class User {
  
  //Constructor
  public User() {  
  }
  
  private int userNo;
  private String userName;
  private String email;
  private String password;
  private String image;
  private String intro;
  private String role;
  private Date joinDate;
  private String recipeUrl;
  private int recipeCount;
  private int subsCount;
  
  public int getUserNo() {
    return userNo;
  }
  public void setUserNo(int userNo) {
    this.userNo = userNo;
  }
  public String getUserName() {
    return userName;
  }
  public void setUserName(String userName) {
    this.userName = userName;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getPassword() {
    return password;
  }
  public void setPassword(String password) {
    this.password = password;
  }
  public String getImage() {
    return image;
  }
  public void setImage(String image) {
    this.image = image;
  }
  public String getIntro() {
    return intro;
  }
  public void setIntro(String intro) {
    this.intro = intro;
  }
  public String getRole() {
    return role;
  }
  public void setRole(String role) {
    this.role = role;
  }
  public Date getJoinDate() {
    return joinDate;
  }
  public void setJoinDate(Date joinDate) {
    this.joinDate = joinDate;
  }
  public String getRecipeUrl() {
    return recipeUrl;
  }
  public void setRecipeUrl(String recipeUrl) {
    this.recipeUrl = recipeUrl;
  }
  public int getRecipeCount() {
    return recipeCount;
  }
  public void setRecipeCount(int recipeCount) {
    this.recipeCount = recipeCount;
  }
  public int getSubsCount() {
    return subsCount;
  }
  public void setSubsCount(int subsCount) {
    this.subsCount = subsCount;
  }
  
  @Override
  public String toString() {
    return "User [userNo=" + userNo + ", userName=" + userName + ", email=" + email + ", password=" + password
        + ", image=" + image + ", intro=" + intro + ", role=" + role + ", joinDate=" + joinDate + ", recipeUrl="
        + recipeUrl + ", recipeCount=" + recipeCount + ", subsCount=" + subsCount + "]";
  }      
}
