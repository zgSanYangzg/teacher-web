define(["jquery","basetools","bootstrap"],function(e,t){function n(){var t=e("#main").height(),n=e(window).height();t>n?(e.left_panel.css("min-height",t+"px"),e(".opp_result,.tree,.content-main").css("height",t-120+"px"),e.root_.css("min-height",t+e.navbar_height+"px"),e.mainHeight=t-120):(e.left_panel.css("min-height",n+"px"),e(".opp_result,.tree,.content-main").css("height",n-120+"px"),e.root_.css("min-height",n+"px"),e.mainHeight=n-120)}function i(){e(window).width()<979?e.root_.addClass("mobile-view-activated"):e.root_.hasClass("mobile-view-activated")&&e.root_.removeClass("mobile-view-activated")}function a(e){switch(e){case"sysManage":return"fa-sys";case"userManage":return"fa-person";case"businessManage":return"fa-business";case"goodsManage":return"fa-shop";case"infoManage":return"fa-info";default:return"fa-sys"}}function o(t){var n="";""==smid&&(smid=e.cookie("smid"));for(var i=t.length,a=0;a<i;a++){0==a&&""==smid&&(smid=t[a].direction);var o=t[a].moduleName;n+=t[a].direction==smid?"<li class='active'><a href='"+t[a].direction+"' code='"+t[a].moduleCode+"'>"+o+"</a></li>":"<li><a  href='"+t[a].direction+"' code='"+t[a].moduleCode+"'>"+o+"</a></li>"}return n}function s(t){if(container=e("#content"),t){e.cookie("smid",t,{expires:1}),e("nav li.active").removeClass("active");var n=e("#urlDo1 a[href='"+t+"']").closest("ul").prev();if("userapplyList.do"==t||"repairsList.do"==t){if(n.hasClass("content_show")){var i=parseInt(n.attr("data-totalnum"))-parseInt(e("#urlDo1 a[href='"+t+"']").attr("data-num"));n.attr("data-totalnum",i),i||n.removeClass("content_show").addClass("content_hide")}e("#urlDo1 a[href='"+t+"']").attr("data-num",0).removeClass("content_show").addClass("content_hide")}e('nav li:has(a[href="'+t+'"])').addClass("active");var a=e('nav a[href="'+t+'"]').text();document.title=a||document.title,r(t+location.search,container)}else if(e.cookie("smid"))s(e.cookie("smid"));else{var o=e('nav > ul > li:first-child  a[href!="#"]');s(o.length?o.attr("href"):c[0])}}function r(t,n){smid=t,e(document).ajaxSend(function(e,t,n){}),e.ajax({type:"GET",url:t,dataType:"html",cache:!0,beforeSend:function(t){t.setRequestHeader("appKey","LexingInternalApp"),n.html('<h1><i class="fa fa-cog fa-spin"></i> 加载中</h1>'),n[0]==e("#content")[0]&&e("html").animate({scrollTop:0},"fast")},success:function(e){n.css({opacity:"0.0"}).html(e).delay(50).animate({opacity:"1.0"},300)},error:function(e,t,i){n.html('<h4 style="margin-top:10px; display:block; text-align:left"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>')},async:!1})}e.menu_speed=235,e.navbar_height=49,e.root_=e("body"),e.left_panel=e("#left-panel"),e.contentDiv=e("#main div#content"),e.bread_crumb=e("#ribbon ol.breadcrumb"),e.mainHeight,e.device=null,e.navAsAjax=!0;var l=/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase());l?(e.root_.addClass("mobile-detected"),e.device="mobile"):(e.root_.addClass("desktop-detected"),e.device="desktop"),e.fn.extend({jarvismenu:function(t){var n={accordion:"true",speed:200,closedSign:"[+]",openedSign:"[-]"},i=e.extend(n,t),a=e(this);a.find("li").each(function(){0!=e(this).find("ul").size()&&(e(this).find("a:first").append("<b class='collapse-sign'>"+i.closedSign+"</b>"),"#"==e(this).find("a:first").attr("href")&&e(this).find("a:first").click(function(){return!1}))}),a.find("li.active").each(function(){e(this).parents("ul").slideDown(i.speed),e(this).parents("ul").parent("li").find("b:first").html(i.openedSign),e(this).parents("ul").parent("li").addClass("open")}),a.find("li a").click(function(){0!=e(this).parent().find("ul").size()&&(i.accordion&&(e(this).parent().find("ul").is(":visible")||(parents=e(this).parent().parents("ul"),visible=a.find("ul:visible"),visible.each(function(t){var n=!0;parents.each(function(e){if(parents[e]==visible[t])return n=!1,!1}),n&&e(this).parent().find("ul")!=visible[t]&&e(visible[t]).slideUp(i.speed,function(){e(this).parent("li").find("b:first").html(i.closedSign),e(this).parent("li").removeClass("open")})}))),e(this).parent().find("ul:first").is(":visible")&&!e(this).parent().find("ul:first").hasClass("active")?e(this).parent().find("ul:first").slideUp(i.speed,function(){e(this).parent("li").removeClass("open"),e(this).parent("li").find("b:first").delay(i.speed).html(i.closedSign)}):e(this).parent().find("ul:first").slideDown(i.speed,function(){e(this).parent("li").addClass("open"),e(this).parent("li").find("b:first").delay(i.speed).html(i.openedSign)}))})}}),e(document).ready(function(){function t(){window.location=e.loginURL}e("[rel=tooltip]").length&&e("[rel=tooltip]").tooltip(),n(),e(".minifyme").click(function(t){e("body").toggleClass("minified"),t.preventDefault()}),e("#hide-menu > a").click(function(t){e("body").toggleClass("hidden-menu"),t.preventDefault()}),e("button[data-loading-text]").on("click",function(){var t=e(this);t.button("loading"),setTimeout(function(){t.button("reset")},3e3)}),e("#refresh").click(function(t){var n=e(this);e.widresetMSG=n.data("reset-msg"),e.SmartMessageBox({title:"<i class='fa fa-refresh' style='color:green'></i> Clear Local Storage",content:e.widresetMSG||"Would you like to RESET all your saved widgets and clear LocalStorage?",buttons:"[No][Yes]"},function(e){"Yes"==e&&localStorage&&(localStorage.clear(),location.reload())}),t.preventDefault()}),e("#logout a").click(function(n){var i=e(this);e.loginURL=i.attr("href"),e.logoutMSG=i.data("logout-msg"),e.SmartMessageBox({title:"<i class='fa fa-sign-out txt-color-orangeDark'></i><span class='txt-color-orangeDark'><strong>"+e("#show-shortcut").text()+"</strong></span> 是否真的要退出当前应用？",content:"为了安全,建议您清除浏览器缓存中保存的账号和密码.",buttons:"[否][是]"},function(n){"Yes"!=n&&"是"!=n||(e.root_.addClass("animated fadeOutUp"),setTimeout(t,100))}),n.preventDefault()}),e("body").on("click",function(t){e('[rel="popover"]').each(function(){e(this).is(t.target)||0!==e(this).has(t.target).length||0!==e(".popover").has(t.target).length||e(this).popover("hide")})})}),e("#main").resize(function(){n(),i()}),e("nav").resize(function(){n()});var c=(function(){for(var e,t=3,n=document.createElement("div"),i=n.getElementsByTagName("i");n.innerHTML="<!--[if gt IE "+ ++t+"]><i></i><![endif]-->",i[0];);return t>4?t:e}(),[]);e.navAsAjax&&(e("nav").length&&(e("nav li").length||e.restAjax({url:e("#apiPath").val()+"apis/1/privileges"+e.apijoin+"userModelTree",type:"get",dataType:"json",async:!1,contentType:"application/json",cache:!1,beforeSend:function(e){e.setRequestHeader("token",token),e.setRequestHeader("Content-Type","application/json;charset=utf-8")},success:function(t){if("200"==t.status){var n="";if(t.result&&t.result[0])for(var i=t.result[0].childs,s=0;s<i.length;s++)i[s].childs.length&&(n+='<li><a href="#" class="nav-header '+i[s].moduleCode+'"><i class="fa fa-lg '+a(i[s].moduleCode)+'"></i> <span class="menu-item-parent">'+i[s].moduleName+"</span></a><ul>",n+=o(i[s].childs),n+="</ul></li>");else smid="userprofile.do";e("#urlDo1").html(n)}}}),s(smid),e("nav ul").jarvismenu({accordion:!0,speed:e.menu_speed,closedSign:'<em class="fa fa-chevron-down"></em>',openedSign:'<em class="fa fa-chevron-up"></em>'})),e(document).on("click",'nav a[href!="#"],#workbench>a,#warnings>a',function(t){t.preventDefault();var n=e(t.currentTarget);if("workbench.do"!=n.attr("href")){var i=sessionStorage.getItem("xdintervaltimer");i&&clearInterval(i)}n.parent().hasClass("active")||n.attr("target")||(e.root_.hasClass("mobile-view-activated")?(e.root_.removeClass("hidden-menu"),window.setTimeout(function(){window.location.search?window.location.href=window.location.href.replace(window.location.search,"").replace(window.location.hash,"")+"#"+n.attr("href"):s(n.attr("href"))},150)):window.location.search?window.location.href=window.location.href.replace(window.location.search,"").replace(window.location.hash,"")+"#"+n.attr("href"):s(n.attr("href")))}),e(document).on("click",'nav a[href="#"]',function(e){e.preventDefault()})),e.app={pageSetUp:function(){"desktop"===e.device,n()}},e.extend({checkCookie:function(){funMap=e.cookie("funMap"),null!=funMap&&2!=funMap.length?(funMap=e.cookie("funMap"),smid=e.cookie("smid"),funMap=t.strToJson(funMap)):funMap={}},closeEvent:function(){console.log(2),e.cookie("funMap",t.jsonToStr(funMap),{expires:1}),e.cookie("smid",smid,{expires:1})},unLoadEvent:function(){e.cookie("funMap",t.jsonToStr(funMap),{expires:1}),e.cookie("smid",smid,{expires:1})}})});