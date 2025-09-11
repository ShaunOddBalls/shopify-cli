// /**
// *Adds items to cart
// *@param {array} itemVariants - array of objects with item id and title
// *@param {number} quantity - number of that ID to be added to cart
// *@param {object} attribute - line item attributes
// *@param {object} target - popup the quickbuy was in, used to reset popup
// *@param {string} passedSellingPlanId - selling plan to be passed for subscriptions
// */
// function addToCart(itemVariants, quantity, attribute = null, target = null, passedSellingPlanId = null){
// 	console.log('addToCart called with:', { itemVariants, quantity, attribute, target, passedSellingPlanId });
// 	try{
// 	  const ctlUpsellPopup = document.getElementById("ctl-upsell-popup-content");
// 	  resetPopup(ctlUpsellPopup);
// 	  var data; // var to be passed to add to cart
// 	  if(itemVariants.length > 1){ //multiple variant Ids
	
// 		//get product info from page
// 		const divElement = document.getElementById('product-json');
// 		const jsonString = divElement.value || divElement.innerHTML;
// 		const prod = JSON.parse(jsonString);
	
		
// 		var combinedId;
// 		for(variant of prod.variants){
// 		  var selectedVariant = true;
// 		  for(itemVariant of itemVariants){
// 			if(!variant.title.includes(itemVariant.title)){
// 			  selectedVariant = false;
// 			  break;
// 			}
// 		  }
// 		  if(selectedVariant){
// 			combinedId = variant.id;
// 		  }
// 		}
// 		const sellingPlanID = passedSellingPlanId? passedSellingPlanId : prod.selling_plan_groups[0].selling_plans[0].id;
// 		data = {
// 			quantity: quantity,
// 			id: combinedId,
// 			selling_plan: sellingPlanID
// 			}
// 		  if(attribute) {
// 			  data.properties = attribute;
// 		  }
// 	  }else{
// 		  data = {
// 			quantity: quantity,
// 			id: itemVariants[0].id,
// 			}
// 		  if(attribute) {
// 			  data.properties = attribute;
// 		  }
// 		  if(passedSellingPlanId){
// 			  data.selling_plan = passedSellingPlanId;
// 			}
// 	  }  
// 	  console.log('Cart data prepared:', data);
// 	}catch(err){
// 	  console.log("Creating cart items error: " + err)
// 	}
// 	fetch('/cart/add.js', {
// 		method: 'POST',
// 		headers: {
// 		  'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(data)
// 	  })
// 	  .then(response => {
// 		console.log('Add to cart response:', response);
// 		if (!response.ok) {
// 		  throw new Error('Network response was not ok ' + response.statusText);
// 		}
// 		return response.json();
// 	  })
// 	  .then(responseData => {
// 		console.log('Add to cart successful:', responseData);
// 		const target = document.getElementById('default-quick-buy-popup-content');
// 		resetPopup(target);
// 		if(target){
// 		  resetPopup(target);
// 		}
// 		setTimeout(function(){
// 		  updateCart();
//           document.getElementById("add-to-cart-loaded").style.display = "block";
//           document.getElementById("add-to-cart-loading").style.display = "none";
// 		}, 250)
		
// 	  })
// 	  .catch(error => {
// 		console.error('Error adding product to cart:', error);
// 	  });
//   }
  

    // Initialize the count variable
    let count = 1;

    // Select the quantity display and buttons
    const quantityDisplay = document.querySelector('.quantity');
    const decrementButton = document.querySelector('.decrement');
    const incrementButton = document.querySelector('.increment');

    // Update the quantity display
    function updateDisplay() {
        quantityDisplay.textContent = count;
    }

    // Add event listeners for the increment and decrement buttons
    decrementButton.addEventListener('click', () => {
        if (count > 1) {
            count--;
            updateDisplay();
        }
    });

    incrementButton.addEventListener('click', () => {
        count++;
        updateDisplay();
    });
  /*
  *creates a srcset for a given url
  /@param {string} url - url to create a srcsetfor
  /@returns {string} srcset with widths and image sizes
  */
  
  function modifyUrlWithResolutions(url) {
	  var resolutions = [360, 420, 480, 640, 840, 1080, 1280, 1540, 1860, 1950];
	  var parts = url.split('.');
	  var fileName = parts.slice(0, -1).join('.'); 
	  var fileExtension = parts[parts.length - 1];
	  var modifiedUrls = [];
	
	  for (var i = 0; i < resolutions.length; i++) {
		var resolution = resolutions[i];
		var modifiedUrl = fileName + "_" + resolution + "x." + fileExtension + " " + resolution + "w";
		modifiedUrls.push(modifiedUrl);
	  }
	
	  var result = '';
	  for (var j = 0; j < modifiedUrls.length; j++) {
		result += modifiedUrls[j];
		if (j !== modifiedUrls.length - 1) {
		  result += ',';
		}
		
	  }
	  //return("")
	  return result;
	}
  
 //  /**
 //  * Create and show back in stock popup
 //  */
 //  function showBackInStock(){
	// document.getElementById("back-in-stock-popup-content").style.display = "block";
	// document.getElementById("back-in-stock-popup-content").classList.add("popup-active");
	// document.body.classList.add("body-popup-active");
	// const divElement = document.getElementById('product-json');
	// const jsonString = divElement.value || divElement.innerHTML;
	// const prod = JSON.parse(jsonString);
	// for(variant of prod.variants){
	//   if(!variant.available){
	// 	// Create the div element for each variant
	// 	const divElement = document.createElement('div');
	// 	divElement.classList.add('product-variant', 'relative');
	// 	 // Create the label element
	// 	const labelElement = document.createElement('label');
	// 	labelElement.setAttribute('data-active', 'ring-2 ring-magenta');
	// 	labelElement.classList.add('ooption-value', 'group', 'relative', 'flex', 'items-center', 'justify-center', 'rounded-md', 'border', 'py-4', 'px-4', 'text-xs', 'font-medium', 'uppercase', 'hover:bg-gray-50', 'focus:outline-none', 'sm:flex-1', 'cursor-pointer', 'bg-white', 'text-gray-900', 'shadow-sm');
	//    // Create the input element inside the label
	// 	const inputElement = document.createElement('input');
	// 	inputElement.setAttribute('type', 'checkbox');
	// 	inputElement.setAttribute('value', variant.id.toString()); // Convert id to string if necessary
	// 	inputElement.classList.add('peer', 'sr-only');
	// 	// Create the first span element
	//   const spanElement1 = document.createElement('span');
	//   spanElement1.classList.add('peer-checked:border-transparent', 'items-center', 'flex', 'justify-center', 'peer-checked:bg-magenta-500', 'peer-checked:text-white', 'peer-checked:hover:bg-pink-700', 'peer-checked:ring-2', 'peer-checked:ring-magenta-500', 'peer-checked:ring-offset-2', 'border-transparent', 'pointer-events-none', 'absolute', '-inset-px', 'rounded-md');
	//   spanElement1.setAttribute('aria-hidden', 'true');
  
	//   // Create the second span element
	//   const spanElement2 = document.createElement('span');
	//   spanElement2.classList.add('option-value', 'relative', 'peer-checked:text-white');
	//   spanElement2.textContent = variant.title; // Use variant name
  
	//   // Append input and spans to label
	//   labelElement.appendChild(inputElement);
	//   labelElement.appendChild(spanElement1);
	//   labelElement.appendChild(spanElement2);
  
	//   // Append label to div
	//   divElement.appendChild(labelElement);
  
	//   // Append the divElement to your desired parent element in the DOM
	//   // For example, assuming there's a parent element with ID "parentContainer"
	//   const parentContainer = document.getElementById('back-in-stock-variants');
	//   parentContainer.appendChild(divElement);
  
		
	//   }
	// }
 //  }
  
  
 //  function showDescription(){
	// document.getElementById("description-popup-content").style.display = "block";
	// setTimeout(function(){document.getElementById("description-popup-content").classList.add('popup-active');},1);
	// document.body.classList.add('body-popup-active');
 //  }
  
  
 //  async function getRecommendations(prod){
	// let collection = "";
	// switch (prod.type){
	//   case "Boxer Shorts":
	// 	collection = "mens-boxer-shorts-individuals";
	// 	break
	//   case "Briefs":
	// 	collection = "mens-briefs-individuals";
	// 	break
	//   case "Ladies Boxers":
	// 	collection = "ladies-boxer-shorts-individuals";
	// 	break
	//   case "Low Rise Briefs":
	// 	collection = "ladies-briefs-individuals";
	// 	break
	//   case "Thong":
	// 	collection = "ladies-thongs-individuals";
	// 	break
	//   case "seamless":
	// 	collection = "seamless-individuals";
	// 	break
	//   case "Bralette":
	// 	collection = "bralettes-individuals";
	// 	break
	//   default:"best-sellers"
	// }
	// var url1 = `https://www.myoddballs.com/apps/myoddballs/collection?handle=${collection}`;
	//  try {
	// 	  const response = await fetch(url1);
	// 	  if (!response.ok) {
	// 		  throw new Error('Network response was not ok ' + response.statusText);
	// 	  }
	// 	  const data = await response.json(); // Assuming the response is in JSON format
	// 	  const prods = data.products;
	// 	  for(i=0; i<10; i++){
	// 		document.getElementById("product-recommendations-container").append(createProductItem(prods[i].product)); 
	// 	  }
	//   } catch (error) {
	// 	  console.error('There has been a problem with your fetch operation:', error);
	//   }
 //  }
  
 //  /*
 //  * current placeholder to be adapted once collection item has been created
 //  * @param {object} prod - JSON object of a product
 //  * @returns html for the current product;
 //  */
 //  function createProductItem(prod) {
	//   const productItem = document.createElement('div');
	//   productItem.className = 'product-item';
	//   productItem.setAttribute('data-id', JSON.stringify(prod));
  
	//   const img = document.createElement('img');
	//   img.src = prod.image.src;
	//   img.alt = prod.title;
  
	//   const titleDiv = document.createElement('div');
	//   titleDiv.className = 'title';
	//   titleDiv.textContent = prod.title;
  
	//   const priceDiv = document.createElement('div');
	//   priceDiv.className = 'price';
	//   priceDiv.textContent = `£${prod.variants[0].price}`;
  
	//   productItem.appendChild(img);
	//   productItem.appendChild(titleDiv);
	//   productItem.appendChild(priceDiv);
  
	//   return productItem;
 //  }
  
 //  document.addEventListener('DOMContentLoaded', function() {
	// initProductForm_xs_x();
 //  });

// /**
//  * Initializes product forms
//  */
// function initProductForm_xs_x() {
// 	console.log('Initializing product forms');
// 	const productForms = document.querySelectorAll('.product-form');
// 	productForms.forEach(initProductForm_x);
// }


// /**
//  * Initializes a single product form
//  * @param {HTMLElement} form - The product form element
//  */
// function initProductForm_x(form) {
// 	console.log('Initializing product form:', form);
// 	const productId = form.getAttribute('data-product-id');
// 	const addToCartButton = form.querySelector('[data-add-to-cart]');
// 	const variantIdInput = form.querySelector('input[name="id"]');
// 	const priceElement = form.querySelector('[data-product-price]');
// 	const productJson = JSON.parse(document.getElementById(`ProductJson-${productId}`).textContent);
// 	const optionSelectors = form.querySelectorAll('.product-option');

// 	let selectedOptions = {};

// 	// Initialize variant selector
// 	optionSelectors.forEach((selector, index) => {
// 		const optionName = productJson.options[index];
// 		selectedOptions[optionName] = null;

// 		selector.addEventListener('change', (event) => {
// 			const selectedValue = event.target.value;
// 			selectedOptions[optionName] = selectedValue;
// 			updateVariantSelection_x();
// 		});
// 	});

// 	/**
// 	 * Updates the variant selection based on user choices
// 	 */
// 	function updateVariantSelection_x() {
// 		console.log('Updating variant selection. Current options:', selectedOptions);
// 		const selectedVariant = findMatchingVariant(selectedOptions);

// 		if (selectedVariant) {
// 			console.log('Matching variant found:', selectedVariant);
// 			updatePriceAndAvailability(selectedVariant);
// 			variantIdInput.value = selectedVariant.id;
// 			updateAddToCartButton(selectedVariant);
// 			updateURL(selectedVariant);
// 		} else {
// 			console.log('No matching variant found');
// 			// No matching variant found
// 			addToCartButton.disabled = true;
// 			addToCartButton.textContent = 'Unavailable';
// 		}

// 		updateOutOfStockMarkers();
// 	}

// 	/**
// 	 * Finds a matching variant based on selected options
// 	 * @param {Object} selectedOptions - The currently selected options
// 	 * @returns {Object|undefined} The matching variant or undefined if not found
// 	 */
// 	function findMatchingVariant(selectedOptions) {
// 		const matchingVariant = productJson.find(variant => 
// 			Object.entries(selectedOptions).every(([option, value]) => 
// 				value === null || variant[option] === value
// 			)
// 		);
// 		console.log('Finding matching variant:', { selectedOptions, matchingVariant });
// 		return matchingVariant;
// 	}

// 	/**
// 	 * Updates price and availability information for a variant
// 	 * @param {Object} variant - The selected variant
// 	 */
// 	function updatePriceAndAvailability(variant) {
// 		console.log('Updating price and availability for variant:', variant);
// 		priceElement.textContent = formatMoney(variant.price);
// 		addToCartButton.disabled = !variant.available;
// 	}

// 	/**
// 	 * Updates the Add to Cart button text and state
// 	 * @param {Object} variant - The selected variant
// 	 */
// 	function updateAddToCartButton(variant) {
// 		console.log('Updating Add to Cart button for variant:', variant);
// 		const missingOptions = Object.entries(selectedOptions)
// 			.filter(([option, value]) => value === null)
// 			.map(([option]) => option);

// 		if (missingOptions.length > 0) {
// 			addToCartButton.textContent = `Select ${missingOptions[0]}`;
// 		} else if (variant.available) {
// 			addToCartButton.textContent = 'Add to Cart';
// 		} else {
// 			addToCartButton.textContent = 'Sold Out';
// 		}
// 	}

// 	/**
// 	 * Updates the URL with the selected variant ID
// 	 * @param {Object} variant - The selected variant
// 	 */
// 	function updateURL(variant) {
// 		console.log('Updating URL for variant:', variant);
// 		if (!history.replaceState || !variant) return;
// 		const url = new URL(window.location);
// 		url.searchParams.set('variant', variant.id);
// 		history.replaceState(null, null, url.toString());
// 	}

// 	/**
// 	 * Updates out of stock markers for all variants
// 	 */
// 	function updateOutOfStockMarkers() {
// 		console.log('Updating out of stock markers');
// 		const variants = form.querySelectorAll('.product-variant');
// 		variants.forEach(variantElement => {
// 			const optionIndex = variantElement.getAttribute('data-option-index');
// 			const optionValue = variantElement.getAttribute('data-value');
// 			const isAvailable = checkVariantAvailability(optionIndex, optionValue);
// 			const outOfStockMarker = variantElement.querySelector('.out-of-stock-marker');
// 			outOfStockMarker.classList.toggle('hidden', isAvailable);
// 		});
// 	}

// 	/**
// 	 * Checks if a specific variant is available
// 	 * @param {number} optionIndex - The index of the option
// 	 * @param {string} optionValue - The value of the option
// 	 * @returns {boolean} True if the variant is available, false otherwise
// 	 */
// 	function checkVariantAvailability(optionIndex, optionValue) {
// 		const currentOptions = { ...selectedOptions };
// 		currentOptions[productJson.options[optionIndex]] = optionValue;
// 		const variant = findMatchingVariant(currentOptions);
// 		return variant && variant.available;
// 	}

// 	/**
// 	 * Formats a price in cents to a currency string
// 	 * @param {number} cents - The price in cents
// 	 * @returns {string} The formatted price string
// 	 */
// 	function formatMoney(cents) {
// 		return (cents / 100).toLocaleString('en-US', {
// 			style: 'currency',
// 			currency: 'USD',
// 		});
// 	}

// 	// Initialize the form
// 	updateVariantSelection_x();
// }

  // document.querySelectorAll('.js-bundle-swap').forEach(function (bundleSwap) {
  //   bundleSwap.addEventListener('mouseenter', function () {
  //     const prodJson = JSON.parse(bundleSwap.querySelector('.js-prod-json').innerHTML);
  //     document.querySelector('#bundle-name-s').textContent = prodJson.title.split('-')[0];
  //     document.querySelector('.product-img').setAttribute('src', prodJson.featured_image);
  //   });

  //   bundleSwap.addEventListener('mouseleave', function () {
  //     document.querySelector('#bundle-name-s').textContent = document.querySelector('#perm-bundle-name').textContent;
  //     document.querySelector('.product-img').setAttribute('src', document.querySelector('#perm-bundle-img').innerHTML);
  //   });
  // });

document.body.addEventListener('click', function(event) {
  if(event.target.closest('.product-thumbnail')){
    const eThumb = event.target.closest(".product-thumbnail");
    const loc = eThumb.getAttribute("data-count");
    const thumbnails = document.querySelectorAll(".product-thumbnail");
    const totalThumbnails = thumbnails.length;
    thumbnails.forEach(thumbnail => {
      thumbnail.classList.remove("thumbnail-active");
    });
    eThumb.classList.add("thumbnail-active");

    const slider = event.target.closest(".swiper-wrapper");

    if (slider) {
      const thumbnailWidth = eThumb.offsetWidth;
      const scrollPosition = thumbnailWidth * loc; 
      slider.scrollTo({
        left: scrollPosition, 
        behavior: 'smooth' 
      });
    }
  }

    if (event.target.closest('.product-variant')) {
      try{
        
      const size = event.target.closest('.product-variant').querySelector('input').getAttribute("data-option-value");
      console.log(size)
      document.querySelectorAll('.js-bundle-swap').forEach(function (bundle) {
        const prod = JSON.parse(bundle.querySelector('.js-prod-json').innerHTML);
        console.log(prod)
        for (let variant of prod.variants) {
          if (size.toLowerCase() == variant.title.toLowerCase()) {
            console.log(variant)
            if (variant.available) {
              bundle.classList.remove("bundle-unavailable");
            } else {
              bundle.classList.add("bundle-unavailable");
            }
          }
        }
      });
      }catch(error){
        console.error(error)
      }
    }

    // Handle js-bundle-size click
    if (event.target.closest('.js-bundle-size')) {
      const selectedBundle = event.target.closest('.js-bundle-size');
      document.querySelector('#bundle-swap-toggle-label').innerHTML = selectedBundle.querySelector('.bundle-discount-loc').innerHTML;

      const ele_position = Array.from(document.querySelectorAll('.js-bundle-size')).indexOf(selectedBundle);
      const noOfPacks = document.querySelector('#no-of-bundles-input').value;
      const offset = 1 / noOfPacks;
      const new_pos = offset * ele_position * 100;

      // Update position (use with CSS animation as needed)

      document.querySelectorAll('.js-bundle-swap-section').forEach(function (bundleSection) {
        bundleSection.style.display = 'none';
        if (bundleSection.getAttribute('data-bundle_size') == selectedBundle.getAttribute('data-bundle_size')) {
          bundleSection.style.display = 'flex';
          document.querySelector('#bundle-pack-size-number').textContent = bundleSection.getAttribute('data-bundle_size') + " Pack";
        }
      });


      document.querySelectorAll('.js-bundle-size').forEach(function (bundleSize) {
        bundleSize.classList.remove('active');
      });
      selectedBundle.classList.add('active');
    }

    // Handle bundle-dropdown-toggle click
    if (event.target.closest('#bundle-dropdown-toggle')) {
      const dropdown = document.querySelector('#pack-size-dropdown');
      dropdown.style.display = dropdown.style.display === 'none' || !dropdown.style.display ? 'block' : 'none';
    }

    // Handle js-bundle-swap click
    if (event.target.closest('.js-bundle-swap')) {
      const prodJson = JSON.parse(event.target.closest('.js-bundle-swap').querySelector('.js-prod-json').innerHTML);
      document.querySelector('#perm-bundle-name').textContent = prodJson.title.split('-')[0];
      document.querySelector('#perm-bundle-img').innerHTML = prodJson.featured_image;
      event.target.closest('.js-bundle-swap').classList.add('bundle-swapped');
      // event.target.closest('.product-actions').querySelector('form[action="/cart/add"]').insertAdjacentHTML('beforeend', '<input type="hidden" id="swapped-attribute" value="swapped" name="properties[_bundle-swap]">');
    }

    // Handle show-less-bundles click
    if (event.target.closest('.show-less-bundles')) {
      document.querySelector('.bundle-show-more-gradient').style.display = 'block';
      document.querySelector('.show-less-bundles').style.display = 'none';
    }

    // Handle js-show-more-bundles click
    if (event.target.closest('.js-show-more-bundles')) {
      document.querySelector('.bundle-show-more-gradient').style.display = 'none';
      document.querySelector('.show-less-bundles').style.display = 'block';
    }

    // Hide dropdown if clicking outside of it
    if (!event.target.closest('#pack-size-dropdown') && !event.target.closest('#bundle-dropdown-toggle')) {
      try{
        document.querySelector('#pack-size-dropdown').style.display = 'none';
      }catch(error){
        
      }
    }
});

	// console.log('Click event detected:', event.target);
  
  
	// //Click listner for showing description
	//   if (event.target.closest('#description-header')) {
	// 	  showDescription();
	//   }
  
	// //Click listner for add to cart button;
	//   if (event.target.closest('#atc-button')) {
	// 	var selectedVariants = document.querySelectorAll('.product-variant input:checked');
	// 	var variantsArr = [];
  
	// 	selectedVariants.forEach(function(input) {
	// 		  var parentVariant = input.closest('.product-variant');
	// 		  var dataId = parentVariant.getAttribute('data-id');
	// 		  var dataTitle = parentVariant.getAttribute('data-title');
	// 		  variantsArr.push({'id': dataId, 'title': dataTitle});
	// 	  });
	// 	if(variantsArr.length == 0){
	// 	  const divElement = document.getElementById('product-json');
	// 	  const jsonString = divElement.value || divElement.innerHTML;
	// 	  const prod = JSON.parse(jsonString);
 //          const handle = prod.handle;
	// 	  showQuickBuyPopup(handle);
	// 	}else{
	// 	  document.getElementById("add-to-cart-loaded").style.display = "none";
 //          document.getElementById("add-to-cart-loading").style.display = "block";
	// 	  const quantity = document.getElementById("quantity").innerHTML;
	// 	  addToCart(variantsArr, quantity);
	// 	}
		
	//   }
  
  
	// //click listner for out of stock variants
	//   if (event.target.closest('.variant-unavailable')) {
	// 	showBackInStock();
	//   }
  
	// //click listner for in stock variants
	//   if (event.target.closest('.product-variant') && !event.target.closest('.variant-unavailable')) {
	// 	  // Get the clicked variant container
	// 	  var clickedVariant = event.target.closest('.product-variant');
	// 	  var variantContainer = event.target.closest('.product-variants')
  
	// 	  // Select all variant containers
	// 	 variantContainer.querySelectorAll('.product-variant input').forEach(function(input) {
	// 		  input.checked = false;
	// 	  });
  
	// 	  // Select the input in the clicked variant container
	// 	  clickedVariant.querySelector('input').checked = true;
	//   }
 //  })
  
  // Create an IntersectionObserver instance
  const observer = new IntersectionObserver((entries) => {
	console.log('Intersection observer entries:', entries);
	entries.forEach(entry => {
	   const body = document.querySelector("body");
	  if (entry.isIntersecting) {
			  body.classList.remove("buy-button-below-view");
			  body.classList.remove("buy-button-above-view");
        document.getElementById("atc-button").classList.add("pdp-atc-button-fixed")
        document.getElementById("atc-button").classList.remove("pdp-atc-button-floating")
		const buyButton = body.querySelector("#atc-button")
		if(buyButton.classList.contains("missing-variants")){
			buyButton.disabled = true
		}
	  } else {
            document.getElementById("atc-button").classList.remove("buy-button-fixed")
            document.getElementById("atc-button").classList.add("buy-button-floating")
			if (entry.boundingClientRect.top < 0) {
			  body.classList.remove("buy-button-below-view");
			  body.classList.add("buy-button-above-view");
			} else if (entry.boundingClientRect.bottom > window.innerHeight) {
			  body.classList.remove("buy-button-above-view");
			  body.classList.add("buy-button-below-view");
			  body.querySelector("#atc-button").disabled = false;
			}
	  }
	});
  }, { threshold: 0.1 });
  
  // Observe the target element
  const target = document.getElementById('cart-marker');
  observer.observe(target);
  
  
  
  //TODO - hide key
		const klayvioKey = "yKULaH";
		/**
		 * Handles the submission of the back in stock form
		 * @param {Event} event - The form submission event
		 */
		function klayvioSubmit(event) {
			console.log('Klaviyo form submission:', event);
			event.preventDefault()
			let emailInput = document.querySelector('#bis-email-input')
			let email = emailInput.value
	  
		  const options = {
			  method: 'POST',
			  headers: {
			  accept: 'application/json',
			  revision: '2023-08-15',
			  'content-type': 'application/json',
			  },
			  body: JSON.stringify({
			  data: {
				  type: 'back-in-stock-subscription',
				  attributes: {
				  channels: ['PUSH','EMAIL'],
				  profile: {
					  data: {
					  type: 'profile',
					  attributes: {
						  email: email,
					  },
					  },
				  },
				  },
				  relationships: {
				  variant: {
					  data: {
					  type: 'catalog-variant',
					  id: `$shopify:::$default:::${selected_value}`,
					  },
				  },
				  },
			  },
			  }),
		  }
		  fetch(`https://a.klaviyo.com/client/back-in-stock-subscriptions/?company_id=${klayvioKey}`, options)
			  .then((response) => {
				  console.log('Klaviyo API response:', response);
			  if (!response.ok) {
				  throw new Error(`An error occurred: ${response.status}`)
			  }
	  
			  return response.text()
			  })
			  .then((text) => {
				  console.log('Klaviyo API success:', text);
			  input.value = ''
			  input.placeholder = 'Email sent!!'
			  if (text.length === 0) {
			  } else {
				  const data = JSON.parse(text)
			  }
			  })
			  .catch((error) => console.error('Klaviyo API error:', error))
		  }

  
  
  
  