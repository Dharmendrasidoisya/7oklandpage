$(document).ready(function() {

    // Realock Slider Section

    $('.realock_slider').slick({
        infinite: true,
        arrows: false,
        dots: true,
        autoplay: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        autoplayspeed: 6000,
        speed: 300,
        fade: true,
        cssEase: 'ease-in-out',
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    // Image Gallery Section

    $('.image_slider').slick({
        infinite: true,
        arrows: true,
        dots: false,
        autoplay: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        autoplayspeed: 1000,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    // Property Listing Section

    $('#property-listings').slick({
        infinite: true,
        arrows: false,
        dots: false,
        autoplay: true,
        autoplayspeed: 2000,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        ]
    });

    // Testimonial Section

    $('.testimonial_inner_section').slick({
        infinite: true,
        arrows: true,
        dots: false,
        autoplay: true,
        autoplayspeed: 2000,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        },
        ]
    });

    // Agent Section

    $('#agent-listings').slick({
        infinite: true,
        arrows: false,
        dots: false,
        autoplay: false,
        autoplayspeed: 2000,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
        ]
    });

    // Stickey Header

    $(window).scroll(function(){

        if ($(window).scrollTop()) {

            $('.site_header').addClass('fixed-header');
        }
        else {
            $('.site_header').removeClass('fixed-header');
        }

        var header_height = jQuery('#realock_slider_section').height();
        if ($(window).scrollTop() > header_height) {

            $('.home .site_header').addClass('fixed-header');
        }
        else {
            $('.home .site_header').removeClass('fixed-header');
        }
    });

    // Mobile Sidebar

    $(document).on("click", function(event){
        if($(event.target).closest(".fa-plus").length){
            $(".mobile_sub_menu").addClass('show_sub_menu');
            $('.fa-minus').addClass('show_close_icon');
            $('.fa-plus').addClass('hide_open_icon');
        } else if(!$(event.target).closest(".mobile_sub_menu").length){
            $(".mobile_sub_menu").removeClass('show_sub_menu');
            $('.fa-minus').removeClass('show_close_icon');
            $('.fa-plus').removeClass('hide_open_icon');
        }
    });

    $(".offcanvas-body .nav-item .nav-link").click(function(){
        $(".offcanvas").removeClass("show");
        $(".offcanvas-backdrop").remove();
    });

    $(".sidebar_icon .fa-list").click(function(){
        $(".offcanvas.offcanvas-end").addClass("show");
    });

    // Dynamically add active class

    jQuery(function($) {
        var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
        $(".current > li > a").each(function(){
            if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
                $(this).addClass("active");
            // $(this).parent("li").addClass("active");
        });
    });

    

});