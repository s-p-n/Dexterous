$(function() {
    if ($('.markdown').length > 0) {
        $('.markdown').markItUp(mySettings);
    }

    if ($.fn.fancybox) {
        $(".fancybox").fancybox({
            arrows: false,
            closeClick: true,
            closeBtn: false,

            openEffect : 'elastic',
            openSpeed  : 150,

            closeEffect : 'elastic',
            closeSpeed  : 150,
        });
    }

    $('textarea.bottom').each(function () {
        $(this).scrollTop(this.scrollHeight - $(this).height());
    });
});

$('html').on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
});

// dropdown
$('html').click(function() {
    $('.dropdown-menu').fadeOut('fast');
});

$('html').on('click', '.dropdown-menu', function(e) {
    e.stopPropagation();
});

$('html').on('click', '.dropdown-toggle', function(e) {
    e.stopPropagation();

    var dropdown = $(this).parent();
    $('.dropdown-menu').not($('.dropdown-menu', dropdown)).hide(150);
    $('.dropdown-menu', dropdown).toggle();
    if ($('.dropdown-menu', dropdown).is(':visible')) {
        $('.dropdown-menu', dropdown).css({
            overflow: 'visible'
        });
    }
});

// halt
$('html').on('click', 'a.halt', function(e) {
    e.preventDefault();
    var display = $(this).css('display');
    $(this).hide();
    $(this).parent().find('a.sure').show().css('display', display);
});

$('html').on('mouseleave', 'a.sure', function(e) {
    e.preventDefault();
    $(this).fadeOut('fast', function() {
        $(this).parent().find('a.halt').fadeIn('fast');
    });
});

//popbox
function showPopbox(item) {
    var box = $(item).closest('.popbox').find('.box');
    if (box.css('display') == 'block') {
        box.fadeOut('fast');
    } else {
        $('.arrow', box).css({'left': box.outerWidth()/2 - 13});
        $('.arrow-border', box).css({'left': box.outerWidth()/2 - 13});
        box.css({
            'top': $(item).outerHeight() + 10,
            'left': $(item).outerWidth()/2 - box.outerWidth()/2
        });
        box.fadeIn();
    }
}

$('html').click(function() {
    $('.popbox .box').fadeOut('fast');
});

$('html').on('click', '.popbox .open', function(e) {
    e.stopPropagation();
    showPopbox(this);
});

$('html').on('click', '.popbox .close', function(e) {
    e.stopPropagation();
    var box = $(this).closest('.popbox').find('.box');
    box.fadeOut('fast');
});

jQuery.fn.extend({
    insertAtCaret: function(myValue){
        return this.each(function(i) {
            if (document.selection) {
                //For browsers like Internet Explorer
                this.focus();
                var sel = document.selection.createRange();
                sel.text = myValue;
                this.focus();
            } else if (this.selectionStart || this.selectionStart == '0') {
                //For browsers like Firefox and Webkit based
                var startPos = this.selectionStart;
                var endPos = this.selectionEnd;
                var scrollTop = this.scrollTop;
                this.value = this.value.substring(0, startPos)+myValue+this.value.substring(endPos,this.value.length);
                this.focus();
                this.selectionStart = startPos + myValue.length;
                this.selectionEnd = startPos + myValue.length;
                this.scrollTop = scrollTop;
            } else {
                this.value += myValue;
                this.focus();
            }
        });
    }
});