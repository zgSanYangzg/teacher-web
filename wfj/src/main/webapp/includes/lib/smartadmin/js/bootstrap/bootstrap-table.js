!function(t){"use strict";var i=function(t){var i=arguments,e=!0,s=1;return t=t.replace(/%s/g,function(){var t=i[s++];return"undefined"==typeof t?(e=!1,""):t}),e?t:""},e=function(i,e,s,o){var n="";return t.each(i,function(t,i){return i[e]!==o||(n=i[s],!1)}),n},s=function(i,e){var s=-1;return t.each(i,function(t,i){return i.field!==e||(s=t,!1)}),s},o=function(){var i,e,s=t("<p/>").addClass("fixed-table-scroll-inner"),o=t("<div/>").addClass("fixed-table-scroll-outer");return o.append(s),t("body").append(o),i=s[0].offsetWidth,o.css("overflow","scroll"),e=s[0].offsetWidth,i==e&&(e=o[0].clientWidth),o.remove(),i-e},n=function(i,e,s,o){if("string"==typeof e){var n=e.split(".");n.length>1?(e=window,t.each(n,function(t,i){e=e[i]})):e=window[e]}return"object"==typeof e?e:"function"==typeof e?e.apply(i,s):o},a=function(t){return"string"==typeof t?t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):t},r=function(i,e){this.options=e,this.$el=t(i),this.$el_=this.$el.clone(),this.timeoutId_=0,this.init()};r.DEFAULTS={classes:"table table-hover",height:void 0,undefinedText:"-",sortName:void 0,sortOrder:"asc",striped:!1,columns:[],data:[],method:"get",url:void 0,cache:!0,contentType:"application/json",dataType:"json",queryParams:function(t){return t},queryParamsType:"limit",responseHandler:function(t){return t},pagination:!1,sidePagination:"client",totalRows:0,pageNumber:1,pageSize:10,pageList:[10,25,50,100],search:!1,searchAlign:"right",selectItemName:"btSelectItem",showHeader:!0,showColumns:!1,showRefresh:!1,showToggle:!1,smartDisplay:!0,minimumCountColumns:1,idField:void 0,cardView:!1,clickToSelect:!1,singleSelect:!1,toolbar:void 0,toolbarAlign:"right",checkboxHeader:!0,sortable:!0,maintainSelected:!1,searchTimeOut:500,iconsPrefix:"glyphicon",icons:{refresh:"glyphicon-refresh icon-refresh",toggle:"glyphicon-list-alt icon-list-alt",columns:"glyphicon-th icon-th"},rowStyle:function(t,i){return{}},rowAttributes:function(t,i){return{}},onAll:function(t,i){return!1},onClickRow:function(t,i){return!1},onDblClickRow:function(t,i){return!1},onSort:function(t,i){return!1},onCheck:function(t){return!1},onUncheck:function(t){return!1},onCheckAll:function(){return!1},onUncheckAll:function(){return!1},onLoadSuccess:function(t){return!1},onLoadError:function(t){return!1},onColumnSwitch:function(t,i){return!1},onPageChange:function(t,i){return!1},onSearch:function(t){return!1},onPreBody:function(t){return!1},onPostBody:function(){return!1}},r.LOCALES=[],r.LOCALES["en-US"]={formatLoadingMessage:function(){return"Loading, please wait…"},formatRecordsPerPage:function(t){return i("%s records per page",t)},formatShowingRows:function(t,e,s){return i("Showing %s to %s of %s rows",t,e,s)},formatSearch:function(){return"Search"},formatNoMatches:function(){return"No matching records found"},formatRefresh:function(){return"Refresh"},formatToggle:function(){return"Toggle"},formatColumns:function(){return"Columns"}},t.extend(r.DEFAULTS,r.LOCALES["en-US"]),r.COLUMN_DEFAULTS={radio:!1,checkbox:!1,checkboxEnabled:!0,field:void 0,title:void 0,class:void 0,align:void 0,halign:void 0,valign:void 0,width:void 0,sortable:!1,order:"asc",visible:!0,switchable:!0,clickToSelect:!0,formatter:void 0,events:void 0,sorter:void 0,cellStyle:void 0,searchable:!0},r.EVENTS={"all.bs.table":"onAll","click-row.bs.table":"onClickRow","dbl-click-row.bs.table":"onDblClickRow","sort.bs.table":"onSort","check.bs.table":"onCheck","uncheck.bs.table":"onUncheck","check-all.bs.table":"onCheckAll","uncheck-all.bs.table":"onUncheckAll","load-success.bs.table":"onLoadSuccess","load-error.bs.table":"onLoadError","column-switch.bs.table":"onColumnSwitch","page-change.bs.table":"onPageChange","search.bs.table":"onSearch","pre-body.bs.table":"onPreBody","post-body.bs.table":"onPostBody"},r.prototype.init=function(){this.initContainer(),this.initTable(),this.initHeader(),this.initData(),this.initToolbar(),this.initPagination(),this.initBody(),this.initServer()},r.prototype.initContainer=function(){this.$container=t(['<div class="bootstrap-table">','<div class="fixed-table-toolbar"></div>','<div class="fixed-table-container">','<div class="fixed-table-header"><table></table></div>','<div class="fixed-table-body">','<div class="fixed-table-loading">',this.options.formatLoadingMessage(),"</div>","</div>",'<div class="fixed-table-pagination"></div>',"</div>","</div>"].join("")),this.$container.insertAfter(this.$el),this.$container.find(".fixed-table-body").append(this.$el),this.$container.after('<div class="clearfix"></div>'),this.$loading=this.$container.find(".fixed-table-loading"),this.$el.addClass(this.options.classes),this.options.striped&&this.$el.addClass("table-striped")},r.prototype.initTable=function(){var i=this,e=[],s=[];this.$header=this.$el.find("thead"),this.$header.length||(this.$header=t("<thead></thead>").appendTo(this.$el)),this.$header.find("tr").length||this.$header.append("<tr></tr>"),this.$header.find("th").each(function(){var i=t.extend({},{title:t(this).html(),class:t(this).attr("class")},t(this).data());e.push(i)}),this.options.columns=t.extend([],e,this.options.columns),t.each(this.options.columns,function(e,s){i.options.columns[e]=t.extend({},r.COLUMN_DEFAULTS,{field:e},s)}),this.options.data.length||(this.$el.find("tbody tr").each(function(){var e={};e._id=t(this).attr("id"),e._class=t(this).attr("class"),t(this).find("td").each(function(s){var o=i.options.columns[s].field;e[o]=t(this).html(),e["_"+o+"_id"]=t(this).attr("id"),e["_"+o+"_class"]=t(this).attr("class")}),s.push(e)}),this.options.data=s)},r.prototype.initHeader=function(){var e=this,s=[],o=[];this.header={fields:[],styles:[],classes:[],formatters:[],events:[],sorters:[],cellStyles:[],clickToSelects:[],searchables:[]},t.each(this.options.columns,function(t,n){var a="",r="",h="",l="",c=i(' class="%s"',n.class);e.options.sortOrder||n.order;n.visible&&(r=i("text-align: %s; ",n.halign?n.halign:n.align),h=i("text-align: %s; ",n.align),l=i("vertical-align: %s; ",n.valign),l+=i("width: %spx; ",n.checkbox||n.radio?36:n.width),s.push(n),e.header.fields.push(n.field),e.header.styles.push(h+l),e.header.classes.push(c),e.header.formatters.push(n.formatter),e.header.events.push(n.events),e.header.sorters.push(n.sorter),e.header.cellStyles.push(n.cellStyle),e.header.clickToSelects.push(n.clickToSelect),e.header.searchables.push(n.searchable),o.push("<th",n.checkbox||n.radio?i(' class="bs-checkbox %s"',n.class||""):c,i(' style="%s"',r+l),">"),o.push(i('<div class="th-inner %s">',e.options.sortable&&n.sortable?"sortable":"")),a=n.title,e.options.sortName===n.field&&e.options.sortable&&n.sortable&&(a+=e.getCaretHtml()),n.checkbox&&(!e.options.singleSelect&&e.options.checkboxHeader&&(a='<input name="btSelectAll" type="checkbox" />'),e.header.stateField=n.field),n.radio&&(a="",e.header.stateField=n.field,e.options.singleSelect=!0),o.push(a),o.push("</div>"),o.push('<div class="fht-cell"></div>'),o.push("</th>"))}),this.$header.find("tr").html(o.join("")),this.$header.find("th").each(function(i){t(this).data(s[i])}),this.$container.off("click","th").on("click","th",function(i){e.options.sortable&&t(this).data().sortable&&e.onSort(i)}),!this.options.showHeader||this.options.cardView?(this.$header.hide(),this.$container.find(".fixed-table-header").hide(),this.$loading.css("top",0)):(this.$header.show(),this.$container.find(".fixed-table-header").show(),this.$loading.css("top","37px")),this.$selectAll=this.$header.find('[name="btSelectAll"]'),this.$container.off("click",'[name="btSelectAll"]').on("click",'[name="btSelectAll"]',function(){var i=t(this).prop("checked");e[i?"checkAll":"uncheckAll"]()})},r.prototype.initData=function(t,i){i?this.data=this.data.concat(t):this.data=t||this.options.data,this.options.data=this.data,"server"!==this.options.sidePagination&&this.initSort()},r.prototype.initSort=function(){var i=this,e=this.options.sortName,s="desc"===this.options.sortOrder?-1:1,o=t.inArray(this.options.sortName,this.header.fields);o!==-1&&this.data.sort(function(a,r){var h=a[e],l=r[e],c=n(i.header,i.header.sorters[o],[h,l]);return void 0!==c?s*c:(t.isNumeric(h)&&(h=parseFloat(h)),t.isNumeric(l)&&(l=parseFloat(l)),void 0!==h&&null!==h||(h=""),void 0!==h&&null!==l||(l=""),h===l?0:h<l?s*-1:s)})},r.prototype.onSort=function(i){var e=t(i.currentTarget),s=this.$header.find("th").eq(e.index());return this.$header.add(this.$header_).find("span.order").remove(),this.options.sortName===e.data("field")?this.options.sortOrder="asc"===this.options.sortOrder?"desc":"asc":(this.options.sortName=e.data("field"),this.options.sortOrder="asc"===e.data("order")?"desc":"asc"),this.trigger("sort",this.options.sortName,this.options.sortOrder),e.add(s).data("order",this.options.sortOrder).find(".th-inner").append(this.getCaretHtml()),"server"===this.options.sidePagination?void this.initServer():(this.initSort(),void this.initBody())},r.prototype.initToolbar=function(){var e,s,o=this,a=[],r=0,h=0;this.$toolbar=this.$container.find(".fixed-table-toolbar").html(""),"string"==typeof this.options.toolbar&&t('<div class="bars pull-left"></div>').appendTo(this.$toolbar).append(t(this.options.toolbar)),a=['<div class="columns columns-'+this.options.toolbarAlign+" btn-group pull-"+this.options.toolbarAlign+'">'],"string"==typeof this.options.icons&&(this.options.icons=n(null,this.options.icons)),this.options.showRefresh&&a.push(i('<button class="btn btn-default" type="button" name="refresh" title="%s">',this.options.formatRefresh()),i('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.refresh),"</button>"),this.options.showToggle&&a.push(i('<button class="btn btn-default" type="button" name="toggle" title="%s">',this.options.formatToggle()),i('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.toggle),"</button>"),this.options.showColumns&&(a.push(i('<div class="keep-open btn-group" title="%s">',this.options.formatColumns()),'<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">',i('<i class="%s %s"></i>',this.options.iconsPrefix,this.options.icons.columns),' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'),t.each(this.options.columns,function(t,e){if(!e.radio&&!e.checkbox){var s=e.visible?' checked="checked"':"";e.switchable&&(a.push(i('<li><label><input type="checkbox" data-field="%s" value="%s"%s> %s</label></li>',e.field,t,s,e.title)),h++)}}),a.push("</ul>","</div>")),a.push("</div>"),a.length>2&&this.$toolbar.append(a.join("")),this.options.showRefresh&&this.$toolbar.find('button[name="refresh"]').off("click").on("click",t.proxy(this.refresh,this)),this.options.showToggle&&this.$toolbar.find('button[name="toggle"]').off("click").on("click",function(){o.options.cardView=!o.options.cardView,o.initHeader(),o.initBody()}),this.options.showColumns&&(e=this.$toolbar.find(".keep-open"),h<=this.options.minimumCountColumns&&e.find("input").prop("disabled",!0),e.find("li").off("click").on("click",function(t){t.stopImmediatePropagation()}),e.find("input").off("click").on("click",function(){var i=t(this);o.toggleColumn(i.val(),i.prop("checked"),!1),o.trigger("column-switch",t(this).data("field"),i.prop("checked"))})),this.options.search&&(a=[],a.push('<div class="pull-'+this.options.searchAlign+' search">',i('<input class="form-control" type="text" placeholder="%s">',this.options.formatSearch()),"</div>"),this.$toolbar.append(a.join("")),s=this.$toolbar.find(".search input"),s.off("keyup").on("keyup",function(t){clearTimeout(r),r=setTimeout(function(){o.onSearch(t)},o.options.searchTimeOut)}))},r.prototype.onSearch=function(i){var e=t.trim(t(i.currentTarget).val());t(i.currentTarget).val(e),e!==this.searchText&&(this.searchText=e,this.options.pageNumber=1,this.initSearch(),this.updatePagination(),this.trigger("search",e))},r.prototype.initSearch=function(){var i=this;if("server"!==this.options.sidePagination){var e=this.searchText&&this.searchText.toLowerCase(),s=t.isEmptyObject(this.filterColumns)?null:this.filterColumns;this.data=s?t.grep(this.options.data,function(t,i){for(var e in s)if(t[e]!==s[e])return!1;return!0}):this.options.data,this.data=e?t.grep(this.data,function(s,o){for(var a in s){a=t.isNumeric(a)?parseInt(a,10):a;var r=s[a];r=n(i.header,i.header.formatters[t.inArray(a,i.header.fields)],[r,s,o],r);var h=t.inArray(a,i.header.fields);if(h!==-1&&i.header.searchables[h]&&("string"==typeof r||"number"==typeof r)&&(r+"").toLowerCase().indexOf(e)!==-1)return!0}return!1}):this.data}},r.prototype.initPagination=function(){if(this.$pagination=this.$container.find(".fixed-table-pagination"),this.options.pagination){var e,s,o,n,a,r,h,l,c,d=this,p=[],u=this.getData();"server"!==this.options.sidePagination&&(this.options.totalRows=u.length),this.totalPages=0,this.options.totalRows&&(this.totalPages=~~((this.options.totalRows-1)/this.options.pageSize)+1),this.totalPages>0&&this.options.pageNumber>this.totalPages&&(this.options.pageNumber=this.totalPages),this.pageFrom=(this.options.pageNumber-1)*this.options.pageSize+1,this.pageTo=this.options.pageNumber*this.options.pageSize,this.pageTo>this.options.totalRows&&(this.pageTo=this.options.totalRows),p.push('<div class="pull-left pagination-detail">','<span class="pagination-info">',this.options.formatShowingRows(this.pageFrom,this.pageTo,this.options.totalRows),"</span>"),p.push('<span class="page-list">');var f=['<span class="btn-group dropup">','<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">','<span class="page-size">',this.options.pageSize,"</span>",' <span class="caret"></span>',"</button>",'<ul class="dropdown-menu" role="menu">'],g=this.options.pageList;if("string"==typeof this.options.pageList){var b=this.options.pageList.slice(1,-1).replace(/ /g,"").split(",");g=[],t.each(b,function(t,i){g.push(+i)})}for(t.each(g,function(t,e){if(!d.options.smartDisplay||d.options.totalRows>=e||0===t){var s=e===d.options.pageSize?' class="active"':"";f.push(i('<li%s><a href="javascript:void(0)">%s</a></li>',s,e))}}),f.push("</ul></span>"),p.push(this.options.formatRecordsPerPage(f.join(""))),p.push("</span>"),p.push("</div>",'<div class="pull-right pagination">','<ul class="pagination">','<li class="page-first"><a href="javascript:void(0)">&lt;&lt;</a></li>','<li class="page-pre"><a href="javascript:void(0)">&lt;</a></li>'),this.totalPages<5?(s=1,o=this.totalPages):(s=this.options.pageNumber-2,o=s+4,s<1&&(s=1,o=5),o>this.totalPages&&(o=this.totalPages,s=o-4)),e=s;e<=o;e++)p.push('<li class="page-number'+(e===this.options.pageNumber?" active disabled":"")+'">','<a href="javascript:void(0)">',e,"</a>","</li>");p.push('<li class="page-next"><a href="javascript:void(0)">&gt;</a></li>','<li class="page-last"><a href="javascript:void(0)">&gt;&gt;</a></li>',"</ul>","</div>"),this.$pagination.html(p.join("")),n=this.$pagination.find(".page-list a"),a=this.$pagination.find(".page-first"),r=this.$pagination.find(".page-pre"),h=this.$pagination.find(".page-next"),l=this.$pagination.find(".page-last"),c=this.$pagination.find(".page-number"),this.options.pageNumber<=1&&(a.addClass("disabled"),r.addClass("disabled")),this.options.pageNumber>=this.totalPages&&(h.addClass("disabled"),l.addClass("disabled")),this.options.smartDisplay&&(this.totalPages<=1&&this.$pagination.find("div.pagination").hide(),(this.options.pageList.length<2||this.options.totalRows<=this.options.pageList[1])&&this.$pagination.find("span.page-list").hide(),this.$pagination[this.getData().length?"show":"hide"]()),n.off("click").on("click",t.proxy(this.onPageListChange,this)),a.off("click").on("click",t.proxy(this.onPageFirst,this)),r.off("click").on("click",t.proxy(this.onPagePre,this)),h.off("click").on("click",t.proxy(this.onPageNext,this)),l.off("click").on("click",t.proxy(this.onPageLast,this)),c.off("click").on("click",t.proxy(this.onPageNumber,this))}},r.prototype.updatePagination=function(i){i&&t(i.currentTarget).hasClass("disabled")||(this.options.maintainSelected||this.resetRows(),this.initPagination(),"server"===this.options.sidePagination?this.initServer():this.initBody(),this.trigger("page-change",this.options.pageSize,this.options.pageNumber))},r.prototype.onPageListChange=function(i){var e=t(i.currentTarget);e.parent().addClass("active").siblings().removeClass("active"),this.options.pageSize=+e.text(),this.$toolbar.find(".page-size").text(this.options.pageSize),this.updatePagination(i)},r.prototype.onPageFirst=function(t){this.options.pageNumber=1,this.updatePagination(t)},r.prototype.onPagePre=function(t){this.options.pageNumber--,this.updatePagination(t)},r.prototype.onPageNext=function(t){this.options.pageNumber++,this.updatePagination(t)},r.prototype.onPageLast=function(t){this.options.pageNumber=this.totalPages,this.updatePagination(t)},r.prototype.onPageNumber=function(i){this.options.pageNumber!==+t(i.currentTarget).text()&&(this.options.pageNumber=+t(i.currentTarget).text(),this.updatePagination(i))},r.prototype.initBody=function(o){var r=this,h=[],l=this.getData();this.trigger("pre-body",l),this.$body=this.$el.find("tbody"),this.$body.length||(this.$body=t("<tbody></tbody>").appendTo(this.$el)),"server"===this.options.sidePagination&&(l=this.data),this.options.pagination&&"server"!==this.options.sidePagination||(this.pageFrom=1,this.pageTo=l.length);for(var c=this.pageFrom-1;c<this.pageTo;c++){var d=l[c],p={},u=[],f={},g=[];if(p=n(this.options,this.options.rowStyle,[d,c],p),p&&p.css)for(var b in p.css)u.push(b+": "+p.css[b]);if(f=n(this.options,this.options.rowAttributes,[d,c],f))for(var b in f)g.push(i('%s="%s"',b,a(f[b])));h.push("<tr",i(" %s",g.join(" ")),i(' id="%s"',t.isArray(d)?void 0:d._id),i(' class="%s"',p.classes||(t.isArray(d)?void 0:d._class)),i(' data-index="%s"',c),">"),this.options.cardView&&h.push(i('<td colspan="%s">',this.header.fields.length)),t.each(this.header.fields,function(t,o){var a="",l=d[o],f="",g={},b="",m=r.header.classes[t],v=r.options.columns[s(r.options.columns,o)];if(p=i('style="%s"',u.concat(r.header.styles[t]).join("; ")),l=n(r.header,r.header.formatters[t],[l,d,c],l),d["_"+o+"_id"]&&(b=i(' id="%s"',d["_"+o+"_id"])),d["_"+o+"_class"]&&(m=i(' class="%s"',d["_"+o+"_class"])),g=n(r.header,r.header.cellStyles[t],[l,d,c],g),g.classes&&(m=i(' class="%s"',g.classes)),g.css){u=[];for(var y in g.css)u.push(y+": "+g.css[y]);p=i('style="%s"',u.concat(r.header.styles[t]).join("; "))}if(v.checkbox||v.radio){if(r.options.cardView)return!0;f=v.checkbox?"checkbox":f,f=v.radio?"radio":f,a=['<td class="bs-checkbox">',"<input"+i(' data-index="%s"',c)+i(' name="%s"',r.options.selectItemName)+i(' type="%s"',f)+i(' value="%s"',d[r.options.idField])+i(' checked="%s"',l===!0||l&&l.checked?"checked":void 0)+i(' disabled="%s"',!v.checkboxEnabled||l&&l.disabled?"disabled":void 0)+" />","</td>"].join("")}else l="undefined"==typeof l||null===l?r.options.undefinedText:l,a=r.options.cardView?['<div class="card-view">',r.options.showHeader?i('<span class="title" %s>%s</span>',p,e(r.options.columns,"field","title",o)):"",i('<span class="value">%s</span>',l),"</div>"].join(""):[i("<td%s %s %s>",b,m,p),l,"</td>"].join(""),r.options.cardView&&r.options.smartDisplay&&""===l&&(a="");h.push(a)}),this.options.cardView&&h.push("</td>"),h.push("</tr>")}h.length||h.push('<tr class="no-records-found">',i('<td colspan="%s">%s</td>',this.header.fields.length,this.options.formatNoMatches()),"</tr>"),this.$body.html(h.join("")),o||this.scrollTo(0),this.$body.find("> tr > td").off("click").on("click",function(){var e=t(this).parent();r.trigger("click-row",r.data[e.data("index")],e),r.options.clickToSelect&&r.header.clickToSelects[e.children().index(t(this))]&&e.find(i('[name="%s"]',r.options.selectItemName))[0].click()}),this.$body.find("tr").off("dblclick").on("dblclick",function(){r.trigger("dbl-click-row",r.data[t(this).data("index")],t(this))}),this.$selectItem=this.$body.find(i('[name="%s"]',this.options.selectItemName)),this.$selectItem.off("click").on("click",function(i){i.stopImmediatePropagation();var e=t(this).prop("checked"),s=r.data[t(this).data("index")];s[r.header.stateField]=e,r.trigger(e?"check":"uncheck",s),r.options.singleSelect&&(r.$selectItem.not(this).each(function(){r.data[t(this).data("index")][r.header.stateField]=!1}),r.$selectItem.filter(":checked").not(this).prop("checked",!1)),r.updateSelected()}),t.each(this.header.events,function(i,e){if(e){"string"==typeof e&&(e=n(null,e));for(var s in e)r.$body.find("tr").each(function(){var o=t(this),n=o.find(r.options.cardView?".card-view":"td").eq(i),a=s.indexOf(" "),h=s.substring(0,a),l=s.substring(a+1),c=e[s];n.find(l).off(h).on(h,function(t){var e=o.data("index"),s=r.data[e],n=s[r.header.fields[i]];c.apply(this,[t,n,s,e])})})}}),this.updateSelected(),this.resetView(),this.trigger("post-body")},r.prototype.initServer=function(i){var e=this,s={},o={pageSize:this.options.pageSize,pageNumber:this.options.pageNumber,searchText:this.searchText,sortName:this.options.sortName,sortOrder:this.options.sortOrder};this.options.url&&("limit"===this.options.queryParamsType&&(o={limit:o.pageSize,offset:o.pageSize*(o.pageNumber-1),search:o.searchText,sort:o.sortName,order:o.sortOrder}),s=n(this.options,this.options.queryParams,[o],s),s!==!1&&(i||this.$loading.show(),t.ajax({type:this.options.method,url:this.options.url,data:s,cache:this.options.cache,contentType:this.options.contentType,dataType:this.options.dataType,success:function(t){t=n(e.options,e.options.responseHandler,[t],t);var i=t;"server"===e.options.sidePagination&&(e.options.totalRows=t.total,i=t.rows),e.load(i),e.trigger("load-success",i)},error:function(t){e.trigger("load-error",t.status)},complete:function(){i||e.$loading.hide()}})))},r.prototype.getCaretHtml=function(){return['<span class="order'+("desc"===this.options.sortOrder?"":" dropup")+'">','<span class="caret" style="margin: 10px 5px;"></span>',"</span>"].join("")},r.prototype.updateSelected=function(){var i=this.$selectItem.filter(":enabled").length===this.$selectItem.filter(":enabled").filter(":checked").length;this.$selectAll.add(this.$selectAll_).prop("checked",i),this.$selectItem.each(function(){t(this).parents("tr")[t(this).prop("checked")?"addClass":"removeClass"]("selected")})},r.prototype.updateRows=function(i){var e=this;this.$selectItem.each(function(){e.data[t(this).data("index")][e.header.stateField]=i})},r.prototype.resetRows=function(){var i=this;t.each(this.data,function(t,e){i.$selectAll.prop("checked",!1),i.$selectItem.prop("checked",!1),e[i.header.stateField]=!1})},r.prototype.trigger=function(i){var e=Array.prototype.slice.call(arguments,1);i+=".bs.table",this.options[r.EVENTS[i]].apply(this.options,e),this.$el.trigger(t.Event(i),e),this.options.onAll(i,e),this.$el.trigger(t.Event("all.bs.table"),[i,e])},r.prototype.resetHeader=function(){var i=this,e=this.$container.find(".fixed-table-header"),s=this.$container.find(".fixed-table-body"),n=this.$el.width()>s.width()?o():0;return this.$el.is(":hidden")?(clearTimeout(this.timeoutId_),void(this.timeoutId_=setTimeout(t.proxy(this.resetHeader,this),100))):(this.$header_=this.$header.clone(!0,!0),this.$selectAll_=this.$header_.find('[name="btSelectAll"]'),void setTimeout(function(){e.css({height:"37px","border-bottom":"1px solid #dddddd","margin-right":n}).find("table").css("width",i.$el.css("width")).html("").attr("class",i.$el.attr("class")).append(i.$header_),i.$header.find("th").each(function(e){i.$header_.find("th").eq(e).data(t(this).data())}),i.$body.find("tr:first-child:not(.no-records-found) > *").each(function(e){i.$header_.find("div.fht-cell").eq(e).width(t(this).innerWidth())}),i.$el.css("margin-top",-i.$header.height()),s.off("scroll").on("scroll",function(){e.scrollLeft(t(this).scrollLeft())})}))},r.prototype.toggleColumn=function(t,e,s){if(t!==-1&&(this.options.columns[t].visible=e,this.initHeader(),this.initSearch(),this.initPagination(),this.initBody(),this.options.showColumns)){var o=this.$toolbar.find(".keep-open input").prop("disabled",!1);s&&o.filter(i('[value="%s"]',t)).prop("checked",e),o.filter(":checked").length<=this.options.minimumCountColumns&&o.filter(":checked").prop("disabled",!0)}},r.prototype.resetView=function(t){var i=this;this.header;if(t&&t.height&&(this.options.height=t.height),this.$selectAll.prop("checked",this.$selectItem.length>0&&this.$selectItem.length===this.$selectItem.filter(":checked").length),this.options.height){var e=+this.$toolbar.children().outerHeight(!0),s=+this.$pagination.children().outerHeight(!0),o=this.options.height-e-s;this.$container.find(".fixed-table-container").css("height",o+"px")}return this.options.cardView?(i.$el.css("margin-top","0"),void i.$container.find(".fixed-table-container").css("padding-bottom","0")):(this.options.showHeader&&this.options.height&&this.resetHeader(),void(this.options.height&&this.options.showHeader&&this.$container.find(".fixed-table-container").css("padding-bottom","37px")))},r.prototype.getData=function(){return this.searchText||!t.isEmptyObject(this.filterColumns)?this.data:this.options.data},r.prototype.load=function(t){this.initData(t),this.initSearch(),this.initPagination(),this.initBody()},r.prototype.append=function(t){this.initData(t,!0),this.initSearch(),this.initPagination(),this.initBody(!0)},r.prototype.remove=function(i){var e,s,o=this.options.data.length;if(i.hasOwnProperty("field")&&i.hasOwnProperty("values")){for(e=o-1;e>=0;e--){if(s=this.options.data[e],!s.hasOwnProperty(i.field))return;t.inArray(s[i.field],i.values)!==-1&&this.options.data.splice(e,1)}o!==this.options.data.length&&(this.initSearch(),this.initPagination(),this.initBody(!0))}},r.prototype.updateRow=function(i){i.hasOwnProperty("index")&&i.hasOwnProperty("row")&&(t.extend(this.data[i.index],i.row),this.initBody(!0))},r.prototype.mergeCells=function(i){var e,s,o=i.index,n=t.inArray(i.field,this.header.fields),a=i.rowspan||1,r=i.colspan||1,h=this.$body.find("tr"),l=h.eq(o).find("td").eq(n);if(!(o<0||n<0||o>=this.data.length)){for(e=o;e<o+a;e++)for(s=n;s<n+r;s++)h.eq(e).find("td").eq(s).hide();l.attr("rowspan",a).attr("colspan",r).show()}},r.prototype.getSelections=function(){var i=this;return t.grep(this.data,function(t){return t[i.header.stateField]})},r.prototype.checkAll=function(){this.checkAll_(!0)},r.prototype.uncheckAll=function(){this.checkAll_(!1)},r.prototype.checkAll_=function(t){this.$selectItem.filter(":enabled").prop("checked",t),this.updateRows(t),this.updateSelected(),this.trigger(t?"check-all":"uncheck-all")},r.prototype.check=function(t){this.check_(!0,t)},r.prototype.uncheck=function(t){this.check_(!1,t)},r.prototype.check_=function(t,e){this.$selectItem.filter(i('[data-index="%s"]',e)).prop("checked",t),this.data[e][this.header.stateField]=t,this.updateSelected()},r.prototype.destroy=function(){this.$el.insertBefore(this.$container),t(this.options.toolbar).insertBefore(this.$el),this.$container.next().remove(),this.$container.remove(),this.$el.html(this.$el_.html()).attr("class",this.$el_.attr("class")||"")},r.prototype.showLoading=function(){this.$loading.show()},r.prototype.hideLoading=function(){this.$loading.hide()},r.prototype.refresh=function(t){t&&t.url&&(this.options.url=t.url,this.options.pageNumber=1),this.initServer(t&&t.silent)},r.prototype.showColumn=function(t){this.toggleColumn(s(this.options.columns,t),!0,!0)},r.prototype.hideColumn=function(t){this.toggleColumn(s(this.options.columns,t),!1,!0)},r.prototype.filterBy=function(i){this.filterColumns=t.isEmptyObject(i)?{}:i,this.options.pageNumber=1,this.initSearch(),this.updatePagination()},r.prototype.scrollTo=function(t){var i=this.$container.find(".fixed-table-body");"string"==typeof t&&(t="bottom"===t?i[0].scrollHeight:0),"number"==typeof t&&i.scrollTop(t)},r.prototype.prevPage=function(){this.options.pageNumber>1?this.options.pageNumber--:null,this.updatePagination()},r.prototype.nextPage=function(){this.options.pageNumber<this.options.pageSize?this.options.pageNumber++:null,this.updatePagination()};var h=["getSelections","getData","load","append","remove","updateRow","mergeCells","checkAll","uncheckAll","check","uncheck","refresh","resetView","destroy","showLoading","hideLoading","showColumn","hideColumn","filterBy","scrollTo","prevPage","nextPage"];t.fn.bootstrapTable=function(i,e){var s;return this.each(function(){var o=t(this),n=o.data("bootstrap.table"),a=t.extend({},r.DEFAULTS,o.data(),"object"==typeof i&&i);if("string"==typeof i){if(t.inArray(i,h)<0)throw"Unknown method: "+i;if(!n)return;s=n[i](e),"destroy"===i&&o.removeData("bootstrap.table")}n||o.data("bootstrap.table",n=new r(this,a))}),"undefined"==typeof s?this:s},t.fn.bootstrapTable.Constructor=r,t.fn.bootstrapTable.defaults=r.DEFAULTS,t.fn.bootstrapTable.columnDefaults=r.COLUMN_DEFAULTS,t.fn.bootstrapTable.locales=r.LOCALES,t.fn.bootstrapTable.methods=h,t(function(){t('[data-toggle="table"]').bootstrapTable()})}(jQuery);