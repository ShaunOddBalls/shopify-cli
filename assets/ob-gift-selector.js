const selectedOptions = {
    'department': 'mens',
    'category': '',
    'prodType': '',
    'size': '',
} 

const resultsDiv = document.getElementById("gs-results-div-inner");
const resultsTextDiv = document.getElementById("gs-results-text");
const desktopImg = document.getElementById("gs-desktop-image");
const desktopEmptyState = document.getElementById("gs-empty-state-image");
let desktopImageShown = true;

const selectedList = [];

function showResultsText(numberOfProducts){
  let activeTypeElement = document.querySelector('.gs-product-type-option.gs-active');
  let type = activeTypeElement ? activeTypeElement.getAttribute('data-type') : null;
  
  let activeSizeElement = document.querySelector('.gs-size-option.gs-active');
  let size = activeSizeElement ? activeSizeElement.innerText : null;
  
  document.getElementById('gs-results-text').innerHTML = "";
  document.getElementById('gs-results-text').innerHTML = `Showing <span class="text-magenta font-semibold">${numberOfProducts}</span> Results for <span class="text-magenta font-semibold uppercase">${ type }</span> in size <span class="text-magenta font-semibold uppercase">${ size }</span>`;

}

document.addEventListener('click', (event) => {

  if(event.target.closest('.gs-product-type-option') || event.target.closest("#gs-product-category") || event.target.closest("#gs-department-selection")){
    document.getElementById("gs-results-div-inner").innerHTML = "";
    resultsTextDiv.innerHTML = ""
    if(!event.target.closest("#gs-sizes") && !desktopImageShown){
      desktopEmptyState.classList.add("md:block");
      document.getElementById("gs-results-div").style.display = "none";
    }
  }

   if(event.target.closest("#gs-show-list")){
        showList()
      }
  
    if(event.target.closest('.gs-department-selector')){
      document.getElementById("gs-sizes").style.display = "none";
      document.getElementById("gs-product-type").style.display = "none";
        addButton.classList.add("gs-disabled");
        const productTypes = document.querySelectorAll(".gs-product-type");
        productTypes.forEach(productType => {
            productType.style.display = "none";
            productType.setAttribute('aria-hidden', 'true');
        });
        const categories = document.querySelectorAll(".gs-category");
        categories.forEach(category => {
            category.style.display = "none";
            category.setAttribute('aria-hidden', 'true');
        });
        const sizeContainers = document.querySelectorAll(".gs-size-container");
        sizeContainers.forEach(sizeContainer => {
            sizeContainer.style.display = "none";
            sizeContainer.setAttribute('aria-hidden', 'true');
        });
        const department = event.target.closest('.gs-department-selector').dataset.department;
        selectedOptions.department = department;
        const nextDivId = event.target.closest('.gs-department-selector').getAttribute('aria-controls');
        const departmentDiv = document.getElementById("gs-department-selection")
        departmentDiv.classList.remove("mens-active", "womens-active", "kids-active");
        const newClass = department + "-active"
        departmentDiv.classList.add(newClass);

      
        const previouslySelected = document.querySelector(".gs-product-category-selector.gs-active");
        if(previouslySelected){
          previouslySelected.classList.remove("gs-active");
        }
        
        const nextDivSelector = document.getElementById(nextDivId);
        fadeIn(nextDivSelector)
        nextDivSelector.setAttribute('aria-hidden', 'false');
    }
    if(event.target.closest('.gs-product-category-selector')){
      document.getElementById("gs-sizes").style.display = "none";
      fadeIn(document.getElementById("gs-product-type"));
      addButton.classList.add("gs-disabled");
        const productTypes = document.querySelectorAll(".gs-product-type");
        productTypes.forEach(productType => {
            productType.style.display = "none";
            productType.setAttribute('aria-hidden', 'true');
        });
        const sizeContainers = document.querySelectorAll(".gs-size-container");
        sizeContainers.forEach(sizeContainer => {
            sizeContainer.style.display = "none";
            sizeContainer.setAttribute('aria-hidden', 'true');
        });
        const category = event.target.closest('.gs-product-category-selector').dataset.category;
        selectedOptions.category = category;
        const nextDivId = event.target.closest('.gs-product-category-selector').getAttribute('aria-controls');
        const nextDivSelector = document.getElementById(nextDivId);
        const previouslySelected = document.querySelector(".gs-product-category-selector.gs-active");
        if(previouslySelected){
          previouslySelected.classList.remove("gs-active");
        }
        const previouslySelectedType = document.querySelector(".gs-product-type-option.gs-active");
        if(previouslySelectedType){
          previouslySelectedType.classList.remove("gs-active");
        }
       const previouslySelectedSize = document.querySelector(".gs-size-option.gs-active");
        if(previouslySelectedSize){
          previouslySelectedSize.classList.remove("gs-active");
        }
        event.target.closest('.gs-product-category-selector').classList.add("gs-active");
        fadeIn(nextDivSelector)
        nextDivSelector.setAttribute('aria-hidden', 'false');
    }
    if(event.target.closest('.gs-product-type-option')){
      fadeIn(document.getElementById("gs-sizes"));
        addButton.classList.add("gs-disabled");
        const type = event.target.closest('.gs-product-type-option').dataset.type;
        selectedOptions.prodType = type;
        const sizeContainers = document.querySelectorAll(".gs-size-container");
        sizeContainers.forEach(sizeContainer => {
            sizeContainer.style.display = "none";
            sizeContainer.setAttribute('aria-hidden', 'true');
        });
        const nextDivId = event.target.closest('.gs-product-type-option').getAttribute('aria-controls');
        const nextDivSelector = document.getElementById(nextDivId);
        const previouslySelected = document.querySelector(".gs-product-type-option.gs-active");
        if(previouslySelected){
          previouslySelected.classList.remove("gs-active");
        }
       const previouslySelectedSize = document.querySelector(".gs-size-option.gs-active");
        if(previouslySelectedSize){
          previouslySelectedSize.classList.remove("gs-active");
        }
        event.target.closest('.gs-product-type-option').classList.add("gs-active");
        fadeIn(nextDivSelector)
        nextDivSelector.setAttribute('aria-hidden', 'false');
    }


    if(event.target.closest('.gs-product')){
      const ele = event.target.closest('.gs-product');
      const prevSelected = document.querySelector(".gs-selected");
      if(prevSelected){
        prevSelected.classList.remove("gs-selected")
      }
      if (isFooterInViewport()) {
        addButtonWrapper.style.position = "absolute"
        
      } else {
        addButtonWrapper.style.position = "fixed"
      }
      addButton.classList.remove("gs-disabled");
      ele.classList.add("gs-selected");
      currentlySelected.name = ele.dataset.name;
      currentlySelected.price = ele.dataset.price;
      currentlySelected.varId = ele.dataset.varid;
      currentlySelected.prodId = ele.dataset.prodid;
      currentlySelected.compPrice = ele.dataset.compprice;
      currentlySelected.size = ele.dataset.size;
      currentlySelected.image = ele.querySelector("img").getAttribute("src");

      document.getElementById("gs-add-prod-to-list").click()
      
    }

  if(event.target.closest("#gs-add-prod-to-list")){
    selectedList.push({ ...currentlySelected });
    const prevSelected = document.querySelector(".gs-selected");
      if(prevSelected){
        prevSelected.classList.remove("gs-selected")
      }
    const previouslySelectedSize = document.querySelector(".gs-size-option.gs-active");
        if(previouslySelectedSize){
          previouslySelectedSize.classList.remove("gs-active");
        }
    
      addButton.classList.add("gs-disabled");
      showList();
  }

  
    if(event.target.closest('.gs-remove-gift')){
      const gift = event.target.closest(".gs-list-gift");
      const index = gift.dataset.index;
      removeGift(index);
      
      showList();
    }
    if(event.target.closest('#add-gift-list-to-cart')){
      addFormsToCart()
      // addToCartRecursive(0);
      document.querySelector("#add-gift-list-to-cart").classList.add("loading");
    }
  
    if(event.target.closest('.gs-size-option')){
        const size = event.target.closest('.gs-size-option').dataset.size;
        selectedOptions.size = size;
        const previouslySelected = document.querySelector(".gs-size-option.gs-active");
        if(previouslySelected){
          previouslySelected.classList.remove("gs-active");
        }
        event.target.closest('.gs-size-option').classList.add("gs-active");
        getProducts(selectedOptions);
        
    }
});

function removeGift(index) {
  if (index >= 0 && index <= selectedList.length) {
    const removedItems = selectedList.splice(index, 1);
    console.log('Removed item:', removedItems[0]);
  } else {
    console.log("Invalid index");
  }
}

  const currentlySelected = {
    "name":"",
    "price":"",
    "varId": ""
  }

const tagToSize = new Map([
  ["size-3xl", "3XL"],
  ["size-2xl", "2XL"],
  ["size-xl", "XL"],
  ["size-large", "large"],
  ["size-medium", "medium"],
  ["size-small", "small"],
  ["size-xs", "xs"],
  ["size-xxs", "xxs"],
  ["size-1-2", "1-2"],
  ["size-3-6", "3-6"],
  ["size-7-10", "7-10"],
  ["size-11-13", "11-13"],
  ["title-size-6", "Size 6"],
  ["title-size-8", "Size 8"],
  ["title-size-10", "Size 10"],
  ["title-size-12", "Size 12"],
  ["title-size-14", "Size 14"],
  ["title-size-16", "Size 16"],
  ["title-size-18", "Size 18"],
  ["title-size-20", "Size 20"],
  ["size-5-6-yrs", "5-6 Yrs"],
  ["size-6-7-yrs", "6-7 Yrs"],
  ["size-7-8-yrs", "7-8 Yrs"],
  ["size-9-10-yrs", "9-10 Yrs"],
  ["size-11-12-yrs", "11-12 Yrs"],
])

const showList = () => {
    const openGpPopupEvent = new CustomEvent('open-gp-popup');
    document.dispatchEvent(openGpPopupEvent);
    const listLoc = document.getElementById("gs-list-loc-content");
  listLoc.innerHTML = "";
  let totalPrice = 0;
  let compPrice = 0;
    selectedList.forEach((product, index) =>{
      const wrapper = document.createElement("div");
      const imgTextWrapper = document.createElement("div");
      const itemContentWrapepr = document.createElement("div");
      itemContentWrapepr.append(imgTextWrapper)
      imgTextWrapper.className="flex gap-2";
      wrapper.className="flex justify-between w-full px-0 gs-list-gift"
      const removeButton = document.createElement("div");
      removeButton.innerHTML = "X";
      removeButton.className = "text-red-500 gs-remove-gift cursor-pointer"
      const textDiv = document.createElement("div");
      const titleDiv = document.createElement("div");
      titleDiv.className = "text-sm";
      titleDiv.innerHTML = product.name;
      textDiv.append(titleDiv);
      const imgDiv = document.createElement("img");
      imgDiv.style.height="50px";
      imgDiv.style.width="50px";
      imgDiv.setAttribute("width", "50px");
      imgDiv.setAttribute("height", "50px");
      imgDiv.setAttribute("src",product.image);
      imgTextWrapper.append(imgDiv, textDiv);
      const priceWrapper = document.createElement("div");
      priceWrapper.className = "flex gap-2";
      const priceDiv = document.createElement("div");
      priceDiv.className = "text-magenta-500";
      priceDiv.innerHTML = "£" + parseFloat(product.price).toFixed(2);
      const compPriceDiv = document.createElement("del");
      compPriceDiv.innerHTML = "£" + parseFloat(product.compPrice).toFixed(2);
      priceWrapper.append(priceDiv);
      if(parseFloat(product.compPrice)!=parseFloat(product.price) ){
        priceWrapper.append(compPriceDiv);
      }
      const sizeDiv = document.createElement("div");
      sizeDiv.innerHTML = product.size;
      textDiv.append(sizeDiv);
      textDiv.append(priceWrapper);
      wrapper.append(itemContentWrapepr);
      wrapper.setAttribute("data-varid", product.varId);
      wrapper.setAttribute("data-varid", product.varId);
      wrapper.setAttribute("data-index", index);
      wrapper.append(removeButton)
      listLoc.append(wrapper);
      totalPrice += parseFloat(product.price);
      compPrice += parseFloat(product.compPrice);
      const form = document.createElement('form');
      form.method = 'post';
      form.action = '/cart/add';
      form.id = `product-form-${product.prodId}`;
      form.acceptCharset = 'UTF-8';
      form.classList.add('flex', 'h-full', 'flex-col', 'border-t', 'bg-white', 'product-form', "hidden");
      form.enctype = 'multipart/form-data';
      form.setAttribute('data-product-id', product.prodId);
      form.setAttribute('novalidate', 'novalidate');
      form.setAttribute('data-type', 'add-to-cart-form');
      const hiddenInputs = [
          { name: 'form_type', value: 'product' },
          { name: 'utf8', value: '✓' },
          { name: 'id', value: product.varId, class: 'product-selected-variant-id', 'data-product-id': product.prodId },
          { name: 'quantity', value: '1', class: 'product__quantity', id: 'qty-template--16162885926973__main' },
          { name: 'attributes[_freeshp]', value: '' },
          { name: 'product-id', value: product.prodId },
          { name: '_christmas-gift-guide', value: product.prodId }
      ];
      hiddenInputs.forEach(inputData => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = inputData.name;
          input.value = inputData.value;
          if (inputData.class) input.classList.add(inputData.class);
          if (inputData.id) input.id = inputData.id;
          if (inputData['data-product-id']) input.setAttribute('data-product-id', inputData['data-product-id']);
          
          form.appendChild(input);
      });
        const atcButton = document.createElement('button');
        atcButton.type = 'submit';
        atcButton.classList.add('add-to-cart-button', 'hidden');
        form.appendChild(atcButton);
        const prodData = document.createElement('input');
        prodData.classList.add("js-prod-data")
        prodData.value = JSON.stringify(product);
        prodData.setAttribute("type", "hidden");
        prodData.id = "product-json-" + product.prodId;
        form.append(prodData);
        wrapper.append(form);
        form.addEventListener('submit', function(event) {
            event.preventDefault();
        });
      })
      if (selectedList.length === 0) {
        document.getElementById("gs-show-list").classList.add("gs-disabled");
      } else {
        document.getElementById("gs-show-list").classList.remove("gs-disabled");
      }

      document.getElementById("gs-comp-price").innerHTML = "£" + parseFloat(compPrice).toFixed(2);
      document.getElementById("gs-total-price").innerHTML = "£" +  parseFloat(totalPrice).toFixed(2);
}


const getProducts = (options) => {
  if(desktopImg){
    desktopImg.classList.remove("md:block");
    desktopEmptyState.classList.remove("md:block");
    desktopImageShown = false;
  }
  document.getElementById("gs-results-div").style.display = "";
  document.getElementById("gs-add-to-list").style.display = "";
  resultsDiv.innerHTML = "";

  for(let i=0; i<12; i++){
    const Loader = document.createElement("div");
    Loader.className="w-full h-full animate-mt";
    Loader.style.paddingTop = "100%";
    resultsDiv.append(Loader)
  }
    let collId = getCollId(options);
  const filter = [{"field": "tags1",
                  "value":[options.size] }]
    nostojs(api => {
        api.search({
            products: {
                fields: ["name", "price", "listPrice", "imageUrl", "url", "available", "tags1", "categories", "alternateImageUrls", "skus.id", "skus.name", "skus.availability", "skus.customFields.key", "skus.customFields.value", "customFields.key","customFields.value"],
                size: 30,
                categoryId: collId,
                facets: ['*'],
                filter: filter
            },
            keywords: { fields: ["keyword"] }
        }).then(data => {
          let temp = data.products.hits;
          let products = temp.map((item) =>{
            let tempVarId = item.skus.filter((sku) =>{
              if(sku.name.toLowerCase() == tagToSize.get(options.size).toLowerCase()){
              }
              return sku.name.toLowerCase() == tagToSize.get(options.size).toLowerCase();
            })
            if(tempVarId[0]){
              varId = tempVarId[0].id
            }
            return {"name": item.name, "varId":varId, "image":item.imageUrl, "price": item.price, "compPrice": item.listPrice, "size": tagToSize.get(options.size), "prodId":item.productId }
          })
          if(products.length <= 4){
            document.getElementById("gs-results-div").classList.add("items-center");
          }else{
            document.getElementById("gs-results-div").classList.remove("items-center");
          }
          addProdsToPage(products)
          showResultsText(products.length)
        })
    })
    
}
const addButtonWrapper = document.getElementById("gs-add-to-list");
const addButton = document.getElementById("gs-add-prod-to-list");



function isFooterInViewport() {
  const footer = document.getElementById('gs-bottom-line');
  const rect = footer.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right > 0
  );
}






window.addEventListener('scroll', () => {
  if (isFooterInViewport()) {
    addButtonWrapper.style.position = "absolute"
    
  } else {
    addButtonWrapper.style.position = "fixed"
  }
});



   async function addFormsToCart(index) {
          const forms = document.querySelectorAll('.gs-list-gift .product-form');
          for (let form of forms) {
              const addToCartButton = form.querySelector('.add-to-cart-button');
              addToCartButton.click();
              await gsAddToCart(form, form.querySelector('.product-selected-variant-id').value);
          }
    }
    function addToCartRecursive(index) {
            if (index >= selectedList.length) {
              document.querySelector("#add-gift-list-to-cart").classList.remove("loading");
              $('#add-match-to-cart').html("Add To Cart")
              $('body').trigger('refreshDrawer');        
              updateCart()
              return;
            }
            
            var variant_id = selectedList[index].varId;
            var data = {
                quantity: 1,
                id: variant_id,
                properties: {}
                }
            $.ajax({
                type: 'POST',
                url: '/cart/add.js',
                data: data,
                dataType: 'json',
                success: function(response) {
                  if(selectedList[index]){
                        atc_track(selectedList[index].varId);
                  }
                    addToCartRecursive(index + 1);
                },
                error: function(error) {
                    console.error('Error adding product to cart:', error);
                    addToCartRecursive(index + 1);
                },
            });
        }

const sorryDiv = document.createElement("div");
sorryDiv.className = "col-span-3 md:col-span-4 w-full h-full text-center flex items-center justify-center text-lg text-center md:text-xl"
sorryDiv.innerHTML = "Sorry, we're all sold out of that";

let addToPageInterval;
const addProdsToPage = (products) => {
 
  clearInterval(addToPageInterval);
  resultsDiv.innerHTML = "";
  resultsTextDiv.innerHTML = ""
  
   if(products.length == 0){
      resultsDiv.innerHTML = sorryDiv.outerHTML
      resultsTextDiv.innerHTML = ""
    }
  
   setTimeout(function(){
        if (isFooterInViewport()) {
      addButtonWrapper.style.position = "absolute"
      
    } else {
      addButtonWrapper.style.position = "fixed"
    }
  }, 1)
  let i = 0;
   if (i >= products.length) {
    clearInterval(addToPageInterval); 
    return;
  }
  let product = products[i];
  const prodWrapper = document.createElement("div");
  prodWrapper.className = "gs-product rounded-md h-min";
  const prodImg = document.createElement("img");
  prodImg.src = product.image.replace(".png","_200x.png");
  prodImg.height = "200";
  prodImg.width = "200";
  prodWrapper.append(prodImg);
  prodWrapper.setAttribute("data-product", product);
  prodWrapper.setAttribute("data-name", product.name);
  prodWrapper.setAttribute("data-varId", product.varId);
  prodWrapper.setAttribute("data-price", product.price);
  prodWrapper.setAttribute("data-compPrice", product.compPrice);
  prodWrapper.setAttribute("data-size", product.size);
  prodWrapper.setAttribute("data-prodid", product.prodId);
  prodWrapper.style.opacity = 0;
  resultsDiv.append(prodWrapper);
  setTimeout(() => {
    prodWrapper.style.transition = "opacity 0.5s";
    prodWrapper.style.opacity = 1;
  }, 0);
  
  i ++
  addToPageInterval = setInterval(() =>{
     if (i >= products.length) {
       setTimeout(function(){
          if (isFooterInViewport()) {
        addButtonWrapper.style.position = "absolute"
        
      } else {
        addButtonWrapper.style.position = "fixed"
      }
    }, 1)
      clearInterval(addToPageInterval); 
      return;
    }
    let product = products[i];
    const prodWrapper = document.createElement("div");
    prodWrapper.className = "gs-product rounded-md h-min flex justify-center items-center";
    const prodImg = document.createElement("img");
    prodImg.height = "200";
    prodImg.width = "200";
    prodImg.src = product.image.replace(".png","_200x.png");
    prodWrapper.append(prodImg);
    prodWrapper.setAttribute("data-product", product);
    prodWrapper.setAttribute("data-name", product.name);
    prodWrapper.setAttribute("data-varId", product.varId);
    prodWrapper.setAttribute("data-price", product.price);
    prodWrapper.setAttribute("data-compPrice", product.compPrice);
    prodWrapper.setAttribute("data-size", product.size);
    prodWrapper.setAttribute("data-prodid", product.prodId);
    prodWrapper.style.opacity = 0;
    resultsDiv.append(prodWrapper);
    setTimeout(() => {
      prodWrapper.style.transition = "opacity 0.5s";
      prodWrapper.style.opacity = 1;
    }, 0);
    
    i ++
  }, 50)
  // products.forEach((product) =>{
  //   const prodWrapper = document.createElement("div");
  //   prodWrapper.className = "gs-product rounded-md";
  //   const prodImg = document.createElement("img");
  //   prodImg.src = product.image;
  //   prodWrapper.append(prodImg);
  //   prodWrapper.setAttribute("data-product", product);
  //   prodWrapper.setAttribute("data-name", product.name);
  //   prodWrapper.setAttribute("data-varId", product.varId);
  //   prodWrapper.setAttribute("data-price", product.price);
  //   resultsDiv.append(prodWrapper);
  // })

}

getCollId = (options) => {
    if(options.category == "goolies"){
        collId = "278858006589";
    }else if(options.prodType == "short"){
        if(options.department == "mens"){
            collId = "286326259773";
        }else if(options.department == "womens"){
            collId = "286326325309";
        }else if(options.department == "kids"){
            collId = "286326423613";
        }

    }else if(options.prodType == "long"){
      if(options.department == "mens"){
            collId = "286326063165";
        }else if(options.department == "womens"){
            collId = "286326292541";
        }else if(options.department == "kids"){
            collId = "286326358077";
        }
    }
    else if(options.prodType == "ankle"){
        collId = "136953397309";
    }else if (options.prodType == "full"){
        collId = "284148006973";
    }else if (options.prodType == "bamboo-boxers"){
      collId = "278858170429";
    }
    else if (options.prodType == "boxers"){
        if(options.department == "mens"){
            collId = "278855811133";
        }else if(options.department == "womens"){
            collId = "278856073277";
        }
    }else if(options.prodType == "briefs"){
        if(options.department == "mens"){
            collId = "278857777213";
        }else if(options.department == "womens"){
            collId = "278857809981";
        }
    }else if(options.prodType == "seamless"){
        collId = "278858072125";
    }else if(options.prodType == "full-seamless"){
        collId = "283779432509";
    }else if(options.prodType == "bralettes"){
        collId = "278857941053";
    }
    return(collId)
}

function fadeIn(element, duration = 300, display = "") {
  if (!element) return;

  element.style.opacity = 0; // Start with 0 opacity
  element.style.display = display; // Set the display property
  let start = null;

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;

    const opacity = Math.min(progress / duration, 1);
    element.style.opacity = opacity;

    if (progress < duration) {
      requestAnimationFrame(step); // Continue animation
    }
  };

  requestAnimationFrame(step);
}
function fadeOut(element, duration = 300, display = "") {
  if (!element) return;

  element.style.opacity = 100; // Start with 0 opacity
  element.style.display = display; // Set the display property
  let start = null;

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;

    const opacity = Math.max(progress / duration, 0);
    element.style.opacity = opacity;

    if (progress < duration) {
      requestAnimationFrame(step); // Continue animation
    }
  };

  requestAnimationFrame(step);
}







/** snow **/
let snowflakesCount = 400;

// let baseCss = ``; // Put your custom base css here

if (typeof total !== 'undefined'){
    snowflakesCount = total;
}

let bodyHeightPx = document.body.offsetHeight;
let pageHeightVH = (100 * bodyHeightPx / window.innerHeight);

// This function allows you to turn on and off the snow
function toggleSnow() {
    let checkBox = document.getElementById("toggleSnow");
    if (checkBox.checked == true) {
        document.getElementById('snow').style.display = "block";
    }
    else {
        document.getElementById('snow').style.display = "none";
    }
}

// Creating snowflakes
function spawnSnow(snowDensity = 200) {
    snowDensity -= 1;

    for (let x = 0; x < snowDensity; x++) {
        let board = document.createElement('div');
        board.className = "snowflake";

        document.getElementById('snow').appendChild(board);
    }
}

// Append style for each snowflake to the head
function addCss(rule) {
    let css = document.createElement('style');
    css.type = 'text/css';
    css.appendChild(document.createTextNode(rule)); // Support for the rest
    document.getElementsByTagName("head")[0].appendChild(css);
}

// Math
function randomInt(value = 100){
    return Math.floor(Math.random() * value) + 1;
}

function randomRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function spawnSnowCSS(snowDensity = 200){
    let snowflakeName = "snowflake";
    let rule = ``;
    if (typeof baseCss !== 'undefined'){
        rule = baseCss;
    }
    
    for(let i = 1; i < snowDensity; i++){
        let randomX = Math.random() * 100; // vw
        let randomOffset = randomRange(-100000, 100000) * 0.0001; // vw;
        let randomXEnd = randomX + randomOffset;
        let randomXEndYoyo = randomX + (randomOffset / 2);
        let randomYoyoTime = randomRange(30000, 80000) / 100000;
        let randomYoyoY = randomYoyoTime * pageHeightVH; // vh
        let randomScale = Math.random();
        let fallDuration = randomRange(10, pageHeightVH / 10 * 3); // s
        let fallDelay = randomInt(pageHeightVH / 10 * 3) * -1; // s
        let opacity = Math.random();

        rule += `
        .${snowflakeName}:nth-child(${i}) {
            opacity: ${opacity};
            transform: translate(${randomX}vw, -10px) scale(${randomScale});
            animation: fall-${i} ${fallDuration}s ${fallDelay}s linear infinite;
        }

        @keyframes fall-${i} {
            ${randomYoyoTime*100}% {
                transform: translate(${randomXEnd}vw, ${randomYoyoY}vh) scale(${randomScale});
            }

            to {
                transform: translate(${randomXEndYoyo}vw, ${pageHeightVH}vh) scale(${randomScale});
            }
            
        }
        `
    }
    addCss(rule);
}

window.onload = function() {
    spawnSnowCSS(snowflakesCount);
    spawnSnow(snowflakesCount);
};

function gsAddToCart(form, currentVariant) {
    return new Promise((resolve, reject) => {
        const productData = JSON.parse(form.querySelector('.js-prod-data').value);
        console.log('Adding to cart, current variant:', currentVariant);
        const formData = new FormData(form);
        const dataString = new URLSearchParams(formData).toString();
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

            resolve(cartItem); // Resolve the promise when item is successfully added
        })
        .catch(error => {
            console.error('ATC: Error adding to cart:', error);
            reject(error); // Reject the promise if there's an error
        });
    });
}



