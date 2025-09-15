import "../../assets/subs-popup"
let popupController
describe('Popup Controller', () => {
    beforeEach(() => {
        popupController = window.popupController;
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-09-15T12:00:00Z'));
      localStorage.clear?.();
      popupController.reset?.();
    });
  
    afterEach(() => {
      jest.useRealTimers();
    });
  
    test('does NOT show on the first pageview, even after 30s', () => {
      const showFn = jest.fn();
      popupController.init(showFn);
      jest.advanceTimersByTime(31_000);
      expect(showFn).not.toHaveBeenCalled();
    });
  
    test('shows after second pageview AND 30s have elapsed', () => {
      const showFn1 = jest.fn();
      const showFn2 = jest.fn();
      popupController.init(showFn1);           // 1st page
      jest.advanceTimersByTime(5_000);
      popupController.init(showFn2);           // 2nd page (starts 30s countdown)
  
      jest.advanceTimersByTime(29_000);
      expect(showFn1).not.toHaveBeenCalled();
      expect(showFn2).not.toHaveBeenCalled();
  
      jest.advanceTimersByTime(1_000);
      expect(showFn2).toHaveBeenCalledTimes(1);
    });
  
    test('only shows once across later pageviews', () => {
      const showFn2 = jest.fn();
      const showFn3 = jest.fn();
  
      popupController.init(jest.fn());         // 1st
      popupController.init(showFn2);           // 2nd -> schedules
      jest.advanceTimersByTime(30_000);
      expect(showFn2).toHaveBeenCalledTimes(1);
  
      popupController.init(showFn3);           // 3rd
      jest.advanceTimersByTime(60_000);
      expect(showFn3).not.toHaveBeenCalled();
    });
  
    test('persists count via storage across navigations/tabs', () => {
      const showA = jest.fn();
      const showB = jest.fn();
  
      popupController.init(showA);             // 1st view (stored)
      jest.advanceTimersByTime(10_000);
  
      popupController.init(showB);             // 2nd view
      jest.advanceTimersByTime(30_000);
      expect(showB).toHaveBeenCalledTimes(1);
      expect(showA).not.toHaveBeenCalled();
    });
  
    test('reset() clears state so logic restarts', () => {
      const show2 = jest.fn();
      popupController.init(jest.fn());
      popupController.init(show2);
      jest.advanceTimersByTime(30_000);
      expect(show2).toHaveBeenCalledTimes(1);
  
      popupController.reset();
      localStorage.clear?.();
  
      const showNew = jest.fn();
      popupController.init(jest.fn());         // fresh 1st
      popupController.init(showNew);           // fresh 2nd
      jest.advanceTimersByTime(30_000);
      expect(showNew).toHaveBeenCalledTimes(1);
    });
  });