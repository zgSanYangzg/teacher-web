package com.wfj.service;

import com.jfinal.weixin.sdk.utils.JsonUtils;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Map;

/**
 * <pre>
 * 
 *  File: FreeApisResult.java
 * 
 *  ttm, Inc.
 *  Copyright (C): 2016
 * 
 *  TODO
 *
 *  Notes:
 * 	$Id: FreeApisResult.java 72642 2009-01-01 20:01:57Z  $
 *
 *  Revision History
 *  &lt;Date&gt;,			&lt;Who&gt;,			&lt;What&gt;
 * </pre>
 */
public class FreeApisResult {
	
	private Map<String, Object> attrs;
	private String json;
	
	@SuppressWarnings("unchecked")
	public FreeApisResult(String jsonStr) {
		this.json = jsonStr;
		try {
			Map<String, Object> temp = JsonUtils.parse(jsonStr, Map.class);
			this.attrs = temp;
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	public static FreeApisResult create(String jsonStr) {
		return new FreeApisResult(jsonStr);
	}
	
	public String getJson() {
		return json;
	}
	
	public String toString() {
		return getJson();
	}
	
	public boolean isSucceed() {
		return getInt("status") == 200;
	}
	
	public Integer getErrorCode() {
		return getInt("errcode");
	}
	
	public String getErrorMsg() {
		return getStr("message");
	}
	
	@SuppressWarnings("unchecked")
	public <T> T get(String name) {
		return (T)attrs.get(name);
	}
	
	public String getStr(String name) {
		return (String)attrs.get(name);
	}
	
	public Integer getInt(String name) {
		Number number = (Number) attrs.get(name);
		return number == null ? null : number.intValue();
	}
	
	public Long getLong(String name) {
		Number number = (Number) attrs.get(name);
		return number == null ? null : number.longValue();
	}
	
	public BigInteger getBigInteger(String name) {
		return (BigInteger)attrs.get(name);
	}
	
	public Double getDouble(String name) {
		return (Double)attrs.get(name);
	}
	
	public BigDecimal getBigDecimal(String name) {
		return (BigDecimal)attrs.get(name);
	}
	
	public Boolean getBoolean(String name) {
		return (Boolean)attrs.get(name);
	}
	
	@SuppressWarnings("rawtypes")
	public List getList(String name) {
		return (List)attrs.get(name);
	}
	
	@SuppressWarnings("rawtypes")
	public Map getMap(String name) {
		return (Map)attrs.get(name);
	}
}

/*
*$Log: av-env.bat,v $
*/