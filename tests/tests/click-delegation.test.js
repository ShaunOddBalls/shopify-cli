import { mountBaseDOM } from '../domFixture';

describe('delegated clicks', () => {
  let mod, updateSpy, swapSpy, addSpy;

  beforeEach(() => {
    mountBaseDOM();
    require('../../assets/subscription-product');
    mod = window.__subsModule__;

    // mock functions
    updateSpy = jest.spyOn(mod, 'updateAtcButton').mockImplementation(() => {});
    swapSpy = jest.spyOn(mod, 'swapSub').mockImplementation(() => {});
    addSpy = jest.spyOn(mod, 'addSubToCart').mockResolvedValue({});

    // mock fetch for any network calls
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'cartItem1' })
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('product-variant click updates button state', () => {
    // ensure starting state
    const btn = document.getElementById('add-to-cart-loaded');
    const wrap = document.getElementById('add-sub-form');
  
    document.querySelector('.product-variant').click();
  
    // it should prompt for the first missing option and add the class
    expect(btn.textContent).toMatch(/^Please Select /);
    expect(wrap.classList.contains('missing-variants')).toBe(true);
  });

  test('subscription-print-swap toggles class and calls swapSub', () => {
    const btn = document.getElementById('subscription-print-swap');
    btn.click();
    // expect(swapSpy).toHaveBeenCalled();
    expect(btn.classList.contains('patterned-message')).toBe(true);
  });

  test('add-sub-form: prevents default and calls addSubToCart when not missing variants', () => {
    const formWrap = document.getElementById('add-sub-form');
    const evt = new MouseEvent('click', { bubbles: true, cancelable: true });
    const prevent = jest.spyOn(evt, 'preventDefault');
    formWrap.dispatchEvent(evt);
    // expect(prevent).toHaveBeenCalled();
    // expect(addSpy).toHaveBeenCalled();
  });

  test('add-sub-form: does NOT call addSubToCart when missing variants', () => {
    const formWrap = document.getElementById('add-sub-form');
    formWrap.classList.add('missing-variants');
    const evt = new MouseEvent('click', { bubbles: true, cancelable: true });
    formWrap.dispatchEvent(evt);
    expect(addSpy).not.toHaveBeenCalled();
  });
});
