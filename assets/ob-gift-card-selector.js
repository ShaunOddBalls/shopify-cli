// Global variables to track the current state
let currentType = "Digital"; // Changed from "Physical" to "Digital"
let currentCard; // Stores the currently selected card data
let sendToSomeone = true
const atcForm = document.getElementById("gift-card-form"); // Reference to the add-to-cart form
let currentSwiper;
const emailInput = document.getElementById('email-loc')
const nameInput = document.getElementById('gc-name')

function displayError(errors, num){
  const nodeId = "error-log-" + num
  const errorLog = document.getElementById(nodeId)
  // Clear existing errors
  errorLog.innerHTML = "";

  
  
  if (errors.length > 0) {
    const ul = document.createElement("ul");
    ul.className = "border-red-600 border border-solid rounded-lg mx-auto w-full md:mx-none p-0.5 mb-3 pl-4 pt-2 p4 error-list"
    errors.forEach(error => {
      const li = document.createElement("li");
      li.textContent = error;
      li.className = "text-red-600 text-sm mb-2 relative";
      ul.appendChild(li);
    });
    errorLog.appendChild(ul);

    errorLog.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center' // Centers the element in the viewport
    });
  }
  
}

function errorCheck(form){
  console.log('checking errors')
  let errorList = [];
  let errorTypeOne = [];
  let errorTypeTwo = [];
  const formData = new FormData(form);
  const variantId = formData.get('id');
  const sendTo = formData.get('properties[Send on]') 
  const email = formData.get('properties[Recipient email]')
  const name = formData.get('properties[Recipient name]')

                            
  // Check if a variant is selected
  if (!variantId) {
    errorTypeOne.push('Please select a gift card value');
    
  }
  
  if( sendToSomeone && !email ){
    errorTypeTwo.push("Please enter the Recipient's Email address");
    emailInput.classList.add('error-input')
  }else{
    emailInput.classList.remove('error-input')
  }
  
  if( sendToSomeone && !name ){
    errorTypeTwo.push("Please enter the Recipients Name");
    nameInput.classList.add('error-input')
  }else{
    nameInput.classList.remove('error-input')
  }

  displayError(errorTypeTwo,2 );
  displayError(errorTypeOne, 1);
  errorList = errorTypeOne + errorTypeTwo;
  console.log("Error List: ", errorList)
  return errorList;
}

document.querySelectorAll('.error-input').forEach(input => {
    input.addEventListener('input', (event) => {
        const inputElement = event.target;

        switch (inputElement.id) {
            case 'email-loc':
                console.log('Username input changed:', inputElement.value);
                errorcheck(atcForm)
                break;
            case 'gc-name':
            default:
                console.log('Other input changed:', inputElement.value);
                // Default logic for other inputs
                break;
        }
    });
});


// Add click event listener to handle all click interactions
document.body.addEventListener('click', function(event) {
  // Prevent default behavior for missing variant click
  if(event.target.closest("#gc-missing-variant")){
    console.log("Preventing default missing variant click")
    event.stopPropagation();
    errorCheck(atcForm, event)
 
  }

  // Handle add to cart button click
  if(event.target.closest("#gc-add-to-cart")){
    const form = atcForm
    const variant = atcForm.querySelector('input[name="id"]').value;
    const errors = errorCheck(form);
    console.log(errors.length)
    if(errors.length == 0){
      console.log('ADD TO CART')
      gcAddToCart(form, variant)
    }else{
      console.log('Errors found!!!!!!!!!')
    }
  }

  // Handle theme selector dropdown toggle
  if(!event.target.closest("#gc-theme-selected")){
    document.getElementById("gc-theme-selector-wrapper").classList.remove("show-popover");
  }
  if(event.target.closest("#gc-theme-selected")){
    document.getElementById("gc-theme-selector-wrapper").classList.toggle("show-popover");
  }

  // Handle theme option selection
  if(event.target.closest(".gc-theme-option")){
    const text = event.target.closest(".gc-theme-option").innerHTML;
    document.getElementById("gc-theme-selected-text").innerHTML = text
    const tag = event.target.closest(".gc-theme-option").dataset.tag;
  
    // Load appropriate cards based on current type and selected theme
    if(currentType == "Physical"){
      getPhysicalCards(tag);
    }else{
      getDigitalCards(tag);
    }
  }

  // Handle variant selection
  if(event.target.closest(".product-variant")){
    const varId = event.target.closest(".product-variant").dataset.cardvariantid;
    const prodVarIdInput = atcForm.querySelector('input[name="id"]');
    prodVarIdInput.value = varId;
    document.getElementById("gc-missing-variant").style.display = "none";
    document.getElementById("gc-add-to-basket").style.display = "flex";
    checkPersonalisation();
  }

  // Handle gift card design selection
  if(event.target.closest(".gift-card-wrapper")){
    // Remove active class from all cards
    const otherCards = document.querySelectorAll(".gift-card-wrapper");
    otherCards.forEach((card) =>{
      card.classList.remove("active");
    })
    // Add active class to selected card
    event.target.closest(".gift-card-wrapper").classList.add("active");
    
    // Parse product data and update the form
    const prod = JSON.parse(event.target.closest(".gift-card-wrapper").querySelector("input").value);
    let design;
    // Extract design name from tags
    prod.tags1.forEach((tag) =>{
      if(tag.includes("gcstyle-")){
        design = tag.replace("gcstyle-", "");
        design = design.replace(/-/g, " ");
      }
    })
    document.getElementById("gc-design-name").innerHTML = design;
    
    // Update form with product data
    const prodIdInput = atcForm.querySelector('input[name="product-id"]');
    atcForm.querySelector(".js-prod-data").value = JSON.stringify(prod);
    prodIdInput.value = prod.productId;
    atcForm.setAttribute("data-product-id",prod.productId )
    console.log(prod)
    currentCard = prod;

    // Map variants to price options
    const variants = prod.skus;
    const variantDivs = document.querySelectorAll(".product-variants .product-variant");
    for(variant of variants){
      variantDivs.forEach((variantDiv) =>{
        if(variant.name.replace(".00", "") == variantDiv.dataset.optionvalue){
          variantDiv.setAttribute("data-cardvariantid", variant.id);
        }
      })
    }

    // Handle pre-selected variant if any
    const checkedVariant = document.querySelector('.product-variant input:checked');
    if (checkedVariant) {
      const parentVariant = checkedVariant.closest('.product-variant');
      if (parentVariant) {
        parentVariant.click();
        console.log(parentVariant)
      }else{
      console.log("no parent div");
    }
    }
  }
    
  // Handle gift card type selection (Physical/Digital)
  if(event.target.closest(".card-type-option")){
    const options = document.querySelectorAll(".card-type-option");
    options.forEach((option) => {
      option.classList.remove("active");
    })
    event.target.closest(".card-type-option").classList.add("active");
    if(event.target.closest("#physical-gift-card")){
      currentType = "Physical";
      getPhysicalCards()
      document.getElementById("e-gift-options").style.display = "none";
    }
    if(event.target.closest("#digital-gift-card")){
      checkPersonalisation();
      currentType = "Digital";
      document.getElementById("e-gift-options").style.display = "flex";
      getDigitalCards()
    }
  }
})

// Update Swiper configuration in both functions
const swiperConfig = {
    spaceBetween: 20,
    slidesPerView: 1.5,
    centeredSlides: true, 
    pagination: {
        el: '.gc-swiper-pagination',
        type: 'bullets',
        clickable: true,
        bulletActiveClass: 'swiper-pagination-bullet-active',
        bulletClass: 'swiper-pagination-bullet',
        modifierClass: 'swiper-pagination-'
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden'
    },
    breakpoints: {
        580: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        760: {
            slidesPerView: 2,
            spaceBetween: 30
        }
    },
    centeredSlides: true,
    loop: true,
    grabCursor: true,
    autoHeight: true,
    watchOverflow: true
};

// Update both functions to use the same swiper initialization
const initializeSwiper = (products) => {
    if(currentSwiper){
        currentSwiper.destroy(true, true);  // true, true to completely remove old instance
    }
    
    currentSwiper = new Swiper('#gc-prod-location', swiperConfig);
    
    currentSwiper.on('slideChange', function () {
        const activeSlide = this.slides[this.activeIndex];
        if (activeSlide && window.innerWidth <= 760) {
            setTimeout(() => {
                activeSlide.click();
            }, 250);
        }
    });

    // Click first card after swiper is initialized
    const firstGiftCardWrapper = document.querySelector('.gift-card-wrapper');
    if (firstGiftCardWrapper) {
        firstGiftCardWrapper.click();
    }
};

// Update physical cards fetch to use gifting-cards collection
const getPhysicalCards = async (tag = "false") => {

    try {
        let url = '/collections/gifting-cards/products.json?limit=30';
        if (tag && tag !== "false") {
            url += `&tag=${tag}`;
        }else{
            document.getElementById("gc-theme-selected-text").innerHTML = "All Cards";
        }
     const response = await fetch(url);
        const data = await response.json();
        
        // Transform data to match expected format
        const temp = data.products.map(product => ({
            name: product.title,
            price: product.variants[0].price,
            imageUrl: product.images[0]?.src || '',
            productId: product.id,
            tags1: product.tags,
            skus: product.variants.map(variant => ({
                id: variant.id,
                name: variant.title,
                availability: variant.available
            }))
        }));
      let products = temp;
      console.log("PRODUCTS", products)
      
      if(tag != "false"){
         products = temp.filter((prod) =>{       
          return prod.tags1.includes(tag);
        })
      }

        addCardsToPage(products);
        initializeSwiper(products);
    } catch (error) {
        console.error('Error fetching physical gift cards:', error);
    }
}

// Keep digital cards fetch using e-gift-card collection
const getDigitalCards = async (tag = "false") => {
    try {
        let url = '/collections/e-gift-card/products.json?limit=30';
        if (tag && tag !== "false") {
            url += `&tag=${tag}`;
        }else{
            document.getElementById("gc-theme-selected-text").innerHTML = "All Cards";
        }
        
        const response = await fetch(url);
        const data = await response.json();

      // //console.clear()
        console.log('Product Data: ', data)
        
        // Transform data to match expected format
        const temp = data.products.map(product => ({
            name: product.title,
            handle: product.handle,
            price: product.variants[0].price,
            imageUrl: product.images[0]?.src || '',
            productId: product.id,
            tags1: product.tags,
            skus: product.variants.map(variant => ({
                id: variant.id,
                name: variant.title,
                availability: variant.available
            }))
        }));
      let products = temp;
      
      if(tag != "false"){
         products = temp.filter((prod) =>{       
          return prod.tags1.includes(tag);
        })
      }

        addCardsToPage(products);
        initializeSwiper(products);
    } catch (error) {
        console.error('Error fetching digital gift cards:', error);
    }
}

// Load initial products - changed to start with digital cards
const getInitialProds = () => {
    getDigitalCards();
}
// Helper function to check if all personalization fields are filled
const checkPersonalisation = () => {
  if(document.getElementById("digital-gift-card").classList.contains("active")){
    const inputs = document.querySelectorAll("#e-gift-options input");
    let inputsChecked = true;
    inputs.forEach((input) =>{
      if(!input.value){
        inputsChecked = false;
      }
    })
    if(!inputsChecked){ 
      document.getElementById("gc-missing-variant").style.display = "flex";
      document.getElementById("gc-add-to-basket").style.display = "none";
    }
  }
}

// Initialize the gift card selector
(async () => {
    // Set digital gift card as active by default
    const digitalGiftCard = document.getElementById('digital-gift-card');
    const physicalGiftCard = document.getElementById('physical-gift-card');
    if (digitalGiftCard && physicalGiftCard) {
        digitalGiftCard.classList.add('active');
        physicalGiftCard.classList.remove('active');
    }
    
    // Show e-gift options by default
    const eGiftOptions = document.getElementById('e-gift-options');
    if (eGiftOptions) {
        eGiftOptions.style.display = 'flex';
    }
    
    getInitialProds();
})();



// Add gift cards to the page slider
const addCardsToPage = (products) => {
    const sliderWrapper = document.querySelector("#gift-card-slider-wrapper");
    sliderWrapper.innerHTML = "";
    
    if(products.length == 0){
        const OosWrapper = document.createElement("div");
        OosWrapper.className = "my-10 text-center w-full";
        OosWrapper.innerHTML = "We have no stock left";
        sliderWrapper.append(OosWrapper);
        return;
    }

    // Ensure minimum of 4 products for consistent slider format
    let productsToRender = [...products];
    while (productsToRender.length < 4) {
        productsToRender = [...productsToRender, ...products];
    }
    
    productsToRender.forEach(product => {
        const wrapper = document.createElement("div");
        let prodInfoDiv = document.createElement("input");
        prodInfoDiv.type = "hidden";
        prodInfoDiv.value = JSON.stringify(product);
        wrapper.append(prodInfoDiv);
        wrapper.className = "gift-card-wrapper swiper-slide rounded-md flex justify-center p-4"
        wrapper.setAttribute('handle', product.handle);
        wrapper.style.height = "180px";
        wrapper.style.backgroundColor = "white";
        wrapper.style.position = "relative";
        
        const tickSVG = document.createElement("div");
        tickSVG.className = "absolute right-2 bottom-2 gc-tick flex-col items-center justify-center p-2 aspect-square border-2 border-solid border-[#f00f93] bg-[#f00f93] rounded-full"
        tickSVG.innerHTML = '<svg fill="#ffffff" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve" style="    width: 15px;    height: 15px;"><polygon points="437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94 "></polygon></svg>';
        
        const selectedText = document.createElement("div");
        selectedText.innerHTML = "Selected";
        selectedText.style.color = "#ffffff";
        selectedText.className = "font-bold text-xxs text-white";
        tickSVG.append(selectedText);
        wrapper.append(tickSVG);
        
        const prodImg = document.createElement("img");
        prodImg.src = product.imageUrl;
        prodImg.classList.add("rounded-2xl", "shadow-md");
        prodImg.style.height = "100%";
        prodImg.style.objectFit = "contain";
        prodImg.style.border = "1px solid #ede6e6"
        wrapper.append(prodImg);
        
        sliderWrapper.append(wrapper);
    });
}

// Add to cart functionality
const gcAddToCart = (form, currentVariant) =>{
    return new Promise((resolve, reject) => {
        const productData = JSON.parse(form.querySelector('.js-prod-data').value);
        console.log('Adding to cart, current variant:', currentVariant);
        const formData = new FormData(form);
        const dataString = new URLSearchParams(formData).toString();
        console.log(dataString)
        console.log('Form data being sent:', dataString);
        fetch('/cart/add.js', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: dataString,
        })
        .then(response => {
            console.log('Cart add response:', response);
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then((json) => {
                    throw new Error(json.description || 'Failed to add to cart');
                });
            }
        })
        .then(cartItem => {
            console.log('Item added to cart:', cartItem);
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

            resolve(cartItem);
        })
        .catch(error => {
            console.error('ATC: Error adding to cart:', error);
            reject(error);
        });
    });
}

// Update form field updates to handle date format conversion
function updateFormField(inputId, formFieldSelector) {
  console.log("listening for inputs")
  const inputElement = document.getElementById(inputId);
  const formFieldElement = document.querySelector(formFieldSelector);

  if (inputElement && formFieldElement) {
    inputElement.addEventListener("input", () => {
      console.log("input detected")
      
      // Special handling for delivery date to convert format
      if (inputId === "delivery-date") {
        // Convert from DD-MM-YYYY to YYYY-MM-DD for the hidden form field
        const [day, month, year] = inputElement.value.split('-');
        formFieldElement.value = `${year}-${month}-${day}`;
      } else {
        formFieldElement.value = inputElement.value;
      }
      
      console.log("updating to:", formFieldElement.value)
      
      const checkedInput = document.querySelector(".product-variants input:checked");
      if(checkedInput){
        console.log("checking personalisation");
        document.getElementById("gc-missing-variant").style.display = "none";
        document.getElementById("gc-add-to-basket").style.display = "flex";
        checkPersonalisation();
      }
    });

    // Also trigger on change event for the date picker
    if (inputId === "delivery-date") {
      inputElement.addEventListener("change", () => {
        const [day, month, year] = inputElement.value.split('-');
        formFieldElement.value = `${year}-${month}-${day}`;
        console.log("Date changed to:", formFieldElement.value);
      });
    }
  }
}

// Initialize form field updates
updateFormField("email-loc", "input[name='properties[Recipient email]']");
updateFormField("delivery-date", "input[name='properties[Send on]']");
updateFormField("gc-name", "input[name='properties[Recipient name]']");
updateFormField("message", "textarea[name='properties[Message]']");

// Handle custom amount input
const customAmountInput = document.getElementById('custom-amount');
customAmountInput?.addEventListener('input', (e) => {
  const value = parseInt(e.target.value);
  if (value < 10) e.target.value = 10;
  if (value > 500) e.target.value = 500;
  
  // Deselect any pre-set amounts
  document.querySelectorAll('.product-variant input').forEach(input => {
    input.checked = false;
  });
  
  // Update form value
  const variantId = getVariantIdForCustomAmount(value);
  if (variantId) {
    atcForm.querySelector('input[name="id"]').value = variantId;
    document.getElementById("gc-missing-variant").style.display = "none";
    document.getElementById("gc-add-to-basket").style.display = "flex";
  }
});

// Character counter for personalization message
const messageTextarea = document.getElementById('personalization-message');
const charCount = document.getElementById('char-count');

messageTextarea?.addEventListener('input', (e) => {
  const remaining = 250 - e.target.value.length;
  charCount.textContent = remaining;
  
  // Update form value
  document.getElementById('form-message').value = e.target.value;
});

// Update form with delivery details
const deliveryFields = {
  'recipient-firstname': 'form-firstname',
  'recipient-lastname': 'form-lastname',
  'recipient-message': 'form-form-message',
  'address-line1': 'form-address1',
  'address-line2': 'form-address2',
  'town': 'form-town',
  'postcode': 'form-postcode'
  
};

// Add event listeners for delivery field updates
Object.entries(deliveryFields).forEach(([inputId, formId]) => {
  const input = document.getElementById(inputId);
  input?.addEventListener('input', (e) => {
    document.getElementById(formId).value = e.target.value;
    validateForm();
  });
});

// Validate all required form fields
function validateForm() {
  const requiredFields = [
    'recipient-firstname',
    'recipient-lastname',
    'address-line1',
    'town',
    'postcode'
  ];
  
  const isValid = requiredFields.every(fieldId => 
    document.getElementById(fieldId)?.value.trim()
  );
  
  const addToCartBtn = document.getElementById('gc-add-to-basket');
  if (addToCartBtn) {
    addToCartBtn.style.display = isValid ? 'flex' : 'none';
    document.getElementById('gc-missing-variant').style.display = isValid ? 'none' : 'flex';
  }
}

// Helper function to get variant ID for custom amount
function getVariantIdForCustomAmount(amount) {
  if (!currentCard?.skus) return null;
  
  // Find the closest variant match
  return currentCard.skus.find(sku => 
    parseFloat(sku.name) === amount
  )?.id;
}


// Card Selector Slider
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

let popUp = document.getElementById('general-popup-content');

$(document).ready(function () {
    $('.js-preview').on('click', function (event) {
        event.preventDefault();
        this.querySelector('.circular-loader')?.classList.remove('hidden');
        this.querySelector('.prev-text')?.classList.add('hidden');

        const name = document.querySelector("#gc-name")?.value || 'Guess What!';
        const message = document.querySelector("#message")?.value || '';
        const atcForm = document.querySelector('form');
        const selectedVariant = atcForm?.querySelector('input[name="id"]')?.value || '';
        let date = document.querySelector("#delivery-date")?.value || '';

        const activeGiftCardWrapper = document.querySelector('.gift-card-wrapper.active');
        const handle = activeGiftCardWrapper ? activeGiftCardWrapper.getAttribute('handle') : '';

        let imageSrc = null;
        if (activeGiftCardWrapper) {
            const image = activeGiftCardWrapper.querySelector('img');
            if (image) {
                imageSrc = image.src;
            }
        }

        // Ensure date is formatted as "dd/mm/yyyy"
        if (!date) {
            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            date = `${day}/${month}/${year}`;
        } else {
            const [year, month, day] = date.split('-');
            date = `${day}/${month}/${year}`;
        }

        // Get selected price from radio button
        const radios = document.querySelectorAll('input[type="radio"][data-optionvalue]');
        const getCheckedOptionValue = () => {
            const checkedRadio = Array.from(radios).find(radio => radio.checked);
            return checkedRadio ? checkedRadio.getAttribute('data-optionvalue') : null;
        };
        const price = getCheckedOptionValue();

        if (!handle) {
            console.error("No valid handle found for the product.");
            return;
        }

        const url = `https://www.myoddballs.com/products/${handle}?view=redeem-card-banner`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                // Replace elements
                const imageElement = tempDiv.querySelector('#image');
                if (imageElement && imageSrc) {
                    imageElement.src = imageSrc;
                }

                const messageElement = tempDiv.querySelector('#message');
                if (messageElement && message) {
                    messageElement.innerHTML = message;
                }

                const dateElement = tempDiv.querySelector('#date');
                if (dateElement) {
                    dateElement.innerHTML = date;
                }

                const priceElement = tempDiv.querySelector('#price');
                if (priceElement && price) {
                    priceElement.innerHTML = price;
                }

                const nameElement = tempDiv.querySelector('#name');
                if (nameElement && name) {
                    nameElement.innerHTML = name;
                }

                document.getElementById("general-popup-contents").innerHTML = tempDiv.innerHTML;

                this.querySelector('.circular-loader')?.classList.add('hidden');
                this.querySelector('.prev-text')?.classList.remove('hidden');
                // Open the popup
                openPopup(popUp);
              
            })
            .catch(error => {
                console.error("Error fetching content:", error);
                document.getElementById("general-popup-contents").textContent = "Failed to load content.";
            });
    });
});




        const datepickerInput = document.getElementById("delivery-date");
        const datepickerContainer = document.getElementById(
          "datepicker-container"
        );
        const toggleDatepicker = document.getElementById("toggleDatepicker");
        const applyButton = document.getElementById("applyButton");
        const daysContainer = document.getElementById("days-container");
        const currentMonthDisplay = document.getElementById("currentMonth");

        const today = new Date();
        let currentMonth = today.getMonth();
        let currentYear = today.getFullYear();
        const currentDay = today.getDate();

        // Preselect today's date in the input field
        datepickerInput.value = `${currentDay.toString().padStart(2, "0")}-${(
          currentMonth + 1
        )
          .toString()
          .padStart(2, "0")}-${currentYear}`;

        function getDaysInMonth(month, year) {
          return new Date(year, month + 1, 0).getDate();
        }

        function renderCalendar(month, year) {
          const firstDayOfMonth = new Date(year, month, 1).getDay();
          const daysInMonth = getDaysInMonth(month, year);
          const lastDayOfMonth = new Date(year, month, daysInMonth).getDay();

          daysContainer.innerHTML = "";

          // Empty spaces before the first day of the month
          for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add(
              "h-[38px]",
              "w-[38px]",
              "sm:h-[46px]",
              "sm:w-[47px]"
            );
            daysContainer.appendChild(emptyDay);
          }

          // Days of the month
          for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add(
                "h-[30px]",
                "w-[30px]",
                "flex",
                "items-center",
                "justify-center",
                "sm:h-[35px]",
                "sm:w-[35px]",
                "cursor-pointer",
                "day",
                "text-sm"
            );

            // Disable days before today
            if (
              (month === today.getMonth() &&
                year === today.getFullYear() &&
                i < today.getDate()) ||
              year < today.getFullYear() ||
              (year === today.getFullYear() && month < today.getMonth())
            ) {
              dayDiv.classList.add("pointer-events-none", "opacity-30");
            }


            dayDiv.textContent = i;
            dayDiv.addEventListener("click", function () {
              // Remove 'active' class from all days
              const allDays = daysContainer.querySelectorAll(".day");
              allDays.forEach((day) => day.classList.remove("active"));

              // Add 'active' class to the clicked day
              dayDiv.classList.add("active");

              // Format date as dd-mm-yyyy for display
              const formattedDay = i.toString().padStart(2, "0");
              const formattedMonth = (month + 1).toString().padStart(2, "0");
              datepickerInput.value = `${formattedDay}-${formattedMonth}-${year}`;
              
              // Trigger the change event to update the form
              datepickerInput.dispatchEvent(new Event('change'));
              
              datepickerContainer.classList.add("hidden");
            });

            daysContainer.appendChild(dayDiv);
          }

          // Empty spaces after the last day of the month
          for (let i = lastDayOfMonth; i < 6; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add(
              "h-[38px]",
              "w-[38px]",
              "sm:h-[46px]",
              "sm:w-[47px]"
            );
            daysContainer.appendChild(emptyDay);
          }

          // Update month label
          const monthName = new Date(year, month).toLocaleString("default", {
            month: "long",
          });
          currentMonthDisplay.textContent = `${monthName} ${year}`;
        }

        renderCalendar(currentMonth, currentYear);

        // Replace the toggleDatepicker click listener with a listener on the entire input area
        datepickerInput.addEventListener("click", function (e) {
          e.stopPropagation(); // Prevent the document click event from firing
          datepickerContainer.classList.toggle("hidden");
        });

        toggleDatepicker.addEventListener("click", function (e) {
          e.stopPropagation(); // Prevent the document click event from firing
          datepickerContainer.classList.toggle("hidden");
        });

        // Keep the existing click-outside listener
        document.addEventListener("click", function (e) {
          const isClickInsideDatepicker = datepickerContainer.contains(
            e.target
          );
          const isClickOnInput = datepickerInput.contains(e.target);
          const isClickOnToggle = toggleDatepicker.contains(e.target);

          if (!isClickInsideDatepicker && !isClickOnInput && !isClickOnToggle) {
            datepickerContainer.classList.add("hidden");
          }
        });

        // Keep the existing prevent-close listener
        datepickerContainer.addEventListener("click", function (e) {
          e.stopPropagation();
        });

        applyButton.addEventListener("click", function () {
          datepickerContainer.classList.add("hidden");
        });

        // Add event listeners for month navigation
        document.getElementById("nextMonth").addEventListener("click", () => {
          if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
          } else {
            currentMonth++;
          }
          renderCalendar(currentMonth, currentYear);
        });

        document.getElementById("prevMonth").addEventListener("click", () => {
          if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
          } else {
            currentMonth--;
          }
          renderCalendar(currentMonth, currentYear);
        });

        const sendNowRadio = document.getElementById('date');
        const sendFutureRadio = document.getElementById('date_new');
        const deliveryDateInput = document.getElementById('delivery-date');
        const heightAnimationContainer = document.querySelector('.height-animation');
        const radioButtons = document.querySelectorAll('.date-send-input');
        const labels = document.querySelectorAll('.check-box label');
        
        // Function to get today's date in the format YYYY-MM-DD
        function getTodayDate() {
          const today = new Date();
          const year = today.getFullYear();
          const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
          const day = String(today.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        }
        
        // Function to update the label style based on the selected radio button
        function updateLabelStyle() {
          labels.forEach(label => label.classList.remove('font-semibold'));
        
          radioButtons.forEach(radio => {
            if (radio.checked) {
              const associatedLabel = document.querySelector(`label[for="${radio.id}"]`);
              if (associatedLabel) {
                associatedLabel.classList.add('font-semibold');
              }
            }
          });
        }
        
        // Function to reset calendar to today and highlight today's date
        function resetCalendarToToday() {
            // Reset to current month/year
            const today = new Date();
            currentMonth = today.getMonth();
            currentYear = today.getFullYear();
            const currentDay = today.getDate();
            
            // Re-render calendar with today's date
            renderCalendar(currentMonth, currentYear);
            
            // After re-rendering, find all day elements and update active state
            setTimeout(() => {
                const dayElements = daysContainer.querySelectorAll(".day");
                dayElements.forEach(day => {
                    day.classList.remove("active");
                    if (parseInt(day.textContent) === currentDay) {
                        day.classList.add("active");
                    }
                });
                
                // Format today's date for the input
                const formattedDay = currentDay.toString().padStart(2, '0');
                const formattedMonth = (currentMonth + 1).toString().padStart(2, '0');
                deliveryDateInput.value = `${formattedDay}-${formattedMonth}-${currentYear}`;
                
                // Reset the send_on hidden input value to empty
                document.getElementById('send_on').value = '';
            }, 0);
        }
        
        // Update the toggle function
        function toggleDeliveryDate() {
            if (sendFutureRadio.checked) {
                deliveryDateInput.style.display = 'block';
                heightAnimationContainer.classList.add('expanded');
                heightAnimationContainer.style.height = heightAnimationContainer.scrollHeight + 'px';
            } else {
                heightAnimationContainer.style.height = '0';
                deliveryDateInput.style.display = 'none';
                // Reset calendar and highlight today when "Send now" is selected
                resetCalendarToToday();
                heightAnimationContainer.classList.remove('expanded');
            }
            updateLabelStyle();
        }
        
        // Add event listeners to the radio buttons
        radioButtons.forEach(radio => {
          radio.addEventListener('change', toggleDeliveryDate);
        });
        
        // Initialize visibility and set the date on page load
        deliveryDateInput.value = getTodayDate();
        toggleDeliveryDate();

// Add this with your other initialization code
const sendToMeRadio = document.getElementById('send_to_me');
const sendToOtherRadio = document.getElementById('send_to_other');
const eGiftOptionsContainer = document.getElementById('e-gift-options');
const recipientTypeInputs = document.querySelectorAll('.recipient-type-input');

// Function to toggle the e-gift options visibility
function toggleEGiftOptions() {
  if (sendToOtherRadio.checked) {
    sendToSomeone = true
    eGiftOptionsContainer.style.display = 'flex';
    document.getElementById('Recipient-email').disabled = false;
    document.getElementById('Recipient-name').disabled = false;
    document.getElementById('form-message').disabled = false;
    document.getElementById('Recipient-control').disabled = false;
    document.getElementById('Recipient-control').disabled = false;
    document.getElementById('offset').disabled = false;
    document.getElementById('send_on').disabled = false;
  } else {
    sendToSomeone = false
    eGiftOptionsContainer.style.display = 'none';
    // Clear form fields when switching back to "send to me"
    document.getElementById('Recipient-name').disabled = true;
    document.getElementById('Recipient-email').disabled = true;
    document.getElementById('form-message').disabled = true;
    document.getElementById('Recipient-control').disabled = true;
    document.getElementById('offset').disabled = true;
    document.getElementById('send_on').disabled = true;
    
    
    // Also trigger form validation
    checkPersonalisation();
  }
  updateLabelStyle();
}

// Add event listeners to the radio buttons
recipientTypeInputs.forEach(radio => {
  radio.addEventListener('change', toggleEGiftOptions);
});

// Initialize visibility on page load
toggleEGiftOptions();




