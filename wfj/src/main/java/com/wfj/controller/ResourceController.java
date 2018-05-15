package com.wfj.controller;


import com.jfinal.core.Controller;

/**
 * Created by adminstrator on 2016/8/12 16:17.
 * description
 */
public class ResourceController extends Controller {
    /**
     * @Author: adminstrator
     * @Date: 2016/8/12 16:26
     */
    public void resource(){
        renderJsp("sysmanage/resource/resource.jsp");
    }
}
