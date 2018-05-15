<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/includes/public.jsp"%>
<!DOCTYPE html>
<html class="no-js" lang="zh-cmn-Hans-CN">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
	<title> 首页 </title>
	<meta name="description" content="首页">
	<meta name="author" content="lcy">
	<base href='<c:out value="${basePath}"/>'>
  	<link rel='icon' href='<c:out value="${basePath}"/>favicon.ico'  type='image/x-icon'>
  	<link rel='shortcut icon' href='<c:out value="${basePath}"/>favicon.ico' type='image/x-icon'>
	<%@ include file="common/commonHeader.jsp"%>
	<script type="text/javascript" src="includes/config-source.js"></script>
	<script type="text/javascript" src="includes/require.js"></script>
	<script type="text/javascript">
		//获取token,expire
		var expire ='${expire}';
		var token ='${token}';
		var agencyCode = '${agencyCode}';
		var userId = '${userId}';
		var userName = '${userName}';
		var moduleName = {
			role:'security@1',
			people:'human@1'/*,
			user:'apis@1',
			dept:'apis@1',
			dictionary:'apis@1',
			resource:'apis@1',
			group:'apis@1'*/
		}
		//存放用户权限
		var funMap = {};
		//存放模块的code
		var smid = "";
		requirejs(['jquery','app','jquery.cookie'], function ($,app) {
			$.apiPath = '${apiPath}';
			$.apijoin = "@";
			$.websocketServerUrl = '${websocketServerUrl}';
			$(document).ajaxStart(function (e, xhr, opts) {
				//cache: false;
			}).ajaxSend(function (e, xhr, opts) {
				xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8");
			}).ajaxError(function (e, xhr, opts) {
				if (xhr.status == 401) {
					window.location.href = "page/logout?reason="+ xhr.responseJSON.message;
				}

			}).ajaxSuccess(function (e, xhr, opts) {
				if(xhr.responseJSON && xhr.responseJSON.status && xhr.responseJSON.status != '200'){
					console.log(xhr.responseJSON.message);
				}
			}).ajaxComplete(function (e, xhr, opts) {
			}).ajaxStop(function (e, xhr, opts) {
			});

			$("#user_name").text("欢迎您，"+userId);

			//$.checkCookie();

			//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
			function banBackSpace(e){
				var ev = e || window.event;//获取event对象
				var obj = ev.target || ev.srcElement;//获取事件源

				var t = obj.type || obj.getAttribute('type');//获取事件源类型

				//获取作为判断条件的事件类型
				var vReadOnly = obj.getAttribute('readonly');
				var vEnabled = obj.getAttribute('enabled');
				//处理null值情况
				vReadOnly = (vReadOnly == null) ? false : vReadOnly;
				vEnabled = (vEnabled == null) ? true : vEnabled;
				//当敲Backspace键时，事件源类型为密码或单行、多行文本的，
				//并且readonly属性为true或enabled属性为false的，则退格键失效
				var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")
				&& (vReadOnly==true || vEnabled!=true))?true:false;
				//当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
				var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea" && !$(obj).hasClass("note-editable"))
						?true:false;
				//禁用文本域回车换行
				var flag3=(ev.keyCode == 13 && (t=="textarea"))?true:false;
				//判断
				if(flag3){
					return false;
				}
				if(flag2){
					return false;
				}
				if(flag1){
					return false;
				}
			}

			//禁止后退键 作用于Firefox、Opera
			document.onkeypress=banBackSpace;
			//禁止后退键  作用于IE、Chrome
			document.onkeydown=banBackSpace;
		});
	</script>
</head>
<!--  onbeforeunload="return CloseEvent();" onunload="UnLoadEvent()"  onLoad="checkCookie()" -->
<body class="fixed-navigation fixed-header fixed-ribbon">
	<input type="hidden" id="apiPath" value="${apiPath}"/>
	<input type="hidden" id="websocketServerUrl" value="${websocketServerUrl}"/>
	<!-- HEADER -->
	<%----%>
	<!-- END HEADER -->
	<div class="modal fade" id="resetpass" tabindex="-1" role="dialog"
		 aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body"></div>
			</div>
		</div>
	</div>
	<!-- Left panel : Navigation area -->
	<!-- Note: This width of the aside area can be adjusted through LESS variables -->
	<aside id="left-panel">
		<!-- NAVIGATION : This navigation is also responsive

		To make this navigation dynamic please make sure to link the node
		(the reference to the nav > ul) after page load. Or the navigation
		will not initialize.
		-->
		<nav>
			<!-- NOTE: Notice the gaps after each icon usage <i></i>..
			Please note that these links work a bit different than
			traditional hre="" links. See documentation for details.
			-->
			<ul id="urlDo1">
				<li>
					<a href="#" class="nav-header"><i class="fa fa-lg fa-sys"></i> <span class="menu-item-parent">后台管理</span></a>
					<ul>
						<li><a href="role/role">角色管理</a></li>
						<li><a href="people/peopleList">社会人力管理</a></li>
					</ul>
				</li>
			</ul>
		</nav>
		<span class="minifyme"> <i class="fa fa-arrow-circle-left hit"></i> </span>
	</aside>
	<!-- END NAVIGATION -->
	
	<!-- 主面板 -->
	<div id="main" role="main">
		<header id="header">
			<div id="logo-group">
				<!-- PLACE YOUR LOGO HERE -->
				<span id="logo" style="font-size: 20px;font-weight: bold;color: black;">
					爱福
				</span>
				<!-- END LOGO PLACEHOLDER -->
			</div>

			<div class="pull-right" style="line-height: 49px;">
				<!-- 退出登录 -->
				<div id="logout" class="pull-right" style="margin-right: 5px;">
					<a href="page/logout" class="btn btn-default"><span aria-hidden="true" class="glyphicon glyphicon-lx-logout"></span></a>
				</div>
				<!-- 重置密码 -->
				<div class="pull-right" style="margin-right: 5px;">
					<a data-toggle="modal" data-target="#resetpass" href="/page/resetpass?id=${userId}&agencyCode=${agencyCode}&oldpassword="
					   class="btn btn-default"><span aria-hidden="true" class="glyphicon glyphicon-lx-password"></span></a>
				</div>
				<!-- 消息提醒 -->
				<div id="warnings" class="pull-right">
					<a href="warnings.do" class="btn btn-default"><span aria-hidden="true" class="glyphicon glyphicon-lx-msg"></span>
						<label id="warnings_num" style="position: relative; top:-15px;right:10px;background-color: red;width: 20px;height: 20px;border-radius: 10px;color: #FFFFFF;margin-bottom: 0px;display: none"></label>
					</a>
				</div>
			</div>
			<div class="pull-right" style="line-height: 49px;padding: 0 10px;color:#004f86;" id="user_name">欢迎您,系统管理员</div>
		</header>

		<div id="content" >
		    
		</div>
		<div id="footer" class="" style="position: fixed;bottom:0;line-height: 35px;
		text-align: center;z-index: 99;">爱福金融</div>
	</div>
	<!-- 主面板  end-->
</body>
</html>