<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="modal-header" style="height:55px;line-height:55px">
    <button type="button" id="resetpassClose" class="close" data-dismiss="modal">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only" >Close</span></button>
    <h4 class="modal-title">修改密码</h4>
</div>
<form  method="post" id="resetPassForm" class="smart-form form-horizontal">
    <fieldset>
        <section>
            <div class="alert alert-warning" style="display: none;margin-top:-22px;margin-bottom:-10px;" id="reseterrorDiv">
                <strong>警告!</strong><span id="reseterrorTip" ></span>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-3 control-label">登录帐号</label>
                <div class="col-sm-7">
                    <input type="text" class="form-control"  readonly name="loginId" id="loginId" value="${id}">
                    <input type="hidden" id="agencyCode" value="${agencyCode}"/>
                </div>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-3 control-label primary-label">旧密码</label>
                <div class="col-sm-7">
                    <input type="password" class="form-control" id="oldPassword" name="oldPassword" placeholder="" value="${oldpassword}">
                </div>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-3 control-label primary-label">新密码</label>
                <div class="col-sm-7">
                    <input type="password" class="form-control" id="newPassword" name="newPassword" placeholder="">
                </div>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-3 control-label primary-label">确认新密码</label>
                <div class="col-sm-7">
                    <input type="password" class="form-control" id="newPassworda" name="newPassworda" placeholder="">
                </div>
            </div>
        </section>
    </fieldset>
    <footer>
        <button type="submit" id="resetpassSave" class="btn btn-primary">
            保存
        </button>
        <button type="button" class="btn btn-primary" data-dismiss="modal">
            取消
        </button>
    </footer>
</form>
<!-- MD5 -->
<script type="text/javascript">
    requirejs(["jquery.validate","validate.expand","md5-min","jquery-confirm","json2form"], function () {
        var basetools = require("basetools");
        var ifChange = false;
        var init = function() {
            $("#newPassword").val("");
            $("#oldPassword").val("");
            $("#resetPassForm input,textarea").change(function (){ifChange = true;});
            $("#resetPassForm").validate({
                errorElement : "em",
                errorContainer : "#reseterrorDiv",
                errorLabelContainer : "#reseterrorTip",
                rules : {
                    oldPassword : {
                        required : true
                    },
                    newPassword : {
                        required : true,
                        isPassword :true
                    },
                    newPassworda : {
                        required:true,
                        equalTo:"#newPassword"
                    }
                },
                messages : {
                    oldPassword : {
                        required : ' 请输入旧密码；'
                    },
                    newPassword : {
                        required : ' 请输入新密码；',
                        isPassword : ' 密码以字母开头，长度在6~20之间，只能包含字母、数字和下划线；'
                    },
                    newPassworda : {
                        required : " 请确认新密码；",
                        equalTo:" 密码不一致；"
                    }
                },
                submitHandler:function(form){
                    $.restAjax({
                        url :$.apiPath+"apis/1/agencyusers/selfpassword?oldPassword="+hex_md5($("#oldPassword").val())+"&newPassword="+hex_md5($("#newPassword").val()),
                        type:"PUT",
                        dataType : "json",
                        async : false,
                        beforeSend: function(XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader("Content-Type","application/json;charset=utf-8");
                        },
                        success : function(data) {
                            if(data.status=="200"){
                                basetools.backTip(data,'Y');
                                $("#resetpassClose").click();
                                window.location.href = "page/logout";
                            }else{
                                $("#reseterrorTip").html(data.message);
                                $("#reseterrorDiv,#reseterrorTip").show();
                            }
                        }
                    });
                }
            });
            $("#resetpass").on("hidden.bs.modal", function() {
                $(this).removeData("bs.modal");
            });
        };
        init();
    })
</script>
