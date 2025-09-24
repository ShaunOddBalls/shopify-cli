/** helper functions **/
function formatMoney(cents, format){
  
	if (typeof cents === 'string') {
	  cents = cents.replace('.', '');
	}

	let value = '';
	const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
	const formatString = format || moneyFormat;

	function formatWithDelimiters(number, precision, thousands, decimal) {
	  thousands = thousands || ',';
	  decimal = decimal || '.';

	  if (isNaN(number) || number === null) {
		return 0;
	  }

	  number = (number / 100.0).toFixed(precision);

	  const parts = number.split('.');
	  const dollarsAmount = parts[0].replace(
		/(\d)(?=(\d\d\d)+(?!\d))/g,
		'$1' + thousands
	  );
	  const centsAmount = parts[1] ? decimal + parts[1] : '';

	  return dollarsAmount + centsAmount;
	}

	switch (formatString.match(placeholderRegex)[1]) {
	  case 'amount':
		value = formatWithDelimiters(cents, 2);
		break;
	  case 'amount_no_decimals':
		value = formatWithDelimiters(cents, 0);
		break;
	  case 'amount_with_comma_separator':
		value = formatWithDelimiters(cents, 2, '.', ',');
		break;
	  case 'amount_no_decimals_with_comma_separator':
		value = formatWithDelimiters(cents, 0, '.', ',');
		break;
	  case 'amount_no_decimals_with_space_separator':
		value = formatWithDelimiters(cents, 0, ' ');
		break;
	  case 'amount_with_apostrophe_separator':
		value = formatWithDelimiters(cents, 2, "'");
		break;
	}

	return formatString.replace(placeholderRegex, value);

}

document.addEventListener('DOMContentLoaded', () => {


function mega_menu() {
  const menuItems = document.querySelectorAll('li[role="menuitem"]')
  const menubar = document.querySelector('ul[role="menubar"]')
  const indicator = document.querySelector('.underline')
  const backdrop = document.querySelector('.menu-backdrop')

  menuItems.forEach((menuItem) => {
	const button = menuItem.querySelector('button')
	const menu = menuItem.querySelector('[role="menu"]')

	function showIndicator() {
	  const itemRect = menuItem.getBoundingClientRect()
	  const ulRect = menuItem.closest('ul').getBoundingClientRect()
	  indicator.style.display = 'block'
	  indicator.style.width = `${itemRect.width}px`
	  indicator.style.transform = `translateX(${itemRect.left - ulRect.left}px)`
	}

	function hideIndicator() {
	  indicator.style.display = ''
	}

	function showMenu() {
	  button.setAttribute('aria-expanded', 'true')
	  menu.classList.remove('hidden')
	  menu.setAttribute('aria-hidden', 'false')
	  backdrop.classList.remove('hidden')
	}

	function hideMenu() {
	  button.setAttribute('aria-expanded', 'false')
	  menu.classList.add('hidden')
	  menu.setAttribute('aria-hidden', 'true')
	  backdrop.classList.add('hidden')
	}

	if (menuItem.classList.contains('has-submenu')) {
	  button.addEventListener('click', () => {
		const isExpanded = button.getAttribute('aria-expanded') === 'true'

		menuItems.forEach((item) => {
		  if (item !== menuItem) {
			const otherButton = item.querySelector('button')
			const otherMenu = item.querySelector('[role="menu"]')
			otherButton.setAttribute('aria-expanded', 'false')
			otherMenu.classList.add('hidden')
			otherMenu.setAttribute('aria-hidden', 'true')
		  }
		})

		if (isExpanded) {
		  hideMenu()
		} else {
		  showMenu()
		}
	  })

	  menuItem.addEventListener('mouseover', showMenu)
	  menuItem.addEventListener('mouseout', hideMenu)
	}

	menuItem.addEventListener('mouseover', showIndicator)
	menubar.addEventListener('mouseleave', hideIndicator)
  })
}

mega_menu()

function mobile_menu() {
  const menuAccordions = document.querySelectorAll('.menu-accordion')
  const sideNavinner = document.querySelector('.side-nav-inner')

  const handleMenuBtnClick = (button) => {
	menuAccordions.forEach((accordion) => accordion.classList.remove('-translate-x-full'))

	const targetId = button.getAttribute('data-target')
	const targetAccordion = document.querySelector(targetId)

	if (targetAccordion) {
	  targetAccordion.classList.add('-translate-x-full')
	}

	sideNavinner.classList.add('!overflow-hidden')
	document.body.classList.add('!overflow-hidden')
  }

  const handleMenuBackClick = () => {
	menuAccordions.forEach((accordion) => accordion.classList.remove('-translate-x-full'))

	sideNavinner.classList.remove('!overflow-hidden')
	document.body.classList.remove('!overflow-hidden')
  }

  document.querySelectorAll('.menu-btn').forEach((button) => button.addEventListener('click', () => handleMenuBtnClick(button)))
  document.querySelectorAll('.menu-back').forEach((button) => button.addEventListener('click', handleMenuBackClick))
}

mobile_menu()


  function focusFirstVisibleElement(className, delay = 300) {
	try{
		setTimeout(() => {
		  // Get all elements with the specified class
		  const elements = document.querySelectorAll(className);
		  
		  // Find the first visible element
		  for (const element of elements) {
			// Check if element is visible (not hidden and has dimensions)
			if (element.offsetParent !== null && element.offsetWidth > 0 && element.offsetHeight > 0) {
			  element.focus();
			  break; // Exit after focusing the first visible element
			}
		  }
		}, delay);
	} catch (error) {
	  console.error(error);
	  // Expected output: ReferenceError: nonExistentFunction is not defined
	  // (Note: the exact output may be browser-dependent)
	}
  }

function collapse() {
  function toggleCollapse(target, additionalClass, overflow) {
    console.log('toggleCollapse called:', {
      target,
      additionalClass,
      overflow,
      currentOverflow: document.body.classList.contains('overflow-hidden'),
      currentStyle: document.body.style.paddingRight
    });

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
    
    const elements = document.querySelectorAll(target)
    elements.forEach((element) => {
      element.classList.toggle('hidden')
      console.log('Element hidden state:', element.classList.contains('hidden'));

      if (additionalClass) {
        element.classList.add(additionalClass)
      }
    })

    if (overflow) {
      console.log('Adding overflow-hidden');
      document.body.classList.add('overflow-hidden')
      document.body.style.paddingRight = '17px'
    } else {
      console.log('Removing overflow-hidden');
      // Try forcing removal with timeout
      setTimeout(() => {
        document.body.classList.remove('overflow-hidden')
        document.body.classList.remove('!overflow-hidden')
        document.body.style.paddingRight = ''
        console.log('Overflow state after removal:', {
          hasOverflowHidden: document.body.classList.contains('overflow-hidden'),
          hasImportantOverflowHidden: document.body.classList.contains('!overflow-hidden'),
          style: document.body.style.paddingRight
        });
      }, 100);
    }
  }

  const collapseTriggers = document.querySelectorAll('[data-toggle="collapse"]')

  collapseTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      try {
        console.log('Collapse trigger clicked');
        const target = trigger.getAttribute('data-target')
        const additionalClass = trigger.getAttribute('data-class')
        const overflow = trigger.getAttribute('data-overflow')
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true'

        console.log('Trigger attributes:', {
          target,
          additionalClass,
          overflow,
          isExpanded
        });

        trigger.setAttribute('aria-expanded', !isExpanded)

        toggleCollapse(target, additionalClass, overflow)

        // Add focus handling for search input
        const theSearchInput = document.querySelector(`${target} .search-collapse-input`)
        focusFirstVisibleElement('.search-collapse-input');

      } catch (error) {
        console.error('Error in collapse trigger handler:', error);
      }
    })
  })
}

collapse()

function handle_search() {
  const searchInputs = document.querySelectorAll('.search-collapse-input')
  const searchSuggestion = document.querySelector('.search-suggestions')
  const searchResult = document.querySelector('.search-result')

  function toggleSearch() {
	const anyInputHasValue = Array.from(searchInputs).some((input) => input.value.trim() !== '')

	if (anyInputHasValue) {
	  searchSuggestion.classList.add('hidden')
	  searchResult.classList.remove('hidden')
	} else {
	  searchSuggestion.classList.remove('hidden')
	  searchResult.classList.add('hidden')
	}
  }

  searchInputs.forEach((input) => {
	input.addEventListener('input', toggleSearch)
  })

  const resetButtons = document.querySelectorAll('.search-collapse [data-reset="true"]')
  resetButtons.forEach((button) => {
	button.addEventListener('click', () => {
	  searchInputs.forEach((input) => (input.value = ''))
	  searchSuggestion.classList.add('hidden')
	  searchResult.classList.add('hidden')
	})
  })
}

handle_search()
try{

const swiperNavElement = document.querySelector('.swiper-nav');

if (swiperNavElement && Swiper) {
  new Swiper('.swiper-nav', {
    slidesPerView: 1.5,
    spaceBetween: 16
  });
}

const swiperCollectionsElement = document.querySelector('.swiper-collections');

if (swiperCollectionsElement && Swiper) {
  new Swiper('.swiper-collections', {
    lazy: true,
    loop: true,
    centeredSlides: true,
    slidesPerView: 1.8,
    spaceBetween: 16,
    breakpoints: {
      640: {
        slidesPerView: 3.1
      },
      1280: {
        slidesPerView: 4.1
      }
    }
  })
}
}catch(swiperIntialError){
    console.log('swiper init error: ', swiperIntialError)
  }


function product_gallery() {
  const modal = document.querySelector('.modal-gallery');
  const swiperGallery = document.querySelector('.swiper-gallery');
  const swiperThumbs = document.querySelector('.swiper-gallery-2');

  // Run only if essential elements exist
  if (!modal || !swiperGallery || !swiperThumbs) {
    console.warn('Required gallery elements not found. product_gallery will not initialize.');
    return;
  }

  let swiper;
  let thumbsSwiper;

  function initSwiper() {
    if (swiper) {
      console.log('Destroying existing Swiper instance');
      swiper.destroy();
    }

    thumbsSwiper = new Swiper(".swiper-gallery-2", {
      spaceBetween: 10,
      slidesPerView: 4,
      freeMode: true,
      watchSlidesProgress: true,
    });

    swiper = new Swiper('.swiper-gallery', {
      lazy: true,
      scrollbar: {
        el: '.swiper-scrollbar',
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
      breakpoints: {
        640: {
          direction: 'vertical',
          scrollbar: false,
        },
      },
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  }

  function handleThumbnailClick(index) {
    const modalGalleryThumbs = document.querySelectorAll('.modal-gallery .swiper-thumb');
    modalGalleryThumbs.forEach((button, i) => {
      button.classList.toggle('border-white', i === index);
      button.classList.toggle('after:hidden', i === index);
    });
    if (swiper) {
      swiper.slideTo(index);
    }
    showModal();
  }

  function showModal() {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }

  function hideModal() {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden', '!overflow-hidden');
  }

  document.body.addEventListener('click', (event) => {
    const thumbnail = event.target.closest('.swiper-thumb');
    if (thumbnail) {
      const container = thumbnail.closest('.product-images, .modal-gallery');
      if (container) {
        const index = Array.from(container.querySelectorAll('.swiper-thumb')).indexOf(thumbnail);
        handleThumbnailClick(index);
      }
    }
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      hideModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      hideModal();
    }
  });

  function updateGallery() {
    initSwiper();
  }

  updateGallery();

  document.addEventListener('galleryUpdated', updateGallery);
  document.addEventListener('design:changed', updateGallery);
}

// Run it only if needed
document.addEventListener('DOMContentLoaded', () => {
  product_gallery();
});

  try{
    product_gallery();
  }catch(error){
    console.error(error)
  }

const brandsCarousel = '.partnership-marquee'
if (document.querySelector(brandsCarousel)) {
	new Swiper('.partnership-marquee', {
	slidesPerView: 'auto',
	spaceBetween: 10,
	loop: true,
	allowTouchMove: true,
	
	autoplay: {
	  delay: 0,
	  disableOnInteraction: false,
	  pauseOnMouseEnter: true,
	},
	
	speed: 3000,
	loopedSlides: 8,
	grabCursor: true,

	// Add this for linear movement
	effect: 'slide',
	watchSlidesProgress: true,
	
	breakpoints: {
	  320: {
		slidesPerView: 2,
	  },
	  480: {
		slidesPerView: 3,
	  },
	  768: {
		slidesPerView: 4,
	  },
	  1024: {
		slidesPerView: 8,
	  }
	}
  });
}


function quick_add() {
  const openButtons = document.querySelectorAll('.button__quick-add-open')

  openButtons.forEach((button) => {
	button.addEventListener('click', function () {
	  if (window.innerWidth > 1024) {
		button.classList.add('hidden')
		const quickAdd = button.closest('.product-card').querySelector('.product-card__quick-add')
		if (quickAdd) {
		  quickAdd.classList.add('product-card__quick-add--open')
		}
	  } else {
		const optionsNav = document.querySelector('.options-nav')
		optionsNav.classList.remove('hidden')
		document.body.classList.add('overflow-hidden')

		const productCard = button.closest('.product-card')
		const swiperSlide = productCard.querySelector('.swiper-slide')
		const img = swiperSlide.querySelector('img')
		const productImage = optionsNav.querySelector('.product_image')

		if (img && productImage) {
		  productImage.src = img.src
		}

		const title = productCard.querySelector('.product-card__details__title')
		const color = productCard.querySelector('.product-card__details__color')
		const price = productCard.querySelector('.product-card__details__price')

		const modalTitle = optionsNav.querySelector('.product-card__details__title')
		const modalColor = optionsNav.querySelector('.product-card__details__color')
		const modalPrice = optionsNav.querySelector('.product-card__details__price')

		if (title && modalTitle) {
		  modalTitle.innerHTML = title.innerHTML
		}
		if (color && modalColor) {
		  modalColor.innerHTML = color.innerHTML
		}
		if (price && modalPrice) {
		  modalPrice.innerHTML = price.innerHTML
		}

		const choiceChips = productCard.querySelector('.choice-chips')
		const optionsNavChoiceChips = optionsNav.querySelector('.choice-chips')

		if (choiceChips && optionsNavChoiceChips) {
		  optionsNavChoiceChips.innerHTML = choiceChips.innerHTML
		}

		quick_add_to_cart()
	  }
	})
  })

  const closeButtons = document.querySelectorAll('.button__quick-add-close')

  closeButtons.forEach((button) => {
	button.addEventListener('click', function () {
	  const productCard = button.closest('.product-card')
	  if (productCard) {
		const openButton = productCard.querySelector('.button__quick-add-open')
		if (openButton) {
		  openButton.classList.remove('hidden')
		}
	  }

	  const quickAdd = button.closest('.product-card__quick-add')
	  if (quickAdd) {
		quickAdd.classList.remove('product-card__quick-add--open')
	  }
	})
  })
}

quick_add()

function quick_add_to_cart() {
  async function handleItemClick(event) {
	const clickedItem = event.currentTarget

	if (!clickedItem.hasAttribute('disabled')) {
	  const originalContent = clickedItem.innerHTML

	  clickedItem.innerHTML = '<div class="w-4 h-4 border border-t-transparent border-gray-900 rounded-full animate-spin"></div>'

	  await delay(1000)

	  clickedItem.innerHTML = '<svg class="w-w-4 h-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5" /></svg>'

	  await delay(1000)

	  clickedItem.innerHTML = originalContent

	  if (window.innerWidth > 1024) {
		const cartNav = document.querySelector('.cart-nav')

		cartNav.classList.remove('hidden')
		document.body.classList.add('overflow-hidden')
		document.body.style.paddingRight = '17px'
	  } else {
		const optionsNav = document.querySelector('.options-nav')

		optionsNav.classList.add('clicked', 'hidden')
	  }
	}
  }

  document.querySelectorAll('.product-card__quick-add .choice-chips__item, .options-nav .choice-chips__item').forEach((item) => {
	item.addEventListener('click', handleItemClick)
  })
}

quick_add_to_cart()

function product_swatches() {
  document.querySelectorAll('.product-swatches').forEach((container) => {
	container.querySelectorAll('button').forEach((button) => {
	  button.addEventListener('click', () => {
		container.querySelectorAll('span').forEach((span) => {
		  span.classList.remove('shadow-[inset_0_0_0_1px_#b5b5b5,inset_0_0_0_2px_#fff]')
		})

		const span = button.querySelector('span')
		span.classList.add('shadow-[inset_0_0_0_1px_#b5b5b5,inset_0_0_0_2px_#fff]')
	  })
	})
  })
}

product_swatches()

function choice_chips() {
  function handleItemClick(event) {
	const clickedItem = event.currentTarget

	if (!clickedItem.hasAttribute('disabled')) {
	  const isChecked = clickedItem.getAttribute('aria-checked') === 'true'
	  clickedItem.setAttribute('aria-checked', isChecked ? 'false' : 'true')
	}
  }

  document.querySelectorAll('.filters-nav .choice-chips__item, .filters-nav .swatches__item').forEach((item) => {
	item.addEventListener('click', handleItemClick)
  })
}

choice_chips()

function product_form_choice_chips() {
  const choiceChipsContainers = document.querySelectorAll('.product-form .choice-chips')

  choiceChipsContainers.forEach((container) => {
	const items = container.querySelectorAll('.choice-chips__item')

	items.forEach((item) => {
	  item.addEventListener('click', function () {
		if (!this.hasAttribute('disabled')) {
		  items.forEach((el) => {
			el.setAttribute('aria-checked', el === this ? 'true' : 'false')
		  })

		  update_add_to_cart_button()
		}
	  })
	})
  })
}

product_form_choice_chips()

function update_add_to_cart_button() {
  const addToCartButton = document.querySelector('.product-form .add-to-cart')
  const allOptions = document.querySelectorAll('.product-form .choice-chips')
  let allSelected = true
  let unselectedOptionName = ''

  if (!addToCartButton) return
  console.log(allOptions);

  for (let i = 0; i < allOptions.length; i++) {
	const option = allOptions[i]
	const selected = option.querySelector('button[aria-checked="true"]')
	if (!selected) {
	  allSelected = false
	  unselectedOptionName = option.getAttribute('name')
	  break
	}
  }

 //  if (allSelected) {
	// addToCartButton.disabled = false
	// addToCartButton.textContent = 'Add to Basket'
 //  } else {
	// addToCartButton.disabled = true
	// addToCartButton.textContent = `Please select a ${unselectedOptionName}`
 //  }
  
  var please_select_translation = translations?.custom?.view_more_count_html || 'Please select {{ size }}';
  var please_addtobasekett_translation = translations?.custom?.add_to_basket || 'Add to basket';
  console.log('[quickbuy] please_select_translation',{please_select_translation:please_select_translation});
  console.log('[quickbuy] please_addtobasekett_translation',{please_addtobasekett_translation:please_addtobasekett_translation});
  if (allSelected) {
    addToCartButton.disabled = false;
    addToCartButton.textContent = please_addtobasekett_translation;
  } else {
    addToCartButton.disabled = true;
    // Safely replace {{ size }} in translation with unselectedOptionName
    addToCartButton.textContent = please_select_translation.replace('{{ size }}', unselectedOptionName || '');
  }
  
}

update_add_to_cart_button()

function update_quantity(parent) {
  const quantityInput = parent.querySelector('[name="quantity"]')
  const plusButton = parent.querySelector('.btn-plus')
  const minusButton = parent.querySelector('.btn-minus')

  if (!quantityInput || !plusButton || !minusButton) return

  function updateButtons() {
	minusButton.disabled = quantityInput.value == 1
  }

  plusButton.addEventListener('click', (e) => {
	e.preventDefault()
	quantityInput.value = Number(quantityInput.value) + 1
	updateButtons()
  })

  minusButton.addEventListener('click', (e) => {
	e.preventDefault()
	if (quantityInput.value > 1) {
	  quantityInput.value = Number(quantityInput.value) - 1
	  updateButtons()
	}
  })
}

const quantityContainers = document.querySelectorAll('.quantity')
if (quantityContainers.length) {
  quantityContainers.forEach(update_quantity)
}

function tag_tabs() {
  const tabs = document.querySelectorAll('.tab')

  function updateTabs() {
	const anyCheckedAfterFirst = [...tabs].slice(1).some((tab) => tab.getAttribute('aria-checked') === 'true')
	if (anyCheckedAfterFirst) {
	  tabs[0].classList.remove('tab--selected')
	  tabs[0].setAttribute('aria-checked', 'false')
	} else {
	  tabs[0].classList.add('tab--selected')
	  tabs[0].setAttribute('aria-checked', 'true')
	}
  }

  function handleTabClick(event) {
	const clickedTab = event.currentTarget
	const isChecked = clickedTab.getAttribute('aria-checked') === 'true'

	clickedTab.classList.toggle('tab--selected')
	clickedTab.setAttribute('aria-checked', isChecked ? 'false' : 'true')

	updateTabs()
  }

  tabs.forEach((tab, index) => {
	if (index === 0) {
	  tab.addEventListener('click', () => {
		tabs.forEach((t) => {
		  t.classList.remove('tab--selected')
		  t.setAttribute('aria-checked', 'false')
		})
		tab.classList.add('tab--selected')
		tab.setAttribute('aria-checked', 'true')
	  })
	} else {
	  tab.addEventListener('click', handleTabClick)
	}
  })

  updateTabs()
}

if (document.querySelectorAll('.tab').length) {
  tag_tabs()
}

function progress_bar(parent) {

  try {
  const steps = parent.querySelectorAll('li')
  const freeShipping = parent.nextElementSibling.querySelector('.free-shipping')
  const freeGift = parent.nextElementSibling.querySelector('.free-gift')
  const cartTotal = document.querySelector('#cart-total')
  const color1 = '#009fe2'
  const color2 = '#d0288d'
  const color3 = '#e41087'
  steps[0].style.setProperty('--progress-color', color1)
  steps[1].style.setProperty('--progress-color', color2)
  steps[2].style.setProperty('--progress-color', color3)
  parent.style.setProperty('--background', `linear-gradient(to right, ${color1}, ${color2}, ${color3})`)
  let amount = Number(cartTotal.value)
  let a
  let b
  let progress
  if (amount >= 30) {
	a = 100 * 0.5
	b = ((amount - 30) / 5) * 100 * 0.5
  } else {
	a = (amount / 30) * 100 * 0.5
	b = 0
  }
  progress = Math.min(Math.max(a + b, 0), 100)
  if (!isNaN(progress)) {
	parent.style.setProperty('--progress', `${progress}%`)
	steps.forEach((step) => step.classList.remove('completed'))
  }
  if (progress > 0 && progress < 50) {
	steps[0].classList.add('completed')
	freeShipping.innerHTML = `Add <b>£${30 - amount}</b> more to qualify for <b>free shipping</b>`
	freeShipping.previousElementSibling.classList.remove('completed')
	freeGift.innerHTML = `Add <b>£${35 - amount}</b> more to qualify for <b>free gift</b>`
	freeGift.previousElementSibling.classList.remove('completed')
  } else if (progress >= 50 && progress < 100) {
	steps[0].classList.add('completed')
	steps[1].classList.add('completed')
	freeShipping.innerHTML = `You are qualified for free shipping`
	freeShipping.previousElementSibling.classList.add('completed')
	freeGift.innerHTML = `Add <b>£${35 - amount}</b> more to qualify for <b>free gift</b>`
	freeGift.previousElementSibling.classList.remove('completed')
  } else if (progress == 100) {
	steps.forEach((step) => step.classList.add('completed'))
	freeShipping.innerHTML = `You are qualified for <b>free shipping</b>`
	freeShipping.previousElementSibling.classList.add('completed')
	freeGift.innerHTML = `You are qualified for <b>free gift</b>`
	freeGift.previousElementSibling.classList.add('completed')
  } else if (!isNaN(amount)) {
	steps.forEach((step) => step.classList.remove('completed'))
	freeShipping.innerHTML = `Add <b>£${30 - amount}</b> more to qualify for <b>free shipping</b>`
	freeGift.innerHTML = `Add <b>£${35 - amount}</b> more to qualify for <b>free gift</b>`
  }
   } catch (error) {
	
  }
}

const progressContainers = document.querySelectorAll('.progress-bar')
if (progressContainers.length) {
  progressContainers.forEach(progress_bar)
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function closeSortNav() {
  const checkboxes = document.querySelectorAll('[name="sort"]')
  const sortNav = document.querySelector('.sort-nav')

  checkboxes.forEach((checkbox) => {
	checkbox.addEventListener('change', async (event) => {
	  const isChecked = event.target.checked
	  await delay(300)
	  sortNav.classList.add('hidden')
	})
  })
}

closeSortNav()

function filters_reset() {
  const resetButton = document.querySelector('.filters-nav button[type="reset"]')

  if (!resetButton) return

  resetButton.addEventListener('click', async () => {
	const filtersNav = document.querySelector('.filters-nav')

	const choiceChipsItems = filtersNav.querySelectorAll('.choice-chips__item, .swatches__item')
	choiceChipsItems.forEach((item) => {
	  item.setAttribute('aria-checked', 'false')
	})

	await delay(300)

	filtersNav.classList.add('hidden')
  })
}

filters_reset()

function removeClickedClass() {
  console.log('Removing clicked class and resetting overflow');
  const clickedItems = document.querySelectorAll('.clicked')
  clickedItems.forEach((item) => item.classList.remove('clicked'))
  resetOverflowState(); // Add overflow reset
}

window.addEventListener('resize', removeClickedClass)

function tabs() {
  const buttons = document.querySelectorAll('.tabs-prints button')
  const contents = document.querySelectorAll('.options-prints')

  buttons.forEach((button) => {
	button.addEventListener('click', () => {
	  buttons.forEach((btn) => btn.classList.toggle('text-pink', btn === button))
	  buttons.forEach((btn) => btn.classList.toggle('border-pink', btn === button))
	  buttons.forEach((btn) => btn.classList.toggle('border-transparent', btn !== button))

	  const targetId = button.getAttribute('data-tab')
	  contents.forEach((content) => content.classList.toggle('hidden', content.id !== targetId))
	})
  })
}

tabs()

function options_prints() {
  const buttons = document.querySelectorAll('.options-prints button')

  buttons.forEach((button) => {
	button.addEventListener('click', () => {
	  buttons.forEach((btn) => btn.classList.toggle('shadow-5', btn === button))
	  buttons.forEach((btn) => btn.classList.toggle('border-black', btn === button))

	  const url = button.getAttribute('data-url')
	  const design = button.getAttribute('data-design')
	  console.log(url, design)
	})
  })
}

options_prints()

function show_more_prints() {
  const prints = document.querySelector('.prints')
  const showMoreGradient = document.querySelector('.show-more-gradient')
  const showMoreButton = document.querySelector('.show-more')

  if (!showMoreButton) return

  showMoreButton.addEventListener('click', () => {
	if (showMoreButton.textContent === 'Show More') {
	  prints.classList.remove('max-h-[110px]', 'overflow-y-clip', '-mb-4')
	  showMoreGradient.classList.add('hidden')
	  showMoreButton.textContent = 'Show Less'
	} else {
	  prints.classList.add('max-h-[110px]', 'overflow-y-clip', '-mb-4')
	  showMoreGradient.classList.remove('hidden')
	  showMoreButton.textContent = 'Show More'
	}
  })
}

show_more_prints()


// Refer a friend pages


// Select all elements with the class .js-refer-modal
var referAFriendModalBtns = document.querySelectorAll('.js-refer-modal');
var referModal = document.getElementById('refer-a-friend-modal');


// Loop through each button and add a click event listener
referAFriendModalBtns.forEach(function(btn) {
  btn.addEventListener('click', function(event) {
	event.preventDefault(); // Prevent default action
	// Check if the modal exists before toggling classes
	if (referModal) {
	  referModal.classList.toggle('hidden');
	  referModal.classList.toggle('fixed');
	}
  });
});



// Function to initialize Swiper after content is loaded
function initializeSwiper(container, title) {
const swiperContainer = container.querySelector('.swiper-container');
const loader = container.querySelector('.slider-loader');
if (swiperContainer) {
  const swiper = new Swiper(swiperContainer, {
	slidesPerView: 2,
	slidesPerGroup: 2,
	spaceBetween: 10,
	touchRatio: 1,
	touchAngle: 45,
	grabCursor: true,
	mousewheel: {
	  forceToAxis: true,
	  sensitivity: 1,
	  releaseOnEdges: true,
	},
	keyboard: {
	  enabled: true,
	  onlyInViewport: true,
	},
	pagination: {
	  el: '.ob-collection-product-slider .swiper-pagination',
	  clickable: true,
	  renderBullet: function (index, className) {
		return '<span class="' + className + '"></span>';
	  },
	},
	breakpoints: {
	  640: {
		slidesPerView: 2,
		slidesPerGroup: 2,
	  },
	  768: {
		slidesPerView: 3,
		slidesPerGroup: 3,
	  },
	  1024: {
		slidesPerView: 4,
		slidesPerGroup: 4,
	  },
	  1280: {
		slidesPerView: 5,
		slidesPerGroup: 5,
	  }
	},
	on: {
	  init: function () {
		if (loader) loader.remove();
		
		swiperContainer.classList.remove('hidden');
		if(title) title.classList.remove('hidden')
		
	  },
	}
  });
  
} else {
  console.warn('Swiper container not found.');
}
}

function initializeUpsellSwiper(container, title) {
const swiperContainer = container.querySelector('.swiper-container');

if (swiperContainer) {
  const swiper = new Swiper(swiperContainer, {
	slidesPerView: 2,
	slidesPerGroup: 2,
	spaceBetween: 10,
	touchRatio: 1,
	touchAngle: 45,
	grabCursor: true,
	mousewheel: {
	  forceToAxis: true,
	  sensitivity: 1,
	  releaseOnEdges: true,
	},
	keyboard: {
	  enabled: true,
	  onlyInViewport: true,
	},
	pagination: {
	  el: '.ob-collection-product-slider .swiper-pagination',
	  clickable: true,
	  renderBullet: function (index, className) {
		return '<span class="' + className + '"></span>';
	  },
	},
	breakpoints: {
	  640: {
		slidesPerView: 2,
		slidesPerGroup: 2,
	  }
	},
	on: {
	  init: function () {
		swiperContainer.classList.remove('hidden');
		// title.classList.remove('hidden')
		
	  },
	}
  });
  
} else {
  console.warn('Swiper container not found.');
}
}
// Find parent with class 'tag-slider-wrap' and then find h2 within it
function findSliderTitle(element) {
	// Find the closest parent with class 'tag-slider-wrap'
	console.log('RECOMMENDATIONS_DEBUG: Finding slider title');
	const tagSliderWrap = element.closest('.tag-slider-wrap');
	
	if (tagSliderWrap) {
	  // Find h2 within the tag-slider-wrap
	  console.log('RECOMMENDATIONS_DEBUG: Found tag-slider-wrap');
	  const h2Element = tagSliderWrap.querySelector('h2');
	  
	  if (h2Element) {
		// Show the h2 element
		h2Element.classList.remove('hidden');
		console.log('RECOMMENDATIONS_DEBUG: Removed hidden class from slider title');
		//return h2Element;
	  }
	}
	
	return null;
  }
function init_recommendations () {
console.log('RECOMMENDATIONS_DEBUG: init_recommendations function called');
const recommendationTags = document.querySelectorAll('.tag-product-recommendations');

// Loop through each of the elements
recommendationTags.forEach(function (tag, index) {
  
  // Mark recommendation sliders as not ready initially
  const sliderElement = tag.querySelector('.ob-slider');
  if (sliderElement) {
    sliderElement.removeAttribute('data-slider-initialized');
    sliderElement.classList.remove('ob-slider-ready');
  }
  
  // Get the handle attribute (assuming the URL is stored in 'handle' attribute)
  const currency = document.body.getAttribute("currency");
  const countryUrl = document.body.getAttribute("country-url");



  let url = countryUrl.length > 1 && !tag.getAttribute("handle").includes(countryUrl) ? countryUrl + tag.getAttribute('handle') + "&currnecy=" + currency : tag.getAttribute('handle') + "&currnecy=" + currency ;


  // Fix: Construct slider title ID properly by removing query parameters and special characters
  let sliderTitleId = "slider-title-";
  let cleanUrl = url.split('?')[0]; // Remove query parameters
  cleanUrl = cleanUrl.replace(/\//g, ''); // Remove forward slashes to match Liquid template pattern
  sliderTitleId = sliderTitleId + cleanUrl;

  if (url) {
    //console.log('RECOMMENDATIONS_DEBUG: URL exists, proceeding with fetch');

    const sliderTitle = document.getElementById(sliderTitleId);
    //console.log('RECOMMENDATIONS_DEBUG: Slider title ID:', sliderTitleId, 'Found:', !!sliderTitle);

    // Find the existing slider wrapper within this tag
    const existingSliderWrapper = tag.querySelector('.ob-slides-wrappers');
   // console.log('RECOMMENDATIONS_DEBUG: Existing slider wrapper found:', !!existingSliderWrapper);

    if (!existingSliderWrapper) {
      //console.log('RECOMMENDATIONS_DEBUG: No existing slider wrapper found, skipping');
      return;
    }

    // Fetch the content of the URL
    console.log('RECOMMENDATIONS_DEBUG: Starting fetch for URL:', url);
    fetch(url)
      .then(response => {
        console.log('RECOMMENDATIONS_DEBUG: Fetch response status:', response.status, 'OK:', response.ok);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Assuming the response is HTML content
      })
      .then(data => {
        console.log('RECOMMENDATIONS_DEBUG: Fetch successful, data length:', data.length);
        console.log('RECOMMENDATIONS_DEBUG: First 500 chars of response:', data.substring(0, 500));
        
        // Parse the HTML string into a DOM object
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        console.log('RECOMMENDATIONS_DEBUG: Parsed DOM document:', doc);

        // Get all ob-slide elements from the fetched content
        const productSlides = doc.querySelectorAll('.ob-slide');
        console.log('RECOMMENDATIONS_DEBUG: Found product slides:', productSlides.length);
        
        if (productSlides.length > 0) {
          console.log('RECOMMENDATIONS_DEBUG: Product slides exist, injecting into existing slider wrapper');
          
          // Clear existing content in the slider wrapper
          existingSliderWrapper.innerHTML = '';
          
          // Add each product slide to the existing wrapper
          productSlides.forEach((slide, slideIndex) => {
            const clonedSlide = slide.cloneNode(true);
            existingSliderWrapper.appendChild(clonedSlide);
            console.log(`RECOMMENDATIONS_DEBUG: Added slide ${slideIndex + 1}/${productSlides.length}`);
          });
          
          // Get the slider container and update its total slides count
          const sliderContainer = tag.querySelector('.ob-slider');
          if (sliderContainer) {
            sliderContainer.setAttribute('data-total-slides', productSlides.length.toString());
            sliderContainer.classList.add('ob-slider-ready');
            console.log('RECOMMENDATIONS_DEBUG: Updated total slides count to:', productSlides.length);
          }
          
          // Initialize the recommendation slider specifically
          console.log('RECOMMENDATIONS_DEBUG: Initializing recommendation slider');
          if (window.initializeSlider && sliderContainer) {
            window.initializeSlider(sliderContainer);
            sliderContainer.setAttribute('data-slider-initialized', 'true');
            console.log('RECOMMENDATIONS_DEBUG: Successfully initialized recommendation slider');
          } else {
            console.log('RECOMMENDATIONS_DEBUG: WARNING - window.initializeSlider is not available');
          }
          
          // Show the title if it exists
          findSliderTitle(tag);
        } else {
          console.log('RECOMMENDATIONS_DEBUG: No product slides found, hiding parent container');
          // Hide the entire recommendation section if no products
          const parentContainer = tag.closest('[data-target="product-tag-recommendations"]');
          // if (parentContainer) {
          //   parentContainer.style.display = 'none';
          // }
        }
      })
      .catch(error => {
        console.error('RECOMMENDATIONS_DEBUG: Fetch error:', error);
        // Hide the recommendation section on error
        const parentContainer = tag.closest('[data-target="product-tag-recommendations"]');
        if (parentContainer) {
          parentContainer.style.display = 'none';
        }
      });
  } else {
    console.log('RECOMMENDATIONS_DEBUG: No URL found, hiding parent container');
    const parentContainer = tag.closest('[data-target="product-tag-recommendations"]');
    if (parentContainer) {
      parentContainer.style.display = 'none';
    }
  }
});
console.log('RECOMMENDATIONS_DEBUG: init_recommendations function completed');
}

console.log('RECOMMENDATIONS_DEBUG: About to call init_recommendations() initially');
init_recommendations();

// Add event listener for custom event
console.log('RECOMMENDATIONS_DEBUG: Setting up productRecommendationsUpdated event listener');
document.addEventListener('productRecommendationsUpdated', () => {
console.log('RECOMMENDATIONS_DEBUG: productRecommendationsUpdated event fired, calling init_recommendations()');
init_recommendations();
});

const UpsellProductRecommendationTags = document.querySelectorAll('.product-upsell-recomendations');

// Loop through each of the elements
UpsellProductRecommendationTags.forEach(function (tag) {
// Get the handle attribute (assuming the URL is stored in 'handle' attribute)
const url = tag.getAttribute('url');
const productType = tag.getAttribute('type');

if (url) {
  // Fetch the content of the URL
  fetch(url)
	.then(response => {
	  
	  if (!response.ok) {
		throw new Error('Network response was not ok');
	  }
	  return response.text(); // Assuming the response is HTML content
	})
	.then(data => {
	  console.log('Fetched Data:', data);
	  // Parse the HTML string into a DOM object
	  const parser = new DOMParser();
	  const doc = parser.parseFromString(data, 'text/html');
	  
	  // Check if there are product cards in the fetched content
	  const productCards = doc.querySelectorAll('.product-card');

	  // If productType is Bralette, remove .product-card elements that have type="bralette"
	  if (productType === 'Bralette') {
		productCards.forEach(card => {
		  if (card.getAttribute('type') === 'Bralette') {
			card.remove(); // Remove bralette product cards
		  }
		});
	  } else {
		// If productType is not Bralette, keep only .product-card with type="bralette"
		productCards.forEach(card => {
		  if (card.getAttribute('type') !== 'Bralette') {
			card.remove(); // Remove any product card that is not bralette
		  }
		});
	  }
	  
	  const filteredCards = doc.querySelectorAll('.product-card');

	  if (filteredCards.length > 0) {
		// Create the proper slider structure
		const sliderContainer = document.createElement('div');
		sliderContainer.className = 'ob-slider-container w-full relative product-recommendation-ob-slider';
		
		const slider = document.createElement('div');
		slider.className = 'ob-slider overflow-hidden w-full';
		
		// Read slider configuration from data attributes (with defaults for upsell)
		slider.setAttribute('data-autoplay', tag.getAttribute('data-slider-autoplay') || 'false');
		slider.setAttribute('data-slides-mobile', tag.getAttribute('data-slider-slides-mobile') || '2');
		slider.setAttribute('data-slides-md', tag.getAttribute('data-slider-slides-md') || '2');
		slider.setAttribute('data-slides-lg', tag.getAttribute('data-slider-slides-lg') || '3');
		slider.setAttribute('data-gap', tag.getAttribute('data-slider-gap') || '10');
		slider.setAttribute('data-loop', tag.getAttribute('data-slider-loop') || 'false');
		slider.setAttribute('data-slide-by', tag.getAttribute('data-slider-slide-by') || 'all');
		slider.setAttribute('data-drag-scroll', tag.getAttribute('data-slider-drag-scroll') || 'true');
		slider.setAttribute('data-slider-enabled', tag.getAttribute('data-slider-enabled') || 'true');
		slider.setAttribute('data-dots', tag.getAttribute('data-slider-dots') || 'true');
		
		const slidesWrapper = document.createElement('div');
		const gap = tag.getAttribute('data-slider-gap') || '10';
		slidesWrapper.className = `ob-slides-wrappers gap-[${gap}px] flex transition-transform duration-500 ease-in-out`;
		
		// Add each filtered product card as a slide
		filteredCards.forEach(card => {
		  const slide = document.createElement('div');
		  slide.className = 'ob-slide flex-none';
		  slide.style.width = 'calc(50% - 5px)'; // Default mobile width
		  slide.appendChild(card.cloneNode(true));
		  slidesWrapper.appendChild(slide);
		});
		
		// Create dots container only if dots are enabled
		const showDots = tag.getAttribute('data-slider-dots') !== 'false';
		if (showDots) {
		  const dotsContainer = document.createElement('div');
		  dotsContainer.className = 'ob-dots relative w-full justify-center items-center flex gap-2 z-10 my-4';
		  sliderContainer.appendChild(dotsContainer);
		}
		
		// Assemble the slider
		slider.appendChild(slidesWrapper);
		sliderContainer.appendChild(slider);
		
		// Clear existing content and add the new slider
		tag.innerHTML = '';
		tag.appendChild(sliderContainer);
		
		// Initialize the new OB slider
		if (window.reinitializeSliders) {
		  window.reinitializeSliders(tag);
		}
	  } else {
		console.warn('No matching product cards found after filtering.');
	  }
	})
	.catch(error => {
	  console.error('There has been a problem with your fetch operation:', error);
	});
} else {
  tag.remove();
}
});

let productSliders = document.querySelectorAll('.ob-collection-product-slider');
  productSliders.forEach((slider, index) => {
	console.log(slider)
	const swiperContainer = slider.querySelector('.swiper-container');
	const swiper = new Swiper(swiperContainer, {
	  slidesPerView: 2,
	  slidesPerGroup: 2,
	  spaceBetween: 10,
	  touchRatio: 1,
	  touchAngle: 45,
	  grabCursor: true,
	  mousewheel: {
		forceToAxis: true,
		sensitivity: 1,
		releaseOnEdges: true,
	  },
	  keyboard: {
		enabled: true,
		onlyInViewport: true,
	  },
	  pagination: {
		el: slider.querySelector('.swiper-pagination'),
		clickable: true,
		renderBullet: function (index, className) {
		  return '<span class="' + className + '"></span>';
		},
	  },
	  breakpoints: {
		640: {
		  slidesPerView: 2,
		  slidesPerGroup: 2,
		},
		768: {
		  slidesPerView: 3,
		  slidesPerGroup: 3,
		},
		1024: {
		  slidesPerView: 4,
		  slidesPerGroup: 4,
		},
		1280: {
		  slidesPerView: 5,
		  slidesPerGroup: 5,
		},
	  },
	  on: {
		init: function () {
		  swiperContainer.classList.remove('swiper-hidden');
		  swiperContainer.classList.add('swiper-visible');
		},
	  },
	});
  });

  try {
	  // Get the element with class 'js-get-yours-from-start'
	  let elementToMove = document.getElementsByClassName('js-multibuy-table-start')[0];
	  
	  // Get the target element by ID 'get-yours-from-here'
	  let targetElement = document.getElementById('get-yours-from-here');
	  
	  // Check if both elements exist
	  if (elementToMove && targetElement) {
		let cellRights = elementToMove.querySelectorAll('.cell-right');

		// Check if there are any elements with the class 'cell-right'
		if (cellRights.length > 0) {
		  // Get the last instance of .cell-right
		  let lastCellRight = cellRights[cellRights.length - 1];
		  
		  // Get the inner HTML or text content of the last .cell-right element
		  let lastCellNumber = lastCellRight.innerHTML.trim(); // or use lastCellRight.textContent
		  let dealElement = document.getElementById('get-yours-from-deal');
		  dealElement.innerHTML = lastCellNumber;
          elementToMove.classList.remove('hidden')
		}
			// Move the div to the target element
			targetElement.appendChild(elementToMove);
   
		  
	}else if(targetElement){
		targetElement.closest('.hs-accordion').classList.add('hidden')
	}
  } catch (multibuyMoveErr) {
	console.log('Massive fail: ', multibuyMoveErr);
  }

  function manage_videos_hp() {
	setTimeout(function() {
	  try {
		const videoElements = document.querySelectorAll('.item.slide-video, .video-block');
  
		videoElements.forEach(function(element) {
		  const WindowWidth = window.innerWidth;
		  const videosrc = WindowWidth < 869 ? element.getAttribute('data-src-mobile') : element.getAttribute('data-src');
  
		  let videoHTML;
		  if (videosrc.includes('.json')) {
			videoHTML = `<lottie-player src="${videosrc}" background="transparent" speed="1" style="width: 100%" loop autoplay></lottie-player>`;
		  } else {
			videoHTML = `<video class="video video-slide-inner  w-full h-full object-cover" muted playsinline preload="none" autoplay loop controls><source src="${videosrc}" type="video/mp4"></video>`;
		  }
  
		  const wrapper = element.querySelector('.fluid-width-video-wrapper');
		  if (wrapper) {
			wrapper.innerHTML = videoHTML;
			
			// Play the video if it's not a Lottie animation
			if (!videosrc.includes('.json')) {
			// Use setTimeout to delay playing the video
			setTimeout(() => {
			  console.log('|---------------------------PLAY-----------------------!')
			  const videoElement = wrapper.querySelector('video');
			  if (videoElement) {
				videoElement.play().catch(e => console.error('Error playing video:', e));
			  }
			}, 100); // 100ms delay, adjust if needed
		  }
		  }
		});
	  } catch (error) {
		console.error('Error in manage_videos_hp:', error);
	  }
	}, 50);
  }
  
  window.addEventListener('resize', manage_videos_hp);
  manage_videos_hp();



// size guide on quick buy 
document.body.addEventListener('click', function(event) {
const targetElement = event.target.closest('.js-quick-buy-size-guide-show');
if (targetElement) {
  event.preventDefault(); // Prevent default behavior
  
  const fetchUrl = "https://www.myoddballs.com/products/" + targetElement.getAttribute('href'); 
  
  const tapeSvg = targetElement.querySelector('.tape-svg');
  const loaderSvg = targetElement.querySelector('.circular-loader');

  if (tapeSvg && loaderSvg) {
	// Add "hidden" to tapeSvg and remove "hidden" from loaderSvg
	// tapeSvg.classList.add("hidden");
	loaderSvg.classList.remove("hidden");
  }
 
  fetch(fetchUrl)
.then(response => response.text()) // Convert response to text
.then(html => {

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Now you can grab the element with ID size-guide-chart
  const sizeGuideChart = doc.getElementById('size-chart');
  
  if (sizeGuideChart) {
	
	// Select the #size-guide-content element and empty it
	const sizeGuideContent = document.getElementById('size-guide-content');
	if (sizeGuideContent) {
	  sizeGuideContent.innerHTML = ''; // Empty the div first
	  sizeGuideContent.innerHTML = sizeGuideChart.innerHTML; // Insert new content
	  if (tapeSvg && loaderSvg) {
		// Remove "hidden" to tapeSvg and add "hidden" from loaderSvg
		// tapeSvg.classList.remove("hidden");
		loaderSvg.classList.add("hidden");
	  }
	   const sizeGuidePopup = document.getElementById("size-guide-popup-content");
	  openPopup(sizeGuidePopup)
	}
  }
})
.catch(error => {
  console.error('Error fetching the page:', error);
});
}

});


function onElementArrive(element) {
console.log('Element with id "product-variants" has arrived in the DOM.');
const variantElements = element.querySelectorAll('.product-option');

// Check if more than one .product-option element exists
if (variantElements.length > 1) {
  variantElements.forEach((variantElement) => {
	const optionName = variantElement.getAttribute('data-option-name').toLowerCase();
	if (optionName === "sock size" || optionName === "sock bundle size" ) {
	  // Find the closest element with the class js-quick-buy-size-guide-show and get its href attribute
	  const quickBuyLink = variantElement.querySelector('.js-quick-buy-size-guide-show');
	  if (quickBuyLink) {
		const hrefValue = quickBuyLink.getAttribute('href');
		console.log('Original href value:', hrefValue);
		
		fetch("https://www.myoddballs.com/collections/socks?view=ob-sock-size")
		.then(response => {
		  // Check if the response is okay
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  return response.text(); // Get the response text
		})
		.then(html => {
		  // Create a DOM parser to parse the HTML string
		  const parser = new DOMParser();
		  const doc = parser.parseFromString(html, 'text/html');
	  
		  // Access the product JSON from the parsed HTML document
		  const productJsonElement = doc.getElementById('product-json');
	  
		  // Check if the element exists and contains data
		  if (productJsonElement) {
			// Get the inner text (the text will need trimming to remove whitespace)
			const productData = productJsonElement.innerText.trim().replace(/"/g, '');
			
		 
			console.log(productData)
			const newHref = productData;
			quickBuyLink.setAttribute('href', newHref);
		  } else {
			console.log('No product JSON found');
		  }
		})
		.catch(error => {
		  console.error('There was a problem with the fetch operation:', error);
		}); 
		

		console.log('Updated href value:', quickBuyLink.getAttribute('href'));
	  } else {
		console.log('No .js-quick-buy-size-guide-show element found');
	  }
	}
  });
}
}



function arrive(targetClass, callback) {
  let debounceTimer;
  
  const observer = new MutationObserver((mutations) => {
	clearTimeout(debounceTimer);
	debounceTimer = setTimeout(() => {
	  const addedElements = new Set();
	  
	  mutations.forEach((mutation) => {
		if (mutation.type === 'childList') {
		  mutation.addedNodes.forEach((node) => {
			if (node.nodeType === Node.ELEMENT_NODE) {
			  if (node.classList.contains(targetClass)) {
				addedElements.add(node);
			  } else {
				node.querySelectorAll('.' + targetClass).forEach(el => addedElements.add(el));
			  }
			}
		  });
		}
	  });
	  
	  addedElements.forEach(callback);
	}, 100); // Debounce delay
  });

  const config = { childList: true, subtree: true };
  observer.observe(document.body, config);

  return observer;
}

// Usage example
const targetClass = 'product-options';
const observer = arrive(targetClass, (element) => {
  onElementArrive(element)
});

const reasonsContainer = document.getElementById('reasons');
const accordionElements = document.querySelectorAll('.reasons-accordian');

if (reasonsContainer && accordionElements.length > 0) {
	accordionElements.forEach(element => {
		reasonsContainer.appendChild(element);
	});
}


//     const upsellCartRefresh = arrive('upsellplus-button', () => {
//      
//     console.log('Upsell Arrived')
//     // Select all elements with the class 'upsellplus-button'
//     document.querySelectorAll('.upsellplus-button').forEach((element) => {
//             element.addEventListener('click', () => {
//                 console.log("UpsellPlus button clicked!");
//                 updateCart()
//         }
//     });
// });

document.body.addEventListener('click', function(event) {
try {
  // Check if the clicked element has the ID 'free-gift-learn-more'
  if (event.target.closest('#free-gift-learn-more')) {
	  const generalPopup = document.getElementById("general-popup-content");
	  const generalPopupContent = document.getElementById("general-popup-contents");
	  const generalPopupHeader = document.getElementById("general-popup-header");
	  const giftText = event.target.closest('#free-gift-learn-more').querySelector('#gift-text');
	  const circularLoader = event.target.closest('#free-gift-learn-more').querySelector('.circular-loader');

	  // add free gift to header
	  if (generalPopupHeader && !generalPopupHeader.innerText.includes("Free Gift")) {
		  generalPopupHeader.prepend("Free Gift ");
	  }

	  // hide text
	  if (giftText) {
		  giftText.classList.add('hidden');
	  }

	  // show loader
	  if (circularLoader) {
		  circularLoader.classList.remove('hidden');
	  }

	  // Fetch content for the popup
	  fetch("https://www.myoddballs.com/pages/about-us?view=free-gift-slider")
		  .then(response => {
			  if (!response.ok) {
				  throw new Error('Network response was not ok');
			  }
			  return response.text();
		  })
		  .then(html => {
			  console.log('response is here');
			  const parser = new DOMParser();
			  const doc = parser.parseFromString(html, 'text/html');

			  const giftSlide = doc.querySelector('#gift-slider');
			  const offers = doc.querySelector('#offers');
			  
			  console.log("gift slide: ", giftSlide);
			  console.log("offers: ", offers);

			  // If the offers section exists, modify it by removing specific paragraphs
			  if (offers) {
				  const faqContent = offers.querySelector('.cd-faq-content');
				  if (faqContent) {
					  const paragraphs = faqContent.querySelectorAll('p');
					  // Remove the 7th, 8th, and 9th paragraphs if they exist
					  if (paragraphs.length >= 9) {
						  paragraphs[6].remove(); // 7th paragraph
						  paragraphs[7].remove(); // 8th paragraph
						  paragraphs[8].remove(); // 9th paragraph
					  }
				  }
			  }

			  // If both sections are found, inject them into the popup content
			  if (giftSlide && offers && generalPopupContent) {
				  generalPopupContent.innerHTML = ''; // Clear any existing content

				  // Append the modified offers and giftSlide sections
				  generalPopupContent.appendChild(giftSlide);
				  generalPopupContent.appendChild(offers);
				if (giftText) {
				  giftText.classList.remove('hidden');
				}

				if (circularLoader) {
					  circularLoader.classList.add('hidden');
				  }
				
				if (generalPopup) {
					openPopup(generalPopup);
				} else {
					console.warn("general-popup-content element not found");
	  }
			  } else {
				  console.warn("One or both sections not found in the response.");
			  }
		  })
		  .catch(error => {
			  console.error('There was a problem with the fetch operation:', error);
		  });

	  // Ensure popup is opened if it exists
  }
} catch (freeGiftErr) {
  console.error('Free gift error:', freeGiftErr);
}
});
})//document ready end

// Add a cleanup function to ensure overflow is properly reset
function resetOverflowState() {
  console.log('Resetting overflow state');
  document.body.classList.remove('overflow-hidden');
  document.body.classList.remove('!overflow-hidden');
  document.body.style.paddingRight = '';
}

// Add to existing removeClickedClass function
function removeClickedClass() {
  console.log('Removing clicked class and resetting overflow');
  const clickedItems = document.querySelectorAll('.clicked')
  clickedItems.forEach((item) => item.classList.remove('clicked'))
  resetOverflowState(); // Add overflow reset
}

// Add error handlers to key functions
function mobile_menu() {
  try {
    // ... existing code ...
  } catch (error) {
    console.error('Error in mobile_menu:', error);
    resetOverflowState(); // Reset on error
  }
}

function quick_add() {
  try {
    // ... existing code ...
  } catch (error) {
    console.error('Error in quick_add:', error);
    resetOverflowState(); // Reset on error
  }
}

// Add cleanup on page visibility change
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    resetOverflowState();
  }
});

// Count down timer 
function updateTimer() {
    try {
        const timers = document.getElementsByClassName('count-down');

        if (timers.length > 0) {
            Array.from(timers).forEach(element => {
                try {
                    const currentDate = new Date();
                    const eventDate = new Date(element.getAttribute('date-value'));
                    const eventTime = element.getAttribute('time-value');
                    
                    if (eventTime) {
                        const timeParts = eventTime.split(':');
                        eventDate.setHours(timeParts[0], timeParts[1]);
                    }

                    const difference = eventDate.getTime() - currentDate.getTime();

                    if (difference > 0) {
                        const days = Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
                        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
                        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
                        const seconds = Math.floor((difference % (1000 * 60)) / 1000).toString().padStart(2, '0');

                        const daysElement = element.querySelector('.days-input');
                        const hoursElement = element.querySelector('.hours-input');
                        const minutesElement = element.querySelector('.minutes-input');
                        const secondsElement = element.querySelector('.seconds-input');
                        const isLoading = element.classList.contains('hidden');

                        if (daysElement) daysElement.textContent = `${days}`;
                        if (hoursElement) hoursElement.textContent = `${hours}`;
                        if (minutesElement) minutesElement.textContent = `${minutes}`;
                        if (secondsElement) secondsElement.textContent = `${seconds}`;

                        if (isLoading) {
                            element.classList.remove('hidden');
                        }
                    } else {
                        element.innerHTML = 'Expired';
                    }
                } catch (innerError) {
                    console.error('Error processing timer for element:', element, innerError);
                    element.innerHTML = 'Error';
                }
            });
        } else {
            console.log("No timers found.");
        }
    } catch (outerError) {
        console.error('Error in updateTimer function:', outerError);
    }
}

 const timerCheck = document.getElementsByClassName('count-down');
if (timerCheck.length > 0) {
    // Initial update of timers
    updateTimer();
    
    // Update every second
    setInterval(updateTimer, 1000);
}

 // document.addEventListener("DOMContentLoaded", function () {
 //                    // Add a single click event listener to the document
 //                    document.addEventListener("click", function (event) {
 //                        // Check if the clicked element or its parent is .swap-for-sub
 //                        const swapElement = event.target.closest(".swap-for-sub");
                
 //                        // If a .swap-for-sub element was found
 //                        if (swapElement) {
 //                            // Your custom logic here
 //                            console.log("Closest .swap-for-sub element clicked!", swapElement);
                              
 //                        }
 //                    });
 //                });

// popover 
 try {
    document.addEventListener('click', function (e) {
      const toggle = e.target.closest('.popover-toggle');
      if (!toggle) return;

      const key = toggle.getAttribute('data-popover');
      if (!key) return;

      const popover = document.querySelector(`.popover-content[data-popover="${key}"]`);
      if (!popover) return;

      e.stopPropagation();

      // Hide all other popovers
      document.querySelectorAll('.popover-content').forEach(p => {
        if (p !== popover) p.classList.add('hidden');
      });

      // Toggle current
      popover.classList.toggle('hidden');
    });

    // Outside click to close
    document.addEventListener('click', function (e) {
      document.querySelectorAll('.popover-content').forEach(popover => {
        const toggle = document.querySelector(`.popover-toggle[data-popover="${popover.getAttribute('data-popover')}"]`);
        if (!popover.contains(e.target) && (!toggle || !toggle.contains(e.target))) {
          popover.classList.add('hidden');
        }
      });
    });
  } catch (err) {
    console.error('[Popover Error]', err.message);
  }


//   document.addEventListener('DOMContentLoaded', () => {
//    
// })