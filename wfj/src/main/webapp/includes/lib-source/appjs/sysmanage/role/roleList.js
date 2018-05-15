define(['DT','basetools'],function(DT,basetools){
    var roleTabInit = function(){
        $.app.pageSetUp();
        DT.createTable("role",{
            "url": $.apiPath+moduleName.role+ $.apijoin+"roles"+ $.apijoin+"page" ,
            "aoColumns": [   //列映射
                { "sTitle": "sequenceNBR",   "mData": "sequenceNBR", "sClass": "center","bVisible":false},
                { "sTitle": "岗位编码",  "mData": "roleCode", "sClass":"left"},
                { "sTitle": "岗位名称", "mData": "roleName", "sClass": "left"},
                { "sTitle": "说明",  "mData": "description", "sClass": "left"},
                { "sTitle": "锁定状态",  "mData": "lockStatus","sClass": "center",render:function(data,type,row,meta){
                    return row.lockStatus=='Y' ?  "禁用":"启用";
                }},
                { "sTitle": "操作",   "sDefaultContent": "", "sClass": "center",render:function(data,type,row,meta){
                    var renderStr =  [
                        (row.lockStatus=='Y' ?
                            ('<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="roleLocked(\''+row.roleCode+'\',\''+meta.row+'\')">&nbsp;启用&nbsp;</a>'):
                            ('<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="roleLocked(\''+row.roleCode+'\',\''+meta.row+'\')">&nbsp;禁用&nbsp;</a>'))
                        ,'<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="roleEdit(\''+row.roleCode+'\',\''+meta.row+'\')">&nbsp;编辑&nbsp;</a>'
                        ,'<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="roleDel(\''+row.roleCode+'\',\''+meta.row+'\')">&nbsp;删除&nbsp;</a>'
                    ].join('  ') ;
                    return '<b>'+renderStr+'</b>';
                }}
            ],
          //  "showCheckbox":true,
            "extra":{"bSort": false},
            "search_fields" : [
                {display:"岗位名称",name:"roleNameSearch",type:"text",cid:"roleName"},
                {display:"岗位编码",name:"roleCodeSearch",type:"text",cid:"roleCode"}
            ],
            "toolbar" : {
                "buttons":[
                    {
                        "btnId":"add_role",
                        "title":"创建",
                        "callback":function(){
                            $("#role_modal").modal({
                                backdrop:'static',
                                remote: "role/roleAdd"
                            });
                        }
                    }
                ]
            }
        });


        $("#role_modal").on("hidden.bs.modal", function() {
            $(this).removeData("bs.modal");
        });
    };

    this.roleEdit = function(roleCode,row){
        $("#role_modal").modal({
            backdrop:'static',
            remote: "role/roleEdit?id="+roleCode+"&row="+row
        });
    };

    this.roleLocked = function(roleCode,row){
        $.confirm({
            title: '确认信息',
            content: '是否确认当前所做的操作。',
            confirmButton: "是",
            cancelButton: "否",
            confirm: function (){
                $.restAjax({
                    url :$.apiPath+moduleName.role+ $.apijoin+"roles"+ $.apijoin+ roleCode + $.apijoin+"lockStatus",
                    type:"PUT",
                    dataType : "json",
                    success : function(data) {
                        if(data.status =="200"){
                            $('#role_table').dataTable().fnDeleteRow(row,null,true);
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            }
        })
    };

    this.roleDel = function(roleCode,row){
        $.confirm({
            title: '确认信息',
            content: '是否删除所选信息。',
            confirmButton: "是",
            cancelButton: "否",
            confirm: function (){
                $.restAjax({
                    url : $.apiPath+moduleName.role+ $.apijoin+"roles" ,
                    type:"delete",
                    data:JSON.stringify([roleCode]),
                    success : function(data) {
                        if(data.status=="200"){
                            $('#role_table').dataTable().fnDeleteRow(row,null,true);
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            }
        });
    };

    return {roleTabInit : roleTabInit}
});