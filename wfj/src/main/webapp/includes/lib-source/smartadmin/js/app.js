define(['jquery','basetools','bootstrap'],function($,basetools){
    /*
     * 全局变量
     */

    // 点击父节点时子菜单展开的速度
    $.menu_speed = 235;

    // : You will also need to change this variable in the "variable.less" file.
    $.navbar_height = 49;

    $.root_ = $('body');
    $.left_panel = $('#left-panel');
    $.contentDiv = $('#main div#content');
    $.bread_crumb = $('#ribbon ol.breadcrumb');
    $.mainHeight;
    // desktop or mobile
    $.device = null;

    $.navAsAjax = true; // Your left nav in your app will no longer fire ajax calls

    /*
     * DETECT MOBILE DEVICES
     * Description: Detects mobile device - if any of the listed device is detected
     * a class is inserted to $.root_ and the variable $.device is decleard.
     */

    /* so far this is covering most hand held devices */
    var ismobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

    if (!ismobile) {
        // Desktop
        $.root_.addClass("desktop-detected");
        $.device = "desktop";
    } else {
        // Mobile
        $.root_.addClass("mobile-detected");
        $.device = "mobile";
    }

    /* ~ END: CHECK MOBILE DEVICE */


    /* 初始化菜单 */
    $.fn.extend({
        jarvismenu: function (options) {
            var defaults = {
                accordion: 'true',
                speed: 200,
                closedSign: '[+]',
                openedSign: '[-]'
            };
            var opts = $.extend(defaults, options);
            var $this = $(this);
            //添加 [+] 到多级菜单
            $this.find("li").each(function () {
                if ($(this).find("ul").size() != 0) {
                    //add the multilevel sign next to the link
                    $(this).find("a:first").append("<b class='collapse-sign'>" + opts.closedSign + "</b>");

                    //avoid jumping to the top of the page when the href is an #
                    if ($(this).find("a:first").attr('href') == "#") {
                        $(this).find("a:first").click(function () {
                            return false;
                        });
                    }
                }
            });

            //展开多级菜单
            $this.find("li.active").each(function () {
                $(this).parents("ul").slideDown(opts.speed);
                $(this).parents("ul").parent("li").find("b:first").html(opts.openedSign);
                $(this).parents("ul").parent("li").addClass("open");
            });

            $this.find("li a").click(function () {
                if ($(this).parent().find("ul").size() != 0) {
                    if (opts.accordion) {
                        //Do nothing when the list is open
                        if (!$(this).parent().find("ul").is(':visible')) {
                            parents = $(this).parent().parents("ul");
                            visible = $this.find("ul:visible");
                            visible.each(function (visibleIndex) {
                                var close = true;
                                parents.each(function (parentIndex) {
                                    if (parents[parentIndex] == visible[visibleIndex]) {
                                        close = false;
                                        return false;
                                    }
                                });
                                if (close) {
                                    if ($(this).parent().find("ul") != visible[visibleIndex]) {
                                        $(visible[visibleIndex]).slideUp(opts.speed, function () {
                                            $(this).parent("li").find("b:first").html(opts.closedSign);
                                            $(this).parent("li").removeClass("open");
                                        });

                                    }
                                }
                            });
                        }
                    }// end if
                    if ($(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active")) {
                        $(this).parent().find("ul:first").slideUp(opts.speed, function () {
                            $(this).parent("li").removeClass("open");
                            $(this).parent("li").find("b:first").delay(opts.speed).html(opts.closedSign);
                        });

                    } else {
                        $(this).parent().find("ul:first").slideDown(opts.speed, function () {
                            /*$(this).effect("highlight", {color : '#616161'}, 500); - disabled due to CPU clocking on phones*/
                            $(this).parent("li").addClass("open");
                            $(this).parent("li").find("b:first").delay(opts.speed).html(opts.openedSign);
                        });
                    } // end else
                } // end if
            });
        } // end function
    });

    /*
     * 加载事件
     */

    $(document).ready(function () {

        if ($("[rel=tooltip]").length) {
            $("[rel=tooltip]").tooltip();
        }

        //TODO: was moved from window.load due to IE not firing consist
        nav_page_height();

        // 合并左侧菜单
        $('.minifyme').click(function (e) {
            $('body').toggleClass("minified");
          //  $(this).effect("highlight", {}, 500);
            e.preventDefault();
        });

        // 隐藏菜单
        $('#hide-menu > a').click(function (e) {
            $('body').toggleClass("hidden-menu");
            e.preventDefault();
        });

        $('button[data-loading-text]').on('click', function () {
            var btn = $(this);
            btn.button('loading');
            setTimeout(function () {
                btn.button('reset');
            }, 3000);
        });

        // 红点提示
        function notification_check() {
            $this = $('#activity > .badge');
            if (parseInt($this.text()) > 0) {
                $this.addClass("bg-color-red bounceIn animated");
            }
        }

       // notification_check();

        // 刷新
        $('#refresh').click(function (e) {
            var $this = $(this);
            $.widresetMSG = $this.data('reset-msg');
            $.SmartMessageBox({
                title: "<i class='fa fa-refresh' style='color:green'></i> Clear Local Storage",
                content: $.widresetMSG || "Would you like to RESET all your saved widgets and clear LocalStorage?",
                buttons: '[No][Yes]'
            }, function (ButtonPressed) {
                if (ButtonPressed == "Yes" && localStorage) {
                    localStorage.clear();
                    location.reload();
                }
            });
            e.preventDefault();
        });

        //登出
        $('#logout a').click(function (e) {
            var $this = $(this);
            $.loginURL = $this.attr('href');
            $.logoutMSG = $this.data('logout-msg');
            // ask verification
            $.SmartMessageBox({
                title: "<i class='fa fa-sign-out txt-color-orangeDark'></i><span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> 是否真的要退出当前应用？",
                content: "为了安全,建议您清除浏览器缓存中保存的账号和密码.",
                buttons: '[否][是]'

            }, function (ButtonPressed) {
                if (ButtonPressed == "Yes" || ButtonPressed == "是") {
                    $.root_.addClass('animated fadeOutUp');
                    setTimeout(logout, 100);
                }
            });
            e.preventDefault();
        });

        /*
         * 退出登录
         */

        function logout() {
            window.location = $.loginURL;
        }

        // Keep only 1 active popover per trigger - also check and hide active popover if user clicks on document
        $('body').on('click', function (e) {
            $('[rel="popover"]').each(function () {
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                    $(this).popover('hide');
                }
            });
        });


    });


    /*
     * NAV OR #LEFT-BAR RESIZE DETECT
     * Description: changes the page min-width of #CONTENT and NAV when navigation is resized.
     * This is to counter bugs for min page width on many desktop and mobile devices.
     * Note: This script uses JSthrottle technique so don't worry about memory/CPU usage
     */

    // Fix page and nav height
    function nav_page_height() {
        var setHeight = $('#main').height();
        var windowHeight = $(window).height();
        //设置高度
        if (setHeight > windowHeight) {
            $.left_panel.css('min-height', setHeight + 'px');
            $(".opp_result,.tree,.content-main").css('height', (setHeight - 120) + 'px');
            $.root_.css('min-height', setHeight + $.navbar_height + 'px');
            $.mainHeight = setHeight - 120;
        } else {
            $.left_panel.css('min-height', windowHeight + 'px');
            $(".opp_result,.tree,.content-main").css('height', (windowHeight - 120) + 'px');
            $.root_.css('min-height', windowHeight + 'px');
            $.mainHeight = windowHeight - 120;
        }
    }

    $('#main').resize(function () {
        nav_page_height();
        check_if_mobile_width();
    });

    $('nav').resize(function () {
        nav_page_height();
    });

    function check_if_mobile_width() {
        if ($(window).width() < 979) {
            $.root_.addClass('mobile-view-activated')
        } else if ($.root_.hasClass('mobile-view-activated')) {
            $.root_.removeClass('mobile-view-activated');
        }
    }

    /* ~ END: NAV OR #LEFT-BAR RESIZE DETECT */

    /*
     * DETECT IE VERSION
     * Description: A short snippet for detecting versions of IE in JavaScript
     * without resorting to user-agent sniffing
     * RETURNS:
     * If you're not in IE (or IE version is less than 5) then:
     * //ie === undefined
     *
     * If you're in IE (>=5) then you can determine which version:
     * // ie === 7; // IE7
     *
     * Thus, to detect IE:
     * // if (ie) {}
     *
     * And to detect the version:
     * ie === 6 // IE6
     * ie > 7 // IE8, IE9 ...
     * ie < 9 // Anything less than IE9
     */

   // TODO: delete this function later on - no longer needed (?)
    var ie = ( function () {

        var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');

        while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);

        return v > 4 ? v : undef;

    }()); // do we need this?

    /* ~ END: DETECT IE VERSION */

    function foldIcon(code){//不同类型的模块对应不同的ICON
        switch (code) {
            case "sysManage":
                return 'fa-sys';
            case "userManage":
                return 'fa-person';
            case "businessManage":
                return 'fa-business';
            case "goodsManage":
                return 'fa-shop';
            case "infoManage":
                return 'fa-info';
            default :
                return 'fa-sys';
        }
    }

    function parseChild(data){
        var lists = "";
        if(smid==""){
            smid = $.cookie("smid");
        }
        var len = data.length;
        for(var j=0;j<len;j++){
            if(j==0 && smid==""){
                smid = data[j].direction;
            }
            var rcode = data[j].moduleName;
            if(data[j].direction == smid){
                lists += "<li class='active'><a href='"+data[j].direction+"' code='"+data[j].moduleCode+"'>"+rcode+"</a></li>";
            }else{
                lists += "<li><a  href='"+data[j].direction+"' code='"+data[j].moduleCode+"'>"+rcode+"</a></li>";
            }
        }
        return lists;
    }

    /*
     * 左侧菜单导航事件
     */
    var infoMessage = [];//信息监测和消息
    if ($.navAsAjax) {
        if ($('nav').length) {
            if(!$('nav li').length){
                $.restAjax({
                    url : $("#apiPath").val()+"apis/1/privileges"+ $.apijoin+"userModelTree" ,
                    type:"get",
                    dataType : 'json',
                    async:false,
                    contentType:'application/json',
                    cache : false,
                    beforeSend: function(XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader("token",token);
                        XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset=utf-8");
                    },
                    success : function(data) {
                        if(data.status=="200"){
                            var listr = "";
                            if(data.result && data.result[0]){
                                var datas = data.result[0].childs;
                                for(var i=0;i<datas.length;i++){
                                    if(datas[i].childs.length){
                                        listr += '<li><a href="#" class="nav-header '+datas[i].moduleCode+'"><i class="fa fa-lg '+foldIcon(datas[i].moduleCode)+'"></i> <span class="menu-item-parent">'
                                            +datas[i].moduleName+'</span></a><ul>';
                                        listr += parseChild(datas[i].childs);
                                        listr += "</ul></li>";
                                    }
                                }
                            }else{//无权限时
                                smid = "userprofile.do";
                            }
                            $("#urlDo1").html(listr);
                        //  initWebsocket();
                        }
                    }
                });
            }
            checkURL(smid);
            if (!null) {
                $('nav ul').jarvismenu({
                    accordion: true,
                    speed: $.menu_speed,
                    closedSign: '<em class="fa fa-chevron-down"></em>',
                    openedSign: '<em class="fa fa-chevron-up"></em>'
                });
            } else {
                alert("Error - menu anchor does not exist");
            }
        }

        $(document).on('click', 'nav a[href!="#"],#workbench>a,#warnings>a', function (e) {
            e.preventDefault();
            var $this = $(e.currentTarget);
            if($this.attr('href') != "workbench.do"){
                var timer = sessionStorage.getItem("xdintervaltimer");
                if(timer){
                    clearInterval(timer);
                }
            }
            // if parent is not active then get hash, or else page is assumed to be loaded
            if (!$this.parent().hasClass("active") && !$this.attr('target')) {
                // you could also do here:  $.device === "mobile" - and save a little more memory
                if ($.root_.hasClass('mobile-view-activated')) {
                    $.root_.removeClass('hidden-menu');
                    window.setTimeout(function () {
                        if (window.location.search) {
                            window.location.href =
                                window.location.href.replace(window.location.search, '')
                                    .replace(window.location.hash, '') + '#' + $this.attr('href');
                        } else {
                            checkURL($this.attr('href'));
                        }
                    }, 150);
                } else {
                    if (window.location.search) {
                        window.location.href =
                            window.location.href.replace(window.location.search, '')
                                .replace(window.location.hash, '') + '#' + $this.attr('href');
                    } else {
                        checkURL($this.attr('href'));
                    }
                }
            }
        });

        // all links with hash tags are ignored
        $(document).on('click', 'nav a[href="#"]', function (e) {
            e.preventDefault();
        });
    }

    function showTips(code,callback){//推送信息模块提示数显示函数
        if($("#urlDo1 a[href='"+code+"']").parent().hasClass("active")){//如果当前模块属于激活状态，则不做提醒处理
            if(callback && typeof callback == "function"){
                callback();
            }
            return;
        }
        var _nums = $("#urlDo1 a[href='"+code+"']").attr("data-num");
        if(_nums){
            _nums = parseInt(_nums);
            ++_nums;
        }else{
            _nums = 1;
        }
        var parent = $("#urlDo1 a[href='"+code+"']").closest("ul").prev();
        $("#urlDo1 a[href='"+code+"']").attr("data-num",_nums).removeClass("content_hide").addClass("content_show");
        var _totalnums = parent.attr("data-totalnum") ? parseInt(parent.attr("data-totalnum")) +1 : _nums;//更新总的未读信息数量
        parent.addClass("content_show").attr("data-totalnum",_totalnums);
    }
    //初始化消息推送服务
    function initWebsocket() {
        if ('WebSocket' in window) {
            window.websocket = window.websocket || new WebSocket($("#websocketServerUrl").val()+"lexingms/websocket?agencyCode=" + agencyCode.toUpperCase() + "&userId=" + userId);
        } else {
            alert("您的浏览器版本过低,不能开启消息服务!");
        }
        window.websocket.onopen = function(event) {
            console.log("ok");
        };
        window.websocket.onmessage = function(event) {
            var message = JSON.parse(event.data);
            if(message && message.eventCode){
                switch(message.eventCode){
                    case "equipment_repair"://报修管理
                        showTips("repairsList.do",function(){$('#repairs_table').DataTable().ajax.url(encodeURI($.apiPath+"apis/1/report/page")).load()});
                        break;
                    case "user_add":  //用户审批
                        showTips("userapplyList.do",function(){$('#userapply_table').DataTable().ajax.url(encodeURI($.apiPath+"apis/1/userregisterapply/page?isDeal=N")).load()});
                        break;
                    //预警消息
                    case "remote_data_anomalies":// 监测值异常code
                    case "communications_equipment_failure" :// 设备通讯异常code
                    case "rmt_equipment_status_normal" : // 远程设备故障状态恢复正常
                    case "rmt_equipment_fault_status_warn" : //远程设备故障状态预警
                    case "communications_equipment_normal" : // 设备通讯恢复正常
                    case "remote_data_anomalies_two_to_one" : // 监测值由二段报警变更一段报警
                    case "remote_data_anomalies_to_normal" : // 监测值状态恢复正常
                        var num = $("#warnings_num").html();
                         if(num){
                             num = parseInt(num);
                             ++num;
                         }else{
                             num = 1;
                         }
                         $("#warnings a").css("padding-right","0px");
                         $("#warnings_num").show();
                         $("#warnings_num").html(num);
                        break;
                }
            }
        };
        window.websocket.onclose = function(event) {
            alert('与服务器的连接中断...');
        };
    }
    // 判断URL是否存在
    function checkURL(url) {
        //去掉锚点#
        container = $('#content');
        if (url) {
            $.cookie('smid',url,{ expires: 1 });
            //去掉所有菜单栏的active样式
            $('nav li.active').removeClass("active");

            //点击菜单时判断提示红点显示逻辑
            var parent = $("#urlDo1 a[href='"+url+"']").closest("ul").prev();
            if(url == "userapplyList.do" ||　url == "repairsList.do"){
                if(parent.hasClass("content_show")){//如果业务模块红点显示,则需要更新提示信息数量
                    var _tlsnum = parseInt(parent.attr("data-totalnum")) - parseInt($("#urlDo1 a[href='"+url+"']").attr("data-num"));
                    parent.attr("data-totalnum",_tlsnum);
                    if(!_tlsnum){//如果没有新的提示消息,则隐藏父模块的红点提示
                        parent.removeClass("content_show").addClass("content_hide");
                    }
                }
                $("#urlDo1 a[href='"+url+"']").attr("data-num",0).removeClass("content_show").addClass("content_hide");//如果点击当前模块为需事件推送的模块,则清除提醒红点信息
            }

            // 给匹配上的菜单栏加上active样式
            $('nav li:has(a[href="' + url + '"])').addClass("active");
            var title = $('nav a[href="' + url + '"]').text();
            // 改变页面title

            document.title = (title || document.title);
            loadURL(url + location.search, container);
        } else {
            if($.cookie("smid")){
                checkURL($.cookie("smid"));
            }else{
                var $this = $('nav > ul > li:first-child  a[href!="#"]');
                if($this.length){
                    checkURL($this.attr('href'));
                }else{//只有信息监测或消息权限时
                    checkURL(infoMessage[0]);
                }
            }
        }

    }

    // 加载ajax
    function loadURL(url, container) {
        smid = url; //权限未配置前临时赋值 以便页面刷新时不会跳转
        $(document).ajaxSend(//添加全局的头文件信息
            function (event, jqXHR, options) {
            }
        );
        $.ajax({
            type: "GET",
            url: url,
            dataType: 'html',
            cache: true, // (warning: this will cause a timestamp and will call the request twice)
            beforeSend: function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("appKey", "LexingInternalApp");
                container.html('<h1><i class="fa fa-cog fa-spin"></i> 加载中</h1>');
                // Only draw breadcrumb if it is main content material
                // TODO: see the framerate for the animation in touch devices

                if (container[0] == $("#content")[0]) {
                   // drawBreadCrumb();//更新面包屑
                    $("html").animate({
                        scrollTop: 0
                    }, "fast");
                }
            },
            success: function (data) {
                container.css({
                    opacity: '0.0'
                }).html(data).delay(50).animate({
                    opacity: '1.0'
                }, 300);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                container.html('<h4 style="margin-top:10px; display:block; text-align:left"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>');
            },
            async: false
        });
    }

    // 更新面包屑
    function drawBreadCrumb() {
        var nav_elems = $('nav li.active > a'), count = nav_elems.length;
        $.bread_crumb.empty();
        $.bread_crumb.append($("<li><a>首页</a></li>"));
        nav_elems.each(function () {
            $.bread_crumb.append($("<li></li>").html("<a>" + $.trim($(this).clone().children(".badge").remove().end().text())));
            //面包屑更新完后更新title
            if (!--count) document.title = $.bread_crumb.find("li:last-child").text();
        });
    }

    function pageSetUp() {
        if ($.device === "desktop") {
            nav_page_height();
        } else {
            nav_page_height();
        }
    }

    $.app = {
        pageSetUp : function(){
            if ($.device === "desktop") {
                nav_page_height();
            } else {
                nav_page_height();

            }
        }
    }

    $.extend({
        checkCookie : function(){
            funMap=$.cookie('funMap');
            if (funMap!=null && funMap.length!=2)
            {
                funMap = $.cookie("funMap");
                smid = $.cookie("smid");
                funMap = basetools.strToJson(funMap);
            }else{
                funMap = {};
            }
        },
        closeEvent : function(){
            console.log(2);
            $.cookie('funMap',basetools.jsonToStr(funMap),{ expires: 1 });
            $.cookie('smid',smid,{ expires: 1 });
        },
        unLoadEvent : function(){
            $.cookie('funMap',basetools.jsonToStr(funMap),{ expires: 1 });
            $.cookie('smid',smid,{ expires: 1 });
        }
    });
/*

    return {
        pageSetUp : pageSetUp
    };*/

});