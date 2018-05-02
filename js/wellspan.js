$(document).ready(function(){

    // back to top smooth scrolling (KENDRA NOTE: WILL NEED TO BE UPDATED)
    function scrollTop(width) {
        if (width <= 753) {
            $('a[href^="#"]').on('click', function(e) {
                e.preventDefault();

                var target = this.hash;
                var $target = $(target);

                $('html, body').stop().animate({
                    'scrollTop': -30 + $target.offset().top
                }, 900, 'swing', function() {});
            });
        } else {
            $('a[href^="#"]').on('click', function(e) {
                e.preventDefault();

                var target = this.hash;
                var $target = $(target);

                $('html, body').stop().animate({
                    'scrollTop': -270 + $target.offset().top
                }, 900, 'swing', function() {});
            });
        }
    }
    scrollTop($(window).width());
    $(window).on('resize', function() {
        scrollTop($(this).width());
    });

    // hide the mobile header (KENDRA NOTE: REVIEW IF NEEDED)
    function hideMobileHeader(width){
        if ( width <= 753) {
            // Hide Header on on scroll down
            var didScroll;
            var lastScrollTop = 0;
            var delta = 5;
            var navbarHeight = $('header').outerHeight();

            $(window).scroll(function(event){
                didScroll = true;
            });

            setInterval(function() {
                if (didScroll) {
                    hasScrolled();
                    didScroll = false;
                }
            }, 250);

            function hasScrolled() {
                var st = $(this).scrollTop();

                // Make sure they scroll more than delta
                if(Math.abs(lastScrollTop - st) <= delta)
                    return;

                // If they scrolled down and are past the navbar, add class .nav-up.
                // This is necessary so you never see what is "behind" the navbar.
                if (st > lastScrollTop && st > navbarHeight){
                    // Scroll Down
                    $('header').removeClass('nav-down').addClass('nav-up');
                } else {
                    // Scroll Up
                    if(st + $(window).height() < $(document).height()) {
                        $('header').removeClass('nav-up').addClass('nav-down');
                    }
                }

                lastScrollTop = st;
            }
        }
        else {

        }
    }
    hideMobileHeader( $(window).width() );
        $(window).on('resize', function(){
            hideMobileHeader( $(this).width() );
    });

    // toggle the search bar
    $('.header-right nav ul li:last-of-type a').on('click', function(e) {
        e.preventDefault();
        $('form.search').toggleClass('open');
    });

    // move the top nav to mobile nav
    function moveToMobileNav(width) {
        if (width <= 785) {
            $('.header-right nav').prependTo('.mobile-menu .container');
        } else {
            $('.mobile-menu nav').prependTo('.header-right');
        }
    }
    moveToMobileNav($(window).width());
    $(window).on('resize', function() {
        moveToMobileNav($(this).width());
    });

    // keep the search bar in the mobile header
    function mobileSearch(width) {
        if (width <= 785) {
            $('.mobile-menu nav ul li:nth-of-type(3)').insertBefore('.hamburger .hamburger-icon');
        } else {
            $('.hamburger ul li:not(.hamburger-icon)').appendTo('.header-right nav > ul');
        }
    }
    mobileSearch($(window).width());
    $(window).on('resize', function() {
        mobileSearch($(this).width());
    });

    // move the Community Benefit Report button to the mobile nav
    function moveCbrBtn(width) {
        if (width <= 785) {
            $('.filter-bar .container .gold').appendTo('.mobile-menu .container');
        } else {
            $('.mobile-menu .container .gold').insertAfter('.filter-bar form');
        }
    }
    moveCbrBtn($(window).width());
    $(window).on('resize', function() {
        moveCbrBtn($(this).width());
    });

    // open the mobile menu
    $('.hamburger li:last-of-type a').on('click', function(e) {
        e.preventDefault();
        $('.mobile-menu').addClass('show');
    })

    // close the mobile menu
    $('.mobile-menu .close').on('click', function(e) {
        e.preventDefault();
        $('.mobile-menu').removeClass('show');
    })

    // remove the text in the Community Benefit Report button
    function removeCbrBtnTxt(width) {
        if ((width <= 1165) && (width >= 785)) {
            $('.filter-bar .container .gold').html('<img src="img/download.png" alt="Download" />');
        } else {
            $('.filter-bar .container .gold').html('<img src="img/download.png" alt="Download" />2017 Community Benefit Report');
            $('.mobile-menu .container .gold').html('<img src="img/download.png" alt="Download" />2017 Community Benefit Report');
        }
    }
    removeCbrBtnTxt($(window).width());
    $(window).on('resize', function() {
        removeCbrBtnTxt($(this).width());
    });


    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ FILTERING ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // add or remove the checked attribute on checkbox inputs (filter bar)
    $('.filter-bar form li input').click(function(){
        if ($(this).is(':checked')) {
            $('.filter-bar form li input').removeAttr('checked', 'checked');
            $(this).attr('checked', 'checked');
        }
    });

    // if 'All' is selected, show a message, else show the selected county's Community Focus filters
    $('.filter-bar form li input').click(function(){
        if ($('.filter-bar form li:first-of-type input').is(':checked')) {
            $('.filter-expanded .col:first-of-type .checkboxes').css('display', 'none');
            $('.filter-expanded .col:first-of-type .more-less').css('display', 'none');
            $('.filter-expanded .col:first-of-type p:last-of-type').css('display', 'block');
        } else {
            $('.filter-expanded .col:first-of-type .checkboxes').css('display', 'block');
            $('.filter-expanded .col:first-of-type .more-less').css('display', 'block');
            $('.filter-expanded .col:first-of-type p:last-of-type').css('display', 'none');
        }
    });

    // if 'All' is clicked, show the message and hide the filters
    $('.filter-bar form li:first-of-type input').click(function(){
        $('.filter-expanded .col:first-of-type .checkboxes').css('display', 'none');
        $('.filter-expanded .col:first-of-type .more-less').css('display', 'none');
        $('.filter-expanded .col:first-of-type p:last-of-type').css('display', 'block');
    });

    // add or remove the checked attribute on checkbox inputs (expanded filter)
    $('.filter-expanded form input[type="checkbox"]').click(function(){
        if ($(this).is(':checked')) {
            $(this).attr('checked', 'checked');
        } else {
            $(this).removeAttr('checked', 'checked');
        }
    });

    // when 'Filter' is clicked, show or hide the expanded filter
    $('.filter-bar form li:last-of-type a').on('click', function(e) {
        e.preventDefault();
        $('.filter-expanded').toggleClass('hide show');
        if ($('.filter-expanded').hasClass('show')) {
            $('.filter-expanded .col label.show').css('visibility','visible');
        } else {
            $('.filter-expanded .col label.show').css('visibility','hidden');
        }
    });

    // when the reset button is clicked, remove the checked attribute from filters
    $('.filter-expanded input[type="reset"]').on('click', function(e) {
        $('.filter-expanded input[type="checkbox"]').removeAttr('checked', 'checked');
    });

    // show more/less filters (1st column)
    size_li = $(".filter-expanded .col:nth-of-type(1) label").size();
    x=5;
    $('.filter-expanded .col:nth-of-type(1) label:lt('+x+')').addClass('show');
    $('.filter-expanded .col:nth-of-type(1) .more-less').click(function (e) {

        if ($('.filter-expanded .col:nth-of-type(1) .more-less').hasClass('arrow-down')) {
            e.preventDefault();
            x= (x+5 <= size_li) ? x+5 : size_li;
            $('.filter-expanded .col:nth-of-type(1) label:lt('+x+')').addClass('show').removeClass('hide');
            if(x == size_li){
                $('.filter-expanded .col:nth-of-type(1) .more-less').text('Show Less');
                $('.filter-expanded .col:nth-of-type(1) .more-less').addClass('arrow-up').removeClass('arrow-down');
            }
        } else {
            e.preventDefault();
            x=(x-500<0) ? 5 : x-500;
            $('.filter-expanded .col:nth-of-type(1) label').not(':lt('+x+')').addClass('hide').removeClass('show');
            if(x <= 5){
                $('.filter-expanded .col:nth-of-type(1) .more-less').text('Show More');
                $('.filter-expanded .col:nth-of-type(1) .more-less').addClass('arrow-down').removeClass('arrow-up');
            }
        }

    });

    // show more/less filters (2nd column)
    size_li2 = $(".filter-expanded .col:nth-of-type(2) label").size();
    y=15;
    $('.filter-expanded .col:nth-of-type(2) label:lt('+y+')').addClass('show');
    $('.filter-expanded .col:nth-of-type(2) .more-less').click(function (e) {

        if ($('.filter-expanded .col:nth-of-type(2) .more-less').hasClass('arrow-down')) {
            e.preventDefault();
            y= (y+15 <= size_li2) ? y+15 : size_li2;
            $('.filter-expanded .col:nth-of-type(2) label:lt('+y+')').addClass('show').removeClass('hide');
            if(y == size_li2){
                $('.filter-expanded .col:nth-of-type(2) .more-less').text('Show Less');
                $('.filter-expanded .col:nth-of-type(2) .more-less').addClass('arrow-up').removeClass('arrow-down');
            }
        } else {
            e.preventDefault();
            y=(y-500<0) ? 15 : y-500;
            $('.filter-expanded .col:nth-of-type(2) label').not(':lt('+y+')').addClass('hide').removeClass('show');
            if(y <= 15){
                $('.filter-expanded .col:nth-of-type(2) .more-less').text('Show More');
                $('.filter-expanded .col:nth-of-type(2) .more-less').addClass('arrow-down').removeClass('arrow-up');
            }
        }

    });

    // show more/less filters (3rd column)
    size_li3 = $(".filter-expanded .col:nth-of-type(3) label").size();
    z=5;
    $('.filter-expanded .col:nth-of-type(3) label:lt('+z+')').addClass('show');
    $('.filter-expanded .col:nth-of-type(3) .more-less').click(function (e) {

        if ($('.filter-expanded .col:nth-of-type(3) .more-less').hasClass('arrow-down')) {
            e.preventDefault();
            z= (z+5 <= size_li3) ? z+5 : size_li3;
            $('.filter-expanded .col:nth-of-type(3) label:lt('+z+')').addClass('show').removeClass('hide');
            if(z == size_li3){
                $('.filter-expanded .col:nth-of-type(3) .more-less').text('Show Less');
                $('.filter-expanded .col:nth-of-type(3) .more-less').addClass('arrow-up').removeClass('arrow-down');
            }
        } else {
            e.preventDefault();
            z=(z-500<0) ? 5 : z-500;
            $('.filter-expanded .col:nth-of-type(3) label').not(':lt('+z+')').addClass('hide').removeClass('show');
            if(z <= 5){
                $('.filter-expanded .col:nth-of-type(3) .more-less').text('Show More');
                $('.filter-expanded .col:nth-of-type(3) .more-less').addClass('arrow-down').removeClass('arrow-up');
            }
        }

    });

    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END FILTERING ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */


    // scale and follow mouse effect for homepage stories
    $('.stories .story .story-img > img')
    .on('mouseover', function(){
      $(this).css({'transform': 'scale(1.1)'});
    })
    .on('mouseout', function(){
      $(this).css({'transform': 'scale(1)'});
    })
    .on('mousemove', function(e) {
        $(this).css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
    });

    // load more story modules
    size_li4 = $(".stories .story-module").size();
    m=4;
    $('.stories .story-module:lt('+m+')').addClass('show');
    $('.bottom-page-btn .load-more').click(function (e) {
        e.preventDefault();
        m= (m+4 <= size_li4) ? m+4 : size_li4;
        $('.stories .story-module:lt('+m+')').addClass('show').removeClass('hide');
        if(m == size_li4){
            $('.bottom-page-btn .load-more').hide();
            $('.bottom-page-btn .message').show();
        }
    });

    // social sharing (KENDRA NOTE: REVIEW IF NEEDED)
    $('.share-fb').click(function(e) {
        e.preventDefault();
        var contentPath = window.location;
        shareURL = 'https://www.facebook.com/sharer/sharer.php?m2w&s=100&p[url]='+contentPath;
        window.open(shareURL, '_blank', 'height=350,width=550');
    });
    $('.share-tw').click(function(e) {
        e.preventDefault();
        var contentPath = window.location;
        shareURL = 'http://twitter.com/share?url='+contentPath;
        window.open(shareURL, '_blank', 'height=350,width=550');
    });
    $('.share-li').click(function(e) {
        e.preventDefault();
        var contentPath = window.location;
        shareURL = 'https://www.linkedin.com/shareArticle?mini=true&url='+contentPath;
        window.open(shareURL, '_blank', 'height=350,width=550');
    });

});
