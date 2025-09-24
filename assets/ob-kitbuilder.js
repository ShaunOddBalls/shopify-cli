function watchFormWrapper() {
   ;
  console.log('[Script] Starting observer for .kb-form-wrapper...');

  const observer = new MutationObserver((mutations, obs) => {
     ;
    console.log('[Observer] Mutation detected. Checking for #field3...');

    const formWrapper = document.querySelector('.kb-form-wrapper');
    if (!formWrapper) return;

    const select = formWrapper.querySelector('#field3');
    if (!select) {
      console.warn('[Observer] #field3 not found yet.');
      return;
    }

    console.log('[Observer] Found #field3:', select);

    // Map numeric values to names
    const valueMap = { '0': 'MAX', '1': 'CONNOR', '2': 'TOM' };

    // Only set random if current value is ? or empty
    if (select.value.trim() === '?' || select.value.trim() === '' || select.selectedIndex === -1) {
      const validOptions = Array.from(select.options)
        .filter(o => o.value.trim() !== '?' && o.value.trim() !== ''); // ignore placeholders

      if (validOptions.length === 0) {
        console.warn('[Observer] No valid options available to select.');
        obs.disconnect();
        return;
      }

      // Pick a random valid option
      const randomOption = validOptions[Math.floor(Math.random() * validOptions.length)];

      // Set the selection using selectedIndex for reliability
      select.selectedIndex = Array.prototype.indexOf.call(select.options, randomOption);

      // Trigger both events for modern frameworks
      select.dispatchEvent(new Event('change', { bubbles: true }));
      select.dispatchEvent(new Event('input', { bubbles: true }));

      const selectedName = randomOption.textContent.trim();
      console.log(`[Observer] Randomly selected option: value="${randomOption.value.trim()}", name="${selectedName}"`);
    } else {
      const selectedOption = select.options[select.selectedIndex];
      const selectedName = selectedOption ? selectedOption.textContent.trim() : '';
      console.log(`[Observer] Already has a value: value="${select.value.trim()}", name="${selectedName}"`);
    }

    // Stop observing once handled; remove this line if you want it to keep running
    obs.disconnect();
  });

  observer.observe(document.body, { childList: true, subtree: true });
  console.log('[Observer] Watching document body for .kb-form-wrapper...');
}

// Start the observer
watchFormWrapper();
