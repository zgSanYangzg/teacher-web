/* Set the defaults for DataTables initialisation */
$.extend( true, $.fn.dataTable.defaults, {
        //"sDom": "<'row-fluid'<'span6'l><'span6'f>r>t<'row-fluid'<'span6'i><'span6'p>>",<'span6'<'dt_actions'>l>
        "sDom": "<'searchDiv'<'dataTables_searchbar'><'dataTables_toolbar'>><'row-fluid inboxHeader'<'span6'f>r>t<'row-fluid inboxFooter'<'span6'i><'span6'l><'span6'p>>",//"<'dt_toolbar'>frtipl",
        "sPaginationType": "bootstrap",
        "oLanguage": {
                "sLengthMenu": "_MENU_ records per page"
        }
} );


/* Default class modification */
$.extend( $.fn.dataTableExt.oStdClasses, {
        "sWrapper": "dataTables_wrapper form-inline"
} );


/* API method to get paging information */
$.fn.dataTableExt.oApi.fnPagingInfo = function ( oSettings )
{
        return {
                "iStart":         oSettings._iDisplayStart,
                "iEnd":           oSettings.fnDisplayEnd(),
                "iLength":        oSettings._iDisplayLength,
                "iTotal":         oSettings.fnRecordsTotal(),
                "iFilteredTotal": oSettings.fnRecordsDisplay(),
                "iPage":          oSettings._iDisplayLength === -1 ?
                        0 : Math.ceil( oSettings._iDisplayStart / oSettings._iDisplayLength ),
                "iTotalPages":    oSettings._iDisplayLength === -1 ?
                        0 : Math.ceil( oSettings.fnRecordsDisplay() / oSettings._iDisplayLength )
        };
};


/* Bootstrap style pagination control */
$.extend( $.fn.dataTableExt.oPagination, {
        "bootstrap": {
                "fnInit": function( oSettings, nPaging, fnDraw ) {
                        var oLang = oSettings.oLanguage.oPaginate;
                        var fnClickHandler = function ( e ) {
                                e.preventDefault();
                                if ( oSettings.oApi._fnPageChange(oSettings, e.data.action) ) {
                                        fnDraw( oSettings );
                                }
                        };

                        $(nPaging).append(
                                '<ul class="pagination">'+
                                        '<li class="first disabled"><a href="#"><i class="icon-home"></i> '+oLang.sFirst+'</a></li>'+
                                        '<li class="prev disabled"><a href="#"><i class="icon-arrow-left"></i> '+oLang.sPrevious+'</a></li>'+
                                        '<li class="next disabled"><a href="#"><i class="icon-arrow-right"></i>'+oLang.sNext+'  </a></li>'+
                                        '<li class="last disabled"><a href="#"><i class="icon-home"></i> '+oLang.sLast+'</a></li>'+
                                '</ul>'
                        );
                        var els = $('a', nPaging);
                        $(els[0]).bind( 'click.DT', { action: "first" }, fnClickHandler );
                        $(els[1]).bind( 'click.DT', { action: "previous" }, fnClickHandler );
                        $(els[2]).bind( 'click.DT', { action: "next" }, fnClickHandler );
                        $(els[3]).bind( 'click.DT', { action: "last" }, fnClickHandler );
                },

                "fnUpdate": function ( oSettings, fnDraw ) {
                        var iListLength = 5;
                        var oPaging = oSettings.oInstance.fnPagingInfo();
                        var an = oSettings.aanFeatures.p;
                        var i, ien, j, sClass, iStart, iEnd, iHalf=Math.floor(iListLength/2);

                        if ( oPaging.iTotalPages < iListLength) {
                                iStart = 1;
                                iEnd = oPaging.iTotalPages;
                        }
                        else if ( oPaging.iPage <= iHalf ) {
                                iStart = 1;
                                iEnd = iListLength;
                        } else if ( oPaging.iPage >= (oPaging.iTotalPages-iHalf) ) {
                                iStart = oPaging.iTotalPages - iListLength + 1;
                                iEnd = oPaging.iTotalPages;
                        } else {
                                iStart = oPaging.iPage - iHalf + 1;
                                iEnd = iStart + iListLength - 1;
                        }

                        for ( i=0, ien=an.length ; i<ien ; i++ ) {
                                // Remove the middle elements
                               // $('li:gt(1)', an[i]).filter(':not(:last)').remove();
                                $('li', an[i]).filter(":not(.first)").filter(":not(.last)").filter(":not(.prev)").filter(":not(.next)").remove();
                                // Add the new list items and their event handlers
                                for ( j=iStart ; j<=iEnd ; j++ ) {
                                        sClass = (j==oPaging.iPage+1) ? 'class="active"' : '';
                                        $('<li '+sClass+'><a href="#">'+j+'</a></li>')
                                                .insertBefore( $('li.next', an[i])[0] )
                                                .bind('click', function (e) {
                                                        e.preventDefault();
                                                        oSettings._iDisplayStart = (parseInt($('a', this).text(),10)-1) * oPaging.iLength;
                                                        fnDraw( oSettings );
                                                } );
                                }

                                // Add / remove disabled classes from the static elements
                               /* if ( oPaging.iPage === 0 ) {
                                        $('li:nth-child(1)', an[i]).addClass('disabled');
                                        $('li:nth-child(2)', an[i]).addClass('disabled');
                                } else {
                                		$('li:nth-child(1)', an[i]).removeClass('disabled');
                                		$('li:nth-child(2)', an[i]).removeClass('disabled');
                                }

                                if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
                                        $('li:last', an[i]).addClass('disabled');
                                } else {
                                        $('li:last', an[i]).removeClass('disabled');
                                }*/
                                if ( oPaging.iPage === 0 ) {
                					$('li.first', an[i]).addClass('disabled');
                					$('li.prev', an[i]).addClass('disabled');
                				} else {
                					$('li.prev', an[i]).removeClass('disabled');
                					$('li.first', an[i]).removeClass('disabled');
                				}

                				if ( oPaging.iPage === oPaging.iTotalPages-1 || oPaging.iTotalPages === 0 ) {
                					$('li.last', an[i]).addClass('disabled');
                					$('li.next', an[i]).addClass('disabled');
                				} else {
                					$('li.next', an[i]).removeClass('disabled');
                					$('li.last', an[i]).removeClass('disabled');
                				}
                        }
                }
        }
} );


/*
 * TableTools Bootstrap compatibility
 * Required TableTools 2.1+
 */
if ( $.fn.DataTable.TableTools ) {
        // Set the classes that TableTools uses to something suitable for Bootstrap
        $.extend( true, $.fn.DataTable.TableTools.classes, {
                "container": "DTTT btn-group",
                "buttons": {
                        "normal": "btn",
                        "disabled": "disabled"
                },
                "collection": {
                        "container": "DTTT_dropdown dropdown-menu",
                        "buttons": {
                                "normal": "",
                                "disabled": "disabled"
                        }
                },
                "print": {
                        "info": "DTTT_print_info modal"
                },
                "select": {
                        "row": "active"
                }
        } );

        // Have the collection use a bootstrap compatible dropdown
        $.extend( true, $.fn.DataTable.TableTools.DEFAULTS.oTags, {
                "collection": {
                        "container": "ul",
                        "button": "li",
                        "liner": "a"
                }
        } );
}


/* Table initialisation */
$(document).ready(function() {
        $('#example').dataTable( {
                "sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
                "sPaginationType": "bootstrap",
                "oLanguage": {
                        "sLengthMenu": "_MENU_ records per page"
                }
        } );
} );

jQuery.fn.dataTableExt.oApi.fnSetFilteringDelay = function ( oSettings, iDelay ) {
    var _that = this;

    if ( iDelay === undefined ) {
        iDelay = 250;
    }

    this.each( function ( i ) {
        $.fn.dataTableExt.iApiIndex = i;
        var
            $this = this,
            oTimerId = null,
            sPreviousSearch = null,
            anControl = $( 'input', _that.fnSettings().aanFeatures.f );

        anControl.unbind( 'keyup' ).bind( 'keyup', function() {
            var $$this = $this;

            if (sPreviousSearch === null || sPreviousSearch != anControl.val()) {
                window.clearTimeout(oTimerId);
                sPreviousSearch = anControl.val();
                oTimerId = window.setTimeout(function() {
                    $.fn.dataTableExt.iApiIndex = i;
                    _that.fnFilter( anControl.val() );
                }, iDelay);
            }
        });

        return this;
    } );
    return this;
};

