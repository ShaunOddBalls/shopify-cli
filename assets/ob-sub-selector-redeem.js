$(document).ready(function () {
   
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
  
        var position = $(this).index()
        var text = $(this).text()
        var translatePositionX = ((position) * 100) + "%"
        var slider = $(this).siblings('.selection-tab-selection')
        slider.css('transform', `translate(${translatePositionX}, -50%)`);
        slider.html(text);

        (position > 0)? slider.css('left', '-1%') : slider.css('left', '1%')
        
          
        
        
         if (slider.hasClass("hidden")) {
            slider.removeClass("hidden");
          }
          if ($(this).hasClass("ob-bg-gradient")) {
              slider.removeClass("ob-hover-plain");
              slider.addClass("ob-bg-gradient");
          }
          if ($(this).hasClass("ob-hover-plain")) {
              slider.removeClass("ob-bg-gradient");
              slider.addClass("ob-hover-plain");
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
    console.log("<----------------------------------------------------------------------------------------------->")
      console.log("tab: " + activeSelector)
      console.log("Months: " + lengthCriteria)
      console.log('Product-Type: ' + subscriptionCriteria) 
      console.log('Department: ' + membershipCriteria) 
      console.log("Card Type: " + cardCriteria)
      console.log("Design Type: " + designCriteria)
      findProducts(giftingFilteredData)
    }

    function errorMessageCheck(){
      console.log('Error Message....................')
      let addError = false
      const options = $('#redeem-options-3').find('[data-tab]'); // Correct selector for data attributes
        options.each(function() {
            console.log('test')
            // Inside each, `this` refers to the current element
            if(!$(this).hasClass('hidden')){
               console.log('found')
               addError = $(this).find('.active-selection').length > 0 ? false : true ;
              console.log('add error: ', addError)
            }
        });
      
      if(lengthCriteria && membershipCriteria && addError){
        $('.error-message').removeClass('hidden')
      }else{
        $('.error-message').addClass('hidden')
      }    
    }
    
    // Adds quickbuy when array gets to one product
        function addSubQuickBuy(array) {
          try{
              if (array.length === 1) {
                  $('#sas-product-container').empty()
                  inatialLoader()
            
                  var product = array[0];
                  var productHandle = product.product.handle;
                  let url = "/products/" + productHandle + "?view=qb-rgs";
                  fetch(url)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Network response was not ok');
                    }
                    return response.text();
                  })
                  .then(data => {
                    var $quickbuy = $('<div></div>').html(data);
      
                    // Now you can manipulate the content using jQuery
                    $quickbuy.find('.product-form').removeClass('bg-white');
                    $quickbuy.find('.overflow-y-auto').removeClass('overflow-y-auto');
                    $quickbuy.find('.qb-header').addClass('bg-white');
                    $quickbuy.find('.typography.typography--body-md.uppercase.mb-2.font-semibold').eq(0).text('4. Select Underwear Size');
                    $quickbuy.find('.typography.typography--body-md.uppercase.mb-2.font-semibold').eq(1).text('5. Select Sock Size');
                    $quickbuy.find('.product-option').eq(1).addClass('pt-6');
                    $quickbuy.find('.space-y-6.p-6.py-4').removeClass('p-6')
                    $quickbuy.find('#quantity-selector').addClass('bg-white')
                    $quickbuy.find('.selling-plan-group').addClass('hidden')
                    $quickbuy.find('.flex.flex-shrink-0.justify-end.px-6 ').removeClass('px-6 py-6')
                    if( activeSelector != 'Pre-PaidSubscriptionType'){
                    $quickbuy.find('#product-variants').addClass('hidden')
                    }

                    
      
                    
                    $('#sas-product-container').html($quickbuy.html());
                    inatialLoader()
                    if( activeSelector != 'Pre-PaidSubscriptionType'){
                    setTimeout(function() {
                      $('#sas-product-container').find('input[type="radio"]').trigger('click');
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
              // console.log('Tab: ' + tab)
              //  if(tab && tab.includes("Men's") || tab && tab.includes("Women's") || tab && tab.includes("Kids's")){
              //   var currentCards = $(nextStep).find('[data-tab="' + tab + '"]')
              //   currentCards.find('.js-sub-select').eq(0).click();
              // }else{
              //   console.log('none')
              // }
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
            url: 'https://oddballs-data--development.gadget.app/apps/oddballs-data/collection?handle=all-3-6-12-pre-paid-subscriptions',
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
            if(!product.product.title.toLowerCase().includes('auto renew') && !product.product.title.toLowerCase().includes('test')){
              giftingFilteredData.push(product);
            }else{
              product.product.title.toLowerCase()
            }
        });
    
        jsonData = result2.items || result2;
        $.each(jsonData.products, function(index, product) {
            if(!product.product.title.toLowerCase().includes('auto renew') && !product.product.title.toLowerCase().includes('test')){
              giftingFilteredData.push(product);
            }else{
              product.product.title.toLowerCase()
            }
        });
      
        jsonData = result3.items || result3;
        $.each(jsonData.products, function(index, product) {
             if(!product.product.title.toLowerCase().includes('auto renew') && !product.product.title.toLowerCase().includes('test')){
              giftingFilteredData.push(product);
            }else{
              product.product.title.toLowerCase()
            }
        });
    
        jsonGiftingData = giftingFilteredData;
        console.log(jsonGiftingData)
        
        $('#redeem').find('.load-animate').removeClass('load-animate');
    }).fail(function(jqXHR, textStatus, errorThrown) {
        $('#option').empty()
        $('#option').html('<div class="flex justify-center font-bold p-2 text-red-700 border-red-700 border-solid border-2 rounded-md w-full h-full">Sorry there was an error. Please reload the page</div>')
        $('#option').removeClass('load-animate')
        console.error("Failed to fetch data:", textStatus, errorThrown);
    });

    // handles change between card types
   function changeSubType() {
        if (cardCriteria === "type-physical-gift-subscription") {
          console.log('stay')
            $('#gift-options-3')
                .find('[data-tab="Kid\'s"] .js-sub-select[data-product-type="type-digital-underwear"]')
                .attr('data-product-type', 'gift-sub-type-kids-underwear');
            // $('#gift-options-3')
            //     .find('[data-tab="Women\'s"] .js-sub-select[data-product-type="gift-sub-type-bralette"]')
            //     .attr('data-product-type', 'gift-sub-type-adult-bralette');
            $('#gift-options-4').removeClass('stay-hidden')
        } else {
          console.log('change')
            $('#gift-options-3')
                .find('[data-tab="Kid\'s"] .js-sub-select[data-product-type="gift-sub-type-kids-underwear"]')
                .attr('data-product-type', 'type-digital-underwear');
           // $('#gift-options-3')
           //      .find('[data-tab="Women\'s"] .js-sub-select[data-product-type="gift-sub-type-adult-bralette"]')
           //      .attr('data-product-type', 'gift-sub-type-adult-bralette');
             $('#gift-options-4').addClass('stay-hidden')
          lengthCriteria = ""
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
        console.log('<--------------------------design---------------------------------------->')
        console.log('log pattern type: ', designCriteria)
        displayNextStep(parentId, openTab)
        if($(this).data('add-design') == false){
          console.log('adding tags')
         $('[data-tags="subscription_classic"]').addClass('disabled line-through opacity-50 pointer-events-none')
         $('[data-tags="subscription_adventurous"]').addClass('active-selection')
        }else{
          $('[data-tags="subscription_classic"]').removeClass('disabled line-through opacity-50 pointer-events-none')
          $('[data-tags="subscription_adventurous"]').addClass('active-selection')
        }
        
        getActiveSelections()
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
        displayNextStep(parentId, openTab)
         errorMessageCheck()
    });

   // Card type selector click
   $('body').on('click', '.js-sub-card-tab', function() {
        var parent = $(this).parent().parent();
        var parentId = parent.attr('id');  
        var openTab = $(this).data('nav-id');  

        parent.find('.active-selection').removeClass('active-selection');  
        $(this).addClass('active-selection')
        getActiveSelections()
        changeSubType()
        displayNextStep(parentId, openTab)
       errorMessageCheck()
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

})