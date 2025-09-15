// src/popupController.js
const STORAGE_KEYS = {
    COUNT: '__pv_count__',
    SHOWN: '__popup_shown__',
  };
  
  let timerId = null;
  
  function getStorage() {
    // In case storage is blocked, fall back to an in-memory shim (helps tests/environments)
    try {
      const testKey = '__test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    } catch {
      // super-tiny in-memory storage shim
      const mem = new Map();
      return {
        getItem: (k) => (mem.has(k) ? mem.get(k) : null),
        setItem: (k, v) => mem.set(k, String(v)),
        removeItem: (k) => mem.delete(k),
        clear: () => mem.clear(),
      };
    }
  }
  
  const storage = getStorage();
  
  function readCount() {
    const raw = storage.getItem(STORAGE_KEYS.COUNT);
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : 0;
  }
  
  function writeCount(n) {
    storage.setItem(STORAGE_KEYS.COUNT, String(n));
  }
  
  function isShown() {
    return storage.getItem(STORAGE_KEYS.SHOWN) === '1';
  }
  
  function markShown() {
    storage.setItem(STORAGE_KEYS.SHOWN, '1');
  }
  
  /**
   * Call on every page load.
   * After the 2nd pageview, schedule a 30s timer to call `showFn` (once total).
   */
  function init_subs_popup(showFn) {
    if (typeof showFn !== 'function') return;
  
    // If we've already shown the popup in this browser, do nothing.
    if (isShown()) return;
  
    // Increment and persist the pageview count.
    const nextCount = readCount() + 1;
    writeCount(nextCount);
  
    // Only on the 2nd pageview: schedule the popup after 30s.
    if (nextCount === 2) {
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(() => {
        if (!isShown()) {
          markShown();
          try {
            showFn();
          } catch {
           console.error("error calling popup function")
          }
        }
      }, 30_000);
    }
  }
  /**
   * Testing helper to clear state so logic restarts cleanly.
   */
  function reset_subs_popup() {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    storage.removeItem(STORAGE_KEYS.COUNT);
    storage.removeItem(STORAGE_KEYS.SHOWN);
  }
  window.popupController = {
    init:init_subs_popup,
    reset: reset_subs_popup
  }
  init_subs_popup(async()=>{
    const popup = await fetch("/pages/subscription-selector?view=subs-popup");
    const text = await popup.text();
    const subPopup = document.querySelector("#subs-popup")
    const subsContent = document.getElementById("subs-popup-content");
    
  })