$(document).ready(function(){

   // back to top smooth scrolling


   function scrollTop(width) {
      if (width <= 753) {
          $('a[href^="#"]').on('click',function (e) {
       	   e.preventDefault();

       	   var target = this.hash;
       	   var $target = $(target);

       	   $('html, body').stop().animate({
       		   'scrollTop': -30 + $target.offset().top
       	   }, 900, 'swing', function () {
       	   });
          });
      } else {
          $('a[href^="#"]').on('click',function (e) {
       	   e.preventDefault();

       	   var target = this.hash;
       	   var $target = $(target);

       	   $('html, body').stop().animate({
       		   'scrollTop': -270 + $target.offset().top
       	   }, 900, 'swing', function () {
       	   });
          });
      }
  }
   scrollTop($(window).width());
   $(window).on('resize', function() {
       scrollTop($(this).width());
   });

    // move sidebar on small screens
    function moveSidebar(width) {
       if (width <= 685) {
           $(".story-top .sidebar").insertBefore("footer");
       } else {
           $(".sidebar").insertAfter(".story-top .content");
       }
   }
    moveSidebar($(window).width());
    $(window).on('resize', function() {
        moveSidebar($(this).width());
    });

    // hide the mobile header
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

    // social sharing
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

    $('.filter-bar form li input').click(function(){
        if ($(this).is(':checked')) {
            $('.filter-bar form li input').removeAttr('checked', 'checked');
            $(this).attr('checked', 'checked');
        }
    });
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
    $('.filter-bar form li:first-of-type input').click(function(){
        $('.filter-expanded .col:first-of-type .checkboxes').css('display', 'none');
        $('.filter-expanded .col:first-of-type .more-less').css('display', 'none');
        $('.filter-expanded .col:first-of-type p:last-of-type').css('display', 'block');
    });
    $('.filter-expanded form input[type="checkbox"]').click(function(){
        //$(this).toggleClass('checked', 'checked');
        if ($(this).is(':checked')) {
            $(this).attr('checked', 'checked');
        } else {
            $(this).removeAttr('checked', 'checked');
        }
    });

    // load more sections (1st column)
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

    // load more sections (2nd column)
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

    // load more sections (3rd column)
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

    $('.header-right nav ul li:last-of-type a').on('click', function(e) {
        e.preventDefault();
        $('form.search').toggleClass('open');
    });

    $('.filter-bar form li:last-of-type a').on('click', function(e) {
        e.preventDefault();
        $('.filter-expanded').toggleClass('hide show');
        if ($('.filter-expanded').hasClass('show')) {
            $('.filter-expanded .col label.show').css('visibility','visible');
        } else {
            $('.filter-expanded .col label.show').css('visibility','hidden');
        }
    });

    if ($('.filter-expanded').hasClass('hide')) {
        $('.filter-expanded .col label.show').css('visibility','hidden');
    }

    $('.filter-expanded input[type="reset"]').on('click', function(e) {
        $('.filter-expanded input[type="checkbox"]').removeAttr('checked', 'checked');
    });

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

    // load more sections (homepage filtering)
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

});
