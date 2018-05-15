package com.wfj.support;

import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpUriRequest;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;

import java.net.URI;

/**
 * 自定义的httpclient请求生成策略
 *
 */
public class CustomHttpComponentsClientHttpRequestFactory extends HttpComponentsClientHttpRequestFactory{
	
	public CustomHttpComponentsClientHttpRequestFactory(HttpClient httpClient){
		super(httpClient);
	}
	
	@Override  
    protected HttpUriRequest createHttpUriRequest(HttpMethod httpMethod, URI uri) {  
        if (HttpMethod.DELETE == httpMethod) {  
            return new HttpEntityEnclosingDeleteRequest(uri);  
        }  
        return super.createHttpUriRequest(httpMethod, uri);  
    }  
}
