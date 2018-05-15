<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="content-main">
    <section class="col-sm-6 col-md-4 col-lg-3" style="height:100%;padding-left:0px;">
        <div class="tree content-left" style="padding:20px 0 0 20px;overflow-y: auto;">
            <ul id="dept_tree"></ul>
        </div>
    </section>
    <section class="col-sm-6 col-md-8 col-lg-9" style="height:100%;background-color: #fff;border:1px solid #ccc;">
        <div class="table-responsive">
            <table id="dept_table" class="table table-bordered table-hover" style="border-bottom-width: 0px;">
            </table>
        </div>
    </section>
</div>

<div class="modal fade" id="dept_model" tabindex="-1" role="dialog"
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
        </div>
    </div>
</div>

<script type="text/javascript">
    requirejs(['deptList'], function (dept) {
        dept.deptTabInit();
    });
</script>