/* responsive.js */

/* Größe des Browserfensters abfragen ----- */
/* und entsprechende Trigger setzen  ------ */
function checkResponsiveStatus() {
    var status = $('#responsive-status').css('font-family');

    if (status != laststatus) {

        // Set <body> classname to responsive-{name of current breakpoint}
        $('body').removeClass (function (index, css) {
            return (css.match (/(^|\s)responsive-\S+/g) || []).join(' ');
        });
        $('body').addClass("responsive-" + status);

        // Just for presentation (may be deleted)
        $('.example-rs').html(status);

        // Call functions tied to current breakpoint
        // Add your own cases if you like
        switch(status) {
            case "mobile":
                console.log("JavaScript-Code for mobile resolution");
                break;

            case "small":
                console.log("JavaScript-Code for small resolution");
                break;

            case "medium":
                console.log("JavaScript-Code for medium resolution");
                break;

            case "big":
                console.log("JavaScript-Code for big resolution");
                break;
        }
    }

    laststatus = status;
}

var laststatus = false;

$(document).ready(function() {

    // Groessenaenderung des Browserfensters abfangen
    $( window ).bind( "resize", function(){
        checkResponsiveStatus();
    });

    // Seite initialisieren
    checkResponsiveStatus();

});