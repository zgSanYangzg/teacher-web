;(function($){

    // 插件定义
    $.fn.Picker = function (_aoConfig) {
        // 默认参数，可被重写
        var defaults = {
            ifshow : false,
            sId : "",
            wrapperHtml : '',
            ifload : false,
            pickerDom : $('<div class="picker"><div><ul id='+_aoConfig.sId+' class="ztree clearfix"></ul></div><div class="footer"><button type="button" class="btn btn-info close-tree" style="padding:5px 12px;float:right;margin:12px">确定</button></div></div>')
        };

        var _oSelf = this,
            $this = $(this);


        // 插件配置
        this.oConfig = $.extend(defaults, _aoConfig);

        // 初始化函数
        var _init = function () {
            // 事件绑定
            _loadEvent();
        }
        // 私有函数
        var _initData = function (oConfig) {
            if(!oConfig.ifload){
                oConfig.pickerDom.appendTo($this.parent());
                oConfig.ifload = true;
                var setting = {
                    check: {
                        enable: true
                    },
                    data: {
                        simpleData: {
                            enable: true
                        }
                    }
                };
                var zNodes =[
                    { id:1, pId:0, name:"hfgkhjfgkd开放给合肥科技和开发和", open:true},
                    { id:11, pId:1, name:"随意勾选 1-1"},
                    { id:12, pId:1, name:"随意勾选 1-2"},
                    { id:13, pId:1, name:"随意勾选 1-3"},
                    { id:14, pId:1, name:"随意勾选 1-4"},
                    { id:2, pId:0, name:"福利科技股份卡号及付款合计非公开", open:true},
                    { id:21, pId:2, name:"随意勾选 2-1"},
                    { id:22, pId:2, name:"随意勾选 2-2"},
                    { id:23, pId:2, name:"回家了开发过好久了赶快回家过来看回家了"}
                ];
                $.fn.zTree.init($("#"+_aoConfig.sId), setting, zNodes);
                $("#"+_aoConfig.sId).find(".ico_open").each(function(){$(this).hide();});
                $("#"+_aoConfig.sId).find(".ico_docu").each(function(){$(this).hide();});
            }else{
                oConfig.pickerDom.show();
            }
            oConfig.ifshow = true;
        };

        var _click = function(){
            _initData(_oSelf.oConfig);
           // _oSelf.oConfig.pickerDom.ifshow = false;
        }

        var _loadEvent = function () {
            $this.on('focus',_click);

            _oSelf.oConfig.pickerDom.on('click','.close-tree',function(e){//确定关闭事件
                _oSelf.oConfig.pickerDom.hide();
                _oSelf.oConfig.ifshow = false;
            });

            $(document).on('click', function (e) {//点击事件时判断鼠标是否落在 弹出框内 如果不是 则关闭弹出框
                if (_oSelf.oConfig.ifshow && (e.target != $this[0])) {
                    var _div = _oSelf.oConfig.pickerDom[0];
                    var x = e.clientX;
                    var y = e.clientY;
                    var pp = _oSelf.oConfig.pickerDom.offsetParent();//弹出框相对偏移的父元素
                    var divx1 = _div.offsetLeft + pp.offset().left;
                    var divy1 = _div.offsetTop + pp.offset().top;
                    var divx2 = _div.offsetLeft + _div.offsetWidth + pp.offset().left;
                    var divy2 = _div.offsetTop + _div.offsetHeight  +pp.offset().top;
                    console.log(x + ":" + y + "  (" + divx1 + "-" + divx2 + "-" + divy1 + "-" + divy2 + ")" +"***"+ (x < divx1 || x > divx2 || y < divy1 || y > divy2));
                    if (x < divx1 || x > divx2 || y < divy1 || y > divy2) {
                        _oSelf.oConfig.pickerDom.hide();
                        _oSelf.oConfig.ifshow = false;
                    }
                }
            });

        };

        // 启动插件
        _init();
        // 链式调用
        return this;
    };
    // 插件结束
})(jQuery)