window.ThemeType = "A"
let userFirtstSelect = false;
let mensProducts = [];
let womensProducts = [];
let kidsProducts = [];
let unfilteredData; 
let filteredData = [];
let filterDepartment = "department-mens";
let filterCategory = "";
let filterType = "";
let filterSize = "";
let prodtypes = [];
let sizes = [];
let screenSize = window.innerWidth;
let container = getContainer();
let newContainer;
let productTypeSwiper;
let sliderOn = true;
let circleLoader = `<div class="w-full h-full left-0 top-0 z-10 bg-white absolute flex justify-center items-center"><svg class="circular-loader" viewBox="25 25 50 50">
                    	<circle class="loader-path" stroke="#f00f83" cx="50" cy="50" r="20" fill="none" stroke-width="4"></circle>
                      </svg>
                      <g>
                      	<path class="st0" d="M12.39,43.19v25.58c0,0,8.25,18.73,45.29,18.59c37.04-0.14,48.5-16.07,48.5-16.07l1.68-8.39   c0,0,22.92,10.62,36.48,7.13V44.86l-18.17-1.68l-17.89-5.59c0,0-14.26,21.51-51.58,19.35S12.39,43.19,12.39,43.19z"></path>
                      	<g>
                      		<path d="M59.77,45.78c11.91,0,20.89-4.67,20.89-10.87c0-6.2-8.98-10.87-20.89-10.87c-11.91,0-20.89,4.67-20.89,10.87    C38.88,41.11,47.86,45.78,59.77,45.78z M59.77,28.97c9.75,0,15.97,3.52,15.97,5.95c0,2.43-6.22,5.95-15.97,5.95    c-9.75,0-15.97-3.52-15.97-5.95C43.8,32.49,50.02,28.97,59.77,28.97z"></path>
                      		<path d="M142.61,41.39c-24.83-0.36-31.69-6.19-32.89-7.44c-1.03-13.08-22.56-23.2-49.94-23.2c-28.06,0-50.04,10.61-50.04,24.16    V65.3c0,13.55,21.98,24.16,50.04,24.16c26.79,0,48.04-9.68,49.91-22.35c4.71,2.52,14.11,5.22,32.79,5.56    c1.39,0,2.58-0.48,3.54-1.41c0.95-0.93,1.48-2.18,1.48-3.51V46.31C147.48,43.63,145.3,41.43,142.61,41.39z"></path>
                      	</g>
                      </g>
                      </svg>
                    </div>`;

function getContainer() {
  return screenSize > 767 
    ? document.getElementById('desktop-results') 
    : document.getElementById('mobile-results');
}

window.addEventListener('resize', () => {
  screenSize = window.innerWidth;
  newContainer = getContainer();
  if (newContainer !== container) {
    applyFilters();
  }
});

function adjustMaxHeight() {
    // Select the element with the ID 'gs-inner-content'
    const element = document.querySelector('#gs-inner-content');

    if (element) {
        console.log('Adjusting max-height class...');

        // Get all current classes
        const currentClasses = Array.from(element.classList);

        // Remove any old or dynamically added max-height classes
        currentClasses.forEach(cls => {
            if (cls.startsWith('md:max-h-[')) {
                element.classList.remove(cls);
            }
        });

        // Calculate the new max-height
        const viewportHeight = window.innerHeight; // Full viewport height
        const elementTopOffset = element.getBoundingClientRect().top; // Distance from top of viewport
        const newMaxHeight = viewportHeight - elementTopOffset + 50; // Add extra 50px

        // Construct the new Tailwind class
        const newClass = `md:max-h-[${newMaxHeight}px]`;

        // Add the new class
        element.classList.add(newClass);
    }
}



function showLoader(element) {
  const loaderDiv = document.createElement('div');
  loaderDiv.id = 'circle-loader';
  loaderDiv.innerHTML = circleLoader;
  element.appendChild(loaderDiv);
}
                      
function hideLoader(element) {
  const loader = element.querySelector('#circle-loader');
  if (loader) {
    loader.remove();
  }
}

function handleNoResults() {
  document.querySelectorAll('.see-results').forEach(function(element) {
    element.classList.add('hidden');
  });
  document.getElementById('product-type-options').innerHTML = 'Sorry no results match';
}

function createSizeButtons(options) {
  const container = document.getElementById('gs-pants-size');
  container.innerHTML = '';

  // Add the heading
  const heading = document.createElement('h6');
  heading.className = 'text-md pb-1 px-2 font-semibold';
  heading.textContent = '4. What Size Are you looking for?';
  container.appendChild(heading);
  
  // Get the first product of this type to check its options
  const sampleProduct = filteredData.find(product => product.product_type === filterType);
  let sizeOptions = [];
  
  if (sampleProduct && sampleProduct.options) {
    // Find the size option
    const sizeOption = sampleProduct.options.find(opt => 
      opt.name.toLowerCase().includes('size')
    );
    
    if (sizeOption) {
      // Use the exact order from the product's options
      sizeOptions = [...sizeOption.values]; // Create a copy of the values array
    }
  }

  const optionContainer = document.createElement('div');
  optionContainer.className = 'mb-4';
  
  
  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'w-full grid-cols-4 grid gap-2 border border-solid rounded-md p-2 min-h-24w-full grid-cols-4 grid gap-2 border border-solid rounded-md p-2 min-h-24';

  // Use the original order from options.values
  sizeOptions.forEach(value => {
    const sizeAvailable = filteredData.some(product => 
      product.product_type === filterType &&
      product.variants.some(variant => 
        variant.option1 === value && variant.availableForSale
      )
    );

    const button = document.createElement('button');
    button.className = `gs-size-option relative flex items-center justify-center rounded-md border py-2 px-4 text-xs font-medium uppercase focus:outline-none cursor-pointer bg-white text-gray-900 shadow-sm ${!sizeAvailable ? 'disabled opacity-50' : ''}`;
    button.textContent = value;
    button.setAttribute('data-option', 'Size');
    button.setAttribute('data-value', value);

    // Add click event listener to each size button
    if (sizeAvailable) {
      button.addEventListener('click', function() {
        filterSize = value;
        
        // Update active state
        document.querySelectorAll('.gs-size-option').forEach(btn => {
          btn.classList.remove('active-selection');
        });
        this.classList.add('active-selection');

        updateFilteredResults();
      });
    }

    buttonGroup.appendChild(button);
  });
  
  optionContainer.appendChild(buttonGroup);
  container.appendChild(optionContainer);
  container.classList.remove('hidden');
  adjustMaxHeight()
}


function createProductTypeButtons(productTypes) {
  const container = document.getElementById('product-type-options');
  if (!container) {
    console.error('Product type options container not found');
    return;
  }

  let wrapper = container.querySelector('.swiper-wrapper');
  if (!wrapper) {
      wrapper = document.createElement('div');
  }

  wrapper.className = (sliderOn)? 'swiper-wrapper' : 'grid grid-cols-3 gap-2';
  
  container.appendChild(wrapper);
  
  wrapper.innerHTML = ''; 
    
  productTypes.forEach(type => {
    const slide = document.createElement('div');

     const button = document.createElement('button');
    if(sliderOn) {
      slide.className = 'swiper-slide';
       button.className = 'gs-product-type-option py-2 px-4 relative flex items-center justify-center rounded-md border  text-xs md:text-xs py-1 font-medium uppercase focus:outline-none cursor-pointer bg-white text-gray-900 shadow-sm';
    }else{
      slide.className = 'w-full h-full'
       button.className = 'gs-product-type-option w-full h-full relative flex items-center justify-center rounded-md border  text-xs md:text-xs py-1 font-medium uppercase focus:outline-none cursor-pointer bg-white text-gray-900 shadow-sm';
    }
   
   
    button.textContent = type;
    button.setAttribute('data-type', type);
    
    button.addEventListener('click', () => handleTypeButtonClick(button));
    
    if (type === filterType) {
      button.classList.add('active-selection');
    }
    
    slide.appendChild(button);
    wrapper.appendChild(slide);
  });

  // Make sure pagination exists
  if (!container.querySelector('.swiper-pagination')) {
    const pagination = document.createElement('div');
    pagination.className = 'swiper-pagination';
    container.appendChild(pagination);
  }

  // Initialize Swiper after adding slides
  if(sliderOn){initializeProductTypeSwiper()};
}

function initializeProductTypeSwiper() {
  // Destroy existing swiper if it exists
  if (productTypeSwiper) {
    productTypeSwiper.destroy(true, true);
  }

  const container = document.getElementById('product-type-options');
  if (!container) {
    console.error('Product type options container not found');
    return;
  }

  // Initialize new swiper
  productTypeSwiper = new Swiper('#product-type-options', {
    slidesPerView: 'auto',
    direction: 'horizontal',
    spaceBetween: 10,
    mousewheel: true,
     grabCursor: true,
     simulateTouch: true,
     touchStartPreventDefault: false,
     touchStartForcePreventDefault: false,
     touchMoveStopPropagation: true,
     shortSwipes: true,
     resistance: false,

    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
      clickable: true,
    },
  });
}


function handleTypeButtonClick(typeButton) {
  // Update active state first
  document.querySelectorAll('.gs-product-type-option').forEach(btn => btn.classList.remove('active-selection'));
  typeButton.classList.add('active-selection');

  // Set new filter type
  filterType = typeButton.getAttribute('data-type');
  filterSize = ""; // Reset size filter

  // Update filtered results BEFORE creating size buttons
  updateFilteredResults();

  // Now get available sizes from the updated filtered data
  const sizes = getAvailableSizes(filterType);

  if (sizes.length > 0) {
    createSizeButtons([{ name: 'Size', values: sizes }]);
  } else {
    document.getElementById('gs-pants-size').innerHTML = "";
  }
}

function getAvailableSizes(filterType) {
  const sizes = [];
  filteredData.forEach(product => {
    if (product.product_type === filterType) {
      product.variants.forEach(variant => {
        if (variant.availableForSale && variant.option1 && !sizes.includes(variant.option1)) {
          sizes.push(variant.option1);
        }
      });
    }
  });
  
  return sizes;
}

function updateCategoryButtons(departmentProducts) {
  // Hide all category buttons first
  document.querySelectorAll('.gs-product-category-selector').forEach(button => {
    button.classList.add('opacity-30', 'disabled');
  });

  // Get unique categories from department products
  const availableCategories = new Set();

    departmentProducts.forEach(product => {
      // Split the massive tags string into an array of tags
      const tagsArray = product.tags.split(',');
    
      tagsArray.forEach(tag => {
        const trimmedTag = tag.trim(); // Remove any leading or trailing whitespace
        if (trimmedTag.startsWith('subdepartment-')) {
          availableCategories.add(trimmedTag.replace('subdepartment-', ''));
        }
      });
  });


  // Show only buttons for available categories
  availableCategories.forEach(category => {
    const button = document.querySelector(`.gs-product-category-selector[data-category="${category}"]`);
    if (button) {
      button.classList.remove('opacity-30', 'disabled');
    }
  });
}

function getDepartmentProducts() {
  switch(filterDepartment) {
    case 'department-mens':
      return mensProducts;
    case 'department-ladies':
      return womensProducts;
    case 'department-kids':
      return kidsProducts;
    default:
      return [];
  }
}
                                                          
function updateFilteredResults() {
  // Similar to applyFilters but without recreating buttons
  filteredData = [];
  
  let departmentProducts = getDepartmentProducts();
  
  filteredData = departmentProducts.filter(product => {
    if (filterCategory && !product.tags.includes(filterCategory)) {
      return false;
    }

    if (filterType && product.product_type !== filterType) {
      return false;
    }

    if (filterSize && !product.variants.some(variant => 
      variant.option1 === filterSize && variant.availableForSale
    )) {
      return false;
    }
    
    return true;
  });

  if (filteredData.length ) {
    createProductCards(filteredData);
    updateResultsCount(filteredData);
  } else {
    handleNoResults();
  }
}

function updateResultsCount(resultsArray) {
    document.querySelectorAll('.gs-results-div').forEach(element => {
      element.innerHTML = `<span class="font-semibold text-magenta pr-1">${resultsArray.length}</span> Products in results`;
      element.classList.remove('hidden')
    });
    document.querySelectorAll('.see-results').forEach(element => {
    if(resultsArray.length == 0 ){
      element.classList.add('hidden')
    }else{
      element.classList.remove('hidden')
    }
    });
}

function updateProductTypeText() {
  console.log('text to add', filterCategory);
  let textContainer = document.getElementById('product-kind');
  
  // Extract the part after the dash
  let subdepartment = filterCategory.includes('-')
    ? filterCategory.split('-')[1].trim() // Extracts the part after the dash, e.g., "underwear"
    : filterCategory;

  // Update the text
  let textString = subdepartment 
    ? "3. What type of " + subdepartment + " are you looking for?" 
    : "3. What kind of products are you looking for?";
  
  textContainer.innerHTML = textString;
}



function getProductImage(productImageArray) {
  let frontImage = null;
  let backImage = null;

  productImageArray.forEach(image => {
    if (image.src) {
      const src = image.src.toLowerCase();
      if (src.includes("front")) {
        frontImage = image.src;
      } else if (src.includes("back")) {
        backImage = image.src;
      }
    }
  });

  if (!frontImage && productImageArray[0]?.src) {
    frontImage = productImageArray[0].src;
  }

  if (!backImage) {
    backImage = productImageArray[1]?.src || productImageArray[0]?.src || null;
  }

  return [frontImage, backImage].filter(Boolean);
}

function createProductCards(products) {
  let container = getContainer();
  container.classList.add('grid', 'grid-cols-2', 'gap-2', 'px-2');
  container.classList.remove('mx-4');
  container.innerHTML = '';
  
  products.forEach((product, index) => {
    let imageSrc = getProductImage(product.images);
    const availableVariant = product.variants.find(variant => 
      variant.availableForSale && 
      parseFloat(variant.compare_at_price) > parseFloat(variant.price)
    );
    
    if (availableVariant) {
      const card = document.createElement('div');
      card.className = 'group relative rounded-lg';
      
      const escapedJson = JSON.stringify(product).replace(/"/g, '&quot;');
      card.innerHTML = `
        <div class="product-card flex flex-col">
          <div class="product-card__image-wrapper bg-gray-100 rounded-t-md pt-[100%] h-[0px]">
            <img src="${imageSrc[0]}" alt="${product.title}" class="w-full h-full object-contain absolute top-0" data-back="${imageSrc[1]}">
          </div>
          <p class="text-sm font-medium text-red-600 absolute top-1 right-1 bg-magenta !text-white text-center rounded-md text-nowrap px-2 px-1 !font-bold">${product.percentage_off}% Off</p>
          <div class="flex flex-col justify-between">
            <div class="px-1 pb-2 bg-gray-100 rounded-b-md">
              <div class="rounded-full border border-black border-solid grid grid-cols-2 w-full bg-white">
                <a href="https://www.myoddballs.com/products/${product.handle}" id="sale-by-size-see-more-${ index }" class="text-xxs md:text-xs items-center text-center uppercase border-r border-solid border-gray-300 py-2 font-semibold md:font-normal">
                  <div class="sr-only">link to ${product.title} - ${product.product_type}</div>see more
                </a>
                <div class="text-xxs md:text-xs items-center text-center uppercase cart-bs-quick-add py-2 font-semibold md:font-normal flex justify-center cursor-pointer" data-handle="${product.handle}" id="sale-by-size-quick-buy-${index}">
                  <div class="quick-buy-text">Quick Buy</div>
                  <div class="w-4 quick-buy-loader"><svg class="loading-ele-outer" viewBox="25 25 50 50"><circle class="loading-ele-inner" cx="50" cy="50" r="20" fill="none" stroke-width="4"></circle></svg></div>
                </div> 
              </div>  
            </div>
            <p class="product-card__details__title text-md px-2 font-bold">${product.title}</p>
            <p class="mt-1 text-md px-2 text-gray-500">${product.product_type}</p>
          </div>
          <div>
            <p class="product-card__details__price px-2 text-magenta-500 text-md">£${availableVariant.price} <del class="ml-1 text-gray-400">£${availableVariant.compare_at_price}</del></p>
          </div>
          <input type="hidden" value="${escapedJson}" class="prod-info" />
        </div>`;
      
      container.appendChild(card);
    }
  });
}

async function testFetchData() {
  try {
    mensProducts = [];
    womensProducts = [];
    kidsProducts = [];
    filteredData = [];
    
    const response = await fetch(`https://oddballs-data--development.gadget.app/apps/oddballs-data/filtered-products?tags=collection-sale-all`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    unfilteredData = await response.json();

    unfilteredData.products.forEach(item => {
      const product = item.product;
      const variants = product.variants;
      
      let addToFilteredData = false;

      if (variants && Array.isArray(variants)) {
        variants.forEach(variant => {
          const compareAtPrice = parseFloat(variant.compare_at_price) || 0;
          const price = parseFloat(variant.price) || 0;

          if (compareAtPrice > 0) {
            let percentOff = ((compareAtPrice - price) / compareAtPrice) * 100;

            if (variant.availableForSale && percentOff > 0) {
              addToFilteredData = true;
              product.percentage_off = Math.round(percentOff);
              return;
            }
          }
        });
      }

      if (addToFilteredData) {
        filteredData.push(product); // Add to filteredData first
        if (product.tags.includes('department-mens')) {
          mensProducts.push(product);
        }
        if (product.tags.includes('department-ladies')) {
          womensProducts.push(product);
        }
        if (product.tags.includes('department-kids')) {
          kidsProducts.push(product);
        }
      }
    });

    // Set the title with the initial total count
    const totalProducts = filteredData.length;
    document.getElementById('title').innerHTML = `<span class="text-magenta">${totalProducts}: </span> Deals to choose from`;

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function applyFilters() {
  filteredData = [];
  prodtypes = [];

  let departmentProducts;
  switch(filterDepartment) {
    case 'department-mens':
      departmentProducts = mensProducts;
      break;
    case 'department-ladies':
      departmentProducts = womensProducts;
      break;
    case 'department-kids':
      departmentProducts = kidsProducts;
      break;
    default:
      departmentProducts = [];
  }

  updateCategoryButtons(departmentProducts);

  filteredData = departmentProducts.filter(product => {
    if (filterCategory && !product.tags.includes(filterCategory)) {
      return false;
    }

    if (filterType && product.product_type !== filterType) {
      return false;
    }
    
    if (!prodtypes.includes(product.product_type)) {
      prodtypes.push(product.product_type);
    }

    if (filterSize && !product.variants.some(variant => 
      variant.option1 === filterSize && variant.availableForSale
    )) {
      return false;
    }
    
    return true;
  });

  if (filteredData.length > 0) {
    createProductTypeButtons(prodtypes); // This will now only run when department/category changes
    createProductCards(filteredData);
    updateResultsCount(filteredData)
     updateProductTypeText()
     window.ThemeType = "A"
  } else {
    handleNoResults();
  }
}


// Image hover effect
document.body.addEventListener('mouseover', event => {
  const wrapper = event.target.closest('.product-card__image-wrapper');
  if (wrapper) {
    const imgElement = wrapper.querySelector('img');
    const backImage = imgElement?.getAttribute('data-back');

    if (backImage) {
      const frontImage = imgElement.src;
      imgElement.src = backImage;

      wrapper.addEventListener('mouseout', () => {
        imgElement.src = frontImage;
      }, { once: true });
    }
  }
});

// Department selector click handler
document.querySelectorAll('.gs-department-selector').forEach(button => {
  button.addEventListener('click', function(event) {
    filterType = "";
    filterSize = "";
    filterCategory  = "";
    
    document.getElementById('gs-pants-size').innerHTML = "";
    document.getElementById('product-type-options').innerHTML = "";
    
    filterDepartment = "department-" + this.dataset.department;

    const activeElement = document.querySelector('#gs-mens-product-category .active-selection');
    if (activeElement) {
        activeElement.classList.remove('active-selection');
    }
    
    const categorySelector = document.querySelector('.gs-product-category-selector[data-category="underwear"]');
    if (categorySelector) {
      const imgElement = categorySelector.querySelector('img');
      if (imgElement) {
        switch (filterDepartment) {
          case "department-ladies":
            imgElement.src = 'https://cdn.shopify.com/s/files/1/0353/7249/files/Womens.svg?v=1733392178';
            break;
          case "department-kids":
            imgElement.src = 'https://cdn.shopify.com/s/files/1/0353/7249/files/Goolies.svg?v=1733392178';
            break;
          default:
            imgElement.src = 'https://cdn.shopify.com/s/files/1/0353/7249/files/Mens.svg?v=1733392178';
            break;
        }
      }
    }

    document.querySelectorAll('.gs-department-selector').forEach(btn => {
      btn.classList.remove('active-selection');
    });
    this.classList.add('active-selection');

    applyFilters();
    

    const parentElement = event.target.parentElement;
    parentElement.classList.remove('department-mens', 'department-ladies', 'department-kids');
    parentElement.classList.add(filterDepartment);
    // Update category buttons based on available products
  });
});

// Category selector click handler
document.querySelectorAll('.gs-product-category-selector').forEach(button => {
  button.addEventListener('click', function() {
    filterType = "";
    filterSize = "";
    
    document.getElementById('gs-pants-size').innerHTML = "";
    document.getElementById('product-type-options').innerHTML = "";
    filterCategory = "subdepartment-" + this.dataset.category;
    
    showLoader(this);

    document.querySelectorAll('.gs-product-category-selector').forEach(btn => {
      btn.classList.remove('active-selection');
    });
    this.classList.add('active-selection');

    if (filterDepartment && filterCategory) {
      applyFilters();
      hideLoader(this);
    }
    
  });
});

let userFirstSelect = false; // Declare the variable outside the event listener

function handleFirstClick(event) {
    // Check if the clicked element or its ancestor is a button
    const button = event.target.closest('button');
    if (!userFirstSelect && button) {
        userFirstSelect = true; // Mark the first selection as done
        document.getElementById('gs-desktop-image')?.classList.add('hidden');
        document.getElementById('mobile-results-container')?.classList.remove('hidden');
        document.getElementById('desktop-results')?.classList.remove('hidden');
        // Remove the event listener
        document.removeEventListener('click', handleFirstClick);
    } else {
        console.log('DO NOTHING');
    }
}

// Add the event listener
document.addEventListener('click', handleFirstClick);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  testFetchData().then(() => {
    const activeDepartment = document.querySelector('.gs-department-selector.active-selection');
    if (activeDepartment) {
      filterDepartment = "department-" + activeDepartment.dataset.department;
    }

    const activeCategory = document.querySelector('.gs-product-category-selector.active-selection');
    if (activeCategory) {
      filterCategory = "subdepartment-" + activeCategory.dataset.category;
    }

    applyFilters();
    document.querySelectorAll('.load-animate').forEach(element => {
      element.classList.remove('load-animate');
    });

    // Add observer for add-to-cart form
    const formObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach((node) => {
            if (node.matches && node.matches('form[data-type="add-to-cart-form"]')) {
              // Find the container with data-product-id
              const container = document.querySelector('[data-product-id]');

              if (container) {
                const productId = container.getAttribute('data-product-id');

                // Create hidden input
                const hiddenInput = document.createElement('input');
                hiddenInput.id = 'sale-by-size';
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'properties[_Sale By Size]';
                hiddenInput.value = productId;

                // Add the hidden input to the form
                node.appendChild(hiddenInput);
              }
            }
          });
        }
      });
    });

    // Start observing the document body for the form
    formObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

  }).catch(error => {
    console.error("Error initializing data:", error);
  });
});