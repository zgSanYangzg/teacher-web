<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <div class="content-main" style="background-color: #fff;border:1px solid #ccc;padding:5px 20px;">
        <div class="table-responsive">
            <table id="role_table"  class="table table-bordered table-hover" style="border-bottom-width: 0px;">
            </table>
        </div>
    </div>

<%--
    <div class="opp_result opp_unactive" id="role_formdiv">
        <div class="member_choosed_box">
            <div class="choosed_header">
                <a class="js_close icon_close" href="javascript:;">&times;</a>
                <p class="choosed_mainTitle">资料预览</p>
            </div>
            <div class="choosed_content ">
                <ul class="js_member_list">
                    <div class="cc_content">
                        <form id="role_formdetail" class="formdetail"></form>
                    </div>
                </ul>
            </div>
            <div class="member_tool js_member_toolbar"></div>
        </div>
    </div>
--%>


    <div class="modal fade" id="role_modal" tabindex="-1" role="dialog"
         aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content"></div>
        </div>
    </div>
    <script type="text/javascript">
        requirejs(['roleList'], function (role) {
            role.roleTabInit();
        });
    </script>
