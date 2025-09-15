(()=>{
    const __test__ = {};


    let isOrigionalProduct = true;
    const plainBg = document.querySelector("#plain-background").value
    const platternedBg = document.querySelector("#patterned-background").value
    const plainSecondaryBg = document.querySelector("#secondary-plain-background").value
    const platternedSecondaryBg = document.querySelector("#secondary-patterned-background").value
    const origionalBackground = document.querySelector(".origional-background").value
    const swapBackground = document.querySelector(".swap-background").value
    const origionalSecondaryBackground = document.querySelector(".secondary-origional-background").value
    const swapSecondaryBackground = document.querySelector(".secondary-swap-background").value
    const origionalProduct = document.getElementById("current-product-json").value;
    const swapProduct = document.getElementById("style-equivalent-product-json").value;
    const background  = document.getElementById("subs-background");
    const mobile_background  = document.getElementById("mobile-subs-background");
    const productFormInput = document.getElementById("product-json")

    
    const addSubToCart = () => {
        console.log("hello")
        let chosenVariant;
        const productForm = document.querySelector(".product-form");
        const prodVarIdInput = productForm.querySelector('input[name="id"]');
        const selectedInputs = document.querySelectorAll(".product-variants input:checked");
        const selectedArr = Array.from(selectedInputs);
        const currentProdVariants = JSON.parse(productFormInput.value).variants;
        currentProdVariants.forEach((variant)=>{
            let isCorrectVariant = true;
            const first = variant.option1;
            const second = variant.option2;
            selectedArr.forEach((input) =>{
                if(input.dataset.optionValue != first && input.dataset.optionValue != second){
                    isCorrectVariant = false
                }
                
            })
            if(isCorrectVariant){
                chosenVariant = variant;
            }
        })
        prodVarIdInput.value=chosenVariant.id
        const currentProd = isOrigionalProduct?JSON.parse(origionalProduct):JSON.parse(swapProduct);
        submitSubForm(productForm, chosenVariant,currentProd,currentProd.selling_plan_groups[0].selling_plans[0].id  )
    }

    const submitSubForm = (form, currentVariant,productData, sellingPlan) =>{
      return new Promise((resolve, reject) => {
  
          const formData = new FormData(form);
        if(sellingPlan){
          formData.set('selling_plan', sellingPlan);
        }
          const dataString = new URLSearchParams(formData).toString();
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
  
              const cartevent = new CustomEvent('updateCart');
              document.dispatchEvent(cartevent);
  
              resolve(cartItem); // Resolve the promise when item is successfully added
          })
          .catch(error => {
                    const errDiv = document.createElement("div");
                    errDiv.className="fixed top-2 right-2 bg-red-500 text-white rounded-md px-2 py-1"
                    errDiv.innerHTML = "Error adding to cart";
                    errDiv.style.zIndex = "999999999999";
                    document.body.append(errDiv);
                    setTimeout(() =>{
                      errDiv.remove();
                    }, 2500)
              console.error('ATC: Error adding to cart:', error);
              reject(error); // Reject the promise if there's an error
          });
      });
    }
    const swapSub = () =>{
        isOrigionalProduct = !isOrigionalProduct;
        let nextBackground;
        let nextSecondaryBackground;
        let nextProduct;
        if(isOrigionalProduct){
            nextBackground = origionalBackground;
            nextSecondaryBackground = origionalSecondaryBackground;
            nextProduct = origionalProduct;
        }else{
            nextBackground = swapBackground;
            nextSecondaryBackground = swapSecondaryBackground;
            nextProduct = swapProduct;

        }
        console.log(JSON.parse(nextProduct))

        // background.style.backgroundColor = nextBackground;
        const desktopImages = Array.from(document.querySelectorAll("#product-images .subscription"))
        desktopImages.forEach((image)=>{
            image.style.backgroundColor = nextBackground
        })
        mobile_background.style.backgroundColor = nextBackground;
        productFormInput.value = nextProduct;
        productFormInput.setAttribute("product-id", nextProduct.id);
        swapImages(JSON.parse(nextProduct));
        const infoImages = Array.from(document.querySelectorAll(".subs-info-image"))
        infoImages.forEach((image)=>{
            image.style.backgroundColor = nextSecondaryBackground;
        })
        const titleElement = document.getElementById("product-title");
        titleElement.innerHTML = JSON.parse(nextProduct).title
    }

    const updateAtcButton = () => {
        const options = Array.from(document.querySelectorAll("#product-content #product-variants .product-option"));
        let isMissingOption = false;
        let missingOption = null;
        options.forEach((option)=>{
            const checkedInput = option.querySelector("input:checked");
            if(!checkedInput){
                console.log(option)
                isMissingOption = true;
                if(!missingOption){
                    missingOption = option.dataset.optionName;
                }
            }
        })
        const atcButton = document.getElementById("add-to-cart-loaded");
        const atcButtonWrapper = document.getElementById("add-sub-form")
        if(isMissingOption){
            atcButton.innerHTML = `Please Select ${missingOption}`
            atcButtonWrapper.classList.add("missing-variants");
        }else{
            atcButtonWrapper.classList.remove("missing-variants")
            atcButton.innerHTML = "Add to Basket"
        }
    }
    updateAtcButton();

    const swapImages = (product) =>{
        var currentDate = new Date();
         var currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toLowerCase();
        let images = product.images
        console.log(images);
        let prodImages = images.filter((url) => {
            let matchString = ("month-" + currentMonth);
            return  url.toLowerCase().includes(matchString);
          });
        console.log(prodImages);

        const mobileImages = document.querySelectorAll("#mobile-product-images .ob-product-media__image")
          let mobileImageArr = Array.from(mobileImages);
          mobileImageArr.forEach((image, index)=>{
              const currentImage = prodImages[index % (mobileImageArr.length/3)]
              image.src =currentImage
              image.srcset = modifyUrlWithResolutions(currentImage)
            })
        const thumbnailsmages = document.querySelectorAll(".thumbnails .ob-product-media__image")
          let thumbnailImageArr = Array.from(thumbnailsmages);
          thumbnailImageArr.forEach((image, index)=>{
              const currentImage = prodImages[index % (thumbnailImageArr.length)]
              image.src =currentImage
              image.srcset = modifyUrlWithResolutions(currentImage)
            })
            let desktopImages = document.querySelectorAll("#product-images .ob-product-media__image")
            let desktopImageArr = Array.from(desktopImages);
            desktopImageArr.forEach((image, index)=>{
              const currentImage = prodImages[index % (desktopImageArr.length)]
              image.src =currentImage
              image.srcset = modifyUrlWithResolutions(currentImage)
            })

    }

function modifyUrlWithResolutions(url) { // used to return a source set with multiple resolutions
    var resolutions = [360, 420, 480, 640, 840, 1080, 1280, 1540, 1860, 1950];
    var parts = url.split('.');
    var fileName = parts.slice(0, -1).join('.'); 
    var fileExtension = parts[parts.length - 1];
    var modifiedUrls = [];
  
    for (var i = 0; i < resolutions.length; i++) {
      var resolution = resolutions[i];
      var modifiedUrl = fileName + "_" + (resolution/4) + "x." + fileExtension + " " + resolution/4 + "w";
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
      
  const handlers = {
    updateAtcButton,
    swapSub,
    addSubToCart,
  };
  
  // replace your existing listener body to call handlers.*
  document.addEventListener('click', (e) => {
    if (e.target.closest('.product-variant')) {
      handlers.updateAtcButton();
    }
    if (e.target.closest('#subscription-print-swap')) {
      handlers.swapSub();
      e.target.closest('#subscription-print-swap').classList.toggle('patterned-message');
    }
    if (e.target.closest('#add-sub-form')) {
      e.preventDefault();
      if (!e.target.closest('.missing-variants')) {
        handlers.addSubToCart();
      }
    }
  });

  __test__.handlers = handlers

  __test__.modifyUrlWithResolutions = modifyUrlWithResolutions;
    __test__.updateAtcButton = updateAtcButton;
    __test__.swapImages = swapImages;
    __test__.submitSubForm = submitSubForm;
    __test__.addSubToCart = addSubToCart;
    __test__.swapSub = swapSub;
  if (typeof window !== 'undefined') {
    window.__subsModule__ = __test__;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = __test__;
  }
})()