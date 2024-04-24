var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

$(function () {
    //Backer and Amount
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    var verifyLoadOfBackers = function () {
        setTimeout(function () {
            var numberOfBackers = +document.getElementsByClassName('backers-amount')[0].innerHTML;
            if (!numberOfBackers) {
                backersInfo(verifyLoadOfBackers);
                console.log('verifyLoadOfBackers');
            }
        }, 600);
    };

    var backersInfo = function (callback) {
        $.getJSON('/info', function (result) {
            var backers = result['buyers'];
            var amount = result['amount'];
            // console.log(backers + ' backers and $' + amount + 'from $ 100 000' );
            $('.backers-amount').text(backers);
            //$('.money-amount').text(amount);
            var amountString = amount.toString();
            $('.money-amount').text(numberWithCommas(amount));
            // progress bar
            var progress = document.getElementsByClassName('progress')[0];
            setTimeout(function () {
                progress.style.width = ( 100 * amount / 100000 ) + '%';

            }, 2000);
            progress.style.maxWidth = '100%';

        });
        callback();
    };

    //backersInfo( verifyLoadOfBackers );

    //rewritten from jQuery
    var preload = new Image();
    preload.onload = function () {
        setTimeout(function () {
            $('.sunset').addClass('show');
        }, 500);
    };
    preload.src = '/img/sprite-sd933fa2597.png';


    var $document = $(document);

    var windowWidth = $(window).width();
    var videoPopup = $('.video-popup');
    var video = $('.goldee-video');
    var source = 'http://player.vimeo.com/video/77999940?title=0&amp;byline=0&amp;portrait=0&amp;color=ff9933;autoplay=1';

    if (windowWidth < 840) {
        var width = $('.intro')[0].scrollWidth;
        video.width(windowWidth);
        video.height(windowWidth / 16 * 9);
    }

    $document.on('click', '.play', function (e) {
        e.preventDefault();
        video.attr('src', source);

        videoPopup.addClass('show');
    });
    //fast solution not probably the best
    $document.on('click', '.controller-in-intro', function (e) {
        e.preventDefault();
        video.attr('src', source);

        videoPopup.addClass('show');
    });

    $document.on('keydown', function (e) {
        if (e.keyCode === 27) {
            videoPopup.removeClass('show');
            video.attr('src', '');
        }
    });

    $document.on('click', '.cross', function () {
        videoPopup.removeClass('show');
        video.attr('src', '');
    });

    $document.on('click', '.video-popup', function () {
        videoPopup.removeClass('show');
        video.attr('src', '');
    });
    //preorder popup script
    var preorderPopup = $('.preorder-popup');

    $document.on('click', 'a[data-preorderform]', function (e) {
        e.preventDefault();

        preorderPopup.removeClass('hide');

        //added by mh to set value of package
        $('.payment-price').val($(this).data('package'));
        finalPrice(1);
        printPackageDetails($(this).data('element'));
    });

    $document.on('click', '.cross', function (e) {
        e.preventDefault();

        preorderPopup.addClass('hide');
        $('.success-popup').addClass('hide');
    });

    $document.on('click', '.bg', function (e) {
        e.preventDefault();

        preorderPopup.addClass('hide');
    });

    $document.on('keydown', function (e) {
        if (e.keyCode === 27) {
            preorderPopup.addClass('hide');
        }
    });

    // Legal script
    var legalPopup = $('.legal-popup');
    var stopScrolling = function () {
        document.body.style.overflow = 'hidden';
        document.body.style.width = '100%';
    };
    var clearBodyStyle = function () {
        document.body.style.cssText = '';
    };

    $document.on('click', '.legal', function (e) {
        e.preventDefault();

        legalPopup.removeClass('hide');
        stopScrolling();

    });

    $document.on('click', '.cross', function (e) {
        e.preventDefault();

        legalPopup.addClass('hide');
        $('.success-popup').addClass('hide');
        clearBodyStyle();
    });

    $document.on('click', '.bg', function (e) {
        e.preventDefault();

        legalPopup.addClass('hide');
        clearBodyStyle();
    });

    $document.on('keydown', function (e) {
        if (e.keyCode === 27) {
            legalPopup.addClass('hide');
            clearBodyStyle();
        }
    });


    // CCV
    var thatIsCCV = $('.whats-ccv');
    $document.on('mouseover', '.what-is', function (e) {
        e.preventDefault();

        thatIsCCV.removeClass('hide');

    });
    $document.on('mouseleave', '.what-is', function (e) {
        e.preventDefault();

        thatIsCCV.addClass('hide');

    });


    $document.on('click', 'a[data-method]', function (e) {
        e.preventDefault();

        $('a[data-method]').removeClass('selected');
        $('.' + $(this).data('method')).addClass('selected');

        $('[data-paymethod]').addClass('hide');
        $('.' + $(this).data('method') + '-method').removeClass('hide');

        // added by mh to switch value of input name='method'
        $('.submit-payment-method').attr('value', $(this).data('method'));


        // remove required from card number and ccv if paypal
        if ($(this).data('method') === 'paypal') {
            $('.card-number').removeClass('required');
            $('.security-code').removeClass('required');
        }
        else if ($(this).data('method') === 'card') {
            $('.card-number').addClass('required');
            $('.security-code').addClass('required');
        }

    });


    $document.on('click', '.question', function (e) {
        e.preventDefault();
        var parentEl = this.parentElement;
        var $parentEl = $(parentEl);

        if ($parentEl.hasClass('opened')) {
            $parentEl.removeClass('opened');
        } else {
            $parentEl.addClass('opened');
        }
    });

    $document.on('click', 'a[data-content]', function (e) {
        e.preventDefault();
        var $this = $(this);
        var pointer = $('.pointer');
        var pointerLine = $('.pointer-line');

        pointerLine.fadeIn();
        $('.faq-line').css('margin-top', 133);
        $('.content-steps').removeClass('hide');

        $('a[data-pointer]').removeClass('selected');
        $this.addClass('selected');

        if ($this.data('pointer') === 1) {
            $this.find('h3').addClass('active');
        } else {
            $('.step1').removeClass('active');
        }

        pointer.removeClass('pos1 pos2 pos3');
        pointer.addClass('pos' + $this.data('pointer'));

        if ($('.' + $this.data('content')).hasClass('hide')) {
            $('.content-step').addClass('hide');
            setTimeout(function () {
                $('.' + $this.data('content')).removeClass('hide');
            }, 600);
        }
    });


    var visualizationBgContainer = $('.visualization-bgs');

    function setVisualizationBackground(bg) {
        var prev = visualizationBgContainer.find('.bg');

        setTimeout(function () {
            prev.remove();
        }, 3000);

        var el = document.createElement('div');
        el.className += 'bg group1 ' + bg;

        visualizationBgContainer.append(el);

        setTimeout(function () {
            el.className += ' show';
        }, 30);
    }

    $document.on('click', 'a[data-bgchange]', function (e) {
        e.preventDefault();

        $('a[data-bgchange]').removeClass('selected');
        $(this).addClass('selected');

        var bg = $(this).attr('data-bgchange');
        setVisualizationBackground(bg);
    });

    $document.on('click', 'a[data-group]', function (e) {
        e.preventDefault();
        var $this = $(this);
        var roles = $('.roles');
        var hover = $('.controller-hover');
        var outside = $('.room');
        var text = $('.visualizations h2');
        var group = $this.attr('data-group');

        $('a[data-group]').removeClass('active');
        $this.addClass('active');

        if (group !== 'ambient') {
            roles.addClass('hide');
        } else {
            roles.removeClass('hide');
        }

        if (group !== 'night') {
            hover.addClass('hide');
        } else {
            hover.removeClass('hide');
        }

        if (group !== 'outside') {
            outside.addClass('hide');
        } else {
            outside.removeClass('hide');
        }

        text.addClass('hide');
        setTimeout(function () {
            text.html($this.attr('data-text'));
            text.removeClass('hide');
        }, 300);

        setVisualizationBackground(group);
    });


    $document.on('mouseover', '.controller-hover', function () {
        setVisualizationBackground('light');
    });

    $document.on('mouseleave', '.controller-hover', function () {
        setVisualizationBackground('night');
    });


    $document.on('mouseover', '.room-hover', function () {
        var roomName = $(this).data('room');
        lightRoom(roomName);
    });

    $document.on('mouseleave', '.room-hover', function () {
        setVisualizationBackground('outside');
        delightRooms();
    });


    var footerBgContainer = $('.footer-bgs');

    function setFooterBackground(bgNumber) {
        var prev = footerBgContainer.find('.bg');

        setTimeout(function () {
            prev.remove();
        }, 4100);

        var el = document.createElement('div');
        el.className += 'bg bg' + bgNumber;

        footerBgContainer.append(el);

        setTimeout(function () {
            el.className += ' show';
        }, 20);
    }

    function footerBgRotating(interval) {
        var current = 1;

        setInterval(function () {
            setFooterBackground((current % 3) + 1);
            current++;
        }, interval);
    }

    footerBgRotating(4000);


    $document.on('mouseenter', '.dot-with-circle', function () {
        var $this = $(this);
        var descriptionNumber = $this.data('hover');

        $('.description' + descriptionNumber).addClass('current');
    });

    $document.on('mouseleave', '.dot-with-circle', function () {
        setTimeout(function () {
            $('.description').removeClass('current');
        }, 200);
    });


    var done = false;

    var windowHeight = Math.round($(window).height());
    $('.timeline-bg').height(windowHeight);

    $('.mode').css('padding-top', windowHeight * 0.42);
    $('.mode').css('padding-bottom', windowHeight * 0.42);
    $('.mode').last().css('padding-bottom', windowHeight * 0.43);

    $('.clocks').css('top', windowHeight * 0.5 - 68);

    $('.vertical-line1').css('height', windowHeight * 0.50 - 78);
    $('.vertical-line2').css('height', windowHeight * 0.50 - 78);
    $('.vertical-line2').css('top', windowHeight * 0.50 + 78);

    $('.timeline-controller').css('top', windowHeight * 0.5 - 266);

    var timeline = $('.timeline');
    var techSpec = $('.tech-spec');

    $(window).scroll(function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > techSpec.position().top) {
            techSpec.addClass('current');
        } else {
            techSpec.removeClass('current');
        }

        if (timeline.position().top + timeline.height() < scrollTop + window.innerHeight) {
            $('.timeline').removeClass('fixed');
            $('.timeline').addClass('done');

            $('.vertical-line1').css('top', 'auto');
            $('.vertical-line1').css('bottom', windowHeight * 0.5 + 78);
            $('.vertical-line2').css('top', 'auto');
            $('.vertical-line2').css('bottom', 0);

            $('.clocks').css('top', 'auto');
            $('.clocks').css('bottom', windowHeight * 0.5 - 68);

            $('.timeline-controller').css('top', 'auto');
            $('.timeline-controller').css('bottom', windowHeight * 0.5 - 266);
        } else if (timeline.position().top < scrollTop) {
            $('.timeline').addClass('fixed');
            $('.timeline').removeClass('done');

            $('.vertical-line1').css('top', 0);
            $('.vertical-line1').css('bottom', 'auto');
            $('.vertical-line2').css('top', windowHeight * 0.50 + 78);
            $('.vertical-line2').css('bottom', 'auto');

            $('.clocks').css('top', windowHeight * 0.5 - 68);
            $('.clocks').css('bottom', 'auto');

            $('.timeline-controller').css('top', windowHeight * 0.5 - 266);
            $('.timeline-controller').css('bottom', 'auto');
        } else {
            $('.timeline').removeClass('fixed');
            $('.timeline').removeClass('done');
            $('.timeline-bg').height(windowHeight);
        }
    });


    if ($('.timeline').length) {
        function formatAMPM(date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = "<div class='time'><span class='hours'>" + hours + "</span><span class='colon'></span><span class='minutes'>" + minutes + "</span></div><span class='forenoon'>" + ampm + "</span>";
            return strTime;
        }

        var interpolateTime = function (start, finish, position) {
            var diff = finish.getTime() - start.getTime();
            return new Date(start.getTime() + diff * position);
        };

        var initializeTimeline = function () {
            var dates = [
                new Date(2013, 11, 5, 5, 30, 0),
                new Date(2013, 11, 5, 6, 30, 0),
                new Date(2013, 11, 5, 18, 25, 0),
                new Date(2013, 11, 5, 19, 20, 0),
                new Date(2013, 11, 5, 23, 45, 0),
                new Date(2013, 11, 6, 2, 20, 0),
                new Date(2013, 11, 6, 4, 10, 0)
            ];

            var timeline = $('.timeline');
            var timelineTop = timeline.offset().top;
            var timelineHeight = timeline[0].scrollHeight;
            var timelineBottom = timelineTop + timelineHeight;
            var timelineSections = $('.mode');
            var positions = timelineSections.map(function () {
                return $(this).position().top;
            });
            var $time = $('.clocks');

            var lastSection = timelineSections.last();
            var lastSectionPosition = lastSection.position().top;

            $(window).scroll(function () {
                var scrollTop = $(window).scrollTop();

                if (scrollTop > timelineTop - window.innerHeight && scrollTop < timelineBottom) {
                    var a = positions.filter(function (i, item) {
                        return scrollTop - timelineTop > item;
                    });

                    var currentIndex = a.length - 1;
                    var nextIndex = currentIndex + 1;

                    var current = timelineSections.eq(currentIndex);
                    var next = timelineSections.eq(nextIndex);

                    var controllerContainer = $('.timeline-controller');

                    if (!$('.timeline-bg').hasClass('timeline-bg' + current.data('bg')) && scrollTop > timelineTop) {
                        var prevBg = timeline.find('.timeline-bg');
                        var prevIcon = controllerContainer.find('.mode-icon');
                        prevIcon.removeClass('show');

                        setTimeout(function () {
                            prevIcon.remove();
                        }, 350);
                        setTimeout(function () {
                            prevBg.remove();
                        }, 850);

                        var bgEl = document.createElement('div');
                        bgEl.className += 'timeline-bg timeline-bg' + current.data('bg');
                        timeline.append(bgEl);

                        var iconEl = document.createElement('div');
                        iconEl.className += 'mode-icon mode-icon' + current.data('bg');
                        controllerContainer.append(iconEl);

                        setTimeout(function () {
                            bgEl.className += ' show';
                        }, 20);

                        setTimeout(function () {
                            iconEl.className += ' show';
                        }, 300);
                    }

                    if (currentIndex < 0) {
                        $time.html(formatAMPM(dates[0]));
                        return;
                    }

                    if (scrollTop - 50 > lastSectionPosition + timelineTop) {
                        $time.html('AWAY');
                        $time.addClass('away');

                        return;
                    }

                    if (nextIndex >= timelineSections.length) {
                        var date = dates[dates.length];

                        $time.removeClass('away');
                        $time.html(formatAMPM(date));
                        return;
                    }


                    if (next.length && a.length !== dates.length) {
                        var currentLocation = current.position().top + timelineTop;
                        var nextLocation = next.position().top + timelineTop;

                        var position = (scrollTop - currentLocation) / (nextLocation - currentLocation);
                        var time = interpolateTime(dates[currentIndex], dates[nextIndex], position);

                        $time.html(formatAMPM(time));
                    }
                }
            });
        };

        initializeTimeline();
    }

    // Tracking links Google Analytics
    // example: ga('send', 'event', 'category', 'action');

    // Intro
    $('.twitter-follow-button').on('click', function () {
        ga('send', 'event', 'Social', 'Twitter', 'follow');
    });
    $('.twitter-share-button').on('click', function () {
        ga('send', 'event', 'Social', 'Twitter', 'share');
    });
    $('.facebook-like').on('click', function () {
        ga('send', 'event', 'Social', 'Facebook', 'like');
    });
    $('.play').on('click', function () {
        ga('send', 'event', 'Video', 'Play click', 'button');
    });
    $('.controller-in-intro').on('click', function () {
        ga('send', 'event', 'Video', 'Play click', 'goldee-controller');
    });
    $('.intro .preorder').on('click', function () {
        ga('send', 'event', 'Pledge', 'click', 'Pledge Top', 1);
    });
    $('.intro .partnership').on('click', function () {
        ga('send', 'event', 'Partnership', 'click', 'Colaborate Top');
    });

    // Visualizations
    $('.controller-hover').on('mouseover', function () {
        ga('send', 'event', 'Night scene ', 'hover', 'Night light ON');
    });
    $('.visualizations .room-hover').on('mouseover', function () {
        ga('send', 'event', 'Outside scene', 'hover', $(this).data('room') + ' room');
    });
    $('.visualizations .roles a').on('click', function () {
        ga('send', 'event', 'Ambient room', 'click', $(this).data('bgchange') + ' gesture');
    });
    $('.visualizations .dots a').on('click', function () {
        ga('send', 'event', 'Visualizations', 'click', $(this).data('group') + ' scene');
    });


    // Unfolded Goldee
    $('.dot-with-circle1').on('mouseover', function () {
        ga('send', 'event', 'Engineered goldee', 'hover', 'Gorilla® Glass');
    });
    $('.dot-with-circle2').on('mouseover', function () {
        ga('send', 'event', 'Engineered goldee', 'hover', 'Gesture Control Chip');
    });
    $('.dot-with-circle3').on('mouseover', function () {
        ga('send', 'event', 'Engineered goldee', 'hover', 'Ambient Sensor');
    });
    $('.dot-with-circle4').on('mouseover', function () {
        ga('send', 'event', 'Engineered goldee', 'hover', 'Amoled Display');
    });
    $('.dot-with-circle5').on('mouseover', function () {
        ga('send', 'event', 'Engineered goldee', 'hover', 'Proximity Sensor');
    });
    $('.dot-with-circle6').on('mouseover', function () {
        ga('send', 'event', 'Engineered goldee', 'hover', 'Polycarbonate body');
    });
    $('.dot-with-circle7').on('mouseover', function () {
        ga('send', 'event', 'Engineered goldee', 'hover', 'Back Panel');
    });

    // How it works
    $('.step1').on('click', function () {
        ga('send', 'event', 'How-it-works', 'click', '1.Replace');
    });
    $('.step2').on('click', function () {
        ga('send', 'event', 'How-it-works', 'click', '2.Update');
    });
    $('.step3').on('click', function () {
        ga('send', 'event', 'How-it-works', 'click', '3.Enjoy');
    });

    // Footer
    $('footer .links a').on('click', function () {
        ga('send', 'event', 'footer-nav', 'click', $(this).html());
    });
    $('footer .preorder').on('click', function () {
        ga('send', 'event', 'Pledge', 'click', 'Pledge Botton', 1);
    });
    $('footer .partnership').on('click', function () {
        ga('send', 'event', 'Partnership', 'click', 'Collaborate Botton');
    });


    // Questions
    $('.questions ul a').on('click', function () {
        ga('send', 'event', 'FAQ', 'click', $(this).html());
    });
    $('.ask').on('click', function () {
        ga('send', 'event', 'FAQ', 'click', 'Ask a question');
    });

    //Prerder

    $('.submit').on('click', function () {
        ga('send', 'event', 'Transaction', 'submit', 'Submit transaction');
    });
    $('.choices a').on('click', function () {
        ga('send', 'event', 'Transaction', 'click', $(this).html(), 1);
    });


});

var howManyDaysRemains = function () {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(2013, 11, 26);
    var preToday = new Date();
    var today = new Date(preToday.getFullYear(), preToday.getMonth() + 1, preToday.getDate());

    var diffDays = 26 - Math.round((today.getTime() - firstDate.getTime()) / (oneDay));
    console.log(diffDays);

    var daysAmount = document.getElementsByClassName('days-amount')[0];

    if (diffDays > 26) {
        daysAmount.innerHTML = '25';
    } else if (diffDays > 0) {
        daysAmount.innerHTML = diffDays;
    } else {
        daysAmount.innerHTML = '0';
    }
};
//howManyDaysRemains();

// Visualization 2: goldee position
if ($('.visualizations').length) {
    var getPositions = function () {
        var getGoldeePosition = function () {
            var controller = document.getElementsByClassName('controller-hover')[0];
            var visualizationBgWidth = document.getElementsByClassName('visualizations')[0].scrollWidth;

            controller.style.cssText = '';

            if (window.innerWidth < 1368) {
                controller.style.left = '50%';
                controller.style.top = '318px';
                controller.style.marginLeft = '106px';
                // console.log('window is smaller than 1368px');
                // console.log(window.innerWidth);
            } else {
                // picture.height = (window.innerWidth / 16 * 9);
                // there should be 2510.5, I have no idea why 2485.5 works better
                controller.style.left = ( visualizationBgWidth / ( 3840 / 2510.5 ) ) - 102 + 'px';
                controller.style.top = '50%';
                controller.style.marginTop = ( visualizationBgWidth / ( 3840 / 79 ) ) - 95 + 'px';
                // I've got the center, now lets take the size 140px

            }
        };
        getGoldeePosition();

        // Visualization 3: rooms positions
        var getRoomsLocations = function () {
            var roomYellow = document.getElementsByClassName('room-hover1')[0];
            var roomRed = document.getElementsByClassName('room-hover2')[0];
            var visualizationBgWidth = document.getElementsByClassName('visualizations')[0].scrollWidth;

            roomYellow.style.cssText = '';
            roomRed.style.cssText = '';

            if (window.innerWidth < 1368) {

                roomYellow.style.bottom = '150px';
                roomYellow.style.right = '50%';
                roomYellow.style.marginRight = '20px';
                roomRed.style.bottom = '110px';
                roomRed.style.left = '50%';
                roomRed.style.marginLeft = '12px';
            }
            else {
                // čísla jsou původní údaje z mega vizualice 3 840 komplet šířka, 1 016 šířka žlutého pokoje
                // 340 výška pokoje, 420 vzdálenost od spodního kraje
                //window.innerWidth = width with scrollbar

                roomYellow.style.width = ( visualizationBgWidth / ( 3840 / 1016 ) ) + 'px';
                roomYellow.style.height = ( visualizationBgWidth / ( 3840 / 340 ) ) + 'px';
                roomYellow.style.bottom = ( ( visualizationBgWidth / 16 * 9 ) / ( 2160 / 420 ) ) + 'px';
                roomYellow.style.right = '50%';
                roomYellow.style.marginRight = ( visualizationBgWidth / ( 3840 / 62 ) ) + 'px';
                roomRed.style.width = ( visualizationBgWidth / ( 3840 / 1290 ) ) + 'px';
                roomRed.style.height = ( visualizationBgWidth / ( 3840 / 547 ) ) + 'px';
                roomRed.style.bottom = ( ( visualizationBgWidth / 16 * 9 ) / ( 2160 / 336 ) ) + 'px';
                roomRed.style.left = '50%';
                roomRed.style.marginLeft = ( visualizationBgWidth / ( 3840 / 30 ) ) + 'px';
            }
        };
        getRoomsLocations();

        // Room lights ong
        var setRoomSizes = function () {
            var roomYellow = document.getElementById('left-room-lighten');
            var roomRed = document.getElementById('right-room-lighten');
            var visualizationBgWidth = document.getElementsByClassName('visualizations')[0].scrollWidth;
            roomYellow.style.width = ( visualizationBgWidth / 2 ) + 'px';
            roomRed.style.width = ( ( visualizationBgWidth / 2 ) - 20 ) + 'px';
            if (window.innerWidth > 1367) {
                roomYellow.style.height = ( ( visualizationBgWidth / 2 ) / ( 1280 / 720 ) ) + 'px';
                roomRed.style.height = ( ( visualizationBgWidth / 2 ) / ( 1280 / 720 ) ) + 'px';
            }
        };
        setRoomSizes();
    };

    var lightRoom = function (roomName) {
        // console.log(roomName + 'muhahah');
        var room = document.getElementById(roomName + '-room-lighten');
        room.className = 'room lighten-room visible';
    };
    var delightRooms = function () {
        var roomYellow = document.getElementById('left-room-lighten');
        var roomRed = document.getElementById('right-room-lighten');
        roomYellow.className = 'room lighten-room';
        roomRed.className = 'room lighten-room';
    };

    getPositions();

    window.onresize = getPositions;

}


//     Underscore.js 1.6.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function () {

    // Baseline setup
    // --------------

    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;

    // Save the previous value of the `_` variable.
    var previousUnderscore = root._;

    // Establish the object that gets returned to break out of a loop iteration.
    var breaker = {};

    // Save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

    // Create quick reference variables for speed access to core prototypes.
    var
        push = ArrayProto.push,
        slice = ArrayProto.slice,
        concat = ArrayProto.concat,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;

    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    var
        nativeForEach = ArrayProto.forEach,
        nativeMap = ArrayProto.map,
        nativeReduce = ArrayProto.reduce,
        nativeReduceRight = ArrayProto.reduceRight,
        nativeFilter = ArrayProto.filter,
        nativeEvery = ArrayProto.every,
        nativeSome = ArrayProto.some,
        nativeIndexOf = ArrayProto.indexOf,
        nativeLastIndexOf = ArrayProto.lastIndexOf,
        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind;

    // Create a safe reference to the Underscore object for use below.
    var _ = function (obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };

    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `_` as a global object via a string identifier,
    // for Closure Compiler "advanced" mode.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }

    // Current version.
    _.VERSION = '1.6.0';

    // Collection Functions
    // --------------------

    // The cornerstone, an `each` implementation, aka `forEach`.
    // Handles objects with the built-in `forEach`, arrays, and raw objects.
    // Delegates to **ECMAScript 5**'s native `forEach` if available.
    var each = _.each = _.forEach = function (obj, iterator, context) {
        if (obj == null) return obj;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, length = obj.length; i < length; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            var keys = _.keys(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
            }
        }
        return obj;
    };

    // Return the results of applying the iterator to each element.
    // Delegates to **ECMAScript 5**'s native `map` if available.
    _.map = _.collect = function (obj, iterator, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
        each(obj, function (value, index, list) {
            results.push(iterator.call(context, value, index, list));
        });
        return results;
    };

    var reduceError = 'Reduce of empty array with no initial value';

    // **Reduce** builds up a single result from a list of values, aka `inject`,
    // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
    _.reduce = _.foldl = _.inject = function (obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduce && obj.reduce === nativeReduce) {
            if (context) iterator = _.bind(iterator, context);
            return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
        each(obj, function (value, index, list) {
            if (!initial) {
                memo = value;
                initial = true;
            } else {
                memo = iterator.call(context, memo, value, index, list);
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };

    // The right-associative version of reduce, also known as `foldr`.
    // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
    _.reduceRight = _.foldr = function (obj, iterator, memo, context) {
        var initial = arguments.length > 2;
        if (obj == null) obj = [];
        if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
            if (context) iterator = _.bind(iterator, context);
            return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
        }
        var length = obj.length;
        if (length !== +length) {
            var keys = _.keys(obj);
            length = keys.length;
        }
        each(obj, function (value, index, list) {
            index = keys ? keys[--length] : --length;
            if (!initial) {
                memo = obj[index];
                initial = true;
            } else {
                memo = iterator.call(context, memo, obj[index], index, list);
            }
        });
        if (!initial) throw new TypeError(reduceError);
        return memo;
    };

    // Return the first value which passes a truth test. Aliased as `detect`.
    _.find = _.detect = function (obj, predicate, context) {
        var result;
        any(obj, function (value, index, list) {
            if (predicate.call(context, value, index, list)) {
                result = value;
                return true;
            }
        });
        return result;
    };

    // Return all the elements that pass a truth test.
    // Delegates to **ECMAScript 5**'s native `filter` if available.
    // Aliased as `select`.
    _.filter = _.select = function (obj, predicate, context) {
        var results = [];
        if (obj == null) return results;
        if (nativeFilter && obj.filter === nativeFilter) return obj.filter(predicate, context);
        each(obj, function (value, index, list) {
            if (predicate.call(context, value, index, list)) results.push(value);
        });
        return results;
    };

    // Return all the elements for which a truth test fails.
    _.reject = function (obj, predicate, context) {
        return _.filter(obj, _.negate(predicate), context);
    };

    // Determine whether all of the elements match a truth test.
    // Delegates to **ECMAScript 5**'s native `every` if available.
    // Aliased as `all`.
    _.every = _.all = function (obj, predicate, context) {
        predicate || (predicate = _.identity);
        var result = true;
        if (obj == null) return result;
        if (nativeEvery && obj.every === nativeEvery) return obj.every(predicate, context);
        each(obj, function (value, index, list) {
            if (!(result = result && predicate.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };

    // Determine if at least one element in the object matches a truth test.
    // Delegates to **ECMAScript 5**'s native `some` if available.
    // Aliased as `any`.
    var any = _.some = _.any = function (obj, predicate, context) {
        predicate || (predicate = _.identity);
        var result = false;
        if (obj == null) return result;
        if (nativeSome && obj.some === nativeSome) return obj.some(predicate, context);
        each(obj, function (value, index, list) {
            if (result || (result = predicate.call(context, value, index, list))) return breaker;
        });
        return !!result;
    };

    // Determine if the array or object contains a given value (using `===`).
    // Aliased as `include`.
    _.contains = _.include = function (obj, target) {
        if (obj == null) return false;
        if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
        return any(obj, function (value) {
            return value === target;
        });
    };

    // Invoke a method (with arguments) on every item in a collection.
    _.invoke = function (obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function (value) {
            return (isFunc ? method : value[method]).apply(value, args);
        });
    };

    // Convenience version of a common use case of `map`: fetching a property.
    _.pluck = function (obj, key) {
        return _.map(obj, _.property(key));
    };

    // Convenience version of a common use case of `filter`: selecting only objects
    // containing specific `key:value` pairs.
    _.where = function (obj, attrs) {
        return _.filter(obj, _.matches(attrs));
    };

    // Convenience version of a common use case of `find`: getting the first object
    // containing specific `key:value` pairs.
    _.findWhere = function (obj, attrs) {
        return _.find(obj, _.matches(attrs));
    };

    // Return the maximum element or (element-based computation).
    _.max = function (obj, iterator, context) {
        var result = -Infinity, lastComputed = -Infinity,
            value, computed;
        if (!iterator && _.isArray(obj)) {
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value > result) {
                    result = value;
                }
            }
        } else {
            each(obj, function (value, index, list) {
                computed = iterator ? iterator.call(context, value, index, list) : value;
                if (computed > lastComputed) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };

    // Return the minimum element (or element-based computation).
    _.min = function (obj, iterator, context) {
        var result = Infinity, lastComputed = Infinity,
            value, computed;
        if (!iterator && _.isArray(obj)) {
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value < result) {
                    result = value;
                }
            }
        } else {
            each(obj, function (value, index, list) {
                computed = iterator ? iterator.call(context, value, index, list) : value;
                if (computed < lastComputed) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };

    // Shuffle an array, using the modern version of the
    // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
    _.shuffle = function (obj) {
        var rand;
        var index = 0;
        var shuffled = [];
        each(obj, function (value) {
            rand = _.random(index++);
            shuffled[index - 1] = shuffled[rand];
            shuffled[rand] = value;
        });
        return shuffled;
    };

    // Sample **n** random values from a collection.
    // If **n** is not specified, returns a single random element.
    // The internal `guard` argument allows it to work with `map`.
    _.sample = function (obj, n, guard) {
        if (n == null || guard) {
            if (obj.length !== +obj.length) obj = _.values(obj);
            return obj[_.random(obj.length - 1)];
        }
        return _.shuffle(obj).slice(0, Math.max(0, n));
    };

    // An internal function to generate lookup iterators.
    var lookupIterator = function (value) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return value;
        return _.property(value);
    };

    // Sort the object's values by a criterion produced by an iterator.
    _.sortBy = function (obj, iterator, context) {
        iterator = lookupIterator(iterator);
        return _.pluck(_.map(obj,function (value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iterator.call(context, value, index, list)
            };
        }).sort(function (left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
        }), 'value');
    };

    // An internal function used for aggregate "group by" operations.
    var group = function (behavior) {
        return function (obj, iterator, context) {
            var result = {};
            iterator = lookupIterator(iterator);
            each(obj, function (value, index) {
                var key = iterator.call(context, value, index, obj);
                behavior(result, key, value);
            });
            return result;
        };
    };

    // Groups the object's values by a criterion. Pass either a string attribute
    // to group by, or a function that returns the criterion.
    _.groupBy = group(function (result, key, value) {
        _.has(result, key) ? result[key].push(value) : result[key] = [value];
    });

    // Indexes the object's values by a criterion, similar to `groupBy`, but for
    // when you know that your index values will be unique.
    _.indexBy = group(function (result, key, value) {
        result[key] = value;
    });

    // Counts instances of an object that group by a certain criterion. Pass
    // either a string attribute to count by, or a function that returns the
    // criterion.
    _.countBy = group(function (result, key) {
        _.has(result, key) ? result[key]++ : result[key] = 1;
    });

    // Use a comparator function to figure out the smallest index at which
    // an object should be inserted so as to maintain order. Uses binary search.
    _.sortedIndex = function (array, obj, iterator, context) {
        iterator = lookupIterator(iterator);
        var value = iterator.call(context, obj);
        var low = 0, high = array.length;
        while (low < high) {
            var mid = (low + high) >>> 1;
            iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
        }
        return low;
    };

    // Safely create a real, live array from anything iterable.
    _.toArray = function (obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (obj.length === +obj.length) return _.map(obj, _.identity);
        return _.values(obj);
    };

    // Return the number of elements in an object.
    _.size = function (obj) {
        if (obj == null) return 0;
        return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
    };

    // Array Functions
    // ---------------

    // Get the first element of an array. Passing **n** will return the first N
    // values in the array. Aliased as `head` and `take`. The **guard** check
    // allows it to work with `_.map`.
    _.first = _.head = _.take = function (array, n, guard) {
        if (array == null) return void 0;
        if ((n == null) || guard) return array[0];
        if (n < 0) return [];
        return slice.call(array, 0, n);
    };

    // Returns everything but the last entry of the array. Especially useful on
    // the arguments object. Passing **n** will return all the values in
    // the array, excluding the last N. The **guard** check allows it to work with
    // `_.map`.
    _.initial = function (array, n, guard) {
        return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
    };

    // Get the last element of an array. Passing **n** will return the last N
    // values in the array. The **guard** check allows it to work with `_.map`.
    _.last = function (array, n, guard) {
        if (array == null) return void 0;
        if ((n == null) || guard) return array[array.length - 1];
        return slice.call(array, Math.max(array.length - n, 0));
    };

    // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
    // Especially useful on the arguments object. Passing an **n** will return
    // the rest N values in the array. The **guard**
    // check allows it to work with `_.map`.
    _.rest = _.tail = _.drop = function (array, n, guard) {
        return slice.call(array, (n == null) || guard ? 1 : n);
    };

    // Trim out all falsy values from an array.
    _.compact = function (array) {
        return _.filter(array, _.identity);
    };

    // Internal implementation of a recursive `flatten` function.
    var flatten = function (input, shallow, strict, output) {
        if (shallow && _.every(input, _.isArray)) {
            return concat.apply(output, input);
        }
        for (var i = 0, length = input.length; i < length; i++) {
            var value = input[i];
            if (!_.isArray(value) && !_.isArguments(value)) {
                if (!strict) output.push(value);
            } else if (shallow) {
                push.apply(output, value);
            } else {
                flatten(value, shallow, strict, output);
            }
        }
        return output;
    };

    // Flatten out an array, either recursively (by default), or just one level.
    _.flatten = function (array, shallow) {
        return flatten(array, shallow, false, []);
    };

    // Return a version of the array that does not contain the specified value(s).
    _.without = function (array) {
        return _.difference(array, slice.call(arguments, 1));
    };

    // Split an array into two arrays: one whose elements all satisfy the given
    // predicate, and one whose elements all do not satisfy the predicate.
    _.partition = function (obj, predicate, context) {
        predicate = lookupIterator(predicate);
        var pass = [], fail = [];
        each(obj, function (elem) {
            (predicate.call(context, elem) ? pass : fail).push(elem);
        });
        return [pass, fail];
    };

    // Produce a duplicate-free version of the array. If the array has already
    // been sorted, you have the option of using a faster algorithm.
    // Aliased as `unique`.
    _.uniq = _.unique = function (array, isSorted, iterator, context) {
        if (array == null) return [];
        if (_.isFunction(isSorted)) {
            context = iterator;
            iterator = isSorted;
            isSorted = false;
        }
        var result = [];
        var seen = [];
        for (var i = 0, length = array.length; i < length; i++) {
            var value = array[i];
            if (iterator) value = iterator.call(context, value, i, array);
            if (isSorted ? (!i || seen !== value) : !_.contains(seen, value)) {
                if (isSorted) seen = value;
                else seen.push(value);
                result.push(array[i]);
            }
        }
        return result;
    };

    // Produce an array that contains the union: each distinct element from all of
    // the passed-in arrays.
    _.union = function () {
        return _.uniq(flatten(arguments, true, true, []));
    };

    // Produce an array that contains every item shared between all the
    // passed-in arrays.
    _.intersection = function (array) {
        var rest = slice.call(arguments, 1);
        return _.filter(_.uniq(array), function (item) {
            return _.every(rest, function (other) {
                return _.contains(other, item);
            });
        });
    };

    // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    _.difference = function (array) {
        var rest = flatten(slice.call(arguments, 1), true, true, []);
        return _.filter(array, function (value) {
            return !_.contains(rest, value);
        });
    };

    // Zip together multiple lists into a single array -- elements that share
    // an index go together.
    _.zip = function () {
        var length = _.max(_.pluck(arguments, 'length').concat(0));
        var results = new Array(length);
        for (var i = 0; i < length; i++) {
            results[i] = _.pluck(arguments, '' + i);
        }
        return results;
    };

    // Converts lists into objects. Pass either a single array of `[key, value]`
    // pairs, or two parallel arrays of the same length -- one of keys, and one of
    // the corresponding values.
    _.object = function (list, values) {
        if (list == null) return {};
        var result = {};
        for (var i = 0, length = list.length; i < length; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };

    // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
    // we need this function. Return the position of the first occurrence of an
    // item in an array, or -1 if the item is not included in the array.
    // Delegates to **ECMAScript 5**'s native `indexOf` if available.
    // If the array is large and already in sort order, pass `true`
    // for **isSorted** to use binary search.
    _.indexOf = function (array, item, isSorted) {
        if (array == null) return -1;
        var i = 0, length = array.length;
        if (isSorted) {
            if (typeof isSorted == 'number') {
                i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
            } else {
                i = _.sortedIndex(array, item);
                return array[i] === item ? i : -1;
            }
        }
        if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
        for (; i < length; i++) if (array[i] === item) return i;
        return -1;
    };

    // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
    _.lastIndexOf = function (array, item, from) {
        if (array == null) return -1;
        var hasIndex = from != null;
        if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
            return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
        }
        var i = (hasIndex ? from : array.length);
        while (i--) if (array[i] === item) return i;
        return -1;
    };

    // Generate an integer Array containing an arithmetic progression. A port of
    // the native Python `range()` function. See
    // [the Python documentation](http://docs.python.org/library/functions.html#range).
    _.range = function (start, stop, step) {
        if (arguments.length <= 1) {
            stop = start || 0;
            start = 0;
        }
        step = arguments[2] || 1;

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var idx = 0;
        var range = new Array(length);

        while (idx < length) {
            range[idx++] = start;
            start += step;
        }

        return range;
    };

    // Function (ahem) Functions
    // ------------------

    // Reusable constructor function for prototype setting.
    var ctor = function () {
    };

    // Create a function bound to a given object (assigning `this`, and arguments,
    // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
    // available.
    _.bind = function (func, context) {
        var args, bound;
        if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError;
        args = slice.call(arguments, 2);
        return bound = function () {
            if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
            ctor.prototype = func.prototype;
            var self = new ctor;
            ctor.prototype = null;
            var result = func.apply(self, args.concat(slice.call(arguments)));
            if (Object(result) === result) return result;
            return self;
        };
    };

    // Partially apply a function by creating a version that has had some of its
    // arguments pre-filled, without changing its dynamic `this` context. _ acts
    // as a placeholder, allowing any combination of arguments to be pre-filled.
    _.partial = function (func) {
        var boundArgs = slice.call(arguments, 1);
        return function () {
            var position = 0;
            var args = boundArgs.slice();
            for (var i = 0, length = args.length; i < length; i++) {
                if (args[i] === _) args[i] = arguments[position++];
            }
            while (position < arguments.length) args.push(arguments[position++]);
            return func.apply(this, args);
        };
    };

    // Bind a number of an object's methods to that object. Remaining arguments
    // are the method names to be bound. Useful for ensuring that all callbacks
    // defined on an object belong to it.
    _.bindAll = function (obj) {
        var funcs = slice.call(arguments, 1);
        if (funcs.length === 0) throw new Error('bindAll must be passed function names');
        each(funcs, function (f) {
            obj[f] = _.bind(obj[f], obj);
        });
        return obj;
    };

    // Memoize an expensive function by storing its results.
    _.memoize = function (func, hasher) {
        var memo = {};
        hasher || (hasher = _.identity);
        return function () {
            var key = hasher.apply(this, arguments);
            return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
        };
    };

    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    _.delay = function (func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function () {
            return func.apply(null, args);
        }, wait);
    };

    // Defers a function, scheduling it to run after the current call stack has
    // cleared.
    _.defer = function (func) {
        return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
    };

    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time. Normally, the throttled function will run
    // as much as it can, without ever going more than once per `wait` duration;
    // but if you'd like to disable the execution on the leading edge, pass
    // `{leading: false}`. To disable execution on the trailing edge, ditto.
    _.throttle = function (func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        options || (options = {});
        var later = function () {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            context = args = null;
        };
        return function () {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                clearTimeout(timeout);
                timeout = null;
                previous = now;
                result = func.apply(context, args);
                context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };

    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    _.debounce = function (func, wait, immediate) {
        var timeout, args, context, timestamp, result;

        var later = function () {
            var last = _.now() - timestamp;

            if (last < wait && last > 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    context = args = null;
                }
            }
        };

        return function () {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    };

    // Returns a function that will be executed at most one time, no matter how
    // often you call it. Useful for lazy initialization.
    _.once = function (func) {
        var ran = false, memo;
        return function () {
            if (ran) return memo;
            ran = true;
            memo = func.apply(this, arguments);
            func = null;
            return memo;
        };
    };

    // Returns the first function passed as an argument to the second,
    // allowing you to adjust arguments, run code before and after, and
    // conditionally execute the original function.
    _.wrap = function (func, wrapper) {
        return _.partial(wrapper, func);
    };

    // Returns a negated version of the passed-in predicate.
    _.negate = function (predicate) {
        return function () {
            return !predicate.apply(this, arguments);
        };
    };

    // Returns a function that is the composition of a list of functions, each
    // consuming the return value of the function that follows.
    _.compose = function () {
        var funcs = arguments;
        return function () {
            var args = arguments;
            for (var i = funcs.length - 1; i >= 0; i--) {
                args = [funcs[i].apply(this, args)];
            }
            return args[0];
        };
    };

    // Returns a function that will only be executed after being called N times.
    _.after = function (times, func) {
        return function () {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };

    // Object Functions
    // ----------------

    // Retrieve the names of an object's properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    _.keys = function (obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        return keys;
    };

    // Retrieve the values of an object's properties.
    _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = new Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };

    // Convert an object into a list of `[key, value]` pairs.
    _.pairs = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = new Array(length);
        for (var i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]];
        }
        return pairs;
    };

    // Invert the keys and values of an object. The values must be serializable.
    _.invert = function (obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };

    // Return a sorted list of the function names available on the object.
    // Aliased as `methods`
    _.functions = _.methods = function (obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };

    // Extend a given object with all the properties in passed-in object(s).
    _.extend = function (obj) {
        each(slice.call(arguments, 1), function (source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };

    // Return a copy of the object only containing the whitelisted properties.
    _.pick = function (obj, iterator, context) {
        var result = {};
        if (_.isFunction(iterator)) {
            for (var key in obj) {
                var value = obj[key];
                if (iterator.call(context, value, key, obj)) result[key] = value;
            }
        } else {
            var keys = concat.apply([], slice.call(arguments, 1));
            for (var i = 0, length = keys.length; i < length; i++) {
                var key = keys[i];
                if (key in obj) result[key] = obj[key];
            }
        }
        return result;
    };

    // Return a copy of the object without the blacklisted properties.
    _.omit = function (obj, iterator, context) {
        var keys;
        if (_.isFunction(iterator)) {
            iterator = _.negate(iterator);
        } else {
            keys = _.map(concat.apply([], slice.call(arguments, 1)), function (o) {
                return '' + o;
            });
            iterator = function (value, key) {
                return !_.contains(keys, key);
            };
        }
        return _.pick(obj, iterator, context);
    };

    // Fill in a given object with default properties.
    _.defaults = function (obj) {
        each(slice.call(arguments, 1), function (source) {
            if (source) {
                for (var prop in source) {
                    if (obj[prop] === void 0) obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };

    // Create a (shallow-cloned) duplicate of an object.
    _.clone = function (obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };

    // Invokes interceptor with the obj, and then returns obj.
    // The primary purpose of this method is to "tap into" a method chain, in
    // order to perform operations on intermediate results within the chain.
    _.tap = function (obj, interceptor) {
        interceptor(obj);
        return obj;
    };

    // Internal recursive comparison function for `isEqual`.
    var eq = function (a, b, aStack, bStack) {
        // Identical objects are equal. `0 === -0`, but they aren't identical.
        // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        // A strict comparison is necessary because `null == undefined`.
        if (a == null || b == null) return a === b;
        // Unwrap any wrapped objects.
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        // Compare `[[Class]]` names.
        var className = toString.call(a);
        if (className != toString.call(b)) return false;
        switch (className) {
            // Strings, numbers, dates, and booleans are compared by value.
            case '[object String]':
                // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
                // equivalent to `new String("5")`.
                return a == String(b);
            case '[object Number]':
                // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
                // other numeric values.
                return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
            case '[object Date]':
            case '[object Boolean]':
                // Coerce dates and booleans to numeric primitive values. Dates are compared by their
                // millisecond representations. Note that invalid dates with millisecond representations
                // of `NaN` are not equivalent.
                return +a == +b;
            // RegExps are compared by their source patterns and flags.
            case '[object RegExp]':
                return a.source == b.source &&
                    a.global == b.global &&
                    a.multiline == b.multiline &&
                    a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != 'object' || typeof b != 'object') return false;
        // Assume equality for cyclic structures. The algorithm for detecting cyclic
        // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
        var length = aStack.length;
        while (length--) {
            // Linear search. Performance is inversely proportional to the number of
            // unique nested structures.
            if (aStack[length] == a) return bStack[length] == b;
        }
        // Objects with different constructors are not equivalent, but `Object`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
            _.isFunction(bCtor) && (bCtor instanceof bCtor))
            && ('constructor' in a && 'constructor' in b)) {
            return false;
        }
        // Add the first object to the stack of traversed objects.
        aStack.push(a);
        bStack.push(b);
        var size = 0, result = true;
        // Recursively compare objects and arrays.
        if (className == '[object Array]') {
            // Compare array lengths to determine if a deep comparison is necessary.
            size = a.length;
            result = size == b.length;
            if (result) {
                // Deep compare the contents, ignoring non-numeric properties.
                while (size--) {
                    if (!(result = eq(a[size], b[size], aStack, bStack))) break;
                }
            }
        } else {
            // Deep compare objects.
            for (var key in a) {
                if (_.has(a, key)) {
                    // Count the expected number of properties.
                    size++;
                    // Deep compare each member.
                    if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
                }
            }
            // Ensure that both objects contain the same number of properties.
            if (result) {
                for (key in b) {
                    if (_.has(b, key) && !(size--)) break;
                }
                result = !size;
            }
        }
        // Remove the first object from the stack of traversed objects.
        aStack.pop();
        bStack.pop();
        return result;
    };

    // Perform a deep comparison to check if two objects are equal.
    _.isEqual = function (a, b) {
        return eq(a, b, [], []);
    };

    // Is a given array, string, or object empty?
    // An "empty" object has no enumerable own-properties.
    _.isEmpty = function (obj) {
        if (obj == null) return true;
        if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
        for (var key in obj) if (_.has(obj, key)) return false;
        return true;
    };

    // Is a given value a DOM element?
    _.isElement = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };

    // Is a given value an array?
    // Delegates to ECMA5's native Array.isArray
    _.isArray = nativeIsArray || function (obj) {
        return toString.call(obj) == '[object Array]';
    };

    // Is a given variable an object?
    _.isObject = function (obj) {
        return obj === Object(obj);
    };

    // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
    each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function (name) {
        _['is' + name] = function (obj) {
            return toString.call(obj) == '[object ' + name + ']';
        };
    });

    // Define a fallback version of the method in browsers (ahem, IE), where
    // there isn't any inspectable "Arguments" type.
    if (!_.isArguments(arguments)) {
        _.isArguments = function (obj) {
            return !!(obj && _.has(obj, 'callee'));
        };
    }

    // Optimize `isFunction` if appropriate.
    if (typeof (/./) !== 'function') {
        _.isFunction = function (obj) {
            return typeof obj === 'function';
        };
    }

    // Is a given object a finite number?
    _.isFinite = function (obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };

    // Is the given value `NaN`? (NaN is the only number which does not equal itself).
    _.isNaN = function (obj) {
        return _.isNumber(obj) && obj != +obj;
    };

    // Is a given value a boolean?
    _.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
    };

    // Is a given value equal to null?
    _.isNull = function (obj) {
        return obj === null;
    };

    // Is a given variable undefined?
    _.isUndefined = function (obj) {
        return obj === void 0;
    };

    // Shortcut function for checking if an object has a given property directly
    // on itself (in other words, not on a prototype).
    _.has = function (obj, key) {
        return hasOwnProperty.call(obj, key);
    };

    // Utility Functions
    // -----------------

    // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
    // previous owner. Returns a reference to the Underscore object.
    _.noConflict = function () {
        root._ = previousUnderscore;
        return this;
    };

    // Keep the identity function around for default iterators.
    _.identity = function (value) {
        return value;
    };

    _.constant = function (value) {
        return function () {
            return value;
        };
    };

    _.noop = function () {
    };

    _.property = function (key) {
        return function (obj) {
            return obj[key];
        };
    };

    // Returns a predicate for checking whether an object has a given set of `key:value` pairs.
    _.matches = function (attrs) {
        return function (obj) {
            if (obj === attrs) return true;
            for (var key in attrs) {
                if (attrs[key] !== obj[key])
                    return false;
            }
            return true;
        }
    };

    // Run a function **n** times.
    _.times = function (n, iterator, context) {
        var accum = Array(Math.max(0, n));
        for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
        return accum;
    };

    // Return a random integer between min and max (inclusive).
    _.random = function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    // A (possibly faster) way to get the current timestamp as an integer.
    _.now = Date.now || function () {
        return new Date().getTime();
    };

    // List of HTML entities for escaping.
    var entityMap = {
        escape: {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;'
        }
    };
    entityMap.unescape = _.invert(entityMap.escape);

    // Regexes containing the keys and values listed immediately above.
    var entityRegexes = {
        escape: new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
        unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
    };

    // Functions for escaping and unescaping strings to/from HTML interpolation.
    _.each(['escape', 'unescape'], function (method) {
        _[method] = function (string) {
            if (string == null) return '';
            return ('' + string).replace(entityRegexes[method], function (match) {
                return entityMap[method][match];
            });
        };
    });

    // If the value of the named `property` is a function then invoke it with the
    // `object` as context; otherwise, return it.
    _.result = function (object, property) {
        if (object == null) return void 0;
        var value = object[property];
        return _.isFunction(value) ? value.call(object) : value;
    };

    // Add your own custom functions to the Underscore object.
    _.mixin = function (obj) {
        each(_.functions(obj), function (name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function () {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result.call(this, func.apply(_, args));
            };
        });
    };

    // Generate a unique integer id (unique within the entire client session).
    // Useful for temporary DOM ids.
    var idCounter = 0;
    _.uniqueId = function (prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };

    // By default, Underscore uses ERB-style template delimiters, change the
    // following template settings to use alternative delimiters.
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };

    // When customizing `templateSettings`, if you don't want to define an
    // interpolation, evaluation or escaping regex, we need one that is
    // guaranteed not to match.
    var noMatch = /(.)^/;

    // Certain characters need to be escaped so that they can be put into a
    // string literal.
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\t': 't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    _.template = function (text, data, settings) {
        var render;
        settings = _.defaults({}, settings, _.templateSettings);

        // Combine delimiters into one regular expression via alternation.
        var matcher = new RegExp([
            (settings.escape || noMatch).source,
            (settings.interpolate || noMatch).source,
            (settings.evaluate || noMatch).source
        ].join('|') + '|$', 'g');

        // Compile the template source, escaping string literals appropriately.
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset)
                .replace(escaper, function (match) {
                    return '\\' + escapes[match];
                });

            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            }
            if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            }
            if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            index = offset + match.length;
            return match;
        });
        source += "';\n";

        // If a variable is not specified, place data values in local scope.
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

        source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + "return __p;\n";

        try {
            render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }

        if (data) return render(data, _);
        var template = function (data) {
            return render.call(this, data, _);
        };

        // Provide the compiled function source as a convenience for precompilation.
        template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

        return template;
    };

    // Add a "chain" function, which will delegate to the wrapper.
    _.chain = function (obj) {
        return _(obj).chain();
    };

    // OOP
    // ---------------
    // If Underscore is called as a function, it returns a wrapped object that
    // can be used OO-style. This wrapper holds altered versions of all the
    // underscore functions. Wrapped objects may be chained.

    // Helper function to continue chaining intermediate results.
    var result = function (obj) {
        return this._chain ? _(obj).chain() : obj;
    };

    // Add all of the Underscore functions to the wrapper object.
    _.mixin(_);

    // Add all mutator Array functions to the wrapper.
    each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
            return result.call(this, obj);
        };
    });

    // Add all accessor Array functions to the wrapper.
    each(['concat', 'join', 'slice'], function (name) {
        var method = ArrayProto[name];
        _.prototype[name] = function () {
            return result.call(this, method.apply(this._wrapped, arguments));
        };
    });

    _.extend(_.prototype, {

        // Start chaining a wrapped Underscore object.
        chain: function () {
            this._chain = true;
            return this;
        },

        // Extracts the result from a wrapped and chained object.
        value: function () {
            return this._wrapped;
        }

    });

    // AMD registration happens at the end for compatibility with AMD loaders
    // that may not enforce next-turn semantics on modules. Even though general
    // practice for AMD registration is to be anonymous, underscore registers
    // as a named module because, like jQuery, it is a base library that is
    // popular enough to be bundled in a third party lib, but not be part of
    // an AMD load request. Those cases could generate an error when an
    // anonymous define() is called outside of a loader request.
    if (typeof define === 'function' && define.amd) {
        define('underscore', [], function () {
            return _;
        });
    }
 

    function showCookiesMessage() {
        $.ajax({
          type: "GET",
          url: "/isEU"
        }).done(function(msg) {
            if(msg.isEU) {
                var cookies = document.cookie.split(';');
                var $cookiesElm = $('.cookies-notify');
                var turnedOff = false;
                for(i in cookies)  {
                    if(cookies[i].split('=')[0].trim() === 'cookiesMessage') {
                        turnedOff = true;
                        break;
                    }
                }
                if(!turnedOff) {
                    $(window).on('load', function() {
                        $cookiesElm.animate({bottom: "+=70"}, 900).show('slow');
                    });
                    $cookiesElm.on('click', function() {
                       var that = $(this);

                        that.animate({bottom: "-=70"}, 500, 'linear', function() {
                            var a = new Date();
                            expDate = new Date(a.getTime() +1000*60*60*24*3650);
                            document.cookie="cookiesMessage=off; expires=" + expDate.toGMTString() + ";";
                        }).hide('slow');
                    });
                }
            }
        });
    }

    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }

    function hasClass(el, selector) {
        var className = " " + selector + " ";
        return (" " + el.getAttribute("class") + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1;
    }

    function subscribeMailing(form, url, callback) {

        var $subscribe = $('.subscribe'),
            $input = $(form + ' .email-input'),
            $button = $(form + ' .submit-button'),
            $msgBox = $(form + ' .mailchimp-message'),
            $sicons = $(form + ' .social-icons'),
            $turnOff = $('.nopreorderforyou .turn-off'),
            msgs = {
                BADEMAIL: "It looks like you gave us invalid email adress.",
                ERROR: "Ooops. Something went wrong. Sorry. :/",
                INUSE: "We already have you in our contacts list.",
                SUCCESS: "Congrats! You are subscribed."
            };

        var makeInvisible = function($elm) {
            if($elm.hasClass('js-visible')) {
                $elm.removeClass('js-visible').addClass('js-invisible');
            }
        }

        var makeVisible = function($elm) {
            if($elm.hasClass('js-invisible')) {
                $elm.removeClass('js-invisible');
            }
            $elm.addClass('js-visible');
        }

        $turnOff.removeClass('rotate');

        $input.on('focus', function() {
            makeInvisible($msgBox);
            makeInvisible($sicons);
            $turnOff.removeClass('rotate');
        });

        $input.on('input', function() {
            makeInvisible($msgBox);
            makeInvisible($sicons);
            $turnOff.removeClass('rotate');
        });

        var mailingEvent = function(e) {
            e.preventDefault();

            var emailVal = $(form + ' .email-input').val();

            if(isEmail(emailVal)) {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: { email: emailVal}
                }).done(function( msg ) {
                    var message
                    if(msg.code === 200) {
                        makeVisible($msgBox);
                        makeVisible($sicons);
                        $turnOff.addClass('rotate');
                        $msgBox.text(msgs.SUCCESS);
                        message = 'Success';
                    } else if(msg.code === 505) {
                        makeVisible($msgBox);
                        $msgBox.text(msgs.INUSE);
                        message = 'InUse';
                    } else if (msg.code === 555) {
                        makeVisible($msgBox);
                        $msgBox.text(msgs.ERROR);
                        message = 'Error';
                    }

                    if( typeof callback === 'function') {
                        callback(message);
                    }
                });
            } else {
                makeVisible($msgBox);
                $msgBox.text(msgs.BADEMAIL);
            }

        }

        $button.on('click', function(e) {
            mailingEvent(e);
        });
    }

    function preorderPopup() {

        var $nopreorder = $('.nopreorderforyou'),
            $button     = $('.intro .preorder');

        $button.on('click', function(e) {
            e.preventDefault();
            $nopreorder.fadeIn('slow');

            $nopreorder.find('.turn-off').on('click', function() {
                $nopreorder.fadeOut('slow');
            });
        });

    }

    $(document).on('ready', function() {

        showCookiesMessage();
        preorderPopup();
        subscribeMailing('.nopreorderforyou .mailing-subscribe-form', "/nopreorder", function(msg) {
            ga('send', 'event', 'mail', 'subscribe', msg);
        });
        subscribeMailing('footer .inside .mailing-subscribe-form', "/mail");

    });

}).call(this);

}

 