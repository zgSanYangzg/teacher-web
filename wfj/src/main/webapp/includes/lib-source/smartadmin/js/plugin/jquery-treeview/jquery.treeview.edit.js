(function($) {
	var CLASSES = $.treeview.classes;
	var proxied = $.fn.treeview;
	$.fn.treeview = function(settings) {
		settings = $.extend({}, settings);
		if (settings.add) {
			return this.trigger("add", [settings.add]);
		}
		if (settings.removeNode) {
			return this.trigger("removeTreeNode", [settings.removeNode]);
		}
        if (settings.addNode) {
            return this.trigger("addNode", [settings.addNode]);
        }
		return proxied.apply(this, arguments).bind("add", function(event, branches) {
			$(branches).prev()
				.removeClass(CLASSES.last)
				.removeClass(CLASSES.lastCollapsable)
				.removeClass(CLASSES.lastExpandable)
			.find(">.hitarea")
				.removeClass(CLASSES.lastCollapsableHitarea)
				.removeClass(CLASSES.lastExpandableHitarea);
			$(branches).find("li").andSelf().prepareBranches(settings).applyClasses(settings, $(this).data("toggler"));
		}).bind("removeTreeNode", function(event, branches) {
			var prev = $(branches).prev();
			var parent = $(branches).parent();
			$(branches).remove();
			prev.filter(":last-child").addClass(CLASSES.last)
				.filter("." + CLASSES.expandable).replaceClass(CLASSES.last, CLASSES.lastExpandable).end()
				.find(">.hitarea").replaceClass(CLASSES.expandableHitarea, CLASSES.lastExpandableHitarea).end()
				.filter("." + CLASSES.collapsable).replaceClass(CLASSES.last, CLASSES.lastCollapsable).end()
				.find(">.hitarea").replaceClass(CLASSES.collapsableHitarea, CLASSES.lastCollapsableHitarea);
			if (parent.is(":not(:has(>))") && parent[0] != this) {
                parent.parent().find("span > i").removeClass().addClass('fa fa-lg');
				//parent.parent().removeClass(CLASSES.collapsable).removeClass(CLASSES.expandable)
				parent.andSelf().remove();
			}
		}).bind("addNode", function(event, branches) {
             if($(branches).is(":has(>ul)")){
                 $(branches).find(">span>i").addClass("fa fa-lg fa-plus-circle").andSelf().prepareBranches(settings).applyClasses(settings, $(this).data("toggler"));
             }
        });
	};
	
})(jQuery);