define(['basetools'],function(basetools){
    var init = function(){
        var ifChange = false;
        $("#roleadd_form input,textarea").change(function (){ifChange = true;});
        $("#roleadd_form").validate({
            errorElement : "em",
            errorContainer : "#errordiv",
            errorLabelContainer : "#errortip",
            rules : {
                roleCode :{
                    required :true,
                    isBigAndNum:true,
                    maxlength :14,
                    remote:{
                        type:"get",
                        url : $.apiPath+moduleName.role + $.apijoin+ 'roles' + $.apijoin +'roleCode'+ $.apijoin +'available?expireToken='+Math.random(),
                        beforeSend: function(XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader("token",token);
                            XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset=utf-8");
                        }
                    }
                },
                roleName : {
                    required : true,
                    isGB18030 : true,
                    maxlength : 8
                },
                description:{
                    maxlength : 20
                }
            },
            messages : {
                roleCode :{
                    required : ' 请输入岗位编码；',
                    isBigAndNum :' 岗位编码只能输入英文大写和数字；',
                    maxlength : ' 岗位编码不能超过14个字符；',
                    remote:' 岗位编码已存在；'
                },
                roleName : {
                    required : ' 请输入岗位名称；',
                    isGB18030 : '岗位名称只能输入汉字',
                    maxlength : ' 岗位名称不能超过8个汉字；'
                },
                description : {
                    maxlength : ' 说明不能超过20个字符；'
                }
            },
            submitHandler : function(form) {
                var json = $("#roleadd_form").form2json();
                $.restAjax({
                    url :  $.apiPath+moduleName.role + $.apijoin+ 'roles',
                    type:"POST",
                    dataType : "json",
                    data:json,
                    async:false,
                    success : function(data) {
                        if(data.status=="200"){
                            $("#roleadd_close").click();
                            $("#role_table").DataTable().ajax.reload();
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            }
        });

        $("#roleadd_cancel").click(function(){
            if(ifChange){
                $.confirm({
                    title: '确认信息',
                    content: '确认取消当前所做的操作',
                    confirmButton: "是",
                    cancelButton: "否",
                    confirm: function (){
                        $("#roleadd_close").click();
                    }
                })
            }else{
                $("#roleadd_close").click();
            }
        });
    };
    return {init : init}
});