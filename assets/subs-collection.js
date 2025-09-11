(()=>{

    const headerEle = document.querySelector('.subs-sticky-header');

const offset = 136; // px from top

const subsWrapper = document.getElementById("sub-mens-wrapper")
const subsMarker = document.getElementById("sub-header-marker")
window.addEventListener('scroll', () => {
  const rect = subsMarker.getBoundingClientRect();

  if (rect.top <= offset) {
    console.log("is fixed")
    headerEle.classList.add('is-fixed');
    // subsWrapper.style.paddingTop = "100px"
  } else {
    console.log("is not fixed")
    headerEle.classList.remove('is-fixed');
    // subsWrapper.style.paddingTop = ""
  }
});

function waitForNostoJs(callback) {
    const checkInterval = setInterval(function() {
        if (typeof window.Nosto !== 'undefined') {
            clearInterval(checkInterval);
            callback();
        }
    }, 100); // Check every 100 milliseconds
}

const mensId = "262087901245"
const womensId = "161131167805"
const equivelant100 = parseFloat(document.getElementById("100-money").value);
const currencySymbol = document.body.getAttribute("currency-symbol")
const market = document.body.getAttribute("market") === 'eu' ? 'eu' : 'uk';
const marketTag = `country-${market}`;

const buildCollection = (prods, target) =>{
    target.innerHTML = "";
        var currentDate = new Date();
    var currentMonth = currentDate.toLocaleString('en-US', { month: 'short' }).toLowerCase();
    
    prods.forEach((product,index) => {
        try {
          product.price = (product.price)/100*equivelant100
          product.listPrice = (product.listPrice)/100*equivelant100
          let proceed = product.available || product.tags1.includes("show-out-of-stock-sold-out");
          proceed = proceed && !product.tags1.includes("hide-me") && 
            (product.tags1.includes(marketTag) || !product.tags1.some(tag => tag.startsWith("country-")));
          let tagsProceed = !product.tags1.includes("hide-me") && 
            (product.tags1.includes(marketTag) || !product.tags1.some(tag => tag.startsWith("country-")));
          
          if(product.alternateImageUrls){
            product.alternateImageUrls.unshift(product.imageUrl);
          }
          const tempProdImages = product.alternateImageUrls? product.alternateImageUrls: [product.imageUrl];
          let prodImages = tempProdImages.filter((url) => {
            let matchString = ("month-" + currentMonth);
            return url.toLowerCase().includes("month-") ? url.toLowerCase().includes(matchString) : true;
          });
            if (!product.name.toLowerCase().includes('mid-collection') && !product.name.toLowerCase().includes('mid collection') && proceed) {
                const productCard = document.createElement('div');
                // Add unique identifier using product ID
                productCard.setAttribute('data-product-id', product.productId);
                productCard.classList.add("product-card", "flex", "flex-col");

                const imageWrapper = document.createElement('div');
                imageWrapper.classList.add("product-card__image-wrapper");
                const favoriteButton = document.createElement('button');
                favoriteButton.classList.add("button", "button--variant-outline", "button--icon", "product-card__favourite", "product-card__favourite--off", "hidden");
                favoriteButton.setAttribute("aria-label", "Add product to favourites");
                favoriteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 1024 1024"><path fill="currentColor" d="M923 283.6a260.04 260.04 0 0 0-56.9-82.8a264.4 264.4 0 0 0-84-55.5A265.34 265.34 0 0 0 679.7 125c-49.3 0-97.4 13.5-139.2 39c-10 6.1-19.5 12.8-28.5 20.1c-9-7.3-18.5-14-28.5-20.1c-41.8-25.5-89.9-39-139.2-39c-35.5 0-69.9 6.8-102.4 20.3c-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 0 0-56.9 82.8c-13.9 32.3-21 66.6-21 101.9c0 33.3 6.8 68 20.3 103.3c11.3 29.5 27.5 60.1 48.2 91c32.8 48.9 77.9 99.9 133.9 151.6c92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3c56-51.7 101.1-102.7 133.9-151.6c20.7-30.9 37-61.5 48.2-91c13.5-35.3 20.3-70 20.3-103.3c.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5c0 201.2-356 429.3-356 429.3z"></path><path fill="currentColor" fill-opacity="0" d="M679.7 201c-73.1 0-136.5 40.8-167.7 100.4C480.8 241.8 417.4 201 344.3 201c-104 0-188.3 82.6-188.3 184.5c0 201.2 356 429.3 356 429.3s356-228.1 356-429.3C868 283.6 783.7 201 679.7 201z"></path></svg>';
                imageWrapper.appendChild(favoriteButton);
                const productLink = document.createElement('a');
                productLink.id = "collection-product-link-" + (index + 1)
                productLink.href = product.url.replace("https://www.myoddballs.com", "");
                productLink.classList.add("swiper", "swiper-product", "product-card__image", "group", "aspect-square", "swiper-initialized", "swiper-horizontal", "swiper-ios", "swiper-backface-hidden");

                const swiperWrapper = document.createElement('div');
                swiperWrapper.classList.add("swiper-wrapper");
                swiperWrapper.setAttribute("aria-live", "polite");

                const imageSlide = document.createElement('div');
                imageSlide.classList.add("swiper-slide", "swiper-slide-active", "flex", "items-center");
                imageSlide.setAttribute("role", "group");
                imageSlide.setAttribute("aria-label", "1 / 1");

              
                const productImage = document.createElement('img');
                productImage.classList.add("w-full", "front-image");
                productImage.src = prodImages[0]? prodImages[0] : product.imageUrl;
                productImage.sizes = "(min-width: 720px) 25vw, 50vw"
                productImage.srcset = modifyUrlWithResolutions(prodImages[0]? prodImages[0] : product.imageUrl);
                if(index > 4){ 
                  productImage.loading = "lazy";
                }else{
                  productImage.loading = "eager";
                }
                productImage.alt = product.name;
                productImage.width = 500;
                productImage.height = 500;

                let backImg = prodImages[1];

                const backImage = document.createElement('img');
                backImage.classList.add("w-full","opacity-0", "back-image", "absolute", "top-0", "bottom-0");
                backImage.src = backImg ? backImg : product.imageUrl;
                backImage.srcset = modifyUrlWithResolutions(backImg ? backImg : product.imageUrl);
                backImage.loading = "lazy";
                backImage.alt = product.name;

                imageSlide.appendChild(productImage);
                imageSlide.appendChild(backImage);
                swiperWrapper.appendChild(imageSlide);
                productLink.appendChild(swiperWrapper);
                imageWrapper.appendChild(productLink);

                const labelLoc = document.createElement('div');
                labelLoc.className = "label-loc";
                labelLoc.classList.add("text-xxs");
                productCard.appendChild(imageWrapper);
                productCard.appendChild(labelLoc);

                // Quick add button
                const quickAddWrapper = document.createElement('div');
                quickAddWrapper.className = "bg-gray-100 justify-center p-3";
                const quickAddDiv = document.createElement('div');
                const bisSignup = document.createElement('div');
                bisSignup.className = "rounded-full border border-black border-solid flex justify-center items-center text-center w-full bg-white sm:max-w-[90%] mx-auto py-2 text-xxs md:text-xs klaviyo-bis-trigger uppercase";
                bisSignup.innerHTML = "Sign up to back in stock"
                if(product.available){
                  quickAddWrapper.append(quickAddDiv);
                }else{
                  quickAddWrapper.append(bisSignup);
                }
                quickAddDiv.className = "rounded-full border border-black border-solid grid grid-cols-2 w-full bg-white sm:max-w-[90%] mx-auto";
                
                let gridType = "collection-";

                const seeMoreDiv = document.createElement('a');
                seeMoreDiv.id = gridType + "see-more-" + (index + 1)
                seeMoreDiv.href = product.url.replace("https://www.myoddballs.com", "");
                seeMoreDiv.className = "text-xxs md:text-xs items-center text-center uppercase border-r border-solid border-gray-300 py-2 md:py-2 font-semibold md:font-normal";
                seeMoreDiv.innerText = translations.collections.see_more;
                quickAddDiv.append(seeMoreDiv);

                const quickAddLoader = document.createElement('div');
                quickAddLoader.className = "w-4 quick-buy-loader";
                quickAddLoader.innerHTML = GEBO.helpers.loader;

                const quickAddButton = document.createElement('div');
                quickAddButton.id = gridType + "quick-buy-" +(index + 1)
                quickAddButton.className = "event-quickbuy-show quick-add-wrapper text-xxs md:text-xs items-center text-center uppercase coll-quick-add py-2 font-semibold md:font-normal relative md:py-2 flex justify-center";
                const quickBuyDiv = document.createElement('div');
                quickBuyDiv.className = "quick-buy-text";
                quickBuyDiv.innerHTML = translations.collections.quick_buy;
                quickAddButton.append(quickBuyDiv);

                // Create padding div and append it correctly
                const qbPadding = document.createElement('div');
                qbPadding.className = "absolute left-0 coll-quick-add z-2";
                qbPadding.style.top = "-50%";
                qbPadding.style.width = "120%";
                qbPadding.style.height = "195%";
                qbPadding.setAttribute('data-handle', getShopifyProductHandle(product.url));
                quickAddButton.append(qbPadding);
                quickAddButton.append(quickAddLoader);
                quickAddDiv.append(quickAddButton);

                // Product details
                const productDetails = document.createElement('div');
                productDetails.append(quickAddWrapper);
                productDetails.classList.add("product-card__details", "sm:px-0", "h-full", "pb-2");

                const productTitleLink = document.createElement('a');
                productTitleLink.id = "collection-product-title-" + (index + 1)
                productTitleLink.classList.add("h-full", "flex", "flex-col", "justify-between");
                productTitleLink.href = product.url.replace("https://www.myoddballs.com", "");

                let titleInfo = titleLogic(product);

                const productTitle = document.createElement('p');
                productTitle.classList.add("product-card__details__title", "px-2", "text-base", "font-semibold");
                productTitle.textContent = String(titleInfo['cleanTitle']);

                const productTitleWrap = document.createElement('div');

                const productCategory = document.createElement('p');
                productCategory.classList.add("product-card__details__color", "px-2");
                productCategory.textContent = String(titleInfo['subTitle']);

                const productPrice = document.createElement('p');
                productPrice.classList.add("product-card__details__price", "px-2", "text-magenta-500", "text-md");
                let price = product.price;
                let listPrice = product.listPrice;
                if (listPrice % 1 !== 0) {
                    listPrice = parseFloat(listPrice).toFixed(2);
                }
                if (price % 1 !== 0) {
                    price = parseFloat(price).toFixed(2);
                }
                const normalPrice = currencySymbol + `${price}`;
                const listPriceElement = product.listPrice > product.price
                    ? `<del class="ml-1 text-gray-400">${currencySymbol}${listPrice}</del>`
                    : `<del class="ml-1 text-gray-400 hidden">${currencySymbol}${listPrice}</del>`;
                productPrice.innerHTML = `${normalPrice}${listPriceElement}`;

                const productPriceWrap = document.createElement('div');
              
                productTitleWrap.append(productTitle, productCategory);
                productPriceWrap.append(productPrice);
                productTitleLink.append(productTitleWrap, productPriceWrap);

                productDetails.appendChild(productTitleLink);
                productCard.appendChild(productDetails);

                const prodInfo = document.createElement('input');
                prodInfo.setAttribute("type", "hidden");
                prodInfo.setAttribute("value", JSON.stringify(product));
                prodInfo.classList.add("prod-info");
                productCard.appendChild(prodInfo);
                //christmas message
                const christmas_banner_element = document.getElementById('christmas_banner_metaobject_collection');
                if (christmas_banner_element) {
                    const christmas_banner_content = christmas_banner_element.innerHTML; // Use innerHTML for HTML content
                    // Append HTML content to productCard
                    productCard.innerHTML += christmas_banner_content;
                }
                target.append(productCard);
            }

        } catch (error) {
            console.error("Error adding: " + product.name);
            console.error("Error: " + error);
        }
    });
}

waitForNostoJs(async function() {
    const subsWrappers = document.querySelectorAll('.subs-collection-wrapper');
    subsWrappers.forEach(async (wrapper)=>{
        const id = wrapper.dataset.collid;
        const target = wrapper.querySelector(".subs-product-container");
        const prods = await getCollectionProducts(id);
        buildCollection(prods, target);
    })
    // const mensProducts = await getCollectionProducts(mensId);
    // const mensTarget = document.getElementById("mens-prods")
    // buildCollection(mensProducts, mensTarget);
    // const womensProducts = await getCollectionProducts(womensId);
    // const womensTarget = document.getElementById("womens-prods")
    
    // buildCollection(womensProducts, womensTarget);
})



const getCollectionProducts = (id) =>{
        return new Promise ((res, rej) =>{

            nostojs(api => {
                api.search({
                    products: {
                        fields: ["name", "price", "listPrice", "imageUrl", "url", "available", "tags1", "categories", "alternateImageUrls", "skus.id", "skus.name", "skus.availability", "skus.customFields.key", "skus.customFields.value", "customFields.key","customFields.value"],
                        size: 30,
                        categoryId: id,
                        facets: ['*']
                    },
                    keywords: { fields: ["keyword"] }
                },
                {
                    track: 'category',
                }).then(data => {
                    console.log("############")
                    let products = data.products.hits;
                    res(products)
                }).catch((err)=>{
                    rej(err)
                })
            })
        })
}
  function showCollectionQuickBuyPopup(product, view = "qb"){

  const currency = document.body.getAttribute("currency");

  let countryUrl = document.body.getAttribute("country-url");
  countryUrl = (countryUrl == "/")? "" :"";
  product.url = product.url.replace(/^https?:\/\/www\.myoddballs\.com/, "");
    
    
  // Construct view parameter with proper format
  const viewParam = `?view=${view}&currency=${currency}`;
  let url = countryUrl + product.url + viewParam;
    
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return response.text();
    })
    .then(data => {
      const loaders = document.querySelectorAll('.qb-loading');
      loaders.forEach(item =>{
        item.classList.remove("qb-loading");
      })
      const qbLoc = document.getElementById("default-quick-buy-content");
      qbLoc.innerHTML = data;
      const qbPopup = document.getElementById("default-quick-buy-popup-content");
      openPopup(qbPopup); 
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

  function titleLogic(product) {
    try {
        // Initial validation with detailed error
        if (!product) {
            return {
                cleanTitle: '',
                subTitle: '',
                onSale: false
            };
        }

        if (!product.name) {
            return {
                cleanTitle: '',
                subTitle: '',
                onSale: false
            };
        }

        let title = product.name;
        let cleanTitle = title;
        let subTitle = '';
        let onSale = false;

        try {
            // Safely check if product is on sale
            onSale = Boolean(product.compare_at_price > product.price);
        } catch (priceError) {
            onSale = false;
        }

        try {
            // Handle subscription products
            if (title.toLowerCase().includes("subscription") && !title.toLowerCase().includes("pre-paid") && false) {
                try {
                    let tags = Array.isArray(product.tags1) ? product.tags1 : [];
                    let temp = title.split("-");
                    
                    for (let each of temp) {
                        if (each && each.toLowerCase().includes("sock")) {
                            cleanTitle = each.replace("& Sock", "& free sock");
                        }
                    }

                    if (tags.includes('subscription_classic')) {
                        subTitle = 'Plain Monthly Subscription';
                    } else if (tags.includes('subscription-patterned')) {
                        subTitle = "Patterned Monthly Subscription";
                    }
                } catch (subscriptionError) {
                }
            }
            // Handle pre-paid products 
            else if (title.toLowerCase().includes("pre-paid")) {
                try {
                    let tags = Array.isArray(product.tags1) ? product.tags1 : [];
                    
                    if (tags.includes('subscription_classic')) {
                        subTitle = ' Plain Subscription';
                    } else if (tags.includes('subscription_adventurous')) {
                        subTitle = ' Patterned Subscription';
                    }

                    if (title.includes('06 Month Pre-Paid: ')) {
                        try {
                            cleanTitle = subTitle.replace('', '6 month pre-paid ');
                            title = title.replace('06 Month Pre-Paid: ', '')
                                .replace('CLASSIC Subscription - ', '')
                                .replace('[G2]', '')
                                .replace(' monthly subscription', '')
                                .toLowerCase();
                        } catch (sixMonthError) {
                        }
                    } else if (title.includes('12 Month Pre-Paid: ')) {
                        try {
                            cleanTitle = subTitle.replace('', '12 month pre-paid ');
                            title = title.replace('12 Month Pre-Paid: ', '')
                                .replace('CLASSIC Subscription - ', '')
                                .replace('[G2]', '')
                                .replace(' monthly subscription', '')
                                .toLowerCase();
                        } catch (twelveMonthError) {
                        }
                    }
                } catch (prePaidError) {
                }
            }
            // Handle regular products
            else {
                try {
                    if (cleanTitle && cleanTitle.includes('-')) {
                        let cleanTitleArr = cleanTitle.split(' - ');
                        let cleanTitleFirst = cleanTitleArr[0] + ' - ';
                        subTitle = cleanTitle.replace(cleanTitleFirst, '');
                        cleanTitle = cleanTitleFirst.replace(' - ', '');
                    }
                } catch (regularProductError) {
                }
            }
        } catch (mainLogicError) {
        }

        // Ensure clean return values
        return {
            cleanTitle: cleanTitle || '',
            subTitle: subTitle || '',
            onSale: Boolean(onSale)
        };

    } catch (globalError) {
        console.error('titleLogic: Critical error in title processing:', globalError);
        return {
            cleanTitle: product?.name || '',
            subTitle: '',
            onSale: false
        };
    }
}

function getShopifyProductHandle(url) {
    if (!url) {
        return null;
    }

    try {
        // Remove any query parameters
        const urlWithoutParams = url.split('?')[0];
        // Split by '/' and get the last segment
        const segments = urlWithoutParams.split('/');
        const handle = segments[segments.length - 1];
        return handle;
    } catch (error) {
        return null;
    }
}

 document.body.addEventListener('click', function(event) {
        if(event.target.closest('.coll-quick-add')){
      if(window.ThemeType == "B"){
        console.log("here1")
        // NEW SYSTEM: Use buildQb directly
        const wrapper = event.target.closest('.product-card');
        const prod = JSON.parse(wrapper.querySelector('.prod-info').value);
        // Prevent the old system from running by adding a flag
        wrapper.setAttribute('data-using-new-qb', 'true');
        console.log(prod)
        buildQb(prod);
      } else {
        console.log("here2")
        // OLD SYSTEM: Use existing showCollectionQuickBuyPopup
        const wrapper = event.target.closest('.product-card');
        // Check if new system is already running
        if(wrapper.getAttribute('data-using-new-qb') === 'true') {
          return; // Don't run old system if new one is active
        }
        event.target.closest(".quick-add-wrapper").classList.add("qb-loading");
        const prod = JSON.parse(wrapper.querySelector('.prod-info').value);
        showCollectionQuickBuyPopup(prod)
      }
    }
})
       
})()