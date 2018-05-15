package com.wfj.controller;

import com.jfinal.core.Controller;

/**
 *
 * description
 */
public class PeopleController extends Controller {

    public PeopleController()
    {
        System.out.print("controller success");
    }
    public void peopleList(){
        System.out.print("succ");
        renderJsp("human/people/peopleList.jsp");
    }

    public void peopleAdd(){
        renderJsp("human/people/peopleAdd.jsp");
    }

    public void peopleEdit(){
        setAttr("userId", getPara("userId"));
        renderJsp("human/people/peopleEdit.jsp");
    }

}
