define(['basetools'],function(basetools){
    var init = function(){
        var ifChange = false;
        $("#deptadd_form input,textarea").change(function (){ifChange = true;});
        $("#deptadd_form").validate({
            errorElement : "em",
            errorContainer : "#errordiv",
            errorLabelContainer : "#errortip",
            rules : {
                departmentName:{
                    required : true,
                    maxlength : 8,
                    isGB18030:true
                },
                departmentCode:{
                    required : true,
                    maxlength : 5,
                    isBigAndNum:true,
                    remote:{
                        type:"get",
                        url: $.apiPath+moduleName.dept+ $.apijoin+"departments"+$.apijoin+"departmentcode"+$.apijoin+"available?id=&expireToken="+Math.random(),
                        beforeSend: function(XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader("token",token);
                            XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset=utf-8");
                        }
                    }
                },
                description:{
                    maxlength:20
                }
            },

            messages : {
                departmentName : {
                    required : ' 请输入部门名称；',
                    maxlength : ' 部门名称不能超过8个字符；',
                    isGB18030:'部门名称只能输入汉字；'
                },
                departmentCode : {
                    required : ' 请输入部门编码；',
                    maxlength : ' 部门编码不能超过5个字符；',
                    isBigAndNum:'部门编码只能输入英文大写和数字；',
                    remote : ' 部门编码已存在；'
                },
                description:{
                    maxlength:' 说明不能超过20个字符；'
                }
            },

            submitHandler : function(form) {
                var json = $("#deptadd_form").form2json();
                $.restAjax({
                    url :$.apiPath+moduleName.dept+ $.apijoin+'departments',
                    type:"POST",
                    dataType : "json",
                    data:json,
                    async:false,
                    success : function(data) {
                        if(data.status=="200"){
                            var id = $("#departmentcode").val();
                            var pdom = $(".treeview span.spanck").parent();
                            var adom = $("<ul style='display: none;'><li id="+id+"><span><i class='fa fa-lg'></i>&nbsp;"
                                +$("#departmentname").val()+"</span></li></ul>");
                            if($(".treeview span.spanck").parent().is(":has(>ul)")){
                                pdom = $(".treeview span.spanck").parent().find(">ul");
                                adom = $("<li id="+id+"><span><i class='fa fa-lg'></i>&nbsp;"+$("#departmentname").val()+"</span></li>");
                            }
                            $("#dept_tree").treeview({ addNode: pdom.append(adom)});//菜单树添加新增节点
                            $("#dept_table").DataTable().ajax.reload();
                            $("#deptadd_close").click();
                            basetools.backTip(data,'Y');
                        }else{
                            basetools.backTip(data,'N');
                        }
                    }
                });
            }
        });

        $("#deptadd_cancel").click(function(){
            if(ifChange){
                $.confirm({
                    title: '确认信息',
                    content: '确认取消当前所做的操作',
                    confirmButton: "是",
                    cancelButton: "否",
                    confirm: function (){
                        $("#deptadd_close").click();
                    }
                })
            }else{
                $("#deptadd_close").click();
            }

        });
    };
    return {init:init};
});