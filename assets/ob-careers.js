$(document).ready(function() {
   
 $('body').on('click', '.open-popup', function() {
   var elements = $('[id*="theme_job_modal_wrapper-"]');

    // Move each element to the div with class "page-popup"
    elements.each(function () {
        console.log('Moving.........')
        $('#page-popup').append($(this)); // Move the element directly
    });
   
        // do something
         var popupid = $(this).data('popup');
        var popupid = $(this).data('popup');
        var popup = document.getElementById(popupid)

          
         console.log('popupid: ', popupid)
         console.log('popup: ', popup )
         openPopup(popup)
    });

});