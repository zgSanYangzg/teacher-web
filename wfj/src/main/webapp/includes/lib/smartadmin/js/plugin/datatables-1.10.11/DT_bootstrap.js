$.extend(!0,$.fn.dataTable.defaults,{sDom:"<'searchDiv'<'dataTables_searchbar'><'dataTables_toolbar'>><'row-fluid inboxHeader'<'span6'f>r>t<'row-fluid inboxFooter'<'span6'i><'span6'l><'span6'p>>",sPaginationType:"bootstrap",oLanguage:{sLengthMenu:"_MENU_ records per page"}}),$.extend($.fn.dataTableExt.oStdClasses,{sWrapper:"dataTables_wrapper form-inline"}),$.fn.dataTableExt.oApi.fnPagingInfo=function(a){return{iStart:a._iDisplayStart,iEnd:a.fnDisplayEnd(),iLength:a._iDisplayLength,iTotal:a.fnRecordsTotal(),iFilteredTotal:a.fnRecordsDisplay(),iPage:a._iDisplayLength===-1?0:Math.ceil(a._iDisplayStart/a._iDisplayLength),iTotalPages:a._iDisplayLength===-1?0:Math.ceil(a.fnRecordsDisplay()/a._iDisplayLength)}},$.extend($.fn.dataTableExt.oPagination,{bootstrap:{fnInit:function(a,e,i){var t=a.oLanguage.oPaginate,n=function(e){e.preventDefault(),a.oApi._fnPageChange(a,e.data.action)&&i(a)};$(e).append('<ul class="pagination"><li class="first disabled"><a href="#"><i class="icon-home"></i> '+t.sFirst+'</a></li><li class="prev disabled"><a href="#"><i class="icon-arrow-left"></i> '+t.sPrevious+'</a></li><li class="next disabled"><a href="#"><i class="icon-arrow-right"></i>'+t.sNext+'  </a></li><li class="last disabled"><a href="#"><i class="icon-home"></i> '+t.sLast+"</a></li></ul>");var l=$("a",e);$(l[0]).bind("click.DT",{action:"first"},n),$(l[1]).bind("click.DT",{action:"previous"},n),$(l[2]).bind("click.DT",{action:"next"},n),$(l[3]).bind("click.DT",{action:"last"},n)},fnUpdate:function(a,e){var i,t,n,l,s,o,r=5,d=a.oInstance.fnPagingInfo(),f=a.aanFeatures.p,c=Math.floor(r/2);for(d.iTotalPages<r?(s=1,o=d.iTotalPages):d.iPage<=c?(s=1,o=r):d.iPage>=d.iTotalPages-c?(s=d.iTotalPages-r+1,o=d.iTotalPages):(s=d.iPage-c+1,o=s+r-1),i=0,t=f.length;i<t;i++){for($("li",f[i]).filter(":not(.first)").filter(":not(.last)").filter(":not(.prev)").filter(":not(.next)").remove(),n=s;n<=o;n++)l=n==d.iPage+1?'class="active"':"",$("<li "+l+'><a href="#">'+n+"</a></li>").insertBefore($("li.next",f[i])[0]).bind("click",function(i){i.preventDefault(),a._iDisplayStart=(parseInt($("a",this).text(),10)-1)*d.iLength,e(a)});0===d.iPage?($("li.first",f[i]).addClass("disabled"),$("li.prev",f[i]).addClass("disabled")):($("li.prev",f[i]).removeClass("disabled"),$("li.first",f[i]).removeClass("disabled")),d.iPage===d.iTotalPages-1||0===d.iTotalPages?($("li.last",f[i]).addClass("disabled"),$("li.next",f[i]).addClass("disabled")):($("li.next",f[i]).removeClass("disabled"),$("li.last",f[i]).removeClass("disabled"))}}}}),$.fn.DataTable.TableTools&&($.extend(!0,$.fn.DataTable.TableTools.classes,{container:"DTTT btn-group",buttons:{normal:"btn",disabled:"disabled"},collection:{container:"DTTT_dropdown dropdown-menu",buttons:{normal:"",disabled:"disabled"}},print:{info:"DTTT_print_info modal"},select:{row:"active"}}),$.extend(!0,$.fn.DataTable.TableTools.DEFAULTS.oTags,{collection:{container:"ul",button:"li",liner:"a"}})),$(document).ready(function(){$("#example").dataTable({sDom:"<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",sPaginationType:"bootstrap",oLanguage:{sLengthMenu:"_MENU_ records per page"}})}),jQuery.fn.dataTableExt.oApi.fnSetFilteringDelay=function(a,e){var i=this;return void 0===e&&(e=250),this.each(function(a){$.fn.dataTableExt.iApiIndex=a;var t=null,n=null,l=$("input",i.fnSettings().aanFeatures.f);return l.unbind("keyup").bind("keyup",function(){null!==n&&n==l.val()||(window.clearTimeout(t),n=l.val(),t=window.setTimeout(function(){$.fn.dataTableExt.iApiIndex=a,i.fnFilter(l.val())},e))}),this}),this};