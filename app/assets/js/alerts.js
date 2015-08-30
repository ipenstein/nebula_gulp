// alerts.js

$(document).ready (function () {

    $(".alert-message").each(function() {
        $(this).prepend('<a href="javascript://" class="close-icon">&#xf00d</a>');
        var msg = this;
        var btn = $(".close-icon", msg);
        btn.click(function() {
            $(msg).slideUp();
        });
    });

});