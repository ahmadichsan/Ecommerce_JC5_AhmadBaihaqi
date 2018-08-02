$(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
        $('#myBtn').fadeIn();
    } else {
        $('#myBtn').fadeOut();
    }
});
$(document).delegate('#myBtn', 'click', function () {

    $('html, body').animate({
        scrollTop: 0
    }, 1000);
    return false;
});