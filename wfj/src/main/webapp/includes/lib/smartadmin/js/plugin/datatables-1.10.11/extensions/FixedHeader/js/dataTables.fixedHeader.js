/*! FixedHeader 3.1.1
 * ©2009-2016 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     FixedHeader
 * @description Fix a table's header or footer, so it is always visible while
 *              scrolling
 * @version     3.1.1
 * @file        dataTables.fixedHeader.js
 * @author      SpryMedia Ltd (www.sprymedia.co.uk)
 * @contact     www.sprymedia.co.uk/contact
 * @copyright   Copyright 2009-2016 SpryMedia Ltd.
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

!function(t){"function"==typeof define&&define.amd?define(["jquery","datatables.net"],function(e){return t(e,window,document)}):"object"==typeof exports?module.exports=function(e,o){return e||(e=window),o&&o.fn.dataTable||(o=require("datatables.net")(e,o).$),t(o,e,e.document)}:t(jQuery,window,document)}(function(t,e,o,i){var d=t.fn.dataTable,s=0,n=function(o,i){if(!(this instanceof n))throw"FixedHeader must be initialised with the 'new' keyword.";i===!0&&(i={}),o=new d.Api(o),this.c=t.extend(!0,{},n.defaults,i),this.s={dt:o,position:{theadTop:0,tbodyTop:0,tfootTop:0,tfootBottom:0,width:0,left:0,tfootHeight:0,theadHeight:0,windowHeight:t(e).height(),visible:!0},headerMode:null,footerMode:null,autoWidth:o.settings()[0].oFeatures.bAutoWidth,namespace:".dtfc"+s++,scrollLeft:{header:-1,footer:-1},enable:!0},this.dom={floatingHeader:null,thead:t(o.table().header()),tbody:t(o.table().body()),tfoot:t(o.table().footer()),header:{host:null,floating:null,placeholder:null},footer:{host:null,floating:null,placeholder:null}},this.dom.header.host=this.dom.thead.parent(),this.dom.footer.host=this.dom.tfoot.parent();var a=o.settings()[0];if(a._fixedHeader)throw"FixedHeader already initialised on table "+a.nTable.id;a._fixedHeader=this,this._constructor()};return t.extend(n.prototype,{enable:function(t){this.s.enable=t,this.c.header&&this._modeChange("in-place","header",!0),this.c.footer&&this.dom.tfoot.length&&this._modeChange("in-place","footer",!0),this.update()},headerOffset:function(t){return t!==i&&(this.c.headerOffset=t,this.update()),this.c.headerOffset},footerOffset:function(t){return t!==i&&(this.c.footerOffset=t,this.update()),this.c.footerOffset},update:function(){this._positions(),this._scroll(!0)},_constructor:function(){var o=this,i=this.s.dt;t(e).on("scroll"+this.s.namespace,function(){o._scroll()}).on("resize"+this.s.namespace,function(){o.s.position.windowHeight=t(e).height(),o.update()}),i.on("column-reorder.dt.dtfc column-visibility.dt.dtfc draw.dt.dtfc column-sizing.dt.dtfc",function(){o.update()}),i.on("destroy.dtfc",function(){i.off(".dtfc"),t(e).off(o.s.namespace)}),this._positions(),this._scroll()},_clone:function(e,o){var i=this.s.dt,d=this.dom[e],s="header"===e?this.dom.thead:this.dom.tfoot;!o&&d.floating?d.floating.removeClass("fixedHeader-floating fixedHeader-locked"):(d.floating&&(d.placeholder.remove(),this._unsize(e),d.floating.children().detach(),d.floating.remove()),d.floating=t(i.table().node().cloneNode(!1)).css("table-layout","fixed").removeAttr("id").append(s).appendTo("body"),d.placeholder=s.clone(!1),d.host.prepend(d.placeholder),this._matchWidths(d.placeholder,d.floating))},_matchWidths:function(e,o){var i=function(o){return t(o,e).map(function(){return t(this).width()}).toArray()},d=function(e,i){t(e,o).each(function(e){t(this).css({width:i[e],minWidth:i[e]})})},s=i("th"),n=i("td");d("th",s),d("td",n)},_unsize:function(e){var o=this.dom[e].floating;o&&("footer"===e||"header"===e&&!this.s.autoWidth)?t("th, td",o).css({width:"",minWidth:""}):o&&"header"===e&&t("th, td",o).css("min-width","")},_horizontal:function(t,e){var o=this.dom[t],i=this.s.position,d=this.s.scrollLeft;o.floating&&d[t]!==e&&(o.floating.css("left",i.left-e),d[t]=e)},_modeChange:function(t,e,o){var i=(this.s.dt,this.dom[e]),d=this.s.position;"in-place"===t?(i.placeholder&&(i.placeholder.remove(),i.placeholder=null),this._unsize(e),"header"===e?i.host.prepend(this.dom.thead):i.host.append(this.dom.tfoot),i.floating&&(i.floating.remove(),i.floating=null)):"in"===t?(this._clone(e,o),i.floating.addClass("fixedHeader-floating").css("header"===e?"top":"bottom",this.c[e+"Offset"]).css("left",d.left+"px").css("width",d.width+"px"),"footer"===e&&i.floating.css("top","")):"below"===t?(this._clone(e,o),i.floating.addClass("fixedHeader-locked").css("top",d.tfootTop-d.theadHeight).css("left",d.left+"px").css("width",d.width+"px")):"above"===t&&(this._clone(e,o),i.floating.addClass("fixedHeader-locked").css("top",d.tbodyTop).css("left",d.left+"px").css("width",d.width+"px")),this.s.scrollLeft.header=-1,this.s.scrollLeft.footer=-1,this.s[e+"Mode"]=t},_positions:function(){var e=this.s.dt,o=e.table(),i=this.s.position,d=this.dom,s=t(o.node()),n=s.children("thead"),a=s.children("tfoot"),f=d.tbody;i.visible=s.is(":visible"),i.width=s.outerWidth(),i.left=s.offset().left,i.theadTop=n.offset().top,i.tbodyTop=f.offset().top,i.theadHeight=i.tbodyTop-i.theadTop,a.length?(i.tfootTop=a.offset().top,i.tfootBottom=i.tfootTop+a.outerHeight(),i.tfootHeight=i.tfootBottom-i.tfootTop):(i.tfootTop=i.tbodyTop+f.outerHeight(),i.tfootBottom=i.tfootTop,i.tfootHeight=i.tfootTop)},_scroll:function(e){var i,d,s=t(o).scrollTop(),n=t(o).scrollLeft(),a=this.s.position;this.s.enable&&(this.c.header&&(i=!a.visible||s<=a.theadTop-this.c.headerOffset?"in-place":s<=a.tfootTop-a.theadHeight-this.c.headerOffset?"in":"below",(e||i!==this.s.headerMode)&&this._modeChange(i,"header",e),this._horizontal("header",n)),this.c.footer&&this.dom.tfoot.length&&(d=!a.visible||s+a.windowHeight>=a.tfootBottom+this.c.footerOffset?"in-place":a.windowHeight+s>a.tbodyTop+a.tfootHeight+this.c.footerOffset?"in":"above",(e||d!==this.s.footerMode)&&this._modeChange(d,"footer",e),this._horizontal("footer",n)))}}),n.version="3.1.1",n.defaults={header:!0,footer:!1,headerOffset:0,footerOffset:0},t.fn.dataTable.FixedHeader=n,t.fn.DataTable.FixedHeader=n,t(o).on("init.dt.dtfh",function(e,o,i){if("dt"===e.namespace){var s=o.oInit.fixedHeader,a=d.defaults.fixedHeader;if((s||a)&&!o._fixedHeader){var f=t.extend({},a,s);s!==!1&&new n(o,f)}}}),d.Api.register("fixedHeader()",function(){}),d.Api.register("fixedHeader.adjust()",function(){return this.iterator("table",function(t){var e=t._fixedHeader;e&&e.update()})}),d.Api.register("fixedHeader.enable()",function(t){return this.iterator("table",function(e){var o=e._fixedHeader;o&&o.enable(t===i||t)})}),d.Api.register("fixedHeader.disable()",function(){return this.iterator("table",function(t){var e=t._fixedHeader;e&&e.enable(!1)})}),t.each(["header","footer"],function(t,e){d.Api.register("fixedHeader."+e+"Offset()",function(t){var o=this.context;return t===i?o.length&&o[0]._fixedHeader?o[0]._fixedHeader[e+"Offset"]():i:this.iterator("table",function(o){var i=o._fixedHeader;i&&i[e+"Offset"](t)})})}),n});