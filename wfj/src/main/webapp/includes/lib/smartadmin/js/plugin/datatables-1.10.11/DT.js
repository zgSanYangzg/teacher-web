define([],function(){var DT={};return DT.parseData=function(a){if(null!=a.result&&null!=a.result.list){var t;return Array.isArray(a.result.list)?t={aaData:a.result.list,iTotalRecords:a.result.totalRows,iRecordsDisplayrds:a.result.totalRows}:Array.isArray(a.result.result.list)&&(t={aaData:a.result.result.list,iTotalRecords:a.result.totalRows,iRecordsDisplayrds:a.result.totalRows}),t}return Array.isArray(a.result)?{aaData:a.result,iTotalRecords:a.result.length,iRecordsDisplayrds:a.result.length}:{aaData:[],iTotalRecords:0,iRecordsDisplayrds:0}},$.extend($.fn.DataTable.ext.internal,{parseData:DT.parseData}),DT.createTable=function(containerId,dt_options){var scrollHeight=$.mainHeight-160,tableId=containerId+"_table",columns=dt_options.aoColumns,_options={showCheckbox:!1,hasTrBtn:!0,unclickable:!1,showSearch:!0,subScrollHeight:0};if(dt_options=$.extend(_options,dt_options),scrollHeight+=_options.subScrollHeight,dt_options.showCheckbox){var chs={sTitle:'<b><input type="checkbox"  class="tab_checkall"  onclick="checkAll(this,\''+tableId+"')\"  /></b>",bSortable:!1,sDefaultContent:"",sWidth:"5%",sClass:"center"};dt_options.aoColumns.unshift(chs)}var _sDom="<'searchDiv row'<'dataTables_searchbar col-sm-10 col-xs-12'><'dataTables_toolbar col-sm-2 col-xs-12'>><'row-fluid inboxHeader'<'span6'f>r>t<'row-fluid inboxFooter'<'span6'i><'span6'l><'span6'p>>";dt_options.toolbar||(_sDom="<'searchDiv row'<'dataTables_searchbar col-sm-12 col-xs-12'>><'row-fluid inboxHeader'<'span6'f>r>t<'row-fluid inboxFooter'<'span6'i><'span6'l><'span6'p>>");var settings={bPaginate:!0,bDeferRender:!0,bFilter:!1,bSort:!0,bInfo:!0,bAutoWidth:!1,bStateSave:!0,bProcessing:!0,bServerSide:!0,bRetrieve:!0,bDestroy:!0,iDisplayStart:0,iDisplayLength:15,bLengthChange:!0,aLengthMenu:[[15,30,45,60],[15,30,45,60]],bScrollInfinite:!1,sScrollY:scrollHeight,sDom:_sDom,ajax:{url:dt_options.url,dataSrc:function(a){parseData(a)},type:"GET",beforeSend:function(a){a.setRequestHeader("token",token)},error:function(a,t,e){console.log(e)}},language:{url:"includes/lib/smartadmin/js/plugin/datatables-1.10.11/i18n.txt"},aoColumns:columns,aaSorting:dt_options.aaSorting||[0,"asc"],initComplete:function(a,t){if(dt_options.initComplete&&dt_options.initComplete(a,t),dt_options.toolbar){var e=dt_options.toolbar;DT.createToolbar({tableId:tableId,buttons:e.buttons})}if(dt_options.search_fields){var s=dt_options.search_fields;DT.createSearch(dt_options.url,tableId,{fields:s},dt_options.showSearch)}dt_options.toolbar||dt_options.search_fields||$("#"+tableId+"_wrapper .searchDiv").hide(),dt_options.unclickable||DT.bindTrEvent(tableId,dt_options)},fnRowCallback:function(row,data,displayIndex,displayIndexFull){dt_options.fnRowCallback&&dt_options.fnRowCallback(row,data,displayIndex,displayIndexFull),dt_options.showCheckbox&&$("td:eq(0)",row).html('<b><input type="checkbox" class="tabCheckbox" onclick="tabCheck(this)" id="'+eval("data."+dt_options.aoColumns[1].mData)+'"  /></b>')},fnDrawCallback:function(a,t){dt_options.fnDrawCallback&&dt_options.fnDrawCallback(a,t)}},extra=dt_options.extra;if(extra)for(var key in extra)settings[key]=extra[key];var table=$("#"+tableId).dataTable(settings);return table},DT.createToolbar=function(a){var t=a.tableId,e=a.buttons;$.each(e,function(a,e){if("function"==typeof e.callback&&(!e.fid||$.inArray(e.fid,funMap[smid])!=-1)&&0==$("#"+e.btnId).length){var s='<a id="'+e.btnId+'"  fid="'+e.fid+'"  class="btn btn-primary pull-right toolbar_btn" href="javascript:void(0);">'+e.title+"</a>&nbsp;&nbsp;";$("#"+t+"_wrapper div.dataTables_toolbar").append(s),$("#"+e.btnId).click(function(){e.callback&&e.callback()})}})},DT.reloadTable=function(a,t,e){a.indexOf("?")>=0?a=a.substring(0,a.lastIndexOf("?")+1):a+="?",$.each(e,function(t){if("label"==this.type||this.nosearch)return!0;var s=$("#"+this.name).val().trim();"radio"==this.type&&(s=$('.radio[name="'+this.name+'"]>ins.checked').attr("cid")),a+=this.cid+"="+s,t<e.length-1&&(a+="&")}),$("#"+t).DataTable().ajax.url(encodeURI(a)).load()},DT.createSearch=function(a,t,e,s){var o="<form class='form-inline'>",l="";$.each(e.fields,function(a,t){t.newline&&(o+="</br>");var e=t.class?t.class:"";o+='<div class="form-group">';var s=t.placeholder?t.placeholder:"";switch(t.type){case"text":o+='<label class="'+e+'" for="'+t.name+'">'+t.display+"&nbsp;</label>",o+='<input type="text" id="'+t.name+'" class="form-control" placeholder="'+s+'">';break;case"select":var n="";t.options&&$.each(t.options,function(a,t){n+="<option value='"+t.value+"'>"+t.name+"</option>"}),o+='<label class="'+e+'" for="'+t.name+'">'+t.display+"&nbsp;</label>",o+="<select id='"+t.name+"' class='form-control' >"+n+"</select>";break;case"date":o+='<label class="'+e+'" for="'+t.name+'">'+t.display+"&nbsp;</label>",o+="<input detail='"+t.detail+"' datetime='true' type='text' id="+t.name+" class='form-control' placeholder="+s+">";break;case"hidden":o+='<input type="hidden" id="'+t.name+'"  value="'+t.value+'"  class="form-control">';break;case"radio":o+="<label>"+(""==t.display?"":t.display+"&nbsp;")+"</label>",t.options&&$.each(t.options,function(a,e){o+='<div class="radio"  name="'+t.name+'"><ins cid="'+e.value+'" class='+(e.value==t.checked?"checked":"")+"></ins><span>"+e.name+"</span></div>&nbsp;&nbsp;&nbsp;"});break;case"label":l+='<label style="padding: 10px 0;"><label class="'+e+'" style="text-align: right;padding: 0 5px">'+t.display+':</label><span id="'+t.cid+'"></span><span>'+t.name+"</span></label>&nbsp;&nbsp;"}o+="</div>"}),s&&(o+="<button class='btn btn-primary searchButton toolbar_btn' >查询</button>"),l&&(o+="</br>"+l),o+="</form>",$("#"+t+"_wrapper div.dataTables_searchbar").append(o),$("input[datetime='true']").each(function(){var a=$(this).attr("detail"),t="";switch(a){case"hour":t={format:"yyyy-mm-dd hh:ii",autoclose:!0,minView:"hour",language:"zh-CN"};break;case"day":t={format:"yyyy-mm-dd hh",autoclose:!0,minView:"day",language:"zh-CN"};break;case"month":t={format:"yyyy-mm-dd",autoclose:!0,minView:"month",language:"zh-CN"};break;case"year":t={format:"yyyy-mm",autoclose:!0,startView:"year",minView:"year",language:"zh-CN"};break;case"decade":t={format:"yyyy",autoclose:!0,startView:"decade",minView:"decade",language:"zh-CN"}}$(this).datetimepicker(t)}),$("#"+t+"_wrapper .searchButton").click(function(s){s.preventDefault(),s.stopPropagation(),DT.reloadTable(a,t,e.fields)})},DT.bindTrEvent=function(a,t){var e,s="tr>td:not(:nth-child(1))";s=t.showCheckbox&&t.hasTrBtn?"tr>td:not(:nth-child(1),:nth-last-child(1))":t.showCheckbox?"tr>td:not(:nth-child(1))":t.hasTrBtn?"tr>td:not(:nth-last-child(1))":"tr>td",$("#"+a+" tbody").on("click",s,function(){var s=$(this).closest("tr"),o=$("#"+a).dataTable().fnGetData(s);e&&s[0]!=e[0]?($("#"+a+" tbody tr").removeClass("selectTr"),s.addClass("selectTr")):s.toggleClass("selectTr"),s.hasClass("selectTr")?(t.onRowClick&&t.onRowClick(o),$(".opp_result").removeClass("opp_unactive").addClass("opp_active")):$(".opp_result").removeClass("opp_active").addClass("opp_unactive"),e=s})},this.checkAll=function(a,t){$("#"+t+" tbody td:first-child input[type=checkbox]").prop("checked",$(a).is(":checked"))},this.tabCheck=function(a){$(a).is(":checked")?$(a).prop("checked",!0):$(a).prop("checked",!1)},DT});