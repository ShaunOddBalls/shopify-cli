  //   $(document).arrive('#conjured_friend_signup', function() {
  //     $(this).appendTo('#refer-a-friend-widget');
  // });
  

$(document).ready(function() {
  
$('body').on('click', '.js-refer-modal', function(event) {
  event.preventDefault(); // Prevent the default action
  $('#refer-a-freind-modal').toggleClass('hidden fixed');
});

$('#conjured_redemption').appendTo('#refer-a-friend-widget');
$(window).scrollTop($('#shopify-section-ob-refered-friend-hero-banner').offset().top);

  
})