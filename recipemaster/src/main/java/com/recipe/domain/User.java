package com.recipe.domain;

import java.util.Date;

public class User {
    
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
  private int likeCount;
  private int rownum;
  private int totalPoint;
  private int subscribeUser; //구독한놈
  
  //Constructor
  public User() {  
  }
    
  public int getSubscribeUser() {
    return subscribeUser;
  }
  public void setSubscribeUser(int subscribeUser) {
    this.subscribeUser = subscribeUser;
  }
  
  public int getTotalPoint() {
    return totalPoint;
  }
  public void setTotalPoint(int totalPoint) {
    this.totalPoint = totalPoint;
  }
  public int getLikeCount() {
    return likeCount;
  }
  public void setLikeCount(int likeCount) {
    this.likeCount = likeCount;
  }
  public int getRownum() {
    return rownum;
  }
  public void setRownum(int rownum) {
    this.rownum = rownum;
  }
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
        + recipeUrl + ", recipeCount=" + recipeCount + ", subsCount=" + subsCount + ", likeCount=" + likeCount
        + ", rownum=" + rownum + ", totalPoint=" + totalPoint + ", subscribeUser=" + subscribeUser + "]";
  }  
}
