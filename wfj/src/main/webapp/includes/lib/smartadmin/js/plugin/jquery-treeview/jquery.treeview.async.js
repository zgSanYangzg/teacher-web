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

!function(s){function e(e,i,l,a){function h(i){var l=s("<li/>").attr("id",this[e.id]||"").attr("level",this[e.level]+""||"").html("<span><i class='fa fa-lg'></i>&nbsp;<label>"+this[e.text]+"</label></span>").appendTo(i);if(this.classes&&l.children("span").addClass(this.classes),"GROUP.ROOT"!=this[e.id]&&"-1"!=this[e.id]||l.find("span").addClass("spanck"),null!=this.children&&0!=this.children.length?(l.find("span > i").addClass("fa-minus-circle"),l.addClass("open")):(this.hasChildren||"true"==this.hasChildren||"Y"==this.hasChildren)&&l.find("span > i").addClass("fa-plus-circle"),this.hasChildren||"true"==this.hasChildren||"Y"==this.hasChildren||this.children&&this.children.length){var a=s("<ul/>").appendTo(l);this.children&&this.children.length?s.each(this.children,h,[a]):this.hasChildren&&(l.addClass("hasChildren"),h.call({classes:"placeholder",text:"&nbsp;",children:[]},a))}}e.id;s.ajax(s.extend(!0,{url:e.url,dataType:"json",data:{parentCode:i},success:function(t){l.empty();var n=new Array;if(s.isArray(t.result))if(e.name)if(e.root==i){var r={groupCode:e.root,groupName:e.name,nodeLevel:1,hasChildren:t.result.length,children:t.result};n.push(r)}else s.each(t.result,function(s,e){n.push(e)});else n.push(t.result[0]);else n.push(t.result);s.each(n,h,[l]),s(a).treeview({add:l})}},e.ajax))}var i=s.fn.treeview;s.fn.treeview=function(l){if(!l.url)return i.apply(this,arguments);var a=this;a.children().size()||e(l,l.root,this,a);var h=l.toggle;return i.call(this,s.extend({},l,{collapsed:!0,toggle:function(){var i=s(this);if(i.hasClass("hasChildren")){var t=i.removeClass("hasChildren").find("ul");e(l,this.id,t,a)}h&&h.apply(this,arguments)}}))}}(jQuery);