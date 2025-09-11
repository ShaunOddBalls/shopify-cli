$(document).ready(function () {
  //console.clear()
  console.log('Gifting')
    var activeSelector = ""
    var membershipCriteria = ""
    var subscriptionCriteria = ""
    var lengthCriteria = ""
    var designCriteria = ""
    var cardCriteria = ""
    var giftingFilteredData = [];
    var jsonGiftingData = [];
    var jsonData = [];

  $('body').on('click', '.slider-control', function () {
    var position = $(this).index();
    var text = $(this);  // 'this' is the current jQuery element

    // Clone the element to preserve the original and modify the copy
    var updatedText = text.clone();

    // Remove the .sale-tag from the clone
    updatedText.find('.sale-tag').remove();

    // Get the updated HTML of the cloned element (without .sale-tag)
    var updatedHtml = updatedText.html();

    var translatePositionX = (position * 100) + "%";
    var slider = $(this).siblings('.selection-tab-selection');

    // Set the transform property to move the slider
    slider.css('transform', `translate(${translatePositionX}, -50%)`);

    // Insert the modified inner HTML into the slider
    slider.html(updatedHtml);

    // Adjust the position based on the index
    if (position > 0) {
        slider.css('left', '-1%');
    } else {
        slider.css('left', '1%');
    }

    // Remove the 'hidden' class if present
    if (slider.hasClass("hidden")) {
        slider.removeClass('hidden');
    }

       // Remove the 'hidden' class if present
    if (slider.hasClass("hidden")) {
        slider.removeClass('hidden');
    }

     $('.product-variant').removeClass('active-selection');
     if ($(event.target).closest('.product-variant').length) {
      $(this).addClass('active-selection');

      console.log('Click is inside .product-variant');
    }
});




  // Gets all active selections
  function getActiveSelections(){
      activeSelector = $('.js-main-tab.active-selection').data('tags')
      if(activeSelector == 'Pre-PaidSubscriptionType'){
         lengthCriteria = $('#redeem').find('.js-sub-length-tab.active-selection').data('tags')? $('#redeem').find('.js-sub-length-tab.active-selection').data('tags') : "Pre-PaidSubscriptionType";
         membershipCriteria = $('#redeem').find('.js-sub-tab.active-selection').data('tags')? $('#redeem').find('.js-sub-tab.active-selection').data('tags') : "";
         subscriptionCriteria = $('#redeem').find('.js-sub-select.active-selection').data('product-type')? $('#redeem').find('.js-sub-select.active-selection').data('product-type') : "";
         designCriteria = $('#redeem').find('.js-sub-design.active-selection').data('tags')? $('#redeem').find('.js-sub-design.active-selection').data('tags') : "";
         cardCriteria = ""
      }else{
        cardCriteria =  $('#gift').find('.js-sub-card-tab.active-selection').data('tags')? $('#gift').find('.js-sub-card-tab.active-selection').data('tags') : "";
        if(cardCriteria == 'type-physical-gift-subscription'){  
          lengthCriteria = $('#gift').find('.js-sub-length-tab.active-selection').data('tags')? lengthCriteria = $('#gift').find('.js-sub-length-tab.active-selection').data('tags') : "";
        }else{
          lengthCriteria = ""
        }
        membershipCriteria = $('#gift').find('.js-sub-tab.active-selection').data('tags')? $('#gift').find('.js-sub-tab.active-selection').data('tags') : "";
        subscriptionCriteria = $('#gift').find('.js-sub-select.active-selection').data('product-type')? $('#gift').find('.js-sub-select.active-selection').data('product-type') : "";
        designCriteria = ""
      }
      findProducts(giftingFilteredData)
    }
    
    // Adds quickbuy when array gets to one product
        function addSubQuickBuy(array) {
          try{
              if (array.length === 1) {
                  $('#sas-product-container').empty()
                  inatialLoader()
            
                  var product = array[0];
                  var productHandle = product.product.handle;
                  let view = ""
                  if(cardCriteria == "type-digital-gift-subscription"){
                    view = "?view=qb-gift-subscription"
                  }else{
                    view = "?view=qb-ssg"
                  }
                  let url = "/products/" + productHandle + view;
                  console.log("URL: ", url )
                  fetch(url)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                    return response.text();
                  })
                  .then(data => {
                    var $quickbuy = $('<div></div>').html(data);
      
                    // add elements into 
                    if(cardCriteria == "type-physical-gift-subscription"){
                      $quickbuy.find('.product-form').removeClass('bg-white');
                      $quickbuy.find('.qb-header').addClass('bg-white');
                      $quickbuy.find('.typography.typography--body-md.uppercase.mb-2.font-semibold').eq(0).text('4. Select Underwear Size');
                      $quickbuy.find('.typography.typography--body-md.uppercase.mb-2.font-semibold').eq(1).text('5. Select Sock Size');
                      $quickbuy.find('.product-option').eq(1).addClass('pt-6');
                      $quickbuy.find('.space-y-6.p-6.py-4').removeClass('p-6')
                      $quickbuy.find('#quantity-selector').addClass('bg-white')
      
                      $quickbuy.find('.flex.flex-shrink-0.justify-end.px-6 ').removeClass('px-6 py-6')
                      $quickbuy.find('#product-variants').addClass('hidden')
                    
                    }else{
                    $quickbuy.find('legend').remove()
                    $quickbuy.find('.size-name').eq(1).text('5. Select Your Subscription Length');
                   
                    
                    }
                    
                    

                    
      
                    
                    $('#sas-product-container').html($quickbuy.html());

                    const script = $('#sas-product-container').get(0).querySelector('script');
                      if (script) {
                        if (script.src) {
                          // For external scripts, load it dynamically
                          const newScript = document.createElement('script');
                          newScript.src = script.src;
                          document.body.appendChild(newScript);
                        } else {
                          // For inline scripts, execute the content
                          new Function(script.textContent)();
                        }
                      }

                    
                    inatialLoader()
                    if( activeSelector != 'Pre-PaidSubscriptionType'){
                    setTimeout(function() {
                      $('#sas-product-container').find('input[type="radio"]').eq(0).trigger('click');
                    }, 200); 
                    }                    
                  })
              }else{
                $('#sas-product-container').empty()
              }
          } catch (addQuickBuyErr) {
              console.error('Sub and save quick buy error:', addQuickBuyErr);
          }
      }
  

  // displays the next step 
  function displayNextStep(element, tab) {
      if (element) {  // Check if the element string is valid
          var lastChar = element.slice(-1);  // Get the last character of the string
          if ($.isNumeric(lastChar)) {  // Check if the last character is a digit
              var incrementedChar = parseInt(lastChar) + 1;  // Increment the numeric value
              var newId = element.slice(0, -1) + incrementedChar;  // Construct the new id
              var nextStep = '#' + newId;  // Add # to the new id
              var currentCards = $(nextStep).find('[data-tab="' + tab + '"]')
              // Show the new step
              $(nextStep).removeClass('hidden');              
              $(nextStep).find('[data-tab]').addClass('hidden');  // Hide all elements with the data-tab attribute
              $(nextStep).find('[data-tab="' + tab + '"]').removeClass('hidden');  // Show elements that match the tab value
            
          } else {
              console.warn('The last character of the ID is not numeric:', lastChar);  // Warn if lastChar is not numeric
          }
      } else {
          console.warn('The provided element is invalid.');  // Warn if element is not provided
      }
  }

  // Filters out products 
  function filterVariants(data, filterTags) {
    try{
    // data = filteredData.length > 0 ? filteredData : data;
    var wrongScriptionType = false
    var tags = ""
    var filteredVariants = [];
    

    $.each(data, function(index, product) {
      wrongScriptionType = false
      tags = product.product.tags.split(",").map(function(item) {
        if(item.trim() == "tag"){
          wrongScriptionType = true
        }
        return item.toLowerCase().trim();
      });
        $.each(tags, function(i, tag) {
            if (tag == filterTags.toLowerCase() && !wrongScriptionType ) {
                filteredVariants.push(product); // Add the product to the filteredVariants array
            }
        });
    });
    console.log("Fliter Tabs: " + filterTags , filteredVariants)
    return filteredVariants;
    }catch(FilterVariantsError){
      console.log("Error filtering Variants: " + FilterVariantsError)
    }
}

  // inital product loader 
  function inatialLoader(){
    if ($('#sas-product-container').is(':empty')) {
        $('#intail-product-loader').removeClass('hidden')
        $()
    }else{
        $('#intail-product-loader').addClass('hidden')
    }
  }

  // Filters out the active selectors 
  function findProducts(jsonData){
    try{
      var data = jsonData
      if(activeSelector != "" ) data = filterVariants(data, activeSelector)
      if(cardCriteria != "" ) data = filterVariants(data, cardCriteria)
      if(membershipCriteria != "" ) data = filterVariants(data, membershipCriteria)
      if(subscriptionCriteria != "" ) data = filterVariants(data, subscriptionCriteria)
      if(designCriteria != "" ) data = filterVariants(data, designCriteria)
      if(lengthCriteria != "" ) data = filterVariants(data, lengthCriteria)
      
      addSubQuickBuy(data)
      console.log(data)
      return data
    }catch(findProductErr){
      console.log('error finding products: ' + findProductErr)
    }
  }

  // Function to fetch the first set of data
  function fetchData1() {
        return $.ajax({
            url: 'https://oddballs-data--development.gadget.app/apps/oddballs-data/collection?handle=oddballs-subscriptions',
            method: 'GET',
            dataType: 'json'
        });
    }
    
  // Function to fetch the second set of data
  function fetchData2() {
        return $.ajax({
            url: 'https://oddballs-data--development.gadget.app/apps/oddballs-data/collection?handle=pre-paid-subscription-card',
            method: 'GET',
            dataType: 'json'
        });
    }
  
  // Function to fetch the third set of data
  function fetchData3() {
        return $.ajax({
            url: 'https://oddballs-data--development.gadget.app/apps/oddballs-data/collection?handle=digital-gift-subscription',
            method: 'GET',
            dataType: 'json'
        });
    }
    
  // Use $.when to wait for both promises to resolve
  $.when(fetchData1(), fetchData2(),fetchData3()).then(function(data1, data2,data3) {
        // Assuming the response structure is the same for both
        var result1 = data1[0];
        var result2 = data2[0];
        var result3 = data3[0];
    
        // Combine both sets of data into jsonGiftingData
        jsonData = result1.items || result1;
        $.each(jsonData.products, function(index, product) {
            if(!product.product.title.toLowerCase().includes('auto renew')){
              giftingFilteredData.push(product);
            }else{
              product.product.title.toLowerCase()
            }
        });
    
        jsonData = result2.items || result2;
        $.each(jsonData.products, function(index, product) {
            if(!product.product.title.toLowerCase().includes('auto renew')){
              giftingFilteredData.push(product);
            }else{
              product.product.title.toLowerCase()
            }
        });
      
        jsonData = result3.items || result3;
        $.each(jsonData.products, function(index, product) {
             if(!product.product.title.toLowerCase().includes('auto renew')){
              giftingFilteredData.push(product);
            }else{
              product.product.title.toLowerCase()
            }
        });
    
        jsonGiftingData = giftingFilteredData;
        //console.clear()
        console.log(jsonGiftingData)
        $('#gift').find('.load-animate').removeClass('load-animate');


    
    }).fail(function(jqXHR, textStatus, errorThrown) {
        $('#option').empty()
        $('#option').html('<div class="flex justify-center font-bold p-2 text-red-700 border-red-700 border-solid border-2 rounded-md w-full h-full">Sorry there was an error. Please reload the page</div>')
        $('.').removeClass('load-animate')
        console.error("Failed to fetch data:", textStatus, errorThrown);
    });

    function errorMessageCheck(){
      let addError = false
      const options = $('.option-step-2').find('[data-tab]'); // Correct selector for data attributes
        options.each(function() {
            // Inside each, `this` refers to the current element
            if(!$(this).hasClass('hidden')){
               addError = $(this).find('.active-selection').length > 0 ? true : false;
            }
        });
      
      findProducts(giftingFilteredData)
      if(lengthCriteria && cardCriteria  && membershipCriteria && !addError){
        $('.error-message').removeClass('hidden')
      }else{
        $('.error-message').addClass('hidden')
      }    
    }
  
    // handles change between card types
   function changeSubType() {
        if (cardCriteria === "type-physical-gift-subscription") {
            $('#gift-options-3')
                .find('[data-tab="Kid\'s"] .js-sub-select[data-product-type="type-digital-underwear"]')
                .attr('data-product-type', 'gift-sub-type-kids-underwear');
            $('#gift-options-4').removeClass('stay-hidden')
        } else {
            $('#gift-options-3')
                .find('[data-tab="Kid\'s"] .js-sub-select[data-product-type="gift-sub-type-kids-underwear"]')
                .attr('data-product-type', 'type-digital-underwear');
             $('#gift-options-4').addClass('stay-hidden')
          // lengthCriteria = ""
        }
    }

   // redeem or gift selector clicks
   $('body').on('click', '.js-main-tab', function() {
        var Opentab = '#' + $(this).data('nav-id');
        var Closetab = '#' + $(this).siblings('.active-selection').data('nav-id');
       
        $(Opentab).removeClass('hidden');
        $(Closetab).addClass('hidden'); 
        $(this).siblings().removeClass('active-selection');
        $(this).addClass('active-selection');
        getActiveSelections()
    });

   // subscription type click
   $('body').on('click', '.js-sub-tab', function() {
        var parent = $(this).parent().parent();
        var parentId = parent.attr('id');  
        var openTab = $(this).data('nav-id');  
       
     
        parent.find('.active-selection').removeClass('active-selection');  
        $(this).addClass('active-selection');  
        displayNextStep(parentId, openTab)
        getActiveSelections()
        errorMessageCheck()
   });

   // underwear selector click
   $('body').on('click', '.js-sub-select', function() {
        var parent = $(this).parent().parent().parent().parent();
        var parentId = parent.attr('id');  
        var openTab = $(this).data('nav-id');
        parent.find('.active-selection').removeClass('active-selection');  
        $(this).addClass('active-selection')   
     
        displayNextStep(parentId, openTab)
        getActiveSelections()
        if($(this).data('add-design') == false && activeSelector == "Pre-PaidSubscriptionType"){
          console.log('adding tags')
         $('[data-tags="subscription_adventurous"]').addClass('active-selection')
         $('[data-tags="subscription_classic"]').addClass('disabled line-through opacity-50 pointer-events-none')
        }else{
          $('[data-tags="subscription_classic"]').removeClass('disabled line-through opacity-50 pointer-events-none')
        }
         errorMessageCheck()
    });

   // Sub length selector click
   $('body').on('click', '.js-sub-length-tab', function() {
        var parent = $(this).parent().parent();
        var parentId = parent.attr('id');  
        var openTab = $(this).data('nav-id');  

     
        parent.find('.active-selection').removeClass('active-selection');  
        $(this).addClass('active-selection')
     
        getActiveSelections()
        errorMessageCheck()
        
    });

   // Card type selector click
   $('body').on('click', '.js-sub-card-tab', function() {
        var parent = $(this).parent().parent();
        var parentId = parent.attr('id');  
        var openTab = $(this).data('nav-id');  

        parent.find('.active-selection').removeClass('active-selection');  
        $(this).addClass('active-selection')
        displayNextStep(parentId, openTab)
        getActiveSelections()
        changeSubType()
    });

   // Design selector click
   $('body').on('click', '.js-sub-design', function() {
        var parent = $(this).parent().parent();
        var parentId = parent.attr('id');  
        var openTab = $(this).data('nav-id');  
        if($(this).data('design-tab') == "false"){
          
        }
        
        parent.find('.active-selection').removeClass('active-selection');  
        $(this).addClass('active-selection')
        getActiveSelections()
        displayNextStep(parentId, openTab)
    });

  // loading screen change
   function changeProductLoadingScreen(){
      console.log('---------------------------- change product -----------------------------------------')
      $('body #sas-product-container .product-title').addClass('load-animate');
      $('#sas-product-container .product-variant__item').addClass('load-animate');
      $('#sas-product-container .ga-atc-button').addClass('load-animate');
      $('#sas-product-container .product-images ').addClass('load-animate ');
      $('#sas-product-container .price-reviews ').addClass('load-animate ');
      $('#sas-product-container .loaded').parent().addClass('load-animate ');
      $('#sas-product-container .product-header').addClass('load-animate');
    }

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

  // Function to handle the arrival of the target element
        // Function to handle the arrival of the target element
        function handleArrivedElement(element) {
            console.log('Element arrived:', element);

            const productJsonInput = document.getElementById('product-json');
            const jsonDataStr = productJsonInput ? productJsonInput.value : null;
            
            if (!jsonDataStr) {
                console.error("No JSON data found in #product-json.");
                return;
            }
            
            let jsonData;
            try {
                jsonData = JSON.parse(jsonDataStr);
            } catch (e) {
                console.error("Error parsing JSON from #product-json:", e);
                return;
            }

            console.log('JSON', jsonData)

            // Observe changes to the 'value' attribute of the input
            const observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
                        const inputValue = $(element).val();
                        console.log('Input value changed to:', inputValue);
                        const matchingOffer = jsonData.variants.find(offer => offer.id == inputValue);
                      
                        const $price = $('#prod-price');
                        const image = document.getElementById('prod-img')
                        
                
                     

                        if (matchingOffer) {
                          if(matchingOffer.price){
                            $price.html("£" + (matchingOffer.price / 100 ));
                          }
                          if( matchingOffer.featured_image.src){
                            image.src = matchingOffer.featured_image.src; 
                            }
                        } else {
                            console.log("No matching offer found for variantId:", inputValue);
                        }
                    }
                });
            });

            // Start observing the input element for attribute changes
            observer.observe(element, { attributes: true });
        }

        // MutationObserver-like arrival functionality using jQuery
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType === 1 && $(node).is('.product-selected-variant-id')) {
                        handleArrivedElement(node);
                    } else if (node.nodeType === 1) {
                        $(node).find('.product-selected-variant-id').each(function () {
                            handleArrivedElement(this);
                        });
                    }
                });
            });
        });

        // Start observing the body for new nodes
        observer.observe(document.body, { childList: true, subtree: true });
    


})


