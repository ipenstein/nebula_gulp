// forms.js
// http://codepen.io/njsteele/pen/ajLpb

// http://lea.verou.me/2009/02/check-if-a-css-property-is-supported/
// http://jsfiddle.net/leaverou/Pmn8m/
// IE fixed and modified from selector to rule to allow for @media query check
function supportsCssRule(rule) {
    var el = document.createElement("div");
    el.innerHTML = ["&shy;", "<style type='text/css'>", rule, "</style>"].join("");
    el = document.body.appendChild(el);
    var style = el.getElementsByTagName("style")[0],
        ret = !!((style.sheet && style.sheet.cssRules) || style.styleSheet.rules)[0];
    document.body.removeChild(el);
    el = null;
    return ret;
}


$(document).ready(function() {

    // :checked polyfill
    if (!supportsCssRule(":checked{}")) {
        var checkedPolyfill = function() {
            var $input = $(this);
            if ($input.is(":checked")) {
                if ($input.is(":radio")) {
                    $("[name='" + $input.attr("name") + "']").removeClass("checked");
                }
                $input.addClass("checked");
            } else if ($input.is(":checkbox")) {
                $input.removeClass("checked");
            }
        };
        $(document).on("click", ":radio, :checkbox", checkedPolyfill);
        $(":radio, :checkbox").each(checkedPolyfill);
    }

    // Placeholder polyfill
    if (!("placeholder" in document.createElement("input"))) {
        $("input[placeholder], textarea[placeholder]").each(function() {
            var $input = $(this);
            $input.data("placeholder", $input.attr("placeholder"));
            $input.removeAttr("placeholder");

            var $clone = $input.clone();
            if ($clone.attr("type") == "password") {
                $clone = $("<input type='text'/>");
                $clone.attr("class", $input.attr("class"));
                $clone.attr("size", $input.attr("size"));
            }
            $clone.data("placeholder", $input.data("placeholder"));
            $clone.attr("readonly", "readonly");
            $clone.val($input.data("placeholder"));
            $clone.removeAttr("name");
            $input.removeAttr("id");
            $clone.addClass("ignore placeholder");
            if (!!$clone.attr("type") && $clone.attr("type").toLowerCase() == "password") {
                $clone.attr("type", "text");
            }
            $clone.css("display", $input.css("display"));
            $input.data("placeholder-input", $clone);
            $clone.data("orig-input", $input);
            $clone.hide();
            $input.before($clone);

            if (this.value === "") {
                $input.hide();
                $clone.show();
            } else {
                $clone.hide();
                $input.show();
            }

            $clone.on("focus", function() {
                var $placeholder = $(this);
                var $input = $placeholder.data("orig-input");
                $clone.hide();
                $input.show().focus();
            });
            $input.on("blur", function() {
                if (this.value === "") {
                    var $placeholder = $input.data("placeholder-input");
                    $input.hide();
                    $placeholder.show();
                }
            });
        });
    }


    // create shared labels if not already given
    $(".formrow").each(function() {
        var $formrow = $(this);
        if (!$formrow.children(".label").length) {
            var required = false;
            var labels = $.map($formrow.find(".label"), function(el) {
                if (el.className.indexOf("req") > -1)
                    required = true;
                return el.innerHTML;
            }).join(", ");
            $formrow.prepend(
                $("<label class='label" + (required ? ' req' : '') + "'/>")
                .attr("for", $formrow.find(".label:first").attr("for"))
                .html(labels)
            );
        }
    });


    // jQuery Validate
    $.validator.addMethod("pattern", function(value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        if (typeof param === 'string') {
            param = new RegExp('^(?:' + param + ')$');
        }
        return param.test(value);
    }, "Invalid format.");

    $("form").validate({
        errorPlacement: function($err, $el) {
            $err.appendTo($el.closest(".formitem"));
        },
        rules: {
            passwordagain: {
                equalTo: "#password"
            }
        },
        messages: {
            zip: {
                pattern: "Please enter a valid zip code (5 digits)."
            }
        }
    });




    // Toggle label position - for demonstration
    $(".js_toggleLabelPosition").click(function() {
        $("fieldset").toggleClass("wideform");
    });
});