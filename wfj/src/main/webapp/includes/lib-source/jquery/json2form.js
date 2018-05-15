/*	jQuery json2form Plugin 
 *	version: 1.0 (2011-03-01)
 *
 * 	Copyright (c) 2011, Crystal, shimingxy@163.com
 * 	Dual licensed under the MIT and GPL licenses:
 * 	http://www.opensource.org/licenses/mit-license.php
 * 	http://www.gnu.org/licenses/gpl.html
 * 	Date: 2011-03-01 rev 1
 */
(function ($) {
	$.json2form = $.json2form||{};
	$.fn.json2form = function(config ) {
		var $this = this;
		var config=$.extend({
			url		:null,
			elem	:this.attr("id"),
			type	:'GET'
		}, config || {});

		if(config.url){
			$.restAjax({type: config.type,url: config.url,data:config.data,dataType: "json",async: false,
				success: function(data){
					config.data=data.result;
					if(typeof config.callback == 'function'){
						config.callback(config.data);
					}
				}
			});
		}
		if(!$this.attr("loadedInit")){//init checkbox radio and select element ,label  !$("#"+config.elem).attr("loadedInit") 20151117 wud 修改 解决tab页同一页面form id相同冲突
			if(config.data.init){
				for (var elem in config.data.init){
					var arrayData=config.data.init[elem];
					if($("#"+config.elem+" input[name='"+elem+"']")){
						var elemType=$("#"+config.elem+" input[name='"+elem+"']").attr("type");
						var elemName=$("#"+config.elem+" input[name='"+elem+"']").attr("name");
						var initElem=$("#"+config.elem+" input[name='"+elem+"']");
						switch(elemType){
							case "checkbox":
							case "radio":
								for (var initelem in arrayData){
									initElem.after('<input type="'+elemType+'"  name="'+elemName+'" value="'+arrayData[initelem].value+'" />'+arrayData[initelem].display);
								}
								initElem.remove();
								break;
						}
					}
					if($("#"+config.elem+" select[name='"+elem+"']")){
						for (var initelem in arrayData){
							$("#"+config.elem+" select[name='"+elem+"']").append("<option value='"+arrayData[initelem].value+"'>"+arrayData[initelem].display+"</option>");
						}
					}
				}
			}
			if(config.data.label){//label
				$("#"+config.elem+" label").each(function(){
					var labelFor=$(this).attr("for");
					if(config.data.label[labelFor]){
						$(this).html(config.data.label[labelFor]);
					}
				});
			}

			if(config.iflabel){//绑定到label上
				$this.find("label.input-label").each(function(){//"#"+config.elem+" label.input-label" 20151117 wud 修改 解决tab页同一页面form id相同无法正确绑定数据问题
					var labelName=$(this).attr("name");
					var elemData=config.data[labelName];
					if(labelName){// 解决多层json 数据绑定问题 可以直接绑定data.detail.name类型数据
						var elems = labelName.split(".");
						if(elems.length > 1){
							elemData=config.data[elems[0]];
							if(elemData){
								for(var i=1;i<elems.length;i++){
									elemData=elemData[elems[i]];
								}
							}
						}
					}

					if(typeof(elemData)=="string"){
						if($(this).data("chks")){//如果有复选框数据
							$(this).html($(this).data("chks")[elemData]);
						}else{
							$(this).html(elemData.toUpperCase()=="NULL"?"&nbsp;-":(elemData==""?"&nbsp;-":("&nbsp;"+elemData)));
						}
					}else{
						if($(this).data("chks")){
							$(this).html($(this).data("chks")[elemData]);
						}else{
							//$(this).html(elemData?("&nbsp;"+elemData):"&nbsp;-");
							$(this).html(("&nbsp;"+elemData));
						}
					}
				});
			}
		}

		if(config.data){//input text password hidden button reset submit checkbox radio select textarea
			$("#"+config.elem+" input,select,textarea").each(function(){
				var elemType=$(this).attr("type")==undefined?this.type:$(this).attr("type");
				var elemName=$(this).attr("name");
				var elemData=config.data[elemName];
				if(elemName){// 解决多层json 数据绑定问题 可以直接绑定data.detail.name类型数据
					var elems = elemName.split(".");
					if(elems.length > 1){
						elemData=config.data[elems[0]];
						if(elemData){
							for(var i=1;i<elems.length;i++){
								elemData=elemData[elems[i]];
							}
						}
					}
				}
				if(!$("#"+config.elem).attr("loadedInit")&&$(this).attr("loadurl")){
					switch(elemType){
						case "checkbox":
						case "radio":
						case "select":
						case "select-one":
						case "select-multiple":{
							var _this =this;
							$.ajax({type: config.type,url: $(this).attr("loadurl"),dataType: "json",async: false,success: function(data){
								if(elemType=="select"||elemType=="select-one"||elemType=="select-multiple"){
									$(_this).empty();
								}
								for (var elem in data){
									if(elemType=="select"||elemType=="select-one"||elemType=="select-multiple"){
										$(_this).append("<option value='"+data[elem].value+"'>"+data[elem].display+"</option>");
									}else{
										$(_this).after('<input type="'+elemType+'"  name="'+elemName+'" value="'+data[elem].value+'" />'+data[elem].display);
									}
								}
								if(elemType=="checkbox"||elemType=="radio")$(_this).remove();
							}
							});
							break;
						}
					}
				}

				if(elemData||elemData == 0){//elemData 改为 elemData||elemData == 0 防止checkbox选项值为0 被忽略（standTop 是否置顶数据值为 0/1）   20150828 wud
					switch(elemType){
						case undefined:
						case "text":
						case "password":
						case "hidden":
						case "button":
						case "reset":
						case "textarea":
						case "submit":{
							if(typeof(elemData)=="string"){
								$(this).val(elemData.toUpperCase()=="NULL"?"":elemData);
							}else{
								$(this).val(elemData+"");
							}
							break;
						}
						case "checkbox":{
							$(this).attr("checked","");
							if(elemData.constructor==Array){//checkbox multiple value is Array
								for (var elem in elemData){
									if(elemData[elem]==$(this).val()){
										$(this).attr("checked",true);
									}
								}
							}else{//radio or checkbox is a string single value
								if(elemData==$(this).val()){
									$(this).attr("checked",true);
								}else{
									$(this).removeAttr("checked");
								}
							}
							break;
						}
						case "radio":{//处理绑定数据时radio无法正确选中问题 wud20150901
							if(elemData==$(this).val()){
								$(this).attr("checked",true);
							}
							break;
						}
						case "select":
						case "select-one":
						case "select-multiple":{
							$(this).find("option:selected").attr("selected",false);
							if(elemData.constructor==Array){
								for (var elem in elemData){
									$(this).find("option[value='"+elemData[elem]+"']").attr("selected",true);
								}
							}else{
								$(this).find("option[value='"+elemData+"']").attr("selected",true);
							}
							break;
						}
					}
				}
			});
		}

		$("#"+config.elem).attr("loadedInit","true");//loadedInit is true,next invoke not need init checkbox radio and select element ,label
	};
})(jQuery);