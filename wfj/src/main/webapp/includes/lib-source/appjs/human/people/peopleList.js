define(['DT','basetools'],function(DT,basetools){
    var peopleTabInit = function(){
        $.app.pageSetUp();
        DT.createTable("people",{
            "url": $.apiPath+moduleName.people+ $.apijoin+"human"+ $.apijoin+"social" ,
            "aoColumns": [   //列映射
                { "sTitle": "sequenceNBR",   "mData": "sequenceNBR", "sClass": "center","bVisible":false},
                { "sTitle": "档案编号",  "mData": "userNo", "sClass":"left"},
                { "sTitle": "姓名",  "mData": "userName", "sClass":"left"},
                { "sTitle": "性别", "mData": "userSex", "sClass": "center",render:function(data,type,row,meta){
                    return row.userSex==0?'女':"男";
                }},
                { "sTitle": "身份证",  "mData": "userIdcard", "sClass": "left"},
                { "sTitle": "电话",  "mData": "userPhone", "sClass": "left"},
                { "sTitle": "生日",  "mData": "userBirthday", "sClass": "left"},
                { "sTitle": "民族",  "mData": "userNatinoal","sClass": "left"},
                { "sTitle": "操作",   "sDefaultContent": "", "sClass": "center",render:function(data,type,row,meta){
                    var renderStr =  [
                        '<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="peopleEdit(\''+row.sequenceNBR+'\',\''+meta.row+'\')">&nbsp;编辑&nbsp;</a>'
                        ,'<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="peopleDel(\''+row.sequenceNBR+'\',\''+meta.row+'\')">&nbsp;删除&nbsp;</a>'
                    ].join('  ') ;
                    return '<b>'+renderStr+'</b>';
                }}
            ],
            //  "showCheckbox":true,
            "extra":{"bSort": false},
            "search_fields" : [
                {display:"姓名",name:"userNameSearch",type:"text",cid:"userName"}
            ],
            "toolbar" : {
                "buttons":[
                    {
                        "btnId":"add_peopleId",
                        "title":"创建",
                        "callback":function(){
                            $("#people_modal").modal({
                                backdrop:'static',
                                remote: "people/peopleAdd"
                            });
                        }
                    }
                ]
            }
        });


        $("#people_modal").on("hidden.bs.modal", function() {
            $(this).removeData("bs.modal");
        });
    };

    this.peopleEdit = function(peopleCode,row){
        $("#people_modal").modal({
            backdrop:'static',
            remote: "people/peopleEdit?userId="+peopleCode+"&row="+row
        });
    };


    this.peopleDel = function(peopleCode,row){
        $.confirm({
            title: '确认信息',
            content: '是否删除所选信息。',
            confirmButton: "是",
            cancelButton: "否",
            confirm: function (){
                $.restAjax({
                    url : $.apiPath+moduleName.people+$.apijoin+"human"+ $.apijoin+"social"+$.apijoin+ peopleCode ,
                    type:"delete",
                    success : function(data) {
                        if(data.status=="200"){
                            $('#people_table').dataTable().fnDeleteRow(row,null,true);
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            }
        });
    };

    return {peopleTabInit : peopleTabInit}
});