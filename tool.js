$(document).keydown(function(e){
    if (e.which == 37) {
       $('#left').click();
       return false;
    } else if(e.which == 39) {
       $('#right').click();
		return false;
	} else if(e.which == 40 && $("#elim").attr('class') == 'ingame') {
       $('#skip').click();
		return false;
	}
});


/*
 * Image preview script
 * powered by jQuery (http://www.jquery.com)
 *
 * written by Alen Grakalic (http://cssglobe.com)
 *
 * for more info visit http://cssglobe.com/post/1695/easiest-tooltip-and-image-preview-using-jquery
 *
 */
