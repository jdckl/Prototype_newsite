$( document ).ready(function() {
  $(window).trigger('scroll');

  setTimeout(function()
  {$( "canvas" ).addClass( "opashow" );}, 800);

  $(window).scroll(function(){
    $("#intro").css("opacity", 1 - $(window).scrollTop() / 500);
  });
});
