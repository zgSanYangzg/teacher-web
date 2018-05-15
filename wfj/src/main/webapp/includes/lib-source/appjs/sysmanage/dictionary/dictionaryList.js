define(['DT','basetools'],function(DT,basetools){
    $.app.pageSetUp();
    function dicTabinit(){
        DT.createTable("dic",{
            "url": $.apiPath+moduleName.dictionary+ $.apijoin+"dictionary"+ $.apijoin+"page?agencyCode="+agencyCode  ,
           /* "aaSorting":[[2,"desc"]],*/
            "aoColumns": [   //列映射
                { "sTitle": "dictCode",   "mData": "dictCode", "sClass": "center", "bSortable": false,"bVisible":false},
                { "sTitle": "字典编号",   "mData": "dictCode", "sWidth": "20%","sClass": "center"},
                { "sTitle": "字典名称",  "mData": "dictName", "sWidth": "20%","sClass": "center"},
                { "sTitle": "操作",   "sDefaultContent": "", "sClass": "center",render: function(data, type, row, meta){
                    var renderStr =  [
                        '<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="dicEdit('+"'"+row.dictCode+"'"+','+meta.row+')"><i class="glyphicon glyphicon-edit"></i>&nbsp;编辑</a>'
                        ,'<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="dicAddVal('+"'"+row.dictCode+"'"+')">&nbsp;创建字典值</a>'
                        ,'<a class="btn btn-primary btn-xs" href="javascript:void(0)" onclick="dicDelete('+"'"+row.dictCode+"'"+')">&nbsp;删除</a>'
                    ].join('  ') ;
                    return renderStr;
                }}
            ],
            'extra':{'bSort':false},
            "search_fields" : [
                {display:"字典编号",name:"dictCodeSearch",type:"text",cid:"dictCode"},
                {display:"字典名称",name:"dicNameSearch",type:"text",cid:"dictName"}
            ],
            "toolbar" : {
                "buttons":[
                    {
                        "btnId":"addDictionary",
                        "title":"创建",
                        "callback":function(){
                            $("#dicAddModel").modal({
                                backdrop:'static',
                                remote: "dictionary/dictionaryAdd"
                            });
                        }
                    }
                ]
            }
        });

        $("#dicAddModel").on("hidden.bs.modal", function() {
            $(this).removeData("bs.modal");
            $(".opp_result").removeClass("opp_active").addClass("opp_unactive");
        });
    }

    this.dicEdit = function(id,row){
        $("#dicAddModel").modal({
            backdrop:'static',
            remote: "dictionary/dictionaryEdit?id="+id+"&row="+row
        });
    }

    this.dicAddVal = function(id){
        $("#dicAddModel").modal({
            backdrop:'static',
            remote: "dictionary/dicvalAdd?id="+id
        });
    }
        //删除字典信息
    this.dicDelete = function(id){
        $.confirm({
            title: '确认信息',
            content: '是否删除所选信息。',
            confirmButton: "是",
            cancelButton: "否",
            confirm: function (){
                $.restAjax({
                    url : $.apiPath+moduleName.dictionary+ $.apijoin+"dictionary",
                    type:"delete",
                    data:JSON.stringify([id]),
                    success : function(data) {
                        if(data.status=="200"){
                            $("#dic_table").DataTable().ajax.reload();
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            },
            cancel: function () {
                $(".opp_result").removeClass("opp_active").addClass("opp_unactive");
            }
        });
    }
    return {dicTabinit : dicTabinit}

});