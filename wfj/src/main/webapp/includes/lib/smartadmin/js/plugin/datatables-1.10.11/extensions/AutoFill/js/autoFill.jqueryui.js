/*! jQuery UI integration for DataTables' AutoFill
 * ©2015 SpryMedia Ltd - datatables.net/license
 */

!function(t){"function"==typeof define&&define.amd?define(["jquery","datatables.net-jqui","datatables.net-autofill"],function(e){return t(e,window,document)}):"object"==typeof exports?module.exports=function(e,n){return e||(e=window),n&&n.fn.dataTable||(n=require("datatables.net-jqui")(e,n).$),n.fn.dataTable.AutoFill||require("datatables.net-autofill")(e,n),t(n,e,e.document)}:t(jQuery,window,document)}(function(t,e,n,a){var u=t.fn.dataTable;return u.AutoFill.classes.btn="ui-button ui-state-default ui-corner-all",u});