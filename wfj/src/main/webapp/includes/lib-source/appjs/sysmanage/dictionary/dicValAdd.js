define(['DT','basetools'],function(DT,basetools){
    var init = function(){
        $.app.pageSetUp();
        $("#agencyCode").val(agencyCode);
        var dicTab;
        dicTab = DT.createTable('dicval',{
            'url': $.apiPath+moduleName.dictionary+ $.apijoin+'dictionary'+ $.apijoin+$('#dictCode').val()+ $.apijoin+'entries'+ $.apijoin+'page?agencyCode='+agencyCode ,
            'aaSorting':[[ 1, 'asc' ]],
            'unclickable':true,
            'extra' : {'sScrollY' : '230px'},
            'aoColumns': [   //列映射
                { 'sTitle': 'sequenceNBR',   'mData': 'sequenceNBR','bVisible':false},
                { 'sTitle': 'orderNum',   'mData': 'orderNum', 'bVisible':false},
                { 'sTitle': '字典KEY',   'mData': 'entryKey', 'sWidth': '20%','sClass': 'center',bSortable:false},
                { 'sTitle': '字典VALUE',  'mData': 'entryValue', 'sWidth': '20%','sClass': 'center',bSortable:false},
                { 'sTitle': '字典值描述',  'mData': 'description', 'sWidth': '25%','sClass': 'center',bSortable:false},
                { 'sTitle': '状态',  'mData': 'lockStatus', 'sWidth': '15%','sClass': 'center',render:function(data,type,row,meta){
                    return  row.lockStatus=='Y' ? "禁用":"启用";
                }},
                { 'sTitle': '操作', 'sDefaultContent':'','sWidth': '20%', 'sClass': 'center','bSortable': false,render:function(data,type,row,meta){
                    var renderStr =  [] ;
                    var locs = (row.lockStatus=='Y' ?
                        ('<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="dicValStatus(\''+row.entryKey+'\',\''+$("#dictCode").val()+'\',\''+meta.row+'\')">' +
                        '&nbsp;启用&nbsp;</a>'):
                        ('<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="dicValStatus(\''+row.entryKey+'\',\''+$("#dictCode").val()+'\',\''+meta.row+'\')">' +
                        '&nbsp;禁用&nbsp;</a>'));
                    renderStr.push(locs);
                    renderStr.push('<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="dicValDel(\''+row.entryKey+'\',\''+$("#dictCode").val()+'\')">'+
                        '&nbsp;删除&nbsp;</a>');
                    return renderStr.join('  ');
                }}
            ],
            'fnDrawCallback': function (settings) {
                var $this;
                $('#dicval_table tbody tr td:nth-child(2),#dicval_table tbody tr td:nth-child(3)').css('cursor','pointer').editable(
                    function(){
                        var index = dicTab.fnGetPosition(this);
                        var rowData =  dicTab.fnGetData(index[0]);
                        return $.apiPath+moduleName.dictionary+ $.apijoin+'dictionary'+ $.apijoin+$('#dictCode').val()+ $.apijoin+'entry'+ $.apijoin+rowData.entryKey;
                    }, {
                        callback: function( data, settings) {
                            if(data.status=='200'){
                                $('#error_tip').html('');
                                $('#error_div').attr('style', 'display:none;');
                                basetools.backTip(data,'Y');
                                dicTab.fnDraw();
                              //  $('#dicval_table').dataTable().fnUpdate(data.result,row,null,false);
                            }else {
                                $('#error_div,#error_tip').attr('style', 'display:;');
                                $('#error_tip').html('<em  class="invalid">' + data.message + '</em>');
                            }
                        },
                        type : 'textarea',//'text'
                        height: '90%',
                        width : '95%',
                        method : 'put',
                        submit : '保存',
                        flag : 1,
                        name:function (){ //input的name
                            return $('#dicval_table').DataTable().column(dicTab.fnGetPosition($this)[2]).dataSrc();
                        },
                        ajaxoptions : {
                            dataType : 'json',
                            beforeSend: function (XMLHttpRequest) {
                                XMLHttpRequest.setRequestHeader('token', token);
                                XMLHttpRequest.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
                            }
                        },
                        submitdata : function(value, settings) {
                            var index = dicTab.fnGetPosition(this);
                            var col = $('#dicval_table').DataTable().column(index[2]).dataSrc();
                            var str = '{"'+col+'":"'+$(this).find("textarea").val()+'"}';
                            return eval("("+str+")");
                        },
                        onedit : function(settings,td){
                            $this = td;
                        },
                        onsubmit: function(settings, td){
                            var index = dicTab.fnGetPosition(td);
                            var col = $('#dicval_table').DataTable().column(index[2]).dataSrc();
                            $(this).validate({
                                errorElement : 'em',
                                errorContainer : '#error_div',
                                errorLabelContainer : '#error_tip',
                                rules: {
                                    dictDataValue:{
                                        required : true,
                                        maxlength : 200
                                    },
                                    dictDataDesc:{
                                        maxlength : 200
                                    }
                                },
                                messages: {
                                    dictDataValue:{
                                        required : ' 字典VALUE不能为空',
                                        maxlength : ' 字典VALUE不能超过200个字符'
                                    },
                                    dictDataDesc:{
                                        maxlength : ' 字典值描述不能超过200个字符'
                                    }
                                },
                                errorClass: 'invalid'
                            });
                            return ($(this).valid());
                        }

                    });
            }

        });

        var ifChange = false;
        $('#dicvaladd_form input,textarea').change(function (){ifChange = true;});
        $('#dicvaladd_form').validate({
            errorElement : 'em',
            errorContainer : '#error_div',
            errorLabelContainer : '#error_tip',
            rules : {
                entryKey : {
                    required : true,
                    maxlength : 16,
                    isBusinessNo : true,
                    remote:{
                        type:'get',
                        cache:false,
                        url : function(){return $.apiPath+moduleName.dictionary+ $.apijoin+'dictionary'+ $.apijoin+$('#dictCode').val()+ $.apijoin+'entry'+ $.apijoin+$('#entryKey').val()+ $.apijoin+'available'},
                        data:{key:function(){return $('#entryKey').val();},
                             code:function(){return $('#dictCode').val();},
                             agencyCode:agencyCode},
                        beforeSend: function(XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader('token',token);
                            XMLHttpRequest.setRequestHeader('Content-Type','application/json;charset=utf-8');
                        }
                    }
                },
                entryValue:{
                    required : true,
                    maxlength : 200
                },
                description:{
                    maxlength : 200
                }
            },
            // Messages for form validation
            messages : {
                entryKey : {
                    required : ' 字典KEY不能为空；',
                    maxlength : ' 字典KEY不能超过16个字符；',
                    isBusinessNo :' 字典KEY只接受字母,数字,下划线；',
                    remote : ' 字典KEY已经存在；'
                },
                entryValue:{
                    required : ' 字典VALUE不能为空；',
                    maxlength : ' 字典VALUE不能超过200个字符；'
                },
                description:{
                    maxlength : ' 字典值描述不能超过200个字符；'
                }
            },
            // Ajax form submition
            submitHandler : function(form) {
                var json = $('#dicvaladd_form').form2json();
                $.restAjax({
                    url :$.apiPath+moduleName.dictionary+ $.apijoin+'dictionary'+ $.apijoin+$('#dictCode').val()+ $.apijoin+'entry',
                    type:'POST',
                    dataType : 'json',
                    data:json,
                    async:false,
                    success : function(data) {
                        if(data.status=='200'){
                            $('#dicvaladd_form').resetForm();
                            $('#entryKey').removeData('previousValue');
                            $('#dicvaladd_form input[type="text"],textarea').val('');
                            $('#dicval_table').DataTable().ajax.reload();
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            }
        });

        $('#dicval_cancel').click(function(){
            if(ifChange){
                $.confirm({
                    title: '确认信息',
                    content: '确认取消当前所做的操作',
                    confirmButton: '是',
                    cancelButton: '否',
                    confirm: function (){
                        $('#dicval_close').click();
                    }
                })
            }else{
                $('#dicval_close').click();
            }
        });
    };


    /*    this.urlFun = function (par1,par2){
            if(!par1 && !par2){
                return $.apiPathV1+'common'+ $.apijoin+'standardChoices'+ $.apijoin+$('#'+par1).val()+ $.apijoin+'values'+ $.apijoin+$('#'+par2).val()+ $.apijoin+'exist'
            }else{
                return ;
            }
        };*/

    this.dicValDel = function(key,code){
        $.confirm({
            title: '确认信息',
            content: '确认取消当前所做的操作',
            confirmButton: '是',
            cancelButton: '否',
            confirm: function (){
                $.restAjax({
                    url : $.apiPath+moduleName.dictionary+ $.apijoin+'dictionary'+ $.apijoin+code+ $.apijoin+'entries' ,
                    type:'delete',
                    data:JSON.stringify([key]),
                    success : function(data) {
                        if(data.status=='200'){
                            $('#dicval_table').DataTable().ajax.reload();
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            }
        });
    };

    //启用 禁用字典值
    this.dicValStatus = function (key,code,row){
        $.restAjax({
            url : $.apiPath+moduleName.dictionary+ $.apijoin+'dictionary'+ $.apijoin+code+ $.apijoin+'entry'+ $.apijoin+key+ $.apijoin+'lockStatus' ,
            type:'put',
            dataType : 'json',
            success : function(data) {
                if(data.status=='200'){
                    $('#dicval_table').dataTable().fnUpdate(data.result,row,null,false);
                    basetools.backTip(data,'Y');
                }
            }
        });
    };

    return {init : init}
});