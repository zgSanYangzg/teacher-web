define(['jquery'],function($){
    /*! basetools - 2014-12-23
     * author:zhaoqiang
     * Includes: form2json,
     * 页面通用公共方法js，所有通用方法集中写在这里 */

    /*  checkbox插件  开始 */
    ;(function($){
        $.fn.extend({
            /*
             <input type="checkbox" class="checkboxCtrl" group="c1" />全选
             <button type="button" class="checkboxCtrl" group="c1" selectType="invert">反选</button>
             * */
            checkboxCtrl: function(parent){
                return this.each(function(){
                    var $trigger = $(this);
                    $trigger.bind("click",function(){
                        var group = $trigger.attr("group");
                        if ($trigger.is(":checkbox")) {
                            var type = $trigger.is(":checked") ? "all" : "none";
                            if (group) $.checkbox.select(group, type, parent);
                        } else {
                            if (group) $.checkbox.select(group, $trigger.attr("selectType") || "all", parent);
                        }
                        $(parent).find(":checkbox[name='"+group+"']").click(function(){
                            var $tmp=$(":checkbox[name='"+group+"']");
                            $trigger.attr('checked',$tmp.length==$tmp.filter(':checked').length);
                        });
                    });
                });
            }
        });

        $.checkbox = {
            selectAll: function(_name, _parent){
                this.select(_name, "all", _parent);
            },
            unSelectAll: function(_name, _parent){
                this.select(_name, "none", _parent);
            },
            selectInvert: function(_name, _parent){
                this.select(_name, "invert", _parent);
            },
            select: function(_name, _type, _parent){
                $parent = $(_parent || document);
                $checkboxLi = $parent.find(":checkbox[name='"+_name+"']");
                switch(_type){
                    case "invert":
                        $checkboxLi.each(function(){
                            $checkbox = $(this);
                            $checkbox.prop('checked', !$checkbox.is(":checked"));
                        });
                        break;
                    case "none":
                        $checkboxLi.prop('checked', false);
                        break;
                    default:
                        $checkboxLi.prop('checked', true);
                        break;
                }
            }
        };
    })(jQuery);

    /*  checkbox插件  结束 */


    //添加类bootstrap icheck
    ;(function($) {
        $.icheck = {
            init: function() {
                var _this = this;
                _this._checkbox = "checkbox";
                _this._radio = "radio";
                _this._disabled = "disabled";
                _this._enable = "enable";
                _this._checked = "checked";
                _this._hover = "hover";
                _this._arrtype = [_this._checkbox, _this._radio];
                _this._mobile = /ipad|iphone|ipod|android|blackberry|windows phone|opera mini|silk/i.test(navigator.userAgent);
                $.each(_this._arrtype, function(k, v) {
                    _this.click(v);
                    if(!_this._mobile){
                        _this.mouseover(v);
                        _this.mouseout(v);
                    }
                });
            },
            click: function(elem) {
                var _this = this;
                elem = "." + elem;
                $(document).on("click", elem, function() {
                    var $this = $(this),
                        _ins = $this.find("ins");
                    if (!(_ins.hasClass(_this._disabled) || _ins.hasClass(_this._enable))) {
                        if ( !/radio/ig.test(elem) && !! _ins.hasClass(_this._checked)) {
                            _ins.removeClass(_this._checked).addClass(_this._hover);
                        } else {
                            if (/radio/ig.test(elem)) {
                                var _name = $this.attr("name");
                                $(elem + "[name=" + _name + "]").find("ins").removeClass(_this._checked);
                            }
                            $(elem).find("ins").removeClass(_this._hover);
                            _ins.addClass(_this._checked);
                        }
                    }
                });
            },
            mouseover: function(elem) {
                var _this = this;
                elem = "." + elem;
                $(document).on("mouseover", elem, function() {
                    var $this = $(this);
                    var _ins = $this.find("ins");
                    if (!(_ins.hasClass(_this._disabled) || _ins.hasClass(_this._enable) || _ins.hasClass(_this._checked))) {
                        _ins.addClass(_this._hover);
                        $this.css("cursor","pointer");
                    } else{
                        $this.css("cursor","default");
                    }
                });
            },
            mouseout: function(elem) {
                var _this = this;
                elem = "." + elem;
                $(document).on("mouseout", elem, function() {
                    $(elem).find("ins").removeClass(_this._hover);
                });
            }
        };

        $.icheck.init();

    })(jQuery);



    //  form2json 将表单中提交的数据转换成json   开始

    /**
     * 序列化表单中的属性（参数）值，  例如："prop1=value1&prop2=value2"
     *  当然 'prop.subprop=value' 形式也是支持的。
     *  @serializedParams looks like "prop1=value1&prop2=value2".
     Nested property like 'prop.subprop=value' is also supported

     *  页面调用形式： var json = $("#testform").form2json();
     *            alert(json);
     *
     **/
    var paramString2obj = function(serializedParams) {
        var obj={};
        function evalThem (str) {
            var attributeName = str.split("=")[0];
            var attributeValue = str.split("=")[1];
            /* if(!attributeValue){
             return ;
             }
             */
            if(attributeValue == null){
                return ;
            }
            var array = attributeName.split(".");
            for (var i = 1; i < array.length; i++) {
                var tmpArray = Array();
                tmpArray.push("obj");
                for (var j = 0; j < i; j++) {
                    tmpArray.push(array[j]);
                };
                var evalString = tmpArray.join(".");
                if(!eval(evalString)){
                    eval(evalString+"={};");
                }
            };

            eval("obj."+attributeName+"='"+attributeValue+"';");
        };

        var properties = serializedParams.split("&");
        for (var i = 0; i < properties.length; i++) {
            evalThem(properties[i]);
        };
        return obj;
    }

    $.fn.form2json = function(){
        var serializedParams = this.serializeForm();
        //这里用decodeURIComponent是因为serialize()方法是对数据进行encodeURIComponent过的
        var obj = paramString2obj(decodeURIComponent(serializedParams));
        return JSON.stringify(obj);
    }
    $.fn.doesExist = function () {
        return jQuery(this).length > 0;
    };
    //form2json 将表单中提交的数据转换成json   结束


    var backTip = function(data,flag){
        var iconcls= "fa fa-check fa-2x fadeInRight animated";
        var col = '#739E73';
        if(flag=='N'){
            iconcls = "fa fa-times fa-2x fadeInRight animated";
            col = '#C46A69';
        }
        $.smallBox({
            title : "提示信息",
            content : "<i class='fa fa-clock-o'></i> <i>"+data.message+"</i>",
            color : col,
            iconSmall : iconcls,
            timeout : 3000
        });
    }


    /**
     * 适用于rest的ajax，封装了错误处理机制
     */
    jQuery.restAjax = function(options){
        if($("#loading").size()<1){
            $("body").append('<div id="loading"></div>')
            $("#loading").css({"position":"fixed","_position":"absolute","top":"50%","left":"50%"
                ,"width":"124px","height":"124px","overflow":"hidden","background":"url(./includes/lib/smartadmin/img/loading.gif) no-repeat"
                ,"z-index":"7","margin":"-62px 0 0 -62px","display":"none"
            });
        }
        $("#loading").show();

        var ajaxoptions = {
            url 		: '',
            data 		: {},
            type 		: 'post',
            base        : '',//$.apiPathV1,
            dataType	: 'json',
            async 		: true,
            beforeSend  : function (XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("token", token);
                XMLHttpRequest.setRequestHeader("Content-Type", "application/json;charset=utf-8");
            },
            crossDomain	: false
        };
        var ajaxopt = function(options){
            var opt = $.extend({}, ajaxoptions,options);
            return opt;
        };

        if(options){
            var opt = ajaxopt(options);
            if(!opt.cache && opt.type.toUpperCase() == "GET"){
                opt.url = opt.base + (opt.url.indexOf('?') > 0 ? (opt.url + "&expireToken="+Math.random()) : (opt.url + "?expireToken="+Math.random()));
            }else{
                opt.url = opt.base + opt.url;
            }

            $.ajax(opt).done(function(obj,status,xhr){
                if(xhr.getResponseHeader('refreshToken')){
                    token = xhr.getResponseHeader('refreshToken');
                }
                if(opt.success) {
                   if(obj && obj.status != '200'){
                       backTip(obj,'N');
                   }
                };
            }).fail(function(e){
                console.log("error");
                if(opt.fail){
                    opt.fail(e);
                }else{
                    alert('数据传输失败，请重试！');
                }
            }).always(function(e){
                $("#loading").fadeOut();
            });
        }
    };

    /**
     * 和PHP一样的时间戳格式化函数
     * @param  {string} format    格式
     * @param  {int}    timestamp 要格式化的时间 默认为当前时间
     * @return {string}           格式化的时间字符串
     */
    var dateFormat = function(format, timestamp){
        if(typeof timestamp == "string"){
            timestamp = parseInt(timestamp);
        }
        var a, jsdate=((timestamp) ? new Date(timestamp) : new Date());
        var pad = function(n, c){
            if((n = n + "").length < c){
                return new Array(++c - n.length).join("0") + n;
            } else {
                return n;
            }
        };
        var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"};
        var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var f = {
            // Day
            d: function(){return pad(f.j(), 2)},
            D: function(){return f.l().substr(0,3)},
            j: function(){return jsdate.getDate()},
            l: function(){return txt_weekdays[f.w()]},
            N: function(){return f.w() + 1},
            S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'},
            w: function(){return jsdate.getDay()},
            z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0},

            // Week
            W: function(){
                var a = f.z(), b = 364 + f.L() - a;
                var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
                if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
                    return 1;
                } else{
                    if(a <= 2 && nd >= 4 && a >= (6 - nd)){
                        nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                        return date("W", Math.round(nd2.getTime()/1000));
                    } else{
                        return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                    }
                }
            },

            // Month
            F: function(){return txt_months[f.n()]},
            m: function(){return pad(f.n(), 2)},
            M: function(){return f.F().substr(0,3)},
            n: function(){return jsdate.getMonth() + 1},
            t: function(){
                var n;
                if( (n = jsdate.getMonth() + 1) == 2 ){
                    return 28 + f.L();
                } else{
                    if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
                        return 31;
                    } else{
                        return 30;
                    }
                }
            },

            // Year
            L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0},
            //o not supported yet
            Y: function(){return jsdate.getFullYear()},
            y: function(){return (jsdate.getFullYear() + "").slice(2)},

            // Time
            a: function(){return jsdate.getHours() > 11 ? "pm" : "am"},
            A: function(){return f.a().toUpperCase()},
            B: function(){
                // peter paul koch:
                var off = (jsdate.getTimezoneOffset() + 60)*60;
                var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
                var beat = Math.floor(theSeconds/86.4);
                if (beat > 1000) beat -= 1000;
                if (beat < 0) beat += 1000;
                if ((String(beat)).length == 1) beat = "00"+beat;
                if ((String(beat)).length == 2) beat = "0"+beat;
                return beat;
            },
            g: function(){return jsdate.getHours() % 12 || 12},
            G: function(){return jsdate.getHours()},
            h: function(){return pad(f.g(), 2)},
            H: function(){return pad(jsdate.getHours(), 2)},
            i: function(){return pad(jsdate.getMinutes(), 2)},
            s: function(){return pad(jsdate.getSeconds(), 2)},
            //u not supported yet

            // Timezone
            //e not supported yet
            //I not supported yet
            O: function(){
                var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
                if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
                return t;
            },
            P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))},
            //T not supported yet
            //Z not supported yet

            // Full Date/Time
            c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()},
            //r not supported yet
            U: function(){return Math.round(jsdate.getTime()/1000)}
        };

        return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
            if( t!=s ){
                // escaped
                ret = s;
            } else if( f[s] ){
                // a date function exists
                ret = f[s]();
            } else{
                // nothing special
                ret = s;
            }
            return ret;
        });
    }


    //form2json 将表单中提交的数据转换成json   结束
    var jsonToStr = function(obj){
        var THIS = this;
        switch(typeof(obj)){
            case 'string':
                return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
            case 'array':
                return '[' + obj.map(jsonToStr).join(',') + ']';
            case 'object':
                if(Object.prototype.toString.call(obj) === '[object Array]'){
                    var strArr = [];
                    var len = obj.length;
                    for(var i=0; i<len; i++){
                        strArr.push(jsonToStr(obj[i]));
                    }
                    return '[' + strArr.join(',') + ']';
                }else if(obj==null){
                    return 'null';
                }else{
                    var string = [];
                    for (var property in obj) string.push(jsonToStr(property) + ':' + jsonToStr(obj[property]));
                    return '{' + string.join(',') + '}';
                }
            case 'number':
                return obj;
            case false:
                return obj;
            case 'boolean':
                return obj;
        }
    }
    //将json形式的字符串转换成json结构
    var strToJson = function(str){
        if(str != null && typeof str != 'undefined'){
            str = str.replace(/\r\n/g,"\\n");
        }
        return eval('(' + str + ')');
    }

    function upload(file,id){
        var xhr = new XMLHttpRequest();
        var filename = false;
        try {
            filename = file['name'];
        } catch (e) {
            filename = false;
        }
        if (!filename) {
            $(".note-alarm").remove();
        }
        var fd = new FormData();
        fd.append("file",file);
        $.restAjax({
            url :$.apiPath+moduleName.resource+ $.apijoin+'storage'+ $.apijoin + 'token'+ $.apijoin+'common' ,
            type:'get',
            async:false,
            success : function(data) {
                if(data.status=='200'){
                    fd.append("token", data.result);
                    fd.append('key', $.dropguid()+filename.substr(filename.lastIndexOf('.')));
                }
            }
        });
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.addEventListener("abort", uploadCanceled, false);
        xhr.open("POST", "http://upload.qiniu.com",true);
        headers = {
            "Accept": "application/json",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest"
        };
        for (headerName in headers) {
            headerValue = headers[headerName];
            xhr.setRequestHeader(headerName, headerValue);
        }
        xhr.send(fd);
        /**
         * 上传完成之后判断是否还有需要上传的文件，有则继续上传
         * @param evt
         */
        function uploadComplete(evt) {
            var response = JSON.parse(evt.target.response);
            $('#'+id).summernote('editor.insertImage', 'http://of6k5lmot.bkt.clouddn.com/'+response.key);
            $(".note-alarm").html("上传成功,请等待加载");
            setTimeout(function () {
                $(".note-alarm").remove();
            }, 3000);
        }

        function uploadFailed(evt) {
            $(".note-alarm").html("上传失败");
            setTimeout(function () {
                $(".note-alarm").remove();
            }, 3000);
        }

        function uploadCanceled(evt) {
            //暂不提供取消的功能
        }
    }


    //富文本图片上传
    var sendFile = function(file, id, url){
        $(".note-toolbar.btn-toolbar").append(' 正在上传图片 ');
        var filename = false;
        try {
            filename = file['name'];
        } catch (e) {
            filename = false;
        }
        if (!filename) {
            $(".note-alarm").remove();
        }
        var formData = new FormData();
        if(url == 'http://upload.qiniu.com'){
            $.restAjax({
                url :$.apiPath+moduleName.resource+ $.apijoin+'storage'+ $.apijoin + 'token'+ $.apijoin+'common' ,
                type:'get',
                async:false,
                success : function(data) {
                    if(data.status=='200'){
                        formData.append("token", data.result);
                        formData.append('key', 'summer_'+$.dropguid()+filename.substr(filename.lastIndexOf('.')));
                    }
                }
            });
        }

        formData.append("file", file);
        $.ajax({
            data: formData,
            type: "POST",
            url: url,
            cache: false,
            contentType: false,
            processData: false,
            beforeSend :function(XMLHttpRequest){
                XMLHttpRequest.setRequestHeader("token", token);
                XMLHttpRequest.setRequestHeader("appKey", "LexingInternalApp");
            },
            success: function (data) {
                $('#'+id).summernote('editor.insertImage', 'http://of6k5lmot.bkt.clouddn.com/'+data.key);
                $(".note-alarm").html("上传成功,请等待加载");
                setTimeout(function () {
                    $(".note-alarm").remove();
                }, 3000);
            },
            error: function () {
                $(".note-alarm").html("上传失败");
                setTimeout(function () {
                    $(".note-alarm").remove();
                }, 3000);
            }
        });
    }

    var summerNoteEditor = function(id,cls,options){// summernote 富文本编辑框
        requirejs(['summernote','summernote-zh-CN'],function(a,b){
            var _ops = {
                height: 300,
                lang:"zh-CN",
                disableDragAndDrop: true,//禁用拖拽
                dialogsInBody: true,
                shortcuts: true,//快捷键
                toolbar: [
                    // [groupName, [list of button]]
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['font', ['strikethrough', 'superscript', 'subscript']],
                    ['fontsize', ['fontsize']],
                    ['fontname', ['fontname']],
                    ['color', ['color']],
                    ['table', ['table']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['fullscreen', ['fullscreen']],
                    ['codeview', ['codeview']],
                    ['height', ['height']],
                    ['picture', ['picture']],
                    ['remove', ['removeMedia']]
                ],
                callbacks: {
                    onBlur: function() {},
                    onImageUpload: function(files, editor, $editable) {
                       /* sendFile(files[0],id,"http://upload.qiniu.com");*/
                        upload(files[0],id);
                    }
                }
            };
            var _callbacks = $.extend(_ops.callbacks,options.callbacks);
            _ops = $.extend(_ops,options);
            _ops.callbacks = _callbacks;
            if(id){
                $('#'+id).summernote(_ops);
            }else{
                $('.'+cls).summernote(_ops);
            }

        });
    }

    var fileInpputInit = function(id,options){
        requirejs(["fileinput","fileinput_locale_zh"],function(a,b){
            var _ops = {
                language: 'zh', //设置语言
                showUpload: true,//是否显示上传按钮
                showCaption: true,//是否显示标题
                showPreview: true,
                showCancel: false,
                showRemove: false,
                autoReplace:true,
                browseOnZoneClick:true,
                maxFileCount: 100,
                uploadUrl: $.apiPath+"apis/1/storage/common/common",
                browseClass: "btn btn-primary btn-sm",
                removeClass: 'btn btn-default btn-sm',
                uploadClass: 'btn btn-default btn-sm',
                allowedFileExtensions : ['jpg', 'png','gif','pdf']//接收的文件后缀
            };
            _ops = $.extend(_ops,options);
            $('#'+id).fileinput(_ops);

            if(options && options.edit){//编辑时禁用上传按钮
                $('#'+id).closest(".btn-file").addClass("disabled");
                $('#'+id).closest(".file-input").find(".file-caption").append(options.fileSize?"<div class='file-caption-size'>("+options.fileSize+")</div>":"");//添加文件大小
                $('#'+id).closest(".file-input").find(".file-caption .file-caption-name").attr("title",options.msgSelected + (options.fileSize?"(" +options.fileSize + ")":""));//文件title里添加大小
            }

            /*$('#'+id).on("fileloaded", function(event, file, previewId, index, reader) {//加载文件并计算大小
                var size = (parseInt(file.size)/1024).toFixed(2) + "KB";
                if(parseInt(size) >= 1000){
                    size = (parseInt(file.size)/(1024*1024)).toFixed(2) + "MB";
                }
                $(this).closest(".file-input").find(".file-caption").append("<div class='file-caption-size'>("+size+")</div>");
                if(id == "usefile_add" || id == "usefile_edit"){
                    $("#instructionFileName").val(file.name);
                    $("#instructionFileLength").val(size);
                }else{
                    $("#factoryTestReportFileName").val(file.name);
                    $("#factoryTestReportFileLength").val(size);
                }
                $(this).fileinput('upload');//上传
            });

            $('#'+id).on('fileclear', function(event) {//清除文件
                $.restAjax({
                    url: $.apiPath+'apis/1/storage/common?fileName='+$('.'+id).val(),
                    type: "delete",
                    success: function (data) {
                        if(data.status == '200'){
                            $(event.target).closest(".file-input").find(".file-caption-size").remove();
                            $(event.target).closest(".btn-file").removeClass("disabled");
                            if(id == "usefile_add" || id == "usefile_edit"){
                                $("#instructionFileName").val("");
                                $("#instructionFileLength").val("");
                            }else{
                                $("#factoryTestReportFileName").val("");
                                $("#factoryTestReportFileLength").val("");
                            }
                            $('.'+id).val("");
                            $('.'+id).valid();//手动验证是否为空
                        }
                    }
                });
            });

            $('#'+id).on('fileuploaded', function(event, data, previewId, index) {//上传成功后
                var size = (parseInt(data.files[0].size)/1024).toFixed(2) + "KB";
                if(parseInt(size) >= 1000){
                    size = (parseInt(data.files[0].size)/(1024*1024)).toFixed(2) + "MB";
                }
                var title = $(this).closest(".file-input").find(".file-caption .file-caption-name").attr("title") + "(" + size + ")";
                $(this).closest(".file-input").find(".file-caption .file-caption-name").attr("title",title);
                $(this).closest(".btn-file").addClass("disabled");//禁止上传
                $('.'+id).val(data.jqXHR.responseJSON.result);//接收上传成功后的七牛文件名
                $('.'+id).valid();//手动验证
                var content = data.jqXHR.responseJSON;
                backTip(content,'Y');
            });

            $('#'+id).on('fileuploaderror', function(event, data, msg) {//上传失败
                $('#'+id).fileinput('clear');
                var content = data.jqXHR.responseJSON;
                if(!content){
                    content = {"message":"文件格式不对！"}
                }
                backTip(content,'N');
            });*/
        });
    };

    var dropZoneInit = function(id,options){
        requirejs(['dropzone'],function(Dropzone){
            Dropzone.autoDiscover = false;
            var _ops = {
              /*  url: $.apiPath+"apis@1@storage@common@common",*/
                url: 'http://upload.qiniu.com',
                method: "post",
                headers: {"token": token},
                paramName: 'file',
                addRemoveLinks: true,
                dictInvalidInputType: 'X',
                maxFiles: 6,
                maxFilesize: 2,
                acceptedFiles: ".jpg,.png,.jpeg",
                dictCancelUpload: '移除',
                dictRemoveFile: '移除',
                uploadMultiple: false,
                dictFileTooBig: "文件不能大于2M",
                dictInvalidFileType: "文件类型不正确",
                dictRemoveFileConfirmation : "是否确定删除",
                fileWidthCompare:false,//上传图片的宽度不能小于高度
                init : function(){
                    var $this = this;
                    options.initDrop = this;
                    if($('#'+options.urlId).val()){
                        var urls = $('#'+options.urlId).val().split(',');
                        for(var i in urls){
                            var name = urls[i].substring(urls[i].lastIndexOf("/")+1);
                            var mockFile = { name: "", size: 12345 , fileName : name ,status : "success",accepted : true,upload:{bytesSent:1}};
                            $this.files.push(mockFile);
                            $this.emit("addedfile", mockFile);
                            $this.emit("thumbnail", mockFile, urls[i]);
                            $this.emit("complete", mockFile);
                            $this.emit("selectedfiles", mockFile);//隐藏上传提示信息
                            var responseText = {code : '200',result:urls[i],editInit:true};
                            $this.emit("success", mockFile, responseText, "");//添加上传成功标示
                        }
                    }
                    /*if(options && options.result){
                        var mockFile = { name: "", size: 12345 , fileName : options.result.contentThumbnail ,status : "success",accepted : true,upload:{bytesSent:1}};
                        $this.files.push(mockFile);
                        $this.emit("addedfile", mockFile);
                        $this.emit("thumbnail", mockFile, options.result.contentThumbnail);
                        $this.emit("complete", mockFile);
                        $this.emit("selectedfiles", mockFile);//隐藏上传提示信息
                        var responseText = {code : '200',result:options.result.contentThumbnail,editInit:true};
                        $this.emit("success", mockFile, responseText, "");//添加上传成功标示
                    }*/
                },
                maxfilesexceeded: function (file) {//超过上传数目时不允许上传
                    var _ref;
                    if ((_ref = file.previewElement) != null) {
                        _ref.parentNode.removeChild(file.previewElement);
                    }
                    return this._updateMaxFilesReachedClass();
                },
                removedfile: function (file) {
                    if(file.status == "success"){//上传成功的移除事件
                        $.restAjax({
                            url: $.apiPath+'apis@1@storage@common?fileName='+file.fileName,
                            type: "delete",
                            success: function (data) {
                                if(data.status == '200'){
                                    var _ref;
                                    var urls = $('#'+options.urlId).val().split(',');
                                    for(var i = 0;i<urls.length;i++){
                                        var url = urls[i];
                                        if(url && (url.substring(url.lastIndexOf("/")+1) == file.fileName)){
                                            urls.splice(i,1);
                                            break;
                                        }
                                    }
                                    if ((_ref = file.previewElement) != null) {
                                        _ref.parentNode.removeChild(file.previewElement);
                                    }

                                    $('#'+options.urlId).val(urls.join(','));
                                    $("#"+id+" .dz-message,#"+id).css("cursor","pointer").removeAttr("disabled");
                                    $("input[type='file']").removeAttr("disabled");
                                }
                            }
                        });
                       /* $("#content_thumbnail").val('');
                        $("#content_thumbnail").valid();*/

                    }else{//上传失败的图片取消处理
                        var _ref;
                        if ((_ref = file.previewElement) != null) {
                            _ref.parentNode.removeChild(file.previewElement);
                        }
                    }

                },
                success: function (file, responseText) {
                    if(responseText.code=="200" || responseText.key){
                        var fileurl = options.buket+responseText.key;
                        if(!responseText.editInit){//非编辑状态才需要更新url值
                            $('#'+options.urlId).val($('#'+options.urlId).val()?($('#'+options.urlId).val()+','+fileurl):fileurl);
                            file.fileName = responseText.key;
                        }
                        /*if(options && options.imgUrl){
                            file.sequenceNBR = responseText.result.sequenceNBR;
                            file.imgUrl = responseText.result.imgUrl;
                            file.fileName = responseText.result.fileName;
                            $("#hidurl").val(file.imgUrl);
                            $("#sequenceNBR").val(file.sequenceNBR);
                            $("#fileName").val(file.fileName);
                        }else{
                            file.fileName = responseText.result.substring(responseText.result.lastIndexOf("/")+1);
                            $("#content_thumbnail,#fileName").val(file.fileName);
                            if(!responseText.editInit){//编辑时初始化后立即上传一张图片，此时validate未加载，不进行验证
                                $("#content_thumbnail").valid();  //验证数据是否通过
                            }
                        }
                        if($this.getAcceptedFiles().length == 1){//如果上传成功图片达到1个 则禁用上传控件
                            $("#"+id+" .dz-message,#"+id).css("cursor","not-allowed").attr("disabled",'disabled');//禁止上传
                            $("input[type='file']").attr("disabled",true);
                            $(".note-group-select-from-files input[type='file']").attr("disabled",false);//富文本上传文件
                        }*/
                        return file.previewElement.classList.add("dz-success");
                    }else{
                        return file.previewElement.classList.add("dz-error");
                    }
                },
                accept: function(file, done) { console.log(file); return done(); },
                complete:function(file){ }
            };
            _ops = $.extend(_ops,options);
            $("#"+id).dropzone(_ops);
        });
    };

    var dictDataInit = function(id,value){//获取字典表里的字典的所有字典值
        $.restAjax({
            url :$.apiPath+'apis/1/common/standardChoices/'+value+'/values',
            type:"get",
            async:false,
            cache:false,
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader("token",token);
            },
            success : function(data) {
                var list = data.result;
                var ops = "<option value=''>请选择</option>";
                for(var i=0;i<list.length;i++){
                    ops += '<option value='+list[i].dictDataKey+' text='+list[i].dictDataValue+'>'+list[i].dictDataValue+'</option>';
                }
                $("#"+id).append(ops);
            }
        });
    };

    /*
     * 懒加载jspadding-right: 0px
     * 示例:loadScript("js/my_lovely_script.js", myPrettyCode);
     */
    var jsArray = {};
    function loadScript(scriptName, callback) {
        if (!jsArray[scriptName]) {
            jsArray[scriptName] = true;
            var body = document.getElementsByTagName('body')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = scriptName;
            script.onload = callback;
            body.appendChild(script);
        } else if (callback) {// changed else to else if(callback)
            callback();
        }
    }

    /**
     * 将data属性转为js对象
     */
    $.fn.qdata = function(){
        var res = {};

        var data = $(this).attr('data');
        if(data){
            var options = data.split(';');
            for(var i=0; i<options.length; i++){
                if(options[i]){
                    var opt = options[i].split(':');
                    res[opt[0]] = opt[1];
                }
            }
        }

        return res;
    };

    var lx = {};
    lx.tree = {};
    lx.tree.options = {
        url 	: '',
        height 	: '600px',
        open	: true,
        edit	: false,
        checkbox: false,
        showurl	: true
    };
    $.fn.bstree = function(options){
        var opt = $.extend({}, lx.tree.options);
        if(options){
            if(typeof options == 'string'){
                opt.url = options;
            }else{
                $.extend(opt, options);
            }
        }

        var res = '加载失败！';
        var $this = $(this);
        $.restAjax({
            url:opt.url + '/tree',
            success:function(json){
                if(json && json.object){
                    var tree = json.object;

                    var start = '<div class="panel panel-info"><div class="panel-body" ';
                    if(opt.height != 'auto')
                        start += 'style="height:600px;overflow-y:auto;"';
                    start += '><ul class="nav nav-list sidenav" id="treeul" data="url:' + opt.url +';">';
                    var children = lx.tree.sub(tree, opt);
                    var end = '</ul></div></div>';
                    res = start + children + end;
                }

                $this.empty().append(res);
                lx.tree.init();
            }
        });
    };
    lx.tree.sub = function(tree, opt){
        var res = '';
        if(tree){
            var res =
                '<li>' +
                '<a href="javascript:void(0);" data="id:' + tree.id + ';url:' + tree.url + ';">' +
                '<span class="glyphicon glyphicon-minus"></span>';
            if(opt.checkbox){
                res += '<input type="checkbox" class="treecheckbox" ';
                if(tree.checked){
                    res += 'checked';
                }
                res += '/>';
            }
            res += tree.text;
            if(opt.showurl){
                res += '(' + tree.url + ')';
            }
            if(opt.edit)
                res +=
                    '&nbsp;&nbsp;<span class="label label-primary bstreeadd">添加子菜单</span>' +
                    '&nbsp;&nbsp;<span class="label label-primary bstreeedit">修改</span>' +
                    '&nbsp;&nbsp;<span class="label label-danger  bstreedel">删除</span>';
            res += '</a>';
            var children = tree.children;
            if(children && children.length > 0){
                res += '<ul style="padding-left:20px;" id="treeid_' + tree.id + '" class="nav collapse ';
                if(opt.open)
                    res += 'in';
                res += '">';
                for(var i=0; i<children.length; i++){
                    res += lx.tree.sub(children[i], opt);
                }
                res += '</ul>';
            }
            res += '</li>';
        }

        return res;
    };
    lx.tree.init = function(){
        lx.on('#treeul .glyphicon-minus', 'click', function(){
            if($(this).parent().next().length > 0){
                $('#treeid_' + $(this).parents('a').qdata().id).collapse('hide');
                $(this).removeClass('glyphicon-minus').addClass('glyphicon-plus');
            }
        });
        lx.on('#treeul .glyphicon-plus', 'click', function(){
            if($(this).parent().next().length > 0){
                $('#treeid_' + $(this).parents('a').qdata().id).collapse('show');
                $(this).removeClass('glyphicon-plus').addClass('glyphicon-minus');
            }
        });
        lx.on('input.treecheckbox', 'change', function(){
            // 检测子级的
            var subFlag = $(this).prop('checked');
            $(this).parent().next().find('input.treecheckbox').each(function(){
                $(this).prop('checked', subFlag);
            });

            // 检测父辈的
            var parentFlag = true;
            var $ul = $(this).parent().parent().parent();
            $ul.children().each(function(){
                var checked = $(this).children().children('input').prop('checked');
                if(!checked) parentFlag = false;
            });
            $ul.prev().children('input').prop('checked', parentFlag);
        });

        lx.tree.url = $('#treeul').qdata().url;
        if(lx.tree.url){
            lx.on('.bstreeadd', 'click', lx.tree.addp);
            lx.on('.bstreedel', 'click', lx.tree.del);
            lx.on('.bstreeedit', 'click', lx.tree.editp);
        }
    };
    lx.tree.addp = function(){
        lx.dialog({
            url 	: lx.tree.url + '/add/' + $(this).parent().qdata().id,
            title 	: '添加子菜单',
            okbtn 	: '保存'
        }, lx.tree.add);
    };
    lx.tree.add = function(){
        var res;
        lx.ajax({url:lx.tree.url + '/save',data:$('#bsmodal').find('form').qser(),async: false}, function(obj){res = obj;});

        lx.msg(res);
        if(res && res.type == 'success'){
            lx.crud.url = lx.tree.url;
            lx.crud.reset();
            return true;
        }else{
            return false;
        }
    };
    lx.tree.del = function(){
        lx.ajax({
            url:lx.tree.url + '/del/' + $(this).parent().qdata().id,
        }, function(res){
            lx.msg(res);

            if(res && res.type == 'success'){
                lx.crud.url = lx.tree.url;
                lx.crud.reset();
            }
        });
    };
    lx.tree.editp = function(){
        lx.dialog({
            url 	: lx.tree.url + '/savep?id=' + $(this).parent().qdata().id,
            title 	: '修改菜单',
            okbtn 	: '保存'
        }, lx.tree.edit);
    };
    lx.tree.edit = function(){
        lx.crud.url = lx.tree.url;
        return lx.crud.save();
    };

    $.extend({
        dropguid:function(prefix) {
            var counter = 0;
            var date = new Date();
            var datestr = dateFormat('Ymd',date);
            var guid = date.getTime().toString(32), i;
           /* for (i = 0; i < 5; i++) {
                guid += Math.floor(Math.random() * 65535).toString(32);
            }*/
            return (prefix || 'o_') + datestr+"_"+guid;// + (counter++).toString(32);
        }
    });

    return  {
        paramString2obj : paramString2obj,
        backTip : backTip,
        dateFormat : dateFormat,
        jsonToStr : jsonToStr,
        strToJson : strToJson,
        sendFile : sendFile,
        summerNoteEditor : summerNoteEditor,
        dropZoneInit : dropZoneInit,
        fileInpputInit : fileInpputInit,
        dictDataInit : dictDataInit
    };
});