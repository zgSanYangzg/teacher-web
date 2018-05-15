define(['basetools'],function(basetools){
    var init = function() {
        var ifChange = false;
        $('#dicadd_form input,textarea').change(function (){ifChange = true;});
        $('#dicadd_form').validate({
            errorElement : 'em',
            errorContainer : '#error_div',
            errorLabelContainer : '#error_tip',
            rules : {
                dictCode : {
                    required : true,
                    isBusinessNo :true,
                    maxlength : 10,
                    remote:{
                        type:'get',
                        cache:false,
                        url:function (){return $.apiPath+moduleName.dictionary+ $.apijoin+'dictionary'+ $.apijoin+$('#dictCode').val()+ $.apijoin+'available'},
                        data:{code:function(){return $('#dictCode').val();}},
                        beforeSend: function(XMLHttpRequest) {
                            XMLHttpRequest.setRequestHeader('token',token);
                            XMLHttpRequest.setRequestHeader('Content-Type','application/json;charset=utf-8');
                        }
                    }
                },
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
                dictCode : {
                    required : ' 字典编号不能为空；',
                    isBusinessNo :' 字典编号只接受字母,数字,下划线；',
                    maxlength : ' 字典编号不能超过10个字符；',
                    remote : ' 字典编号已经存在；'
                },
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
                var json = $('#dicadd_form').form2json();
                $.restAjax({
                    url :$.apiPath+moduleName.dictionary+ $.apijoin+'dictionary',
                    type:'POST',
                    dataType : 'json',
                    data:json,
                    async:false,
                    success : function(data) {
                        if(data.status=='200'){
                            $('#dicadd_close').click();
                            $('#dic_table').DataTable().ajax.reload();
                            basetools.backTip(data,'Y');
                        }
                    }
                });
            }
        });

        $('#dicadd_cancel').click(function(){
            if(ifChange){
                $.confirm({
                    title: '确认信息',
                    content: '确认取消当前所做的操作',
                    confirmButton: '是',
                    cancelButton: '否',
                    confirm: function (){
                        $('#dicadd_close').click();
                    }
                })
            }else{
                $('#dicadd_close').click();
            }
        });
    };

    return {init : init}
});