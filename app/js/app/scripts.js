define(["jquery"], function($) {
windowState = 'large';

  var iPhoneFlag = false;
  if ( navigator.userAgent.match(/iPhone|iPod/) ){
    iPhoneFlag = true;
  }


/*
 * Screen Width Button (for development only. Located in the head)
 */
    $('#screenWidth').click(function(){
        var viewport = {
            width : $(window).width(),
            height : $(window).height()
        };

        var width = viewport.width;
        var height = viewport.height;

        alert("width: " + width);
    });

    $('.entry iframe').wrap('<div class="embed-container" />');

    if( iPhoneFlag ) {
        var mohi_url = "comgooglemaps://?center=37.713924,-122.187849&zoom=14&views=traffic";

        $('#mohi_map').attr("href", mohi_url);
    }

    // Show or hide the sticky footer button
      $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
          $('#goTop').fadeIn(200);
        } else {
          $('#goTop').fadeOut(200);
        }
      });

    //scroll to the top
    $('#goTop').click(function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 1000);
    });


    /**
     * @description Call different functions based on screen width
     */
    //variable to hold the current window state - small, medium, or large

    //check initial width of the screen
      var sw = document.body.clientWidth;
      if (sw < 501){
        windowState = 'small';
        smPage();
      }else if (sw >= 501 && sw <= 900){
        windowState = 'medium';
        medPage();
      }else {
        windowState = 'large';
        lgPage();
      }
      if($('#map_canvas').length) {
        //loadScript();
      }

      $('#foodButton').on('click', function(e) {
        e.preventDefault();
        drop();
      });


//take care of window resizing
  $(window).resize(function(){
    var sw = document.body.clientWidth;
    if(sw < 501 && windowState != 'small'){
      smPage();
    }
    if(sw >= 501 && sw <= 900 && windowState != 'medium'){
      medPage();
    }
    if(sw >= 901 && windowState != 'large'){
      lgPage();
    }
  });

/**
 *@description Calls smPage() on screen width less than 31.3135em
 *
 */
function smPage() {
    console.log('small page');
    windowState = 'small';
}

/**
 * @description Calls medPage() on screen width greater than 31.25em and less than 50em
 *
 */
function medPage() {
    console.log('medium page');

    windowState = 'medium';
}
 /**
  * @description Calls lgPage() on screen width greater than 901px.
  *
  */
function lgPage() {
    console.log('large page');

    windowState = 'large';
}



});// end define for require.js








