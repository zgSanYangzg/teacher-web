package com.wfj.model;

import java.io.Serializable;

/**
 * <pre>
 * 
 *  File: ResponseModel.java
 *  Description:
 *  TODO
 * 
 *  Notes:
 * 	$Id: ResponseModel.java 72642$
 * 
 *  Revision History
 * </pre>
 */
public class ResponseModel implements Serializable
{
	/**
	 * Comment for &lt;code&gt;serialVersionUID&lt;/code&gt;
	 */
	private static final long serialVersionUID = -1241360949457314497L;

	private int status;

	private Object result;
	
	private String message;
	
	
	public String getMessage()
	{
		return message;
	}

	public void setMessage(String message)
	{
		this.message = message;
	}

	public int getStatus()
	{
		return status;
	}

	public void setStatus(int status)
	{
		this.status = status;
	}

	public Object getResult()
	{
		return result;
	}

	public void setResult(Object result)
	{
		this.result = result;
	}

	@Override
	public String toString()
	{
		return "ResponseModel [status=" + status + ", result=" + result + ", message="
				+ message + "]";
	}
	
}

/*
*$Log: av-env.bat,v $
*/