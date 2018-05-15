package com.wfj.support;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * <pre>
 * 
 *  File: SpringContextHelper.java
 *
 *  Copyright (C): 2015
 * 
 *  Description:
 *  TODO
 * 
 *  Notes:
 *  $Id: SpringContextHelper.java 31101200-9 2014-10-14 16:43:51Z  $
 * 
 *  Revision History
 *  &lt;Date&gt;,			&lt;Who&gt;,			&lt;What&gt;
 *  2015年8月7日			Initial.
 *
 * </pre>
 */
public class SpringContextHelper implements ApplicationContextAware
{
	private static ApplicationContext context = null;

	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException
	{
		this.context = applicationContext;
	}

	public static Object getBean(String name)
	{
		return context.getBean(name);
	}

}

/*
 * $Log: av-env.bat,v $
 */