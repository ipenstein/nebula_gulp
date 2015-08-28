// syncheight.js

$(document).ready(function() {

    // Detect browser-window resize
    $( window ).bind( "resize", function(){

        // Sync new height of columns
        $('.sync-height > div').syncHeight();
    });

    // Sync initial height of columns
    $('.sync-height > div').syncHeight();

});