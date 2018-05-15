<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="modal-header" style="height:55px;line-height:55px">
    <button type="button" id="roleadd_close" class="close" data-dismiss="modal">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only" >Close</span></button>
    <h4 class="modal-title">创建岗位</h4>
</div>
<form  method="post" id="roleadd_form" class="smart-form form-horizontal">
    <fieldset>
        <section>
            <div class="alert alert-warning" style="display: none;margin-top:-22px;margin-bottom:-10px;" id="errordiv">
                <strong>警告!</strong><span id="errortip" ></span>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-2 col-xs-4 control-label primary-label">岗位编码</label>
                <div class="col-sm-8 col-xs-6">
                    <input type="text" class="form-control" id="roleCode" name="roleCode" placeholder="">
                </div>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-2 col-xs-4 control-label primary-label">岗位名称</label>
                <div class="col-sm-8 col-xs-6">
                    <input type="text" class="form-control" id="roleName" name="roleName" placeholder="">
                </div>
             </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-2 col-xs-4 control-label">说明</label>
                <div class="col-sm-8 col-xs-6">
                    <textarea rows="3" class="form-control" name="description" id="description" ></textarea>
                </div>
            </div>
        </section>
        <section>
            <div class="form-group" style="line-height:10px;">
                <label  class="col-sm-2 col-xs-4 control-label">锁定状态</label>
                <div class="col-sm-1 col-xs-1" >
                     <span class="onoffswitch">
                        <input type="checkbox" id="roleadd" class="onoffswitch-checkbox" checked="checked" name="lockStatus" value="N">
                        <label class="onoffswitch-label"  for="roleadd">
                            <span class="onoffswitch-inner"  data-swchon-text="启用" data-swchoff-text="禁用" ></span>
                            <span class="onoffswitch-switch" ></span>
                        </label>
                    </span>
                </div>
            </div>
        </section>
    </fieldset>
    <footer>
        <button type="submit" id="roleadd_save" class="btn btn-primary">保存</button>
        <button type="button" id="roleadd_cancel" class="btn btn-primary">取消</button>
    </footer>
</form>
<script type="text/javascript">
    requirejs(['roleAdd'], function (roleAdd) {
        roleAdd.init();
    });
</script>