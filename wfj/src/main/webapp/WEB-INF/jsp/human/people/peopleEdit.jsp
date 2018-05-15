<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="modal-header" style="height:45px;line-height:45px">
    <button type="button" id="peopleedit_close" class="close" data-dismiss="modal">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only" >Close</span></button>
    <h4 class="modal-title">编辑社会人力</h4>
</div>

<form method="post" id="peopleedit_form"  class="smart-form form-horizontal">
    <fieldset>
        <section>
            <div class="alert alert-warning" style="display: none;margin-top:-22px;margin-bottom:-10px;" id="errordiv">
                <strong>警告!</strong><span id="errortip" ></span>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-2 col-xs-4 control-label primary-label">人员档案编号</label>
                <div class="col-sm-8 col-xs-6">
                    <input type="text" class="form-control" id="userNo" name="userNo" placeholder="">
                    <input type="hidden" id="userId"  value="${userId}"/>
                </div>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-2 col-xs-4 control-label primary-label">人员姓名</label>
                <div class="col-sm-8 col-xs-6">
                    <input type="text" class="form-control" id="userName" name="userName" placeholder="">
                </div>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-2 col-xs-4 control-label">身份证</label>
                <div class="col-sm-8 col-xs-6">
                    <input class="form-control" name="userIdcard" id="userIdcard" ></input>
                </div>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-2 col-xs-4 control-label">出生日期</label>
                <div class="col-sm-8 col-xs-6">
                    <input class="form-control" name="userBirthday" id="userBirthday" ></input>
                </div>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-2 col-xs-4 control-label">民族</label>
                <div class="col-sm-8 col-xs-6">
                    <input class="form-control" name="userNatinoal" id="userNatinoal" ></input>
                </div>
            </div>
        </section>
        <section>
            <div class="form-group">
                <label  class="col-sm-2 col-xs-4 control-label">电话</label>
                <div class="col-sm-8 col-xs-6">
                    <input class="form-control" name="userPhone" id="userPhone" ></input>
                </div>
            </div>
        </section>
    </fieldset>
    <footer>
        <button type="submit"  class="btn btn-primary">保存</button>
        <button  type="button" id="peopleedit_cancel" class="btn btn-primary">取消</button>
    </footer>
</form>
<script type="text/javascript">
    requirejs(['peopleEdit'], function (peopleEdit) {
        peopleEdit.init('${row}');
    });
</script>