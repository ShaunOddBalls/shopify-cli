import { mountBaseDOM } from './domFixture';

describe('modifyUrlWithResolutions', () => {
  let mod;
  beforeEach(() => {
    mountBaseDOM();
    // load your script file; assuming it’s built to dist/theme.js or similar:
    require('../assets/subscription-product');
    mod = window.__subsModule__;
  });

  test('returns a valid srcset string', () => {
    const jpg_srcset = mod.modifyUrlWithResolutions('https://cdn/image.jpg');
    // spot check a few entries
    expect(jpg_srcset).toContain('https://cdn/image_90x.jpg 90w');
    expect(jpg_srcset).toContain('https://cdn/image_320x.jpg 320w'); // 1260/4
    // ends without trailing comma
    expect(jpg_srcset.endsWith(',')).toBe(false);
    const png_srcset = mod.modifyUrlWithResolutions('https://cdn/image.png');
    // spot check a few entries
    expect(png_srcset).toContain('https://cdn/image_90x.png 90w');
    expect(png_srcset).toContain('https://cdn/image_320x.png 320w'); // 1260/4
    // ends without trailing comma
    expect(png_srcset.endsWith(',')).toBe(false);
  });
});
