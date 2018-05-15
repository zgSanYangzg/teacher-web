define(['DT','basetools'],function(DT,basetools){
    var resourceTab;//生成的表格对象
    var init = function(){
        $.app.pageSetUp();
        runFunDataTables();
        //切换角色，用户
        $('#resnavTab a').click(function (e) {
            $("#resource_table input[type='checkbox']").prop("checked",false);//重置选项
            $("#saveres").attr("disabled",true);
            $("#role_table tr,#user_table tr").removeClass("selectTr");//移除选中行状态
            $(".ctd").hide();//隐藏每个模块资源列表的总复选框
            $("#resource_table_wrapper tr th:nth-child(4),#resource_table_wrapper tr td:nth-child(4)/*,#resource_table_wrapper tr th:nth-child(5),#resource_table_wrapper tr td:nth-child(5)*/").hide();//隐藏选项列
        });

        //分配资源点击事件
        $("#role_table,#user_table").on("click","a",function(){
            $("#role_table tr,#user_table tr").removeClass("selectTr");
            $(".ctd").show();//显示每个模块资源列表的总复选框
            $("#resource_table_wrapper tr th:nth-child(4),#resource_table_wrapper tr td:nth-child(4)/*,#resource_table_wrapper tr th:nth-child(5),#resource_table_wrapper tr td:nth-child(5)*/").show();//显示选项列
            $(this.parentNode.parentNode.parentNode).addClass("selectTr");//选中行添加区别样式
            $("#resource_table input[type='checkbox']").prop("checked",false);//重置选中状态
            $("#saveres").removeAttr("disabled");
            $("#resource_table  tbody tr[role='row']").each(function(){
                $(this).find(">td:eq(0)>i").removeClass("glyphicon glyphicon-plus-sign").addClass("glyphicon glyphicon-minus-sign");
                resourceTab.fnOpen(this, fnFormatDetails(this,true), 'details');
            });

            /*$.restAjax({
                url : $.apiPath+moduleName.resource+ $.apijoin+"privileges"+ $.apijoin+$("#resnavTab>li.active>a").attr("role")+ $.apijoin+$(this).attr("id") ,
                type:"get",
                cache:false,
                success : function(data) {
                    if(data.status=="200"){
                        if(data.result){
                            var fcks = data.result.privilegeFIds;
                            if(fcks){
                                fcks.forEach(function(fbj){
                                    var cid = fbj[2]+'F';
                                    $("#resource_table ."+fbj[0]+" ."+fbj[1]+" input[cid="+cid+"]").prop("checked",true);
                                });
                            }
                        }
                    }
                }
            });*/
        });

        //点击只读或允许的按钮，选中一个模块的所有的对应按钮，全选
        $(document).on("click","#fall,#rall",function(){
            if($(this).attr("id")=="fall"){
                if($(this).prop("checked")){
                    $(this).closest("tr").next().find("input[role='allowCk']").prop("checked",true);
                    $(this).closest("tr").next().find("input[role='readCk']").prop("checked",false);
                }else{
                    $(this).closest("tr").next().find("input[role='allowCk']").prop("checked",false);
                }
            }else if($(this).attr("id")=="rall"){
                if($(this).prop("checked")){
                    $(this).closest("tr").next().find("input[role='readCk']").prop("checked",true);
                    $(this).closest("tr").next().find("input[role='allowCk']").prop("checked",false);
                }else{
                    $(this).closest("tr").next().find("input[role='readCk']").prop("checked",false);
                }
            }

        });

        $(document).on("click","#resource_table input[type='checkbox']",function(){//反选
            $(this.parentNode.parentNode.parentNode).siblings().find("input[type='checkbox']").prop("checked",false);
        });

        $('#resnavTab a:last').click(
            function(){
                $("#res2").show();
                DT.createTable("user",{
                    "url":  $.apiPath+moduleName.user+ $.apijoin+"employee"+ $.apijoin+"page"+"?agencyCode="+agencyCode+"&lockStatus=N&exSuper=Y" ,
                    "extra":{"bLengthChange": false,"iDisplayLength":10,"bSort": false},
                    "unclickable" : true,
                    "aoColumns": [
                        { "sTitle": "sequenceNBR",   "mData": "sequenceNBR", "sClass": "center","bVisible":false},
                        { "sTitle": "工号", "mData": "employeeCode", "sWidth": "20%","sClass": "center"},
                        { "sTitle": "姓名", "mData": "userName", "sWidth": "30%","sClass": "left"},
                        { "sTitle": "岗位", "mData":"roleName", "sWidth": "30%","sClass": "left",render:function(data, type, row, meta){return (data&&data.length)?data.join(','):'-'}},
                        { "sTitle": "操作", "sDefaultContent": "", "sWidth": "20%","sClass": "center"}
                    ],
                    "fnRowCallback": function( row, data, displayIndex, displayIndexFull ) {
                        $('td:eq(3)', row).html( '<b><a class="btn btn-primary" id="'+data.userId+'">分配资源</a></b>' );
                    }
                });
            }
        );
    }

    //权限信息初始化
    this.runFunDataTables = function(){
        resourceTab = DT.createTable("resource",{
            "url":  $.apiPath+moduleName.resource+ $.apijoin+"permissions" ,
            "aaSorting": [1, 'asc'],
            "aoColumns": [   //列映射
                { "sTitle": "资源",   "sDefaultContent": "","sWidth": "10%", "sClass": "center", "bSortable": false},
                { "sTitle": "moduleCode",   "mData": "MODULE_CODE", "bVisible":false},
                { "sTitle": "资源操作", "mData": "MODULE_NAME","sWidth": "35%", "sClass": "center" , "bSortable": false},
                { "sTitle": "resourceCode",   "mData": "RESOURCE_CODE", "bVisible":false},
                { "sTitle": "resourceName",   "mData": "RESOURCE_NAME", "bVisible":false},
                { "sTitle": "描述", "sDefaultContent": "","sWidth": "35%", "sClass": "center" , "bSortable": false},
                { "sTitle": "允许",  "sDefaultContent": "", "sWidth": "10%","sClass": "center", "bSortable": false}
            ],
            "extra":{"bPaginate": false,"bInfo": false},//,"sScrollY" : 'disabled'
            "unclickable" : true,
            "subScrollHeight" : 55,
            "toolbar" : {
                "buttons":[
                    {
                        "btnId":"saveres",
                        "title":"保存",
                        "callback":function(){
                            saveResource();
                        }
                    }
                ]
            },
            "fnRowCallback": function( row, data, displayIndex, displayIndexFull ) {
                //每行生成每个模块资源列表的标题（可折叠）和总复选框
                $(row).html('<td class="left" colspan="3" style="background-color: #ecf3f8"></td>' +
                    '<td class="ctd" style="background-color: #ecf3f8">' +
                    '<form class="smart-form"><label class="radio" style="margin-top: -5px;left:32%;width: 1px;"><input type="checkbox" id="fall"/><i></i></label></form>' +
                    '</td></td>');
                //标题前加“+”“-”的折叠图标
                $('td:eq(0)', row).html( '<i style="color:#004f86;font-weight: bold;" class="glyphicon glyphicon-minus-sign"  onclick="subTab(1,this)">  ' +
                    '  ('+data.MODULE_NAME+')-'+ (data.RESOURCE_NAME=="" ? data.RESOURCE_CODE : data.RESOURCE_NAME )+'</i>');
                resourceTab.fnOpen(row, fnFormatDetails(row,true), 'details');
            },
            "initComplete": function(settings, json) {
                $(".ctd").hide();
                $("#resource_table_wrapper tr th:nth-child(4),#resource_table_wrapper tr td:nth-child(4)/*,#resource_table_wrapper tr th:nth-child(5),#resource_table_wrapper tr td:nth-child(5)*/").hide();
            }
        });

        DT.createTable("role",{
            "url":  $.apiPath+moduleName.role+ $.apijoin+"roles"+ $.apijoin+"page?lockStatus=N" ,
            "aaSorting":[[1,"desc"]],
            "extra":{"bLengthChange": false,"iDisplayLength":10},
            "unclickable" : true,
            "aoColumns": [
                { "sTitle": "sequenceNBR",   "mData": "sequenceNBR", "bVisible":false},
                { "sTitle": "工号",   "mData": "roleCode", "bVisible":false},
                { "sTitle": "角色名称", "mData": "roleName","sWidth": "50%", "sClass": "left" },
                { "sTitle": "操作",  "sDefaultContent": "", "sWidth": "50%","sClass": "center", "bSortable": false}
            ],
            "fnRowCallback": function( row, data, displayIndex, displayIndexFull ) {
                $('td:eq(1)', row).html('<b><a class="btn btn-primary" id="'+data.roleCode+'">分配资源</a></b>');
            }
        });
    }

    this.subTab = function (id, ifun) {//1,this
        $this = ifun;
        var nTr = $this.parentNode.parentNode;
        if (ifun.className.match('glyphicon-minus-sign')) {
            ifun.className = 'glyphicon glyphicon-plus-sign';
            resourceTab.fnClose(nTr);
        }
        else {
            ifun.className = 'glyphicon glyphicon-minus-sign';
            var ifOpen = $(nTr).find("td.ctd").css("display")!="none";
            resourceTab.fnOpen(nTr, fnFormatDetails(nTr,ifOpen), 'details');
        }
    }

    //子表格信息
    this.fnFormatDetails = function (nTr,flag)//row,true
    {
        var stl = flag ? "" : "display:none";
        var aData = resourceTab.fnGetData(nTr);//该表格的当前行的所有数据
        var data = aData.roList;
        var sOut = '<table  class="table table-striped table-bordered table-hover" >';
        var len = data.length;
        for(var i=0;i<len;i++){
            sOut += '<tr class="'+data[i].moduleCode+'"><td width="10%"><input type="hidden" role="moduleCode" value="'+data[i].moduleCode+'"/><input type="hidden" role="resourceCode" value="'+data[i].resourceCode+'"/></td>';
            sOut += '<td width="35%">'+data[i].oprateName+'</td>';
            sOut += '<td width="35%">'+data[i].funcId+'</td>';
            sOut += '<td width="10%" class="'+data[i].resourceCode+'" style="'+stl+'"><form class="smart-form"><label class="radio" style="margin-top: -5px;left:32%;width: 1px;">' +
                '<input type="checkbox" name="ck'+i+ '" role="allowCk"  cid="'+data[i].funcId+'F" value="'+data[i].funcId+'"/><i></i></label></form></td>';
        }
        sOut += '</table>';
        return sOut;
    }
    //保存用户权限信息
    this.saveResource = function (){
        var allmaps = '';
        var readmaps = '';
        $.each($("#resource_table input[role='allowCk']"),function(){
            if($(this).prop("checked")){
                allmaps += '{"funcId":"'+$(this).attr("value")+'","resourceCode":"'+$(this).closest("tr").find("input[role='resourceCode']").val()+'","moduleCode":"'+$(this).closest("tr").find("input[role='moduleCode']").val()+'"},';
            }
        });
        if(allmaps.length!=0){
            allmaps = allmaps.substring(0,allmaps.length-1);
        }
        $.each($("#resource_table input[role='readCk']"),function(){
            if($(this).prop("checked")){
                readmaps += '{"funcId":"'+$(this).attr("value")+'","resourceCode":"'+$(this).closest("tr").find("input[role='resourceCode']").val()+'","moduleCode":"'+$(this).closest("tr").find("input[role='moduleCode']").val()+'"},';
            }
        });
        if(readmaps.length!=0){
            readmaps = readmaps.substring(0,readmaps.length-1);
        }
        $.restAjax({
            url : $.apiPath+moduleName.resource+ $.apijoin+"privileges" ,
            type:"post",
            dataType : "json",
            data:'{"pmType":"'+$("#resnavTab>li.active>a").attr("role").toUpperCase()+'","pmCode":"'+$(".selectTr a").attr("id")+'",' +
            '"privilegeF":['+allmaps+'],"privilegeR":['+readmaps+']}',
            success : function(data) {
                if(data.status=="200"){
                    basetools.backTip(data,'Y');
                }else{
                    basetools.backTip(data,'N');
                }
            }
        });
    }

    return {init:init}
});