requirejs.config({
    baseUrl : "includes/lib-source/appjs",
    paths : {
       // "main" :"../main",
        "jquery" : "../jquery/jquery",
        "jquery-ui" : "../smartadmin/js/libs/jquery-ui-1.10.3.min",
        "jquery.validate" : "../smartadmin/js/plugin/jquery-validate/jquery.validate.min",
        "validate.expand" : "../smartadmin/js/plugin/jquery-validate/validate.expand",
        "jquery.cookie":"../jquery/jquery.cookie",
        "bootstrap" : "../smartadmin/js/bootstrap/bootstrap",
        "bootstrap-paginator" : "../smartadmin/js/bootstrap/bootstrap-paginator",
        "knockout":"../smartadmin/js/libs/knokout",
        "app":"../smartadmin/js/app",
        "basetools":"../smartadmin/js/basetools",
        "datatables":"../smartadmin/js/plugin/datatables-1.10.11/media/js/jquery.dataTables",
    /*    "dataTables.tableTools":"../smartadmin/js/plugin/datatables-1.10.11/extensions/dataTables.tableTools",*/
        "jeditable":"../smartadmin/js/plugin/datatables-1.10.11/extensions/jeditable",
        "DT_bootstrap":"../smartadmin/js/plugin/datatables-1.10.11/DT_bootstrap",
        "DT":"../smartadmin/js/plugin/datatables-1.10.11/DT",
        "DF":"../jquery/DF",
        "jquery.treeview":"../smartadmin/js/plugin/jquery-treeview/jquery.treeview",
        "jquery.treeview.edit":"../smartadmin/js/plugin/jquery-treeview/jquery.treeview.edit",
        "jquery.treeview.async":"../smartadmin/js/plugin/jquery-treeview/jquery.treeview.async",
        "SmartNotification":"../smartadmin/js/notification/SmartNotification",
        "jquery-confirm":"../smartadmin/js/plugin/jquery-confirm/jquery-confirm",
        "json2form":"../jquery/json2form",
        "jquery-form":"../smartadmin/js/plugin/jquery-form/jquery-form.min",
        "bootstrap-select":"../smartadmin/js/plugin/bootstrap-select/js/bootstrap-select",
        "bootstrap-datetimepicker":"../smartadmin/js/plugin/datetimepicker/js/bootstrap-datetimepicker.min",
        "bootstrap-datetimepicker.zh-CN":"../smartadmin/js/plugin/datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN",
        "summernote":"../smartadmin/js/plugin/summernote/summernote",


        "deptList":"sysmanage/dept/deptList",
        "deptAdd":"sysmanage/dept/deptAdd",
        "deptEdit":"sysmanage/dept/deptEdit",
        "roleList":"sysmanage/role/roleList",
        "roleAdd":"sysmanage/role/roleAdd",
        "roleEdit":"sysmanage/role/roleEdit",
        "userList":"sysmanage/user/userList",
        "userAdd":"sysmanage/user/userAdd",
        "userEdit":"sysmanage/user/userEdit",
        "dictionaryList":"sysmanage/dictionary/dictionaryList",
        "dictionaryAdd":"sysmanage/dictionary/dictionaryAdd",
        "dictionaryEdit":"sysmanage/dictionary/dictionaryEdit",
        "dicValAdd":"sysmanage/dictionary/dicValAdd",
        "resource":"sysmanage/resource/resource"
    },
    shim : {
        "jquery.treeview" : ["jquery"],
        "jquery.treeview.edit" : ["jquery.treeview"],
        "jquery.treeview.async" : ["jquery.treeview"],
        "DT_bootstrap":["datatables"],
        "DT" : ["datatables","DT_bootstrap","bootstrap-datetimepicker","bootstrap-datetimepicker.zh-CN"],//"dataTables.tableTools","jeditable",
        "jquery.validate":["jquery"],
        "validate.expand":["jquery","jquery.validate"],
        "json2form":["jquery"],
        "jquery-form":["jquery"],
        "bootstrap-select":["jquery"],
        "basetools":["SmartNotification"],
        "bootstrap-datetimepicker":["jquery"],
        "bootstrap-datetimepicker.zh-CN":["bootstrap-datetimepicker"],

        "deptList" : ["DF","jquery.treeview.edit","jquery.treeview.async","jquery-confirm","json2form"],
        "deptAdd":["jquery.validate","validate.expand"],
        "deptEdit":["jquery.validate","validate.expand"],

        "roleList" : ["DF","jquery-confirm","json2form"],
        "roleAdd":["jquery.validate","validate.expand"],
        "roleEdit":["jquery.validate","validate.expand"],

        "userList" : ["DF","jquery.treeview.edit","jquery.treeview.async","jquery-confirm","json2form"],
        "userAdd":["bootstrap-select","jquery.validate","validate.expand"],
        "userEdit":["bootstrap-select","jquery.validate","validate.expand"],

        "dictionaryList" : ["DF","jquery-confirm","json2form"],
        "dictionaryAdd":["bootstrap-select","jquery.validate","validate.expand"],
        "dictionaryEdit":["bootstrap-select","jquery.validate","validate.expand"],
        "dicValAdd":["jeditable",'jquery.validate','validate.expand','jquery-form']
    }
});

