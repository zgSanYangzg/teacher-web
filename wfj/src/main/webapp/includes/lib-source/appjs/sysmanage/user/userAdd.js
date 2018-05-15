define(['basetools'], function (basetools) {
    var init = function(){
        var ifChange = false;
        $('#rolename').selectpicker({noneSelectedText: ' 请选择'});
        $.restAjax({
            url:  $.apiPath+moduleName.role+ $.apijoin+ 'roles?lockStatus=N',
            type: "get",
            cache: false,
            success: function (data) {
                if(data.status == '200' && data.result){
                    var datas = data.result;
                    var ops = "";
                    for (var i = 0; i < datas.length; i++) {
                        ops += "<option value='" + datas[i].roleCode + "' text='" + datas[i].roleName + "'>" + datas[i].roleName + "</option>";
                    }
                    $("#rolename").html(ops);
                    $("#rolename").selectpicker('refresh');
                }
            }
        });
        $("#useradd_form input,textarea").change(function () {ifChange = true;});
        $("#useradd_form").validate({
            errorElement: "em",
            errorContainer: "#errordiv",
            errorLabelContainer: "#errortip",
            rules: {
                employeeCode: {
                    required: true,
                    isNumber: true,
                    maxlength: 5,
                    remote: {
                        type: "get",
                        url: function () {
                            return  $.apiPath+moduleName.user+ $.apijoin+ 'employee' + $.apijoin + $("#employeeCode").val() + $.apijoin +'unique' + "?expireToken=" + Math.random();
                        },
                        beforeSend: function (XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader("token", token);
                            XMLHttpRequest.setRequestHeader("Content-Type", "application/json;charset=utf-8");
                        }
                    }
                },
                userName: {
                    required: true,
                    isNotNumber:true,
                    maxlength: 8
                },
                mobile: {
                    required: true,
                    isMobilPhoneNum: true
                }
            },
            messages: {
                employeeCode: {
                    required: ' 请输入用户工号；',
                    isNumber: ' 用户工号只能输入数字；',
                    maxlength: ' 用户工号不能超过5个字符；',
                    remote: '用户工号已存在；'
                },
                userName: {
                    required: '请输入用户姓名；',
                    isNotNumber:'用户姓名只能输入汉字和字母；',
                    maxlength: '用户姓名不能超过8个字符；'
                },
                mobile: {
                    required: '请输入手机号码；',
                    isMobilPhoneNum: '手机号码不合法；'
                }
            },
            submitHandler: function (form) {
                $("#roleCode").val($("#rolename").selectpicker('val'));
                var json = $("#useradd_form").form2json();
                json = JSON.parse(json);
                json.agencyCode = agencyCode;
                json.roleCode = $("#roleCode").val().split(",");
                json.departmentCode = $("#dept_tree").find(".spanck").closest("li").attr("id") || "-1";
                json = JSON.stringify(json);
                $.restAjax({
                    url:  $.apiPath+moduleName.user+ $.apijoin + 'employee' ,
                    type: "POST",
                    dataType: "json",
                    data: json,
                    async: false,
                    success: function (data) {
                        if (data.status == "200") {
                            $("#useradd_close").click();
                            $("#user_table").DataTable().ajax.reload();
                            basetools.backTip(data, 'Y');
                        }
                    }
                });
            }
        });

        $("#useradd_cancel").click(function () {
            if (ifChange) {
                $.confirm({
                    title: '确认信息',
                    content: '确认取消当前所做的操作',
                    confirmButton: "是",
                    cancelButton: "否",
                    confirm: function () {
                        $("#useradd_close").click();
                    }
                })
            } else {
                $("#useradd_close").click();
            }
        });
    };

    return {init : init}
});