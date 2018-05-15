<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
    #resnavTab li a {border-bottom: 30px solid #fff;color:#333;opacity: 1;}
    #resnavTab li.active>a {border-bottom: 30px solid #1a90e2;color:#fff;}
</style>
<div class="clearfix content-main">
    <section class="col-sm-6 col-md-5 col-lg-4" style="height:100%;padding-left:0px;">
        <div  style="height:100%;">
            <ul id="resnavTab" class="tabs">
                <li class="active">
                    <a href="#res1"  role="role" data-toggle="tab">&nbsp;角色</a>
                </li>
                <li>
                    <a href="#res2" role="user" data-toggle="tab">&nbsp;用户</a>
                </li>
            </ul>
            <div class="tab-content" style="padding:20px;background-color: #fff;border:1px solid #ccc;height: calc(100% - 30px);" id="source_height">
                <div class="tab-pane fade in active" id="res1">
                    <table id="role_table" class="table table-bordered table-hover" style="border-bottom-width: 0;"></table>
                </div>
                <div class="tab-pane fade" id="res2">
                    <table id="user_table" class="table table-bordered table-hover" style="border-bottom-width: 0;"></table>
                </div>
            </div>
        </div>
    </section>
    <section class="col-sm-6 col-md-7 col-lg-8" style="height:100%;background-color: #fff;border:1px solid #ccc;">
        <div class="table-responsive">
            <table id="resource_table"  class="table table-bordered table-hover" style="border-bottom-width: 0;">
            </table>
        </div>
    </section>
</div>
<script type="text/javascript">
    requirejs(['resource'], function (resource) {
        resource.init();
    });
</script>

