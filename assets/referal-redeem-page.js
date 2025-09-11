//console.clear();
console.log('redeem 2')


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
  const generalPopupContent = document.getElementById("general-popup-content");
  const generalPopupHeader = document.getElementById("general-popup-header");
  const generalPopupContents = document.getElementById("general-popup-contents");

  generalPopupContents.classList.remove('overflow-y-scroll')
  // Prepend the header title
  generalPopupHeader.insertAdjacentHTML('afterbegin', '<span class="w-full text-center marujo text-4xl font-bold">Refer a Friend - For 25% Off</span>'); 
  // Set the modal content with a message and a button
  generalPopupContents.innerHTML = `
  <p class="p-4 text-lg">This offer is exclusive to new customers only. Since you're already logged in, you're not eligible to claim the 25% offer yourself.</p>
  <p class="p-4 text-lg">But don't worry! You can still refer a friend who hasn't made a purchase yet. If they make a purchase, both you and your friend will earn a 25% off discount</p>
  <a href="refer-a-friend" class="w-full py-3 px-6 rounded-full bg-magenta text-white font-semibold text-lg text-center block lg:fixed lg:bottom-2 lg:right-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:w-[90%]">
    Refer a Friend Now
  </a>
`;

  openPopup(generalPopupContent);
}


function updateGeneralPopup() {
    const generalPopupContent = document.getElementById("general-popup-content");
    const generalPopupHeader = document.getElementById("general-popup-header");
    const generalPopupContents = document.getElementById("general-popup-contents");

    // Clear all previous content
    generalPopupHeader.innerHTML = '';
    generalPopupContents.innerHTML = '';
    generalPopupContents.classList.remove('mx-4', "overflow-y-scroll", "p-4", "pb-4", "py-2");
    generalPopupContents.classList.add('mx-0',"p-0", "flex");

    if (clonedModalContent) {
        // Extract information from cloned modal without modifying it
        const lionReferralHeader = clonedModalContent.querySelector(".lion-referral-modal--header");
        const incentiveCodeContainer = clonedModalContent.querySelector(".lion-referral-modal--incentive--code");
        const rewardCode = incentiveCodeContainer ? incentiveCodeContainer.querySelector(".lion-reward-code__code") : null;
        const incentiveMessage = clonedModalContent.querySelector(".lion-referral-modal--incentive--message");
        const collectionRestrictionText = clonedModalContent.querySelector(".lion-referral-modal__collection-restriction-text");
        const lionActionButton = clonedModalContent.querySelector(".lion-action-button");

        // Custom Header
        if (lionReferralHeader) {
            // Check if we already have a custom header
            const existingCustomHeader = generalPopupHeader.querySelector('.custom-header-content');
            if (!existingCustomHeader) {
                const headerContent = lionReferralHeader.innerHTML;
                const customHeader = document.createElement("div");
                customHeader.classList.add("marujo", "flex", "items-center", "justify-center", "text-2xl", "font-bold", "!text-center", "w-full", "px-4", "custom-header-content");
                customHeader.innerHTML = headerContent;
                generalPopupHeader.prepend(customHeader);
            }
        }

        // Get inputs for modal data
        const popupTextInput = document.getElementById('ll-popup-text');
        const modalTextInput = document.getElementById('ll-modal-text');
        const collectionInput = document.getElementById('ll-collection');
        const successDiscountMessage = document.getElementById('ll-success-discount-message');
        
        // Create modal data object
        const modalData = {
            header: lionReferralHeader ? lionReferralHeader.innerHTML : '',
            rewardCode: rewardCode ? rewardCode.innerText : '',
            incentiveMessage: incentiveMessage ? incentiveMessage.innerText : '',
            collectionRestrictionText: collectionRestrictionText ? collectionRestrictionText.innerText : '',
            buttonText: lionActionButton ? lionActionButton.textContent.trim() : '',
            showPopUpButton: true,
        
            // New fields from hidden inputs
            popupText: popupTextInput ? popupTextInput.value : '',
            modalText: modalTextInput ? modalTextInput.value : '',
            collectionLink: collectionInput ? collectionInput.value : '',
            successDiscountMessage: successDiscountMessage ? successDiscountMessage.value : ''
        };

                // Convert to string and store in cookie with fresh 4-hour expiration
        const modalDataString = JSON.stringify(modalData);
        
        
        document.cookie = `modalData=${modalDataString}; max-age=14400; path=/; secure; samesite=strict`;
     
        
        // Verify the cookie was set
        const cookies = document.cookie.split(';');
        const modalCookie = cookies.find(cookie => cookie.trim().startsWith('modalData='));


        if(modalCookie ){
          //console.clear()
          const cookieEvent = new CustomEvent('referralPopupEvent');
          document.dispatchEvent(cookieEvent);
        }

        // Check if discount is already in cart
        const discountCookie = cookies.find(cookie => cookie.trim().startsWith('discount_code='));
        const isDiscountApplied = discountCookie && discountCookie.includes(modalData.rewardCode);

        // Add close button to header
        const closeButton = document.createElement('div');
        closeButton.className = 'absolute top-5 right-4';
        closeButton.innerHTML = `
            <div class="popup-safety-screen-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
                    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></line>
                </svg>
            </div>
        `;
        closeButton.addEventListener('click', () => {
            resetPopup(generalPopupContent);
        });
        generalPopupHeader.appendChild(closeButton);

        // Create wrapper for content
        const generalPopupContentsWrapperForContent = document.createElement("div");
        generalPopupContentsWrapperForContent.classList.add("flex", "flex-col", "divide-y", "divide-gray-200", "bg-white", "flex-grow");

        // Create content container
        const generalPopupContentsContainsTheContent = document.createElement("div");
        generalPopupContentsContainsTheContent.classList.add("h-0", "flex-1", "overflow-y-auto");

        // Create footer container
        const generalPopupContentsContainsTheFooter = document.createElement("div");
        generalPopupContentsContainsTheFooter.classList.add("flex", "shrink-0", "justify-end", "px-4", "py-4");

        // Add incentive message
        const voucherDiscountDiv = document.createElement("div");
        voucherDiscountDiv.classList.add("voucher-discount-message", "text-center", "text-md", "px-4", "lg:px-6", "py-4");
        voucherDiscountDiv.innerText = modalData.incentiveMessage;
        generalPopupContentsContainsTheContent.appendChild(voucherDiscountDiv);

        // Add reward code with copy functionality
        const incentiveCodeDiv = document.createElement("div");
        incentiveCodeDiv.classList.add("incentive-code", "cursor-pointer", "flex", "justify-center", "items-center", "font-bold", "text-2xl", "p-4", "bg-[#dbeafe]");
        incentiveCodeDiv.innerHTML = `
            <span class="border-4 border-dashed p-4 border-[#92a6bf] text-black">${modalData.rewardCode}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-[#7389a4] ml-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
        `;

        // Add copy functionality
        incentiveCodeDiv.addEventListener("click", () => {
            navigator.clipboard.writeText(modalData.rewardCode).then(() => {
                showNotification("Code copied!", event);
            });
        });

        generalPopupContentsContainsTheContent.appendChild(incentiveCodeDiv);

        // Add collection restriction text if it exists
        if (modalData.collectionRestrictionText) {
            const restrictionDiv = document.createElement("div");
            restrictionDiv.classList.add("collection-restriction-text", "text-center", "p-6");
            restrictionDiv.innerText = modalData.collectionRestrictionText;
            generalPopupContentsContainsTheContent.appendChild(restrictionDiv);

            // Add success message container under restriction text
            const successMessageContainer = document.createElement("div");
            successMessageContainer.classList.add("flex", "items-center", "justify-center", "gap-2", "text-[#488848]", "text-sm", "font-semibold", "mb-2");
            successMessageContainer.style.display = isDiscountApplied ? "flex" : "none";
            
            // Add success message text
            const successMessage = document.createElement("span");
            successMessage.innerHTML = modalData.successDiscountMessage || "Discount Applied";
            
            // Add success message container
            successMessageContainer.appendChild(successMessage);
            generalPopupContentsContainsTheContent.appendChild(successMessageContainer);
        }

        // Create and add buttons
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("flex", "flex-col", "lg:flex-row", "gap-2", "w-full", "px-6", "mx-auto", "relative");

        if (isDiscountApplied) {
            // Create a link to the collection
            const collectionLink = document.createElement("a");
            collectionLink.href = modalData.collectionLink || "#";
            collectionLink.classList.add(
                "w-full", 
                "py-3", 
                "px-6", 
                "rounded-full", 
                "bg-magenta", 
                "text-white", 
                "font-semibold", 
                "text-lg", 
                "text-center", 
                "block"
            );
            collectionLink.innerText = modalData.modalText || "Shop Now";
            buttonContainer.appendChild(collectionLink);
        } else {
            // Single button - Apply and Shop
            const addDiscountButton = document.createElement("div");
            addDiscountButton.setAttribute("data-discount-code", modalData.rewardCode);
            addDiscountButton.classList.add(
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
            addDiscountButton.innerText = modalData.buttonText || "Apply and Shop";

            // Add click handler for Apply and Shop functionality
            addDiscountButton.addEventListener("click", function() {
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
                                    // Show success message container
                                    const successMessageContainer = generalPopupContentsContainsTheContent.querySelector('.collection-restriction-text + .flex');
                                    if (successMessageContainer) {
                                        successMessageContainer.style.display = "flex";
                                    }
                                    
                                    // Remove the apply button
                                    buttonContainer.innerHTML = '';
                                    
                                    // Create collection link button
                                    const collectionLink = document.createElement("a");
                                    collectionLink.href = modalData.collectionLink || "#";
                                    collectionLink.classList.add(
                                        "w-full", 
                                        "py-3", 
                                        "px-6", 
                                        "rounded-full", 
                                        "bg-magenta", 
                                        "text-white", 
                                        "font-semibold", 
                                        "text-lg", 
                                        "text-center", 
                                        "block"
                                    );
                                    collectionLink.innerText = modalData.modalText || "Shop Now";
                                    buttonContainer.appendChild(collectionLink);
                                } else {
                                    button.innerText = "Please try again";
                                    setTimeout(() => {
                                        button.innerText = originalText;
                                    }, 2000);
                                }
                            })
                            .catch(error => {
                                button.innerText = "Please try again";
                                setTimeout(() => {
                                    button.innerText = originalText;
                                }, 2000);
                            });
                    }, 2000);
                }
            });
            buttonContainer.appendChild(addDiscountButton);
        }

        generalPopupContentsContainsTheFooter.appendChild(buttonContainer);

        // Assemble the popup
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
   

    // Clone the modal immediately
    clonedModalContent = modal.cloneNode(true);
   

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

        return; // Stop execution if the parameter is missing
    }

    checkShopifyLogin()


    // Auto-apply discount code when the page loads
    setTimeout(() => {
        const rewardCodeElement = document.querySelector('.lion-reward-code__code');
        if (rewardCodeElement) {
            const discountCode = rewardCodeElement.innerText;
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
                }
            }, 300);
        }
    }
}









