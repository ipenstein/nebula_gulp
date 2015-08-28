function scrollSpy() {
    var triggerName = {},
        triggerPos = {},
        i = 0;
    $(".main-nav li a").each(function(){
        var haref = $(this).attr('href');
        triggerName[haref] = $(haref);
        triggerPos[haref] = $(triggerName[haref]).offset().top - 150 ;
    });
    $(document).scroll(function() {
        for (i in triggerName) {
            if ($(window).scrollTop() >= triggerPos[i]) {
                $('.main-nav li').removeClass('active');
                $('#nav-' + i.substr(1)).addClass('active');
                //self.document.location.hash = '#nav-' + i.substr(1);
            }
        }
    });
}

$(document).ready(function() {

    //scrollTo
    $(".main-nav li a").each(function() {
        $(this).click(function(event) {
            event.preventDefault();
            $(".main-nav li").removeClass("active");
            $(this).closest("li").addClass("active");
            var haref = $(this).attr('href');
            $(window).scrollTo($(haref), 1000, {offset:-80});
        });
    });

    $(".hero a").click(function(event) {
        event.preventDefault();
        var haref = $(this).attr('href');
        $(window).scrollTo($(haref), 1500, {offset:-80});
    });

    // We wait a little bit to get the correct trigger heights
    window.setTimeout(scrollSpy, 200);
});