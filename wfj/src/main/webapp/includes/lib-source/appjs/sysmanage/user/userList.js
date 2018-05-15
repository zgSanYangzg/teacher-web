define(['DT','basetools'],function(DT,basetools){
    function userTabinit(){
        $.app.pageSetUp();
        DT.createTable("user",{
            "url": $.apiPath+moduleName.user+ $.apijoin+"employee"+ $.apijoin+"page?agencyCode="+agencyCode,
            //"showCheckbox" : true,
            "extra":{"bSort": false},
            "aoColumns": [   //列映射
                { "sTitle": "userId",   "mData": "userId", "sClass": "center","bVisible":false},
                { "sTitle": "用户工号", "mData": "employeeCode", "sClass": "center"},
                { "sTitle": "姓名",   "mData": "userName", "sClass": "center"},
                { "sTitle": "岗位",  "mData": "roleName", "sClass": "center"},
                { "sTitle": "电话",  "mData": "mobile","sClass": "center"},
                { "sTitle": "锁定状态",  "mData": "lockStatus","sClass": "center",render:function(data,type,row,meta){
                    return row.lockStatus=='Y' ? "禁用" : "启用";
                }},
                { "sTitle": "操作",   "sDefaultContent": "","sClass": "center",render:function(data,type,row,meta){
                    var renderStr =  [
                        (row.lockStatus=='Y' ?
                            ('<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="userLock(\''+row.userId+'\',\''+meta.row+'\')">&nbsp;启用&nbsp;</a>'):
                            ('<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="userLock(\''+row.userId+'\',\''+meta.row+'\')">&nbsp;禁用&nbsp;</a>'))
                        ,'<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="userEdit(\''+row.userId+'\',\''+meta.row+'\')">&nbsp;编辑&nbsp;</a>'
                    ].join('  ') ;
                   return  '<b>'+renderStr+'</b>';
                }}
            ],
            "toolbar" : {
                "buttons":[
                    {
                        "btnId":"user_add",
                        "title":"创建",
                        "callback":function(){
                            $("#user_modal").modal({
                                backdrop:'static',
                                remote: "user/userAdd"
                            });
                        }
                    }
                ]
            }
        });

        $("#dept_tree").treeview({
            url :$.apiPath+moduleName.dept+ $.apijoin+'departments'+ $.apijoin+'tree?agencyCode='+agencyCode,
            text : 'departmentName',
            id : 'departmentCode',
            persist : "cookie",
            ajax: {
                type:"get",
                cache:false,
                beforeSend: function(XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("token",token);
                    XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset=utf-8");
                }
            }
        });

        $(".treeview").on("click","span",function(){
            $(".treeview span").removeClass("spanck");
            $(this).addClass("spanck");
            var pid = $(this).parent().attr("id");
            if(pid === "-1"){
                pid = "";
            }
            var url = $.apiPath+moduleName.user+ $.apijoin+"employee"+ $.apijoin+"page?agencyCode="+ agencyCode+"&departmentCode="+pid ;
            $('#user_table').DataTable().ajax.url(encodeURI(url)).load();
        });

        $("#user_modal").on("hidden.bs.modal", function() {
            $(this).removeData("bs.modal");
        });
    }

    this.userLock = function(id,row){    //  启用/禁用
        $.confirm({
            title: '确认信息',
            content: '是否确认当前所做的操作。',
            confirmButton: "是",
            cancelButton: "否",
            confirm: function (){
                $.restAjax({
                    url : $.apiPath+moduleName.user+ $.apijoin+"employee"+ $.apijoin +id + $.apijoin +"lockStatus",
                    type:"put",
                    success : function(data) {
                        if(data.status=="200"){
                            $('#user_table').dataTable().fnDeleteRow(row,null,true);
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            }
        })
    };

    this.userEdit = function(id,row){
        $("#user_modal").modal({
            backdrop:'static',
            remote: "user/userEdit?id="+id+"&row="+row
        });
    };

    return {userTabinit : userTabinit}
});