var THEMETAGS = THEMETAGS || {};

(function($) {

    /*!----------------------------------------------
    	# This beautiful code written with heart
    	# by Mominul Islam <hello@mominul.me>
    	# In Dhaka, BD at the ThemeTags workstation.
    	---------------------------------------------*/

    // USE STRICT
    "use strict";

    window.TT = {
        init: function() {
            // Header
            this.header = $('.site-header');
            this.body = $('body');

            this.headerFixed = {
                initialOffset: parseInt(this.header.attr('data-fixed-initial-offset')) || 100,

                enabled: $('[data-header-fixed]').length,
                value: false,

                mobileEnabled: $('[data-mobile-header-fixed]').length,
                mobileValue: false
            };

            // Menus
            this.megaMenu = this.header.find('#mega-menu-wrap');
            this.mobileMenu = $('[data-mobile-menu-resolution]').data('mobile-menu-resolution');

            this.resize();
        },

        resize: function() {
            this.isDesktop = $(window).width() >= 991;
            this.isMobile = $(window).width() <= 991;
            this.isPad = $(window).width() <= 1024;
            this.isMobileMenu = $(window).width() <= TT.mobileMenu
        }
    };


    THEMETAGS.initialize = {

        init: function() {
            THEMETAGS.initialize.general();
            THEMETAGS.initialize.responsiveMenu();
            THEMETAGS.initialize.sectionBackground();
            THEMETAGS.initialize.swiperSlider();
            THEMETAGS.initialize.sectionSwitch();
            THEMETAGS.initialize.portfolio();
            THEMETAGS.initialize.tab();
            THEMETAGS.initialize.countUp();
            THEMETAGS.initialize.googleMap();
        },

        /*========================================================*/
        /*=           Collection of snippet and tweaks           =*/
        /*========================================================*/

        general: function() {
            // Mouse Move Parallax Element
            var $scene = $('.parallax-element').parallax({
                scalarX: 100,
                scalarY: 100,
            });


            // Pricing Switcher
            $('#js-contcheckbox').change(function() {
                if (this.checked) {
                    $('.monthly-price').css('display', 'none');
                    $('.yearly-price').css('display', 'block');
                    $('.form-switch').addClass('yearly');
                    $('.form-switch').removeClass('monthly');
                } else {
                    $('.monthly-price').css('display', 'block');
                    $('.yearly-price').css('display', 'none');
                    $('.form-switch').removeClass('yearly');
                    $('.form-switch').addClass('monthly');
                }
            });

            $('.popup-modal').each(function() {
                $('.popup-modal').magnificPopup({
                    type: 'image',
                    mainClass: 'mfp-with-zoom',
                    gallery: {
                        enabled: true
                    }

                });
            });


            var $body = $('body');
            var $popup = $('.canvas-menu-wrapper');

            $("#page-open-main-menu").on('click', function(e) {
                e.preventDefault();
                var mask = '<div class="mask-overlay">';
                $(mask).hide().appendTo('body').fadeIn('fast');
                $popup.addClass('open');
                $(".tt-hamburger").addClass('active');
                $body.addClass('page-popup-open');
                $("html").addClass("no-scroll sidebar-open").height(window.innerHeight + "px");
            });

            $("#page-close-main-menu, .mask-overlay").on('click', function(e) {
                e.preventDefault();
                $('.mask-overlay').remove();
                $body.removeClass('page-popup-open');
                $popup.removeClass('open');
                $('.sub-menu, .sub-menu-wide').removeAttr('style');
                $("html").removeClass("no-scroll sidebar-open").height("auto");
                $(".tt-hamburger").removeClass('active');
                $('.sub-menu, .sub-menu-wide').removeAttr('style');
                $('.has-submenu .menu-link').removeClass('active');
            });

            /*  Active Menu */
            $('.menu li > a').each(function() {
                if ($(this).attr('href') == location.href.split("/").slice(-1)) {
                    $(this).addClass('current_page');
                }
            });
        },

        /*======================================*/
        /*=           Responsive Menu          =*/
        /*======================================*/

        responsiveMenu: function() {
            var mobW = $(".site-header").attr("data-mobile-menu-resolution");

            if (window.outerWidth < mobW || $(".site-header").hasClass(".mobile-header")) {
                if (!$(".site-header .has-submenu i").length) {
                    $(".site-header .has-submenu").append('<i class="feather-plus"></i>');
                    $(".site-header .has-submenu i").addClass("hide-drop");
                }

                $(".site-header .has-submenu i").on("click", function() {
                    if (!$(this).hasClass("animation")) {
                        $(this).parent().toggleClass("is-open");
                        $(this).addClass("animation");
                        $(this).parent().siblings().removeClass("is-open").find(".feather-plus").removeClass("hide-drop").prev(".sub-menu").slideUp(200);
                        if ($(this).hasClass("hide-drop")) {
                            if ($(this).closest(".sub-menu").length) {
                                $(this).removeClass("hide-drop").prev(".sub-menu").slideToggle(200);
                            } else {
                                $(".site-header .has-submenu i").addClass("hide-drop").next(".sub-menu").hide(200);
                                $(this).removeClass("hide-drop").prev(".sub-menu").slideToggle(200)
                            }
                        } else {
                            $(this).addClass("hide-drop").prev(".sub-menu").hide(100).find(".site-header .has-submenu a").addClass("hide-drop").prev(".sub-menu").hide(200)
                        }
                    }

                    setTimeout(removeClass, 250);

                    function removeClass() {
                        $(".site-header .has-submenu i").removeClass("animation")
                    }

                })
            } else {
                $(".site-header .has-submenu i").remove()
            }
        },

        /*===========================================*/
        /*=           Handle Mobile Header          =*/
        /*===========================================*/

        handleMobileHeader: function() {
            if (TT.header && TT.header.length) {

                if (TT.isMobileMenu) {
                    TT.header.addClass('mobile-header');
                    TT.body.addClass('is-mobile-menu');
                    setTimeout(function() {
                        $('.main-nav').addClass('unhidden');
                    }, 300);
                } else {
                    TT.header.removeClass('mobile-header');
                    TT.body.removeClass('is-mobile-menu');
                    $('.main-nav').addClass('visible');
                }
            }
        },

        /*==========================================*/
        /*=           handle Fixed Header          =*/
        /*==========================================*/

        handleFixedHeader: function() {
            var fixed = TT.headerFixed;

            if ($(document).scrollTop() > fixed.initialOffset) {

                if ((!TT.isMobileMenu && fixed.enabled && !fixed.value) ||
                    (TT.isMobileMenu && fixed.mobileEnabled && !fixed.mobileValue)) {

                    if (TT.isMobileMenu) {
                        fixed.mobileValue = true;
                    } else {
                        fixed.value = true;
                    }

                    TT.header.addClass('header-fixed no-transition');

                }

            } else if (fixed.value || fixed.mobileValue) {

                fixed.value = false;
                fixed.mobileValue = false;

                TT.header.removeClass('header-fixed');

            }

            // Effect appearance
            if ($(document).scrollTop() > fixed.initialOffset + 50) {
                TT.header.removeClass('no-transition').addClass('showed');
            } else {
                TT.header.removeClass('showed').addClass('no-transition');
            }
        },

        /*==========================================*/
        /*=           Section Background           =*/
        /*==========================================*/

        sectionBackground: function() {

            // Section Background Image
            $('[data-bg-image]').each(function() {
                var img = $(this).data('bg-image');
                $(this).css({
                    backgroundImage: 'url(' + img + ')',
                });
            });

            //Parallax Background
            $('[data-parallax="image"]').each(function() {

                var actualHeight = $(this).position().top;
                var speed = $(this).data('parallax-speed');
                var reSize = actualHeight - $(window).scrollTop();
                var makeParallax = -(reSize / 2);
                var posValue = makeParallax + "px";

                $(this).css({
                    backgroundPosition: '50% ' + posValue,
                });
            });
        },

        /*===================================*/
        /*=           Swiper Slider         =*/
        /*===================================*/

        swiperSlider: function() {

            // Logo Carousel
            const swiper = new Swiper('.tt-client-logo', {
                // Default parameters
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
                speed: 700,
                autoplay: {
                    delay: 3000
                },
                // Responsive breakpoints
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    // when window width is >= 480px
                    576: {
                        slidesPerView: 4,
                        spaceBetween: 40
                    },
                    // when window width is >= 640px
                    992: {
                        slidesPerView: 5,
                        spaceBetween: 60
                    },

                    1200: {
                        slidesPerView: 6,
                        spaceBetween: 60
                    }
                }
            });

            const logoTwo = new Swiper('.tt-client-logo-two', {
                // Default parameters
                slidesPerView: 1,
                loop: true,
                speed: 700,
                autoplay: {
                    delay: 3000
                },
                // Responsive breakpoints
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 40
                    },
                    // when window width is >= 480px
                    420: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    // when window width is >= 640px
                    767: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    },

                    991: {
                        slidesPerView: 4,
                        spaceBetween: 40
                    },
                }
            });

            // Testimonial Single
            const TestimonialSingle = new Swiper('.tt-testimonial', {
                // Default parameters
                slidesPerView: 1,
                spaceBetween: 10,
                loop: true,
                speed: 700,
                autoplay: {
                    delay: 5000
                },
                effect: "fade",
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: ".testimonial-pagination",
                    clickable: true,
                },

            });

            // Testimonial Three Item Show
            const Testimonial = new Swiper('.tt-testimonial-two', {
                // Default parameters
                slidesPerView: 3,
                spaceBetween: 10,
                loop: true,
                speed: 700,
                autoplay: {
                    delay: 5000
                },
                pagination: {
                    el: ".testimonial-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: '.testi-next',
                    prevEl: '.testi-prev',
                },
                // Responsive breakpoints
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 30
                    },
                    // when window width is >= 480px
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    // when window width is >= 640px
                    991: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                }

            })

            // Screenshot Slider
            const screenshot = new Swiper('.tt-screenshots', {
                // Default parameters
                slidesPerView: 3,
                spaceBetween: 10,
                loop: true,
                speed: 700,
                autoplay: {
                    delay: 5000
                },
                pagination: {
                    el: ".screenshot-pagination",
                    clickable: true,
                },
                // Responsive breakpoints
                breakpoints: {
                    // when window width is >= 320px
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 30
                    },
                    // when window width is >= 767px
                    360: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    // when window width is >= 767px
                    767: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    // when window width is >= 640px
                    991: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    },
                }

            })

        },

        /*================================*/
        /*=           Portfolio          =*/
        /*================================*/

        portfolio: function() {
            if ((typeof $.fn.imagesLoaded !== 'undefined') && (typeof $.fn.isotope !== 'undefined')) {

                $(".tt-portfolio").imagesLoaded(function() {

                    var container = $(".tt-portfolio");

                    container.isotope({
                        itemSelector: '.tt-portfolio__item',
                        percentPosition: true,
                        transitionDuration: '0.5s',
                        masonry: {
                            columnWidth: '.grid-sizer',
                            layoutMode: 'masonry',
                        }
                    });

                    $('.tt-portfolio__filter li a').on('click', function() {
                        $('.tt-portfolio__filter').find('.current').removeClass('current');
                        $(this).parent().addClass('current');

                        var selector = $(this).attr("data-filter");
                        $(".tt-portfolio").isotope({
                            filter: selector
                        });

                        return false;
                    });

                    if ($('.tt-portfolio__filter').length > 0) {
                        $('.tt-portfolio__filter').append('<li class="indicator"></li>');
                        if ($('.tt-portfolio__filter li a').hasClass('isActive')) {
                            var cLeft = $('.tt-portfolio__filter li a.isActive').position().left + 'px',
                                cWidth = $('.tt-portfolio__filter li a.isActive').css('width');
                            $('.indicator').css({
                                left: cLeft,
                                width: cWidth
                            })
                        }
                        $('.tt-portfolio__filter li a').on('click', function() {
                            $('.tt-portfolio__filter li a').removeClass('isActive');
                            $(this).addClass('isActive');
                            var cLeft = $('.tt-portfolio__filter li a.isActive').position().left + 'px',
                                cWidth = $('.tt-portfolio__filter li a.isActive').css('width');
                            $('.indicator').css({
                                left: cLeft,
                                width: cWidth
                            })
                        });
                    }

                    $(window).resize(function() {
                        container.isotope();
                    });
                });
            }
        },

        /*===========================*/
        /*=           Tabs          =*/
        /*===========================*/

        tab: function() {

            //Tab One
            $('#ultraland-tabs-nav li:nth-child(1)').addClass('active');
            $('#ultraland-tabs-content .content').hide();
            $('#ultraland-tabs-content .content:nth-child(1)').show();

            // Tab Click function
            $('#ultraland-tabs-nav li').on('click', function() {
                $('#ultraland-tabs-nav li').removeClass('active');
                $(this).addClass('active');
                $('#ultraland-tabs-content .content').hide();

                var activeTab = $(this).find('a').attr('href');
                $(activeTab).fadeIn(600);
                return false;
            });

            // Tab Two
            $(".feature-tab-nav__item .feature-tab-nav__title").on("click", function() {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                    $(this)
                        .siblings(".feature-tab-nav__item .feature-tab-nav__description")
                        .slideUp(400);
                    $(".tab-nav-item > .acc-btn i")
                        .removeClass("fa-minus")
                        .addClass("fa-plus");
                } else {
                    $(".tab-nav-item > .acc-btn i")
                        .removeClass("fa-minus")
                        .addClass("fa-plus");
                    $(this)
                        .find("i")
                        .removeClass("fa-plus")
                        .addClass("fa-minus");
                    $(".feature-tab-nav__item .feature-tab-nav__title").removeClass("active");
                    $(this).addClass("active");
                    $(".feature-tab-nav__item .feature-tab-nav__description").slideUp(200);
                    $(this)
                        .siblings(".feature-tab-nav__item .feature-tab-nav__description")
                        .slideDown(200);
                }
            });

            $('.tt-tabs-navigation .tab-nav-item').on('click', function(event) {
                event.preventDefault();
                var selectedItem = $(this);
                if (!selectedItem.hasClass('active-tab')) {
                    var selectedTab = selectedItem.data('content'),
                        selectedContent = $('.tt-tabs-content').find('.tt-tab-item[data-content="' + selectedTab + '"]'),
                        slectedContentHeight = selectedContent.innerHeight();

                    $('.tt-tabs-navigation .tab-nav-item').removeClass('active-tab');
                    selectedItem.addClass('active-tab');
                    selectedContent.addClass('active-tab').siblings('.tt-tab-item').removeClass('active-tab');
                }
            });
        },

        /*=========================================*/
        /*=           Section Background          =*/
        /*=========================================*/

        sectionSwitch: function() {
            $('[data-type="section-switch"], #menu-home li a, #banner-particales a, #banner-creative a, #banner-ripple a').on('click', function() {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    if (target.length > 0) {

                        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                        $('html,body').animate({
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        },

        /*==============================*/
        /*=           Countup          =*/
        /*==============================*/

        countUp: function() {
            var options = {
                useEasing: true,
                useGrouping: true,
                separator: ',',
                decimal: '.',
                prefix: '',
                suffix: ''
            };

            var counteEl = $('[data-counter]');

            if (counteEl) {
                counteEl.each(function() {
                    var val = $(this).data('counter');

                    var countup = new CountUp(this, 0, val, 0, 2.5, options);
                    $(this).appear(function() {
                        countup.start();
                    }, {
                        accX: 0,
                        accY: 0
                    })
                });
            }
        },

        /*=================================*/
        /*=           Google Map          =*/
        /*=================================*/

        googleMap: function() {
            $('.gmap3-area').each(function() {
                var $this = $(this),
                    key = $this.data('key'),
                    lat = $this.data('lat'),
                    lng = $this.data('lng'),
                    mrkr = $this.data('mrkr');

                $this.gmap3({
                        center: [lat, lng],
                        zoom: 8,
                        scrollwheel: false,
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        styles: [{
                            "featureType": "administrative.country",
                            "elementType": "geometry.fill",
                            "stylers": [{
                                "visibility": "on"
                            }]
                        }]
                    })
                    .marker(function(map) {
                        return {
                            position: map.getCenter(),
                            icon: mrkr
                        };
                    })

            });
        },

    };

    THEMETAGS.documentOnReady = {
        init: function() {
            THEMETAGS.initialize.init();
        },
    };

    THEMETAGS.documentOnLoad = {
        init: function() {
            $(".page-loader").fadeOut("slow");
            THEMETAGS.initialize.handleMobileHeader();
        },
    };

    THEMETAGS.documentOnResize = {
        init: function() {
            TT.resize();
            THEMETAGS.initialize.handleMobileHeader();
            THEMETAGS.initialize.handleFixedHeader();
            THEMETAGS.initialize.responsiveMenu();
        },
    };

    THEMETAGS.documentOnScroll = {
        init: function() {
            THEMETAGS.initialize.sectionBackground();
            THEMETAGS.initialize.handleFixedHeader();

            if ($(window).scrollTop() > 300) {
                $('.return-to-top').addClass('back-top');
            } else {
                $('.return-to-top').removeClass('back-top');
            }
        },
    };

    TT.init();
    // Initialize Functions
    $(document).ready(THEMETAGS.documentOnReady.init);
    $(window).on('load', THEMETAGS.documentOnLoad.init);
    $(window).on('resize', THEMETAGS.documentOnResize.init);
    $(window).on('scroll', THEMETAGS.documentOnScroll.init);

})(jQuery);