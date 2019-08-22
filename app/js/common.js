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


    $('.team-slider').slick({
        infinite: true,
        autoplay: true,
        adaptiveHeight: true,
        autoplaySpeed: 8000,
        prevArrow: '<button type="button" class="intro-prev slider-prev"></button>',
        nextArrow: '<button type="button" class="intro-next slider-next"></button>',
        slidesToShow: 4,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
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



    $.scrollify({
        section : "section",
        setHeights: false,
    });



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

        if((index == 7)){
            $('#totop').addClass('on');
            $('.timelaps-scrolling').addClass('off');
        } else {
            $('#totop').removeClass('on');
            $('.timelaps-scrolling').removeClass('off');
        }

        if(index==0) {
            $('.timelaps-scrolling').addClass('off');
        }

        $('section').each(function(){
            var id = $(this).attr("id");
            var topHeader = $(this).offset().top;
            var botHeader = topHeader + $(this).height();

            if (
                posDoc > topHeader &&
                posDoc < botHeader &&
                id
            ) {
                $('#section-number').text(id);

                if($(this).hasClass('dark-section') == true){
                    $('.timelaps').addClass('dark')
                } else {
                    $('.timelaps').removeClass('dark')
                }

            }


        });
    });

    $('#scrollup').on('click', function(){
        $.scrollify.previous();
    });

    $('#scrolldown').on('click', function(){
        $.scrollify.next();
    });

    /**
     * toTop functionality start
     */

    $('#totop').click(function() {
        $('body,html').animate({scrollTop:0},600);
        setTimeout(function(){
            $('#totop').removeClass('on');
            $('#timelaps-socials').removeClass('off');
        }, 1000);

    });
    /**
     * toTop functionality end
     */




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





$(window).on('load', function(){
    if ($('#dark-map').length) {
        function initMap(){
            var mapAttr = $('#dark-map'),
                latitude = mapAttr.data('lat'),
                longitude = mapAttr.data('lng'),
                zoom = mapAttr.data('zoom'),
                image = mapAttr.data('marker'),
                location = {lat: latitude, lng: longitude};

            var map = new google.maps.Map(document.getElementById('dark-map'), {
                center: location,
                zoom: zoom,
                disableDefaultUI: true,
                zoomControl: true,
                streetViewControl: true,
                fullscreenControl: true,

                styles: [
                    {
                        featureType: "all",
                        elementType: "labels.text.fill",
                        stylers: [
                            {
                                saturation: 36
                            },
                            {
                                color: "#000000"
                            },
                            {
                                lightness: 40
                            }]
                    }, {
                        featureType: "all",
                        elementType: "labels.text.stroke",
                        stylers: [{
                            visibility: "on"
                        }, {
                            color: "#000000"
                        }, {
                            lightness: 16
                        }]
                    }, {
                        featureType: "all",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "administrative",
                        elementType: "geometry.stroke",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 17
                        }, {
                            weight: 1.2
                        }]
                    }, {
                        featureType: "landscape",
                        elementType: "all",
                        stylers: [{
                            visibility: "on"
                        }]
                    }, {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 20
                        }]
                    }, {
                        featureType: "landscape",
                        elementType: "labels.icon",
                        stylers: [{
                            saturation: "-100"
                        }, {
                            lightness: "-54"
                        }]
                    }, {
                        featureType: "poi",
                        elementType: "all",
                        stylers: [{
                            visibility: "on"
                        }, {
                            lightness: "0"
                        }]
                    }, {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 21
                        }]
                    }, {
                        featureType: "poi",
                        elementType: "labels.icon",
                        stylers: [{
                            saturation: "-89"
                        }, {
                            lightness: "-55"
                        }]
                    }, {
                        featureType: "road",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off"
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 17
                        }]
                    }, {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 29
                        }, {
                            weight: 0.2
                        }]
                    }, {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 18
                        }]
                    }, {
                        featureType: "road.local",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 16
                        }]
                    }, {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 19
                        }]
                    }, {
                        featureType: "transit.station",
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "on"
                        }, {
                            saturation: "-100"
                        }, {
                            lightness: "-51"
                        }]
                    }, {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{
                            color: "#000000"
                        }, {
                            lightness: 17
                        }]
                    }]

            });

            var marker = new google.maps.Marker({
                position: location,
                map: map,
                icon: image,
            });

            marker.setMap(map);
        }

        initMap();
    }
});