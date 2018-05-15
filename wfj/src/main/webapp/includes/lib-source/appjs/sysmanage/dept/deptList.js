define(['DT','basetools'],function(DT,basetools){
    function deptTabInit(){
        $.app.pageSetUp();
        DT.createTable("dept",{
            "url": $.apiPath+moduleName.dept+ $.apijoin+"departments"+ $.apijoin+"page?parentCode=-1",
            "extra":{"bSort": false},
            "aoColumns": [   //列映射
                { "sTitle": "sequenceNBR",   "mData": "sequenceNBR", "sClass": "center", "bVisible":false},
                { "sTitle": "部门名称",   "mData": "departmentName", "sClass": "center"},
                { "sTitle": "部门编码",   "mData": "departmentCode", "sClass": "center"},
                { "sTitle": "说明",   "mData": "description", "sClass": "center"},
                { "sTitle": "操作",   "sDefaultContent": "","sClass": "center",render: function(data, type, row, meta){
                    var renderStr =  [
                        '<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="deptEdit(\''+row.departmentCode+'\','+meta.row+')">&nbsp;编辑&nbsp;</a>',
                        '<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="deptDel(\''+row.departmentCode+'\')">&nbsp;删除&nbsp;</a>'
                    ].join('  ') ;
                    return renderStr
                }}
            ],
            "toolbar" : {
                "buttons":[
                    {
                        "btnId":"dept_add",
                        "title":"创建",
                        "callback":function(){
                            var pid = $(".treeview span.spanck").parent().attr("id");
                            var level = $(".treeview span.spanck").parent().attr("level");
                            var newlevel = parseInt(level=="" ? 0:level)+1;
                            $("#dept_model").modal({
                                backdrop:'static',
                                remote: "dept/deptAdd?pid="+pid+"&level="+newlevel
                            });
                        }
                    }
                ]
            },
            "onRowClick":function(aData){
                $.restAjax({
                    url : $.apiPath+moduleName.dept+ $.apijoin+"departments"+ $.apijoin+aData.departmentCode ,
                    type:"get",
                    cache:false,
                    success : function(data) {
                        if(data.status == '200' && data.result){
                            $('#dept_formdetail').removeAttr("loadedinit");
                            $('#dept_formdetail').json2form({data:data.result,'iflabel':true});
                        }
                    }
                });
            }
        });

        $("#dept_tree").treeview({
            url : $.apiPath+moduleName.dept+ $.apijoin+'departments'+ $.apijoin+'tree?agencyCode='+agencyCode,
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
            var url = $.apiPath+moduleName.dept+ $.apijoin+"departments"+ $.apijoin+"page?parentCode="+pid;
            $('#dept_table').DataTable().ajax.url(encodeURI(url)).load();
        });

        $("#dept_model").on("hidden.bs.modal", function() {
            $(this).removeData("bs.modal");
            $(".opp_result").removeClass("opp_active").addClass("opp_unactive");
        });
    }


    this.deptEdit = function(id,row){//编辑
        $("#dept_model").modal({
            backdrop:'static',
            remote: "dept/deptEdit?id="+id+"&row="+row
        });
    };

    this.deptDel = function(id){
        $.confirm({
            title: '确认信息',
            content: '是否删除所选信息。',
            confirmButton: "是",
            cancelButton: "否",
            confirm: function (){
                $.restAjax({
                    url : $.apiPath+moduleName.dept+ $.apijoin+"departments",
                    type:"delete",
                    data:JSON.stringify([id]),
                    success : function(data) {
                        if(data.status=="200"){
                            $("#dept_tree").treeview({removeNode: $("li#"+id)});
                            $("#dept_table").DataTable().ajax.reload();
                            $(".opp_result").removeClass("opp_active").addClass("opp_unactive");
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            },
            cancel: function () {
                $(".opp_result").removeClass("opp_active").addClass("opp_unactive");
            }
        });
    };

    return {deptTabInit : deptTabInit}
});