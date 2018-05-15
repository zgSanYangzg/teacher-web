<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!-- widget grid -->
<section id="widget-grid" class="">
<div class="row">
   <div class="col-xs-12 col-sm-7 col-md-7 col-lg-4">
		<h1 class="page-title txt-color-blueDark">
			<i class="fa fa-table fa-fw "></i> 
				标题一 
			<span>> 
				标题2
			</span>
			<span>> 
				标题4
			</span>
		</h1>
	</div>
</div>

<!-- row -->
<div class="row" style="margin-top:20px">
     <div class="col-md-12">
		<table id="dt_basic" class="table table-striped table-bordered table-hover ">
		<thead>
				<tr>
					<th>国家</th>
					<th>Name</th>
				</tr>
			</thead>
		</table>
     </div>	
</div><!-- end row -->
</section>
				
<script type="text/javascript">
pageSetUp();
loadDataTableScripts();
function loadDataTableScripts() {
	loadScript("includes/lib/smartadmin/js/plugin/datatables/media/js/jquery.dataTables.js", dt_2);

	function dt_2() {
		loadScript("includes/lib/smartadmin/js/plugin/datatables/extensions/dataTables.colReorder.min.js", dt_3);
	}

	function dt_3() {
		loadScript("includes/lib/smartadmin/js/plugin/datatables/extensions/dataTables.fixedColumns.min.js", dt_4);
	}

	function dt_4() {
		loadScript("includes/lib/smartadmin/js/plugin/datatables/extensions/dataTables.colVis.min.js", dt_5);
	}

 	function dt_5() {
		loadScript("includes/lib/smartadmin/js/plugin/datatables/ZeroClipboard.js", dt_6);
 	}

	function dt_6() {
		loadScript("includes/lib/smartadmin/js/plugin/datatables/extensions/dataTables.tableTools.min.js", dt_7);
	}

	function dt_7() {
		loadScript("includes/lib/smartadmin/js/plugin/datatables/DT_bootstrap.js", runDataTables);
	} 


}

function runDataTables(){
/* 	$('#dt_basic').dataTable({
		"sPaginationType" : "bootstrap_full",
		"sAjaxDataProp":"Rows",
		"aoColumns": [
		              { "mDataProp": "Country" },
		              { "mDataProp": "Name" }
		             ],
         "sAjaxSource":"myPage.json"
	}); */
	
	$('#dt_basic').dataTable({
		//"sPaginationType" : "bootstrap_full",
		//"sAjaxDataProp":"Rows",
		"bPaginate": true,        //分页显示工具条显示控制
        "bLengthChange": true,    //每页显示记录条数选择显示控制
        "bFilter": true,         //页面搜索过滤显示控制
        "bSort": true,           //点击列动态排序是否启用控制
        "bInfo": true,           //是否消息提示
        "bAutoWidth": false,      //是否自适应宽度
        "bStateSave": true,      //保存状态到cookie  
        "bProcessing": true,     //以指定当服务端正在处理数据的时候，是否显示“正在处理”这个提示信息
        "bServerSide": false,    //使用ajax，在服务器端整理数据,处理dataTable,如果开启前端排序不起作用
        "bRetrieve": true,      //是否开启自动检索
        "bDestroy": true,       //是否开启自动销毁
        "language": {
            "emptyTable":     "无记录",
            "info":           "总共 _TOTAL_ 条记录", //"第 _START_ 至 _END_ 页 ( 总共 _TOTAL_ 页 )",
            "infoEmpty":      "无记录",
            "infoFiltered":   "(从 _MAX_ 条记录过滤)",
            "infoPostFix":    "",
            "thousands":      ",",
            "lengthMenu":     "每页 _MENU_ 条记录",
            "loadingRecords": "初始化中...",
            "processing":     "正在加载...",
            "search":         "查找:",
            "zeroRecords":    "没有找到记录",
            "paginate": {
                "first":      "首页",
                "last":       "末页",
                "next":       "下一页",
                "previous":   "上一页"
            },
            "aria": {
                "sortAscending":  ": 升序",
                "sortDescending": ": 降序"
            }
        },
		"aoColumns": [
		              { "mDataProp": "Country" },
		              { "mDataProp": "Name" }
		             ],
		"ajax":{"url":"myPage.json"}

	});
}

	
</script>