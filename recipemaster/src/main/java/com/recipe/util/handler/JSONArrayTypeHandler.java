package com.recipe.util.handler;

import com.alibaba.fastjson.JSONArray;

public class JSONArrayTypeHandler extends JSONTypeHandler<JSONArray> { 
	 
    public JSONArrayTypeHandler(Class<JSONArray> type) { 
        super(type); 
    } 
 
    @Override 
    protected JSONArray parseJSONString(String jsonString) { 
        return JSONArray.parseArray(jsonString); 
    } 
 
}