define(['basetools'],function(basetools){
    var init = function(row) {
        var ifChange = false;
        /**获取数据绑定到表单上*/
        $.restAjax({
            url :  $.apiPath+moduleName.role+ $.apijoin+ 'roles'+ $.apijoin + $("#roleId").val(),
            type:"get",
            cache:false,
            success : function(data) {
                if(data.status == '200' && data.result){
                    $('#roleedit_form').json2form({data:data.result});
                }
            }
        });
        $("#roleedit_form input,textarea").change(function (){ifChange = true;});
        $("#roleedit_form").validate({
            errorElement : "em",
            errorContainer : "#errordiv",
            errorLabelContainer : "#errortip",
            rules : {
                roleName : {
                    required : true,
                    isGB18030:true,
                    maxlength : 8
                },
                description : {
                    maxlength : 20
                }
            },
            messages : {

                roleName : {
                    required : ' 请输入岗位名称；',
                    isGB18030:'岗位名称只能输入汉字',
                    maxlength : ' 岗位名称不能超过8个字符；'
                },
                description : {
                    maxlength : ' 说明不能超过20个字符；'
                }
            },
            submitHandler : function(form) {
                var json = $("#roleedit_form").form2json();
                $.restAjax({
                    url :  $.apiPath+moduleName.role+ $.apijoin + 'roles' + $.apijoin + $("#roleId").val(),
                    type:"put",
                    dataType : "json",
                    data:json,
                    async:false,
                    success : function(data) {
                        if(data.status=="200"){
                            $('#role_table').dataTable().fnUpdate(data.result,row,null,false);
                            $("#roleedit_close").click();
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            }
        });

        $("#roleedit_cancel").click(function(){
            if(ifChange){
                $.confirm({
                    title: '确认信息',
                    content: '确认取消当前所做的操作',
                    confirmButton: "是",
                    cancelButton: "否",
                    confirm: function (){
                        $("#roleedit_close").click();
                    }
                })
            }else{
                $("#roleedit_close").click();
            }
        });
    };
    return {init : init}
});