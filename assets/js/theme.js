
(function($) {
    'use strict';

    //===== Main Menu
    function mainMenu() {
        
        // Variables

       var var_window = $(window),
        navContainer = $('.header-navigation'),
        navbarToggler = $('.navbar-toggler'),
        navMenu = $('.nav-menu'),
        navMenuLi = $('.nav-menu ul li ul li'),
        closeIcon = $('.navbar-close');

        // navbar toggler
        navbarToggler.on('click', function() {
            navbarToggler.toggleClass('active');
            navMenu.toggleClass('menu-on');
        });

        // close icon
        closeIcon.on('click', function() {
            navMenu.removeClass('menu-on');
            navbarToggler.removeClass('active');
        });

        // adds toggle button to li items that have children
        navMenu.find("li a").each(function() {
            if ($(this).children('.dd-trigger').length < 1) {
                if ($(this).next().length > 0) {
                    $(this).append('<span class="dd-trigger"><i class="far fa-angle-down"></i></span>')
                }
            }
        });

        // expands the dropdown menu on each click
        navMenu.find(".dd-trigger").on('click', function(e) {
            e.preventDefault();
            $(this).parent().parent().siblings().children('ul.sub-menu').slideUp();
            $(this).parent().next('ul.sub-menu').stop(!0, !0).slideToggle(350);
            $(this).toggleClass('sub-menu-open')
        });

        // check browser width in real-time
        function breakpointCheck() {
            var windowWidth = window.innerWidth;
            if (windowWidth <= 1199) {
                navContainer.addClass('breakpoint-on');
            }
            else {
               navContainer.removeClass('breakpoint-on');
            }
        }
        breakpointCheck();
        var_window.on('resize', function() {
            breakpointCheck();
        });
    };

    // Document Ready
    $(document).ready(function() {
        mainMenu();
    });

    // Nav Overlay On
    $(".navbar-toggler, .navbar-close,.nav-overlay").on('click', function (e) {
       $(".nav-overlay").toggleClass("active");
    });
   
    $(".nav-overlay").on('click', function (e) {
        $(".navbar-toggler").removeClass("active");
        $(".nav-menu").removeClass("menu-on");
    });

    //===== Preloader
    $(window).on('load', function(event) {
        $('.preloader').delay(500).fadeOut('500');
    })

    // Initialize counters on window load (Waypoints needs to be ready)
    $(window).on('load', function() {
        initCounters();
    });

    // Ensure Slick sliders are initialized on window load as a fallback
    $(window).on('load', function() {
        try {
            if ($('.hero-slider-one').length && !$('.hero-slider-one').hasClass('slick-initialized')) {
                $('.hero-slider-one').slick({
                    dots: false,
                    arrows: true,
                    infinite: true,
                    speed: 800,
                    fade: true,
                    autoplay: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    prevArrow: '<div class="prev"><i class="fal fa-arrow-left"></i></div>',
                    nextArrow: '<div class="next"><i class="fal fa-arrow-right"></i></div>',
                    responsive: [{ breakpoint: 1200, settings: { arrows: false } }]
                });
                var $firstAnimatingElements = $('div.single-slider:first-child').find('[data-animation]');
                doAnimations($firstAnimatingElements);
            }
            if ($('.hero-slider-two').length && !$('.hero-slider-two').hasClass('slick-initialized')) {
                $('.hero-slider-two').slick({ dots: false, arrows: true, infinite: true, speed: 800, fade: true, autoplay: true, slidesToShow: 1, slidesToScroll: 1 });
            }
        } catch (e) { console && console.error && console.error('Slick init fallback error', e); }
    });
    
    //===== Sticky
    $(window).on('scroll', function(event) {
        var scroll = $(window).scrollTop();
        if (scroll < 100){
            $(".header-navigation").removeClass("sticky");
        } else {
            $(".header-navigation").addClass("sticky");
        }
    });

    //===== Back to top
    $(window).on('scroll', function(event) {
        if ($(this).scrollTop() > 600) {
            $('.back-to-top').fadeIn(200)
        } else {
            $('.back-to-top').fadeOut(200)
        }
    });

    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
    
    //===== Counter js
    //===== Counter js (initialize on window load to ensure Waypoints is ready)
    function initCounters() {
        if ($('.count').length){
            $('.count').counterUp({
                delay: 100,
                time: 4000
            });
        }
    }

    $(document).ready(function(){
    //===== Magnific-popup js
    if ($('.video-popup').length){
        $('.video-popup').magnificPopup({
            type: 'iframe',
            removalDelay: 300,
            mainClass: 'mfp-fade'
        });
    }

    if ($('.img-popup').length){
        $(".img-popup").magnificPopup({
            type: "image",
            gallery: { enabled: true }
        });
    }
    
    //===== Nice select js
    if ($('select').length){
        $('select').niceSelect();
    }
    
    //===== Slick slider js
    $('.hero-slider-one, .hero-slider-two').on('init', function(e, slick) {
        var $firstAnimatingElements = $('div.single-slider:first-child').find('[data-animation]');
        doAnimations($firstAnimatingElements);    
    });
   
    $('.hero-slider-one, .hero-slider-two').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
        var $animatingElements = $('div.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
        doAnimations($animatingElements);    
    });
    function doAnimations(elements) {
        var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        if (!elements || !elements.length) return;
        elements.each(function() {
            var $this = $(this);
            var anim = $this.data('animation');
            if (!anim) return; // nothing to animate
            var delay = $this.data('delay') || '0s';
            // ensure delay has time unit (allow values like '.4s' or '400ms')
            if (typeof delay === 'number') delay = delay + 's';
            var animationClass = 'animated ' + anim;
            $this.css({ 'animation-delay': delay, '-webkit-animation-delay': delay });
            $this.addClass(animationClass).one(animationEndEvents, function() { $this.removeClass(animationClass); });
        });
    }
    if ($('.hero-slider-one').length){
        $('.hero-slider-one').slick({
            dots: false,
            arrows: true,
            infinite: true,
            speed: 800,
            fade: true,
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: '<div class="prev"><i class="fal fa-arrow-left"></i></div>',
            nextArrow: '<div class="next"><i class="fal fa-arrow-right"></i></div>',
            responsive: [{ breakpoint: 1200, settings: { arrows: false } }]
        });
        // Ensure animations run for first slide in case 'init' didn't fire
        try {
            var $firstAnimatingElements = $('div.single-slider:first-child').find('[data-animation]');
            doAnimations($firstAnimatingElements);
        } catch (e) { console && console.error && console.error(e); }
    }
    if ($('.hero-slider-two').length) {
        $('.hero-slider-two').slick({ dots: false, arrows: true, infinite: true, speed: 800, fade: true, autoplay: true, slidesToShow: 1, slidesToScroll: 1 });
    }
    if ($('.slider-active-3-item').length) {
        $('.slider-active-3-item').slick({ dots: false, arrows: false, infinite: true, speed: 800, autoplay: true, slidesToShow: 3, slidesToScroll: 1, responsive: [{ breakpoint: 1200, settings: { slidesToShow: 2 } }, { breakpoint: 991, settings: { slidesToShow: 2 } }, { breakpoint: 800, settings: { slidesToShow: 1 } }] });
    }
    if ($('.slider-active-3-item-dot').length) {
        $('.slider-active-3-item-dot').slick({ dots: true, arrows: false, infinite: true, speed: 800, autoplay: true, slidesToShow: 3, slidesToScroll: 1, responsive: [{ breakpoint: 1200, settings: { slidesToShow: 2 } }, { breakpoint: 991, settings: { slidesToShow: 2 } }, { breakpoint: 800, settings: { slidesToShow: 1 } }] });
    }
    if ($('.slider-active-4-item').length) {
        $('.slider-active-4-item').slick({ dots: false, arrows: false, infinite: true, speed: 800, autoplay: true, slidesToShow: 4, slidesToScroll: 1, responsive: [{ breakpoint: 1400, settings: { slidesToShow: 3 } }, { breakpoint: 1200, settings: { slidesToShow: 2 } }, { breakpoint: 991, settings: { slidesToShow: 2 } }, { breakpoint: 800, settings: { slidesToShow: 1 } }] });
    }
    if ($('.slider-active-5-item').length) {
        $('.slider-active-5-item').slick({ dots: false, arrows: false, infinite: true, speed: 800, autoplay: true, slidesToShow: 5, slidesToScroll: 1, responsive: [{ breakpoint: 1400, settings: { slidesToShow: 4 } }, { breakpoint: 1199, settings: { slidesToShow: 3 } }, { breakpoint: 991, settings: { slidesToShow: 2 } }, { breakpoint: 575, settings: { slidesToShow: 1 } }] });
    }
    if ($('.place-slider').length) {
        $('.place-slider').slick({ dots: false, arrows: false, infinite: true, speed: 800, autoplay: true, variableWidth: true, slidesToShow: 3, slidesToScroll: 1, responsive: [{ breakpoint: 767, settings: { slidesToShow: 1 } }] });
    }
    if ($('.testimonial-slider-one').length) {
        $('.testimonial-slider-one').slick({ dots: false, arrows: false, infinite: true, speed: 800, autoplay: true, slidesToShow: 1, slidesToScroll: 1 });
    }

    //===== Wow js
    try { if (typeof WOW !== 'undefined') new WOW().init(); } catch(e) { console && console.warn && console.warn('WOW init failed', e); }
    });

    //======= Price Quantity
    $('.quantity-down').on('click', function(){ var numProduct = Number($(this).next().val()); if(numProduct > 1) $(this).next().val(numProduct -1); });
    $('.quantity-up').on('click', function(){ var numProduct = Number($(this).prev().val()); $(this).prev().val(numProduct + 1); });

    //======= Price ranger
    if ($('#slider-range').length) {
        $( "#slider-range" ).slider({ range: true, min: 0, max: 15000, values: [ 5, 10562 ], slide: function( event, ui ) { $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] ); } });
        $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );
    }

    //======= Date Picker
if ($('.datepicker').length) {
    var checkIn = $(".datepicker").eq(0);
    var checkOut = $(".datepicker").eq(1);

    checkIn.datepicker({
        dateFormat: "mm/dd/yy",
        minDate: 0,
        onSelect: function(selectedDate) {
            var minDate = $(this).datepicker('getDate');
            minDate.setDate(minDate.getDate() + 1);
            checkOut.datepicker("option", "minDate", minDate);
        }
    });

    checkOut.datepicker({
        dateFormat: "mm/dd/yy",
        minDate: 1
    });
}

    //======= Calendar Js
    if ($('.calendar-container').length) {
        $('.calendar-container').calendar({ date:new Date(), showTodayButton:false, weekDayLength: 2, prevButton:"<i class='far fa-angle-left'></i>", nextButton:"<i class='far fa-angle-right'></i>" });
    }
    $(document).ready(function () {
    $('.slider-active-5-item').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        dots: false,
        infinite: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: { slidesToShow: 4 }
            },
            {
                breakpoint: 992,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 576,
                settings: { slidesToShow: 1 }
            }
        ]
    });

    $('.img-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });
});


    
})(window.jQuery);
