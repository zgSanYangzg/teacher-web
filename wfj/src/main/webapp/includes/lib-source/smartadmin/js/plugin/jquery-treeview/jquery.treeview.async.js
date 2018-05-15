/*
 * Async Treeview 0.1 - Lazy-loading extension for Treeview
 * 
 * http://bassistance.de/jquery-plugins/jquery-plugin-treeview/
 *
 * Copyright (c) 2007 Jörn Zaefferer
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Revision: $Id$
 *
 */

;(function($) {

function load(settings, root, child, container) {
	function createNode(parent) {
        var current = $("<li/>").attr("id", this[settings.id] || "").attr("level", this[settings.level]+"" || "").html("<span><i class='fa fa-lg'></i>&nbsp;" +"<label>"+ this[settings.text] +"</label>"+ "</span>").appendTo(parent);
		if (this.classes) {
			current.children("span").addClass(this.classes);
		}
		if(this[settings.id]=="GROUP.ROOT" || this[settings.id]=="-1"){//判断是否是根节点 根节点添加选中样式
			current.find("span").addClass("spanck");
		}
		if (this.children != null && this.children.length!=0) {//同步
            current.find("span > i").addClass("fa-minus-circle");
			current.addClass("open");

		}else if(this.hasChildren ||(this.hasChildren == 'true') || (this.hasChildren == 'Y')){//异步
            current.find("span > i").addClass("fa-plus-circle");
        }

        //$('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
      /*  $('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span >i').on('click', function(e) {
            var children = $(this).closest('li.parent_li').find(' > ul > li');
            if (children.is(':visible')) {
                children.hide('fast');
                $(this).removeClass().addClass('fa fa-lg fa-plus-circle');
            } else {
                children.show('fast');
                $(this).removeClass().addClass('fa fa-lg fa-minus-circle');
            }
            e.stopPropagation();
        });*/

		if (this.hasChildren || (this.hasChildren == 'true') || (this.hasChildren == 'Y') || this.children && this.children.length) {
			var branch = $("<ul/>").appendTo(current);
			if (this.children && this.children.length) {
				$.each(this.children, createNode, [branch])
			}else if (this.hasChildren){
				current.addClass("hasChildren");
				createNode.call({
					classes: "placeholder",
					text: "&nbsp;",
					children:[]
				}, branch);
			}
		}
	}

    var pid = settings.id;

	$.ajax($.extend(true, {
		url: settings.url,
		dataType: "json",
		data: {
            parentCode:root
        },
		success: function(response) {
			child.empty();
			var data = new Array();
			if($.isArray(response.result)){//如果是数组格式
				if(settings.name){//根据name组装根节点
					if(settings.root == root){
						var _root = {"groupCode":settings.root,"groupName":settings.name,"nodeLevel":1,"hasChildren":response.result.length,"children":response.result};
						data.push(_root);
					}else{
						$.each(response.result,function(index,item){
							data.push(item);
						});
					}
				}else{
					data.push(response.result[0]);
				}
			}else{
				data.push(response.result);
			}
			$.each(data, createNode, [child]);
	        $(container).treeview({add: child});
	    }
	}, settings.ajax));
	/*
	$.getJSON(settings.url, {root: root}, function(response) {
		function createNode(parent) {
			var current = $("<li/>").attr("id", this.id || "").html("<span>" + this.text + "</span>").appendTo(parent);
			if (this.classes) {
				current.children("span").addClass(this.classes);
			}
			if (this.expanded) {
				current.addClass("open");
			}
			if (this.hasChildren || this.children && this.children.length) {
				var branch = $("<ul/>").appendTo(current);
				if (this.hasChildren) {
					current.addClass("hasChildren");
					createNode.call({
						classes: "placeholder",
						text: "&nbsp;",
						children:[]
					}, branch);
				}
				if (this.children && this.children.length) {
					$.each(this.children, createNode, [branch])
				}
			}
		}
		child.empty();
		$.each(response, createNode, [child]);
        $(container).treeview({add: child});
    });
    */
}

var proxied = $.fn.treeview;
$.fn.treeview = function(settings) {
	if (!settings.url) {
		return proxied.apply(this, arguments);
	}
	var container = this;
	if (!container.children().size())
		load(settings, settings.root, this, container);
	var userToggle = settings.toggle;
	return proxied.call(this, $.extend({}, settings, {
		collapsed: true,
		toggle: function() {
			var $this = $(this);
			if ($this.hasClass("hasChildren")) {
				var childList = $this.removeClass("hasChildren").find("ul");
				load(settings, this.id, childList, container);
			}
			if (userToggle) {
				userToggle.apply(this, arguments);
			}
		}
	}));
};

})(jQuery);