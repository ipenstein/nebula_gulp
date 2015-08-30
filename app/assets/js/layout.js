/* layout.js */

$(document).ready(function() {
/*
    $("a:not(.btn)").focus (function () {
        this.blur() ;
    }) ;
*/
    $('#preloader').fadeOut(
        'slow',
        function(){
            $(this).remove();
        }
    );

});