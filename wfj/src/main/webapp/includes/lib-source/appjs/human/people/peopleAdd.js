define(['basetools'],function(basetools){
    var init = function(){
        var ifChange = false;
        $("#peopleadd_form input,textarea").change(function (){ifChange = true;});
        $("#peopleadd_form").validate({
            errorElement : "em",
            errorContainer : "#errordiv",
            errorLabelContainer : "#errortip",
            rules : {
                userNo :{
                    required :true,
                    isBigAndNum:true,
                    maxlength :14
                },
                userName : {
                    required : true,
                    isGB18030 : true,
                    maxlength : 20
                },
                userIdcard:{
                    maxlength : 18
                },
                userPhone:{
                    maxlength : 25
                },
                userBirthday:{
                    maxlength : 20
                },
                userNatinoal:{
                    maxlength : 40
                }
            },
            messages : {
                userNo :{
                    required : ' 请输入人员档案编号；',
                    isBigAndNum :' 档案编号只能输入英文大写和数字；',
                    maxlength : ' 岗位编码不能超过14个字符；'
                },
                userName : {
                    required : ' 请输入人员名称；',
                    isGB18030 : '人员名称只能输入汉字',
                    maxlength : ' 人员名称不能超过10个汉字；'
                },
                userIdcard : {
                    maxlength : ' 身份证不能超过18位；'
                },
                userIdcard : {
                    maxlength : ' 身份证不能超过18位；'
                },
                userIdcard : {
                    maxlength : ' 身份证不能超过18位；'
                },
                userBirthday : {
                    maxlength : ' 出生日期不能超过20位；'
                },
                userNatinoal : {
                    maxlength : ' 民族不能超过20个字；'
                }
            },
            submitHandler : function(form) {
                var json = $("#peopleadd_form").form2json();
                $.restAjax({
                    url :  $.apiPath+moduleName.people + $.apijoin+ 'human'+ $.apijoin+ 'social',
                    type:"POST",
                    dataType : "json",
                    data:json,
                    async:false,
                    success : function(data) {
                        if(data.status=="200"){
                            $("#peopleadd_close").click();
                            $("#people_table").DataTable().ajax.reload();
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            }
        });

        $("#peopleadd_cancel").click(function(){
            if(ifChange){
                $.confirm({
                    title: '确认信息',
                    content: '确认取消当前所做的操作',
                    confirmButton: "是",
                    cancelButton: "否",
                    confirm: function (){
                        $("#peopleadd_close").click();
                    }
                })
            }else{
                $("#peopleadd_close").click();
            }
        });
    };
    return {init : init}
});