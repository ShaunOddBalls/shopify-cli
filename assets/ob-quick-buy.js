document.addEventListener("DOMContentLoaded", function() {

  async function get_labels() {
  const countryUrl = document.body.getAttribute("country-url");
  const url = countryUrl ? `https://www.myoddballs.com${countryUrl}/pages/perfect-pair?view=labels` : "https://www.myoddballs.com/pages/perfect-pair?view=labels";
  
  const data12 = await fetch(url);
  const html = await data12.text();

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
let tempLabels = []
  const inputs = doc.querySelectorAll("input.tag");
  inputs.forEach(input => {
    tempLabels.push(JSON.parse(input.value));
  });
  labelList = tempLabels;
  return tempLabels;
}

  
  let labelList = get_labels();

  function generateProductLabel(data) {
        let available = data.available;
        let prod_price = data.featured_image? data.price/100 : data.price;
        let comp_price = data.listPrice || data.compare_at_price_min/100;
        const current_title = data.name || data.title;
        const tags = data.tags1 || data.tags;
      
        let label_found = false;
        let savings = 0;
      
        for (const label of labelList) {
          let proceed = false

          if(label.theme_version == "B"){
            proceed = true;
          }

          if(label && proceed){
            let  labelMatch = label.tag_match;
            let  bgColor = label.bg_color;
            let  textColor = label.text_color;
            let  labelText = label.text;
            let  labelBorder = label.outline_color
            let countryUrl = document.body.getAttribute("country-url");
            const labelDisplay = label.show_hide_class
            if (!Array.isArray(tags)) continue;
            for (const tag of tags) {
              if (tag === labelMatch && !label_found) {
                if (tag === "label-sale-percent-discount") {
                  if (parseFloat(comp_price) > parseFloat(prod_price)) {
                    label_found = true;
                    savings = ((comp_price - prod_price) / comp_price * 100).toFixed(2);
                    return `<span class="${labelDisplay} top-2 right-2 rounded px-1.5 py-1 font-display text-xs lg:!text-md  font-bold uppercase rounded-md" style="z-index:12; background-color: ${bgColor}; color:${textColor}; border: 2px solid ${labelBorder}; box-shadow: 1px 1px 1px rgb(0 0 0 / 30%);">${Math.round(savings)}${translations.collections.percent_saving}</span>`;
                  }
                } else if (tag === "label-sale-value-discount") {
                  if (parseFloat(comp_price) > parseFloat(prod_price)) {
                    label_found = true;
                    savings = comp_price - prod_price;
                    if (savings % 1 !== 0) {
                        savings = savings.toFixed(2); // Format to 2 decimal places
                    }
                    return `<span class="${labelDisplay} top-2 right-2 rounded px-1.5 py-1 font-display text-xs lg:!text-md  font-bold uppercase rounded-md" style="z-index:12; background-color: ${bgColor}; color:${textColor}; border: 2px solid ${labelBorder}; box-shadow: 1px 1px 1px rgb(0 0 0 / 30%);">Save ${currencySymbol}${savings}</span>`;//1234
                  }
                } else {
                  // default label handling
                  label_found = true;
                  return `<span class="${labelDisplay} top-2 right-2 rounded px-1.5 py-1 font-display text-xs lg:!text-md font-bold uppercase rounded-md" style="z-index:12; background-color: ${bgColor}; color:${textColor}; border: 2px solid ${labelBorder}; box-shadow: 1px 1px 1px rgb(0 0 0 / 30%);">${labelText}</span>`;
                }
              }
            }
          }
        }
        return null; 
      }


  const checkVariants = () => {
    let variantMissing = false;
    $ob(".qb-product-variants").each((index, wrapper) => {
      if(!variantMissing){
        if($ob(wrapper).find("input:checked").length === 0){
          const wrapperName = wrapper.dataset.optionname;
          $ob("#qb-atc-button").text("Please Select " + wrapperName).css('pointer-events', "none");
          variantMissing = true;
        }
      }
    });
    if(!variantMissing){
      $ob("#qb-atc-button").text("Add To Basket").css('pointer-events', "all");
    }
  }
  
  const addQbPrintSelectors = async (prod) =>{ 
      $ob("#qb-pattern-selector").removeClass("hidden").html("");
  
    for(let i = 0; i<10; i++){
      $ob("#qb-pattern-selector").append(`<div class="h-14 w-14 rounded-full animate-mt py-2"></div>`);
    }
    const tags = prod.tags1? prod.tags1 : prod.tags;
    const title = prod.title? prod.title : prod.name;
    const imageUrl = prod.featured_image ? prod.featured_image : prod.imageUrl;
    const prodPrice = prod.featured_image? prod.price/100 : prod.price;
    const compPrice= prod.listPrice? prod.listPrice : prod.compare_at_price/100;
    const prodVariants = prod.skus? prod.skus : prod.variants
    const prodHandle = prod.handle? prod.handle : prod.url.match(/\/products\/([^\/\?]+)/)?.[1] || ""
    const prodStyle = tags.find((tag) =>{
        return tag.includes("style-") && !tag.includes("feature-")
      }).replace("style-","")
      const printsUrl = `/search/?view=qb_design_list_by_style&q=${prodHandle}|${prodStyle}`
      const response = await fetch(printsUrl);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      const html = await response.text();
      if($ob("#qb-pattern-selector")){
        $ob("#qb-pattern-selector").html("");
        $ob("#qb-pattern-selector").html(html);
      }
  } 
  
  
  const initialiseQbSlider = (totalSlides) =>{
    const container = document.querySelectorAll('#default-quick-buy-image')[0];
    const outerWrapper = document.querySelectorAll("#qb-image-outer-wrapper")[0];
  
    $ob('#qb-image-outer-wrapper').on('dragstart', e => e.preventDefault());
    
    let thumbnails = Array.from(outerWrapper.querySelectorAll(".product-thumbnail"));
    if(totalSlides > 7){
      $ob("#qb-image-outer-wrapper .product-thumbnails").css("justify-content", "start");
    }else{
      $ob("#qb-image-outer-wrapper .product-thumbnails").css("justify-content", "center");
    }
    let screenWidth = 178;
    const SWIPE_THRESHOLD = 50;
  
    if (!$ob('#default-quick-buy-image')) return;
  
    if(!thumbnails) return
    let currentIndex = totalSlides;
    
    let touchStartX = 0;
    let touchEndX = 0;
    $ob('#default-quick-buy-image').css("overflow-x", 'hidden');
    $ob('#default-quick-buy-image').css("touch-action", 'pan-y'); 
  
    const goToSlide = (index, isSmooth = true, repo=false) => {
      currentIndex = index;
     if(index < totalSlides && !repo){
       currentIndex = ((totalSlides * 2))
       goToSlide(currentIndex, false, true)
       currentIndex = (totalSlides * 2) -1
     }
     if(index >= totalSlides*2&& !repo){
       currentIndex = ((totalSlides -1))
       goToSlide(currentIndex, false,true)
       currentIndex = (totalSlides) 
     }
      container.scrollTo({
        left: currentIndex * screenWidth,
        behavior: isSmooth? 'smooth' : 'instant'
      });
      const prevThumb = thumbnails.find((thumb) =>
        thumb.classList.contains("active-thumb")
      );
      if (prevThumb) {
        prevThumb.classList.remove("active-thumb");
      }
      const toHighlight = currentIndex + 1 - totalSlides 
  
      const currentThumb = thumbnails.find(
        (thumb) => thumb.dataset.slideindex == toHighlight
      );
      if (currentThumb) {
        currentThumb.classList.add("active-thumb");
      }
    };
  
    $ob('#default-quick-buy-image').on('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchEndX = touchStartX
    });
  
    $ob('#default-quick-buy-image').on('touchmove', (e) => {
      touchEndX = e.touches[0].clientX;
    });
  
    $ob('#default-quick-buy-image').on('touchend', () => {
      const deltaX = touchEndX - touchStartX;
      if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
        if (deltaX < 0 ) {
          goToSlide(currentIndex + 1);
        } else if (deltaX > 0) {
          goToSlide(currentIndex - 1);
        }
      }
      touchStartX = 0;
      touchEndX = 0;
    });
  
    $ob('#default-quick-buy-image').on('mousedown', (e) => {
    touchStartX = e.clientX; 
      touchEndX = touchStartX; 
  });
  
  $ob('#default-quick-buy-image').on('mousemove', (e) => {
      if (e.buttons === 1) { 
          touchEndX = e.clientX; 
      }
  });
  
  $ob('#default-quick-buy-image').on('mouseup', () => {
      const deltaX = touchEndX - touchStartX;
  
      if (Math.abs(deltaX) > SWIPE_THRESHOLD) {
          if (deltaX < 0 ) {
              goToSlide(currentIndex + 1);
          } else if (deltaX > 0) {
              goToSlide(currentIndex - 1);
          }
      }
      touchStartX = 0;
      touchEndX = 0;
  });
  
    window.addEventListener('resize', () => {
      screenWidth = window.innerWidth;
      goToSlide(currentIndex);
    }); 
  
    setTimeout(()=>{
    goToSlide(currentIndex, false, true);
      
    },100)
  
      const observer = new MutationObserver(() => {
      resetSlider();
    });
  
    observer.observe(container, { childList: true, subtree: true });
  
    function resetSlider() {
  
      totalSlides = outerWrapper.querySelectorAll(".product-thumbnail").length;
      thumbnails = Array.from(outerWrapper.querySelectorAll(".product-thumbnail"));
        thumbnails.forEach((thumbnail) =>{
          thumbnail.addEventListener("click", ()=>{
            const newIndex = Number(thumbnail.dataset.slideindex) - 1;
               currentIndex = newIndex  + totalSlides
               goToSlide(currentIndex)
          })
        })
  
      if (currentIndex >= totalSlides) {
        currentIndex = totalSlides - 1; 
      }
      goToSlide(totalSlides , false, true);
    }
  }
  const addTag = async(prod, qbImageWrapper) =>{
    await labelList;
    const tag = generateProductLabel(prod);
    qbImageWrapper.innerHTML += tag 
  }

  
  window.buildQb = async (prod, isPrintSwap=false) =>{
    isPrintSwap = false
    const tags = prod.tags1? prod.tags1 : prod.tags;
    const title = prod.title? prod.title : prod.name;
    const imageUrl = prod.featured_image ? prod.featured_image : prod.imageUrl;
    const images = prod.images? prod.images : prod.alternateImageUrls
    const prodPrice = prod.featured_image? prod.price/100 : prod.price;
    const compPrice= prod.listPrice? prod.listPrice : prod.compare_at_price/100;
    const prodVariants = prod.skus? prod.skus : prod.variants
    const prodHandle = prod.handle? prod.handle : prod.url.match(/\/products\/([^\/\?]+)/)?.[1] || ""
    resetQb();
    if(!isPrintSwap){
      
      if(tags.some((item)=>{
        return item == "feature-design-selector"
      })){
        // $ob("#qb-pattern-selector").removeClass("hidden")
        // addQbPrintSelectors(prod)
        
      }else{
        $ob("#qb-pattern-selector").addClass("hidden")
      }
    }
    
    const qbProdInfo = document.getElementById("qb-prod-info");
    qbProdInfo.value = JSON.stringify(prod);
    
    const qbImageWrapper = document.getElementById("default-quick-buy-image");
    
    $ob('#default-quick-buy-image').on('dragstart', e => e.preventDefault()).removeClass("load-animate").html("");
    
    const thumbnailWrapper = document.querySelector("#qb-image-outer-wrapper .product-thumbnails");
    $ob("#qb-image-outer-wrapper .product-thumbnails").html("");
    images.forEach((image, index) =>{
      const eleWrapper = document.createElement("div");
      eleWrapper.classList.add("relative");
      eleWrapper.style.minHeight="168px"
      eleWrapper.style.minWidth="168px"
      eleWrapper.style.pointerEvents = "none";
      const padding = document.createElement("div");
      padding.style.paddingTop = "100%";
      padding.style.width="100%";
      const ele = document.createElement("img");
      eleWrapper.appendChild(ele);
      ele.className = "transition duration-100 ease-in-out opacity-100 rounded-sm aspect-square object-cover rounded-lg bg-gray-100 absolute top-0 left-0"
      ele.style.background = "#f3f4f6;"
      ele.draggable = false;
      ele.src = image.replace(".png","_400x.png").replace(".jpg","_400x.jpg");
      ele.style.minWidth = "168"
      ele.style.minHeight = "168"
      ele.width = "168"
      ele.height = "168"
      ele.style.userSelect = "none";
      ele.style.pointerEvents = "none"
      ele.addEventListener('dragstart', e => e.preventDefault());
      qbImageWrapper.appendChild(eleWrapper);
      const thumbnail = document.createElement("img");
      thumbnail.className = "product-thumbnail transition duration-100 ease-in-out opacity-100 rounded-sm aspect-square object-cover rounded-lg"
      thumbnail.setAttribute("data-slideindex", index + 1)
      thumbnail.src = image.replace(".png","_100x.png").replace(".jpg","_100x.jpg");
      thumbnail.width = "40"
      thumbnail.height = "40"
      thumbnailWrapper.appendChild(thumbnail);
    })
    for(let i =0; i <2; i++){
      images.forEach((image, index) =>{
        const eleWrapper = document.createElement("div");
        eleWrapper.style.pointerEvents = "none";
        eleWrapper.classList.add("relative");
        eleWrapper.style.minHeight="168px"
        eleWrapper.style.minWidth="168px"
        const padding = document.createElement("div");
        padding.style.paddingTop = "100%";
        padding.style.width="100%";
        const ele = document.createElement("img");
        ele.style.userSelect = "none";
        ele.style.pointerEvents = "none"
        ele.addEventListener('dragstart', e => e.preventDefault());
        eleWrapper.appendChild(ele);
        ele.className = "transition duration-100 ease-in-out opacity-100 rounded-sm aspect-square object-cover rounded-lg bg-gray-100 absolute top-0 left-0"
        ele.style.background = "#f3f4f6;"
        ele.draggable = false;
        ele.src = image.replace(".png","_400x.png").replace(".jpg","_400x.jpg");
        ele.style.minWidth = "168"
        ele.style.minHeight = "168"
        ele.width = "168"
        ele.height = "168"
        qbImageWrapper.appendChild(eleWrapper);
      })
    }
    initialiseQbSlider(images.length);
    addTag(prod, qbImageWrapper)
    $ob("#default-quick-buy-header-title").removeClass("load-animate").html(title.split("-")[0]);
    $ob("#default-quick-buy-header-sub-title").removeClass("load-animate").html(title.split("-")[1]);
    $ob("#default-quick-buy-prod-price").html($ob(document.body).attr('currency-symbol') + prodPrice.toFixed(2));
    
   
    if(compPrice == prodPrice){
      $ob("#default-quick-buy-comp-price").css('display', "none");
    }else{
      $ob("#default-quick-buy-comp-price").css('display' , 'block').html($ob(document.body).attr('currency-symbol') + compPrice.toFixed(2));
    }
  
    // Update size guide href with current product handle
    if ($ob('.js-quick-buy-size-guide-show') && prodHandle) {
      $ob('.js-quick-buy-size-guide-show').attr('href', prodHandle);
    }
  
    // Fetch selling plans and cart attributes from product page
    const fetchProductData = async () => {
      try {
        const response = await fetch(`/products/${prodHandle}?view=ob-qb-skellington-variables`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        
        // Create a temporary div to parse the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // Extract selling plans
        const sellingPlanSource = tempDiv.querySelector('#selling-plan-container');
        const sellingPlanTarget = document.getElementById('selling-plan-container');
        if (sellingPlanSource && sellingPlanTarget) {
          sellingPlanTarget.innerHTML = sellingPlanSource.innerHTML;
        }
        
        // Extract cart attributes
        const cartAttributesSource = tempDiv.querySelector('#cart-attributes-container');
        const cartAttributesTarget = document.getElementById('cart-attributes-container');
        if (cartAttributesSource && cartAttributesTarget) {
          cartAttributesTarget.innerHTML = cartAttributesSource.innerHTML;
        }
        
        // Extract gift card form
        const giftCardFormSource = tempDiv.querySelector('#gift-card-form-container');
        const giftCardFormTarget = document.getElementById('gift-card-form-container');
        if (giftCardFormSource && giftCardFormTarget) {
          giftCardFormTarget.innerHTML = giftCardFormSource.innerHTML;
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
    
    // Fetch the data
    fetchProductData();
  
    const variants = prodVariants;
    const options = variants[0].customFields?.filter((item)=>{
      return item.key != "skucode" && item.key != "gtin"  && !item.key.includes("custom") && !item.key.includes("harmonized_system_code");  
    }).map((item)=>{
      return item.key
    }) || prod.options;
    const prodOptions = []
    options.forEach((option, index) => {
      const optionName = `option${index + 1}`
      const optionSet = new Set();
      variants.forEach((variant) =>{
        const matchingOption = variant.customFields?.find((item)=>{
          return item.key == option 
        }).value || variant[optionName]
        optionSet.add(matchingOption)
      })
      prodOptions.push({
        "title": option,
        "values" : optionSet
      })
    })
  
    const variantsDiv = document.getElementById("qb-product-variants");
    prodOptions.forEach((option, index) => {
      // Create size title and guide for each option
        const sizeTitleDiv = document.createElement("div");
        sizeTitleDiv.className = "flex justify-between items-end my-2";
        
        const sizeLabel = document.createElement("div");
        sizeLabel.className = "typography typography--body-md capitalize";
        sizeLabel.innerHTML = option.title + ":";
        
        const sizeGuideDiv = document.createElement("div");
        // Set specific href for Sock Size, otherwise use current product
        const getSizeGuideHref = (optionTitle) => {
          switch (optionTitle) {
            case "Sock Size":
              return "random-bundle-6-pack-ankle-sock-bundle";
            default:
              return prodHandle;
          }
        };
        const sizeGuideHref = getSizeGuideHref(option.title);
        sizeGuideDiv.innerHTML = 
          `<div class="relative">
            <a class="js-quick-buy-size-guide-show cursor-hand flex items-start gap-x-1" href="${sizeGuideHref}">
              <svg class="circular-loader absolute h-5 -left-10 -top-1  md:-left-7 hidden" viewBox="25 25 50 50">
                <circle class="loader-path" stroke="#f00f83" cx="50" cy="50" r="20" fill="none" stroke-width="4"></circle>
              </svg>
              <div class="cursor-hand flex flex-col items-end typography typography--body-md capitalize mb-2">
                <span class="pr-2" style="text-align: right; line-height: 10px;">Size Guide</span>
              </div>
              <svg class="tape-svg -mt-0.5 md:-mt-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 157.21 100.22" style="enable-background:new 0 0 157.21 100.22;" xml:space="preserve">
                <style type="text/css">
                  .st0{fill:#EC008C;}
                </style>
                <g>
                  <path class="st0" d="M12.39,43.19v25.58c0,0,8.25,18.73,45.29,18.59c37.04-0.14,48.5-16.07,48.5-16.07l1.68-8.39   c0,0,22.92,10.62,36.48,7.13V44.86l-18.17-1.68l-17.89-5.59c0,0-14.26,21.51-51.58,19.35S12.39,43.19,12.39,43.19z"></path>
                  <g>
                    <path d="M59.77,45.78c11.91,0,20.89-4.67,20.89-10.87c0-6.2-8.98-10.87-20.89-10.87c-11.91,0-20.89,4.67-20.89,10.87    C38.88,41.11,47.86,45.78,59.77,45.78z M59.77,28.97c9.75,0,15.97,3.52,15.97,5.95c0,2.43-6.22,5.95-15.97,5.95    c-9.75,0-15.97-3.52-15.97-5.95C43.8,32.49,50.02,28.97,59.77,28.97z"></path>
                    <path d="M142.61,41.39c-24.83-0.36-31.69-6.19-32.89-7.44c-1.03-13.08-22.56-23.2-49.94-23.2c-28.06,0-50.04,10.61-50.04,24.16    V65.3c0,13.55,21.98,24.16,50.04,24.16c26.79,0,48.04-9.68,49.91-22.35c4.71,2.52,14.11,5.22,32.79,5.56    c1.39,0,2.58-0.48,3.54-1.41c0.95-0.93,1.48-2.18,1.48-3.51V46.31C147.48,43.63,145.3,41.43,142.61,41.39z M59.77,15.67    c26.99,0,45.12,9.95,45.12,19.24c0,5.71-6.86,11.65-18.38,15.4c-0.01,0-0.02,0.01-0.03,0.01c-7.24,2.35-16.3,3.84-26.71,3.84    c-26.99,0-45.12-9.95-45.12-19.25C14.65,25.62,32.78,15.67,59.77,15.67z M59.77,84.55c-26.99,0-45.12-9.95-45.12-19.24V45.47    c1.14,1.16,2.43,2.27,3.92,3.31v13.75c0,1.36,1.1,2.46,2.46,2.46c1.36,0,2.46-1.1,2.46-2.46V51.69c1.89,0.95,3.95,1.82,6.15,2.62    v8.36c0,1.36,1.1,2.46,2.46,2.46c1.36,0,2.46-1.1,2.46-2.46v-6.8c1.97,0.55,4.01,1.03,6.15,1.45v12.95c0,1.36,1.1,2.46,2.46,2.46    c1.36,0,2.46-1.1,2.46-2.46V58.12c2,0.27,4.05,0.48,6.15,0.64v7.79c0,1.36,1.1,2.46,2.46,2.46c1.36,0,2.46-1.1,2.46-2.46v-7.54    c1.02,0.03,2.04,0.07,3.07,0.07c1.04,0,2.05-0.04,3.07-0.07v12.49c0,1.36,1.1,2.46,2.46,2.46c1.36,0,2.46-1.1,2.46-2.46V58.76    c2.1-0.16,4.15-0.36,6.15-0.64v7.23c0,1.36,1.1,2.46,2.46,2.46c1.36,0,2.46-1.1,2.46-2.46v-8.04c2.14-0.41,4.18-0.9,6.15-1.45    v11.7c0,1.36,1.1,2.46,2.46,2.46c1.36,0,2.46-1.1,2.46-2.46V54.3c2.2-0.79,4.26-1.66,6.15-2.62v5.85c0,1.36,1.1,2.46,2.46,2.46    c1.36,0,2.46-1.1,2.46-2.46v-8.76c1.49-1.04,2.78-2.15,3.92-3.31V65.3C104.89,74.6,86.76,84.55,59.77,84.55z M109.81,40.08    c0.99,0.57,2.19,1.15,3.62,1.73v8.74c0,1.36,1.1,2.46,2.46,2.46c1.36,0,2.46-1.1,2.46-2.46v-7.11c1.64,0.45,3.48,0.87,5.53,1.24    v10.85c0,1.36,1.1,2.46,2.46,2.46c1.36,0,2.46-1.1,2.46-2.46V45.43c1.15,0.14,2.35,0.27,3.61,0.38v21.47    c-16.78-1.34-21.56-4.95-22.6-6.01V40.08z M142.56,67.76c-1.85-0.03-3.57-0.1-5.22-0.17V46.14c1.66,0.08,3.39,0.14,5.23,0.17    L142.56,67.76z"></path>
                  </g>
                </g>
              </svg>
            </a>
          </div>`
        ;
        
        sizeTitleDiv.appendChild(sizeLabel);
        sizeTitleDiv.appendChild(sizeGuideDiv);
        variantsDiv.appendChild(sizeTitleDiv);
      
      const titleDiv = document.createElement("div");
      titleDiv.className = "flex justify-between items-center w-full hidden";
      const textDiv = document.createElement("div");
      textDiv.className = "typography typography--body-md uppercase mb-2 font-semibold size-name"
      textDiv.innerHTML = option.title;
      titleDiv.appendChild(textDiv);
      variantsDiv.appendChild(titleDiv);
      
      const variantsWrapper = document.createElement("div");
      variantsWrapper.setAttribute("data-optionname", option.title);
      variantsWrapper.className = "qb-product-variants grid grid-cols-4 gap-3";
      
      option.values.forEach((value) => {
        const varDiv = createVariantElement(value, option.title, prod);
        variantsWrapper.appendChild(varDiv);
      });
      
      variantsDiv.appendChild(variantsWrapper);
    })
    checkVariants();
    const qbPopup = document.getElementById("default-quick-buy-popup-content");
    openPopup(qbPopup); 
    
  }
  
  const createVariantElement = (sizeName, option, prod) => {
    let optionAvailable = true;
  
      if (prod.skus?.length > 0) {
        optionAvailable = prod.skus.some((sku) => {
          const skuFirst = sku.name.split(" / ")[0]
          const skuSecond = sku.name.split(" / ")[1]
          return (sizeName == skuFirst || sizeName == skuSecond) && sku.availability === "InStock";
        });
      }
      
      if (optionAvailable && prod.variants?.length > 0) {
        optionAvailable = prod.variants.every((variant) => {
          return !variant.title.includes(sizeName) || variant.available;
        });
      }
    const wrapper = document.createElement("div");
    wrapper.className = "product-variant text-xs relative";
    if(!optionAvailable){
      wrapper.classList.add("variant-unavailable");
      wrapper.classList.add("klaviyo-bis-trigger");
    }
    wrapper.setAttribute("data-option-value", sizeName);
  
    const outOfStockMarker = document.createElement("div");
    outOfStockMarker.className = "out-of-stock-marker absolute z-10 ";
    outOfStockMarker.style.right = "5%";
    outOfStockMarker.style.bottom = "10%";
    outOfStockMarker.innerHTML = `
      <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" width="15" height="15" viewBox="0 0 24 24" stroke="#f00f83" xmlns="http://www.w3.org/2000/svg">
        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
      </svg>
    `;
  
    const label = document.createElement("label");
    label.className = "ooption-value qb-variant-option group relative flex items-center justify-center rounded-md border py-2 px-4 text-xs font-medium font-semibold uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 cursor-pointer bg-white text-gray-900 shadow-sm text-nowrap";
    label.setAttribute("data-active", "ring-2 ring-magenta");
  
    const input = document.createElement("input");
    input.type = "radio";
    input.name = option;
    input.value = sizeName;
    input.className = "peer sr-only";
    input.setAttribute("data-option-index", "0");
    input.setAttribute("data-option-value", sizeName);
  
    const styleSpan = document.createElement("span");
    styleSpan.className = "peer-checked:border-transparent items-center flex justify-center peer-checked:bg-magenta-500 peer-checked:text-white peer-checked:hover:bg-pink-700 peer-checked:ring-2 peer-checked:ring-magenta-500 peer-checked:ring-offset-2 border-transparent pointer-events-none absolute -inset-px rounded-md";
    styleSpan.setAttribute("aria-hidden", "true");
  
    const valueSpan = document.createElement("span");
    valueSpan.className = "option-value relative peer-checked:text-white";
  
    const del = document.createElement("del");
    del.className = "out-of-stock-marker";
    del.textContent = sizeName;
  
    const inStock = document.createElement("div");
    inStock.className = "in-stock-marker";
    inStock.textContent = sizeName;
  
    valueSpan.appendChild(del);
    valueSpan.appendChild(inStock);
  
    label.appendChild(input);
    label.appendChild(styleSpan);
    label.appendChild(valueSpan);
  
    wrapper.appendChild(outOfStockMarker);
    wrapper.appendChild(label);
  
    return wrapper;
  }
  const resetQb = () => {
    $ob("#qb-product-variants").html('');
  }
  
  // Stub for buildQb function - implement as needed
  const buildQb = (productData, isPrintSwap = false) => {
    // TODO: Implement the buildQb functionality
    // This function should rebuild the quick buy interface with new product data
  }
  
  
  const addQbToCart = (form, currentVariant, productData, sellingPlan=false) => {
    $ob('#qb-atc-button').html(`<div id="add-to-cart-loading" class="pointer-events-none w-full absolute flex justify-center loading-button-loader items-center h-full" ><svg style="height:20px!important;width:20px!important" class="loading-ele-outer" viewBox="25 25 50 50"><circle class="loading-ele-inner h-6 w-6" style="" cx="50" cy="50" r="20" fill="none" stroke-width="4"></circle></svg></div>`)
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
              if (response.ok) {
                  return response.json();
                } else {
                  return response.json().then((json) => {
                    throw new Error(json.description || 'Failed to add to cart');
                  });
              }
          })
          .then(cartItem => {
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
            console.error('ATC: Error adding to cart:', error);
            reject(error); // Reject the promise if there's an error
          });
        });
  }
  
  // Event handlers
  $ob(document).on("click", (e)=> {
    if(e.target.closest("#default-quick-buy-content .add-to-cart-button")){
      const formWrapper = e.target.closest("#default-quick-buy-content");
      const prodForm = formWrapper.querySelector("form");
      
      // Add error checking
      if (!prodForm) {
        console.error('Product form not found');
        return;
      }
      
      const nameInput = prodForm.querySelector('input[name="id"]');
      const qbProdInfo = prodForm.querySelector("#qb-prod-info");
      
      if (!qbProdInfo) {
        console.error('Product info not found');
        return;
      }
      
      const currentProdInfo = JSON.parse(qbProdInfo.value);
      const checkedInputs = Array.from(formWrapper.querySelectorAll('input:checked')).filter((item)=>{
        return !item.closest(".js-qb-print-swap") && !item.name.includes('properties[')
      });
      
      const checkedValues = checkedInputs.map((input) =>{
        return input.value
      });
      

      
      const chosenVariant = currentProdInfo.skus?.find((variant) =>{
        let toReturn = true;
        checkedValues.forEach((value)=>{
          if(!variant.name.toLowerCase().includes(value.toLowerCase())){
            toReturn = false;
          }
        })
        return toReturn;
      }) || currentProdInfo.variants?.find((variant) => {
        let allMatch = true;
        checkedValues.forEach((value, index) => {
          const optionName = `option${index + 1}`;
          if (variant[optionName] !== value) {
            allMatch = false;
          }
        });
        return allMatch;
      }) || currentProdInfo; // Add fallback to current product if no variant found
      
      
      if (!chosenVariant) {
        console.error('No variant found for checked values:', checkedValues);
        return;
      }
      
      const variantId = chosenVariant.id || chosenVariant.variant_id || currentProdInfo.id;
      
      if (!variantId) {
        console.error('No valid variant ID found');
        return;
      }
      
      nameInput.value = variantId;
      addQbToCart(prodForm, variantId, currentProdInfo);
      e.preventDefault();
    }
    
    if(e.target.closest(".qb-variant-option")){
      setTimeout(()=>{
        checkVariants();
      }, 1);
    }

    if(e.target.closest(".js-qb-print-swap")){
      const printWrapper = e.target.closest(".js-qb-print-swap");
      const newProd = JSON.parse(printWrapper.querySelector(".js-prod-json").innerHTML);
      buildQb(newProd, true);
    }
  });
});