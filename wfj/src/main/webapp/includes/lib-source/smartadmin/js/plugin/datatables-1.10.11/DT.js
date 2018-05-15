define([],function(){
    /**
     * 作用:datatable工具
     * */

    //创建DT对象
    var DT = {};

    //重新包装数据格式
    DT.parseData = function(data){
        if(data.result!=null && data.result.list!=null){
            var resultData;
            if(Array.isArray(data.result.list))
            {
                resultData =  {
                    "aaData": data.result.list,
                    "iTotalRecords": data.result.totalRows,
                    "iRecordsDisplayrds": data.result.totalRows
                }
            }else if(Array.isArray(data.result.result.list)) {//result内部为带有统计信息列表
                resultData =  {
                    "aaData": data.result.result.list,
                    "iTotalRecords": data.result.totalRows,
                    "iRecordsDisplayrds": data.result.totalRows
                }
            }
            return resultData;
        }else{
            if(Array.isArray(data.result)){
                return {
                    "aaData": data.result,
                    "iTotalRecords": data.result.length,
                    "iRecordsDisplayrds": data.result.length
                };
            }else{
                return {
                    "aaData": [],
                    "iTotalRecords": 0,
                    "iRecordsDisplayrds": 0
                };
            }

        }
    }

    $.extend( $.fn.DataTable.ext.internal,{parseData : DT.parseData});//将parseData 函数添加到dataTable中

    /* 创建datatable*/
    DT.createTable = function(containerId,dt_options){
        var scrollHeight = $.mainHeight - 160;//根据当前窗口高度判断表格具体高度
        var tableId = containerId + "_table";
        var columns = dt_options.aoColumns;

        var _options = {
            showCheckbox : false,//是否显示复选框列
            hasTrBtn : true,//是否有行点击按钮
            unclickable : false, //行是否有单击事件  false 为有
            showSearch : true ,//是否显示搜索按钮
            subScrollHeight : 0 //sScrollY 滚动条高度差值
        };
        dt_options = $.extend(_options,dt_options);
        scrollHeight = scrollHeight + _options.subScrollHeight;

        if(dt_options.showCheckbox){//是否显示复选框列
            var chs = { "sTitle": '<b><input type="checkbox"  class="tab_checkall"  onclick="checkAll(this,\''+tableId+'\')"  /></b>'
                ,"bSortable": false, "sDefaultContent":'',"sWidth": "5%", "sClass": "center"};
            dt_options.aoColumns.unshift(chs);
        }

        var _sDom = "<'searchDiv row'<'dataTables_searchbar col-sm-10 col-xs-12'><'dataTables_toolbar col-sm-2 col-xs-12'>><'row-fluid inboxHeader'<'span6'f>r>t<'row-fluid inboxFooter'<'span6'i><'span6'l><'span6'p>>";
        if(!dt_options.toolbar){//如果不含工具按钮  则查询框宽度占100%
            _sDom = "<'searchDiv row'<'dataTables_searchbar col-sm-12 col-xs-12'>><'row-fluid inboxHeader'<'span6'f>r>t<'row-fluid inboxFooter'<'span6'i><'span6'l><'span6'p>>";
        }
        var settings = {
            "bPaginate": true,        //分页显示工具条显示控制
            "bDeferRender": true,
            "bFilter": false,         //页面搜索过滤显示控制
            "bSort": true,           //点击列动态排序是否启用控制
            "bInfo": true,           //是否消息提示
            "bAutoWidth": false,      //是否自适应宽度
            "bStateSave": true,      //保存状态到cookie
            "bProcessing": true,     //以指定当服务端正在处理数据的时候，是否显示“正在处理”这个提示信息
            "bServerSide": true,    //使用ajax，在服务器端整理数据,处理dataTable,如果开启前端排序不起作用
            "bRetrieve": true,      //是否开启自动检索
            "bDestroy": true,       //是否开启自动销毁
            "iDisplayStart" : 0,
            "iDisplayLength":15,
            "bLengthChange": true, // 用户是否可改变每页显示数量
            "aLengthMenu": [[15, 30, 45, 60], [15, 30, 45, 60]],
            "bScrollInfinite" : false,//是否开启不限制长度的滚动条 该选项无法和分页选项同时使用
            "sScrollY" : scrollHeight,
            "sDom": _sDom,
            "ajax": {
                "url": dt_options.url,
                "dataSrc": function(data){
                    parseData(data)
                },
                "type": "GET",
                "beforeSend": function(XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("token",token);
                },
                error : function(XMLHttpRequest, textStatus, errorThrown){
                    console.log(errorThrown);
                }
            },
            "language": {
                "url":"includes/lib/smartadmin/js/plugin/datatables-1.10.11/i18n.txt"
            },
            "aoColumns": columns,
            "aaSorting":dt_options.aaSorting || [0,"asc"],
            "initComplete": function( settings,json ) {//回调函数，原因：异步请求
                if(dt_options.initComplete){
                    dt_options.initComplete(settings , json);
                }
                if(dt_options.toolbar){
                    var toolbar = dt_options.toolbar;
                    DT.createToolbar({
                        "tableId":tableId,
                        "buttons":toolbar.buttons
                    });
                }
                if(dt_options.search_fields){
                    var fields = dt_options.search_fields;
                    DT.createSearch(dt_options.url,tableId,{
                        fields:fields
                    },dt_options.showSearch);
                }

                if(!(dt_options.toolbar || dt_options.search_fields)){//如果没有工具条和查询框 则隐藏查询工具框
                    $('#'+tableId+'_wrapper .searchDiv').hide();
                }
                if(!dt_options.unclickable){
                    DT.bindTrEvent(tableId,dt_options);//编写行基本事件
                }

            },
            "fnRowCallback": function(  row, data, displayIndex, displayIndexFull) {//回调函数，行事件
                if(dt_options.fnRowCallback){
                    dt_options.fnRowCallback(row, data, displayIndex, displayIndexFull);
                }
                if(dt_options.showCheckbox){//如果有复选框 ，则每行添加复选框列
                    $('td:eq(0)', row).html( '<b><input type="checkbox" class="tabCheckbox" onclick="tabCheck(this)" id="'+eval("data."+dt_options.aoColumns[1].mData)+'"  /></b>');
                }
            },
            "fnDrawCallback": function( oSettings , json){
                if(dt_options.fnDrawCallback){
                    dt_options.fnDrawCallback(oSettings , json);
                }
            }
        };
        //拓展配置
        var extra = dt_options.extra;
        if(extra){
            for(var key in extra){
                settings[key] = extra[key];
            }
        }
        var table = $('#'+tableId).dataTable( settings );
        return table;
    };

    /*创建工具条*/
    DT.createToolbar = function(btnObj){
        var tableId = btnObj.tableId;//表格ID
        var btns = btnObj.buttons;//按钮对象
        $.each( btns, function(index, btn)
        {
            if (typeof btn.callback == "function"){//按钮调用函数
                //添加按钮
                if ((!btn.fid ||($.inArray(btn.fid,funMap[smid])!= -1))  &&  ($("#" + btn.btnId).length == 0)){//判断当前按钮是否已经存在，不存在则添加
                    var btcontent = '<a id="'+btn.btnId+'"  fid="'+btn.fid+'"  class="btn btn-primary pull-right toolbar_btn" href="javascript:void(0);">' + btn.title + '</a>&nbsp;&nbsp;';
                    $("#" + tableId + "_wrapper div.dataTables_toolbar").append(btcontent);
                    //添加按钮事件
                    $("#" + btn.btnId).click(function(){
                        if(btn.callback){
                            btn.callback();
                        }
                    });
                }
            }
        });
    };

    /*点击搜索按钮时 刷新数据列表*/
    DT.reloadTable = function(url,tableId,fields){
        if(url.indexOf("?") >= 0){
            url = url.substring(0,url.lastIndexOf("?")+1);//修改初始时传递参数 点击搜索后重复传递该参数信息
            //url+= "&";
        }else{
            url+= "?";
        }
        $.each(fields,function(index){
            if(this.type == "label" || this.nosearch){//this.nosearch 默认没有此参数 设置为true时表示点击搜索按钮时不需要拼接此参数信息
                return true;
            }else{
                var fieldVal = $("#"+this.name).val().trim();//去掉搜索内容前后的空格
                if(this.type == 'radio'){//radio 取值方式不一样
                    fieldVal =  $('.radio[name="'+this.name+'"]>ins.checked').attr("cid"); //$(this).find("ins").attr("cid");
                }
                url += this.cid+"="+fieldVal;
                if(index < fields.length-1){
                    url += "&";
                }
            }

        });
        $('#'+tableId).DataTable().ajax.url(encodeURI(url)).load();
    };


    /**
     * 创建搜索框
     * content.cid url对应查询参数
     * content.newline 查询框是否另起一行
     * content.class  查询框标签label添加额外yangs  eg:label-sm ,label-lg
     * content.name 查询框id
     * content.display 查询框label名称
     * content.options 下拉框或 radio 选项信息 eg:[{'name':'zhangs','value':'1'},{'name':'lis','value':'2'}]
     * content.placeholder
     * content.detail 日期控件 format格式
     * content.checked radio 默认选中项值
     */
    DT.createSearch = function(url,tableId,fieldsObj,showSearch){
        var field = "<form class='form-inline'>";
        var labels = "";
        //遍历字段
        $.each( fieldsObj.fields, function(index, content)
        {
            if(content.newline){
                field += '</br>';
            }
            var cls = content.class ? content.class : "";
            field += '<div class="form-group">';
            var _placeholder = content.placeholder ? content.placeholder : "";
            switch (content.type) {
                case "text":
                    field += '<label class="'+cls+'" for="' + content.name + '">' + content.display + '&nbsp;</label>';
                    field += '<input type="text" id="' + content.name + '" class="form-control" placeholder="' + _placeholder + '">';
                    break;
                case "select":
                    var optionJSON = "";
                    //遍历options项
                    if(content.options){
                        $.each(content.options,function(i,op){
                            optionJSON += "<option value='" + op.value + "'>" + op.name + "</option>";
                        });
                    }
                    field += '<label class="'+cls+'" for="' + content.name + '">' + content.display + "&nbsp;</label>" ;
                    field += "<select id='" + content.name + "' class='form-control' >" + optionJSON + "</select>";
                    break;
                case "date":
                    field += '<label class="'+cls+'" for="' + content.name + '">' + content.display + "&nbsp;</label>" ;
                    field += "<input detail='"+content.detail+"' datetime='true' type='text' id=" + content.name + " class='form-control' placeholder=" + _placeholder + ">" ;
                    break;
                case "hidden":
                    field += '<input type="hidden" id="' + content.name + '"  value="'+content.value+'"  class="form-control">';
                    break;
                case "radio":
                    field += '<label>' + (content.display == '' ? '' : content.display +"&nbsp;") + "</label>";
                    if(content.options){
                        $.each(content.options,function(i,op){
                            field +='<div class="radio"  name="'+content.name+'"><ins cid="'+op.value+'" class='+(op.value == content.checked ? "checked" :"")+'></ins><span>'+op.name+'</span></div>&nbsp;&nbsp;&nbsp;';
                        });
                    }
                    break;
                case "label"://查询条件下方的统计文本
                    labels += '<label style="padding: 10px 0;"><label class="'+cls+'" style="text-align: right;padding: 0 5px">' + content.display +':</label><span id="'+content.cid+'"></span>'+'<span>'+content.name+'</span>'+'</label>&nbsp;&nbsp;';
                    break;
            }
            field += "</div>";
        });

        //添加搜索按钮
        if(showSearch){
            field += "<button class='btn btn-primary searchButton toolbar_btn' >查询</button>";
        }
        if(labels){
            field += "</br>"+labels;
        }
        field += "</form>";

        //添加
        $("#" + tableId + "_wrapper div.dataTables_searchbar").append(field);

        //datetimepicker
        $("input[datetime='true']").each(function(){
            var detail = $(this).attr("detail");
            var options = "";
            switch(detail)
            {
                case "hour":
                    options = {
                        format: 'yyyy-mm-dd hh:ii',
                        autoclose: true,
                        minView: 'hour',
                        language : 'zh-CN'
                    };
                    break;
                case "day":
                    options = {
                        format: 'yyyy-mm-dd hh',
                        autoclose: true,
                        minView: 'day',
                        language : 'zh-CN'
                    };
                    break;
                case "month":
                    options = {
                        format: 'yyyy-mm-dd',
                        autoclose: true,
                        minView: 'month',
                        language : 'zh-CN'
                    };
                    break;
                case "year":
                    options = {
                        format: 'yyyy-mm',
                        autoclose: true,
                        startView:'year',
                        minView: 'year',
                        language : 'zh-CN'
                    };
                    break;
                case "decade":
                    options = {
                        format: 'yyyy',
                        autoclose: true,
                        startView:'decade',
                        minView: 'decade',
                        language : 'zh-CN'
                    };
                    break;
            }
            $(this).datetimepicker(options);
        });

        //绑定按钮事件
        $("#" + tableId + "_wrapper .searchButton").click(function(event){
            event.preventDefault();
            event.stopPropagation();
            DT.reloadTable(url,tableId,fieldsObj.fields);
        });
    };

    /* 重新绑定行事件  */
    DT.bindTrEvent = function(tableId,dt_options){
        var lastTr;
        var clcobj = 'tr>td:not(:nth-child(1))';
        if(dt_options.showCheckbox && dt_options.hasTrBtn){
            clcobj = 'tr>td:not(:nth-child(1),:nth-last-child(1))';
        }else if(dt_options.showCheckbox){//如果有复选框 ,则点击第一列时不触发行事件
            clcobj = 'tr>td:not(:nth-child(1))';
        }else if(dt_options.hasTrBtn){
            clcobj = 'tr>td:not(:nth-last-child(1))';
        }else{
            clcobj = 'tr>td';
        }

        $('#'+tableId+' tbody').on('click', clcobj, function () {
            var selTr = $(this).closest("tr");
            var aData = $('#'+tableId).dataTable().fnGetData(selTr);
            if(!lastTr || (selTr[0] == lastTr[0])){
                selTr.toggleClass('selectTr');
            }else{
                $('#'+tableId+' tbody tr').removeClass("selectTr");
                selTr.addClass('selectTr');
            }
            if(selTr.hasClass("selectTr")){
                if(dt_options.onRowClick){
                    dt_options.onRowClick( aData );
                }
                $(".opp_result").removeClass("opp_unactive").addClass("opp_active");
            }else{
                $(".opp_result").removeClass("opp_active").addClass("opp_unactive");
            }
            lastTr = selTr;
        });
    };

    this.checkAll = function(all,id){
        $("#"+id+" tbody td:first-child input[type=checkbox]").prop("checked",$(all).is(":checked"));
       /* if($(all).is(":checked")){
            $("#"+id+" tbody tr td:first-child").each(function(){
                $(this).find("input[type=checkbox]").prop("checked",true);
            });
        }else{
            $("#"+id+" tbody tr td:first-child").each(function(){
                $(this).find("input[type=checkbox]").prop("checked",false);
            });
        }*/
    }

    this.tabCheck = function(a){
        if($(a).is(":checked")){
            $(a).prop("checked",true);
        }else{
            $(a).prop("checked",false);
        }
    }
    return DT;
});