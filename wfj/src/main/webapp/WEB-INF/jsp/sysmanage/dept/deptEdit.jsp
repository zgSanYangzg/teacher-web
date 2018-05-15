<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="modal-header" style="height:55px;line-height:55px">
    <button type="button" id="deptedit_close" class="close" data-dismiss="modal">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only" >Close</span></button>
    <h4 class="modal-title">编辑部门</h4>
</div>
<form  method="post" id="deptedit_form" class="smart-form form-horizontal">
    <fieldset>
        <section>
            <div class="alert alert-warning" style="display: none;margin-top:-22px;margin-bottom:-10px;" id="errordiv">
                <strong>警告!</strong><span id="errortip" ></span>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-2 col-xs-4 control-label primary-label">部门编码</label>
                <div class="col-sm-8 col-xs-6">
                    <input type="text" class="form-control" id="departmentcode" name="departmentCode" placeholder="" readonly value="${id}">
                </div>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-2 col-xs-4 control-label primary-label">部门名称</label>
                <div class="col-sm-8 col-xs-6">
                    <input type="text" class="form-control" id="departmentname" name="departmentName" placeholder="">
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
    </fieldset>
    <footer>
        <button type="submit" class="btn btn-primary">
            保存
        </button>
        <button type="button" id="deptedit_cancel" class="btn btn-primary">
            取消
        </button>
    </footer>
</form>
<script type="text/javascript">
    requirejs(['deptEdit'], function (deptEdit) {
        deptEdit.init('${row}');
    });
</script>