<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@include file="/includes/public.jsp" %>
<!DOCTYPE html>
<!--[if IE 7 ]> <html class="no-js ie ie7 lte7 lte8 lte9" lang="zh-cmn-Hans-CN"> <![endif]-->
<!--[if IE 8 ]> <html class="no-js ie ie8 lte8 lte9" lang="zh-cmn-Hans-CN"> <![endif]-->
<!--[if IE 9 ]> <html class="no-js ie ie9 lte9>" lang="zh-cmn-Hans-CN"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!-->
<html class="no-js" lang="zh-cmn-Hans-CN"><!--<![endif]-->
<head>
    <title>登录</title>
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
    <!-- SmartAdmin Styles : Please note (smartadmin-production.css) was created using LESS variables -->
    <link rel="stylesheet" type="text/css" media="screen" href="includes/lib/smartadmin/css/smartadmin-production.css">
    <!-- FAVICONS -->
    <link rel="stylesheet" type="text/css" href="includes/lib/smartadmin/css/theme.css">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <style>
        * {
            box-sizing: content-box;
        }

        /*html5*/
        .dialog {
            width: 974px;
            height:345px;
            margin-top: 250px;
            border-radius: 10px;
            background-color:#fafafa;
            opacity: 0.96;
            letter-spacing: 2px;
            border:none !important;
        }

        .dialog .row {
            padding-top: 10px;
            margin-top: 10px;
        }
        #loginForm {height:345px;}
        .smart-form fieldset {
            background-color: transparent;
        }
        .dialog input {
            height: 50px !important;
            padding-top: 10px !important;
            padding-bottom: 10px !important;
        }

        @media screen and (max-width: 480px) {
            .dialog {
                width: 95% !important;
                margin-top: 60px;
            }

            .dialog .row {
                padding-top: 2px;
                margin-top: 10px;
            }
        }

        body {
          /*  background-image: url("");*/
            background-size: cover;
            margin: 0;
            padding: 0;
        }

        /*.smart-form section {
            margin-bottom: 10px;
            position: relative;
        }*/
        .smart-form .icon-prepend {
            border:none;
            height:45px;
            line-height: 40px;
            padding-left:5px;
        }

        .btn-login {
            font-size: 24px;
            color: #fff;
            background-color: #1a90e2;
            /*background-image: linear-gradient(to bottom, #5ac3d9, #2790a6);*/
        }

        label.invalid {
            color: red;
        }

        .smart-form .input input, .smart-form .select select, .smart-form .textarea textarea{
            font-size: 16px;
            border:2px solid #cacaca;
            background-color: #fff;
        }

        .smart-form .checkbox input + i::after {
            color:#959595;
            border-color: #959595 !important;
            border-width:2px;
        }
        .smart-form .radio input:checked + i, .smart-form .checkbox input:checked + i, .smart-form .toggle input:checked + i {
            border-color: #959595 !important;
            border-width:2px;
        }
        .xdlogo {box-sizing: border-box;text-align: center;height:270px;border-right:2px solid #dedede;margin-top:35px;
            font-size: 60px;font-weight: 500;line-height: 270px;
        }
        /*.xdlogo img {width:70%;margin:11% auto;}*/
    </style>

    <!-- Demo page code -->

<body>

<div class="dialog">
    <form action="/index" method="post" id="loginForm" class="smart-form client-form">
        <input type="hidden" name="token" id="token"/>
        <input type="hidden" name="expire" id="expire"/>
        <input type="hidden" name="userName" id="userName"/>
        <input type="hidden" name="messageCount" id="messageCount"/>
        <input type="hidden" name="product" id="product" value="AgecnyPro"/>
        <input type="hidden" name="agency" id="agency" value="SUPER_ADMIN"/>
        <fieldset style="margin: 0px;padding:0px;">
            <div class="col-xs-6 xdlogo">微分金</div>
            <div class="col-xs-6" style="margin-top:30px;">
                <div class="row">
                    <label class="col-sm-2"></label>
                    <div class="input col-sm-8"><i class="icon-prepend fa fa-user" style="color:#959595;font-size: 18px;"></i>
                        <input type="text" id="userId" name="userId" placeholder="用户名">
                        <b class="tooltip tooltip-top-left"><i class="fa fa-user txt-color-teal"></i> 请输入您的用户名</b>
                    </div>
                </div>
                <div class="row">
                    <label class="col-sm-2"></label>
                    <label class="input col-sm-8"> <i class="icon-prepend fa fa-lock" style="color:#959595;font-size: 18px;"></i>
                        <input type="password" id="password" name="password" placeholder="密码" onpaste="return false"
                               oncontextmenu="return false" oncopy="return false" oncut="return false">
                        <b class="tooltip tooltip-top-left"><i class="fa fa-lock txt-color-teal"></i> 请输入您的密码</b>
                    </label>
                </div>
                <div class="row">
                    <label class="col-sm-2"></label>

                    <div class="col-sm-8">
                        <label class="checkbox  pull-left" style="color:#959595;font-size: 16px;">
                            <input type="checkbox" name="remember" id="remember">
                            <i></i>记住用户名7天</label>
                        <label class="checkbox  pull-right"><a href="/page/forgotpassword" target="_blank"
                                                               style="color:#959595;font-size: 16px;">忘记密码?</a></label>
                    </div>
                </div>
                <div class="row" style="margin-top:0;">
                    <label class="col-sm-2"></label>

                    <div class="col-sm-8">
                        <label class="invalid loginerror"> </label>
                        <button type="button" class="btn btn-login btn-lg btn-block" id="loginButton" onclick="checkFrom()">
                            登&nbsp;&nbsp;&nbsp;&nbsp;录
                        </button>
                    </div>
                </div>
            </div>
        </fieldset>
    </form>
</div>

<!--================================================== -->
<script type="text/javascript" src="includes/require.js"></script>
<script>
    require.config({
        paths: {
            "jquery": "includes/lib/jquery/jquery",
            "jquery.validate": "includes/lib/smartadmin/js/plugin/jquery-validate/jquery.validate.min",
            "bootstrap": "includes/lib/smartadmin/js/bootstrap/bootstrap",
            "md5-min": "includes/lib/jquery/md5-min",
            "jquery.cookie": "includes/lib/jquery/jquery.cookie"
        },
        shim:{
            "jquery.validate" : ["jquery"],
            "bootstrap" : ["jquery"]
        }
    });

    requirejs(['jquery', 'jquery.validate', 'bootstrap', 'md5-min', 'jquery.cookie'], function ($) {
        $.cookie("smid","");//登陆时将页面显示模块的cookie置空
        $.cookie("funMap","");//登陆时将页面显示模块的按钮cookie置空
        $("#userId").focus();
        if ($.cookie("remember") == "true") {
            $("#remember").attr("checked", true);
            $("#agency").val($.cookie("agency"));
            $("#userId").val($.cookie("userId"));
        }
        $("#loginForm").validate({
            errorElement: 'label',
            rules: {
                userId: {
                    required: true
                },
                password: {
                    required: true
                }
            },
            messages: {
                userId: {
                    required: '请输入用户名! '
                },
                password: {
                    required: '请输入密码！ '
                }
            }
        });

        document.onkeydown = function (e) {
            var button = document.getElementById("loginButton");
            var ev = document.all ? window.event : e;
            if (ev.keyCode == 13) {
                checkFrom();
            }
        }

        this.checkFrom = function () {
            if ($("#loginForm").valid()) {
                login();
            }
        }

        this.login = function () {
            var data = {
                "loginId": $("#userId").val(),
                "password": $("#password").val(),
                "agency": $("#agency").val()
            };

            $.ajax({
                type: "POST",
                url: "<c:out value="${apiPath}"/>security@1@authentication@superadmin",
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                cache: true,
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                },
                success: function (returnData) {
                    if (returnData.status == 200) {
                        //判断是否保存cookie
                        saveLoginInfo();
                        $("#token").val(returnData.result.token);
                        $("#expire").val(returnData.result.expire);
                        $("#userName").val(returnData.result.userName);
                        $("#messageCount").val(returnData.result.messageCount);
                        $("#loginForm").submit();
                    } else {
                        $(".loginerror").html(returnData.message).show();
                    }

                },
                error: function (xhr, ajaxOptions, thrownError) {
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        var message = xhr.responseJSON.message.split("--");
                        $(".loginerror").html(message[1]).show();
                        setTimeout(function () {
                            $(".loginerror").html('').hide();
                        }, 2000);
                    }
                },
                async: false
            });
        }

        //保存cookie
        this.saveLoginInfo = function () {
            if ($("#remember").prop("checked") == true) {
                var agency = $("#agency").val();
                var userId = $("#userId").val();
                $.cookie("remember", "true", {expires: 7}); // 存储一个带7天期限的 cookie
                $.cookie("agency", agency, {expires: 7});
                $.cookie("userId", userId, {expires: 7});
            }
            else {
                $.cookie("remember", "false", {expires: -1});        // 删除 cookie
                $.cookie("agency", "false", {expires: -1});
                $.cookie("userId", '', {expires: -1});
            }
        }
    });
</script>
</body>
</html>
