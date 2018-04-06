(function($) {
    var defaultOptions = {
        clone: true,
        acceptFrom: {"list", "list-2"},
    };




    // Public methods
    var methods = {
        init: function(options) {
            options = $.extend({}, defaultOptions, options);
        },

        onDrag: function(event) {},

        onMove: function(event) {},

        onDrop: function(event) {}
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