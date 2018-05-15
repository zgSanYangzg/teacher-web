define(["DT","basetools"],function(e,t){function a(){$.app.pageSetUp(),e.createTable("dept",{url:$.apiPath+moduleName.dept+$.apijoin+"departments"+$.apijoin+"page?parentCode=-1",extra:{bSort:!1},aoColumns:[{sTitle:"sequenceNBR",mData:"sequenceNBR",sClass:"center",bVisible:!1},{sTitle:"部门名称",mData:"departmentName",sClass:"center"},{sTitle:"部门编码",mData:"departmentCode",sClass:"center"},{sTitle:"说明",mData:"description",sClass:"center"},{sTitle:"操作",sDefaultContent:"",sClass:"center",render:function(e,t,a,n){var p=['<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="deptEdit(\''+a.departmentCode+"',"+n.row+')">&nbsp;编辑&nbsp;</a>','<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="deptDel(\''+a.departmentCode+"')\">&nbsp;删除&nbsp;</a>"].join("  ");return p}}],toolbar:{buttons:[{btnId:"dept_add",title:"创建",callback:function(){var e=$(".treeview span.spanck").parent().attr("id"),t=$(".treeview span.spanck").parent().attr("level"),a=parseInt(""==t?0:t)+1;$("#dept_model").modal({backdrop:"static",remote:"dept/deptAdd?pid="+e+"&level="+a})}}]},onRowClick:function(e){$.restAjax({url:$.apiPath+moduleName.dept+$.apijoin+"departments"+$.apijoin+e.departmentCode,type:"get",cache:!1,success:function(e){"200"==e.status&&e.result&&($("#dept_formdetail").removeAttr("loadedinit"),$("#dept_formdetail").json2form({data:e.result,iflabel:!0}))}})}}),$("#dept_tree").treeview({url:$.apiPath+moduleName.dept+$.apijoin+"departments"+$.apijoin+"tree?agencyCode="+agencyCode,text:"departmentName",id:"departmentCode",persist:"cookie",ajax:{type:"get",cache:!1,beforeSend:function(e){e.setRequestHeader("token",token),e.setRequestHeader("Content-Type","application/json;charset=utf-8")}}}),$(".treeview").on("click","span",function(){$(".treeview span").removeClass("spanck"),$(this).addClass("spanck");var e=$(this).parent().attr("id"),t=$.apiPath+moduleName.dept+$.apijoin+"departments"+$.apijoin+"page?parentCode="+e;$("#dept_table").DataTable().ajax.url(encodeURI(t)).load()}),$("#dept_model").on("hidden.bs.modal",function(){$(this).removeData("bs.modal"),$(".opp_result").removeClass("opp_active").addClass("opp_unactive")})}return this.deptEdit=function(e,t){$("#dept_model").modal({backdrop:"static",remote:"dept/deptEdit?id="+e+"&row="+t})},this.deptDel=function(e){$.confirm({title:"确认信息",content:"是否删除所选信息。",confirmButton:"是",cancelButton:"否",confirm:function(){$.restAjax({url:$.apiPath+moduleName.dept+$.apijoin+"departments",type:"delete",data:JSON.stringify([e]),success:function(a){"200"==a.status&&($("#dept_tree").treeview({removeNode:$("li#"+e)}),$("#dept_table").DataTable().ajax.reload(),$(".opp_result").removeClass("opp_active").addClass("opp_unactive"),t.backTip(a,"Y"))}})},cancel:function(){$(".opp_result").removeClass("opp_active").addClass("opp_unactive")}})},{deptTabInit:a}});