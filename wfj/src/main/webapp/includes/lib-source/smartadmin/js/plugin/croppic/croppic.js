(function (b, a) {
    Croppic = function (e, c) {
        var d = this;
        d.id = e;
        d.obj = $("#" + e);
        d.outputDiv = d.obj;
        d.options = {headers: "", uploadUrl: "", uploadData: {}, cropUrl: "", cropData: {}, outputUrlId: "", imgEyecandy: true, imgEyecandyOpacity: 0.2, zoomFactor: 10, rotateFactor: 5, doubleZoomControls: true, rotateControls: true, modal: false, customUploadButtonId: "", loaderHtml: "", scaleToFill: true, processInline: false, loadPicture: "", onReset: null, enableMousescroll: false, allowTypes: [], onBeforeImgUpload: null, onAfterImgUpload: null, onImgDrag: null, onImgZoom: null, onImgRotate: null, onBeforeImgCrop: null, onAfterImgCrop: null, onBeforeRemoveCroppedImg: null, onAfterRemoveCroppedImg: null, onError: null};
        for (i in c) {
            d.options[i] = c[i]
        }
        d.init()
    };
    Croppic.prototype = {id: "", imgInitW: 0, imgInitH: 0, imgW: 0, imgH: 0, objW: 0, objH: 0, actualRotation: 0, windowW: 0, windowH: $(b).height(), obj: {}, outputDiv: {}, outputUrlObj: {}, img: {}, defaultImg: {}, croppedImg: {}, imgEyecandy: {}, form: {}, iframeform: {}, iframeobj: {}, cropControlsUpload: {}, cropControlsCrop: {}, cropControlZoomMuchIn: {}, cropControlZoomMuchOut: {}, cropControlZoomIn: {}, cropControlZoomOut: {}, cropControlCrop: {}, cropControlReset: {}, cropControlRemoveCroppedImage: {}, modal: {}, loader: {}, init: function () {
        var c = this;
        c.objW = c.obj.width();
        c.objH = c.obj.height();
        c.actualRotation = 0;
        if ($.isEmptyObject(c.defaultImg)) {
            c.defaultImg = c.obj.find("img")
        }
        c.createImgUploadControls();
        if ($.isEmptyObject(c.options.loadPicture)) {
            c.bindImgUploadControl()
        } else {
            c.loadExistingImage()
        }
    }, createImgUploadControls: function () {
        var f = this;
        var e = "";
        if (f.options.customUploadButtonId === "") {
            e = '<i class="cropControlUpload"></i>'
        }
        var c = '<i class="cropControlRemoveCroppedImage"></i>';
        if ($.isEmptyObject(f.croppedImg)) {
            c = ""
        }
        if (!$.isEmptyObject(f.options.loadPicture)) {
            e = ""
        }
        var d = '<div class="cropControls cropControlsUpload"> ' + e + c + " </div>";
        f.outputDiv.append(d);
        f.cropControlsUpload = f.outputDiv.find(".cropControlsUpload");
        if (f.options.customUploadButtonId === "") {
            f.imgUploadControl = f.outputDiv.find(".cropControlUpload")
        } else {
            f.imgUploadControl = $("#" + f.options.customUploadButtonId);
            f.imgUploadControl.show()
        }
        if (!$.isEmptyObject(f.croppedImg)) {
            f.cropControlRemoveCroppedImage = f.outputDiv.find(".cropControlRemoveCroppedImage")
        }
    }, bindImgUploadControl: function () {
        var d = this;
        var c = '<form class="' + d.id + '_imgUploadForm" style="display: none; visibility: hidden;">  <input type="file" name="img" id="' + d.id + '_imgUploadField">  </form>';
        d.outputDiv.append(c);
        d.form = d.outputDiv.find("." + d.id + "_imgUploadForm");
        var e = d.CreateFallbackIframe();
        d.imgUploadControl.off("click");
        d.imgUploadControl.on("click", function () {
            if (e === "") {
                d.form.find('input[type="file"]').trigger("click")
            } else {
                d.iframeform.find('input[type="file"]').trigger("click")
            }
        });
        if (!$.isEmptyObject(d.croppedImg)) {
            d.cropControlRemoveCroppedImage.on("click", function () {
                if (typeof(d.options.onBeforeRemoveCroppedImg) === typeof(Function)) {
                    d.options.onBeforeRemoveCroppedImg.call(d)
                }
                d.croppedImg.remove();
                $(this).hide();
                if (typeof(d.options.onAfterRemoveCroppedImg) === typeof(Function)) {
                    d.options.onAfterRemoveCroppedImg.call(d)
                }
                if (!$.isEmptyObject(d.defaultImg)) {
                    d.obj.append(d.defaultImg)
                }
                if (d.options.outputUrlId !== "") {
                    $("#" + d.options.outputUrlId).val("")
                }
            })
        }
        d.form.find('input[type="file"]').change(function () {
            var h = d.options.allowTypes;
            var g = this.value.substring(this.value.lastIndexOf(".")).toLowerCase();
            if (h.indexOf(g) == -1) {
                backTip({message: "\u6587\u4ef6\u683c\u5f0f\u4e0d\u6b63\u786e\uff0c\u8bf7\u4e0a\u4f20 jpg \u6216\u8005 png\u683c\u5f0f"}, "N");
                return false
            }
            if (d.options.onBeforeImgUpload) {
                d.options.onBeforeImgUpload.call(d)
            }
            d.showLoader();
            d.imgUploadControl.hide();
            if (d.options.processInline) {
                var f = new FileReader();
                f.onload = function (l) {
                    var k = new Image();
                    k.src = l.target.result;
                    k.onload = function () {
                        d.imgInitW = d.imgW = k.width;
                        d.imgInitH = d.imgH = k.height;
                        if (d.options.modal) {
                            d.createModal()
                        }
                        if (!$.isEmptyObject(d.croppedImg)) {
                            d.croppedImg.remove()
                        }
                        d.imgUrl = k.src;
                        d.obj.append('<img src="' + k.src + '">');
                        d.initCropper();
                        d.hideLoader();
                        if (d.options.onAfterImgUpload) {
                            d.options.onAfterImgUpload.call(d)
                        }
                    }
                };
                f.readAsDataURL(d.form.find('input[type="file"]')[0].files[0])
            } else {
                formData = new FormData(d.form[0]);
                for (var j in d.options.uploadData) {
                    if (d.options.uploadData.hasOwnProperty(j)) {
                        formData.append(j, d.options.uploadData[j])
                    }
                }
                $.ajax({url: d.options.uploadUrl, data: formData, context: a.body, cache: false, contentType: false, processData: false, type: "POST"}).always(function (k) {
                    d.afterUpload(k)
                })
            }
        })
    }, loadExistingImage: function () {
        var d = this;
        if ($.isEmptyObject(d.croppedImg)) {
            if (d.options.onBeforeImgUpload) {
                d.options.onBeforeImgUpload.call(d)
            }
            d.showLoader();
            if (d.options.modal) {
                d.createModal()
            }
            if (!$.isEmptyObject(d.croppedImg)) {
                d.croppedImg.remove()
            }
            d.imgUrl = d.options.loadPicture;
            var c = $('<img src="' + d.options.loadPicture + '">');
            d.obj.append(c);
            c.load(function () {
                d.imgInitW = d.imgW = this.width;
                d.imgInitH = d.imgH = this.height;
                d.initCropper();
                d.hideLoader();
                if (d.options.onAfterImgUpload) {
                    d.options.onAfterImgUpload.call(d)
                }
            })
        } else {
            d.cropControlRemoveCroppedImage.on("click", function () {
                d.croppedImg.remove();
                $(this).hide();
                if (!$.isEmptyObject(d.defaultImg)) {
                    d.obj.append(d.defaultImg)
                }
                if (d.options.outputUrlId !== "") {
                    $("#" + d.options.outputUrlId).val("")
                }
                d.croppedImg = "";
                d.reset()
            })
        }
    }, afterUpload: function (e) {
        var d = this;
        response = typeof e == "object" ? e : jQuery.parseJSON(e);
        if (response.status == "200") {
            d.imgInitW = d.imgW = response.width;
            d.imgInitH = d.imgH = response.height;
            if (d.options.modal) {
                d.createModal()
            }
            if (!$.isEmptyObject(d.croppedImg)) {
                d.croppedImg.remove()
            }
            d.imgUrl = response.result;
            var c = $('<img src="' + response.result + '">');
            d.obj.append(c);
            c.load(function () {
                d.initCropper();
                d.hideLoader();
                if (d.options.onAfterImgUpload) {
                    d.options.onAfterImgUpload.call(d)
                }
            });
            if (d.options.onAfterImgUpload) {
                d.options.onAfterImgUpload.call(d)
            }
        }
        if (response.status != "200") {
            if (d.options.onError) {
                d.options.onError.call(d, response.message)
            }
            d.hideLoader();
            setTimeout(function () {
                d.reset()
            }, 2000)
        }
    }, createModal: function () {
        var d = this;
        var e = d.windowH / 2 - d.objH / 2;
        var c = '<div id="croppicModal"><div id="croppicModalObj" style="width:' + d.objW + "px; height:" + d.objH + "px; margin:0 auto; margin-top:" + e + 'px; position: relative;"> </div></div>';
        $("body").append(c);
        d.modal = $("#croppicModal");
        d.obj = $("#croppicModalObj")
    }, destroyModal: function () {
        var c = this;
        c.obj = c.outputDiv;
        c.modal.remove();
        c.modal = {}
    }, initCropper: function () {
        var c = this;
        c.img = c.obj.find("img");
        c.img.wrap('<div class="cropImgWrapper" style="overflow:hidden; z-index:1; position:absolute; width:' + c.objW + "px; height:" + c.objH + 'px;"></div>');
        c.createCropControls();
        if (c.options.imgEyecandy) {
            c.createEyecandy()
        }
        c.initDrag();
        c.initialScaleImg()
    }, createEyecandy: function () {
        var c = this;
        c.imgEyecandy = c.img.clone();
        c.imgEyecandy.css({"z-index": "0", opacity: c.options.imgEyecandyOpacity}).appendTo(c.obj)
    }, destroyEyecandy: function () {
        var c = this;
        c.imgEyecandy.remove()
    }, initialScaleImg: function () {
        var c = this;
        c.zoom(-c.imgInitW);
        c.zoom(40);
        if (c.options.enableMousescroll) {
            c.img.on("mousewheel", function (d) {
                d.preventDefault();
                c.zoom(c.options.zoomFactor * d.deltaY)
            })
        }
        c.img.css({left: -(c.imgW - c.objW) / 2, top: -(c.imgH - c.objH) / 2, position: "relative"});
        if (c.options.imgEyecandy) {
            c.imgEyecandy.css({left: -(c.imgW - c.objW) / 2, top: -(c.imgH - c.objH) / 2, position: "relative"})
        }
    }, createCropControls: function () {
        var h = this;
        var d = "";
        var f = '<i class="cropControlZoomIn"></i>';
        var k = '<i class="cropControlZoomOut"></i>';
        var j = "";
        var l = "";
        var e = "";
        var c = '<i class="cropControlCrop"></i>';
        var m = '<i class="cropControlReset"></i>';
        var g;
        if (h.options.doubleZoomControls) {
            d = '<i class="cropControlZoomMuchIn"></i>';
            j = '<i class="cropControlZoomMuchOut"></i>'
        }
        if (h.options.rotateControls) {
            l = '<i class="cropControlRotateLeft"></i>';
            e = '<i class="cropControlRotateRight"></i>'
        }
        g = '<div class="cropControls cropControlsCrop">' + d + f + k + j + l + e + c + m + "</div>";
        h.obj.append(g);
        h.cropControlsCrop = h.obj.find(".cropControlsCrop");
        if (h.options.doubleZoomControls) {
            h.cropControlZoomMuchIn = h.cropControlsCrop.find(".cropControlZoomMuchIn");
            h.cropControlZoomMuchIn.on("click", function () {
                h.zoom(h.options.zoomFactor * 10)
            });
            h.cropControlZoomMuchOut = h.cropControlsCrop.find(".cropControlZoomMuchOut");
            h.cropControlZoomMuchOut.on("click", function () {
                h.zoom(-h.options.zoomFactor * 10)
            })
        }
        h.cropControlZoomIn = h.cropControlsCrop.find(".cropControlZoomIn");
        h.cropControlZoomIn.on("click", function () {
            h.zoom(h.options.zoomFactor)
        });
        h.cropControlZoomOut = h.cropControlsCrop.find(".cropControlZoomOut");
        h.cropControlZoomOut.on("click", function () {
            h.zoom(-h.options.zoomFactor)
        });
        h.cropControlZoomIn = h.cropControlsCrop.find(".cropControlRotateLeft");
        h.cropControlZoomIn.on("click", function () {
            h.rotate(-h.options.rotateFactor)
        });
        h.cropControlZoomOut = h.cropControlsCrop.find(".cropControlRotateRight");
        h.cropControlZoomOut.on("click", function () {
            h.rotate(h.options.rotateFactor)
        });
        h.cropControlCrop = h.cropControlsCrop.find(".cropControlCrop");
        h.cropControlCrop.on("click", function () {
            h.crop()
        });
        h.cropControlReset = h.cropControlsCrop.find(".cropControlReset");
        h.cropControlReset.on("click", function () {
            h.reset()
        })
    }, initDrag: function () {
        var c = this;
        c.img.on("mousedown touchstart",function (k) {
            k.preventDefault();
            var h;
            var f;
            var m = b.navigator.userAgent;
            if (m.match(/iPad/i) || m.match(/iPhone/i) || m.match(/android/i)) {
                h = k.originalEvent.touches[0].pageX;
                f = k.originalEvent.touches[0].pageY
            } else {
                h = k.pageX;
                f = k.pageY
            }
            var j = c.img.css("z-index"), g = c.img.outerHeight(), l = c.img.outerWidth(), n = c.img.offset().top + g - f, d = c.img.offset().left + l - h;
            c.img.css("z-index", 1000).on("mousemove touchmove", function (q) {
                var p;
                var s;
                if (m.match(/iPad/i) || m.match(/iPhone/i) || m.match(/android/i)) {
                    p = q.originalEvent.touches[0].pageY + n - g;
                    s = q.originalEvent.touches[0].pageX + d - l
                } else {
                    p = q.pageY + n - g;
                    s = q.pageX + d - l
                }
                c.img.offset({top: p, left: s}).on("mouseup", function () {
                    $(this).removeClass("draggable").css("z-index", j)
                });
                if (c.options.imgEyecandy) {
                    c.imgEyecandy.offset({top: p, left: s})
                }
                if (c.objH < c.imgH) {
                    if (parseInt(c.img.css("top")) > 0) {
                        c.img.css("top", 0);
                        if (c.options.imgEyecandy) {
                            c.imgEyecandy.css("top", 0)
                        }
                    }
                    var r = -(c.imgH - c.objH);
                    if (parseInt(c.img.css("top")) < r) {
                        c.img.css("top", r);
                        if (c.options.imgEyecandy) {
                            c.imgEyecandy.css("top", r)
                        }
                    }
                } else {
                    if (parseInt(c.img.css("top")) < 0) {
                        c.img.css("top", 0);
                        if (c.options.imgEyecandy) {
                            c.imgEyecandy.css("top", 0)
                        }
                    }
                    var r = c.objH - c.imgH;
                    if (parseInt(c.img.css("top")) > r) {
                        c.img.css("top", r);
                        if (c.options.imgEyecandy) {
                            c.imgEyecandy.css("top", r)
                        }
                    }
                }
                if (c.objW < c.imgW) {
                    if (parseInt(c.img.css("left")) > 0) {
                        c.img.css("left", 0);
                        if (c.options.imgEyecandy) {
                            c.imgEyecandy.css("left", 0)
                        }
                    }
                    var o = -(c.imgW - c.objW);
                    if (parseInt(c.img.css("left")) < o) {
                        c.img.css("left", o);
                        if (c.options.imgEyecandy) {
                            c.imgEyecandy.css("left", o)
                        }
                    }
                } else {
                    if (parseInt(c.img.css("left")) < 0) {
                        c.img.css("left", 0);
                        if (c.options.imgEyecandy) {
                            c.imgEyecandy.css("left", 0)
                        }
                    }
                    var o = (c.objW - c.imgW);
                    if (parseInt(c.img.css("left")) > o) {
                        c.img.css("left", o);
                        if (c.options.imgEyecandy) {
                            c.imgEyecandy.css("left", o)
                        }
                    }
                }
                if (c.options.onImgDrag) {
                    c.options.onImgDrag.call(c)
                }
            })
        }).on("mouseup",function () {
            c.img.off("mousemove")
        }).on("mouseout", function () {
            c.img.off("mousemove")
        })
    }, rotate: function (c) {
        var d = this;
        d.actualRotation += c;
        d.img.css({"-webkit-transform": "rotate(" + d.actualRotation + "deg)", "-moz-transform": "rotate(" + d.actualRotation + "deg)", transform: "rotate(" + d.actualRotation + "deg)"});
        if (d.options.imgEyecandy) {
            d.imgEyecandy.css({"-webkit-transform": "rotate(" + d.actualRotation + "deg)", "-moz-transform": "rotate(" + d.actualRotation + "deg)", transform: "rotate(" + d.actualRotation + "deg)"})
        }
        if (typeof d.options.onImgRotate == "function") {
            d.options.onImgRotate.call(d)
        }
    }, zoom: function (k) {
        var g = this;
        var h = g.imgW / g.imgH;
        var e = g.imgW + k;
        var c = e / h;
        var m = true;
        if (e < g.objW || c < g.objH) {
            if (e - g.objW < c - g.objH) {
                e = g.objW;
                c = e / h
            } else {
                c = g.objH;
                e = h * c
            }
            m = false
        }
        if (!g.options.scaleToFill && (e > g.imgInitW || c > g.imgInitH)) {
            if (e - g.imgInitW < c - g.imgInitH) {
                e = g.imgInitW;
                c = e / h
            } else {
                c = g.imgInitH;
                e = h * c
            }
            m = false
        }
        g.imgW = e;
        g.img.width(e);
        g.imgH = c;
        g.img.height(c);
        var j = parseInt(g.img.css("top")) - k / 2;
        var l = parseInt(g.img.css("left")) - k / 2;
        if (j > 0) {
            j = 0
        }
        if (l > 0) {
            l = 0
        }
        var f = -(c - g.objH);
        if (j < f) {
            j = f
        }
        var d = -(e - g.objW);
        if (l < d) {
            l = d
        }
        if (m) {
            g.img.css({top: j, left: l})
        }
        if (g.options.imgEyecandy) {
            g.imgEyecandy.width(e);
            g.imgEyecandy.height(c);
            if (m) {
                g.imgEyecandy.css({top: j, left: l})
            }
        }
        if (g.options.onImgZoom) {
            g.options.onImgZoom.call(g)
        }
    }, crop: function () {
        var h = this;
        if(h.options.widthPic && (h.imgInitW < h.imgInitH)){
            $.alert({
                title: '提示',
                content: '请上传宽屏图片(宽度大于高度)',
                confirmButton: '确定'
            });
            return;
        }
        if (h.options.onBeforeImgCrop) {
            h.options.onBeforeImgCrop.call(h)
        }
        h.cropControlsCrop.hide();
        h.showLoader();
        var c = {oldUrl: $("#" + h.id + "_hiddenUrl").val(), file: h.form.find('input[type="file"]')[0].files[0], imgInitW: h.imgInitW, imgInitH: h.imgInitH, imgW: h.imgW.toFixed(), imgH: h.imgH.toFixed(), imgY1: Math.abs(parseInt(h.img.css("top"))), imgX1: Math.abs(parseInt(h.img.css("left"))), cropH: h.objH.toFixed(), cropW: h.objW.toFixed(), rotation: h.actualRotation};
        var f;
        if (typeof FormData == "undefined") {
            var g = new XMLHttpRequest();
            var m = "";
            var e = [];
            for (var l in c) {
                e.push(encodeURIComponent(l) + "=" + encodeURIComponent(c[l]))
            }
            for (var l in h.options.cropData) {
                e.push(encodeURIComponent(l) + "=" + encodeURIComponent(h.options.cropData[l]))
            }
            m = e.join("&").replace(/%20/g, "+");
            g.addEventListener("error", function (n) {
                if (h.options.onError) {
                    h.options.onError.call(h, "XHR Request failed")
                }
            });
            g.onreadystatechange = function () {
                if (g.readyState == 4 && g.status == 200) {
                    h.afterCrop(g.responseText)
                }
            };
            g.open("POST", h.options.cropUrl);
            var d = h.options.headers;
            for (var k in d) {
                var j = d[k];
                g.setRequestHeader(k, j)
            }
            g.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            g.setRequestHeader("Content-Length", m.length);
            g.send(m)
        } else {
            f = new FormData();
            for (var l in c) {
                if (c.hasOwnProperty(l)) {
                    f.append(l, c[l])
                }
            }
            for (var l in h.options.cropData) {
                if (h.options.cropData.hasOwnProperty(l)) {
                    f.append(l, h.options.cropData[l])
                }
            }
            $.ajax({url: h.options.cropUrl, data: f, context: a.body, cache: false, contentType: false, processData: false, type: "POST", beforeSend: function (o) {
                var p = h.options.headers;
                for (var q in p) {
                    var n = p[q];
                    o.setRequestHeader(q, n)
                }
            }}).always(function (n) {
                h.afterCrop(n)
            })
        }
    }, afterCrop: function (e) {
        var d = this;
        try {
            response = jQuery.parseJSON(e)
        } catch (c) {
            response = typeof e == "object" ? e : jQuery.parseJSON(e)
        }
        if (response.status == "200") {
            if (d.options.imgEyecandy) {
                d.imgEyecandy.hide()
            }
            d.destroy();
            d.obj.append('<img class="croppedImg" src="' + response.result + '">');
            if (d.options.outputUrlId !== "") {
                $("#" + d.options.outputUrlId).val(response.result)
            }
            d.croppedImg = d.obj.find(".croppedImg");
            d.init();
            d.hideLoader()
        }
        if (response.status != "200") {
            if (d.options.onError) {
                d.options.onError.call(d, response.message)
            }
            d.hideLoader();
            setTimeout(function () {
                d.reset()
            }, 2000)
        }
        if (d.options.onAfterImgCrop) {
            d.options.onAfterImgCrop.call(d)
        }
    }, showLoader: function () {
        var c = this;
        c.obj.append(c.options.loaderHtml);
        c.loader = c.obj.find(".loader")
    }, hideLoader: function () {
        var c = this;
        c.loader.remove()
    }, reset: function () {
        var c = this;
        c.destroy();
        c.init();
        if (!$.isEmptyObject(c.croppedImg)) {
            c.obj.append(c.croppedImg);
            if (c.options.outputUrlId !== "") {
                $("#" + c.options.outputUrlId).val(c.croppedImg.attr("url"))
            }
        }
        if (typeof c.options.onReset == "function") {
            c.options.onReset.call(c)
        }
    }, destroy: function () {
        var c = this;
        if (c.options.modal && !$.isEmptyObject(c.modal)) {
            c.destroyModal()
        }
        if (c.options.imgEyecandy && !$.isEmptyObject(c.imgEyecandy)) {
            c.destroyEyecandy()
        }
        if (!$.isEmptyObject(c.cropControlsUpload)) {
            c.cropControlsUpload.remove()
        }
        if (!$.isEmptyObject(c.cropControlsCrop)) {
            c.cropControlsCrop.remove()
        }
        if (!$.isEmptyObject(c.loader)) {
            c.loader.remove()
        }
        if (!$.isEmptyObject(c.form)) {
            c.form.remove()
        }
        c.obj.html("")
    }, isAjaxUploadSupported: function () {
        var c = a.createElement("input");
        c.type = "file";
        return("multiple" in c && typeof File != "undefined" && typeof FormData != "undefined" && typeof(new XMLHttpRequest()).upload != "undefined")
    }, CreateFallbackIframe: function () {
        var f = this;
        if (!f.isAjaxUploadSupported()) {
            if (jQuery.isEmptyObject(f.iframeobj)) {
                var e = a.createElement("iframe");
                e.setAttribute("id", f.id + "_upload_iframe");
                e.setAttribute("name", f.id + "_upload_iframe");
                e.setAttribute("width", "0");
                e.setAttribute("height", "0");
                e.setAttribute("border", "0");
                e.setAttribute("src", "javascript:false;");
                e.style.display = "none";
                a.body.appendChild(e)
            } else {
                e = f.iframeobj[0]
            }
            var d = '<!DOCTYPE html><html><head><title>Uploading File</title></head><body><form class="' + f.id + '_upload_iframe_form" name="' + f.id + '_upload_iframe_form" action="' + f.options.uploadUrl + '" method="post" enctype="multipart/form-data" encoding="multipart/form-data" style="display:none;">' + $("#" + f.id + "_imgUploadField")[0].outerHTML + "</form></body></html>";
            e.contentWindow.document.open("text/htmlreplace");
            e.contentWindow.document.write(d);
            e.contentWindow.document.close();
            f.iframeobj = $("#" + f.id + "_upload_iframe");
            f.iframeform = f.iframeobj.contents().find("html").find("." + f.id + "_upload_iframe_form");
            f.iframeform.on("change", "input", function () {
                f.SubmitFallbackIframe(f)
            });
            f.iframeform.find("input")[0].attachEvent("onchange", function () {
                f.SubmitFallbackIframe(f)
            });
            var c = function () {
                if (e.detachEvent) {
                    e.detachEvent("onload", c)
                } else {
                    e.removeEventListener("load", c, false)
                }
                var g = f.getIframeContentJSON(e);
                if (jQuery.isEmptyObject(f.modal)) {
                    f.afterUpload(g)
                }
            };
            if (e.addEventListener) {
                e.addEventListener("load", c, true)
            }
            if (e.attachEvent) {
                e.attachEvent("onload", c)
            }
            return"#" + f.id + "_imgUploadField"
        } else {
            return""
        }
    }, SubmitFallbackIframe: function (c) {
        c.showLoader();
        if (c.options.processInline && !c.options.uploadUrl) {
            if (c.options.onError) {
                c.options.onError.call(c, "processInline is not supported by your browser ");
                c.hideLoader()
            }
        } else {
            if (c.options.onBeforeImgUpload) {
                c.options.onBeforeImgUpload.call(c)
            }
            c.iframeform[0].submit()
        }
    }, getIframeContentJSON: function (d) {
        try {
            var f = d.contentDocument ? d.contentDocument : d.contentWindow.document, c;
            var g = f.body.innerHTML;
            if (g.slice(0, 5).toLowerCase() == "<pre>" && g.slice(-6).toLowerCase() == "</pre>") {
                g = f.body.firstChild.firstChild.nodeValue
            }
            c = jQuery.parseJSON(g)
        } catch (e) {
            c = {success: false}
        }
        return c
    }}
})(window, document);
