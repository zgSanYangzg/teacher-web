define(['basetools'],function(basetools){
    var init = function(row) {
        var ifChange = false;
        /**获取数据绑定到表单上*/
        $.restAjax({
            url : $.apiPath+moduleName.dictionary+ $.apijoin+'dictionary'+ $.apijoin+$('#dictCodeId').val() ,
            type:'get',
            cache:false,
            success : function(data) {
                if(data.status == '200' && data.result){
                    $('#dicedit_form').json2form({data:data.result});
                }
            }
        });
        $('#dicedit_form input,textarea').change(function (){ifChange = true;});
        $('#dicedit_form').validate({
            errorElement : 'em',
            errorContainer : '#error_div',
            errorLabelContainer : '#error_tip',
            rules : {
                dictName:{
                    required : true,
                    isNotSpecialChar : true,
                    maxlength : 50
                },
                dictDesc:{
                    maxlength : 126
                }
            },
            // Messages for form validation
            messages : {
                dictName:{
                    required : ' 字典名称不能为空；',
                    isNotSpecialChar : ' 字典名称不允许包含特殊字符；',
                    maxlength : ' 字典名称不能超过50个字符；'
                },
                dictDesc:{
                    maxlength : ' 字典值描述不能超过126个字符；'
                }
            },

            // Ajax form submition
            submitHandler : function(form) {
                var json = $('#dicedit_form').form2json();
                $.restAjax({
                    url :$.apiPath+moduleName.dictionary+ $.apijoin+'dictionary'+ $.apijoin+$('#dictCodeId').val(),
                    type:'put',
                    dataType : 'json',
                    data:json,
                    async:false,
                    success : function(data) {
                        if(data.status=='200'){
                            $('#dicedit_close').click();
                            $('#dic_table').dataTable().fnUpdate(data.result,row,null,false);
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            }
        });
        $('#dicedit_cancel').click(function(){
            if(ifChange){
                $.confirm({
                    title: '确认信息',
                    content: '确认取消当前所做的操作',
                    confirmButton: '是',
                    cancelButton: '否',
                    confirm: function (){
                        $('#dicedit_close').click();
                    }
                })
            }else{
                $('#dicedit_close').click();
            }
        });
    };
    return {init:init}
});