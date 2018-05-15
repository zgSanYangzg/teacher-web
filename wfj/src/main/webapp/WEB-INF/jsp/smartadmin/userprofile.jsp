<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<style>
  #nopermission {width:100%;background-color: #fff;position: relative;text-align: center;border:1px solid #ddd;}
  #nopermission .nopermission_img {width:40%;position: absolute;left:30%;top:30%;text-align: center;}
  #nopermission p {font-size: 18px;margin-top:20px;font-weight: 500; }
</style>
<div id="nopermission">
  <div class="nopermission_img">
    <img src="includes/lib/smartadmin/img/noPermission.png" alt=""/>
    <p>暂无权限，请联系管理员进行权限分配。</p>
  </div>
</div>
<script>
  $(document).ready(function(){
    var screenHeight = $(window).height()-150;
    $("#nopermission").height(screenHeight+"px");
  });
</script>
