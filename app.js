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

var GoldeeBlog = (function() {

	var fullheight = '.js-fullheight',
		heightfix  = '.js-heightfix';

	function detectUA(name){
	    var uagent = navigator.userAgent.toLowerCase();
	    return uagent.search(name) > -1;
	}

    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }

	function isSmartphone(){
	    if (detectUA("android")) return true;
	    else if (detectUA("blackberry")) return true;
	    else if (detectUA("iphone")) return true;
	    else if (detectUA("opera")) return true;
	    else if (detectUA("palm")) return true;
	    else if (detectUA("ipad")) return true;
	    else if (detectUA("ipod")) return true;
	    return false;
	}

	function isScreenBig(size) {
		return (!isSmartphone() && (window.innerHeight >= size && window.innerWidth >= size));
	}

	function setFullheight(fullheight) {
		if (!isSmartphone()) {
			$(fullheight).height(window.innerHeight);
		} else {
			$(fullheight).css({
				height: 'auto'
			});
		}
	}

    function setPerexHeight(perexheight) {
		if (!isSmartphone()) {
			$(perexheight).height(Math.floor(window.innerHeight * 0.4));
		} else {
			$(fullheight).css({
				height: 'auto'
			});
		}
    }

	function fixHeight(heightfix) {
		if (isSmartphone()) {
			$('.blog__post__header__overlay').height($(heightfix).outerHeight());
		} else {
			$('.blog__post__header__overlay').css({
				height: '100%'
			});
		}
	}

    function subscribe() {

        $('.subscribe-form .email-input').focus(function() {
            $('.subscribe').removeClass('js-email-subscribed');
            $('.subscribe').removeClass('js-email-already-use');
            $('.subscribe').removeClass('js-email-error');
            $('.subscribe').removeClass('js-email-bad-email');

        });

        $('.subscribe-form .email-input').on('input', function () {
            $('.subscribe').removeClass('js-email-subscribed');
            $('.subscribe').removeClass('js-email-already-use');
            $('.subscribe').removeClass('js-email-error');
            $('.subscribe').removeClass('js-email-bad-email');
        });

        var send = $('.subscribe-form .submit-button');
        send.click(function(e) {
            e.preventDefault();

            var emailVal = $('.subscribe-form .email-input').val();

            if(isEmail(emailVal)) {
                $.ajax({
                    type: "POST",
                    url: "/mail",
                    data: { email: emailVal}
                }).done(function( msg ) {
                    var message;
                    if(msg.code === 200) {
                        //console.log('ok');
                        $('.subscribe').addClass('js-email-subscribed');
                        message = "Success";
                    } else if(msg.code === 505) {
                        //console.log('already in use');
                        $('.subscribe').addClass('js-email-already-use');
                        message = "InUse";
                    } else if (msg.code === 555) {
                        //console.log('error');
                        $('.subscribe').addClass('js-email-error');
                        message = "Error";
                    }
                    ga('send', 'event', 'mail', 'subscribe', message);
                });
            } else {
                $('.subscribe').addClass('js-email-bad-email');
            }

        });
    }

    //<editor-fold desc="enableSpecialScroll v 3.0">
    /**
     * @param $blogPosts jQuery $(selector)
     * @author Lukas Melega
     *
     RESOURCES for optimizations:
     =============================
     http://jsperf.com/pure-js-hasclass-vs-jquery-hasclass/2                    Pure js hasClass vs jQuery hasclass
     http://jsperf.com/jquery-addclass-and-hasclass-vs-add-attribute-and-cs     jquery addClass and hasClass vs add attribute and css
     http://jsperf.com/jquery-css-vs-addclass-speed/2                           jQuery CSS vs addClass speed
     http://jsperf.com/d-jq-css-vs-d-js-style                                   Compare $.css vs domEl.style
     */
    function enableSpecialScroll($blogPosts) {
        var CSS = {FIXED: "blog__post__scrollFixed", NORMAL: "blog__post__scrollNormal"};
        var $allPosts = $blogPosts, actualElem,
            allPostsOffsets = [],  positionTops = [], i;

        for (i = 0; i < $allPosts.length; ++i) {
            $allPosts[i].style['margin-bottom'] = (i === $allPosts.length-1) ? '0px' : /*'256px'*/ $allPosts[i].style['margin-bottom'] ;
            actualElem = $($allPosts[i]);
            positionTops.push(actualElem.offset().top);
            allPostsOffsets.push(actualElem.offset().top + ((i==0) ? (actualElem.outerHeight() - $(window).height()) : 0 ));
        }

        for (i = 0; i < $allPosts.length; ++i) {
            $allPosts[i].className = ($allPosts[i].className.indexOf(CSS.NORMAL) != -1) ? $allPosts[i].className : ($allPosts[i].className + ' ' + CSS.NORMAL);
            $allPosts[i].style.top = '' + positionTops[i] + 'px' ;
        }

        function hasClass(el, selector) {
            var className = " " + selector + " ";
            return (" " + el.getAttribute("class") + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1;
        }

        /**
         * Returns a basic info about actual element (blog post).
         * This returned object contains only necessary data for next processing
         * (index and offset of blog post element)
         * @param winScrollTop number
         * @returns {{offset: number, index: number|undefined}}
         */
        function getActualElementScrollInfo(winScrollTop) {
            var info = { offset: 999999, index: undefined };
            for (i = allPostsOffsets.length; i >= 0 ; i--) {
                if (winScrollTop > allPostsOffsets[i]) {
                    info.offset = allPostsOffsets[i];
                    info.index  = i;
                    break;
                }
            }
            return info;
        }

        var specialScrollEventFunction = function() {
            var scrollPos = $(window).scrollTop();
            var actualElInfo = getActualElementScrollInfo(scrollPos);
            if (scrollPos >= actualElInfo.offset && hasClass($allPosts[actualElInfo.index], CSS.NORMAL)) {
                if (actualElInfo.index === 0) {
                    $allPosts[0].className = $allPosts[0].className.replace(CSS.NORMAL, CSS.FIXED);
                    $allPosts[0].style.top = '' + (0-(allPostsOffsets[0]-positionTops[0])) + 'px';
                }
                else if(actualElInfo.index < $allPosts.length - 1) {
                    $allPosts[actualElInfo.index].className = $allPosts[actualElInfo.index].className.replace(CSS.NORMAL, CSS.FIXED);
                    $allPosts[actualElInfo.index].style.top = '0px';
                }
                // fix
                i = 1 + ((actualElInfo.index) ? actualElInfo.index : 0);
                $allPosts[i].className = $allPosts[i].className.replace(CSS.FIXED, CSS.NORMAL);
                $allPosts[i].style.top = '' + positionTops[i] + 'px';
            }
            else if (scrollPos >= actualElInfo.offset && hasClass($allPosts[actualElInfo.index], CSS.FIXED)) {
                // fix
                i = 1 + ((actualElInfo.index) ? actualElInfo.index : 0);
                $allPosts[i].className = $allPosts[i].className.replace(CSS.FIXED, CSS.NORMAL);
                $allPosts[i].style.top = '' + positionTops[i] + 'px';
                for (i; i < $allPosts.length; i++) {
                    if (hasClass($allPosts[i], CSS.FIXED)) {
                        console.log('>> ' + i);
                        $allPosts[i].className = $allPosts[i].className.replace(CSS.FIXED, CSS.NORMAL);
                        $allPosts[i].style.top = '' + positionTops[i] + 'px';
                    }
                }

            }
            else  {
                $allPosts[0].className = $allPosts[0].className.replace(CSS.FIXED, CSS.NORMAL);
                $allPosts[0].style.top = '' + positionTops[0] + 'px';

                for (i=0; i < $allPosts.length; i++) {
                    if (hasClass($allPosts[i], CSS.FIXED)) {
                        console.log('>>> ' + i);
                        $allPosts[i].className = $allPosts[i].className.replace(CSS.FIXED, CSS.NORMAL);
                        $allPosts[i].style.top = '' + positionTops[i] + 'px';
                    }
                }
            }

        };

        $(window).scroll(specialScrollEventFunction);
    }
    //</editor-fold>


    function enableSpecialScroll_delayed($blogPosts, delayMilliseconds) {
        setTimeout(function() {
            enableSpecialScroll($blogPosts);
        }, delayMilliseconds);
    }

    return {
		init: function() {
			$(document).on('ready', function() {
                subscribe();
				if (isScreenBig(500)) {
					$('.js-parallax').parallax("50%", 1000, 0.25, true);
				 }
				setFullheight(fullheight);
                setPerexHeight('.js-first-perex');
				fixHeight(heightfix);
                $(window).on('resize', function (e) {
                    setFullheight(fullheight);
					fixHeight(heightfix);
                    if(!isSmartphone()) {
                        enableSpecialScroll_delayed($('.blog > .blog__post'), 1000);
                    }
				});

				$('.blog--detail .blog__post__header__content').find('a').click(function(e) {
					e.preventDefault();
					$.scrollTo($('#post-content').position().top, 550);
				});

                if(!isSmartphone()) {
                    enableSpecialScroll_delayed($('.blog > .blog__post'), 1000);
                }
			});
		}
	}

})();

// Fire!
GoldeeBlog.init();

} 