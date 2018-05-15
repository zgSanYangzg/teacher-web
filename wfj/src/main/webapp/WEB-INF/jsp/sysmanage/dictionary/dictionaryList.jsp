<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="content-main" style="background-color: #fff;border:1px solid #ccc;padding:5px 20px;">
    <div class="table-responsive">
        <table id="dic_table"  class="table table-bordered table-hover" style="border-bottom-width: 0px;"></table>
    </div>
</div>

<div class="modal fade" id="dicAddModel" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
        </div>
    </div>
</div>

<script type="text/javascript">
    requirejs(['dictionaryList'], function (dict) {
        dict.dicTabinit();
    });
</script>