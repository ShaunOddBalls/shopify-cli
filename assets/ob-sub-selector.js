$(document).ready(function () {
  var membershipCriteria = "";
  var subscriptionCriteria = "";
  var designCriteria = "";
  var sizeCriteria = "";
  var jsonData = [];
  var filteredData = [];
  var activeSelectionFunctionRunCount = 0
  var designSelection = "adventurous"
  let debug = true;

  
 function addSubQuickBuy(array) {
    try {
       
        if (array.length === 1) {
            inatialLoader()
            var product = array[0];
            var productHandle = product.product.handle;
            let url = "/products/" + productHandle + "?view=qb-ss";
            fetch(url)
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.text();
            })
            .then(data => {
              inatialLoader()
              var $quickbuy = $('<div></div>').html(data);

              // Now you can manipulate the content using jQuery
              $quickbuy.find('.product-form').removeClass('bg-white');
              $quickbuy.find('.qb-header').addClass('bg-white');
              $quickbuy.find('.size-name').eq(0).text('4. Select Size');
              $quickbuy.find('.size-name').eq(1).text('5. Select Sock Size');
              $quickbuy.find('.product-option').eq(1).addClass('pt-6');
              $quickbuy.find('.space-y-6.p-6.py-4').removeClass('p-6')
              $quickbuy.find('#quantity-selector').addClass('bg-white')
              $quickbuy.find('.selling-plan-group').addClass('hidden')
              $quickbuy.find('.flex.flex-shrink-0.justify-end.px-6 ').removeClass('px-6 py-6')
              $quickbuy.find('.overflow-y-auto').removeClass('overflow-y-auto')
              

              $('#sas-product-container').html($quickbuy.html());
              
            })
        }else{
          $('#sas-product-container').empty()
        }
    } catch (addQuickBuyErr) {
        console.error('Sub and save quick buy error:', addQuickBuyErr);
    }
}

  
  // filter function
  function filterVariants(data, filterTags) {
    try{
    // data = filteredData.length > 0 ? filteredData : data;
    var wrongScriptionType = false
    var tags = ""
    var filteredVariants = [];
    $.each(data, function(index, product) {
      tags = product.product.tags.split(",").map(function(item) {
        if(item.trim().toLowerCase() == "06monthprepaidsubscription" || item.trim() == "12monthprepaidsubscription"){
          wrongScriptionType = true
        }
        return item.trim();
      });

        $.each(tags, function(i, tag) {
            if(tag.toLowerCase() == filterTags.toLowerCase() && !wrongScriptionType ){
                filteredVariants.push(product); // Add the product to the filteredVariants array
            }
        });
    });
    console.log("filtered by " + filterTags, filteredData)
    return filteredVariants;
    }catch(FilterVariantsError){
      console.log("Error filtering Variants: " + FilterVariantsError)
    }
}

  function findProducts(jsonData, membershipCriteria, subscriptionCriteria, designCriteria ){
    try{
    var data = jsonData
    if(membershipCriteria != "" ) data = filterVariants(data, membershipCriteria)
    if(subscriptionCriteria != "" ) data = filterVariants(data, subscriptionCriteria)
    if(designCriteria != "" ) data = filterVariants(data, designCriteria)
    addSubQuickBuy(data)
    return data
    }catch(findProductErr){
      console.log('error finding products: ' + findProductErr)
    }
  }

  function inatialLoader(){
    if ($('#sas-product-container').is(':empty')) {
        $('#intail-product-loader').removeClass('hidden')
    }else{
        $('#intail-product-loader').addClass('hidden')
    }
  }
  
  function getActiveSelection(){
    activeSelectionFunctionRunCount = activeSelectionFunctionRunCount + 1
    membershipCriteria = $('#option .active-selection').data('nav-id') ? $('#option .active-selection').data('tags') : "";
    subscriptionCriteria = $('#options-1').find('.active-selection').data('product-type') ? $('#options-1').find('.active-selection').data('product-type') : "";
    designCriteria = $('#options-2').find('.active-selection').data('design') ? "style-" + $('#options-2').find('.active-selection').data('design') : "";
    designSelection = $('#options-2').find('.active-selection').data('design') ?  $('#options-2').find('.active-selection').data('design') : designSelection
    filteredData = findProducts(jsonData, membershipCriteria, subscriptionCriteria ,designCriteria )
  }

    
  
// $('body').on('click', '.js-sub-design,.js-sub-select', function() {
//     changeProductLoadingScreen();
// });
  
    function moveSlider(element, position, text) {
  
      // Calculate the translateX value
      var translateXVal = ((position) * 99) + "%";
      
      // Update the element's HTML content
      element.html(text);


      if (text.toLowerCase() === 'patterned') {
            element.addClass('patterned');
            element.removeClass('plain');
        } else if (text.toLowerCase() === 'plain') {
            element.addClass('plain');
            element.removeClass('patterned');
        }
      // Apply the transform
      element.css('transform', `translate(${translateXVal}, -50%)`);
      
    }


  
    // Step 1 Show hide next step based on selection
  $('.js-sub-tab').click(function() {
  
    $('#sub-n-save-options').removeClass('hidden');
    
    // Remove the active classes from all .js-sub-tab elements
    $('.js-sub-tab').removeClass('active-selection');
    // Add the active classes to the clicked element
    $(this).addClass('active-selection');
    
    var selectedNavId = $(this).data('nav-id');
    var position = $(this).index();
    $(this).siblings('.selection-tab-selection').removeClass('hidden')
    moveSlider( $(this).siblings('.selection-tab-selection'),  position ,selectedNavId)
    
    $('#default-options').addClass('hidden')
    $('#options-2').addClass('hidden')
    $('#options-1').find('.active-selection').removeClass('active-selection')
    $('#options-2').find('.active-selection').removeClass('active-selection')
    
    // Iterate over all elements with a data-tab attribute
    $('[data-tab]').each(function() {
      // Get the data-tab value of the current element
      var tabValue = $(this).data('tab');
      if (tabValue !== selectedNavId) {
        $(this).addClass('hidden');
      } else {
        $(this).removeClass('hidden');
        
      if ($(this).find('.js-sub-select').length == 1) {
           $(this).find('.js-sub-select').click();
       }else{
            getActiveSelection()
       }
      
      }
    });
  });

  // Step 2 Show hide next step based on selection
  $('.js-sub-select').click(function() {
    $('.js-sub-select').removeClass('active-selection');
    $(this).addClass('active-selection');
    $('#options-2').find('.active-selection').removeClass('active-selection')

    // Get the data-tab attribute value from the closest ancestor div
    var dataTabValue = $(this).closest('div[data-tab]').data('tab');
    var addClick = false
    // Show or hide options based on the data-add-design attribute
    if ($(this).data('add-design') == true) {
      addClick = true;
      $('#options-2').removeClass('hidden')
      $('#default-options').addClass('hidden')
    } else {
      $('#options-2').addClass('hidden')
      $('#default-options').removeClass('hidden')
    }
    
    // Find elements with data-tab-2 attribute and toggle hidden class
    
    $('[data-tab-2]').each(function() {
      $(this).addClass('hidden')
      if ($(this).data('tab-2') === dataTabValue) {
        $(this).find('.js-sub-design').each(function(){
          if($(this).data('design') == designSelection && addClick){
            $(this).click()
          }
        })
        $(this).removeClass('hidden');
      } else {
        $(this).addClass('hidden');
      }

    });

    
    getActiveSelection()
    
  });

  // Sep 3 Show hide next step Based on Selection
  $('.js-sub-design').click(function() {
    var text = $(this).html();
    console.log('Inner Text', text)
     var position = $(this).index();
    moveSlider( $(this).siblings('.selection-tab-selection'),  position ,text)
    $('.js-sub-design').removeClass('active-selection');
    $(this).addClass('active-selection');
    getActiveSelection()
  });
 
  // Function to fetch JSON data
  function fetchData() {
    $.ajax({
      url: 'https://oddballs-data--development.gadget.app/apps/oddballs-data/collection?handle=oddballs-subscriptions',
      method: 'GET',
      dataType: 'json',
      success: function(data) {
        //console.clear()
        // Adjust this part based on the actual structure
        jsonData = data.items || data;
        
        $.each(jsonData.products, function(index, product) {
            let bodyHtml = product.product.body_html.toLowerCase(); // Corrected toLowerCase
            let title = product.product.title.toLowerCase();       // Corrected toLowerCase
            if (!bodyHtml.includes("recharge subscriptions") && !title.includes("auto renew") && !title.includes('g2')) {
                filteredData.push(product); // Push product to filteredData if conditions are met
            }
        });

        jsonData = filteredData
    
        $("#sub-n-save-options").find('.load-animate').removeClass('load-animate')
        // You can now filter the jsonData array later as needed
      },
      error: function(error) {
        console.error('Error fetching data', error);
      }
    });
  }

  fetchData();

  $('[data-design]').each(function(){
    if($(this).data('design') == "adventurous"){
      $(this).text('Patterned')
      $(this).addClass('ob-bg-gradient')
    }
    if($(this).data('design') == "classic"){
      $(this).text('Plain')
      $(this).addClass('ob-hover-plain')
    }
    
  })

  


 

    new Swiper('.info-slider', {
      slidesPerView: 3,
      slidesPerGroup: 3,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      speed: 1000,
    });


});
