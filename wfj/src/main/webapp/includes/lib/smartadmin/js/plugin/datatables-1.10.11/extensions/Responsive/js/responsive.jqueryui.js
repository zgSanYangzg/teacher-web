/*! jQuery UI integration for DataTables' Responsive
 * ©2015 SpryMedia Ltd - datatables.net/license
 */

!function(e){"function"==typeof define&&define.amd?define(["jquery","datatables.net-jqui","datatables.net-responsive"],function(n){return e(n,window,document)}):"object"==typeof exports?module.exports=function(n,t){return n||(n=window),t&&t.fn.dataTable||(t=require("datatables.net-jqui")(n,t).$),t.fn.dataTable.Responsive||require("datatables.net-responsive")(n,t),e(t,n,n.document)}:e(jQuery,window,document)}(function(e,n,t,a){var d=e.fn.dataTable,o=d.Responsive.display,i=o.modal;return o.modal=function(n){return function(t,a,d){e.fn.dialog?a||e("<div/>").append(d()).appendTo("body").dialog(e.extend(!0,{title:n&&n.header?n.header(t):"",width:500},n.dialog)):i(t,a,d)}},d.Responsive});