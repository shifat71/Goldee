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

/*
Plugin: jQuery Parallax
Version 1.1
Author: Ian Lunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

//function that places the navigation in the center of the window
function RepositionNav(){
	var windowHeight = $(window).height(); //get the height of the window
	var navHeight = $('#nav').height() / 2;
	var windowCenter = (windowHeight / 2);
	var newtop = windowCenter - navHeight;
	$('#nav').css({"top": newtop}); //set the new top position of the navigation list
}


(function( $ ){
	$.fn.parallax = function(xpos, adjuster, inertia, outerHeight) {

function inView(pos, element){

	element.each(function(){ //for each selector, determine whether it's inview and run the move() function

		var element = $(this);
		var top = element.offset().top;

		if(outerHeight == true){
			var height = element.outerHeight(true);
		}else{
			var height = element.height();
		}

		//above & in view
		if(top + height >= pos && top + height - windowHeight < pos){
			move(pos, height);
		}

		//full view
		if(top <= pos && (top + height) >= pos && (top - windowHeight) < pos && top + height - windowHeight > pos){
			move(pos, height);
		}

		//below & in view
		if(top + height > pos && top - windowHeight < pos && top > pos){
			move(pos, height);
		}
	});
}

		var $window = $(window);
		var windowHeight = $(window).height();
		var pos = $window.scrollTop(); //position of the scrollbar
		var $this = $(this);

		//setup defaults if arguments aren't specified
		if(xpos == null){xpos = "50%"}
		if(adjuster == null){adjuster = 0}
		if(inertia == null){inertia = 0.1}
		if(outerHeight == null){outerHeight = true}

		height = $this.height();
		$this.find('img').css({'top': newPos(xpos, outerHeight, adjuster, inertia)});

		function newPos(xpos, windowHeight, pos, adjuster, inertia){
			return Math.round((-((windowHeight + pos) - adjuster) * inertia) + 10) + "px";
		}

		//function to be called whenever the window is scrolled or resized
		function move(pos, height){
			var img = $this.find('img')
			img.css({'top': newPos(xpos, height, pos, adjuster, inertia)});
		}

			var d = _.debounce(function() {
				var pos = $window.scrollTop(); //position of the scrollbar
				inView(pos, $this);
			}, 5);

		$window.scroll(function(){ //when the user is scrolling...
			d();
		})
	}
})( jQuery );

} 