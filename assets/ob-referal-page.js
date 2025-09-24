function showForm(formType) {
    document.getElementById('initial-buttons').classList.add('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('recover-form').classList.add('hidden');

    document.getElementById(`${formType}-form`).classList.remove('hidden');
  }

  function showInitialButtons() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.add('hidden');
    document.getElementById('recover-form').classList.add('hidden');
    document.getElementById('initial-buttons').classList.remove('hidden');
  }

  // Check if the URL contains the query parameter 'sign-up=modal'
  function checkAndTriggerReferral() {
    console.log('referal checking----------------------------------------')
    const urlParams = new URLSearchParams(window.location.search);
    const signUpModalParam = urlParams.get('sign-in'); // Check for 'sign-up' parameter
  
    if (signUpModalParam === 'modal') {
      // Find the first element with the data-lion-refer attribute
      console.log('click data')
      const lionReferElement = document.querySelector('[data-lion-refer]');
      console.log('lionReferElemet')
  
      if (lionReferElement) {
        // Trigger a click on the first element with the data-lion-refer attribute
        lionReferElement.click();
        console.log('Clicked the first data-lion-refer element.');
      } else {
        console.log('No element found with data-lion-refer attribute.');
      }
    } else {
      console.log('The sign-up=modal parameter is not present in the URL.');
    }
  }

document.addEventListener("DOMContentLoaded", function () {
  
    // Check if the current page matches any in the list
        // sessionStorage.setItem("referal_login", "yes");
        // console.log("Referral login cookie set.");
  
   async function checkShopifyLogin() {
      try {
          const response = await fetch("/account", { method: "GET", credentials: "include" });
  
          // If redirected to /account/login, the user is not logged in
          if (response.redirected && response.url.includes("/account/login")) {
              console.log("User is NOT logged in");
  
              // Remove only the attribute, not the element
              document.querySelectorAll("[data-lion-refer]").forEach(element => {
                  element.removeAttribute("data-lion-refer");
              });
              console.log("Removed 'data-lion-refer' attribute from all matching elements.");
  
              // Hide the .lion-modal-and-screen
              const modalScreen = document.querySelector(".lion-modal-and-screen");
              if (modalScreen) {
                  modalScreen.style.display = "none";
                  console.log("Hidden '.lion-modal-and-screen'");
              }
  
              return false;
          } else {
              console.log("User IS logged in");
              return true;
          }
      } catch (error) {
          console.error("Error checking login status:", error);
          return false;
      }
  }
  
  // Run the check on page load
  checkShopifyLogin();
  
  document.querySelectorAll(".logged-out").forEach(button => {
          button.addEventListener("click", async function (event) {
              event.preventDefault();

              const loadingSvg = `<svg class="circular-loader absolute h-5 -left-10 -top-1 md:-left-7 hidden" viewBox="25 25 50 50">
                                	<circle class="loader-path" stroke="#f00f83" cx="50" cy="50" r="20" fill="none" stroke-width="4"></circle>
                                  </svg>`
  
              console.log("Fetching login/register popup...");
  
              // Hide the .lion-modal-and-screen
              const modalScreen = document.querySelector(".lion-modal-and-screen");
              if (modalScreen) {
                  modalScreen.style.display = "none";
                  console.log("Hidden '.lion-modal-and-screen'");
              }
  
              try {
                  const response = await fetch("/pages/about-us?view=ob-global-login-register-popup", {
                      method: "GET",
                      credentials: "include"
                  });
  
                  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  
                  const data = await response.text();
                  console.log("Fetched data:", data);
  
                  // Create a temporary container to parse the HTML
                  const tempContainer = document.createElement('div');
                  tempContainer.innerHTML = data;
  
                  // Get the popup elements from the fetched data
                  const popupHeader = tempContainer.querySelector('#popup-header');
                  const popupContent = tempContainer.querySelector('#popup-content');
  
                  if (!popupHeader || !popupContent) {
                      console.error('Could not find popup elements in fetched data');
                      return;
                  }
  
                  // Get the target elements on the current page
                  const generalPopupContent = document.querySelector('#general-popup-content');
                  const generalPopupHeader = document.querySelector('#general-popup-header');
                  const generalPopupContents = document.querySelector('#general-popup-contents');
  
                  if (!generalPopupContent || !generalPopupHeader || !generalPopupContents) {
                      console.error('Could not find target elements on page');
                      return;
                  }
  
                  // Clear existing content
                  generalPopupHeader.innerHTML = '';
                  generalPopupContents.innerHTML = '';
  
                  // Insert the new content
                  generalPopupHeader.prepend(popupHeader.cloneNode(true));
                  generalPopupContents.append(popupContent.cloneNode(true));
  
                  // Open the popup
                  openPopup(generalPopupContent);
                  console.log('Popup content inserted and opened successfully');
  
              } catch (error) {
                  console.error("Error fetching login/register popup:", error);
              }
          });
      });

    checkAndTriggerReferral()

    document.addEventListener("submit", function (event) {
    const form = event.target.closest("#register-form form");
    if (form) {
        event.preventDefault(); // Prevent immediate submission

        const captchaWidget = document.querySelector(".h-captcha");
        if (captchaWidget) {
            hcaptcha.execute(); // Explicitly execute hCaptcha
        } else {
            console.error("hCaptcha not found.");
            form.submit(); // Allow form submission if hCaptcha is missing (optional)
        }
    }
});

  
  
  });


  
    document.addEventListener('click', function(event) {
    const lionReferElement = event.target.closest('[data-lion-refer]');
    
    if (lionReferElement) {
      console.log('data-lion-refer element clicked:', lionReferElement);
      
      // Check if lion-referral-share-button elements exist on the page
      const shareButtons = document.querySelectorAll('.lion-referral-share-button');
      
      console.log(`Found ${shareButtons.length} lion-referral-share-button elements on page`);
      
      if (shareButtons.length > 0) {
        console.log('Updating lion-referral-share-button targets to _parent...');
        
        // Change all lion-referral-share-button targets to _parent
        shareButtons.forEach((button, index) => {
          const oldTarget = button.getAttribute('target');
          button.setAttribute('target', '_parent');
          console.log(`Button ${index + 1}: target changed from "${oldTarget}" to "_parent"`, button);
        });
        
        console.log('Successfully updated all lion-referral-share-button targets to _parent');
      } else {
        console.log('No lion-referral-share-button elements found on page');
      }
    }
});