package com.wfj.util;

import com.jfinal.render.Render;
import com.jfinal.render.RenderException;

import java.io.IOException;
import java.io.PrintWriter;

/**
 * <pre>
 * 
 *  File: SmartJsonRender.java
 * 
 *  Copyright (C): 2016
 * 
 *  Description:
 *  TODO
 * 
 *  Notes:
 * 	$Id: SmartJsonRender.java 72642 2009-01-01 20:01:57Z  $
 * 
 *  Revision History
 *  &lt;Date&gt;,			&lt;Who&gt;,			&lt;What&gt;
 *  2016年2月25日			Initial.
 *  
 * </pre>
 */
public class SmartErrorRender extends Render{

	private int errorCode;
	private String errorMsg;
	
	public int getErrorCode() {
		return errorCode;
	}
	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMsg() {
		return errorMsg;
	}
	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	public SmartErrorRender(int errotCode,String errorMsg) {
		this.errorCode = errotCode;
		this.errorMsg = errorMsg;
	}
	
	@Override
	public void render() {
		response.setStatus(getErrorCode());
		PrintWriter writer = null;
		try {
			response.setContentType("application/json; charset=" + getEncoding());
	        writer = response.getWriter();
	        writer.write(this.getErrorMsg());
	        writer.flush();
		} catch (IOException e) {
			throw new RenderException(e);
		}
		finally {
			if (writer != null)
				writer.close();
		}
	}
	
}

/*
*$Log: av-env.bat,v $
*/