import '@testing-library/jest-dom';

// If your theme code expects Shopify globals, you can stub them here:
global.Shopify = {
  currency: { active: 'GBP' },
};
// tests/setupTests.js
if (!global.fetch) {
    global.fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  }
  
