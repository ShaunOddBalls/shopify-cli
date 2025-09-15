
describe('Popup Controller', () => {
    beforeEach(() => {
      // Use modern fake timers to control setTimeout + Date.now()
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2025-09-15T12:00:00Z')); // fixed baseline
      // jsdom provides localStorage; ensure clean slate per test
      localStorage.clear?.();
      // If your controller caches anything, reset it:
      popupController.reset?.();
    });
  
    afterEach(() => {
      jest.useRealTimers();
    });
  
    test('does NOT show on the first pageview, even after 30s', () => {
      const showFn = jest.fn();
  
      // First page load
      popupController.init(showFn);
  
      // Even after 30s, should not show because this is only the 1st pageview
      jest.advanceTimersByTime(30_000);
      expect(showFn).not.toHaveBeenCalled();
    });
  
    test('shows after second pageview AND 30s have elapsed', () => {
      const showFn1 = jest.fn();
      const showFn2 = jest.fn();
  
      // First page load
      popupController.init(showFn1);
      // Some time passes (not relevant to the 30s window, which begins on the 2nd view)
      jest.advanceTimersByTime(5_000);
  
      // Second page load (e.g., user navigates)
      popupController.init(showFn2);
  
      // Not yet 30s since the 2nd pageview
      jest.advanceTimersByTime(29_000);
      expect(showFn1).not.toHaveBeenCalled();
      expect(showFn2).not.toHaveBeenCalled();
  
      // Hit 30s since the 2nd pageview – NOW it should fire
      jest.advanceTimersByTime(1_000);
      expect(showFn2).toHaveBeenCalledTimes(1);
      expect(showFn1).not.toHaveBeenCalled();
    });
  
    test('only shows once (no duplicate popups on later pages)', () => {
      const showFn2 = jest.fn();
      const showFn3 = jest.fn();
  
      // First page
      popupController.init(jest.fn());
      // Second page, will schedule popup
      popupController.init(showFn2);
  
      // Wait 30s to trigger the popup
      jest.advanceTimersByTime(30_000);
      expect(showFn2).toHaveBeenCalledTimes(1);
  
      // Navigate again (3rd page)
      popupController.init(showFn3);
  
      // Even if we wait longer, it shouldn't fire again
      jest.advanceTimersByTime(60_000);
      expect(showFn3).not.toHaveBeenCalled();
    });
  
    test('persists pageviews across pages via storage (second tab or navigation)', () => {
      const showFnA = jest.fn();
      const showFnB = jest.fn();
  
      // Simulate first pageview (tab A)
      popupController.init(showFnA);
      jest.advanceTimersByTime(10_000);
  
      // Simulate second pageview (tab B / new navigation)
      // We expect the controller to read prior count from storage
      popupController.init(showFnB);
  
      // After full 30s since second view, it should fire
      jest.advanceTimersByTime(30_000);
      expect(showFnB).toHaveBeenCalledTimes(1);
      expect(showFnA).not.toHaveBeenCalled();
    });
  
    test('does NOT fire before the 30s delay even if user stays on second page', () => {
      const showFn = jest.fn();
  
      // First view
      popupController.init(jest.fn());
  
      // Second view (this starts the 30s countdown)
      popupController.init(showFn);
  
      // 15s pass — still too early
      jest.advanceTimersByTime(15_000);
      expect(showFn).not.toHaveBeenCalled();
  
      // Another 14s — still too early (29s total)
      jest.advanceTimersByTime(14_000);
      expect(showFn).not.toHaveBeenCalled();
  
      // Hit 30s
      jest.advanceTimersByTime(1_000);
      expect(showFn).toHaveBeenCalledTimes(1);
    });
  
    test('reset() clears state for fresh logic (useful if you show popup again in another session)', () => {
      const showFn2 = jest.fn();
  
      // First session: trigger once
      popupController.init(jest.fn());
      popupController.init(showFn2);
      jest.advanceTimersByTime(30_000);
      expect(showFn2).toHaveBeenCalledTimes(1);
  
      // Reset state (e.g., start of a new campaign/session)
      popupController.reset();
      localStorage.clear?.();
  
      // Now it should require two fresh pageviews again
      const showFnNew = jest.fn();
      popupController.init(jest.fn());     // 1st new view
      popupController.init(showFnNew);     // 2nd new view
      jest.advanceTimersByTime(30_000);
      expect(showFnNew).toHaveBeenCalledTimes(1);
    });
  });