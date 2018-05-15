package com.wfj.util;

import com.wfj.model.ResponseModel;

/**
 * <pre>
 *  File: ResponseUtil.java
 * </pre>
 */
public class ResponseUtil
{
	private static int STATUS_SUCCESS = 200;
	private static String MESSAGE_SUCCESS = "成功!";
	
	private static int STATUS_NOTFOUND = 404;
	private static String MESSAGE_NOTFOUND = "没有找到指定数据";
	
	private static int STATUS_ERROR = 500;
	private static String MESSAGE_ERROR = "服务器内部错误";
	
	public static ResponseModel success(Object result){
		ResponseModel response = new ResponseModel();
		response.setStatus(STATUS_SUCCESS);
		response.setMessage(MESSAGE_SUCCESS);
		response.setResult(result);
		return response;
	}
	
	public static ResponseModel notFound(){
		ResponseModel response = new ResponseModel();
		response.setStatus(STATUS_NOTFOUND);
		response.setMessage(MESSAGE_NOTFOUND);
		return response;
	}

	public static ResponseModel error(ResponseModel response){
		response.setStatus(STATUS_ERROR);
		/*response.setMessage(MESSAGE_ERROR);*/
		return response;
	}
	

	
}

/*
*$Log: av-env.bat,v $
*/