/*! RowReorder 1.1.1
 * 2015-2016 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     RowReorder
 * @description Row reordering extension for DataTables
 * @version     1.1.1
 * @file        dataTables.rowReorder.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2015-2016 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

!function(t){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return t(e,window,document)}):"object"==typeof exports?module.exports=function(e,o){return e||(e=window),o&&o.fn.dataTable||(o=require("datatables.net")(e,o).$),t(o,e,e.document)}:t(jQuery,window,document)}(function(t,e,o,r){var n=t.fn.dataTable,s=function(e,o){if(!n.versionCheck||!n.versionCheck("1.10.8"))throw"DataTables RowReorder requires DataTables 1.10.8 or newer";this.c=t.extend(!0,{},n.defaults.rowReorder,s.defaults,o),this.s={bodyTop:null,dt:new n.Api(e),getDataFn:n.ext.oApi._fnGetObjectDataFn(this.c.dataSrc),middles:null,scroll:{},scrollInterval:null,setDataFn:n.ext.oApi._fnSetObjectDataFn(this.c.dataSrc),start:{top:0,left:0,offsetTop:0,offsetLeft:0,nodes:[]},windowHeight:0},this.dom={clone:null,dtScroll:t("div.dataTables_scrollBody",this.s.dt.table().container())};var r=this.s.dt.settings()[0],i=r.rowreorder;return i?i:(r.rowreorder=this,void this._constructor())};return t.extend(s.prototype,{_constructor:function(){var e=this,o=this.s.dt,r=t(o.table().node());"static"===r.css("position")&&r.css("position","relative"),t(o.table().container()).on("mousedown.rowReorder touchstart.rowReorder",this.c.selector,function(r){var n=t(this).closest("tr");if(o.row(n).any())return e._mouseDown(r,n),!1}),o.on("destroy.rowReorder",function(){t(o.table().container()).off(".rowReorder"),o.off(".rowReorder")})},_cachePositions:function(){var o=this.s.dt,r=t(o.table().node()).find("thead").outerHeight(),n=t.unique(o.rows({page:"current"}).nodes().toArray()),s=t.map(n,function(e,o){return t(e).position().top-r}),i=t.map(s,function(e,r){return s.length<r-1?(e+s[r+1])/2:(e+e+t(o.row(":last-child").node()).outerHeight())/2});this.s.middles=i,this.s.bodyTop=t(o.table().body()).offset().top,this.s.windowHeight=t(e).height()},_clone:function(e){var o=this.s.dt,r=t(o.table().node().cloneNode(!1)).addClass("dt-rowReorder-float").append("<tbody/>").append(e.clone(!1)),n=e.outerWidth(),s=e.outerHeight(),i=e.children().map(function(){return t(this).width()});r.width(n).height(s).find("tr").children().each(function(t){this.style.width=i[t]+"px"}),r.appendTo("body"),this.dom.clone=r},_clonePosition:function(t){var e,o=this.s.start,r=this._eventToPage(t,"Y")-o.top,n=this._eventToPage(t,"X")-o.left,s=this.c.snapX;e=s===!0?o.offsetLeft:"number"==typeof s?o.offsetLeft+s:n+o.offsetLeft,this.dom.clone.css({top:r+o.offsetTop,left:e})},_emitEvent:function(e,o){this.s.dt.iterator("table",function(r,n){t(r.nTable).triggerHandler(e+".dt",o)})},_eventToPage:function(t,e){return t.type.indexOf("touch")!==-1?t.originalEvent.touches[0]["page"+e]:t["page"+e]},_mouseDown:function(r,n){var s=this,i=this.s.dt,d=this.s.start,a=n.offset();d.top=this._eventToPage(r,"Y"),d.left=this._eventToPage(r,"X"),d.offsetTop=a.top,d.offsetLeft=a.left,d.nodes=t.unique(i.rows({page:"current"}).nodes().toArray()),this._cachePositions(),this._clone(n),this._clonePosition(r),this.dom.target=n,n.addClass("dt-rowReorder-moving"),t(o).on("mouseup.rowReorder touchend.rowReorder",function(t){s._mouseUp(t)}).on("mousemove.rowReorder touchmove.rowReorder",function(t){s._mouseMove(t)}),t(e).width()===t(o).width()&&t(o.body).addClass("dt-rowReorder-noOverflow");var l=this.dom.dtScroll;this.s.scroll={windowHeight:t(e).height(),windowWidth:t(e).width(),dtTop:l.length?l.offset().top:null,dtLeft:l.length?l.offset().left:null,dtHeight:l.length?l.outerHeight():null,dtWidth:l.length?l.outerWidth():null}},_mouseMove:function(e){this._clonePosition(e);for(var o=this._eventToPage(e,"Y")-this.s.bodyTop,r=this.s.middles,n=null,s=this.s.dt,i=s.table().body(),d=0,a=r.length;d<a;d++)if(o<r[d]){n=d;break}if(null===n&&(n=r.length),null===this.s.lastInsert||this.s.lastInsert!==n){if(0===n)this.dom.target.prependTo(i);else{var l=t.unique(s.rows({page:"current"}).nodes().toArray());n>this.s.lastInsert?this.dom.target.insertAfter(l[n-1]):this.dom.target.insertBefore(l[n])}this._cachePositions(),this.s.lastInsert=n}this._shiftScroll(e)},_mouseUp:function(e){var r,n,s=this.s.dt,i=this.c.dataSrc;this.dom.clone.remove(),this.dom.clone=null,this.dom.target.removeClass("dt-rowReorder-moving"),t(o).off(".rowReorder"),t(o.body).removeClass("dt-rowReorder-noOverflow"),clearInterval(this.s.scrollInterval),this.s.scrollInterval=null;var d=this.s.start.nodes,a=t.unique(s.rows({page:"current"}).nodes().toArray()),l={},h=[],c=[],u=this.s.getDataFn,f=this.s.setDataFn;for(r=0,n=d.length;r<n;r++)if(d[r]!==a[r]){var w=s.row(a[r]).id(),p=s.row(a[r]).data(),v=s.row(d[r]).data();w&&(l[w]=u(v)),h.push({node:a[r],oldData:u(p),newData:u(v),newPosition:r,oldPosition:t.inArray(a[r],d)}),c.push(a[r])}var g=[h,{dataSrc:i,nodes:c,values:l,triggerRow:s.row(this.dom.target)}];if(this._emitEvent("row-reorder",g),this.c.editor&&this.c.editor.edit(c,!1,{submit:"changed"}).multiSet(i,l).submit(),this.c.update){for(r=0,n=h.length;r<n;r++){var m=s.row(h[r].node),b=m.data();f(b,h[r].newData),s.columns().every(function(){this.dataSrc()===i&&s.cell(h[r].node,this.index()).invalidate("data")})}this._emitEvent("row-reordered",g),s.draw(!1)}},_shiftScroll:function(t){var e,r,n=this,s=(this.s.dt,this.s.scroll),i=!1,d=5,a=65,l=t.pageY-o.body.scrollTop;l<a?e=d*-1:l>s.windowHeight-a&&(e=d),null!==s.dtTop&&t.pageY<s.dtTop+a?r=d*-1:null!==s.dtTop&&t.pageY>s.dtTop+s.dtHeight-a&&(r=d),e||r?(s.windowVert=e,s.dtVert=r,i=!0):this.s.scrollInterval&&(clearInterval(this.s.scrollInterval),this.s.scrollInterval=null),!this.s.scrollInterval&&i&&(this.s.scrollInterval=setInterval(function(){if(s.windowVert&&(o.body.scrollTop+=s.windowVert),s.dtVert){var t=n.dom.dtScroll[0];s.dtVert&&(t.scrollTop+=s.dtVert)}},20))}}),s.defaults={dataSrc:0,editor:null,selector:"td:first-child",snapX:!1,update:!0},s.version="1.1.1",t.fn.dataTable.RowReorder=s,t.fn.DataTable.RowReorder=s,t(o).on("init.dt.dtr",function(e,o,r){if("dt"===e.namespace){var i=o.oInit.rowReorder,d=n.defaults.rowReorder;if(i||d){var a=t.extend({},i,d);i!==!1&&new s(o,a)}}}),s});