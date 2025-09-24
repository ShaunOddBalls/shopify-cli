(function() {
    let cartTranslations = {
    "default": {
        "add_to_basket": "Add to Basket",
        "options": "options",
        "please_select": "Please Select ",
        "quick_buy": "quick buy",
        "add_another": "add another"
      },
    "nl": {
          "add_to_basket": "Toevoegen aan winkelmand",
          "options": "opties",
          "please_select": "Selecteer alstublieft",
          "quick_buy": "snel kopen",
          "add_another": "nog een toevoegen"
      },
      "de": {
        "see_more": "Meer zien",
        "quick_buy": "Snel kopen",
        "add_another": "Voeg een andere toe"
      },
      "en": {
        "see_more": "see more",
        "quick_buy": "quick buy",
        "add_another": "add another"
      }
    }

    let cartLanguage = document.body.getAttribute("language");
  
	// Debug flag - set to false to disable all console logs
	const DEBUG = false;

	/**
	 * Debug logging function
	 * @param {...any} args - Arguments to log
	 */
	function debugLog(...args) {
		if (DEBUG) {
			console.log('ATC:', ...args);
		}
	}

	/**
	 * Initializes a product form by setting up event listeners and handling variant selection.
	 * @param {HTMLElement} form - The product form element to initialize.
	 */
	function initializeProductForm(form) {
		debugLog('Initializing product form:', form);
  
		// Get the product ID from the form's data attribute
		const productId = form.getAttribute('data-product-id');
		debugLog('Product ID:', productId);
  
		// Fetch the product data from the JSON input
		const productData = getProductData(productId);
		debugLog('Product data:', productData);

        const checkbox = form.querySelector('#recipient-checkbox');
  
		if (!productData) {
			console.error('ATC: Product data not found for product ID:', productId);
			return;
		}
  
		if (!Array.isArray(productData.options) || productData.options.length === 0) {
			console.error('ATC: Invalid or empty product options for product ID:', productId);
			return;
		}
  
		// Initialize an array to store selected options
		const selectedOptions = new Array(productData.options.length).fill(null);
		debugLog('Initial selected options:', selectedOptions);
  
		// Variable to store the currently selected variant
		let currentVariant = null;
  
		// Get all option groups within the form
		const optionGroups = form.querySelectorAll('.product-option');
		debugLog('Option groups found:', optionGroups.length);
  
		// Get the add to cart button
		const addToCartButton = form.querySelector('.add-to-cart-button');
		debugLog('Add to cart button:', addToCartButton);
  
		// Get the selling plan select element (if it exists)
		const sellingPlanSelect = form.querySelector('.selling-plan-select');
		debugLog('Selling plan select:', sellingPlanSelect);
  
		// Event listener for variant option inputs (using event delegation)
		form.addEventListener('change', function(event) {
			debugLog('Change event triggered:', event.target);
  
			// Check if the changed element is a radio input
			const input = event.target.closest('input[type="radio"]');
			if (input && form.contains(input)) {
				debugLog('Radio input changed:', input);
  
				const optionIndex = parseInt(input.getAttribute('data-option-index'), 10);
				const optionValue = input.getAttribute('data-option-value');
  
				debugLog('Option changed:', { index: optionIndex, value: optionValue });
  
				// Update selected options array
				selectedOptions[optionIndex] = optionValue;
				debugLog('Updated selected options:', selectedOptions);
  
				// Find the matching variant
				const newVariant = findVariant();
				
				// Update the selected variant
				updateSelectedVariant(newVariant);
			}
		});
  
		// Event listener for add to cart button
        if(addToCartButton){          
  		addToCartButton.addEventListener('click', function(event) {
            event.preventDefault();
            debugLog('Add to cart button clicked');
            
            try {
                if (checkbox?.checked) {
                    validateInputs();
                } else {
                    addToCart();
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
  		});
        }


      const validateInputs = () => {
          const emailField = form.querySelector(".recipient-email");
          const nameField = form.querySelector(".recipient-name");
    
          const emailError = form.parentElement.querySelector(".error-message");
          const nameError = form.parentElement.querySelector(".error-message");
    
          let isValid = true;
    
          // Validate email
          if (!emailField.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
            isValid = false;
            emailError.classList.remove("hidden");
          } else {
            emailError.classList.add("hidden");
          }
    
          // Validate name
          if (!nameField.value.trim()) {
            isValid = false;
            nameError.classList.remove("hidden");
          } else {
            nameError.classList.add("hidden");
          }
    
          if (!isValid) {
            event.preventDefault();
            // Optionally scroll to the form or otherwise notify the user
            form.scrollIntoView({ behavior: "smooth" });
          }else{
            addToCart();
          }
      }
  
  
		// Listen for print swap events
		document.addEventListener('printSwapped', function(event) {
			debugLog('Print swap detected, reinitializing form');
			const newProductData = event.detail.product;
			// Remove the ID check
			debugLog('print swapped to:', newProductData.title);
			// Update product data
			Object.assign(productData, newProductData);
			// Update productId to match the new product
			let newProductId = newProductData.id; // Change this line
			// Reset selected options
			selectedOptions.fill(null);
			// Clear current variant
			currentVariant = null;
			// Update the form
			updateAddToCartButton();
			// Update the form's data-product-id attribute
			form.setAttribute('data-product-id', newProductId); // Add this line
		});
  
		/**
		 * Fetches product data from the hidden input with product JSON.
		 * @param {string} productId - The ID of the product.
		 * @returns {Object|null} The parsed product data or null if not found.
		 */
		function getProductData(productId) {
			const productInput = document.querySelector(`#product-json-${productId}`);
			debugLog('Product input element:', productInput);
	  
			if (productInput) {
				try {
					return JSON.parse(productInput.value);
				} catch (error) {
					console.error('ATC: Error parsing product JSON:', error);
				}
			}
			return null;
		}
  
		/**
		 * Finds the variant based on selected options.
		 * @returns {Object|undefined} The matching variant or undefined if not found.
		 */
		function findVariant() {
			const variant = productData.variants.find((variant) => {
				return selectedOptions.every((optionValue, index) => {
					return optionValue === variant.options[index];
				});
			});
			debugLog('Found variant:', variant);
			return variant;
		}
  
		function truncateOptionName(optionName) {
			const words = optionName.split(' ');
			if (words.length > 2) {
				return 'Please complete your selection';
				//return words.slice(0, 2).join(' ') + '...';
			}
			return optionName;
		}
  
		/**
		 * Updates the add to cart button based on variant availability and selected options.
		 */
		function updateAddToCartButton() {
			debugLog('Updating add to cart button');
			debugLog('Current selected options:', selectedOptions);
			debugLog('Product options:', productData.options);
            
			
			const allOptionsSelected = selectedOptions.every(option => option !== null);
			debugLog('All options selected:', allOptionsSelected);
            let please_select_translation = translations?.custom?.please_select_size_html || 'Please select {{ size }}';
            let please_addtobasekett_translation = translations?.custom?.add_to_basket || 'Add to basket';
			if (allOptionsSelected && currentVariant && currentVariant.available ) {
				debugLog('All options selected and variant available:', currentVariant);
				addToCartButton.classList.remove("missing-variants");
				addToCartButton.disabled = false;
				addToCartButton.querySelector('.button-text').textContent = please_addtobasekett_translation;
			} else {
              if(addToCartButton  && !addToCartButton?.classList.contains("single-option-free-gift")){
				addToCartButton.classList.add("missing-variants");
				addToCartButton.disabled = true;
              }
				
				if (!allOptionsSelected && !addToCartButton?.classList.contains("single-option-free-gift")) {
					const missingOptions = productData.options
						.filter((option, index) => selectedOptions[index] === null);



     //                var please_select_translation = translations?.custom?.view_more_count_html || 'Please select {{size}}';
     //                var please_addtobasekett_translation = translations?.custom?.add_to_basket || 'Add to basket';
					// let buttonText;
					// if (missingOptions.length === 1) {
					// 	const optionName = missingOptions[0].split(' ').length > 2 ? 'an option' : missingOptions[0];
					// 	buttonText = cartTranslations[cartLanguage]?.please_select || cartTranslations.default.please_select + optionName;
					// } else if (missingOptions.length > 1) {
					// 	const remainingCount = missingOptions.length;
					// 	buttonText = cartTranslations[cartLanguage]?.please_select || cartTranslations.default.please_select + optionName  + {remainingCount} + cartTranslations[cartLanguage]?.options || cartTranslations.default.options;
					// } else {
					// 	buttonText = 'Please select options';
					// }
					// if(addToCartButton){
    	// 				addToCartButton.querySelector('.button-text').textContent = buttonText;
     //                }

                  
					debugLog('Missing options:', missingOptions);
					let buttonText;
					if (missingOptions.length === 1) {
						const optionName = missingOptions[0].split(' ').length > 2 ? 'an option' : missingOptions[0];
						buttonText = please_select_translation?.replace('{{ size }}', optionName);
					} else if (missingOptions.length > 1) {
						const remainingCount = missingOptions.length;
						buttonText = cartTranslations[cartLanguage]?.please_select || cartTranslations.default.please_select + optionName  + {remainingCount} + cartTranslations[cartLanguage]?.options || cartTranslations.default.options;
					} else {
						buttonText = 'Please select options';
					}
					if(addToCartButton){
    					addToCartButton.querySelector('.button-text').textContent = buttonText;
                    }

                  
				} else if ((!currentVariant || !currentVariant.available) && !addToCartButton.classList.contains("single-option-free-gift")) {
					addToCartButton.disabled = true;
					addToCartButton.querySelector('.button-text').textContent = 'Unavailable';
				}
			}
			// debugLog('Updated button state:', { 
			// 	disabled: addToCartButton.disabled, 
			// 	text: addToCartButton.querySelector('.button-text').textContent 
			// });
		}
  
		/**
		 * Updates the radio buttons to reflect the selected variant.
		 * @param {Object} variant - The selected variant object.
		 */
		function updateSelectedVariant(variant) {
			debugLog('Updating selected variant:', variant);
			
			// Update the variant ID input
			const variantIdInput = form.querySelector('input[name="id"]');
			if (variantIdInput) {
				if (variant) {
					variantIdInput.value = variant.id;
					debugLog('Updated variant ID input value:', variant.id);
				} else {
					variantIdInput.value = '';
					debugLog('Cleared variant ID input');
				}
			} else {
				console.warn('ATC: Variant ID input not found in the form');
			}
  
			currentVariant = variant;
			updateAddToCartButton();
		}

      function offBrandToast(object){
        const toast = $('<div>').addClass("px-2 py-2 text-white rounded-sm mb-2");
        toast.css('background-color', object.backgroundColor);
        toast.text(object.text);
        if(object.gravity == "top"){
          if(object.position == "left"){
            $('#top-left-toast').append(toast);
          }
          if(object.position == "right"){
            $('#top-right-toast').append(toast);
          }
        }else if(object.gravity == "bottom"){
          if(object.position == "left"){
            $('#bottom-left-toast').append(toast);
          }
          if(object.position == "right"){
            $('#bottom-right-toast').append(toast);
          }
        }
        
        toast.fadeIn();
        setTimeout(function(){
          toast.fadeOut(function(){
            toast.remove();
          })
        }, object.duration)
        
      }
  
		/**
		 * Adds the current variant to the cart.
		 */
		function addToCart() {
			debugLog('Adding to cart, current variant:', currentVariant);
			addToCartButton.classList.add("loading");
			// if (!currentVariant) {
			// 	debugLog('No valid variant selected');
			// 	offBrandToast({
			// 		text: "Please select all options",
			// 		duration: 3000,
			// 		gravity: "top",
			// 		position: "right",
			// 		backgroundColor: "#f44336",
			// 	})
			// 	return;
			// }
  
			// Serialize the form data
			const formData = new FormData(form);
  
			// The variant ID is already set in the form, so we don't need to add it here
  
			// If selling plan is selected, ensure it's included
			if (sellingPlanSelect && sellingPlanSelect.value) {
				formData.set('selling_plan', sellingPlanSelect.value);
			}
  
			// Convert form data to URL-encoded string
			const dataString = new URLSearchParams(formData).toString();
			debugLog('Form data being sent:', dataString);
  
			// Send AJAX request to add to cart
			fetch('/cart/add.js', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Accept': 'application/json',
				},
				body: dataString,
			})
			.then(response => {
				debugLog('Cart add response:', response);
				if (response.ok) {
					return response.json();
				} else {
					return response.json().then((json) => {
						throw new Error(json.description || 'Failed to add to cart');
					});
				}
			})
			.then(cartItem => {
				debugLog('Item added to cart:', cartItem);
				// Fire a custom event when the item has been added
				const event = new CustomEvent('itemAddedToCart', {
					detail: {
						variant: currentVariant,
						product: productData,
						formData: formData,
					},
				});
				document.dispatchEvent(event);
                const quantityDiv = document.getElementById("cart-items-number");
                const resetRevent = new CustomEvent('revertToCart');
                document.dispatchEvent(resetRevent);
				
				// Fire a custom event to call cart
				const cartevent = new CustomEvent('updateCart');
				document.dispatchEvent(cartevent);
				addToCartButton.classList.remove("loading");
				
				// Display success message using Toastify
  		// 		offBrandToast({
				// 	text: "Item added to cart",
				// 	duration: 3000,
				// 	gravity: "top",
				// 	position: "right",
				// 	backgroundColor: "#4caf50",
				// })
			})
			.catch(error => {
				console.error('ATC: Error adding to cart:', error);
				// Display error message using Toastify
				// offBrandToast({
				// 	text: "Error adding to cart: " + error.message,
				// 	duration: 5000,
				// 	gravity: "top",
				// 	position: "right",
				// 	backgroundColor: "#f44336",
				// });
				addToCartButton.classList.remove("loading");
			});
		}
  
		// Initial update of the add to cart button
		debugLog('Initial update of add to cart button');
		updateAddToCartButton();
  
		// Public method to update the selected variant
		form.updateSelectedVariant = function(variant) {
			if (variant) {
				updateSelectedVariant(variant);
			} else {
				selectedOptions.fill(null);
				currentVariant = null;
				updateAddToCartButton();
			}
		};
	}
  
	// MutationObserver to automatically initialize new product forms
	const observer = new MutationObserver((mutations) => {
		debugLog('DOM mutation observed');
		mutations.forEach((mutation) => {
			// Loop through added nodes
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === Node.ELEMENT_NODE) {
					let formToInitialize;
					
					// Check if the added node is a product form
					if (node.matches('.product-form')) {
						debugLog('New product form');
						formToInitialize = node;
					} 
					// If it's product options, find the parent form
					else if (node.matches('.product-options')) {
						debugLog('New product options');
						formToInitialize = node.closest('.product-form');
					}
					
					// Initialize the form if found
					if (formToInitialize) {
						debugLog('New product form found:', formToInitialize);
						initializeProductForm(formToInitialize);
					}
					
					// Check for product forms within the added node
					const forms = node.querySelectorAll('.product-form');
					forms.forEach((form) => {
						debugLog('New product form found within added node:', form);
						initializeProductForm(form);
					});
				}
			});
		});
	});
  
	// Start observing the document body for changes in child elements
	debugLog('Starting MutationObserver');
	observer.observe(document.body, { childList: true, subtree: true });
  
	/**
	 * Initializes all existing product forms on the page.
	 */
	function initializeExistingProductForms() {
		debugLog('Initializing existing product forms');
		const productForms = document.querySelectorAll('.product-form');
		debugLog('Found existing product forms:', productForms.length);
		productForms.forEach((form) => {
			initializeProductForm(form);
		});
	}
  
	// Check if the document is already ready
	if (document.readyState === 'loading') {
		debugLog('Document still loading, waiting for DOMContentLoaded');
		// Document is still loading, wait for DOMContentLoaded
		document.addEventListener('DOMContentLoaded', initializeExistingProductForms);
	} else {
		debugLog('Document already loaded, initializing immediately');
		// Document is already ready, initialize immediately
		initializeExistingProductForms();
	}

    document.body.addEventListener('click', function(event) {
        if (event.target.closest('.increment')) {
            const form = event.target.closest('form');
            const quantityDisplay = form.querySelector('.quantity');
            const queryInput = form.querySelector('[name="quantity"]');
    
            if (queryInput) {
                queryInput.value = parseInt(queryInput.value) + 1;
                quantityDisplay.innerHTML = parseInt(queryInput.value);
            } else {
                console.log('Quantity input not found.');
            }
        }
         if (event.target.closest('.decrement')) {
            const form = event.target.closest('form');
            const quantityDisplay = form.querySelector('.quantity');
            const queryInput = form.querySelector('[name="quantity"]');
    
            if (queryInput) {
              if(queryInput.value > 1){ 
                queryInput.value = parseInt(queryInput.value) - 1;
                quantityDisplay.innerHTML = parseInt(queryInput.value);
              }
            } else {
                console.log('Quantity input not found.');
            }
        }
    });

})();