$(document).ready(function(){

    // back to top smooth scrolling
    function scrollTop(width) {
        if (width <= 785) {
            $('a[href^="#"]').on('click', function(e) {
                e.preventDefault();

                var target = this.hash;
                var $target = $(target);

                $('html, body').stop().animate({
                    'scrollTop': -90 + $target.offset().top
                }, 900, 'swing', function() {});
            });
        } else {
            $('a[href^="#"]').on('click', function(e) {
                e.preventDefault();

                var target = this.hash;
                var $target = $(target);

                $('html, body').stop().animate({
                    'scrollTop': -140 + $target.offset().top
                }, 900, 'swing', function() {});
            });
        }
    }
    scrollTop($(window).width());
    $(window).on('resize', function() {
        scrollTop($(this).width());
    });

    // hide the top part of the header on scroll, show when scrolled back up
    function hideMobileHeader(width){
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

            if(Math.abs(lastScrollTop - st) <= delta)
                return;

            if (st > lastScrollTop && st > navbarHeight){
                $('header').removeClass('nav-down').addClass('nav-up');
            } else {
                if(st + $(window).height() < $(document).height()) {
                    $('header').removeClass('nav-up').addClass('nav-down');
                }
            }

            lastScrollTop = st;
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
            $('.mobile-menu nav ul li.search-link').insertBefore('.hamburger .hamburger-icon');
        } else {
            $('.hamburger ul li.search-link').appendTo('.header-right nav > ul');
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
            $('.mobile-menu .container .gold').insertAfter('.filter-bar .container form');
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

    // toggle the second level nav
    $('.mobile-menu nav ul li img').on('click', function(e) {
        $('.mobile-menu nav ul li > ul').slideToggle();
    });

    // remove the text in the Community Benefit Report button
    function removeCbrBtnTxt(width) {
        if ((width <= 1165) && (width >= 785)) {
            $('.filter-bar .container .gold').html('<img src="img/download.png" alt="" />');
        } else {
            $('.filter-bar .container .gold').html('<img src="img/download.png" alt="" />2017 Community Benefit Report');
            $('.mobile-menu .container .gold').html('<img src="img/download.png" alt="" />2017 Community Benefit Report');
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

    if ($('.filter-bar form li:first-of-type input').is(':checked')) {
        $('.filter-expanded .col:first-of-type .checkboxes').css('display', 'none');
        $('.filter-expanded .col:first-of-type .more-less').css('display', 'none');
        $('.filter-expanded .col:first-of-type p:last-of-type').css('display', 'block');
    } else {
        $('.filter-expanded .col:first-of-type .checkboxes').css('display', 'block');
        $('.filter-expanded .col:first-of-type .more-less').css('display', 'block');
        $('.filter-expanded .col:first-of-type p:last-of-type').css('display', 'none');
    }

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

    // change 'Filter' to a filter icon on mobile
    function changeFilterIcon(width) {
        if (width <= 705) {
            if ($('.filter-expanded .col input[type="checkbox"]').is(':checked')) {
                $('.filter-bar form ul li:last-of-type a').html('<img src="img/filter-check.svg" alt="" />');
            } else {
                $('.filter-bar form ul li:last-of-type a').html('<img src="img/filter.svg" alt="" />');
            }
        } else {
            $('.filter-bar form ul li:last-of-type a').html('Filter <img src="img/white-arrow-down.png" alt="" />');
        }
    }
    changeFilterIcon($(window).width());
    $(window).on('resize', function() {
        changeFilterIcon($(this).width());
    });

    // change 'Filter' to a filter icon on mobile
    function changeFilterIcon2(width) {
        if (width >= 705) {
            if ($('.filter-expanded .col input[type="checkbox"]').is(':checked')) {
                $('.filter-bar form ul li:last-of-type a').html('Filter <img src="img/white-arrow-down.png" alt="" />');
            } else {
                $('.filter-bar form ul li:last-of-type a').html('Filter <img src="img/white-arrow-down.png" alt="" />');
            }
        }
    }
    changeFilterIcon2($(window).width());
    $(window).on('click', function() {
        changeFilterIcon2($(this).width());
    });

    // when the reset button is clicked, remove the checked attribute from filters
    $('.filter-expanded input[type="reset"]').on('click', function(e) {
        $('.filter-expanded input[type="checkbox"]').removeAttr('checked', 'checked');
        $('.filter-bar ul li input[type="radio"]').removeAttr('checked', 'checked');
        $('.filter-bar ul li:first-of-type input[type="radio"]').attr('checked', 'checked');
        $('.filter-expanded .col:first-of-type .checkboxes').css('display', 'none');
        $('.filter-expanded .col:first-of-type .more-less').css('display', 'none');
        $('.filter-expanded .col:first-of-type p:last-of-type').css('display', 'block');
    });

    function clearFilterIcon(width) {
        if (width <= 705) {
            $('.filter-expanded input[type="reset"]').on('click', function(e) {
                $('.filter-bar form ul li:last-of-type a').html('<img src="img/filter.svg" alt="" />');
            });
        } else {
            $('.filter-bar form ul li:last-of-type a').html('Filter <img src="img/white-arrow-down.png" alt="" />');
        }
    }
    clearFilterIcon($(window).width());
    $(window).on('resize', function() {
        clearFilterIcon($(this).width());
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
    function keyTopicsFilter(width) {
        if (width <= 785) {
            size_li2 = $(".filter-expanded .col:nth-of-type(2) label").size();
            y=5;
            $('.filter-expanded .col:nth-of-type(2) label:lt('+y+')').addClass('show');
            $('.filter-expanded .col:nth-of-type(2) label').slice(5).addClass('hide').removeClass('show');
            $('.filter-expanded .col:nth-of-type(2) .more-less').click(function (e) {

                if ($('.filter-expanded .col:nth-of-type(2) .more-less').hasClass('arrow-down')) {
                    e.preventDefault();
                    y= (y+5 <= size_li2) ? y+5 : size_li2;
                    $('.filter-expanded .col:nth-of-type(2) label:lt('+y+')').addClass('show').removeClass('hide');
                    if(y == size_li2){
                        $('.filter-expanded .col:nth-of-type(2) .more-less').text('Show Less');
                        $('.filter-expanded .col:nth-of-type(2) .more-less').addClass('arrow-up').removeClass('arrow-down');
                    }
                } else {
                    e.preventDefault();
                    y=(y-500<0) ? 5 : y-500;
                    $('.filter-expanded .col:nth-of-type(2) label').not(':lt('+y+')').addClass('hide').removeClass('show');
                    if(y <= 5){
                        $('.filter-expanded .col:nth-of-type(2) .more-less').text('Show More');
                        $('.filter-expanded .col:nth-of-type(2) .more-less').addClass('arrow-down').removeClass('arrow-up');
                    }
                }

            });
        } else {
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
        }
    }
    keyTopicsFilter($(window).width());
    $(window).on('resize', function() {
        keyTopicsFilter($(this).width());
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

    // if filters are selected in the expanded menu on mobile, add the checked filter icon, else show the icon without the check
    $('.filter-expanded .col input[type="checkbox"]').click(function(){
        if ($('.filter-expanded .col input[type="checkbox"]').is(':checked')) {
            $('.filter-bar form ul li:last-of-type a').html('<img src="img/filter-check.svg" alt="" />');
        } else {
            $('.filter-bar form ul li:last-of-type a').html('<img src="img/filter.svg" alt="" />');
        }
    });

    // if more than two lines are needed for the condensed filter, show the more filters tag
    var filtersCheckedCol1 = $('.filter-condensed .col:nth-of-type(1) .checkboxes label').length;
    var filtersCheckedCol2 = $('.filter-condensed .col:nth-of-type(2) .checkboxes label').length;
    var filtersCheckedCol3 = $('.filter-condensed .col:nth-of-type(3) .checkboxes label').length;

    if (filtersCheckedCol1 > 2 || filtersCheckedCol2 > 6 || filtersCheckedCol3 > 2) {
        $('.filter-condensed .more-filters-tag').show();
    } else {
        $('.filter-condensed .more-filters-tag').hide();
    }

    // if there are no filters selected in a category, show a message
    if(!$.trim($('.filter-condensed .col:nth-of-type(1) .checkboxes').html()).length) {
        $('.filter-condensed .col:nth-of-type(1) .checkboxes').html('<p>No filters selected</p>');
    }
    if(!$.trim($('.filter-condensed .col:nth-of-type(2) .checkboxes').html()).length) {
        $('.filter-condensed .col:nth-of-type(2) .checkboxes').html('<p>No filters selected</p>');
    }
    if(!$.trim($('.filter-condensed .col:nth-of-type(3) .checkboxes').html()).length) {
        $('.filter-condensed .col:nth-of-type(3) .checkboxes').html('<p>No filters selected</p>');
    }

    // show the expanded filter when hovering over the condensed filter
    $('.filter-condensed').hover(function(){
        $('.filter-expanded').addClass('show').removeClass('hide');
    },
    function(){
        $('.filter-expanded').hover(function(){
            $('.filter-expanded').addClass('show').removeClass('hide');
            $('.filter-expanded .col .checkboxes label').css('visibility','visible');
        },
        function(){
            $('.filter-expanded').addClass('hide').removeClass('show');
            $('.filter-expanded .col .checkboxes label').css('visibility','hidden');
        });
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

    // scale and follow mouse effect for other stories
    $('.other-stories .story-modules .story .story-img > img')
    .on('mouseover', function(){
        $(this).css({'transform': 'scale(1.1)'});
    })
    .on('mouseout', function(){
        $(this).css({'transform': 'scale(1)'});
    })
    .on('mousemove', function(e) {
        $(this).css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
    });

    // load more stories
    size_li4 = $(".stories .story").size();
    m=8;
    $('.stories .story:lt('+m+')').addClass('show');
    $('.bottom-page-btn .load-more').click(function (e) {
        e.preventDefault();
        m= (m+8 <= size_li4) ? m+8 : size_li4;
        $('.stories .story:lt('+m+')').addClass('show').removeClass('hide');
        $('.stories').isotope();
        if(m == size_li4){
            $('.bottom-page-btn .load-more').hide();
            $('.bottom-page-btn .message').show();
        }
    });

    // social sharing
    $('.share-gp').click(function(e) {
        e.preventDefault();
        var contentPath = window.location;
        shareURL = 'https://plus.google.com/share?url='+contentPath;
        window.open(shareURL, '_blank', 'height=350,width=550');
    });
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

    // open or close the related content blocks in the sidebar
    $(".sidebar .content-block .content-heading").on('click', function(e) {
        if ($(this).parent().children(".content-list").hasClass("open")) {
            $(this).parent().children(".content-list").addClass('closed').removeClass('open');
            $(this).addClass('arrow-down').removeClass('arrow-up');
        } else {
            $(this).parent().children(".content-list").addClass('open').removeClass('closed');
            $(this).addClass('arrow-up').removeClass('arrow-down');
        }
    });

    // when the 'Share this Story' button is clicked, hide the button and show the social icons
    $('.tags + .btn').on('click', function(e) {
        e.preventDefault();
        $('.tags + .btn').addClass('hide');
        $('.tags + .btn + .social').addClass('show');
    });

    // change the contact form input label color on focus
    $(".contact-module form :input").focus(function() {
        $("label[for='" + this.id + "']").addClass("label-focus");
    }).blur(function() {
        $("label").removeClass("label-focus");
    });

    // style the select dropdowns
    $('select').selectric();

    // change the selectric label color to gray when an option is selected
    $('select').on('change', function() {
        $('.selectric .label').css('color','#323232');
    });

    // if the selectric label is 'Select one', change the label color to gray
    $('select').on('change', function() {
        $('.selectric .label:contains("Choose specific topic from list provided")').css('color','#d5d5d4');
    });

    // load images before isotope and matchheight functions run
    $('.stories').imagesLoaded( function() {

        // initialize isotope
        $('.stories').isotope({
            itemSelector: '.story',
            layoutMode: 'packery',
            packery: {
               columnWidth: '.grid-sizer'
            }
        });

        // match the article heights
        $('.stories .story.half').matchHeight();

        // match article heights on resize
        function matchHeightOnResize(width) {
            $('.stories .story.half').matchHeight();
        }
        matchHeightOnResize($(window).width());
        $(window).on('resize', function() {
            matchHeightOnResize($(this).width());
        });

    });

    // when a filter is selected, use the input's value to determine which class(es) to filter
    var $container = $('.stories');
    var $checkboxes = $('.filter-bar .filter-expanded .col .checkboxes input');

    $('.filter-bar .container form ul li').on( 'click', 'input', function() {
        var countyValue = this.value;
        $container.isotope({ filter: countyValue });
        secondaryFilter(countyValue);
        secondaryFilterOnLoad(countyValue);
        console.log(countyValue);
    });

    // use case: user selects a county before a secondary filter
    $checkboxes.change(function () {
        var filters = [];
        $checkboxes.filter(':checked').each(function () {
            filters.push(this.value);
        });
        var filterValue = filters.join('');
        $container.isotope({ filter: filterValue });
        console.log(filterValue);
    });

    // use case: user selects a secondary filter before a county (combines both types of filters for further refinement)
    function secondaryFilterOnLoad(countyValue) {
        $checkboxes.change(function () {
            var filters = [];
            $checkboxes.filter(':checked').each(function () {
                filters.push(this.value);
            });
            var filterValue = filters.join('');
            secondaryFilter(filterValue);
            $container.isotope({ filter: filterValue + countyValue });
            console.log(filterValue + countyValue);
        });
    }

    // use case: user selects a county before a secondary filter (combines both types of filters for further refinement)
    function secondaryFilter(filterValue) {
        $('.filter-bar .container form > ul li').on( 'click', 'input', function() {
            var countyValue = this.value;
            var $radios = $('.filter-bar .container form > ul li input');
            $radios.change(function () {
                var filters = [];
                $radios.filter(':checked').each(function () {
                    filters.push(this.value);
                });
                $container.isotope({ filter: countyValue + filterValue });
                console.log(countyValue + filterValue);
            });
        });
    }

    // reset filters when clear button is clicked
    $('.filter-bar .filter-expanded form input[type="reset"]').on( 'click', function() {
        $container.isotope({ filter: '*' });
        $('.filter-bar .filter-expanded .col .checkboxes:has(input:checkbox:not(:checked))').removeClass('checked');
        $('.filter-bar ul li:has(input:checkbox:not(:checked))').removeClass('checked');
    });


});
