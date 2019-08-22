$(document).ready(function(){

    var $curentSlide = $('#intro-count .current');
    var $totalSlides = $('#intro-count .total');
    var $introSlider = $('.intro-slider');

    $introSlider.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
        var i = (currentSlide ? currentSlide : 0) + 1;
        $curentSlide.text(i);
        $totalSlides.text(slick.slideCount);
    });

    $introSlider.slick({
        infinite: true,
        // autoplay: true,
        // autoplaySpeed: 8000,
        fade: true,
        cssEase: 'linear',
        prevArrow: '<button type="button" class="intro-prev slider-prev"></button>',
        nextArrow: '<button type="button" class="intro-next slider-next"></button>',
    });


    var percentTime;
    var tick;
    var time = 1;
    var progressBarIndex = 0;

    $('.progressBar').each(function(index) {
        var progress = "<div class='inProgress inProgress" + index + "'></div>";
        $(this).html(progress);
    });

    function startProgressbar() {
        resetProgressbar();
        percentTime = 0;
        tick = setInterval(interval, 10);
    }

    function interval() {
        if (($('.intro-slider .slick-track div[data-slick-index="' + progressBarIndex + '"]').attr("aria-hidden")) === "true") {
            progressBarIndex = $('.intro-slider .slick-track div[aria-hidden="false"]').data("slickIndex");
            startProgressbar();
        } else {
            percentTime += 1 / (time + 5);
            $('.inProgress' + progressBarIndex).css({
                width: percentTime + "%"
            });
            if (percentTime >= 100) {
                $('.intro-slider').slick('slickNext');
                progressBarIndex++;
                if (progressBarIndex > 2) {
                    progressBarIndex = 0;
                }
                startProgressbar();
            }
        }
    }

    function resetProgressbar() {
        $('.inProgress').css({
            width: 0 + '%'
        });
        clearInterval(tick);
    }
    startProgressbar();





    $('.projects-slider').slick({
        infinite: true,
        autoplay: true,
        adaptiveHeight: false,
        autoplaySpeed: 8000,
        prevArrow: '<button type="button" class="intro-prev slider-prev"></button>',
        nextArrow: '<button type="button" class="intro-next slider-next"></button>',
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    adaptiveHeight:true,
                }
            }

        ]
    });




    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });




    function heightses() {

        if ($(window).width()>=768) {
            $('.txt-item-title').height('auto').equalHeights();
            $('.project-slide-content').height('auto').equalHeights();
        }

        if ($(window).width()>=992) {
            $('.service-item-title').height('auto').equalHeights();
            $('.service-item-desc').height('auto').equalHeights();
            $('.project-item-top').height('auto').equalHeights();
        }





    }
    $(window).resize(function() {
        heightses();
    });
    heightses();

    /**
     * VIDEO
     */
    //youtube script
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var vp;

    var $playerID = 'videoPlayer-0';

    onYouTubeIframeAPIReady = function () {

        $("a[href='#video-popup']").on('click', function(){
            var $videoID = $(this).data("video");


            vp = new YT.Player($playerID, {
                videoId: $videoID,
                playerVars: {
                    'autoplay': 1,
                    'rel': 0,
                    'showinfo': 0
                },
                events: {
                    'onStateChange': onPlayerStateChange
                }
            });
        });
    };

    onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
            $.magnificPopup.close();
        }
    };

    $(function () {
        $("a[href='#video-popup']").magnificPopup({
            type: "inline",
            fixedContentPos: !1,
            fixedBgPos: !0,
            overflowY: "auto",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 300,
            mainClass: "my-mfp-zoom-in",
            callbacks: {
                close: function(){
                    vp.stopVideo();
                    vp.destroy();
                }
            }
        })
    });
    /**
     * end VIDEO
     */




    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });



    // $.scrollify({
    //     section : "section",
    //     setHeights: false,
    // });



    $(document).on('scroll', function() {
        var posDoc = $(this).scrollTop();
        var index = $.scrollify.currentIndex();

        if(index>0) {
            $('#timelaps-socials').addClass('off');
            $('.timelaps-scrolling').removeClass('off');
        } else {
            $('#timelaps-socials').removeClass('off');
            $('.timelaps-scrolling').addClass('off');
        }

        $('section').each(function(){
            var id = $(this).attr("id");
            var topHeader = $(this).offset().top - 38;
            var botHeader = topHeader + $(this).height() - 200;

            if (
                posDoc > topHeader &&
                posDoc < botHeader &&
                id
            ) {
                $('#section-number').text(id);
            }
        });
    });

    // $('#scrollup').on('click', function(){
    //     $.scrollify.previous();
    // });
    //
    // $('#scrolldown').on('click', function(){
    //     $.scrollify.next();
    // });


    //===== geography =====//
    $('.city').on('click', function(e){
        e.preventDefault();
        var th = $(this);
        var allCities = $('.geo-sities');
        var allSubCities = $('.geo-subsities');
        var markerId = th.data('src');
        console.log(markerId);


        allCities.find('.city').removeClass('active');
        allSubCities.find('.city').removeClass('active');

        $('.geo-city-marker').removeClass('active');
        $('#'+markerId).addClass('active');

        th.addClass('active');
    });


    $('.geo-city-marker').on('click', function(){
       var th = $(this);
       var id = th.attr('id');

        $('.geo-city-marker').removeClass('active');
        th.addClass('active');

        $('.city').removeClass('active');
        $('.s-geography').find('a[data-src=' +id+ ']').addClass('active');

    });

    //===== /geography =====//

});
