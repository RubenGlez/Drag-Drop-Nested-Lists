(function($) {
    var defaultOptions = {
        clone: true,
        dropTo: ["tested-list", "another-list"]
    };



    // Status during drag & drop
    var $movingEl = null;
    var $parentList = null;



    // Private methods
    function cloningItems(list){
        if (list.data("options").clone == true) {
            return "clone";
        }else{
            return "original";
        }
    }

    function deleteEmptyItems(){
        var $emptyEls = $('.list-item');

        $emptyEls.each(function(){      
            if ( this.children.length == 0 ) {
                this.remove();
            }
        });
    }



    // Public methods
    var methods = {
        init: function(options) {
            options = $.extend({}, defaultOptions, options);

            // Assign data to list
            this.data("options", options);

            // Make items draggable
            this.find('.item')
                .draggable({
                    helper: cloningItems(this),
                    revert: "invalid",
                    scroll: true,
                    cursor: "crosshair",
                    zIndex: 100,
                    appendTo: "body"
                })
                .on( "dragstart", methods.dragStart )
                .on( "drag", methods.drag )
                .on( "dragstop", methods.dragStop );     

            // Make items droppable
            var droppableLists = this.data("options").dropTo;
            droppableLists.forEach(function(valor){
                $('ul.'+valor+' .list-item').droppable()
                    .on("drop", methods.drop)
                    .on("dropover", methods.dropOver)
                    .on("dropout", methods.dropOut);
            });   
        },
        

        // Drag events

        dragStart: function(event, ui) {
            if ($(this).closest('.list').data("options").clone == true) {
                $movingEl = $(ui.helper).clone();
            }else{
                $movingEl = $(ui.helper);
            }

            $(this).closest('.list-item').addClass('.item-dragged');
        },

        drag: function(event, ui) {},

        dragStop: function(event, ui) {
            $(this).closest('.list-item').removeClass('.item-dragged');
        },


        // Drop events

        drop: function(event, ui) {        
            // append item
            $(this).after( $('<li class="list-item"></li>').append($movingEl) );

            // remove styles for items
            $movingEl.css({
                top: 0,
                left: 0
            });

            // delete empty items
            deleteEmptyItems();

            // make droppable again
            $(ui.draggable).closest('.list-item').droppable()
                .on("drop", methods.drop)
                .on("dropover", methods.dropOver)
                .on("dropout", methods.dropOut);

            $(this).removeClass('item-hovered');
        },

        dropOver: function(event, ui) {
            $(this).addClass('item-hovered');
        },

        dropOut: function(event, ui) {
            $(this).removeClass('item-hovered');
        },
    };




    $.fn.dndnl = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method '+method+' does not exist on jQuery.drag-drop-nested-lists');
        }
    };
})(jQuery);