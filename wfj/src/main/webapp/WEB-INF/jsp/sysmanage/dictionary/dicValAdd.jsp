<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
    #dicvalDiv.table-responsive {height: 350px!important;overflow-y: auto;overflow-x: hidden;}
    #dicvalTab td{
        word-break:break-all
    }
</style>
<div class="modal-header" style="height:55px;line-height:55px">
    <button type="button" id="dicval_close" class="close" data-dismiss="modal">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only" >Close</span></button>
    <h4 class="modal-title">创建字典值</h4>
</div>
    <form  method="post" id="dicvaladd_form" class="smart-form form-horizontal">
        <fieldset>
            <section>
                <div class="alert alert-warning" style="display: none;margin-top:-22px;margin-bottom:-10px" id="error_div">
                    <strong>警告!</strong><span id="error_tip" ></span>
                </div>
            </section>
            <div class="row">
                <section class="col col-6">
                    <div class="row">
                        <label class="col-sm-4 col-xs-3 control-label primary-label">字典KEY</label>
                        <div class="col-sm-7 col-xs-7">
                            <input type="hidden" id="dictCode" name="dictCode" value="${id}">
                            <input type="hidden" id="agencyCode" name="agencyCode">
                            <input type="text" id="entryKey" name="entryKey" class="form-control">
                        </div>
                    </div>
                </section>
                <section class="col col-6">
                    <div class="row">
                        <label class="col-sm-3 col-xs-3 control-label primary-label">字典VALUE</label>
                        <div class="col-sm-7 col-xs-7">
                            <input type="text" id="entryValue" name="entryValue" class="form-control">
                        </div>
                    </div>
                </section>
            </div>
            <div class="row">
                <label class="col-sm-2 col-xs-2 control-label">字典值描述</label>
                <div class="col-sm-9 col-xs-9">
                    <textarea rows="2" class="form-control" name="description" id="description" ></textarea>
                </div>
            </div>
            <div class="row" style="margin-top: 10px;">
                <span class="col-sm-9"></span>
                <div class="col-sm-3 col-xs-3">
                    <button type="submit" id="dicval_save" class="btn btn-primary" style="padding: 5px 20px;">保存</button>
                    <button type="button" id="dicval_cancel" class="btn btn-primary" style="padding: 5px 20px;">取消</button>
                </div>
            </div>
        </fieldset>
    </form>
    <div style="padding-top: 10px;margin-bottom: 30px;width: 98%;padding-left: 1%">
        <div id="dicval_div" class="table-responsive">
            <table id="dicval_table" class="table table-striped table-bordered table-hover" style="border-bottom-width: 0px;width: 99%;">
            </table>
        </div>
    </div>
<script type="text/javascript">
    requirejs(['dicValAdd'], function (dicValAdd) {
        setTimeout(function(){dicValAdd.init();},50);
    });
</script>