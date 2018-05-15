define(["DT","basetools"],function(DT,basetools){var init=function(){$.app.pageSetUp(),$("#agencyCode").val(agencyCode);var dicTab;dicTab=DT.createTable("dicval",{url:$.apiPath+moduleName.dictionary+$.apijoin+"dictionary"+$.apijoin+$("#dictCode").val()+$.apijoin+"entries"+$.apijoin+"page?agencyCode="+agencyCode,aaSorting:[[1,"asc"]],unclickable:!0,extra:{sScrollY:"230px"},aoColumns:[{sTitle:"sequenceNBR",mData:"sequenceNBR",bVisible:!1},{sTitle:"orderNum",mData:"orderNum",bVisible:!1},{sTitle:"字典KEY",mData:"entryKey",sWidth:"20%",sClass:"center",bSortable:!1},{sTitle:"字典VALUE",mData:"entryValue",sWidth:"20%",sClass:"center",bSortable:!1},{sTitle:"字典值描述",mData:"description",sWidth:"25%",sClass:"center",bSortable:!1},{sTitle:"状态",mData:"lockStatus",sWidth:"15%",sClass:"center",render:function(a,t,e,i){return"Y"==e.lockStatus?"禁用":"启用"}},{sTitle:"操作",sDefaultContent:"",sWidth:"20%",sClass:"center",bSortable:!1,render:function(a,t,e,i){var n=[],r="Y"==e.lockStatus?'<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="dicValStatus(\''+e.entryKey+"','"+$("#dictCode").val()+"','"+i.row+"')\">&nbsp;启用&nbsp;</a>":'<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="dicValStatus(\''+e.entryKey+"','"+$("#dictCode").val()+"','"+i.row+"')\">&nbsp;禁用&nbsp;</a>";return n.push(r),n.push('<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="dicValDel(\''+e.entryKey+"','"+$("#dictCode").val()+"')\">&nbsp;删除&nbsp;</a>"),n.join("  ")}}],fnDrawCallback:function(settings){var $this;$("#dicval_table tbody tr td:nth-child(2),#dicval_table tbody tr td:nth-child(3)").css("cursor","pointer").editable(function(){var a=dicTab.fnGetPosition(this),t=dicTab.fnGetData(a[0]);return $.apiPath+moduleName.dictionary+$.apijoin+"dictionary"+$.apijoin+$("#dictCode").val()+$.apijoin+"entry"+$.apijoin+t.entryKey},{callback:function(a,t){"200"==a.status?($("#error_tip").html(""),$("#error_div").attr("style","display:none;"),basetools.backTip(a,"Y"),dicTab.fnDraw()):($("#error_div,#error_tip").attr("style","display:;"),$("#error_tip").html('<em  class="invalid">'+a.message+"</em>"))},type:"textarea",height:"90%",width:"95%",method:"put",submit:"保存",flag:1,name:function(){return $("#dicval_table").DataTable().column(dicTab.fnGetPosition($this)[2]).dataSrc()},ajaxoptions:{dataType:"json",beforeSend:function(a){a.setRequestHeader("token",token),a.setRequestHeader("Content-Type","application/json;charset=utf-8")}},submitdata:function(value,settings){var index=dicTab.fnGetPosition(this),col=$("#dicval_table").DataTable().column(index[2]).dataSrc(),str='{"'+col+'":"'+$(this).find("textarea").val()+'"}';return eval("("+str+")")},onedit:function(a,t){$this=t},onsubmit:function(a,t){var e=dicTab.fnGetPosition(t);$("#dicval_table").DataTable().column(e[2]).dataSrc();return $(this).validate({errorElement:"em",errorContainer:"#error_div",errorLabelContainer:"#error_tip",rules:{dictDataValue:{required:!0,maxlength:200},dictDataDesc:{maxlength:200}},messages:{dictDataValue:{required:" 字典VALUE不能为空",maxlength:" 字典VALUE不能超过200个字符"},dictDataDesc:{maxlength:" 字典值描述不能超过200个字符"}},errorClass:"invalid"}),$(this).valid()}})}});var ifChange=!1;$("#dicvaladd_form input,textarea").change(function(){ifChange=!0}),$("#dicvaladd_form").validate({errorElement:"em",errorContainer:"#error_div",errorLabelContainer:"#error_tip",rules:{entryKey:{required:!0,maxlength:16,isBusinessNo:!0,remote:{type:"get",cache:!1,url:function(){return $.apiPath+moduleName.dictionary+$.apijoin+"dictionary"+$.apijoin+$("#dictCode").val()+$.apijoin+"entry"+$.apijoin+$("#entryKey").val()+$.apijoin+"available"},data:{key:function(){return $("#entryKey").val()},code:function(){return $("#dictCode").val()},agencyCode:agencyCode},beforeSend:function(a){a.setRequestHeader("token",token),a.setRequestHeader("Content-Type","application/json;charset=utf-8")}}},entryValue:{required:!0,maxlength:200},description:{maxlength:200}},messages:{entryKey:{required:" 字典KEY不能为空；",maxlength:" 字典KEY不能超过16个字符；",isBusinessNo:" 字典KEY只接受字母,数字,下划线；",remote:" 字典KEY已经存在；"},entryValue:{required:" 字典VALUE不能为空；",maxlength:" 字典VALUE不能超过200个字符；"},description:{maxlength:" 字典值描述不能超过200个字符；"}},submitHandler:function(a){var t=$("#dicvaladd_form").form2json();$.restAjax({url:$.apiPath+moduleName.dictionary+$.apijoin+"dictionary"+$.apijoin+$("#dictCode").val()+$.apijoin+"entry",type:"POST",dataType:"json",data:t,async:!1,success:function(a){"200"==a.status&&($("#dicvaladd_form").resetForm(),$("#entryKey").removeData("previousValue"),$('#dicvaladd_form input[type="text"],textarea').val(""),$("#dicval_table").DataTable().ajax.reload(),basetools.backTip(a,"Y"))}})}}),$("#dicval_cancel").click(function(){ifChange?$.confirm({title:"确认信息",content:"确认取消当前所做的操作",confirmButton:"是",cancelButton:"否",confirm:function(){$("#dicval_close").click()}}):$("#dicval_close").click()})};return this.dicValDel=function(a,t){$.confirm({title:"确认信息",content:"确认取消当前所做的操作",confirmButton:"是",cancelButton:"否",confirm:function(){$.restAjax({url:$.apiPath+moduleName.dictionary+$.apijoin+"dictionary"+$.apijoin+t+$.apijoin+"entries",type:"delete",data:JSON.stringify([a]),success:function(a){"200"==a.status&&($("#dicval_table").DataTable().ajax.reload(),basetools.backTip(a,"Y"))}})}})},this.dicValStatus=function(a,t,e){$.restAjax({url:$.apiPath+moduleName.dictionary+$.apijoin+"dictionary"+$.apijoin+t+$.apijoin+"entry"+$.apijoin+a+$.apijoin+"lockStatus",type:"put",dataType:"json",success:function(a){"200"==a.status&&($("#dicval_table").dataTable().fnUpdate(a.result,e,null,!1),basetools.backTip(a,"Y"))}})},{init:init}});