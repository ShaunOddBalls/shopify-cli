function removeCartItem(itemKey) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        id: itemKey,
        quantity: 0
      })
    })
    .then(response => response.json())
    .then(cart => {
      console.log('Item removed. Cart updated:', cart);
      // Optional: update your cart UI
      // reloadCartDrawer(cart);
    })
    .catch(err => {
      console.error('Error removing item:', err);
    });
  }
  
  function parseJsonData(elementId) {
      const element = document.getElementById(elementId);
      const jsonString = element ? element.getAttribute('data-json') : ''
      let data = null;
      
      try {
          data = JSON.parse(jsonString);
      } catch (error) {
          debugConsole(`Failed to parse JSON from ${elementId}:`, error)
          data = null;
      }
      
      if (element) element.setAttribute('data-json', '');
      return data;
  }
  
  function getProductData() {
      return {
          handle: "summer-bundle-product",
          productId: 7629913129021,
          productData : {"id":7629913129021,"title":"Summer Bundle","handle":"summer-bundle-product","description":"","published_at":"2025-05-15T11:02:39+01:00","created_at":"2025-05-15T11:02:39+01:00","vendor":"OddBalls","type":"product","tags":["easy-bundle","feature-referral-discount-available","smart-cart-hide-bundle-options","title-default-title"],"price":0,"price_min":0,"price_max":0,"available":true,"price_varies":false,"compare_at_price":null,"compare_at_price_min":0,"compare_at_price_max":0,"compare_at_price_varies":false,"variants":[{"id":42341920211005,"title":"Default Title","option1":"Default Title","option2":null,"option3":null,"sku":"","requires_shipping":true,"taxable":false,"featured_image":null,"available":true,"name":"Summer Bundle","public_title":null,"options":["Default Title"],"price":0,"weight":0,"compare_at_price":null,"inventory_quantity":0,"inventory_management":null,"inventory_policy":"continue","barcode":null,"requires_selling_plan":false,"selling_plan_allocations":[],"quantity_rule":{"min":1,"max":null,"increment":1}}],"images":["\/\/www.myoddballs.com\/cdn\/shop\/files\/ProductImage-SummerBundle.png?v=1748354226"],"featured_image":"\/\/www.myoddballs.com\/cdn\/shop\/files\/ProductImage-SummerBundle.png?v=1748354226","options":["Title"],"media":[{"alt":null,"id":26241171062845,"position":1,"preview_image":{"aspect_ratio":1.0,"height":1080,"width":1080,"src":"\/\/www.myoddballs.com\/cdn\/shop\/files\/ProductImage-SummerBundle.png?v=1748354226"},"aspect_ratio":1.0,"height":1080,"media_type":"image","src":"\/\/www.myoddballs.com\/cdn\/shop\/files\/ProductImage-SummerBundle.png?v=1748354226","width":1080}],"requires_selling_plan":false,"selling_plan_groups":[],"content":""},
          collections: [
              
                  {
                      "id": "384001924",
                      "handle": "all-bundles",
                      "title": "All Bundles",
                      "gid": "gid://shopify/Collection/384001924"
                  },
              
                  {
                      "id": "155003289661",
                      "handle": "best-sellers",
                      "title": "Best Sellers",
                      "gid": "gid://shopify/Collection/155003289661"
                  },
              
                  {
                      "id": "400040708",
                      "handle": "current-offers",
                      "title": "CURRENT OFFER",
                      "gid": "gid://shopify/Collection/400040708"
                  },
              
                  {
                      "id": "59355201597",
                      "handle": "title-default-title",
                      "title": "Default Title",
                      "gid": "gid://shopify/Collection/59355201597"
                  },
              
                  {
                      "id": "287396921405",
                      "handle": "excluding-subscriptions-gift-cards",
                      "title": "Excluding subscriptions & gift cards",
                      "gid": "gid://shopify/Collection/287396921405"
                  },
              
                  {
                      "id": "285205823549",
                      "handle": "full-priced-products-bundles",
                      "title": "Full Priced Products - Bundles",
                      "gid": "gid://shopify/Collection/285205823549"
                  },
              
                  {
                      "id": "153641615421",
                      "handle": "gifts-under-11",
                      "title": "Gifts Under £10",
                      "gid": "gid://shopify/Collection/153641615421"
                  },
              
                  {
                      "id": "263392985149",
                      "handle": "gifts-under-5",
                      "title": "Gifts Under £5",
                      "gid": "gid://shopify/Collection/263392985149"
                  },
              
                  {
                      "id": "288418398269",
                      "handle": "product",
                      "title": "product",
                      "gid": "gid://shopify/Collection/288418398269"
                  }
              
          ],
          selected_or_first_available_variant: {"id":42341920211005,"title":"Default Title","option1":"Default Title","option2":null,"option3":null,"sku":"","requires_shipping":true,"taxable":false,"featured_image":null,"available":true,"name":"Summer Bundle","public_title":null,"options":["Default Title"],"price":0,"weight":0,"compare_at_price":null,"inventory_quantity":0,"inventory_management":null,"inventory_policy":"continue","barcode":null,"requires_selling_plan":false,"selling_plan_allocations":[],"quantity_rule":{"min":1,"max":null,"increment":1}}
      };
  }
  function debugConsole(...messages){
          try {
              let isDebug = localStorage.getItem("debug");
              if (isDebug) {
                  for (let message of messages) {
                      console.error(message);
                  }
              }
          } catch (err) {
              console.error('error inside the debugError function ->', err)
          }
  }
  function removeProductHtmlForBundles(){
      try{
           let targetWrapper = 
                      document.querySelector('main') || 
                      document.querySelector('.main') || 
                      document.querySelector('#main') || 
                      document.querySelector('#main-content');
          if(targetWrapper){
              targetWrapper.innerHTML = ''
          }
      }catch(err){
          debugConsole("error in removeProductHtmlForBundles",err)
      }
  }
  
  (function initializeShopifyValues() {
      const productDetails = getProductData()
      window.shopifyLiquidValuesApp4Ext = {
          product: productDetails,
          cartData: {"note":"","attributes":{"igId":"ig_4393706659ee3ae2f61fe017e3c68d135a78","locksmith":":87eff3436232","_market":"market-uk","igTestGroups":"f32213b2906c"},"original_total_price":3200,"total_price":3200,"total_discount":0,"total_weight":300.0,"item_count":1,"items":[{"id":41877243199549,"properties":{"_co":"c"},"quantity":1,"variant_id":41877243199549,"key":"41877243199549:45047314425ddfacf266eaf80c86fda2","title":"Mens Pyjamas - Palm Trees - Shorts \u0026amp; T-Shirt - 2XL","price":3200,"original_price":3200,"discounted_price":3200,"line_price":3200,"original_line_price":3200,"total_discount":0,"discounts":[],"sku":"PALM-TREES-M-PYJAMAS-SHORT-2XL","grams":300,"vendor":"OddBalls","taxable":true,"product_id":7541449490493,"product_has_only_default_variant":false,"gift_card":false,"final_price":3200,"final_line_price":3200,"url":"\/products\/palm-trees-mens-pyjamas-shorts?variant=41877243199549","featured_image":{"aspect_ratio":1.0,"alt":"Mens Pyjamas - Palm Trees - Shorts \u0026 T-Shirt","height":2000,"url":"\/\/www.myoddballs.com\/cdn\/shop\/files\/PALMTREESMFRONT.png?v=1748519876","width":2000},"image":"\/\/www.myoddballs.com\/cdn\/shop\/files\/PALMTREESMFRONT.png?v=1748519876","handle":"palm-trees-mens-pyjamas-shorts","requires_shipping":true,"product_type":"Pyjamas","product_title":"Mens Pyjamas - Palm Trees - Shorts \u0026 T-Shirt","product_description":"Limited Edition Summer Pyjamas are BACK☀️😴💤🥱🥰\nFor the first time EVER you can keep cool in the summer months with our new Shorts \u0026 T-shirt PJ combo!Made from super soft, stretchy cotton to keep you cool this summer! Grab yours now in Palm Trees.\n\nSuper Soft Stretch Cotton\nContrast Waistband\nNEW Design binding on the arms \u0026 neck tape for MORE colour\nOddBalls Branding\nPyjama POCKETS!\nFabric Content: Body: 95% Cotton, 5% Elastane\nCare: Wash 'em when they smell OR Machine wash at 30 °C.\n\nUnsure on sizing? Simply check out our size guide to find out your perfect fit.\n","variant_title":"2XL","variant_options":["2XL"],"options_with_values":[{"name":"Size","value":"2XL"}],"line_level_discount_allocations":[],"line_level_total_discount":0}],"requires_shipping":true,"currency":"GBP","items_subtotal_price":3200,"cart_level_discount_applications":[],"checkout_charge_amount":3200},
          selected_or_first_available_variant: productDetails.selected_or_first_available_variant
      };
  
      const easyBundlesData = parseJsonData('easybundles-ext-data');
      if (easyBundlesData && !easyBundlesData?.errorMsg && !easyBundlesData.isUseAppLevelMetafieldEnabled) {
          window.easybundles_ext_data = easyBundlesData;
      }
  
      const appLevelMetafields = parseJsonData('all-app-level-metafield-data') || {};
      const globalData = appLevelMetafields['full_page_ext_data'] || null
  
      if(globalData){
          window.easybundle_user_ext_data = globalData?.userData || null
      }
  
  
      const bundleConfig = parseJsonData('bundle-config-data');
      if (bundleConfig) {
          window.shopifyLiquidValuesApp4Ext.product.bundleProductConfiguration = bundleConfig;
          const bundleConfigurationKey = bundleConfig.appLevelMetafieldKey;
  
          const bundleData = appLevelMetafields[bundleConfigurationKey] || null
          const isAutoPlaceFullPageBundleEnabled = globalData?.userData?.customSettings?.isAutoPlaceFullPageBundleEnabled ?? true
  
          if(globalData && bundleData){
              isAutoPlaceFullPageBundleEnabled && removeProductHtmlForBundles() 
              const discountsConfiguration = bundleData.discountsData
              delete bundleData.discountsData
              let full_page_ext_data = {
                  ...globalData,
                  stepsConfigurationData:bundleData,
                  discountsData: discountsConfiguration || {}
              }
              window.easybundle_full_page_ext_data = full_page_ext_data
          }
      }
  })();
  
  let filterObjects = { availableFilters: [], currentAppliedFilters: {}, currentSort: {} };
  
  // Constants for progress bar thresholds
  const FREE_SHIPPING_THRESHOLD = parseFloat(document.getElementById("free-shipping-threshold").innerHTML) * 100; // Convert to pence
  const FREE_GIFT_THRESHOLD = parseFloat(document.getElementById("free-gift-threshold").innerHTML) * 100; // Convert to pence
  
  function filterDesignOptionsByPattern(categoryId) {
  // Find the category filter object
  const categoryFilter = filterObjects.availableFilters.find(filter => filter.categoryId === categoryId);
  if (!categoryFilter) return;
  
  // Find the design filter
  const designFilter = categoryFilter.filters.find(filter => filter.name === 'Design');
  if (!designFilter) return;
  
  // Get all products for this category
  const products = window.gbbMix.sdk.state.categoriesDataMapByCategoryId[categoryId]?.products || [];
  
  // Get all currently applied pattern filters for this category
  const categoryFilters = filterObjects.currentAppliedFilters[categoryId];
  const appliedPatternFilters = categoryFilters?.tags?.filter(tag => tag.startsWith('pattern-')) || [];
  
  console.log(`[DEBUG] Pattern filters applied:`, appliedPatternFilters);
  
  // If no pattern filters are applied, restore all design options
  if (appliedPatternFilters.length === 0) {
      // Regenerate the original design filter
      const originalDesignFilter = generateTagFilter(products, 'design-', 'Design', `design-${categoryId}`);
      if (originalDesignFilter) {
          designFilter.values = originalDesignFilter.values;
          console.log(`[DEBUG] No patterns selected - restored ${designFilter.values.length} design options`);
      }
      return designFilter.values;
  }
  
  // Filter products that have ANY of the selected patterns AND a design tag
  const matchingProducts = products.filter(product => {
      const productTags = product.tags || [];
      const hasAnyPattern = appliedPatternFilters.some(patternFilter => 
          productTags.includes(patternFilter)
      );
      const hasDesign = productTags.some(tag => tag.startsWith('design-'));
      return hasAnyPattern && hasDesign;
  });
  
  console.log(`[DEBUG] Products matching any pattern: ${matchingProducts.length}`);
  
  // Extract design tags from matching products
  const matchingDesignTags = new Set();
  matchingProducts.forEach(product => {
      const productTags = product.tags || [];
      productTags.forEach(tag => {
          if (tag.startsWith('design-')) {
              // Convert "design-some-design-name" to "some design name" to match filter values
              const designName = tag.replace('design-', '').replace(/-/g, ' ');
              matchingDesignTags.add(designName);
          }
      });
  });
  
  console.log(`[DEBUG] Design tags found:`, Array.from(matchingDesignTags));
  
  // Filter the design filter values to only include matching designs
  const originalValues = designFilter.values;
  designFilter.values = originalValues.filter(designValue => {
      return matchingDesignTags.has(designValue.name);
  });
  
  console.log(`[DEBUG] Final design options: ${designFilter.values.length}/${originalValues.length} (patterns: ${appliedPatternFilters.join(', ')})`);
  
  return designFilter.values;
  }
  
  function handleFilterClick(categoryId, filterType, originalValue, valueId, valueName, checked) {
  // Get the current applied filters for this category
  const categoryFilters = filterObjects.currentAppliedFilters[categoryId];
  if (!categoryFilters) {
      return;
  }
  
  // Update the appropriate array based on filter type FIRST
  if (filterType === 'tag') {
      if (checked) {
          if (!categoryFilters.tags.includes(originalValue)) {
              categoryFilters.tags.push(originalValue);
          }
      } else {
          categoryFilters.tags = categoryFilters.tags.filter(tag => tag !== originalValue);
      }
  } else if (filterType === 'size') {
      if (checked) {
          if (!categoryFilters.size.includes(originalValue)) {
              categoryFilters.size.push(originalValue);
          }
      } else {
          categoryFilters.size = categoryFilters.size.filter(size => size !== originalValue);
      }
  } else if (filterType === 'type') {
      if (checked) {
          if (!categoryFilters.productType.includes(originalValue)) {
              categoryFilters.productType.push(originalValue);
          }
      } else {
          categoryFilters.productType = categoryFilters.productType.filter(type => type !== originalValue);
      }
  }
  
  // Log only pattern filter clicks
  if (originalValue && originalValue.startsWith('pattern-')) {
      console.log(`[DEBUG] Pattern filter ${checked ? 'added' : 'removed'}: ${originalValue}`);
      
      // Now call filterDesignOptionsByPattern AFTER the filter state is updated
      filterDesignOptionsByPattern(categoryId);
      
      // Refresh the popup content to show filtered design options
      const generalPopup = document.getElementById("general-popup-content");
      if (generalPopup && generalPopup.style.display !== 'none') {
          // Get the current category name for the popup title
          const categoryFilter = filterObjects.availableFilters.find(filter => filter.categoryId === categoryId);
          const categoryName = categoryFilter?.categoryName || 'Category';
          
          // Re-display the popup with updated content
          displayFilterPopup(categoryName, categoryId);
      }
      
      // Auto-open the Design accordion when pattern filter is clicked
      setTimeout(() => {
          const designFilterHeader = Array.from(document.querySelectorAll('.filter-accordion-header')).find(header => 
              header.querySelector('span').textContent === 'Design'
          );
          
          if (designFilterHeader) {
              const contentId = designFilterHeader.getAttribute('data-accordion');
              const content = document.getElementById(contentId);
              const arrow = designFilterHeader.querySelector('.accordion-arrow');
              
              if (content && content.style.display === 'none') {
                  content.style.display = 'block';
                  arrow.style.transform = 'rotate(180deg)';
              }
          } else {
              console.log('Design accordion header not found in popup');
          }
      }, 100); // Small delay to ensure popup is fully rendered
  }
  
  // Update filter button state
  updateFilterButtonState(categoryId);
  
  // Immediately apply filters
  const categoryContainer = document.querySelector(`.accordion-section[data-category-id="${categoryId}"] .accordion-content`);
  if (categoryContainer) {
      const products = window.gbbMix.sdk.state.categoriesDataMapByCategoryId[categoryId]?.products || [];
      displayProducts(categoryContainer, products, categoryId);
  }
  }
  
  function clearCategoryFilters(categoryId) {
  if (filterObjects.currentAppliedFilters[categoryId]) {
      // Reset all filter arrays
      filterObjects.currentAppliedFilters[categoryId] = {
          size: [],
          productType: [],
          tags: []
      };
      
      // Clear sort
      delete filterObjects.currentSort[categoryId];
      
      // Use filterDesignOptionsByPattern to properly restore design filter (since no pattern filters are applied)
      console.log(`[DEBUG] Clearing all filters for category ${categoryId}`);
      filterDesignOptionsByPattern(categoryId);
      
      // Uncheck all filter checkboxes
      const filterCheckboxes = document.querySelectorAll(`.filter-option[data-category-id="${categoryId}"]`);
      filterCheckboxes.forEach(checkbox => {
          checkbox.checked = false;
          const label = checkbox.parentElement;
          label.classList.remove('bg-[#00adef]', 'text-white');
          label.style.borderColor = '';
      });
      
      // Update the applied filters display
      updateAppliedFiltersDisplay(categoryId);
      
      // Update filter button state
      updateFilterButtonState(categoryId);
      
      // Hide all clear filter buttons
      const clearButtons = document.querySelectorAll(`.clear-filters-btn[data-category-id="${categoryId}"]`);
      clearButtons.forEach(btn => {
          btn.style.display = 'none';
      });
      
      // Hide bottom button container
      const buttonContainer = document.querySelector(`.fixed.bottom-0`);
      if (buttonContainer) {
          buttonContainer.style.display = 'none';
      }
      
      // Refresh the product display
      const categoryContainer = document.querySelector(`.accordion-section[data-category-id="${categoryId}"] .accordion-content`);
      if (categoryContainer) {
          const products = window.gbbMix.sdk.state.categoriesDataMapByCategoryId[categoryId]?.products || [];
          displayProducts(categoryContainer, products, categoryId);
      }
  }
  }
  
  function updateAppliedFiltersDisplay(categoryId) {
  const appliedFiltersContainer = document.querySelector(`#applied-filter-accordion-content-${categoryId}`);
  if (!appliedFiltersContainer) return;
  
  const currentFilters = filterObjects.currentAppliedFilters[categoryId];
  if (!currentFilters) return;
  
  // Clear existing pills
  appliedFiltersContainer.innerHTML = '';
  
  // Create pills for each applied filter
  const allAppliedFilters = [
      ...currentFilters.size.map(size => ({ type: 'size', value: size })),
      ...currentFilters.productType.map(type => ({ type: 'type', value: type })),
      ...currentFilters.tags.map(tag => ({ type: 'tag', value: tag }))
  ];
  
  if (allAppliedFilters.length === 0) {
      appliedFiltersContainer.innerHTML = '<div class="text-gray-500 text-sm">No filters applied</div>';
      return;
  }
  
  const pillsContainer = document.createElement('div');
  pillsContainer.className = 'flex flex-wrap gap-2 my-2';
  
  allAppliedFilters.forEach(filter => {
      const pill = document.createElement('div');
      pill.className = 'flex items-center gap-1 bg-[#00adef] text-white text-xs px-2 py-1 rounded-full';
      
      // Format the filter value for display
      let displayValue = filter.value;
      if (filter.type === 'tag') {
          // Remove the prefix and replace hyphens with spaces
          displayValue = filter.value.split('-').slice(1).join(' ').replace(/-/g, ' ');
      }
  
      pill.innerHTML = `
          <span>${displayValue}</span>
          <button class="remove-filter-btn hover:text-gray-200" data-filter-type="${filter.type}" data-value="${filter.value}">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
          </button>
      `;
  
      // Add click handler for remove button
      const removeBtn = pill.querySelector('.remove-filter-btn');
      removeBtn.addEventListener('click', () => {
          // Find and uncheck the corresponding checkbox
          const checkbox = document.querySelector(`input[data-filter-type="${filter.type}"][data-original-value="${filter.value}"]`);
          if (checkbox) {
              checkbox.checked = false;
              checkbox.parentElement.classList.remove('bg-[#00adef]', 'text-white');
              checkbox.parentElement.style.borderColor = '';
              
              // Trigger the change event to update filters
              const event = new Event('change', { bubbles: true });
              checkbox.dispatchEvent(event);
          }
  
          // Remove from filter arrays FIRST
          if (filter.type === 'size') {
              currentFilters.size = currentFilters.size.filter(s => s !== filter.value);
          } else if (filter.type === 'type') {
              currentFilters.productType = currentFilters.productType.filter(t => t !== filter.value);
          } else if (filter.type === 'tag') {
              currentFilters.tags = currentFilters.tags.filter(t => t !== filter.value);
              
              // If this was a pattern filter, update the design filter AFTER removing it
              if (filter.value.startsWith('pattern-')) {
                  console.log(`[DEBUG] Pattern filter removed: ${filter.value}`);
                  filterDesignOptionsByPattern(categoryId);
                  
                  // Refresh the popup to show updated design options
                  const generalPopup = document.getElementById("general-popup-content");
                  if (generalPopup && generalPopup.style.display !== 'none') {
                      const categoryFilter = filterObjects.availableFilters.find(filter => filter.categoryId === categoryId);
                      const categoryName = categoryFilter?.categoryName || 'Category';
                      displayFilterPopup(categoryName, categoryId);
                  }
              }
          }
  
          // Update the display
          updateAppliedFiltersDisplay(categoryId);
          
          // Update filter button state
          updateFilterButtonState(categoryId);
          
          // Update the product display
          const categoryContainer = document.querySelector(`.accordion-section[data-category-id="${categoryId}"] .accordion-content`);
          if (categoryContainer) {
              const products = window.gbbMix.sdk.state.categoriesDataMapByCategoryId[categoryId]?.products || [];
              displayProducts(categoryContainer, products, categoryId);
          }
      });
  
      pillsContainer.appendChild(pill);
  });
  
  appliedFiltersContainer.appendChild(pillsContainer);
  }
  
  function displayFilterPopup(title, categoryId) {
  const categoryFilter = filterObjects.availableFilters.find(filter => filter.categoryId === categoryId);
  if (!categoryFilter) return;
  
  // Ensure design filter is properly updated based on current pattern filters
  filterDesignOptionsByPattern(categoryId);
  
  const generalPopup = document.getElementById("general-popup-content");
  const generalPopupContent = document.getElementById("general-popup-contents");
  const generalPopupHeader = document.getElementById("general-popup-header");
  
  if (!generalPopup || !generalPopupContent || !generalPopupHeader) return;
  
  // Get current applied filters for this category
  const currentFilters = filterObjects.currentAppliedFilters[categoryId] || {
      size: [],
      productType: [],
      tags: []
  };
  
  // Set the popup header cleanly
  generalPopupHeader.innerHTML = `<div id="filter-header">Filter ${title}</div>`;
  
  // Check if there are any active filters
  const hasActiveFilters = currentFilters.size.length > 0 || 
                         currentFilters.productType.length > 0 || 
                         currentFilters.tags.length > 0;
  
  // Build the accordion UI for filters
  let html = `<div class="w-full flex my-2 items-center border-b border-t">
                <div class="w-full flex flex-col py-2" id="applied-container">
                  <div class="w-full">Applied filters:</div>
                  <div id="applied-filter-accordion-content-${categoryId}" class="w-full"></div>
                <div>
                </div></div>
                <div class="clear-filters-btn border rounded-full border-[#00adef] border font-semibold text-[#00adef] text-xs uppercase px-1 py-1 cursor-pointer text-nowrap hover:bg-[#00adef] hover:text-white transition-colors"
                     data-category-id="${categoryId}"
                     style="display: ${hasActiveFilters ? 'block' : 'none'}">
                Clear filters
                </div>
              </div></div>`;
  
  categoryFilter.filters.forEach((filter, filterIdx) => {
      const filterAccordionId = `filter-accordion-${categoryId}-${filterIdx}`;
      html += `
      <div class="filter-accordion rounded border-b w-full">
          <div class="filter-accordion-header flex items-center justify-between py-3 cursor-pointer font-semibold" data-accordion="${filterAccordionId}">
              <span>${filter.name}</span>
              <svg class="accordion-arrow transition-transform duration-200" width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <polyline points="5 8 10 13 15 8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </div>
          <div class="filter-accordion-content pb-3" id="${filterAccordionId}" style="display:none;">
              <div class="grid grid-cols-2 gap-2">`;
  
      // Determine filter type based on filter name
      const filterType = filter.name.toLowerCase() === 'size' ? 'size' : 
                        filter.name.toLowerCase() === 'product type' ? 'type' : 'tag';
  
    if(filter.name == "Design"){
      // Get the current filtered design values
      const currentDesignValues = filter.values || [];
      
      console.log(`[DEBUG] Rendering design filter with ${currentDesignValues.length} values`);
      
      // Create a map of design names to API data for faster lookup
      const designApiMap = new Map();
      if (glob_designs) {
          glob_designs.forEach(design => {
              let tag = '';
              let url = '';
              let title = '';
              
              design.fields.forEach(field => {
                  if (field.key === "tag") tag = field.value;
                  if (field.key === "img_url") url = field.value.replace(".jpg", "_40x.jpg").replace(".png", "_40x.png");
                  if (field.key === "title") title = field.value;
              });
              
              if (tag) {
                  const normalizedTag = tag.toLowerCase().replace(/-/g, ' ');
                  designApiMap.set(normalizedTag, { url, title, originalTag: tag });
              }
          });
      }
      
      // Render each filtered design value
      currentDesignValues.forEach((val, valIdx) => {
          // For tags, we need to reconstruct the original tag value
          const originalValue = filterType === 'tag' ? 
              `${filter.name.toLowerCase()}-${val.name}` : 
              val.name;
          
          // Check if this value is currently applied
          const isApplied = filterType === 'size' ? currentFilters.size.includes(originalValue) :
                          filterType === 'type' ? currentFilters.productType.includes(originalValue) :
                          currentFilters.tags.includes(originalValue);
  
          // Add selected styling if the filter is applied
          const selectedClasses = isApplied ? 'bg-[#00adef] text-white' : 'bg-white text-gray-900';
          const selectedStyle = isApplied ? 'border-color: #00adef;' : '';
  
          // Try to find matching API data
          const valNameNormalized = val.name.toLowerCase();
          const apiData = designApiMap.get(valNameNormalized);
          
          // Only render designs that have API data (images)
          if (apiData) {
              // Design has API data - render with image
              html += `
                  <label class="filter-pill flex group relative items-center justify-center rounded-md border py-3 px-4 text-xs font-medium uppercase focus:outline-none cursor-pointer shadow-sm m-1 transition-all text-center ${selectedClasses}">
                      <input type="checkbox" 
                             class="filter-option sr-only" 
                             data-filter-id="${filter.id}" 
                             data-value-id="${val.id}"
                             data-original-value="${originalValue}"
                             data-filter-type="${filterType}"
                             data-category-id="${categoryId}"
                             ${isApplied ? 'checked' : ''}>
                             <img class="rounded-full" src="${apiData.url}" height="40px" width="40px" />
                      <span class="option-value w-full text-center ${isApplied ? 'text-white' : 'text-gray-800'}">${val.name}</span>
                      <span class="check-indicator absolute inset-0 rounded-md pointer-events-none transition border-2 border-transparent group-hover:border-[#00adef]" style="${selectedStyle}"></span>
                  </label>`;
          }
      });
    }else{
      
  
      filter.values.forEach((val, valIdx) => {
          // For tags, we need to reconstruct the original tag value
          const originalValue = filterType === 'tag' ? 
              `${filter.name.toLowerCase()}-${val.name}` : 
              val.name;
  
          // Check if this value is currently applied
          const isApplied = filterType === 'size' ? currentFilters.size.includes(originalValue) :
                          filterType === 'type' ? currentFilters.productType.includes(originalValue) :
                          currentFilters.tags.includes(originalValue);
  
          // Add selected styling if the filter is applied
          const selectedClasses = isApplied ? 'bg-[#00adef] text-white' : 'bg-white text-gray-900';
          const selectedStyle = isApplied ? 'border-color: #00adef;' : '';
  
          html += `
              <label class="filter-pill group relative flex items-center justify-center rounded-md border py-3 px-4 text-xs font-medium uppercase focus:outline-none cursor-pointer shadow-sm m-1 transition-all text-center ${selectedClasses}">
                  <input type="checkbox" 
                         class="filter-option sr-only" 
                         data-filter-id="${filter.id}" 
                         data-value-id="${val.id}"
                         data-original-value="${originalValue}"
                         data-filter-type="${filterType}"
                         data-category-id="${categoryId}"
                         ${isApplied ? 'checked' : ''}>
                  <span class="option-value w-full text-center ${isApplied ? 'text-white' : 'text-gray-800'}">${val.name}</span>
                  <span class="check-indicator absolute inset-0 rounded-md pointer-events-none transition border-2 border-transparent group-hover:border-[#00adef]" style="${selectedStyle}"></span>
              </label>`;
      });
  
    }
      html += `
              </div>
          </div>
      </div>`;
  });
  
  // Add Apply Filters button at the bottom
  html += `
      <div class="w-full mt-4 px-4 pb-4 fixed bottom-0 left-0 bg-white" style="display: ${hasActiveFilters ? 'block' : 'none'}">
          <div class="flex gap-2">
              <button class="clear-filters-btn w-full border border-[#00adef] text-[#00adef] font-semibold py-3 px-6 rounded-full hover:bg-[#00adef] hover:text-white transition-colors"
                      data-category-id="${categoryId}">
                  Clear filters
              </button>
              <button id="apply-filters-${categoryId}" 
                      class="w-full bg-[#00adef] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#0095d1] transition-colors">
                  Close
              </button>
          </div>
      </div>`;
  
  generalPopupContent.innerHTML = html;
  
  // Add mb-20 class if there are active filters (buttons will be shown)
  if (hasActiveFilters) {
      generalPopupContent.classList.add('mb-20');
  } else {
      generalPopupContent.classList.remove('mb-20');
  }
  
  openPopup(generalPopup);
  
  // Add accordion toggle logic
  generalPopupContent.querySelectorAll('.filter-accordion-header').forEach(header => {
      header.addEventListener('click', function() {
          const contentId = this.getAttribute('data-accordion');
          const content = document.getElementById(contentId);
          const arrow = this.querySelector('.accordion-arrow');
          if (content.style.display === 'none') {
              content.style.display = 'block';
              arrow.style.transform = 'rotate(180deg)';
          } else {
              content.style.display = 'none';
              arrow.style.transform = 'rotate(0deg)';
          }
      });
  });
  
  // Update the applied filters display
  updateAppliedFiltersDisplay(categoryId);
  
  // Add click handler for filter options
  generalPopupContent.querySelectorAll('.filter-option').forEach(input => {
      input.addEventListener('change', function() {
          const filterType = this.getAttribute('data-filter-type');
          const originalValue = this.getAttribute('data-original-value');
          const valueId = this.getAttribute('data-value-id');
          const valueName = this.parentElement.querySelector('.option-value').textContent;
  
          // Update UI
          if (this.checked) {
              this.parentElement.classList.add('bg-[#00adef]', 'text-white');
              this.parentElement.style.borderColor = '#00adef';
          } else {
              this.parentElement.classList.remove('bg-[#00adef]', 'text-white');
              this.parentElement.style.borderColor = '';
          }
  
          // Update filter state and apply immediately
          handleFilterClick(categoryId, filterType, originalValue, valueId, valueName, this.checked);
          
          // Update the applied filters display
          updateAppliedFiltersDisplay(categoryId);
  
          // Show/hide buttons based on active filters
          const hasActiveFilters = filterObjects.currentAppliedFilters[categoryId].size.length > 0 || 
                                filterObjects.currentAppliedFilters[categoryId].productType.length > 0 || 
                                filterObjects.currentAppliedFilters[categoryId].tags.length > 0;
          
          // Update all clear filter buttons
          generalPopupContent.querySelectorAll('.clear-filters-btn').forEach(btn => {
              btn.style.display = hasActiveFilters ? 'block' : 'none';
          });
          
          // Update bottom button container
          const buttonContainer = generalPopupContent.querySelector('.fixed.bottom-0');
          if (buttonContainer) {
              buttonContainer.style.display = hasActiveFilters ? 'block' : 'none';
          }
          
          // Update mb-20 class on popup content
          if (hasActiveFilters) {
              generalPopupContent.classList.add('mb-20');
          } else {
              generalPopupContent.classList.remove('mb-20');
          }
      });
  });
  
  // Add click handler for clear filters button
  const clearButtons = generalPopupContent.querySelectorAll('.clear-filters-btn');
  clearButtons.forEach(button => {
      button.addEventListener('click', () => {
          const categoryId = button.getAttribute('data-category-id');
          clearCategoryFilters(categoryId);
          updateAppliedFiltersDisplay(categoryId);
      });
  });
  
  // Add click handler for Close button
  const closeButton = generalPopupContent.querySelector(`#apply-filters-${categoryId}`);
  if (closeButton) {
      closeButton.addEventListener('click', () => {
          if (typeof resetPopup === 'function') {
              resetPopup(generalPopup);
          } else {
              generalPopup.style.display = 'none';
          }
      });
  }
  }
  
  function filterProductsByCategory(categoryId, products) {
  const categoryFilters = filterObjects.currentAppliedFilters[categoryId];
  if (!categoryFilters) {
      return products;
  }
  
  const filteredProducts = products.filter(product => {
      let matchesAllFilters = true;
  
      // Check product type
      if (categoryFilters.productType.length > 0) {
          const matchesProductType = categoryFilters.productType.includes(product.productType);
          if (!matchesProductType) {
              matchesAllFilters = false;
          }
      }
  
      // Check size - Changed from AND to OR logic
      if (categoryFilters.size.length > 0) {
          let hasAnyMatchingSize = false;
          
          // Check variants for matching sizes
          if (product.variants && Array.isArray(product.variants)) {
              hasAnyMatchingSize = product.variants.some(variant => {
                  // Check if this variant's option1 matches any selected size
                  const sizeMatches = variant.option1 && categoryFilters.size.includes(variant.option1);
                  // Check if the variant is in stock
                  const isInStock = variant.availableForSale !== false && variant.available !== false;
                  
                  return sizeMatches && isInStock;
              });
          }
  
          if (!hasAnyMatchingSize) {
              matchesAllFilters = false;
          }
      }
  
      // Check tags - Group by tag prefix and use OR logic within each group
      if (categoryFilters.tags.length > 0) {
          const productTags = product.tags || [];
          
          // Group tags by their prefix (design-, pattern-, department-, etc.)
          const tagGroups = {};
          categoryFilters.tags.forEach(tag => {
              const prefix = tag.split('-')[0] + '-';
              if (!tagGroups[prefix]) {
                  tagGroups[prefix] = [];
              }
              tagGroups[prefix].push(tag);
          });
          
          // Check each tag group - product must match at least one tag from each group
          for (const [prefix, tags] of Object.entries(tagGroups)) {
              const hasAnyTagFromGroup = tags.some(selectedTag => {
                  // For design tags, we need to convert back to the original format
                  if (prefix === 'design-') {
                      // Convert "some design name" back to "design-some-design-name"
                      const designName = selectedTag.replace('design-', '');
                      const convertedTagHyphen = 'design-' + designName.replace(/\s+/g, '-');
                      const convertedTagSpace = 'design-' + designName;
                      
                      // Check both hyphenated and spaced versions
                      return productTags.includes(convertedTagHyphen) || productTags.includes(convertedTagSpace);
                  } else {
                      // For other tags, use the original format
                      return productTags.includes(selectedTag);
                  }
              });
              
              if (!hasAnyTagFromGroup) {
                  matchesAllFilters = false;
                  break;
              }
          }
      }
  
      return matchesAllFilters;
  });
  
  return filteredProducts;
  }
  
  function generateSizeFilter(products, categoryId) {
  const sizeSet = new Set();
  
  products.forEach(product => {
      // Check variants for available sizes
      if (product.variants && Array.isArray(product.variants)) {
          product.variants.forEach(variant => {
              if (variant.option1 && 
                  variant.availableForSale !== false && 
                  variant.available !== false) {
                  sizeSet.add(variant.option1);
              }
          });
      }
  });
  
  const sizes = Array.from(sizeSet).filter(Boolean);
  
  // Sort sizes in logical order
  const sortedSizes = sizes.sort((a, b) => {
      // Define size order mapping
      const sizeOrder = {
          '3-6': 0,
          '7-10': 1,
          '11-13': 2,
          'XXS': 3,
          'XS': 4,
          'S': 5,
          'SM': 5.5,
          'SMALL': 5,
          'M': 6,
          'MD': 6,
          'MEDIUM': 6,
          'L': 7,
          'LG': 7,
          'LARGE': 7,
          'XL': 8,
          '2XL': 9,
          'XXL': 9,
          '3XL': 10,
          'XXXL': 10,
          '4XL': 11,
          'XXXXL': 11,
          '5XL': 12,
          'XXXXXL': 12
      };
  
      const aOrder = sizeOrder[a.toUpperCase()] ?? 999;
      const bOrder = sizeOrder[b.toUpperCase()] ?? 999;
  
      // If both are in our mapping, sort by order
      if (aOrder !== 999 && bOrder !== 999) {
          return aOrder - bOrder;
      }
  
      // If only one is in our mapping, prioritize the mapped one
      if (aOrder !== 999) return -1;
      if (bOrder !== 999) return 1;
  
      // If neither is mapped, sort alphabetically
      return a.localeCompare(b);
  });
  
  const sizeValues = sortedSizes.map((size, idx) => ({
      id: `val-${categoryId}-size-${idx}`,
      name: size,
      tagName: size
  }));
  
  if (sizeValues.length > 0) {
      return {
          id: `filter-size-${categoryId}`,
          name: 'Size',
          required: false,
          values: sizeValues
      };
  }
  
  return null;
  }
  
  function generateTagFilter(products, tagPrefix, filterName, filterId) {
  const tagSet = new Set();
  
  products.forEach(product => {
      if (product.tags && Array.isArray(product.tags)) {
          product.tags.forEach(tag => {
              if (tag.startsWith(tagPrefix)) {
                  // Remove the prefix and replace hyphens with spaces
                  const tagValue = tag.replace(tagPrefix, '').replace(/-/g, ' ');
                  tagSet.add(tagValue);
              }
          });
      }
  });
  
  const tagValues = Array.from(tagSet).map((tag, idx) => ({
      id: `val-${filterId}-${idx}`,
      name: tag,
      tagName: tag
  }));
  
  if (tagValues.length > 0) {
      return {
          id: filterId,
          name: filterName,
          required: false,
          values: tagValues
      };
  }
  
  return null;
  }
  
  function generateCategoryFilters(categoriesDataMap) {
  filterObjects.availableFilters = [];
  filterObjects.currentAppliedFilters = {}; // Reset current applied filters
  
  Object.entries(categoriesDataMap).forEach(([categoryId, categoryData]) => {
      const products = categoryData.products || [];
  const filters = [];
  
      // Initialize currentAppliedFilters for this category
      filterObjects.currentAppliedFilters[categoryId] = {
          size: [],
          productType: [],
          tags: [] // Single array for all tags
      };
  
  // Product Type filter
  const productTypesSet = new Set();
  products.forEach(product => {
    if (product.productType) {
      productTypesSet.add(product.productType);
    }
  });
  const productTypeValues = Array.from(productTypesSet).map((type, idx) => ({
    id: `val-${categoryId}-ptype-${idx}`,
    name: type,
    tagName: type
  }));
  if (productTypeValues.length > 0) {
          filters.push({
      id: `filter-product-type-${categoryId}`,
      name: 'Product Type',
      required: false,
      values: productTypeValues
    });
  }
  
  // Size filter
      const sizeFilter = generateSizeFilter(products, categoryId);
  if (sizeFilter) {
          filters.push(sizeFilter);
      }
  
      // Department tag filter
      const departmentFilter = generateTagFilter(products, 'department-', 'Department', `department-${categoryId}`);
      if (departmentFilter) {
          filters.push(departmentFilter);
      }
  
      // Pattern tag filter
      const patternFilter = generateTagFilter(products, 'pattern-', 'Pattern', `pattern-${categoryId}`);
      if (patternFilter) {
          filters.push(patternFilter);
      }
  
      // Design tag filter
      const designFilter = generateTagFilter(products, 'design-', 'Design', `design-${categoryId}`);
      if (designFilter) {
          filters.push(designFilter);
          console.log(`[Design Filter Debug] Added design filter for category ${categoryId}:`, designFilter);
      } else {
          console.log(`[Design Filter Debug] No design filter created for category ${categoryId}`);
      }
  
  filterObjects.availableFilters.push({
    categoryId,
    categoryName: categoryData.title || categoryData.name || '',
    filters
  });
  });
  }
  
  function viewBundleItems() {
  const bundleEditContainer = document.querySelector('#view-bundle-ui');
  
  if (!bundleEditContainer) {
      return;
  }
  
  // Get the latest cart data directly from the SDK
  const cartItems = window.gbbMix.sdk.state.cartData.items || [];
  
  // Clear the container
  bundleEditContainer.innerHTML = '';
  
  if (cartItems.length === 0) {
      bundleEditContainer.innerHTML = '<div class="text-center text-lg text-gray-800 py-4 col-span-4">No items in Your bundle bundle</div>';
      return;
  }
  
  cartItems.forEach((item, index) => {
      for (let i = 0; i < item.quantity; i++) {
          const itemContainer = document.createElement('div');
          itemContainer.classList.add('relative', 'shadow-lg', 'rounded-lg', 'p-2', 'border', 'border-solid');
          
          // Create a div with the product image and a remove button
          const itemImage = document.createElement('img');
          itemImage.src = item.image;
          itemImage.alt = item.title;
          itemContainer.appendChild(itemImage);
          
          const removeButton = document.createElement('div');
          removeButton.className = 'remove-item-btn absolute -top-3 -right-3 bg-white border border-gray-300 text-black rounded-full p-2 bg-gray-200 cursor-pointer';
          removeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" class="icon" fill="currentColor" height="16" viewBox="0 0 17 16"><path d="M4.50065 12.6665C4.50065 13.0202 4.64113 13.3593 4.89118 13.6094C5.14122 13.8594 5.48036 13.9999 5.83398 13.9999H11.1673C11.5209 13.9999 11.8601 13.8594 12.1101 13.6094C12.3602 13.3593 12.5007 13.0202 12.5007 12.6665V4.66654H4.50065V12.6665ZM5.83398 5.99988H11.1673V12.6665H5.83398V5.99988ZM10.834 2.66654L10.1673 1.99988H6.83398L6.16732 2.66654H3.83398V3.99988H13.1673V2.66654H10.834Z" fill="currentColor"></path></svg>`;
          itemContainer.appendChild(removeButton);
          bundleEditContainer.appendChild(itemContainer);
  
          // Add event listener to the remove button
          removeButton.addEventListener('click', async () => {
              try {
                  const newQuantity = item.quantity > 1 ? item.quantity - 1 : 0;
                  await window.gbbMix.sdk.f.removeProductFromBundle({
                      categoryId: item.properties["_Category"],
                      variantId: item.variant_id,
                      quantity: newQuantity
                  });
  
                  // Update the product display in all category sections
                  const categories = window.gbbMix.sdk.state.categoriesData;
                  categories.forEach(category => {
                      const categoryContainer = document.querySelector(`.accordion-section[data-category-id="${category.id}"] .accordion-content`);
                      if (categoryContainer) {
                          const products = window.gbbMix.sdk.state.categoriesDataMapByCategoryId[category.id]?.products || [];
                          displayProducts(categoryContainer, products, category.id);
                      }
                  });
  
                  updateBundleUi();
              } catch (error) {
                  console.error('Error removing item from bundle:', error);
              }
          });
      }
  });
  }
  
  function displaySummerProductPopUp(product) {
  const summerPopUp = document.getElementById('easy-bundle-popup');
  const popupContent = document.getElementById('easy-bundle-popup-contents');
  if (!summerPopUp || !popupContent) return;
  
  // Prepare variants and sizes
  const variants = product.variants || [];
  const name = `size-selector-${product.id}`;
  const allSizes = (product.options && product.options[0] && Array.isArray(product.options[0].values)) ? product.options[0].values : [];
  
  // Map size to variant (if available)
  const sizeToVariant = {};
  variants.forEach(variant => {
      if (variant.option1) {
          sizeToVariant[variant.option1] = variant;
      }
  });
  
  // Build the size selector grid using allSizes
  const sizeGrid = allSizes.map((size, idx) => {
      const variant = sizeToVariant[size];
      const available = variant && variant.availableForSale !== false && variant.available !== false;
      const variantId = variant ? variant.id : '';
      // Add unavailable classes if not available
      const unavailableClasses = (!variant || !available) ? ' variant-unavailable klaviyo-bis-trigger' : '';
      return `
      <div data-variant-id="${variantId}" data-option-value="${size}" class="product-variant text-xs relative${unavailableClasses}">
          ${(!variant || !available) ? `<div class=\"out-of-stock-marker absolute z-10\" style=\"right:5%; bottom:10%;\">
              <svg fill=\"none\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" width=\"15\" height=\"15\" viewBox=\"0 0 24 24\" stroke=\"#f00f83\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9\"></path></svg>
          </div>` : ''}
          <label data-active=\"ring-2 ring-magenta\" class=\"ooption-value group relative flex items-center justify-center rounded-md border py-4 px-4 text-center text-xs font-medium font-semibold uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white shadow-sm text-wrap${!variant || !available ? ' pointer-events-none opacity-50' : ''}\">
              <input type=\"radio\" value=\"${variantId}\" name=\"${name}\" class=\"peer sr-only \" data-option-index=\"0\" data-option-value=\"${size}\" ${!variant || !available ? 'disabled' : ''} ${idx === 0 && variant && available ? 'checked' : ''}>
              <span class=\"peer-checked:border-transparent items-center flex justify-center peer-checked:bg-magenta-500 peer-checked:text-white peer-checked:hover:bg-pink-700 peer-checked:ring-2 peer-checked:ring-magenta-500 peer-checked:ring-offset-2 border-transparent pointer-events-none absolute -inset-px rounded-md\" aria-hidden=\"true\"></span>
              <span class=\"option-value relative peer-checked:text-white\">
                ${(!variant || !available) ? `<del class=\"out-of-stock-marker\">${size}</del><div class=\"in-stock-marker\">${size}</div>` : `<del class=\"out-of-stock-marker\">${size}</del><div class=\"in-stock-marker\">${size}</div>`}
              </span>
          </label>
      </div>`;
  }).join('');
  
  // Build the popup content
  popupContent.innerHTML = `
      <div class="w-full pb-20">
          <div class="flex flex-row w-full items-center gap-6">
              <div class="relative flex-shrink-0">
                  <div class="w-40 h-40 relative">
                      <img src="${product.featured_image || product.image || ''}" alt="${product.title}" class="absolute h-full object-contain rounded-md">
                      <div class="w-full" style="padding-top:100%"></div>
                  </div>
              </div>
              <div class="flex-1 flex flex-col justify-center items-start">
                  <div class="flex flex-col gap-2 mb-2">
                      <div class="text-2xl font-bold">${product.title}</div>
                      <div class="text-xs text-gray-500 md:ml-4">${product.productType || ''}</div>
                      <div class="text-xl text-magenta-500 font-bold md:ml-4">£${(product.price / 100).toFixed(2)}</div>
                  </div>
              </div>
          </div>
          <div class="font-semibold mb-2">Select Size:</div>
          <div class="product-variants grid grid-cols-4 gap-3 mb-6">
              ${sizeGrid}
          </div>
      </div>
      <div class="fixed bottom-0 md:-bottom-14 left-0 right-0 bg-white p-4 border-t">
          <div id="summer-add-to-bundle-btn"
              class="w-full btn-shadow-lg uppercase border-2 border-solid font-bold rounded-full py-4 px-8 text-center bg-magenta-500 text-white cursor-pointer opacity-50 pointer-events-none">
              Please select a size
          </div>
      </div>
  `;
  
  // Add click handler for the add button
  const addButton = popupContent.querySelector('#summer-add-to-bundle-btn');
  const sizeInputs = popupContent.querySelectorAll(`input[name='${name}']`);
  
  // Function to update button state
  const updateButtonState = () => {
      const checked = popupContent.querySelector(`input[name='${name}']:checked`);
      if (checked) {
          addButton.classList.remove('opacity-50', 'pointer-events-none');
          addButton.textContent = 'Add to Bundle';
      } else {
          addButton.classList.add('opacity-50', 'pointer-events-none');
          addButton.textContent = 'Please select a size';
      }
  };
  
  // Add change listeners to all size inputs
  sizeInputs.forEach(input => {
      input.addEventListener('change', updateButtonState);
  });
  
  // Initial button state
  updateButtonState();
  
  addButton.addEventListener('click', async () => {
      const checked = popupContent.querySelector(`input[name='${name}']:checked`);
      if (!checked) {
          return;
      }
      const variantId = checked.value;
      const variant = variants.find(v => String(v.id) === String(variantId));
      if (!variant) {
          return;
      }
      // Find if already in bundle
      const existingItem = window.gbbMix.sdk.state.cartData.items.find(
          item => item.variant_id == variant.id && item.properties["_Category"] == product.categoryId
      );
      const quantity = existingItem ? existingItem.quantity + 1 : 1;
      try {
          const result = await window.gbbMix.sdk.f.addProductToBundle({
              categoryId: product.categoryId,
              variantId: variant.id,
              quantity: quantity
          });
  
          // Instead of re-rendering the entire accordion, just update the product display
          const categoryContainer = document.querySelector(`.accordion-section[data-category-id="${product.categoryId}"] .accordion-content`);
          if (categoryContainer) {
              const products = window.gbbMix.sdk.state.categoriesDataMapByCategoryId[product.categoryId]?.products || [];
              displayProducts(categoryContainer, products, product.categoryId);
          }
          generateCategoryFilters(window.gbbMix.sdk.state.categoriesDataMapByCategoryId);
  
          // Animate the easy-bundle-selection element
          const bundleSelection = document.getElementById('easy-bundle-selection');
          const progressBar = document.getElementById('summer-progress-container');
          
          if (bundleSelection) {
              // Check if element is partially in viewport
              const isInViewport = (element) => {
                  const rect = element.getBoundingClientRect();
                  const inViewport = (
                      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
                      rect.bottom > 0 &&
                      rect.right > 0
                  );
                  return inViewport;
              };
  
              // Only proceed with animation if element is not in viewport
              if (!isInViewport(bundleSelection)) {
                  setTimeout(() => {
                      displayBundlePopup();
                  }, 1000);
              }
          }
      } catch (err) {
          console.error('Error adding product to bundle:', err);
      }
      if (typeof resetPopup === 'function') {
          resetPopup(summerPopUp);
      } else {
          summerPopUp.style.display = 'none';
      }
  });
  
  // Show the popup using openPopup
  if (typeof openPopup === 'function') {
      openPopup(summerPopUp);
  } else {
      summerPopUp.style.display = 'flex';
  }
  }
  
  function updateSummerProgressBar(cartTotal) {
  // Get Shopify cart total
  Shopify.getCart(function(cart) {
      const shopifyCartTotal = cart.total_price || 0;
      
      // Ensure both values are numbers and handle zero values
      const bundleTotal = Number(cartTotal) || 0;
      const shopifyTotal = Number(shopifyCartTotal) || 0;
      
      // Combine bundle total with Shopify cart total
      const combinedTotal = bundleTotal + shopifyTotal;
  
      // Get all progress bar containers using class selector
      const progressContainers = document.querySelectorAll('.summer-progress-container');
  
      if (progressContainers.length === 0) {
          return;
      }
  
      // Update each progress bar container
      progressContainers.forEach(progressContainer => {
          // Progress bar elements using the correct selectors
          const progressBarWrapper = progressContainer.querySelector('.summer-progress-bar');
          const progressBar = progressContainer.querySelector('#summer-progress-bar');
          const progressBarBg = progressContainer.querySelector('#summer-progress-bar-bg');
          const freeShipMarker = progressContainer.querySelector('#summer-free-ship-marker');
          const freeGiftMarker = progressContainer.querySelector('#summer-free-gift-marker');
          const progressMessage = progressContainer.querySelector('#summer-progress-message');
          const cartMessage = progressContainer.querySelector('#summer-cart-message');
  
          if (!progressBar || !progressBarBg || !freeShipMarker || !freeGiftMarker || !progressMessage || !cartMessage) {
              return;
          }
  
          // Calculate progress percentage
          const FREE_SHIPPING_THRESHOLD = 3500; // £35.00
          const FREE_GIFT_THRESHOLD = 4000; // £40.00
          
          const progressPercentage = Math.min(100, (combinedTotal / FREE_GIFT_THRESHOLD) * 100);
  
          // Update progress bar width
          progressBar.style.width = `${progressPercentage}%`;
          progressBarBg.style.width = `${progressPercentage}%`;
  
          // Update marker states
          const isShippingCompleted = combinedTotal >= FREE_SHIPPING_THRESHOLD;
          const isGiftCompleted = combinedTotal >= FREE_GIFT_THRESHOLD;
          
          freeShipMarker.classList.toggle('summer-completed', isShippingCompleted);
          freeGiftMarker.classList.toggle('summer-completed', isGiftCompleted);
  
          // Update messages
          const progressMessageHtml = combinedTotal >= FREE_SHIPPING_THRESHOLD ? `
              <div class="flex flex-nowrap items-center md:pb-2 pb-0.5 gap-2 text-left">
                  <div>
                      <svg fill="#488848" height="15px" width="15px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <polygon points="437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94"></polygon>
                      </svg>
                  </div>
                  <p class="tw-leading">You qualify for <b class="font-semibold">Free Tracked</b> UK Shipping!</p>
              </div>` : `
              <div class="flex flex-nowrap items-center md:pb-2 pb-0.5 gap-2 text-left">
                  <div>
                      <svg style="height: 15px; width:15px; margin-right:0.25rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 111.54">
                          <path fill="#d10808" d="M2.35,84.42,45.28,10.2l.17-.27h0A23,23,0,0,1,52.5,2.69,17,17,0,0,1,61.57,0a16.7,16.7,0,0,1,9.11,2.69,22.79,22.79,0,0,1,7,7.26q.19.32.36.63l42.23,73.34.24.44h0a22.48,22.48,0,0,1,2.37,10.19,17.63,17.63,0,0,1-2.17,8.35,15.94,15.94,0,0,1-6.93,6.6c-.19.1-.39.18-.58.26a21.19,21.19,0,0,1-9.11,1.75v0H17.61c-.22,0-.44,0-.65,0a18.07,18.07,0,0,1-6.2-1.15A16.42,16.42,0,0,1,3,104.24a17.53,17.53,0,0,1-3-9.57,23,23,0,0,1,1.57-8.74,7.66,7.66,0,0,1,.77-1.51Z"></path>
                      </svg>
                  </div>
                  <p class="tw-leading">Add <b class="font-semibold">£${((FREE_SHIPPING_THRESHOLD - combinedTotal) / 100).toFixed(2)}</b> more to qualify for <span class="font-semibold">Free Tracked</span> UK Shipping</p>
              </div>`;
  
          const cartMessageHtml = combinedTotal >= FREE_GIFT_THRESHOLD ? `
              <div class="flex flex-nowrap items-center md:pb-2 pb-0.5 gap-2 text-left">
                  <div>
                      <svg fill="#488848" height="15px" width="15px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                          <polygon points="437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94"></polygon>
                      </svg>
                  </div>
                  <p class="tw-leading">You qualify for a <b class="font-semibold">Free Product</b> worth up to £15.00!</p>
              </div>` : `
              <div class="flex flex-nowrap items-center md:pb-2 pb-0.5 gap-2 text-left">
                  <div>
                      <svg style="height: 15px; width:15px; margin-right:0.25rem;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.88 111.54">
                          <path fill="#d10808" d="M2.35,84.42,45.28,10.2l.17-.27h0A23,23,0,0,1,52.5,2.69,17,17,0,0,1,61.57,0a16.7,16.7,0,0,1,9.11,2.69,22.79,22.79,0,0,1,7,7.26q.19.32.36.63l42.23,73.34.24.44h0a22.48,22.48,0,0,1,2.37,10.19,17.63,17.63,0,0,1-2.17,8.35,15.94,15.94,0,0,1-6.93,6.6c-.19.1-.39.18-.58.26a21.19,21.19,0,0,1-9.11,1.75v0H17.61c-.22,0-.44,0-.65,0a18.07,18.07,0,0,1-6.2-1.15A16.42,16.42,0,0,1,3,104.24a17.53,17.53,0,0,1-3-9.57,23,23,0,0,1,1.57-8.74,7.66,7.66,0,0,1,.77-1.51Z"></path>
                      </svg>
                  </div>
                  <p class="tw-leading">Add <b class="font-semibold">£${((FREE_GIFT_THRESHOLD - combinedTotal) / 100).toFixed(2)}</b> more to qualify for a <b class="font-semibold">Free Product</b> worth up to £15.00</p>
              </div>`;
  
          progressMessage.innerHTML = progressMessageHtml;
          cartMessage.innerHTML = cartMessageHtml;
      });
  });
  }
  
  function updateBundleUi() {
  const cartData = calculateCartData();
  
  // Force a DOM update by getting the latest state
  const currentCartData = window.gbbMix.sdk.state.cartData;
  
  // Log the easy-bundle-selection element state
  const bundleSelection = document.getElementById('easy-bundle-selection');
  
  updateFooter(cartData);
  
  // Update progress bar with current cart total (including 0)
  updateSummerProgressBar(cartData.calculated_total_price || 0);
  
  // Update bundle-cta button state
  const bundleCta = document.querySelector('#bundle-cta');
  if (bundleCta) {
      if (cartData.item_count > 0) {
          bundleCta.classList.remove('opacity-50', 'pointer-events-none');
      } else {
          bundleCta.classList.add('opacity-50', 'pointer-events-none');
      }
  }
  
  // Force update the bundle items view
  viewBundleItems();
  }
  
  function calculateCartData() {
  const cartData = window.gbbMix.sdk.state.cartData;
  
  // Calculate totals from items array
  let totalPrice = 0;
  let totalCompareAtPrice = 0;
  let itemCount = 0;
  if (cartData?.items) {
      cartData.items.forEach(item => {
          totalPrice += (item.price * item.quantity);
          totalCompareAtPrice += (item.compare_at_price * item.quantity);
          itemCount += item.quantity;
      });
  }
  
  const result = {
      item_count: itemCount,
      total_price: cartData?.total_price,
      calculated_total_price: totalPrice,
      calculated_total_compare_at_price: totalCompareAtPrice
  };
  return result;
  }
  
  // Update footer totals (mirroring easy-bundle.js)
  function updateFooter(cartData) {
  const bundlePrice = document.querySelector('#bundle-price');
  const bundleComparePrice = document.querySelector('#bundle-compare-price');
  const bundleCount = document.querySelector('#bundle-item-count');
  
  if (bundlePrice) {
      if (cartData.item_count === 0) {
          bundlePrice.textContent = '£0.00';
      } else {
          bundlePrice.textContent = `£${(cartData.calculated_total_price / 100).toFixed(2)}`;
      }
  }
  
  if (bundleComparePrice && cartData.item_count > 0 && cartData.calculated_total_price && cartData.calculated_total_compare_at_price) {
      // Only show compare at price if it's higher than the regular price
      if (cartData.calculated_total_compare_at_price > cartData.calculated_total_price) {
          bundleComparePrice.textContent = `£${(cartData.calculated_total_compare_at_price / 100).toFixed(2)}`;
      } else {
          bundleComparePrice.textContent = '';
      }
  } else if (bundleComparePrice) {
      bundleComparePrice.textContent = '';
  }
  
  if (bundleCount) {
      bundleCount.textContent = cartData.item_count;
  }
  }
  
  function hideEasyBundleUi() {
  const easyBundleUi = document.querySelector('.gbbMixAndMatchProductPageAppBlock');
  const myBundleContainer = document.querySelector('#summer-bundle-container');
  const loader = document.querySelector('.loading-placeholder');
  const bundleEditor = document.querySelector('#easy-bundle-selection')
  
  if(bundleEditor){
    bundleEditor.classList.remove('hidden')
  }
  
  if(loader){
   loader.remove() 
  }
  
  if (easyBundleUi) {
      easyBundleUi.classList.add('hidden');
  }
  if (myBundleContainer) {
      myBundleContainer.classList.remove('hidden');
  }
  }
  
  function displayProducts(container, products, categoryId) {
  if (!container) return;
  
  // Filter products based on current filters
  const filteredProducts = filterProductsByCategory(categoryId, products);
  
  // Apply current sort if exists
  const currentSort = filterObjects.currentSort[categoryId];
  const sortedAndFilteredProducts = currentSort ? 
      sortProducts(filteredProducts, currentSort) : 
      filteredProducts;
  
  // Remove any existing product grid
  const existingGrid = container.querySelector('.product-grid');
  if (existingGrid) {
      existingGrid.remove();
  }
  
  // Create new product grid
  const grid = document.createElement('div');
  grid.className = 'product-grid grid grid-cols-2 md:grid-cols-4  gap-2 md:gap-2 mt-2 ';
  
  // Get current bundle items
  const bundleItems = window.gbbMix.sdk.state.cartData.items || [];
  
  sortedAndFilteredProducts.forEach(product => {
      const card = document.createElement('div');
      card.className = 'easy-product-card relative rounded-lg bg-white hover:shadow cursor-pointer flex flex-col';
  
      // Check if product is in bundle and get total quantity across all variants
      const productBundleItems = bundleItems.filter(item => {
          // Safety check for product variants
          if (!product.variants || !product.variants.length) return false;
          
          // Check if this variant exists in the product and is in the correct category
          return product.variants.some(variant => variant.id === item.variant_id) && 
                 item.properties && 
                 item.properties["_Category"] === categoryId;
      });
  
      const isInBundle = productBundleItems.length > 0;
      const totalQuantity = productBundleItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  
      // Add special classes if product is in bundle
      if (isInBundle) {
          card.classList.add('border-2', 'shadow', 'border-solid', 'border-magenta-500');
          
          // Add quantity marker
          const quantityMarker = document.createElement('div');
          quantityMarker.className = 'absolute top-2 right-2 bg-magenta-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold z-[1]';
          quantityMarker.textContent = totalQuantity;
          card.appendChild(quantityMarker);
      }
  
      // Image container
      const imgContainer = document.createElement('div');
      imgContainer.className = 'relative w-full aspect-square bg-gray-100 rounded-t-lg overflow-hidden';
  
      const img = document.createElement('img');
      img.className = 'absolute top-0 left-0 w-full h-full object-contain';
      img.src = product.featured_image || product.image || '';
      img.alt = product.title || '';
  
      imgContainer.appendChild(img);
  
            // Product details
      const details = document.createElement('div');
      details.className = 'p-3 flex flex-col flex-1 justify-between';
      
      // Content container for title and type
      const contentContainer = document.createElement('div');
      
      const title = document.createElement('div');
      title.className = 'font-bold text-base mb-1 ';
      title.textContent = product.title || product.name || 'Untitled Product';
      contentContainer.appendChild(title);
      
      // Add product type if available
      if (product.productType) {
          const type = document.createElement('div');
          type.className = 'text-xs text-gray-500 mb-1 truncate';
          type.textContent = product.productType;
          contentContainer.appendChild(type);
      }
      
      details.appendChild(contentContainer);
      
      // Price container at the bottom
      if (product.price) {
          const price = document.createElement('div');
          price.className = 'text-magenta-500 font-semibold text-sm mt-auto';
          
          // Check if there's a compare_at_price and it's higher than the regular price
          if (product.compare_at_price && product.compare_at_price > product.price) {
              price.innerHTML = `£${(product.price / 100).toFixed(2)} <span class="text-gray-400 line-through ml-2">£${(product.compare_at_price / 100).toFixed(2)}</span>`;
          } else {
              price.textContent = `£${(product.price / 100).toFixed(2)}`;
          }
          
          details.appendChild(price);
      }
  
      card.appendChild(imgContainer);
      card.appendChild(details);
  
      card.addEventListener('click', () => {
          displaySummerProductPopUp({ ...product, categoryId });
      });
  
      grid.appendChild(card);
  });
  
  // Add the new grid to the container
  container.appendChild(grid);
  }
  
  function updateFilterButtonState(categoryId) {
  const filterBtn = document.querySelector(`.accordion-section[data-category-id="${categoryId}"] .filter-btn`);
  const accordionHeader = document.querySelector(`.accordion-section[data-category-id="${categoryId}"] .accordion-header`);
  if (!filterBtn || !accordionHeader) return;
  
  const categoryFilters = filterObjects.currentAppliedFilters[categoryId];
  if (!categoryFilters) return;
  
  const totalFilters = categoryFilters.size.length + categoryFilters.productType.length + categoryFilters.tags.length;
  
  // Remove existing indicators from both locations
  const existingFilterIndicator = filterBtn.querySelector('.filter-indicator');
  if (existingFilterIndicator) {
      existingFilterIndicator.remove();
  }
  const existingHeaderFilterIndicator = accordionHeader.querySelector('.filter-indicator');
  if (existingHeaderFilterIndicator) {
      existingHeaderFilterIndicator.remove();
  }
  
  if (totalFilters > 0) {
      // Create the indicator for the filter button
      const buttonIndicator = document.createElement('div');
      buttonIndicator.className = 'filter-indicator ml-1 bg-[#00adef] rounded-full flex items-center justify-center text-white text-[10px] font-bold px-2 py-0.5 text-nowrap';
      buttonIndicator.textContent = `${totalFilters} applied`;
      
      // Create the indicator for the accordion header
      const headerIndicator = document.createElement('span');
      headerIndicator.className = 'filter-indicator ml-1 bg-[#00adef] rounded-full flex items-center justify-center text-white text-[10px] font-bold px-2 py-0.5 text-nowrap';
      headerIndicator.textContent = 'Filtered';
      
      // Check if accordion is open
      const isOpen = accordionHeader.getAttribute('aria-expanded') === 'true';
      
      if (isOpen) {
          // Add to filter button if accordion is open
          const filterArrow = filterBtn.querySelector('.filter-arrow');
          if (filterArrow) {
              filterArrow.parentNode.insertBefore(buttonIndicator, filterArrow);
          }
      } else {
          // Add to accordion header if closed
          const indicatorsContainer = accordionHeader.querySelector('.indicators-container');
          if (indicatorsContainer) {
              indicatorsContainer.appendChild(headerIndicator);
          }
      }
  }
  }
  
  function updateSortButtonState(categoryId) {
  const sortBtn = document.querySelector(`.accordion-section[data-category-id="${categoryId}"] .sort-btn`);
  const accordionHeader = document.querySelector(`.accordion-section[data-category-id="${categoryId}"] .accordion-header`);
  if (!sortBtn || !accordionHeader) return;
  
  const currentSort = filterObjects.currentSort[categoryId];
  
  // Remove existing indicators from both locations
  const existingSortIndicator = sortBtn.querySelector('.sort-indicator');
  if (existingSortIndicator) {
      existingSortIndicator.remove();
  }
  const existingHeaderSortIndicator = accordionHeader.querySelector('.sort-indicator');
  if (existingHeaderSortIndicator) {
      existingHeaderSortIndicator.remove();
  }
  
  if (!currentSort || currentSort === 'most-relevant') {
      return;
  }
  
  // Get the label for the current sort
  const sortLabels = {
      'price-asc': 'Price: Low to High',
      'price-desc': 'Price: High to Low',
      'name-asc': 'Name: A to Z',
      'name-desc': 'Name: Z to A'
  };
  
  const sortLabel = sortLabels[currentSort] || '';
  
  // Create the indicator for the sort button
  const buttonIndicator = document.createElement('div');
  buttonIndicator.className = 'sort-indicator ml-1 bg-magenta rounded-full flex items-center justify-center text-white text-[10px] font-bold px-2 py-0.5 text-nowrap';
  buttonIndicator.textContent = sortLabel;
  
  // Create the indicator for the accordion header
  const headerIndicator = document.createElement('span');
  headerIndicator.className = 'sort-indicator ml-1 bg-magenta rounded-full flex items-center justify-center text-white text-[10px] font-bold px-2 py-0.5 text-nowrap';
  headerIndicator.textContent = 'Sorted';
  
  // Check if accordion is open
  const isOpen = accordionHeader.getAttribute('aria-expanded') === 'true';
  
  if (isOpen) {
      // Add to sort button if accordion is open
      const sortArrow = sortBtn.querySelector('.sort-arrow');
      if (sortArrow) {
          sortArrow.parentNode.insertBefore(buttonIndicator, sortArrow);
      }
  } else {
      // Add to accordion header if closed
      const indicatorsContainer = accordionHeader.querySelector('.indicators-container');
      if (indicatorsContainer) {
          indicatorsContainer.appendChild(headerIndicator);
      }
  }
  }
  
  function displaySortPopup(title, categoryId) {
  const generalPopup = document.getElementById("general-popup-content");
  const generalPopupContent = document.getElementById("general-popup-contents");
  const generalPopupHeader = document.getElementById("general-popup-header");
  
  if (!generalPopup || !generalPopupContent || !generalPopupHeader) return;
  
  // Set the popup header
  generalPopupHeader.innerHTML = `<div id="sort-header">Sort ${title}</div>`;
  
  // Build the sort options
  const sortOptions = [
      { id: 'most-relevant', label: 'Most Relevant' },
      { id: 'price-asc', label: 'Price: Low to High' },
      { id: 'price-desc', label: 'Price: High to Low' },
      { id: 'name-asc', label: 'Name: A to Z' },
      { id: 'name-desc', label: 'Name: Z to A' }
  ];
  
  // Get current sort or default to most-relevant
  const currentSort = filterObjects.currentSort[categoryId] || 'most-relevant';
  const hasSort = currentSort && currentSort !== 'most-relevant';
  
  // Add the missing hasActiveFilters definition
  const hasActiveFilters = hasSort;
  
  let html = `
      <div class="w-full">
          <div class="flex flex-col p-4 ">`;
  
  sortOptions.forEach(option => {
      const isSelected = option.id === currentSort;
      html += `
          <label class="sort-option flex items-center justify-between p-3 border-b border-t cursor-pointer hover:bg-gray-50">
              <span class="text-sm font-medium">${option.label}</span>
              <input type="radio" name="sort-option" value="${option.id}" class="sort-radio sr-only" ${isSelected ? 'checked' : ''}>
              <div class="check-indicator w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                  <div class="w-3 h-3 bg-[#00adef] rounded-full ${isSelected ? '' : 'hidden'}"></div>
              </div>
          </label>`;
  });
  
  html += `
          </div>
      </div>`;
  
  // Add bottom buttons if sort is applied
  if (hasSort) {
      html += `
      <div class="w-full mt-4 px-4 pb-4 fixed bottom-0 left-0 bg-white">
          <div class="flex gap-2">
              <button class="clear-sort-btn w-full border border-[#00adef] text-[#00adef] font-semibold py-3 px-6 rounded-full hover:bg-[#00adef] hover:text-white transition-colors"
                      data-category-id="${categoryId}">
                  Clear sort
              </button>
              <button id="apply-sort-${categoryId}" 
                      class="w-full bg-[#00adef] text-white font-semibold py-3 px-6 rounded-full hover:bg-[#0095d1] transition-colors">
                  Close
              </button>
          </div>
      </div>`;
  }
  
  generalPopupContent.innerHTML = html;
  
  // Add mb-20 class if there are active filters (buttons will be shown)
  if (hasActiveFilters) {
      generalPopupContent.classList.add('mb-20');
  } else {
      generalPopupContent.classList.remove('mb-20');
  }
  
  openPopup(generalPopup);
  
  // Add click handlers for sort options
  generalPopupContent.querySelectorAll('.sort-option').forEach(option => {
      option.addEventListener('click', function() {
          // Update visual selection
          generalPopupContent.querySelectorAll('.sort-option').forEach(opt => {
              opt.querySelector('.check-indicator div').classList.add('hidden');
          });
          this.querySelector('.check-indicator div').classList.remove('hidden');
          
          // Update radio button
          const radio = this.querySelector('.sort-radio');
          radio.checked = true;
  
          // Auto-apply the sort
          const sortType = radio.value;
          filterObjects.currentSort[categoryId] = sortType;
          
          // Get the current products and apply both filter and sort
          const products = window.gbbMix.sdk.state.categoriesDataMapByCategoryId[categoryId]?.products || [];
          const categoryContainer = document.querySelector(`.accordion-section[data-category-id="${categoryId}"] .accordion-content`);
          if (categoryContainer) {
              displayProducts(categoryContainer, products, categoryId);
          }
  
          // Update sort button state
          updateSortButtonState(categoryId);
  
          // Close the popup
          if (typeof resetPopup === 'function') {
              resetPopup(generalPopup);
          } else {
              generalPopup.style.display = 'none';
          }
      });
  });
  
  // Add click handler for clear sort button
  const clearSortBtn = generalPopupContent.querySelector('.clear-sort-btn');
  if (clearSortBtn) {
      clearSortBtn.addEventListener('click', () => {
          // Clear the sort
          delete filterObjects.currentSort[categoryId];
          
          // Get the current products and apply filters only
          const products = window.gbbMix.sdk.state.categoriesDataMapByCategoryId[categoryId]?.products || [];
          const categoryContainer = document.querySelector(`.accordion-section[data-category-id="${categoryId}"] .accordion-content`);
          if (categoryContainer) {
              displayProducts(categoryContainer, products, categoryId);
          }
  
          // Update sort button state
          updateSortButtonState(categoryId);
  
          // Close the popup
          if (typeof resetPopup === 'function') {
              resetPopup(generalPopup);
          } else {
              generalPopup.style.display = 'none';
          }
      });
  }
  
  // Add click handler for Close button
  const closeButton = generalPopupContent.querySelector(`#apply-sort-${categoryId}`);
  if (closeButton) {
      closeButton.addEventListener('click', () => {
          if (typeof resetPopup === 'function') {
              resetPopup(generalPopup);
          } else {
              generalPopup.style.display = 'none';
          }
      });
  }
  }
  
  function sortProducts(products, sortType) {
  const sortedProducts = [...products];
  
  switch (sortType) {
      case 'most-relevant':
          // Return products in their original order
          return sortedProducts;
      case 'price-asc':
          sortedProducts.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
      case 'price-desc':
          sortedProducts.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
      case 'name-asc':
          sortedProducts.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
          break;
      case 'name-desc':
          sortedProducts.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
          break;
  }
  
  
  return sortedProducts;
  }
  
  function renderCategoryAccordion() {
  const categories = window.gbbMix.sdk.state.categoriesData;
  const categoriesDataMap = window.gbbMix.sdk.state.categoriesDataMapByCategoryId;
  const container = document.getElementById('summer-bundle-ui');
  if (!container) return;
  container.innerHTML = '';
  filterObjects.availableFilters = []; // Reset before building
  
  categories.forEach((category, idx) => {
      const categoryId = category.id;
      const title = category.title || category.name || `Category ${idx+1}`;
      const products = categoriesDataMap[categoryId]?.products || [];
  
      // Create accordion section
      const accordionSection = document.createElement('div');
      accordionSection.className = 'accordion-section md:py-6  border-t md:border-r md:border-l border-gray-200 uppercase font-bold text-lg py-4 md:text-2xl';
      accordionSection.setAttribute('data-category-id', categoryId);
  
      // Accordion header
      const header = document.createElement('div');
      header.className = 'accordion-header cursor-pointer px-6 bg-white py-4';
      header.setAttribute('aria-expanded', 'false');
      header.style.display = 'flex';
      header.style.justifyContent = 'space-between';
      header.style.alignItems = 'center';
      header.style.width = '100%';
      header.style.gap = '1rem';
  
      // Create a container for the title and indicators
      const titleContainer = document.createElement('div');
      titleContainer.className = 'flex items-center gap-2';
      titleContainer.textContent = title;
      header.appendChild(titleContainer);
  
      // Create indicators container
      const indicatorsContainer = document.createElement('div');
      indicatorsContainer.className = 'indicators-container flex items-center gap-2';
      header.appendChild(indicatorsContainer);
  
      // Downward Arrow SVG
      const arrowSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      arrowSvg.setAttribute('width', '20');
      arrowSvg.setAttribute('height', '20');
      arrowSvg.setAttribute('viewBox', '0 0 20 20');
      arrowSvg.setAttribute('fill', 'none');
      arrowSvg.classList.add('accordion-arrow-svg');
      arrowSvg.style.transition = 'transform 0.2s';
      arrowSvg.innerHTML = '<polyline points="5 8 10 13 15 8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      header.appendChild(arrowSvg);
  
      // Accordion content
      const content = document.createElement('div');
      content.className = 'accordion-content';
      content.style.display = 'none';
  
      header.onclick = function() {
          const expanded = this.getAttribute('aria-expanded') === 'true';
          
          // Close all other accordions
          document.querySelectorAll('.accordion-section').forEach(section => {
              if (section !== accordionSection) {
                  const otherHeader = section.querySelector('.accordion-header');
                  const otherContent = section.querySelector('.accordion-content');
                  const otherArrow = otherHeader.querySelector('.accordion-arrow-svg');
                  
                  otherHeader.setAttribute('aria-expanded', 'false');
                  otherContent.style.display = 'none';
                  otherArrow.style.transform = 'rotate(0deg)';
                  
                  // Remove sticky positioning from other headers
                  otherHeader.style.position = '';
                  otherHeader.style.top = '';
                  otherHeader.style.zIndex = '';
                  otherHeader.style.borderBottom = '';
                  otherHeader.style.transform = '';
              }
          });
  
          this.setAttribute('aria-expanded', !expanded);
          content.style.display = expanded ? 'none' : 'block';
          arrowSvg.style.transform = expanded ? 'rotate(0deg)' : 'rotate(180deg)';
          
          // Update sticky positioning when accordion is opened/closed
          if (!expanded) {
              header.style.position = 'sticky';
              header.style.top = '133px';
              header.style.zIndex = '9';
              header.style.borderBottom = '1px solid #e5e7eb';
              header.style.transform = 'translateZ(0)';
          } else {
              header.style.position = '';
              header.style.top = '';
              header.style.zIndex = '';
              header.style.borderBottom = '';
              header.style.transform = '';
              
              // Scroll to the top of the accordion section when closing
              const accordionTop = accordionSection.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                  top: accordionTop - 150, // Subtract header height to account for fixed header
                  behavior: 'auto'
              });
          }
  
          // Update indicators after state change
          updateFilterButtonState(categoryId);
          updateSortButtonState(categoryId);
      };
  
      if (products.length === 0) {
          content.textContent = 'No products in this category.';
      } else {
          // Add filter and sort buttons above the product grid
          const controlsContainer = document.createElement('div');
          controlsContainer.className = 'flex items-center justify-between md:gap-2 mb-2 border-b bg-white';
          controlsContainer.style.position = 'sticky';
          controlsContainer.style.top = '194px';
          controlsContainer.style.zIndex = '10';
          controlsContainer.style.transform = 'translateZ(0)';
  
          // Sort button
          const sortBtn = document.createElement('div');
          sortBtn.className = 'sort-btn md:border-l px-4 md:py-6 py-4 text-xs font-semibold hover:opacity-20 transition cursor-pointer w-full flex items-center justify-center';
          sortBtn.innerHTML = 'Sort <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 sort-arrow transition-transform duration-200"><polyline points="6 9 12 15 18 9"></polyline></svg>';
          sortBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              displaySortPopup(title, categoryId);
          });
  
          // Filter button
          const filterBtn = document.createElement('div');
          filterBtn.className = 'filter-btn md:border-l rounded md:py-6 py-6 text-xs font-semibold hover:opacity-20 transition cursor-pointer w-full flex items-center justify-center border-r';
          filterBtn.innerHTML = 'Filter <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 filter-arrow transition-transform duration-200"><polyline points="6 9 12 15 18 9"></polyline></svg>';
          filterBtn.addEventListener('click', (e) => {
              e.stopPropagation();
              displayFilterPopup(title, categoryId);
          });
  
          controlsContainer.appendChild(filterBtn);
          controlsContainer.appendChild(sortBtn);
          content.appendChild(controlsContainer);
  
          // Use the displayProducts function to render the product grid
          displayProducts(content, products, categoryId);
          
          // Update filter button state initially
          updateFilterButtonState(categoryId);
      }
  
      accordionSection.appendChild(header);
      accordionSection.appendChild(content);
      container.appendChild(accordionSection);
  });
  }
  
  function waitForGbb() {
  if (window.gbbMix) {
      console.log('[gbbMix] SDK detected, checking initialization state...');
      
      // Check if SDK is already ready (cached data scenario)
      if (window.gbbMix.sdk && window.gbbMix.sdk.state && window.gbbMix.sdk.state.isBundleLoading === false) {
          console.log('[gbbMix] SDK already ready (cached data detected)');
          console.log('[gbbMix] Cart data source: CACHED');
          console.log('[gbbMix] Categories data source: CACHED');
          console.log('[gbbMix] Cart items count:', window.gbbMix.sdk.state.cartData?.items?.length || 0);
          console.log('[gbbMix] Categories count:', Object.keys(window.gbbMix.sdk.state.categoriesDataMapByCategoryId || {}).length);
          initializeBundleUI();
          return;
      }
  
      // Listen for the initialization event (first load scenario)
      document.addEventListener('gbbMix-bundle-initialized', () => {
          console.log('[gbbMix] Bundle initialization event fired');
          const checkBundleReady = () => {
              if (window.gbbMix.sdk.state.isBundleLoading === false) {
                  console.log('[gbbMix] Bundle loading complete');
                  console.log('[gbbMix] Cart data source: FRESH API');
                  console.log('[gbbMix] Categories data source: FRESH API');
                  console.log('[gbbMix] Cart items count:', window.gbbMix.sdk.state.cartData?.items?.length || 0);
                  console.log('[gbbMix] Categories count:', Object.keys(window.gbbMix.sdk.state.categoriesDataMapByCategoryId || {}).length);
                  initializeBundleUI();
              } else {
                  setTimeout(checkBundleReady, 100);
              }
          };
          checkBundleReady();
      });
  
      // Fallback: Check periodically in case event doesn't fire (cached data scenario)
      const fallbackCheck = () => {
          if (window.gbbMix.sdk && window.gbbMix.sdk.state && window.gbbMix.sdk.state.isBundleLoading === false) {
              console.log('[gbbMix] SDK ready detected via fallback check');
              console.log('[gbbMix] Cart data source: CACHED (fallback)');
              console.log('[gbbMix] Categories data source: CACHED (fallback)');
              console.log('[gbbMix] Cart items count:', window.gbbMix.sdk.state.cartData?.items?.length || 0);
              console.log('[gbbMix] Categories count:', Object.keys(window.gbbMix.sdk.state.categoriesDataMapByCategoryId || {}).length);
              initializeBundleUI();
          } else {
              setTimeout(fallbackCheck, 200);
          }
      };
      
      // Start fallback check after a short delay
      setTimeout(fallbackCheck, 500);
  } else {
      setTimeout(waitForGbb, 100);
  }
  }
  
  // Separate function to initialize the bundle UI
  function initializeBundleUI() {
  console.log('[gbbMix] Starting bundle UI initialization...');
  
  const initialCartTotal = window.gbbMix.sdk.state.cartData?.total_price || 0;
  console.log('[gbbMix] Initial cart total:', initialCartTotal);
  
  // Log data structure details
  const cartData = window.gbbMix.sdk.state.cartData;
  const categoriesData = window.gbbMix.sdk.state.categoriesDataMapByCategoryId;
  
  console.log('[gbbMix] Cart data structure:', {
      hasCartData: !!cartData,
      hasItems: !!(cartData && cartData.items),
      itemsCount: cartData?.items?.length || 0,
      totalPrice: cartData?.total_price || 0,
      itemCount: cartData?.item_count || 0
  });
  
  console.log('[gbbMix] Categories data structure:', {
      hasCategoriesData: !!categoriesData,
      categoriesCount: Object.keys(categoriesData || {}).length,
      categoryIds: Object.keys(categoriesData || {}),
      sampleCategory: categoriesData ? Object.keys(categoriesData)[0] : null
  });
  
  // Log sample category data if available
  if (categoriesData && Object.keys(categoriesData).length > 0) {
      const firstCategoryId = Object.keys(categoriesData)[0];
      const firstCategory = categoriesData[firstCategoryId];
      console.log('[gbbMix] Sample category data:', {
          categoryId: firstCategoryId,
          hasProducts: !!(firstCategory && firstCategory.products),
          productsCount: firstCategory?.products?.length || 0,
          sampleProduct: firstCategory?.products?.[0] ? {
              id: firstCategory.products[0].id,
              title: firstCategory.products[0].title,
              hasVariants: !!(firstCategory.products[0].variants),
              variantsCount: firstCategory.products[0].variants?.length || 0
          } : null
      });
  }
  
  updateSummerProgressBar(initialCartTotal);
  updateBundleUi();
  renderCategoryAccordion();
  generateCategoryFilters(window.gbbMix.sdk.state.categoriesDataMapByCategoryId);
  hideEasyBundleUi();
  
  console.log('[gbbMix] Bundle UI initialized successfully');
  }
  
  // Listen for product add/remove and update UI (mirroring easy-bundle.js)
  if (window.gbbMix && window.gbbMix.sdk && window.gbbMix.sdk.f) {
  const originalAddProduct = window.gbbMix.sdk.f.addProductToBundle;
  window.gbbMix.sdk.f.addProductToBundle = async function(...args) {
      try {
          const result = await originalAddProduct.apply(this, args);
          
          // Force a small delay to ensure state is updated
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Force update the bundle UI
          updateBundleUi();
          
          // Double check the UI update after a short delay
          setTimeout(() => {
              const bundleContainer = document.querySelector('#view-bundle-ui');
              updateBundleUi();
          }, 500);
          
          return result;
      } catch (error) {
          console.error('Error in addProductToBundle:', error);
          throw error;
      }
  };
  }
  
  // Add bundle to cart logic (mirroring easy-bundle.js)
  document.addEventListener('DOMContentLoaded', function() {
  const bundleCta = document.querySelector('#bundle-cta');
  if (!bundleCta) {
      return;
  }
  
  // Function to reset the bundle UI after adding to cart
  function resetBundleUI() {
      
      // Clear all bundle items from the SDK
      if (window.gbbMix && window.gbbMix.sdk && window.gbbMix.sdk.f) {
          // Clear all categories
          const categories = window.gbbMix.sdk.state.categoriesData;
          categories.forEach(async (category) => {
              try {
                  await window.gbbMix.sdk.f.clearBundleCategory({
                      categoryId: category.id
                  });
              } catch (error) {
                  console.error(`[Bundle Reset] Error clearing category ${category.id}:`, error);
              }
          });
      }
      
      // Reset all filter states
      filterObjects.currentAppliedFilters = {};
      filterObjects.currentSort = {};
      
      // Clear all filter checkboxes
      const filterCheckboxes = document.querySelectorAll('.filter-option');
      filterCheckboxes.forEach(checkbox => {
          checkbox.checked = false;
          const label = checkbox.parentElement;
          label.classList.remove('bg-[#00adef]', 'text-white');
          label.style.borderColor = '';
      });
      
      // Clear all applied filter displays
      const appliedFilterContainers = document.querySelectorAll('[id^="applied-filter-accordion-content-"]');
      appliedFilterContainers.forEach(container => {
          container.innerHTML = '<div class="text-gray-500 text-sm">No filters applied</div>';
      });
      
      // Hide all clear filter buttons
      const clearButtons = document.querySelectorAll('.clear-filters-btn');
      clearButtons.forEach(btn => {
          btn.style.display = 'none';
      });
      
      // Reset all accordion sections to closed state
      const accordionHeaders = document.querySelectorAll('.accordion-header');
      accordionHeaders.forEach(header => {
          header.setAttribute('aria-expanded', 'false');
          const content = header.nextElementSibling;
          if (content && content.classList.contains('accordion-content')) {
              content.style.display = 'none';
          }
          const arrow = header.querySelector('.accordion-arrow-svg');
          if (arrow) {
              arrow.style.transform = 'rotate(0deg)';
          }
      });
      
      // Remove all filter and sort indicators
      const indicators = document.querySelectorAll('.filter-indicator, .sort-indicator');
      indicators.forEach(indicator => indicator.remove());
      
      // Reset bundle UI elements
      const bundlePrice = document.querySelector('#bundle-price');
      const bundleComparePrice = document.querySelector('#bundle-compare-price');
      const bundleCount = document.querySelector('#bundle-item-count');
      
      if (bundlePrice) bundlePrice.textContent = '£0.00';
      if (bundleComparePrice) bundleComparePrice.textContent = '';
      if (bundleCount) bundleCount.textContent = '0';
      
      // Clear bundle items view
      const bundleEditContainer = document.querySelector('#view-bundle-ui');
      if (bundleEditContainer) {
          bundleEditContainer.innerHTML = '<div class="text-center text-lg text-gray-800 py-4 col-span-4">No items in Your bundle bundle</div>';
      }
      
      // Reset progress bar
      updateSummerProgressBar(0);
      
      // Hide floating button
      const floatingButton = document.getElementById('floating-bundle-button');
      if (floatingButton) {
          floatingButton.classList.add('hidden');
      }
      
      // Close bundle popup if open
      const bundleSelection = document.getElementById('easy-bundle-selection');
      if (bundleSelection) {
          // Remove popup classes
          bundleSelection.classList.remove('!fixed', 'bottom-0', 'left-0', 'right-0', 'transform', 'transition-transform', 'duration-500', 'ease-in-out', 'z-50', 'rounded-t-2xl', 'p-4');
          bundleSelection.style.transform = '';
          bundleSelection.style.position = '';
          bundleSelection.style.bottom = '';
          bundleSelection.style.left = '';
          bundleSelection.style.right = '';
          bundleSelection.style.zIndex = '';
          
      }
      
      // Remove overlay if exists
      const overlay = document.querySelector('.bundle-overlay');
      if (overlay) {
          overlay.remove();
      }
      
      // Re-render category accordion with fresh data
      setTimeout(() => {
          renderCategoryAccordion();
          generateCategoryFilters(window.gbbMix.sdk.state.categoriesDataMapByCategoryId);
          console.log('[Bundle Reset] UI reset complete');
      }, 100);
  }
  
  bundleCta.addEventListener('click', async (e) => {
      try {
          // Prevent any default form submission behavior
          e.preventDefault();
          e.stopPropagation();
          
          // Check if there are items in the bundle
          const cartData = window.gbbMix.sdk.state.cartData;
          
          if (!cartData || !cartData.items || cartData.items.length === 0) {
              return;
          }
          
          // Disable button and show loading state
          bundleCta.classList.add('opacity-50', 'pointer-events-none');
          const originalText = bundleCta.textContent;
          bundleCta.textContent = 'Adding to cart...';
          
          // Override any redirect settings
          const originalPostAddToCartDecisionApplicator = window.gbbMix.utility.postAddToCartDecisionApplicator;
          window.gbbMix.utility.postAddToCartDecisionApplicator = () => {};
          
          try {
              // Add bundle to cart using the SDK
              await window.gbbMix.sdk.f.addBundleToCart();
              
              // Reset the bundle UI after successful add to cart
              resetBundleUI();
              
              // Add a small delay before updating the cart
              setTimeout(() => {
                  updateCart();
              }, 500);
          } finally {
              // Restore original redirect behavior
              window.gbbMix.utility.postAddToCartDecisionApplicator = originalPostAddToCartDecisionApplicator;
          }
          
          // Reset button state
          bundleCta.classList.remove('opacity-50', 'pointer-events-none');
          bundleCta.textContent = originalText;
          
      } catch (error) {
          console.error('Error adding bundle to cart:', error);
          // Reset button state
          bundleCta.classList.remove('opacity-50', 'pointer-events-none');
          bundleCta.textContent = 'Add Bundle To Cart';
      }
  });
  });
  
  // Start waiting for gbb
  waitForGbb();
  
  // Add cart update listener
  document.addEventListener('cart:updated', function(event) {
  // Get the current bundle total
  const initialCartTotal = window.gbbMix.sdk.state.cartData?.total_price || 0;
  updateSummerProgressBar(initialCartTotal);
  });
  
  // Add floating button functionality
  function createFloatingButton() {
  const floatingButton = document.createElement('div');
  floatingButton.id = 'floating-bundle-button';
  floatingButton.className = 'fixed bottom-4 left-1/2 right-1/2 -translate-x-1/2 z-50 hidden';
  floatingButton.innerHTML = `
      <div class="cursor-pointer bg-magenta w-[150px] px-5 text-white font-bold absolute left-1/2 right-1/2 -translate-x-1/2 flex items-center -top-10 rounded-full justify-center py-3 bottom-0">
          <span id="floating-bundle-count">0</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-2">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.50059C3 4.00353 3.40294 3.60059 3.9 3.60059H5.83438C6.88071 3.60059 7.76448 4.37015 7.91285 5.40059H19.5C19.7507 5.40059 19.99 5.50514 20.1604 5.68908C20.3307 5.87302 20.4166 6.11966 20.3974 6.36961L19.9678 11.9537C19.8356 13.673 18.4019 15.0006 16.6775 15.0006H9.05636L9.16772 15.936C9.18568 16.087 9.31365 16.2006 9.46562 16.2006H17.1C17.5971 16.2006 18 16.6035 18 17.1006C18 17.5976 17.5971 18.0006 17.1 18.0006H9.46562C8.40184 18.0006 7.50609 17.2051 7.38034 16.1488L6.13228 5.66512C6.11432 5.51422 5.98635 5.40059 5.83438 5.40059H3.9C3.40294 5.40059 3 4.99764 3 4.50059ZM8.84207 13.2006H16.6775C17.4613 13.2006 18.113 12.5971 18.1731 11.8156L18.5281 7.20059H8.12778L8.84207 13.2006ZM12 20.4006C12 21.0633 11.4627 21.6006 10.8 21.6006C10.1373 21.6006 9.6 21.0633 9.6 20.4006C9.6 19.7378 10.1373 19.2006 10.8 19.2006C11.4627 19.2006 12 19.7378 12 20.4006ZM18 20.4006C18 21.0633 17.4627 21.6006 16.8 21.6006C16.1373 21.6006 15.6 21.0633 15.6 20.4006C15.6 19.7378 16.1373 19.2006 16.8 19.2006C17.4627 19.2006 18 19.7378 18 20.4006Z" fill="#FFFFFF"></path>
          </svg>
      </div>
  `;
  document.body.appendChild(floatingButton);
  
  // Add click handler to trigger bundle view
  floatingButton.addEventListener('click', () => {
      // Hide floating button immediately when clicked
      floatingButton.classList.add('hidden');
      displayBundlePopup();
  });
  }
  
  function displayBundlePopup() {
      console.log('[Bundle Popup Debug] Starting displayBundlePopup');
      
      const bundleSelection = document.getElementById('easy-bundle-selection');
      console.log('[Bundle Popup Debug] Bundle selection element:', bundleSelection);
      
      if (!bundleSelection) {
          console.error('[Bundle Popup Debug] Could not find easy-bundle-selection element');
          return;
      }
  
      const bundleHeader = bundleSelection.querySelector('.bundle-header');
      console.log('[Bundle Popup Debug] Bundle header:', bundleHeader);
      
      const floatingButton = document.getElementById('floating-bundle-button');
      console.log('[Bundle Popup Debug] Floating button:', floatingButton);
      
      if(floatingButton) {
          console.log('[Bundle Popup Debug] Hiding floating button');
          floatingButton.classList.add('hidden');
      }
  
      if(bundleHeader) {
          console.log('[Bundle Popup Debug] Hiding bundle header');
          bundleHeader.classList.add('hidden');
      }
  
      // Add rounded top and padding classes to bundle selection
      console.log('[Bundle Popup Debug] Adding rounded-t-2xl p-4 classes');
      bundleSelection.classList.add('rounded-t-2xl', 'p-4');
  
      // Remove any existing overlay first
      const existingOverlay = document.querySelector('.bundle-overlay');
      if (existingOverlay) {
          console.log('[Bundle Popup Debug] Removing existing overlay');
          existingOverlay.remove();
      }
  
      // Create and add overlay
      console.log('[Bundle Popup Debug] Creating new overlay');
      const overlay = document.createElement('div');
      overlay.className = 'bundle-overlay fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out opacity-0 z-40';
      document.body.appendChild(overlay);
  
      // First set the initial transform without transition
      console.log('[Bundle Popup Debug] Setting initial transform');
      bundleSelection.style.transform = 'translateY(100%)';
      
      // Force a reflow
      bundleSelection.offsetHeight;
      
      // Now add the transition classes
      console.log('[Bundle Popup Debug] Adding transition classes');
      bundleSelection.classList.add('!fixed', 'bottom-0', 'left-0', 'right-0', 'transform', 'transition-transform', 'duration-500', 'ease-in-out', 'z-50');
      
      // Trigger animation immediately
      console.log('[Bundle Popup Debug] Triggering animation');
      requestAnimationFrame(() => {
          bundleSelection.style.transform = 'translateY(0)';
          overlay.style.opacity = '1';
          console.log('[Bundle Popup Debug] Animation triggered');
      });
  
      // Add click handler to overlay to close the popup
      overlay.addEventListener('click', () => {
          console.log('[Bundle Popup Debug] Overlay clicked, closing popup');
          bundleSelection.style.transform = 'translateY(100%)';
          overlay.style.opacity = '0';
          
          // Wait for the slide-down animation to complete before cleaning up
          const transitionEndHandler = () => {
              console.log('[Bundle Popup Debug] Transition ended, cleaning up');
              bundleSelection.classList.remove('!fixed', 'bottom-0', 'left-0', 'right-0', 'transform', 'transition-transform', 'duration-500', 'ease-in-out', 'z-50');
              bundleSelection.style.transform = '';
              bundleSelection.style.position = '';
              bundleSelection.style.bottom = '';
              bundleSelection.style.left = '';
              bundleSelection.style.right = '';
              bundleSelection.style.zIndex = '';
              
              // Remove rounded top and padding classes
              console.log('[Bundle Popup Debug] Removing rounded-t-2xl p-4 classes');
              bundleSelection.classList.remove('rounded-t-2xl', 'p-4');
              
              bundleSelection.removeEventListener('transitionend', transitionEndHandler);
              
              // Remove overlay after animation
              overlay.remove();
  
              if(floatingButton) {
                  console.log('[Bundle Popup Debug] Showing floating button');
                  floatingButton.classList.remove('hidden');
              }
  
              if(bundleHeader) {
                  console.log('[Bundle Popup Debug] Keeping bundle header hidden');
                  bundleHeader.classList.add('hidden');
              }
  
              // Show floating button again after popup is closed
              console.log('[Bundle Popup Debug] Updating floating button');
              updateFloatingButton();
          };
          
          bundleSelection.addEventListener('transitionend', transitionEndHandler);
      });
      
      console.log('[Bundle Popup Debug] Popup display setup complete');
  }
  
  function updateFloatingButton() {
  const floatingButton = document.getElementById('floating-bundle-button');
  const bundleSelection = document.getElementById('easy-bundle-selection');
  const bundleCount = document.getElementById('floating-bundle-count');
  
  if (!floatingButton || !bundleSelection || !bundleCount) return;
  
  // Get cart item count
  const cartItems = window.gbbMix.sdk.state.cartData.items || [];
  const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  
  // Update count
  bundleCount.textContent = itemCount;
  
  // Improved viewport check
  const rect = bundleSelection.getBoundingClientRect();
  const isInViewport = (
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0
  );
  
  // Show/hide floating button based on viewport and item count
  if (!isInViewport && itemCount > 0) {
      floatingButton.classList.remove('hidden');
  } else {
      floatingButton.classList.add('hidden');
  }
  }
  
  // Add scroll event listener
  window.addEventListener('scroll', updateFloatingButton);
  
  // Update floating button when cart changes
  const originalUpdateBundleUi = updateBundleUi;
  updateBundleUi = function() {
  originalUpdateBundleUi();
  updateFloatingButton();
  };
  
  // Initialize floating button
  document.addEventListener('DOMContentLoaded', createFloatingButton);
  
  
  let glob_designs;
  async function get_designs() {
  console.log('[Design Filter Debug] Starting to fetch design data...');
  console.log('[Design Filter Debug] Data source: EXTERNAL API (Gadget)');
  
  // Pull print information from metaobjects, store in above array
  const design_url = 'https://oddballs-data--development.gadget.app/apps/oddballs-data/metaobject?handle=design';
  console.log('[Design Filter Debug] Fetching from URL:', design_url);
  
  try {
      const response = await fetch(design_url);
      console.log('[Design Filter Debug] API response status:', response.status);
      console.log('[Design Filter Debug] API response ok:', response.ok);
      
      const data = await response.json();
      console.log('[Design Filter Debug] Raw design data from API:', data);
      console.log('[Design Filter Debug] Raw data type:', typeof data);
      console.log('[Design Filter Debug] Raw data length:', Array.isArray(data) ? data.length : 'Not an array');
      
      glob_designs = data.map((design) => ({
          id: design.node.id,
          fields: design.node.fields,
      }));
      
      console.log('[Design Filter Debug] Processed design data:', glob_designs);
      console.log('[Design Filter Debug] Total designs loaded:', glob_designs.length);
      console.log('[Design Filter Debug] Design data source: SUCCESS - External API');
      
      // Log some sample design fields
      if (glob_designs.length > 0) {
          console.log('[Design Filter Debug] Sample design fields:', glob_designs[0].fields);
          console.log('[Design Filter Debug] Sample design ID:', glob_designs[0].id);
      }
      
  } catch (error) {
      console.error('[Design Filter Debug] Error fetching designs:', error);
      console.log('[Design Filter Debug] Design data source: FAILED - External API error');
      console.log('[Design Filter Debug] Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack
      });
  }
  }
  
  // Call get_designs to load design data
  console.log('[Design Filter Debug] Calling get_designs()...');
  get_designs();