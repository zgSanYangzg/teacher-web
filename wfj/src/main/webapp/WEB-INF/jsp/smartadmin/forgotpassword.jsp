<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@include file="/includes/public.jsp" %>

<!DOCTYPE html>
<!--[if IE 7 ]> <html class="no-js ie ie7 lte7 lte8 lte9" lang="zh-cmn-Hans-CN"> <![endif]-->
<!--[if IE 8 ]> <html class="no-js ie ie8 lte8 lte9" lang="zh-cmn-Hans-CN"> <![endif]-->
<!--[if IE 9 ]> <html class="no-js ie ie9 lte9>" lang="zh-cmn-Hans-CN"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->

<%--<html lang="en">--%>
<html class="no-js" lang="zh-cmn-Hans-CN"><!--<![endif]-->
<head>
    <title>涂涂猫 - 忘记密码</title>
    <meta name="description" content="">
    <meta name="author" content="">
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <base href='<c:out value="${basePath}"/>'>
    <link rel='icon' href='<c:out value="${basePath}"/>favicon.ico' type='image/x-icon'>
    <link rel='shortcut icon' href='<c:out value="${basePath}"/>favicon.ico' type='image/x-icon'>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <!-- Basic Styles -->
    <link rel="stylesheet" type="text/css" media="screen" href="includes/lib/smartadmin/css/bootstrap.css">
    <link rel="stylesheet" type="text/css" media="screen" href="includes/lib/smartadmin/css/font-awesome.min.css">
    <link rel="stylesheet" type="text/css" media="screen" href="includes/lib/smartadmin/css/smartadmin-production.css">

    <!-- FAVICONS -->
    <link rel="stylesheet" type="text/css" href="includes/lib/smartadmin/css/theme.css">
    <style>
        .bootstrapWizard li {
            width: 32%!important;
        }
    </style>
</head>
<div class="row">
    <div class="text-center error-box">
        <div class="well well-lg padding-10" style="top: 100px;">
                <div id="bootstrap-wizard-pass">
                    <div class="row" style="margin-top: 20px;">
                        <div class="form-bootstrapWizard">
                            <ul class="bootstrapWizard form-wizard">
                                <li class="active"   data-target="#step1">
                                    <a href="#tab1" data-toggle="tab"> <span class="step">1</span> <span class="title">确认账号</span> </a>
                                </li>
                                <li data-target="#step2">
                                    <a href="#tab2" data-toggle="tab"> <span class="step">2</span> <span class="title">安全验证</span> </a>
                                </li>
                                <li data-target="#step3">
                                    <a href="#tab3" data-toggle="tab"> <span class="step">3</span> <span class="title">重置密码</span> </a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <div class="tab-content" style="height: 240px;margin-top:50px">
                        <div class="tab-pane active" id="tab1">
                            <form  id="tabForm1" class="smart-form">
                                <div class="row">
                                    <section class="col col-2"></section>
                                    <section class="col col-6">
                                        <label class="label">请填写需要找回的账号</label>
                                        <label class="input">
                                            <input type="text" name="userId" id="userId">
                                        </label>
                                    </section>
                                </div>
                            </form>
                        </div>
                        <div class="tab-pane" id="tab2">
                            <form id="tabForm2" class="smart-form">
                                <div class="row">
                                    <section class="col col-2"></section>
                                    <section class="col col-6">
                                        <label class="label luserId">您正在找回的账号是&nbsp;</label>
                                    </section>
                                </div>
                                <div class="row">
                                    <section class="col col-2"></section>
                                    <section class="col col-3">
                                        <label class="label phone">您绑定的手机号码</label>
                                        <label class="input">
                                            <input type="hidden" name="phoneNum" id="phoneNum">
                                        </label>
                                    </section>
                                    <section class="col col-2">
                                        <a class="btn btn-info btn-lg" style="border-radius:15px;height:40px;line-height: 20px;margin-top: -20px;" id="userCode" href="javascript:void(0);"><span id='timeClock'>获取验证码</span></a>
                                    </section>
                                </div>
                                <div class="row">
                                    <section class="col col-2"></section>
                                    <section class="col col-6">
                                        <label class="label">手机验证码</label>
                                        <label class="input">
                                            <input type="hidden" name="smsCode" id="smsCode">
                                            <input type="text" name="realCode" id="realCode">
                                        </label>
                                    </section>
                                </div>
                            </form>
                        </div>
                        <div class="tab-pane" id="tab3">
                           <form id="tabForm3" class="smart-form">
                                <div class="row">
                                    <section class="col col-2"></section>
                                    <section class="col col-6">
                                        <label class="label">新密码</label>
                                        <label class="input">
                                            <input type="password" name="newPass" id="newPass">
                                        </label>
                                    </section>
                                </div>
                                <div class="row">
                                    <section class="col col-2"></section>
                                    <section class="col col-6">
                                        <label class="label">确认密码</label>
                                        <label class="input">
                                            <input type="password" name="renewPass" id="renewPass">
                                        </label>
                                    </section>
                                </div>
                            </form>
                            <div id="resetOk" class="row" style="display: none;">
                                <section style="margin-top: 20px;margin-bottom: 20px;">密码修改成功</section>
                                <section><a href="login.do">跳转到登录</a></section>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="height: 35px;">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-8">
                            <ul class="pager wizard no-margin">
                                <li class="last" style="display:none;" >
                                    <a href="javascript:void(0);" id="saveBtn" style="margin-left: 410px;" class="btn btn-lg btn-primary"> 确&nbsp;&nbsp;定</a>
                                </li>
                                <li class="next">
                                    <a href="javascript:void(0);" id="nextBtn" class="btn btn-lg btn-primary"> 下一步 </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="includes/require.js"></script>
<script type="text/javascript">
    require.config({
        paths: {
            "jquery": "includes/lib/jquery/jquery",
            "bootstrap": "includes/lib/smartadmin/js/bootstrap/bootstrap",
            "jquery.validate": "includes/lib/smartadmin/js/plugin/jquery-validate/jquery.validate.min",
            "validate.expand": "includes/lib/smartadmin/js/plugin/jquery-validate/validate.expand",
            "SmartNotification": "includes/lib/smartadmin/js/notification/SmartNotification",
            "jquery.bootstrap.wizard": "includes/lib/smartadmin/js/plugin/bootstrap/jquery.bootstrap.wizard.min",
            "md5-min": "includes/lib/jquery/md5-min",
            "jquery.cookie": "includes/lib/jquery/jquery.cookie",
            "app": "includes/lib/smartadmin/js/app",
            "basetools": "includes/lib/smartadmin/js/basetools"
        },
        shim:{
            "jquery.validate" : ["jquery"],
            "validate.expand":["jquery","jquery.validate"],
            "bootstrap" : ["jquery"],
            "SmartNotification" : ["jquery"],
            "jquery.bootstrap.wizard" : ["jquery","bootstrap"]
        }
    });
    requirejs(['jquery','bootstrap','jquery.validate','validate.expand','SmartNotification','md5-min','jquery.bootstrap.wizard','app'], function ($) {
        var basetools = require("basetools");
        $("form input").val("");
        $(function(){
            $("#tabForm2").validate({
                onkeyup : false,
                rules : {
                    realCode : {
                        required:true,
                        remote:{
                            type:"get",
                            url:"<c:out value="${apiPath}"/>apis@1@sms@check",
                            data:{smsCode:function(){return $("#smsCode").val();},code:function(){return $("#realCode").val();},phoneNo:function(){return $("#phoneNum").val();}},
                            beforeSend: function(XMLHttpRequest) {
                                XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset=utf-8");
                            }
                        }
                    }
                },
                messages : {
                    realCode : {
                        required : " 请输入验证码",
                        remote : ' 验证码不正确'
                    }
                },
                submitHandler : function(form) {
                },
                success: function (label,obj) {label.remove();},
                errorPlacement : function(error, element) {
                    error.insertAfter(element.parent());
                }
            });

            $("#tabForm3").validate({
                rules : {
                    newPass : {
                        required : true,
                        isPassword :true
                    },
                    renewPass : {
                        required:true,
                        equalTo:"#newPass"
                    }
                },
                messages : {
                    newPass : {
                        required : ' 请输入新密码',
                        isPassword : ' 密码以字母开头，长度在6~20之间，只能包含字母、数字和下划线'
                    },
                    renewPass : {
                        required : " 请重复输入新密码",
                        equalTo:" 密码不一致"
                    }
                },
                submitHandler:function(form){
                    $.ajax({
                        url :"<c:out value="${apiPath}"/>apis@1@agencyusers@password@SUPER_ADMIN@"+$('#userId').val()+"?&smsCode="+$("#smsCode").val()+"&code="+$("#realCode").val()+"&password="+hex_md5($("#newPass").val()),
                        //data:{smsCode:$("#smsCode").val(),code: $("#realCode").val(),password:$("#newPass").val()},
                        type:"put",
                        dataType : "json",
                        beforeSend: function(XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset=utf-8");
                            XMLHttpRequest.setRequestHeader("appKey", "LexingInternalApp");
                        },
                        success : function(data) {
                            if(data.status=="200"){
                                $("#tabForm3").attr("style","display:none");
                                $("#resetOk").attr("style","display:");
                                $("#saveBtn").addClass("hidden");
                            }else{
                                $.smallBox({
                                    title : "提示信息",
                                    content : "<i class='fa fa-clock-o'></i> <i>"+data.message+"</i>",
                                    color : "#C46A69",
                                    iconSmall : "fa fa-times fa-2x fadeInRight animated",
                                    timeout : 3000
                                });
                            }
                        },
                        error : function(XMLHttpRequest, textStatus, errorThrown){
                        }
                    });
                },
                errorPlacement : function(error, element) {
                    error.insertAfter(element.parent());
                }
            });
            $("#userCode").click(function(){
                $("#userCode").addClass("disabled");
                $.ajax({
                    url : "<c:out value="${apiPath}"/>apis@1@sms@identifyingcode@site",
                    type:"get",
                    dataType : "json",
                    data:{"phoneNum":$("#phoneNum").val(),"smsType":"FINDPASSWORD"},
                    beforeSend: function(XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                    },
                    success : function(data) {
                        var seconds = 30;
                        $("#smsCode").val(data.result.smsCode);
                        var timer = setInterval(function () {
                            if(seconds==1){
                                clearInterval(timer);
                                $("#timeClock").html("获取验证码");
                                $("#userCode").removeClass("disabled");
                                return;
                            }
                            seconds--;
                            $("#timeClock").html(seconds+"后重新获取验证码");
                        }, 1000);
                    },
                    error : function(XMLHttpRequest, textStatus, errorThrown){
                        basetools.backTip(XMLHttpRequest.responseJSON,'N');
                    }
                });
            });


            var wizard = $('#bootstrap-wizard-pass').bootstrapWizard({
                'tabClass': 'form-wizard',
                'nextSelector':'#nextBtn',
                'onNext': function (tab, navigation, index) {
                    var ifpass = false;
                    if(index == 1){
                        $.ajax({
                            url :"<c:out value="${apiPath}"/>apis@1@agencyusers@verification@SUPER_ADMIN@"+$("#userId").val(),
                            type:"get",
                            async:false,
                            beforeSend: function(XMLHttpRequest) {
                                XMLHttpRequest.setRequestHeader("appKey", "LexingInternalApp");
                            },
                            success : function(data) {
                                if(data.status == '200'){
                                    if(data.result.phone1){
                                        $(".luserId").append($("#userId").val());
                                        $(".phone").html("您绑定的手机号码是:"+data.result.phone1.substring(0,3)+"*****"+data.result.phone1.substring(8));
                                        $("#phoneNum").val(data.result.phone1);
                                        ifpass = true;
                                    }else{
                                        $.SmartMessageBox({
                                                    title : "提示信息!",
                                                    content :"您还没有绑定手机号，请先绑定手机号码",
                                                    buttons : '[确定]'},
                                                function(ButtonPressed) {
                                                    window.location.href = "page/login";
                                                });
                                    }

                                }else{
                                    $('em[for="userId"]').remove();
                                    $("#userId").parent().addClass('state-error');
                                    $("#userId").parent().after('<em for="userId" class="invalid">帐号不存在 </em>');
                                    ifpass = false;
                                }
                            },
                            error : function(XMLHttpRequest, textStatus, errorThrown){
                            }
                        });
                    }else{
                        return $("#tabForm"+index).valid();
                    }
                    if(ifpass){
                        $('#bootstrap-wizard-pass').find('.form-wizard').children('li').eq(index - 1).addClass('complete');
                        $('#bootstrap-wizard-pass').find('.form-wizard').children('li').eq(index - 1).find('.step').html('<i class="fa fa-check"></i>');
                    }
                    return ifpass;
                },
                onTabClick : function(tab, navigation, index){
                    return false;
                },
                onLast:function(tab, navigation, index){
                    $("#tabForm3").submit();
                },
                onTabShow: function(tab, navigation, index) {
                    var tabCount = navigation.find('li').length;
                    var current = index+1;
                    $('#bootstrap-wizard-pass').find('.last').toggle(current >= tabCount);
                    $('#bootstrap-wizard-pass').find('.next').toggle(current < tabCount);
                    $("#tabForm"+current).find("input[type!='hidden']:first").focus();
                    if(index == 2){
                        $('#bootstrap-wizard-pass').find('.form-wizard').children('li').eq(1).addClass('complete');
                        $('#bootstrap-wizard-pass').find('.form-wizard').children('li').eq(1).find('.step').html('<i class="fa fa-check"></i>');
                    }
                }
            });


            $("#userId,#realCode").on("keydown",function(event){
                event.stopPropagation();
                if(event.keyCode==13){
                    return false;
                }
            });

            $("#renewPass").on("keydown",function(event){
                if(event.keyCode==13){
                    wizard.bootstrapWizard('last');
                }
            });
        });
    });
</script>