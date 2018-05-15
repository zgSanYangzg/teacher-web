define(['basetools'],function(basetools){
    var init = function(row){
        var ifChange = false;
        $('#rolesel').selectpicker({noneSelectedText:' 请选择'});
        $("#useredit_form input,textarea").change(function (){ifChange = true;});
        $.restAjax({
            url:  $.apiPath+moduleName.role+ $.apijoin+ 'roles?lockStatus=N',
            type: "get",
            cache:false,
            async:false,
            success: function (data) {
                if(data.status == '200' && data.result){
                    var datas = data.result;
                    var ops = "";
                    for (var i = 0; i < datas.length; i++) {
                        ops += "<option value='" + datas[i].roleCode + "' text='" + datas[i].roleName + "'>" + datas[i].roleName + "</option>";
                    }
                    $("#rolesel").html(ops);
                    $("#rolesel").selectpicker('refresh');
                }
            }
        });
        $.restAjax({
            url : $.apiPath+moduleName.user+ $.apijoin+ 'employee' + $.apijoin +$("#employeeCode").val(),
            type:"get",
            cache:false,
            success : function(data) {
                if(data.status == '200' && data.result){
                    $('#useredit_form').json2form({data:data.result});
                    $('#rolesel').val(data.result.roleCodes);
                    $("#rolesel").selectpicker('render');
                }
            }
        });
        $("#useredit_form").validate({
            errorElement : "em",
            errorContainer : "#errordiv",
            errorLabelContainer : "#errortip",
            rules : {
                userName:{
                    required : true,
                    isNotNumber: true,
                    maxlength : 5
                },
                mobile:{
                    required : true,
                    isMobilPhoneNum : true
                }
            },

            messages : {
                userName:{
                    required : '请输入用户姓名；',
                    isNotNumber:'用户姓名只能输入汉字和字母；',
                    maxlength : '用户姓名不能超过5个字符；'
                },
                mobile:{
                    required : '请输入手机号码；',
                    isMobilPhoneNum : '手机号码不合法；'
                }
            },
            submitHandler : function(form) {
                $("#roleCode").val($('#rolesel').selectpicker('val'));
                var json = $("#useredit_form").form2json();
                json = JSON.parse(json);
                json.agencyCode = agencyCode;
                json.roleCode = $("#roleCode").val().split(",");
                json.departmentCode = $("#dept_tree").find(".spanck").closest("li").attr("id") || "-1";
                json = JSON.stringify(json);
                $.restAjax({
                    url : $.apiPath+moduleName.user+ $.apijoin+ 'employee' + $.apijoin + $("#employeeCode").val(),
                    type:"PUT",
                    dataType : "json",
                    data:json,
                    async:false,
                    success : function(data) {
                        if(data.status=="200"){
                            $('#user_table').dataTable().fnUpdate(data.result,row,null,false);
                            $("#useredit_close").click();
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            }
        });

        $("#useredit_cancel").click(function(){
            if(ifChange){
                $.confirm({
                    title: '确认信息',
                    content: '确认取消当前所做的操作',
                    confirmButton: "是",
                    cancelButton: "否",
                    confirm: function (){
                        $("#useredit_close").click();
                    }
                })
            }else{
                $("#useredit_close").click();
            }
        });
    };

    return {init : init}
});