!function(o){o.fn.Picker=function(i){var e={ifshow:!1,sId:"",wrapperHtml:"",ifload:!1,pickerDom:o('<div class="picker"><div><ul id='+i.sId+' class="ztree clearfix"></ul></div><div class="footer"><button type="button" class="btn btn-info close-tree" style="padding:5px 12px;float:right;margin:12px">确定</button></div></div>')},n=this,f=o(this);this.oConfig=o.extend(e,i);var t=function(){s()},d=function(e){if(e.ifload)e.pickerDom.show();else{e.pickerDom.appendTo(f.parent()),e.ifload=!0;var n={check:{enable:!0},data:{simpleData:{enable:!0}}},t=[{id:1,pId:0,name:"hfgkhjfgkd开放给合肥科技和开发和",open:!0},{id:11,pId:1,name:"随意勾选 1-1"},{id:12,pId:1,name:"随意勾选 1-2"},{id:13,pId:1,name:"随意勾选 1-3"},{id:14,pId:1,name:"随意勾选 1-4"},{id:2,pId:0,name:"福利科技股份卡号及付款合计非公开",open:!0},{id:21,pId:2,name:"随意勾选 2-1"},{id:22,pId:2,name:"随意勾选 2-2"},{id:23,pId:2,name:"回家了开发过好久了赶快回家过来看回家了"}];o.fn.zTree.init(o("#"+i.sId),n,t),o("#"+i.sId).find(".ico_open").each(function(){o(this).hide()}),o("#"+i.sId).find(".ico_docu").each(function(){o(this).hide()})}e.ifshow=!0},c=function(){d(n.oConfig)},s=function(){f.on("focus",c),n.oConfig.pickerDom.on("click",".close-tree",function(o){n.oConfig.pickerDom.hide(),n.oConfig.ifshow=!1}),o(document).on("click",function(o){if(n.oConfig.ifshow&&o.target!=f[0]){var i=n.oConfig.pickerDom[0],e=o.clientX,t=o.clientY,d=n.oConfig.pickerDom.offsetParent(),c=i.offsetLeft+d.offset().left,s=i.offsetTop+d.offset().top,a=i.offsetLeft+i.offsetWidth+d.offset().left,p=i.offsetTop+i.offsetHeight+d.offset().top;console.log(e+":"+t+"  ("+c+"-"+a+"-"+s+"-"+p+")***"+(e<c||e>a||t<s||t>p)),(e<c||e>a||t<s||t>p)&&(n.oConfig.pickerDom.hide(),n.oConfig.ifshow=!1)}})};return t(),this}}(jQuery);