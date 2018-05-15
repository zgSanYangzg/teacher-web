package com.wfj.support;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.MultipartResolver;

import javax.servlet.http.HttpServletRequest;

/**
 * <pre>
 *
 *  File: MultipartInterceptor.java
 *
 *  Copyright (C): 2016
 *
 *  Description:拦截文件上传,只能用于FreeApisController
 *  TODO
 *
 *  Notes:
 *  $Id: MultipartInterceptor.java 31101200-9 2014-10-14 16:43:51Z  $
 *
 *  Revision History
 *  &lt;Date&gt;,			&lt;Who&gt;,			&lt;What&gt;
 *  2016年2月25日			Initial.
 *
 * </pre>\
 */
public class MultipartInterceptor implements Interceptor {

    private final Log logger = LogFactory.getLog(getClass());

    @Override
    public void intercept(Invocation inv) {
        Controller currentController = inv.getController();
        MultipartResolver multipartResolver = (MultipartResolver) SpringContextHelper.getBean("filterMultipartResolver");
        HttpServletRequest processedRequest = currentController.getRequest();

        if (multipartResolver.isMultipart(processedRequest)) {
            if (logger.isDebugEnabled()) {
                logger.debug("Resolving multipart request [" + processedRequest.getRequestURI() +
                        "] with MultipartFilter");
            }
            processedRequest = multipartResolver.resolveMultipart(processedRequest);
        } else {
            if (logger.isDebugEnabled()) {
                logger.debug("Request [" + processedRequest.getRequestURI() + "] is not a multipart request");
            }
        }

        try {
            currentController.setHttpServletRequest(processedRequest);
            inv.invoke();
        } finally {
            if (processedRequest instanceof MultipartHttpServletRequest) {
                multipartResolver.cleanupMultipart((MultipartHttpServletRequest) processedRequest);
            }
        }
    }

}

/*
*$Log: av-env.bat,v $
*/