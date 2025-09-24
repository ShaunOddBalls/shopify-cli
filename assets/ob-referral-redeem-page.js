 ;

        const popup = document.getElementById("referal-popup");
        const closeButton = document.getElementById("close-popup");
        
        // Function to show popup
        function showPopup() {
            popup.classList.remove("hidden");
        }
        
        // Function to hide popup
        function hidePopup() {
            popup.classList.add("hidden");
        }
        
        // Close button event listener
        closeButton.addEventListener("click", hidePopup);


async function checkShopifyLogin() {
    try {
        const response = await fetch("/account", { method: "GET", credentials: "include" });

        // If redirected to /account/login, the user is not logged in
        if (response.redirected && response.url.includes("/account/login")) {
            const checkInterval = setInterval(() => {
            const lionModal = document.querySelector('.lion-modal');
            if (lionModal && !clonedModalContent) { // Ensure we haven't already cloned it
                handleModalFound(lionModal);
                clearInterval(checkInterval); // Stop checking once found
            }
    }, 50); // Check every 100ms
        } else {
            popUpError()
        }
    } catch (error) {
        console.error("Error checking login status:", error);
        return false;  // Return false in case of error
    }
}


let clonedModalContent = null;

function popUpError() {
  // Get references to the popup elements
  console.log('NOT NEW USER')
  const generalPopupContent = document.getElementById("general-popup-content");
  const generalPopupHeader = document.getElementById("general-popup-header");
  const generalPopupContents = document.getElementById("general-popup-contents");

  generalPopupContents.classList.remove('overflow-y-scroll')
  // Prepend the header title
  generalPopupHeader.insertAdjacentHTML('afterbegin', '<span class="w-full text-center marujo text-4xl font-bold">Refer a Friend - Earn a 25% discount </span>'); 
  // Set the modal content with a message and a button
  generalPopupContents.innerHTML = `
  <p class="p-4 text-lg">This offer is exclusive to new customers only. Since you're already logged in, you're not eligible to claim the 25% discount yourself.</p>
  <p class="p-4 text-lg">But don't worry! You can still refer a friend who hasn't made a purchase yet. If they make a purchase, both you and your friend will earn 25% discount!</p>
  <a href="pages/refer-a-friend" class="w-full py-3 px-6 rounded-full bg-magenta text-white font-semibold text-lg text-center block lg:fixed lg:bottom-2 lg:right-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:w-[90%]">
    Refer a Friend Now
  </a>
`;

  openPopup(generalPopupContent);
}


function updateGeneralPopup() {
    const generalPopupContent = document.getElementById("general-popup-content");
    const generalPopupHeader = document.getElementById("general-popup-header");
    const generalPopupContents = document.getElementById("general-popup-contents");
    generalPopupContents.classList.remove('mx-4', "overflow-y-scroll", "p-4", "pb-4", "py-2");
    generalPopupContents.classList.add('mx-0',"p-0", "flex");
          //wrapper for content
    const generalPopupContentsWrapperForContent = document.createElement("div");
    generalPopupContentsWrapperForContent.classList.add("flex", "flex-col", "divide-y", "divide-gray-200", "bg-white","flex-grow");
            //contains the content
    const generalPopupContentsContainsTheContent = document.createElement("div");
    generalPopupContentsContainsTheContent.classList.add("h-0","flex-1", "overflow-y-auto");
            //contains the footer (buttons)
    const generalPopupContentsContainsTheFooter = document.createElement("div");
    generalPopupContentsContainsTheFooter.classList.add("flex","shrink-0", "justify-end", "px-4", "py-4");
  
    // Clear previous contents
    generalPopupContents.innerHTML = "";

    if (clonedModalContent) {
        // Extract information from cloned modal without modifying it
        const lionReferralHeader = clonedModalContent.querySelector(".lion-referral-modal--header");
        const incentiveCodeContainer = clonedModalContent.querySelector(".lion-referral-modal--incentive--code");
        const rewardCode = incentiveCodeContainer ? incentiveCodeContainer.querySelector(".lion-reward-code__code") : null;
        const incentiveMessage = clonedModalContent.querySelector(".lion-referral-modal--incentive--message");
        const collectionRestrictionText = clonedModalContent.querySelector(".lion-referral-modal__collection-restriction-text");

        // Custom Header
        if (lionReferralHeader) {
            // Check if we already have a custom header
            const existingCustomHeader = generalPopupHeader.querySelector('.custom-header-content');
            if (!existingCustomHeader) {
                const headerContent = lionReferralHeader.innerHTML;
                const customHeader = document.createElement("div");
                customHeader.classList.add("marujo", "flex", "items-center", "justify-center", "text-2xl", "font-bold", "text-center", "w-full", "px-4", "custom-header-content");
                customHeader.innerHTML = headerContent;
                generalPopupHeader.prepend(customHeader);
            }
        }

        // Incentive Message
        const voucherDiscountMessage = incentiveMessage ? incentiveMessage.innerText : "Get a discount on your order when you spend over the minimum amount!";
              //const voucherDiscountMessage2 = 'Get a %{discount} discount on your order with this code';
        const voucherDiscountDiv = document.createElement("div");
        voucherDiscountDiv.classList.add("voucher-discount-message", "text-center", "text-md", "px-4", "lg:px-6", "py-4");
        voucherDiscountDiv.innerText = voucherDiscountMessage;
        generalPopupContentsContainsTheContent.appendChild(voucherDiscountDiv);

        // Incentive Code & Clipboard Copy
        if (incentiveCodeContainer && rewardCode) {
            const incentiveCodeDiv = document.createElement("div");
            incentiveCodeDiv.classList.add("incentive-code", "cursor-pointer", "flex", "justify-center", "items-center", "font-bold", "text-2xl", "p-4", "bg-[#dbeafe]");
            incentiveCodeDiv.innerHTML = `
                <span class="border-4 border-dashed p-4 border-[#92a6bf] text-black">${rewardCode.innerText}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#7389a4] ml-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                </svg>
            `;

            // Success Message Container
            const copyMessageDiv = document.createElement("div");
            copyMessageDiv.classList.add("copy-message", "text-center", "text-green-600", "mt-2");
            copyMessageDiv.style.display = "none"; // Initially hidden
            generalPopupContentsContainsTheContent.appendChild(copyMessageDiv);

            incentiveCodeDiv.addEventListener("click", () => {
                const rewardCodeText = rewardCode.innerText;
                const originalText = incentiveCodeDiv.innerHTML;
                
                navigator.clipboard.writeText(rewardCodeText).then(() => {
                    incentiveCodeDiv.innerHTML = `
                        <span class="border-4 border-dashed p-4 border-[#92a6bf] text-black">Copied!</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#7389a4] ml-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                        </svg>
                    `;
                    
                    setTimeout(() => {
                        incentiveCodeDiv.innerHTML = originalText;
                    }, 2000);
                }).catch((err) => {
                    console.error("Failed to copy text:", err);
                });
            });

            generalPopupContentsContainsTheContent.appendChild(incentiveCodeDiv);
        }

        // Collection Restriction Text
        if (collectionRestrictionText) {
            const restrictionTextDiv = document.createElement("div");
            restrictionTextDiv.classList.add("collection-restriction-text", "text-center", "p-6");
            restrictionTextDiv.innerText = collectionRestrictionText.innerText;
            generalPopupContentsContainsTheContent.appendChild(restrictionTextDiv);
        }

        // "Add Discount" Button - Hidden but still functional
        if (rewardCode) {
            const lionActionButton = clonedModalContent.querySelector(".lion-action-button");
            const buttonText = lionActionButton ? lionActionButton.textContent.trim() : "Add Discount";

            // Create container for buttons with updated classes
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add(
                "flex", 
                "flex-col", 
                "lg:flex-row", 
                "gap-2", 
                "w-full", 
                "px-6", 
                "mx-auto", 
                "relative"
            );

            // First button - Add Discount (hidden)
            const addDiscountButton = document.createElement("div");
            addDiscountButton.setAttribute("data-discount-code", rewardCode.innerText);
            addDiscountButton.classList.add(
                "loyality-add-discount-button", 
                "rounded-full", 
                "btn-primary", 
                "flex", 
                "items-center", 
                "text-magenta", 
                "justify-center", 
                "p-2", 
                "font-semibold", 
                "border-magenta", 
                "border",
                "border-solid",
                "w-full", 
                "text-lg", 
                "px-4", 
                "lg:px-6",
                "relative",
                "cursor-pointer",
                "uppercase",
                "hidden" // Hide the button
            );
            addDiscountButton.innerText = buttonText;

            // Second button - Apply and Shop
            const applyAndShopButton = document.createElement("div");
            applyAndShopButton.setAttribute("data-discount-code", rewardCode.innerText);
            applyAndShopButton.classList.add(
                "loyality-add-discount-button", 
                "rounded-full", 
                "btn-primary", 
                "flex", 
                "items-center", 
                "text-white", 
                "justify-center", 
                "p-2", 
                "font-semibold", 
                "bg-magenta", 
                "w-full", 
                "text-lg", 
                "px-4", 
                "lg:px-6",
                "relative",
                "cursor-pointer",
                "uppercase"
            );
            applyAndShopButton.innerText = "Apply and Shop";

            // Add click handlers
            addDiscountButton.addEventListener("click", handleDiscountClick);
            applyAndShopButton.addEventListener("click", handleApplyAndShopClick);

            // Add buttons to container
            buttonContainer.appendChild(addDiscountButton);
            buttonContainer.appendChild(applyAndShopButton);
            generalPopupContentsContainsTheFooter.appendChild(buttonContainer);
            
            // Auto-apply the discount code
            setTimeout(() => {
                handleDiscountClickWithCode(rewardCode.innerText);
            }, 1000);
        }
        //put it all together
        generalPopupContentsWrapperForContent.appendChild(generalPopupContentsContainsTheContent);
        generalPopupContentsWrapperForContent.appendChild(generalPopupContentsContainsTheFooter);
        generalPopupContents.appendChild(generalPopupContentsWrapperForContent);
        // Open the popup
        openPopup(generalPopupContent);
    }
}

// Function to create and show notification at mouse position
function showNotification(message, event) {
    const notification = document.createElement("div");
    notification.classList.add("absolute", "text-white", "bg-black", "px-4", "py-2", "rounded", "text-sm", "pointer-events-none", "z-50");
    notification.style.left = `${event.clientX}px`;
    notification.style.top = `${event.clientY - 30}px`; // Offset slightly above cursor
    notification.innerText = message;
    document.body.appendChild(notification);

    // Fade out and remove
    setTimeout(() => {
        notification.style.transition = 'opacity 0.5s';
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 1500);
}

// Function to get URL parameters
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to handle modal when found
function handleModalFound(modal) {
    console.log('LoyaltyLion modal detected!');

    // Clone the modal immediately
    clonedModalContent = modal.cloneNode(true);
    console.log('Cloned modal content:', clonedModalContent);

    // Show .js-loyality-modal by removing inline display:none
    document.querySelectorAll('.js-loyality-modal').forEach(modal => {
    modal.classList.remove('hidden');
    });

    
    const loyaltyModalButton = document.querySelectorAll('.js-loyality-modal');
    if (loyaltyModalButton.length) { 
        loyaltyModalButton.forEach(button => {
            button.classList.remove('hidden'); // Remove hidden class from all
        });
    }

    updateGeneralPopup()
}

// Hide .js-loyality-modal on page load
document.addEventListener("DOMContentLoaded", () => {
    // Check if the URL contains `ll_ref_id`
    const refId = getUrlParam("ll_ref_id");
  
    if (!refId) {
        console.log("No ll_ref_id found in URL. Stopping script.");
        return; // Stop execution if the parameter is missing
    }

    checkShopifyLogin()
    console.log("ll_ref_id found:", refId);

    // Auto-apply discount code when the page loads
    setTimeout(() => {
        const rewardCodeElement = document.querySelector('.lion-reward-code__code');
        if (rewardCodeElement) {
            const discountCode = rewardCodeElement.innerText;
            console.log('Auto-applying discount code:', discountCode);
            handleDiscountClickWithCode(discountCode);
        }
    }, 2000);

    document.querySelectorAll('.js-loyality-modal').forEach(button => {
        button.addEventListener("click", () => {
            updateGeneralPopup();     
        });
    });
});

// Handler functions updated with centered SVG
function handleDiscountClickWithCode(discountCode) {
    if (discountCode) {
        const couponurl = 'https://www.myoddballs.com/discount/' + discountCode;
        
        fetch(couponurl)
            .then(response => response.text())
            .then(data => {
                if(data) {
                    console.log('Discount code applied successfully');
                } else {
                    console.log('Failed to apply discount code');
                }
            })
            .catch(error => {
                console.error('Error applying discount:', error);
            });
    }
}

function handleDiscountClick() {
    const button = this;
    const discountCode = button.getAttribute("data-discount-code");
    const originalText = button.innerText;
    
    if (discountCode) {
        // Add loading state with centered SVG
        button.innerHTML = `
            <div class="relative flex items-center justify-center w-full">
                <svg class="circular-loader h-5 absolute" viewBox="25 25 50 50">
                    <circle class="loader-path" stroke="#ffffff" cx="50" cy="50" r="20" fill="none" stroke-width="4"></circle>
                </svg>
                <span class="invisible">${originalText}</span>
            </div>
        `;
        
        setTimeout(function() {
            const couponurl = 'https://www.myoddballs.com/discount/' + discountCode;
            
            fetch(couponurl)
                .then(response => response.text())
                .then(data => {
                    if(data) {
                        console.log('Discount code applied successfully');
                        button.innerText = "Discount applied!";
                    } else {
                        button.innerText = "Please try again";
                    }
                    
                    setTimeout(() => {
                        button.innerText = originalText;
                    }, 2000);
                })
                .catch(error => {
                    console.error('Error applying discount:', error);
                    button.innerText = "Please try again";
                    setTimeout(() => {
                        button.innerText = originalText;
                    }, 2000);
                });
        }, 2000);
    }
}

function handleApplyAndShopClick() {
    const button = this;
    const discountCode = button.getAttribute("data-discount-code");
    const originalText = button.innerText;
    
    if (discountCode) {
        // Add loading state with centered SVG
        button.innerHTML = `
            <div class="relative flex items-center justify-center w-full">
                <svg class="circular-loader h-5 absolute" viewBox="25 25 50 50">
                    <circle class="loader-path" stroke="#ffffff" cx="50" cy="50" r="20" fill="none" stroke-width="4"></circle>
                </svg>
                <span class="invisible">${originalText}</span>
            </div>
        `;
        
        setTimeout(function() {
            const couponurl = 'https://www.myoddballs.com/discount/' + discountCode;
            
            fetch(couponurl)
                .then(response => response.text())
                .then(data => {
                    if(data) {
                        console.log('Discount code applied successfully');

                        showPopup()
                        const generalPopupContent = document.getElementById("general-popup-content");
                        resetPopup(generalPopupContent)
                    } else {
                        button.innerText = "Please try again";
                        setTimeout(() => {
                            button.innerText = originalText;
                        }, 2000);
                    }
                })
                .catch(error => {
                    console.error('Error applying discount:', error);
                    button.innerText = "Please try again";
                    setTimeout(() => {
                        button.innerText = originalText;
                    }, 2000);
                });
        }, 2000);
    }
}

// Add the missing resetPopup function
function resetPopup(target) {
    if (target.classList.contains("popup-active")) {
        target.classList.remove("popup-active");
        const activePopups = document.querySelectorAll('.popup-active');
        setTimeout(function() {
            target.style.display = "none";
        }, 250);
        if (activePopups.length == 0) {
            setTimeout(function() {
                const currentActivePopups = document.querySelectorAll('.popup-active');
                if (currentActivePopups.length == 0) {
                    document.body.classList.remove("body-popup-active");
                    console.log("removing body popup active");
                }
            }, 300);
        }
    }
}

 ;

// Utility function to format price
function formatPrice(value) {
  return `£${value.toFixed(2)}`;
}

// Utility function to clean price string
function cleanPrice(text) {
  return parseFloat(text.replace(/[^0-9.]/g, '')) || 0;
}

// Update logic for referal price based on the footer value
function updateReferalPriceLogic() {
  const footerEl = document.querySelector('.gbbFooterTotalValue');
  let referalDiv = document.getElementById('referal-price');

  if (!footerEl) return;

  // Check if the referal price div already exists
  if (!referalDiv) {
    // Inject the div if it doesn't exist
    referalDiv = document.createElement('div');
    referalDiv.id = 'referal-price';
    referalDiv.style.marginBottom = '4px'; // Optional styling
    footerEl.parentNode.insertBefore(referalDiv, footerEl); // Inject before the footer element
    console.log('🧩 Injected #referal-price before .gbbFooterTotalValue');
  }

  const currentValue = cleanPrice(footerEl.textContent);
  console.log('🖱️ Current footer value:', currentValue);

  // Apply logic to check for the price
  if (currentValue >= 24) {
    const discounted = currentValue - 12;
    referalDiv.textContent = `Refer a friend price: ${formatPrice(discounted)}`;
    footerEl.classList.add('line-through', '!text-gray-700', 'opacity-50');
  } else {
    referalDiv.textContent = '';
    footerEl.classList.remove('line-through', '!text-gray-700', 'opacity-50');
  }
}

// Initialize the footer observer and click logic
function initFooterObserver() {
  const footerEl = document.querySelector('.gbbFooterTotalValue');
  if (!footerEl) return;

  // Function to update the price display
  function updatePriceDisplay() {
    const currentFooter = document.querySelector('.gbbFooterTotalValue');
    const currentReferal = document.getElementById('referal-price');

    if (!currentFooter) {
      console.log('⚠️ Footer element not found, waiting for next update');
      return;
    }

    if (!currentReferal) {
      // Create the referal div if it doesn't exist
      const referalDiv = document.createElement('div');
      referalDiv.id = 'referal-price';
      referalDiv.style.marginBottom = '4px';
      referalDiv.classList.add('text-magenta', 'text-[1.1rem]');
      
      // Set the content before injecting
      const currentValue = cleanPrice(currentFooter.textContent);
      if (currentValue >= 24) {
        const discounted = (currentValue - 12).toFixed(2);
        referalDiv.textContent = `£${discounted}`;
        currentFooter.classList.add('line-through', '!text-gray-700', 'opacity-50');
      } else {
        referalDiv.textContent = '';
        currentFooter.classList.remove('line-through','!text-gray-700', 'opacity-50');
      }
      
      // Now inject it into the DOM
      currentFooter.parentNode.insertBefore(referalDiv, currentFooter);
      console.log('🧩 Created missing referal-price element');
    }
  }

  // Create a MutationObserver to watch for changes in the footer element
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'characterData' || mutation.type === 'childList') {
        updatePriceDisplay();
      }
    });
  });

  // Start observing the footer element for changes
  observer.observe(footerEl, {
    characterData: true,
    childList: true,
    subtree: true
  });

  // Initial update
  updatePriceDisplay();

  // Keep the click listener for any other necessary updates
  document.addEventListener('click', () => {
    setTimeout(updatePriceDisplay, 100);
  });
}

// Wait for .gbbFooterTotalValue to arrive and then initialize
const waitForFooter = new MutationObserver(() => {
  const footerEl = document.querySelector('.gbbFooterTotalValue');
  if (footerEl) {
    console.log('🟢 .gbbFooterTotalValue found!');
    initFooterObserver();
    waitForFooter.disconnect(); // Disconnect observer after initialization
  }
});

waitForFooter.observe(document.body, {
  childList: true,
  subtree: true,
});










