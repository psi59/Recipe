package com.recipe.domain;

public class Search {
  private String searchKeyword; //검색어
  private String searchCondition; //검색조건
  private String sortCondition; //정렬조건
  
  public String getSearchKeyword() {
    return searchKeyword;
  }
  public void setSearchKeyword(String searchKeyword) {
    this.searchKeyword = searchKeyword;
  }
  public String getSearchCondition() {
    return searchCondition;
  }
  public void setSearchCondition(String searchCondition) {
    this.searchCondition = searchCondition;
  }
  public String getSortCondition() {
    return sortCondition;
  }
  public void setSortCondition(String sortCondition) {
    this.sortCondition = sortCondition;
  }
  
  @Override
  public String toString() {
    return "Search [searchKeyword=" + searchKeyword + ", searchCondition=" + searchCondition + ", sortCondition="
        + sortCondition + "]";
  }  
}
