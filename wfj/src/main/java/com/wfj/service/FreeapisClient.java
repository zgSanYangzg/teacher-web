package com.wfj.service;

import java.io.IOException;
import java.util.HashMap;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.kit.PropKit;
import com.wfj.support.SpringContextHelper;

/**
 * <pre>
 * 
 *  File: FreeApis.java
 * 
 *  Copyright (C): 2016
 * 
 *  Description:
 *  TODO
 * 
 *  Notes:
 *  $Id: FreeApis.java 31101200-9 2014-10-14 16:43:51Z  $
 * 
 *  Revision History
 *  &lt;Date&gt;,			&lt;Who&gt;,			&lt;What&gt;
 *  2016年9月6日		adminstrator		Initial.
 *
 * </pre>
 */
public class FreeapisClient {
	
	private static final RestTemplate restTemplate = (RestTemplate) SpringContextHelper.getBean("restTemplate");
	
	protected static JSONObject execute(String url, HttpMethod httpMethod, Object reqeustBody, String token)
			throws RestClientException, IOException {
		ResponseEntity<String> responseEntity = restTemplate.exchange(url, httpMethod,
				buildHttpEntity(httpMethod, reqeustBody, token), String.class, new HashMap<>());
		return JSONObject.parseObject(responseEntity.getBody());
	}
	
	private static HttpHeaders buildHttpHeaders(String token){
		HttpHeaders requestHeader = new HttpHeaders();
		requestHeader.set("Content-Type", "application/json;charset=utf-8");
		requestHeader.set("product", "UNKNOWN");
		requestHeader.set("token", token);
		return requestHeader;
	}
	
	private static HttpEntity<Object> buildHttpEntity(HttpMethod httpMethod,Object requestBody,String token) throws IOException{
		HttpEntity<Object> httpEntity = null;
		switch(httpMethod){
			case DELETE : 
			case POST : 
			case PUT : 	
				httpEntity = new HttpEntity<Object>(requestBody, buildHttpHeaders(token));
				break;
			case GET : 
				httpEntity = new HttpEntity<Object>(buildHttpHeaders(token));
				break;
			default:
				httpEntity = null;
				break;
		}
		return httpEntity;
	}
	
	public static String getFreeApisToken() throws Exception{
		JSONObject authJson = new JSONObject();
		authJson.put("agency","");
		authJson.put("password","");
		authJson.put("loginId","");
		JSONObject responseJson = null;
		try {
			responseJson = execute(PropKit.get("freeapisCGI") + "apis/1/authentication/anonymous", HttpMethod.POST,authJson.toJSONString(), null);
		} catch (RestClientException | IOException e) {
			e.printStackTrace();
		}
		return responseJson.getJSONObject("result").getString("token");
	}
}

/*
*$Log: av-env.bat,v $
*/