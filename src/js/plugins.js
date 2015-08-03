// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

(function($) {
    $(document).ready(function() {
        var menuToggle = $('#js-mobile-menu').unbind();
        $('#js-navigation-menu').removeClass("show");

        menuToggle.on('click', function(e) {
            e.preventDefault();
            $('#js-navigation-menu').slideToggle(function(){
                if($('#js-navigation-menu').is(':hidden')) {
                    $('#js-navigation-menu').removeAttr('style');
                }
            });
        });
    });
})(jQuery);
