define(['basetools'],function(basetools){
    var init = function(row){
        var ifChange = false;
        $("#deptedit_form input,textarea").change(function (){ifChange = true;});
        $.restAjax({
            url : $.apiPath+moduleName.dept+ $.apijoin+"departments"+$.apijoin+$("#departmentcode").val() ,
            type:"get",
            cache:false,
            success : function(data) {
                if(data.status == '200' && data.code=="OK"){
                    $('#deptedit_form').json2form({data:data.result});
                }
            }
        });
        $("#deptedit_form").validate({
            errorElement : "em",
            errorContainer : "#errordiv",
            errorLabelContainer : "#errortip",
            rules : {
                departmentName:{
                    required : true,
                    maxlength : 8,
                    isGB18030:true
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
                description:{
                    maxlength:' 说明不能超过20个字符；'
                }
            },

            submitHandler : function(form) {
                var json = $("#deptedit_form").form2json();
                $.restAjax({
                    url :$.apiPath+moduleName.dept+ $.apijoin+"departments",
                    type:"PUT",
                    dataType : "json",
                    data:json,
                    async:false,
                    success : function(data) {
                        if(data.status=="200"&&data.code=="OK"){
                            $("li#"+$("#departmentcode").val()).find(">span").html($("li#"+$("#departmentcode").val()).find(">span > i").get(0).outerHTML +"&nbsp;" +$("#departmentname").val());
                            $("#deptedit_close").click();
                            $('#dept_table').dataTable().fnUpdate(data.result,row,null,false);
                            basetools.backTip(data,'Y');
                        }else{
                            basetools.backTip(data,'N');
                        }
                    }
                });
            }
        });

        $("#deptedit_cancel").click(function(){
            if(ifChange){
                $.confirm({
                    title: '确认信息',
                    content: '确认取消当前所做的操作',
                    confirmButton: "是",
                    cancelButton: "否",
                    confirm: function (){
                        $("#deptedit_close").click();
                    }
                })
            }else{
                $("#deptedit_close").click();
            }
        });
    };

    return {init:init};
});