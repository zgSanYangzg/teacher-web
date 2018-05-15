package com.wfj.controller;


import com.jfinal.core.ActionKey;
import com.jfinal.core.Controller;
import com.wfj.model.Session;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;

/**
 * Created by adminstrator on 2016/8/12 15:36.
 * description
 */
public class DefaultController extends Controller {


    @ActionKey("/page/login")
    public void login(){
        Session session = new Session();
        session = (Session) this.filling(getRequest(), session);

        if(session.getToken()==null||session.getToken().equals(""))
        {
            renderJsp("smartadmin/login.jsp");
        }else{
            setAttr("token", session.getToken());
            setAttr("expire", session.getExpire());
            setAttr("agencyCode", getPara("agency"));
            setAttr("userId", getPara("userId"));
            setAttr("userName", getPara("userName"));
            setAttr("messageCount", getPara("messageCount"));
            /*redirect("index");*/
            renderJsp("smartadmin/index.jsp");
        }
    }

    public void index(){
        Session session = new Session();
        session = (Session) this.filling(getRequest(), session);
     /*   if(session.getToken()==null||session.getToken().equals(""))
        {
            renderJsp("smartadmin/login.jsp");
        }else{*/
            setAttr("token", session.getToken());
            setAttr("expire", session.getExpire());
            setCookie("token", session.getToken(),7*24*60*60,this.getRequest().getContextPath());
            setAttr("agencyCode", getPara("agency"));
            setAttr("userId", getPara("userId"));
            setAttr("userName", getPara("userName"));
            setAttr("messageCount", getPara("messageCount"));
            renderJsp("smartadmin/index.jsp");
      //  }
    }

    @ActionKey("/page/logout")
    public void logout(){
        renderJsp("smartadmin/login.jsp");
    }

    /**
         * @Author: adminstrator
         * @Date: 2016/8/12 16:14
         * @Title: 忘记密码
         * @Description:
         */
    @ActionKey("/page/forgotpassword")
    public void forgotpassword(){
        renderJsp("smartadmin/forgotpassword.jsp");
    }

    /**
         * @Author: adminstrator
         * @Date: 2016/8/12 16:14
         * @Title: 重置密码
         * @Description:
         */
    @ActionKey("/page/resetpass")
    public void resetpass(){
        setAttr("id",getPara("id"));
        setAttr("agencyCode",getPara("agencyCode"));
        renderJsp("smartadmin/resetpass.jsp");
    }

    public Object filling(HttpServletRequest request, Object obj)
    {
        Field[] field = obj.getClass().getDeclaredFields();

        for (Field f : field)
        {
            String fieldName = f.getName();
            String paramValue = request.getParameter(fieldName);
            if (paramValue != null && !"".equals(paramValue))
            {

                String first = fieldName.substring(0, 1).toUpperCase();
                String rest = fieldName.substring(1, fieldName.length());
                String newStr = new StringBuffer(first).append(rest).toString();
                try
                {
                    obj.getClass().getDeclaredMethod("set" + newStr, String.class).invoke(obj, paramValue);
                }
                catch (Exception e)
                {
                }
            }
        }
        return obj;
    }
}
