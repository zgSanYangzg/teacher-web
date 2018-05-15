package com.wfj.controller;

import com.jfinal.core.Controller;

/**
 * Created by adminstrator on 2016/8/12 18:13.
 * description
 */
public class UserController extends Controller {
    /**
     * @Author: adminstrator
     * @Date: 2016/8/12 16:26
     * @Title: 员工管理
     * @Description:
     */
    public void userList(){
        renderJsp("sysmanage/user/userList.jsp");
    }

    public void userAdd(){
        renderJsp("sysmanage/user/userAdd.jsp");
    }

    public void userEdit(){
        setAttr("id", getPara("id"));
        setAttr("row",getPara("row"));
        renderJsp("sysmanage/user/userEdit.jsp");
    }

}
