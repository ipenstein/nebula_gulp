// Collapse
function openCollapse (el, duration) {
    var dur = (duration) ? duration : 400;
    $(el).addClass("collapse-open");
    $(el).next(".collapse-content").slideDown(dur, function() {
        $(this).addClass("collapse-open");
    });
}

function closeCollapse (el, duration) {
    var dur = (duration) ? duration : 400;
    $(el).removeClass("collapse-open");
    $(el).next(".collapse-content").slideUp(dur, function() {
        $(this).removeClass("collapse-open");
    });
}

$.fn.initCollapse = function() {
    var toggles = $(".collapse-toggle", this);
    var dur = (duration) ? duration : 400;

    // Bilden die Collapsabls ein Accordion?
    var accordion = $(this).hasClass("collapse-accordion");

    // Alle collapsables mit Klasse "open" initial öffnen
    toggles.each(function() {
        if ($(this).hasClass("collapse-open")) {
            openCollapse(this, 1);
        }
    });

    toggles.each(function() {
        $(this).click(function() {
            if ( $(this).hasClass("collapse-open") === true) {
                closeCollapse(this, dur);
            } else {
                if (accordion === true) {
                    toggles.not(this).each(function() {
                        closeCollapse(this, dur);
                    });
                }
                openCollapse(this, dur);
            }
        });
    });
};

$.fn.clearCollapse = function() {
    $(".collapse-toggle", this).each(function() {
        $(this).unbind("click");
    });
};

var duration = 400;
$(document).ready(function() {
    $(".collapse-container").each(function() {
        $(this).initCollapse(duration);
    });
});