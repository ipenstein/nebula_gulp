/* example-parallax.js */

$(document).ready(function() {

    // Detect browser-window resize
    $( window ).bind( "resize", function(){

        // Detect new hero unit height
        $(".hero").css("height", $(window).height());
    });

    $('.hero').parallax({
        imageSrc:       "img/uni.jpg",
        position:       "top",
        bleed:          "10",
        naturalWidth:   "1680",
        naturalHeight:  "1050",
        zIndex:         "1"
    });

    // Detect initial hero unit height
    $(".hero").css("height", $(window).height());
});