define(['jquery','basetools'],function($,basetools){
    /*var DF = {};

     DF.createTableForm = function(id,options){
     if(options.form_fields){
     $("#"+id+" .formDetail").append('<input type="hidden" id="hiddenId" name="'+options.hiddenField+'"/>');
     $.each( options.form_fields, function(index, content)
     {
     var divObj = '<div class="item"><span class="itemLabel">'+content.label
     +'&nbsp;&nbsp;</span><label  class="input-label" name="'+content.name+'"></label></div>';
     $("#"+id+" .formDetail").append(divObj);
     });
     }

     if(options.toolbar){
     var btns = options.toolbar.buttons;//按钮对象
     $.each( btns, function(index, btn)
     {
     if (typeof btn.callback == "function"){//按钮调用函数
     //添加按钮
     if ($("#" + btn.btnId).length == 0){//判断当前按钮是否已经存在，不存在则添加
     var toolObj = '<a class="btn btn-default" id='+btn.btnId+'>'+btn.title+'</a>';
     $("#"+id+" .js_member_toolbar").append(toolObj);
     //添加按钮事件
     $("#" + btn.btnId).click(function(){
     if(btn.callback){
     btn.callback();
     }
     });
     }
     }
     });

     }
     }*/

    $.fn.createTableForm = function(id,options) {
        var _init = function(){
            $(".icon_close").click(function(){
                $(".opp_result").removeClass("opp_active").addClass("opp_unactive");
            });
            if(options.form_fields){
                $("#"+id+" .formdetail").append('<input type="hidden" class="hiddenId" name="'+options.hiddenField+'"/>');
                $.each( options.form_fields, function(index, content)
                {
                    var chks = "";
                    if(content.checkbox){//标签内容来自复选框
                        chks = basetools.jsonToStr(content.checkbox);
                    }
                    var divObj = "";
                    /*if(content.img){
                     divObj = '<div class="item"><img src="'+content.img+'" ></div>';
                     }else{*/
                    divObj = '<div class="item"><span class="itemLabel">'+content.label
                        +'&nbsp;&nbsp;</span><label  class="input-label" name="'+content.name+'" data-chks='+chks+'  ></label></div>';
                    //}

                    $("#"+id+" .formdetail").append(divObj);
                });
            }

            if(options.toolbar){
                var btns = options.toolbar.buttons;//按钮对象
                $.each( btns, function(index, btn)
                {
                    if (typeof btn.callback == "function"){//按钮调用函数
                        //添加按钮
                        if ($("#" + btn.btnId).length == 0){//判断当前按钮是否已经存在，不存在则添加
                            var toolObj = '<a class="btn btn-default" id='+btn.btnId+'  fid='+btn.fid+'>'+btn.title+'</a>';
                            $("#"+id+" .js_member_toolbar").append(toolObj);
                            //添加按钮事件
                            $("#" + btn.btnId).click(function(){
                                if(btn.callback){
                                    btn.callback();
                                }
                            });
                        }
                    }
                });
            }
        }

        _init();
        return this;
    }

});