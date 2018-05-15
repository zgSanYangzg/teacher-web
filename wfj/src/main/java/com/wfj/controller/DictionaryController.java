package com.wfj.controller;

import com.jfinal.core.Controller;

/**
 * Created by adminstrator on 2016/8/12 18:13.
 * description
 */
public class DictionaryController extends Controller {
    /**
     * @Author: adminstrator
     * @Date: 2016/8/12 16:26
     * @Title: 字典表管理
     * @Description:
     */
    public void dictionary(){
        renderJsp("sysmanage/dictionary/dictionaryList.jsp");
    }

    public void dictionaryAdd(){
        renderJsp("sysmanage/dictionary/dictionaryAdd.jsp");
    }

    public void dicvalAdd(){
        setAttr("id",getPara("id"));
        renderJsp("sysmanage/dictionary/dicValAdd.jsp");
    }

    public void dictionaryEdit(){
        setAttr("id",getPara("id"));
        setAttr("row",getPara("row"));
        renderJsp("sysmanage/dictionary/dictionaryEdit.jsp");
    }
}
