package com.wfj.support;

import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;

import java.net.URI;

/**
 * 解决了restTemplate执行DELETE方法时传递请求体无效的问题
 */
public class HttpEntityEnclosingDeleteRequest extends HttpEntityEnclosingRequestBase {  
	   
    public HttpEntityEnclosingDeleteRequest(final URI uri) {  
        super();  
        setURI(uri);  
    }  
   
    @Override  
    public String getMethod() {  
        return "DELETE";  
    }  
}  
