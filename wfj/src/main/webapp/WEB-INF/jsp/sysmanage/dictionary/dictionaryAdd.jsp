<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="modal-header" style="height:55px;line-height:55px">
    <button type="button" id="dicadd_close" class="close" data-dismiss="modal">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only" >Close</span></button>
    <h4 class="modal-title">创建字典表</h4>
</div>
<form  method="post" id="dicadd_form" class="smart-form form-horizontal">
    <fieldset>
        <section>
            <div class="alert alert-warning" style="display: none;margin-top:-22px;margin-bottom:-10px" id="error_div">
                <strong>警告!</strong><span id="error_tip" ></span>
            </div>
        </section>
        <div class="row">
            <section class="col col-6">
                <div class="row">
                    <label class="col-sm-4 col-xs-3 control-label primary-label">字典编号</label>
                    <div class="col-sm-7 col-xs-7">
                        <input type="text" id="dictCode" name="dictCode" class="form-control">
                    </div>
                </div>
            </section>
            <section class="col col-6">
                <div class="row">
                    <label class="col-sm-3 col-xs-3 control-label primary-label">字典名称</label>
                    <div class="col-sm-7 col-xs-7">
                        <input type="text" id="dictName" name="dictName" class="form-control">
                    </div>
                </div>
            </section>
        </div>
        <div class="row">
            <label class="col-sm-2 col-xs-2 control-label">字典值描述</label>
            <div class="col-sm-9 col-xs-9">
                <textarea rows="3"  class="form-control" name="dictDesc" id="dictDesc" ></textarea>
            </div>
        </div>
    </fieldset>
    <footer>
        <button type="submit" id="dicadd_save" class="btn btn-primary">保存</button>
        <button type="button" id="dicadd_cancel" class="btn btn-primary">取消</button>
    </footer>
</form>

<script type="text/javascript">
    requirejs(['dictionaryAdd'], function (dictionaryAdd) {
        dictionaryAdd.init();
    });
</script>