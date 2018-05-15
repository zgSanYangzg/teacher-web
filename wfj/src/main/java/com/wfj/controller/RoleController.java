package com.wfj.controller;

import com.jfinal.core.Controller;

/**
 * Created by adminstrator on 2016/8/12 18:12.
 * description
 */
public class RoleController extends Controller {
    /**
     * @Author: adminstrator
     * @Date: 2016/8/12 16:25
     * @Title: 角色管理
     * @Description:
     */
    public void role(){
        renderJsp("sysmanage/role/roleList.jsp");
    }

    public void roleAdd(){
        renderJsp("sysmanage/role/roleAdd.jsp");
    }

    public void roleEdit(){
        setAttr("id", getPara("id"));
        setAttr("row",getPara("row"));
        renderJsp("sysmanage/role/roleEdit.jsp");
    }

}
