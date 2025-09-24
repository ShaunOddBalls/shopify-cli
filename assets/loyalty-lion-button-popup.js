function getModalDataFromCookie() {
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'modalData') {
            try {
                const parsedValue = JSON.parse(value);
                return parsedValue;
            } catch (error) {
                return null;
            }
        }
    }
    return null;
}

function createModalFromData(modalData) {
    const generalPopupContent = document.getElementById("general-popup-content");
    const generalPopupHeader = document.getElementById("general-popup-header");
    const generalPopupContents = document.getElementById("general-popup-contents");
    
    // Check if discount is already in cart first
    const cookies = document.cookie.split(';');
    const discountCookie = cookies.find(cookie => cookie.trim().startsWith('discount_code='));
    const isDiscountApplied = discountCookie && discountCookie.includes(modalData.rewardCode);
    
    // Clear previous contents and set up structure
    generalPopupContents.classList.remove('mx-4', "overflow-y-scroll", "p-4", "pb-4", "py-2");
    generalPopupContents.classList.add('mx-0', "p-0", "flex");

    generalPopupHeader.classList.remove('justify-between');
    generalPopupHeader.classList.add('justify-center', 'marujo' );
    
    // Clear previous content
    generalPopupHeader.innerHTML = '';
    generalPopupContents.innerHTML = '';

    // Set the header content first
    generalPopupHeader.innerHTML = modalData.header;

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
        
        // Add success message text with tick emoji
        const successMessage = document.createElement("span");
        successMessage.innerHTML = modalData.successDiscountMessage || "Discount Applied";
        
        // Add success message container
        successMessageContainer.appendChild(successMessage);
        generalPopupContentsContainsTheContent.appendChild(successMessageContainer);
    }

    // Create and add buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("flex", "flex-col", "lg:flex-row", "gap-2", "w-full", "px-6", "mx-auto", "relative");

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
        addDiscountButton.innerText = modalData.buttonText || "Apply and Shop";
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
                                
                                // Create a new div for the modal text and collection link
                                const modalTextDiv = document.createElement("div");
                                modalTextDiv.classList.add("text-center", "p-4", "text-lg");
                                
                                if (modalData.modalText && modalData.collectionLink) {
                                    modalTextDiv.innerHTML = `
                                        <p class="mb-4">${modalData.modalText}</p>
                                    `;
                                } else {
                                    modalTextDiv.innerHTML = "Discount applied successfully!";
                                }
                                
                                // Clear existing content and add the new content
                                generalPopupContentsContainsTheContent.innerHTML = '';
                                generalPopupContentsContainsTheContent.appendChild(modalTextDiv);
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

    // Auto-apply the discount code if not already applied
    if (!isDiscountApplied) {
        setTimeout(() => {
            handleDiscountClickWithCode(modalData.rewardCode);
        }, 1000);
    }
}

 function referalPopupInnit() {
    const modalData = getModalDataFromCookie();
    
    if (modalData && modalData.showPopUpButton) {
        // Check if button already exists
        if (!document.getElementById('loyality-lion-popup-btn')) {
            // Create the div
            const referalPopupBtn = document.createElement('div');
            referalPopupBtn.id = 'loyality-lion-popup-btn';
            referalPopupBtn.className = 'z-30 fixed bottom-5 right-5 cursor-pointer text-white bg-magenta inline-flex items-center justify-center p-4 rounded-full font-semibold uppercase js-loyality-modal';
            referalPopupBtn.innerText = modalData.popupText || 'Refer A Friend Offer';

            // Create close button
            const closeButton = document.createElement('div');
            closeButton.className = 'absolute -top-2 -right-2 bg-white text-magenta rounded-full w-6 h-6 flex items-center justify-center cursor-pointer shadow-md hover:bg-gray-100';
            closeButton.innerHTML = '×';
            closeButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent triggering the parent click
                // Remove the button from DOM
                referalPopupBtn.remove();
                // Update modal data in cookie to set showPopUpButton to false
                const updatedModalData = {
                    ...modalData,
                    showPopUpButton: false
                };
                document.cookie = `modalData=${JSON.stringify(updatedModalData)}; max-age=14400; path=/; secure; samesite=strict`;
            });

            // Add click event listener to create and show modal
            referalPopupBtn.addEventListener('click', () => {
                createModalFromData(modalData);
            });

            // Add close button to popup button
            referalPopupBtn.appendChild(closeButton);
            // Append to body
            document.body.appendChild(referalPopupBtn);
        }
    }
  }

document.addEventListener('DOMContentLoaded', function() {
  try {
    referalPopupInnit();
  } catch (referalError) {
    console.log(referalError);
  }

  document.addEventListener('referralPopupEvent', function(event) {
    try {
      referalPopupInnit();
    } catch (listenerError) {
      console.log(listenerError);
    }
  });
});
