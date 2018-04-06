(function($) {
    var defaultOptions = {
        clone: true,
        dragFrom: ["tested-list", "another-list"],
        dropTo: ["tested-list", "another-list"]
    };




    // Public methods
    var methods = {
        init: function(options) {
            options = $.extend({}, defaultOptions, options);

            this.find('.item')
                .draggable()
                .on( "dragstart", methods.dragStart )
                .on( "drag", methods.drag )
                .on( "dragstop", methods.dragStop );

                /*
                .droppable()
                .on( "dropover", methods.dropOver )
                .on( "drop", methods.drop )
                .on( "dropout", methods.dropOut );
                */                
        },
        

        // Drag events

        dragStart: function(event, ui) {
            console.log("inicia el drag");
        },

        drag: function(event, ui) {
            console.log("durante el drag");
        },

        dragStop: function(event, ui) {
            console.log("termina el drag");
        },


        // Drop events

        dropOver: function(event, ui) {
            console.log("drop sobre");
        },

        drop: function(event, ui) {
            console.log("drop");
        },

        dropOut: function(event, ui) {
            console.log("drop out");
        }
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