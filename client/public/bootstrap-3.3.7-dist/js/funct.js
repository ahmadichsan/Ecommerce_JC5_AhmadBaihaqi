// ================================ CAROUSEL ================================
$(function()
{
    $('.carousel').carousel(
    {
        interval: 4000,
        pause: false,
        wrap: true,
        keyboard: true
    });
});

// ================================ HOME ================================
// SCROLL TO NEWEST PRODUCT
$(document).on('click', 'a[href^="#newestproduct"]', function(event)
{
    event.preventDefault();
    $('html, body').animate(
    {
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
});

// SCROLL TO MOST ORDERED
$(document).on('click', 'a[href^="#mostordered"]', function(event)
{
    event.preventDefault();
    $('html, body').animate(
    {
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
});

// SCROLL TO TESTIMONIAL
$(document).on('click', 'a[href^="#custtest"]', function(event)
{
    event.preventDefault();
    $('html, body').animate(
    {
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1000);
});

// SCROLL TO TOP
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

