package com.wfj.controller;

import com.jfinal.core.Controller;

/**
 * Created by adminstrator on 2016/8/12 18:13.
 * description
 */
public class DeptController extends Controller {
    /**
     * @Author: adminstrator
     * @Date: 2016/8/12 16:26
     * @Title: 部门管理
     * @Description:
     */
    public void deptList(){
        renderJsp("sysmanage/dept/deptList.jsp");
    }

    public void deptAdd(){
        setAttr("pid",getPara("pid"));
        setAttr("level",getPara("level"));
        renderJsp("sysmanage/dept/deptAdd.jsp");
    }

    public void deptEdit() {
        setAttr("id", getPara("id"));
        setAttr("row", getPara("row"));
        renderJsp("sysmanage/dept/deptEdit.jsp");
    }
}
