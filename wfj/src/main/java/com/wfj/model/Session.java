package com.wfj.model;

/**
 * Created by adminstrator on 15-1-6.
 */
/**
 * <pre>
 *
 *  File: LoginModel.java
 *
 *  Copyright (C): 2014
 *
 *  Description:
 *  TODO
 *
 *  Notes:
 * 	$Id: LoginModel.java 72642 2009-01-01 20:01:57Z adminstrator $
 *
 *  Revision History
 *  &lt;Date&gt;,			&lt;Who&gt;,			&lt;What&gt;
 *  2014年12月5日		yangbochao		Initial.
 *
 * </pre>
 */
public class Session
{

    private String remember;

    private String token;

    private String expire;

    public Session()
    {

    }

    public Session(String agency, String userId, String password, String remember, String product, String token,
                   String expire, String traceId)
    {
        super();

        this.remember = remember;

        this.token = token;
        this.expire = expire;

    }

    public String getRemember()
    {
        return remember;
    }

    public void setRemember(String remember)
    {
        this.remember = remember;
    }

    public String getToken()
    {
        return token;
    }

    public void setToken(String token)
    {
        this.token = token;
    }

    public String getExpire()
    {
        return expire;
    }

    public void setExpire(String expire)
    {
        this.expire = expire;
    }

}

/*
 * $Log: av-env.bat,v $
 */
