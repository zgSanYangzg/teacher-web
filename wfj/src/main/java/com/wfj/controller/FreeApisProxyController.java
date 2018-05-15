package com.wfj.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletInputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.wfj.support.MultipartInterceptor;
import com.wfj.support.SpringContextHelper;
import com.wfj.util.SmartErrorRender;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.kit.PropKit;
/**
 * <pre>
 *
 *  File: FreeApisProxyController.java
 *
 *  Copyright (C): 2016
 *
 *  Description:freeapis的代理controller,凡是apis/1/格式的请求都转发到freeapis
 *  TODO
 *
 *  Notes:
 *  $Id: FreeApisProxyController.java 31101200-9 2014-10-14 16:43:51Z adminstrator $
 *
 *  Revision History
 *  &lt;Date&gt;,			&lt;Who&gt;,			&lt;What&gt;
 *  2016年2月25日		adminstrator		Initial.
 *
 * </pre>
 */
public class FreeApisProxyController extends Controller {

	private final RestTemplate restTemplate = (RestTemplate) SpringContextHelper.getBean("restTemplate");

	@Before(MultipartInterceptor.class)
	public void index() throws IOException {
		this.doRestRequest(this.determineHttpMethod(), this.getRequest(),this.getResponse());
	}

	private void doRestRequest(HttpMethod httpMethod,HttpServletRequest request,HttpServletResponse response) throws IOException{
		try {
			ResponseEntity<String> responseEntity = restTemplate.exchange(this.buildProxyUrl(request),
					httpMethod,
					this.buildHttpEntity(httpMethod, request),
					String.class,
					new HashMap<>());

			HttpHeaders headers = responseEntity.getHeaders();
			/**
			 * ResponseHeader Transfer-Encoding,用来标示当响应报文的长度不确定时,
			 * 即Content-Length无法确定时,就会采用Chunked编码动态的提供body的内容长度,
			 * 常用于http传送过程中的分块技术.一般rest api用不到此值,返回的都是定长的Content-Length,
			 * 所以当头信息中有Transfer-Encoding:chunked时,客户端就会一直等待chunked数据块,直到传送完毕,
			 */
			for (Map.Entry<String, List<String>> entry : headers.entrySet()) {
				if(!response.containsHeader(entry.getKey()) && !"Transfer-Encoding".equals(entry.getKey())){
					response.setHeader(entry.getKey(), entry.getValue().get(0));
				}
			}
			renderJson(responseEntity.getBody());
		} catch (Exception e) {
			e.printStackTrace();
			if(e instanceof HttpClientErrorException){
				render(new SmartErrorRender(((HttpClientErrorException) e).getStatusCode().value(),
						((HttpClientErrorException) e).getResponseBodyAsString()));
			}else if(e instanceof HttpServerErrorException){
				render(new SmartErrorRender(((HttpServerErrorException) e).getStatusCode().value(),
						((HttpServerErrorException) e).getResponseBodyAsString()));
			}
		}
	}

	private HttpMethod determineHttpMethod() {
		String httpMethodStr = this.getRequest().getMethod();
		HttpMethod result = null;
		switch (httpMethodStr) {
			case "GET":
				result = HttpMethod.GET;
				break;
			case "POST":
				result = HttpMethod.POST;
				break;
			case "PUT":
				result = HttpMethod.PUT;
				break;
			case "DELETE":
				result = HttpMethod.DELETE;
				break;
		}
		return result;
	}

	private HttpHeaders buildHttpHeaders(HttpServletRequest request){
		String proxyHeaderNames = PropKit.get("proxyHeaderNames").toLowerCase();
		HttpHeaders requestHeader = new HttpHeaders();
		Enumeration<String> headerNames = request.getHeaderNames();
		String currentHeaderName = null;
		while(headerNames.hasMoreElements()){
			currentHeaderName = headerNames.nextElement();
			if(proxyHeaderNames.indexOf(currentHeaderName.toLowerCase()) > -1)
				requestHeader.set(currentHeaderName, request.getHeader(currentHeaderName));
		}
		return requestHeader;
	}

	private HttpEntity<Object> buildHttpEntity(HttpMethod httpMethod,HttpServletRequest request) throws IOException{

		HttpEntity<Object> httpEntity = null;
		switch(httpMethod){
			case DELETE :
			case POST :
			case PUT :
				if(request instanceof MultipartHttpServletRequest){
					httpEntity = new HttpEntity<Object>(this.buildMultiRequestBody(request), this.buildHttpHeaders(request));
				}else{
					httpEntity = new HttpEntity<Object>(this.buildCommonRequestBody(request), this.buildHttpHeaders(request));
				}
				break;
			case GET :
				httpEntity = new HttpEntity<Object>(this.buildHttpHeaders(request));
				break;
			default:
				httpEntity = null;
				break;
		}
		return httpEntity;
	}

	private String buildCommonRequestBody(HttpServletRequest request) throws IOException {
		ServletInputStream servletInputStream = request.getInputStream();
		BufferedReader bf = new BufferedReader(new InputStreamReader(servletInputStream, "UTF-8"));
		StringBuffer buffer = new StringBuffer();
		String line = "";
		while ((line = bf.readLine()) != null) {
			buffer.append(line);
		}
		return buffer.toString();
	}

	private MultiValueMap<String,Object> buildMultiRequestBody(HttpServletRequest request) throws IllegalStateException, IOException{
		MultiValueMap<String, Object> parts = new LinkedMultiValueMap<String, Object>();

		MultiValueMap<String, MultipartFile> multiValueMap = ((MultipartHttpServletRequest) request).getMultiFileMap();
		Map<String, String[]> multiParamMap = (Map<String, String[]>) request.getParameterMap();

		List<MultipartFile> currentMultipartFiles = null;
		List<String> currentMultiParams = null;

		for(String key : multiValueMap.keySet()){
			currentMultipartFiles = multiValueMap.get(key);
			for(MultipartFile multipart : currentMultipartFiles){
				parts.add(key, new ByteArrayResource(multipart.getBytes()));
			}
		}

		for(String key : multiParamMap.keySet()){
			currentMultiParams = Arrays.asList(multiParamMap.get(key));
			for(String param : currentMultiParams){
				parts.add(key, param);
			}
		}
		return parts;
	}

	private String buildProxyUrl(HttpServletRequest request) throws UnsupportedEncodingException{
		String proxyUrl = this.getPara().replaceAll("@", "/");
		String queryString = request.getQueryString();
		proxyUrl = PropKit.get("freeapisCGI") + proxyUrl + "?" + queryString;
		return URLDecoder.decode(proxyUrl, "utf-8");
	}
}

/*
 * $Log: av-env.bat,v $
 */