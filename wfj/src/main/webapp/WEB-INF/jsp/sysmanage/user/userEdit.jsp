<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="modal-header" style="height:55px;line-height:55px">
    <button type="button" id="useredit_close" class="close" data-dismiss="modal">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only" >Close</span></button>
    <h4 class="modal-title">编辑系统用户</h4>
</div>
<style>
    .ui-datepicker{
        z-index: 9999!important;
    }
</style>
<form  method="post" id="useredit_form" class="smart-form form-horizontal">
    <fieldset>
        <section>
            <div class="alert alert-warning" style="display: none;margin-top:-22px;margin-bottom:-10px;" id="errordiv">
                <strong>警告!</strong><span id="errortip" ></span>
            </div>
        </section>
        <div class="row">
            <section class="col col-6">
                <div class="form-group row">
                    <label  class="col-sm-4 col-xs-3 control-label primary-label">姓名</label>
                    <div class="col-sm-7 col-xs-7">
                        <input type="text" class="form-control" name="userName">
                    </div>
                </div>
            </section>
            <section class="col col-6">
                <div class="form-group row">
                    <label  class="col-sm-3 col-xs-3 control-label primary-label">用户工号</label>
                    <div class="col-sm-7 col-xs-7">
                        <input type="text" class="form-control" id="employeeCode" name="employeeCode" readonly value="${id}">
                    </div>
                </div>
            </section>
        </div>
        <div class="row">
            <section class="col col-6">
                <div class="form-group row">
                    <label  class="col-sm-4 col-xs-3 control-label  primary-label">手机</label>
                    <div class="col-sm-7 col-xs-7">
                        <input type="text" class="form-control" name="mobile" >
                    </div>
                </div>
            </section>
            <section class="col col-6">
                <div class="form-group row">
                    <label  class="col-sm-3 col-xs-3 control-label">性别</label>
                    <div class="col-sm-7 col-xs-7">
                        <div class="inline-group" style="line-height: 38px;">
                            <span class="radio">
                                <label>
                                    <input type="radio" value="1" class="radiobox" name="gender" checked>
                                    <span> 男</span>
                                </label>&nbsp;&nbsp;&nbsp;&nbsp;
                                <label>
                                    <input type="radio" value="0" class="radiobox" name="gender">
                                    <span> 女</span>
                                </label>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <section>
            <div class="form-group">
                <label  class="col-sm-2 col-xs-4 control-label">岗位名称</label>
                <div class="col-sm-8 col-xs-6">
                    <select class="col-sm-8 col-xs-6 form-control" id="rolesel"  multiple></select>
                    <input type="hidden" id="roleCode" name="roleCode">
                </div>
            </div>
        </section>

        <section>
            <div class="form-group" style="line-height:10px;">
                <label  class="col-sm-2 col-xs-4 control-label">锁定状态</label>
                <div class="col-sm-1 col-xs-1" >
                     <span class="onoffswitch">
                        <input type="checkbox" id="useradd" class="onoffswitch-checkbox" checked="checked" name="lockStatus" value="N">
                        <label class="onoffswitch-label"  for="useradd">
                            <span class="onoffswitch-inner"  data-swchon-text="启用" data-swchoff-text="禁用" ></span>
                            <span class="onoffswitch-switch" ></span>
                        </label>
                    </span>
                </div>
            </div>
        </section>
    </fieldset>
    <footer>
        <button type="submit" class="btn btn-primary">保存</button>
        <button type="button" id="useredit_cancel" class="btn btn-primary">取消</button>
    </footer>
</form>

<script type="text/javascript">
    requirejs(['userEdit'], function (userEdit) {
        userEdit.init('${row}');
    });
</script>
