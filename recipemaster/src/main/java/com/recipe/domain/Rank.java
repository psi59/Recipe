package com.recipe.domain;

public class Rank {
	private User user;
	private Recipe recipe;
	private int recipeCount;
	private int subsCount;
	private int likeCount;
	private int scrapCount;
	private int countLike;
	private int countScrap;
	private int rownum;
	private int totalPoint;
	private String grade;
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public Recipe getRecipe() {
		return recipe;
	}
	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
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
	public int getLikeCount() {
		return likeCount;
	}
	public void setLikeCount(int likeCount) {
		this.likeCount = likeCount;
	}
	public int getScrapCount() {
		return scrapCount;
	}
	public void setScrapCount(int scrapCount) {
		this.scrapCount = scrapCount;
	}
	public int getCountLike() {
		return countLike;
	}
	public void setCountLike(int countLike) {
		this.countLike = countLike;
	}
	public int getCountScrap() {
		return countScrap;
	}
	public void setCountScrap(int countScrap) {
		this.countScrap = countScrap;
	}
	public int getRownum() {
		return rownum;
	}
	public void setRownum(int rownum) {
		this.rownum = rownum;
	}
	public int getTotalPoint() {
		return totalPoint;
	}
	public void setTotalPoint(int totalPoint) {
		this.totalPoint = totalPoint;
	}
	public String getGrade() {
		return grade;
	}
	public void setGrade(String grade) {
		this.grade = grade;
	}
	
	@Override
	public String toString() {
		return "Rank [user=" + user + ", recipe=" + recipe + ", recipeCount=" + recipeCount + ", subsCount=" + subsCount
				+ ", likeCount=" + likeCount + ", scrapCount=" + scrapCount + ", countLike=" + countLike
				+ ", countScrap=" + countScrap + ", rownum=" + rownum + ", totalPoint=" + totalPoint + ", grade="
				+ grade + "]";
	}
}
