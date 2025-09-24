/**
 * OBSlider - Ultra-light Swiper-style slider using Swiper.js core logic (rebuilt)
 * Supports: autoplay, loop, responsive slidesPerView, drag scroll, pagination-ready
 */

class OBSlider {
  constructor(sliderEl) {
    this.sliderEl = sliderEl;
    this.wrapper = sliderEl.querySelector('.ob-slides-wrappers');
    this.slides = Array.from(this.wrapper.children);
    this.container = sliderEl.closest('.ob-slider-container');

    this.config = this._parseConfig();
    this.currentIndex = 0;
    this.slideWidth = 0;
    this.autoplayInterval = null;

    this._init();
  }

  _parseConfig() {
    const d = this.sliderEl.dataset;
    return {
      autoplay: d.autoplay === 'true',
      loop: d.loop === 'true',
      slidesPerView: {
        mobile: parseInt(d.slidesMobile) || 1,
        md: parseInt(d.slidesMd) || 2,
        lg: parseInt(d.slidesLg) || 4,
      },
      gap: parseInt(d.gap) || 0,
      slideBy: d.slideBy === 'all' ? 'all' : 1,
      dragScroll: d.dragScroll !== 'false',
    };
  }

  _init() {
    console.log('[OBSlider] _init called');
    this._calculateSlidesPerView();
    this._applySlideStyles();
    this._goToSlide(this.currentIndex, false);

    if (this.config.autoplay) this._startAutoplay();
    if (this.config.dragScroll) this._addDragSupport();
    this._initDots();
    window.addEventListener('resize', () => this._onResize());
  }

  _calculateSlidesPerView() {
    const w = window.innerWidth;
    this.slidesPerView = w >= 1024 ? this.config.slidesPerView.lg : w >= 768 ? this.config.slidesPerView.md : this.config.slidesPerView.mobile;
    this.slideStep = this.config.slideBy === 'all' ? this.slidesPerView : 1;
    const totalGap = this.config.gap * (this.slidesPerView - 1);
    this.slideWidth = (this.sliderEl.offsetWidth - totalGap) / this.slidesPerView;
    console.log('[OBSlider] SlidesPerView:', this.slidesPerView, 'SlideStep:', this.slideStep);
  }

  _applySlideStyles() {
    console.log('[OBSlider] Applying slide styles');
    this.wrapper.style.display = 'flex';
    this.wrapper.style.gap = `${this.config.gap}px`;
    this.wrapper.style.transition = 'transform 0.3s ease';

    this.slides.forEach(slide => {
      slide.style.flex = `0 0 ${this.slideWidth}px`;
    });
  }

  _startAutoplay() {
    console.log('[OBSlider] Starting autoplay');
    this.autoplayInterval = setInterval(() => this.next(), 5000);
  }

  _stopAutoplay() {
    console.log('[OBSlider] Stopping autoplay');
    clearInterval(this.autoplayInterval);
    this.autoplayInterval = null;
  }

  _onResize() {
    console.log('[OBSlider] Resizing');
    this._calculateSlidesPerView();
    this._applySlideStyles();
    this._goToSlide(this.currentIndex, false);
  }

  _addDragSupport() {
    console.log('[OBSlider] Adding drag support');
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = 0;
    let currentY = 0;
    let hasMovedHorizontally = false;

    const onDragStart = (e) => {
      isDragging = true;
      hasMovedHorizontally = false;
      startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      this._stopAutoplay();
      this.wrapper.style.cursor = 'grabbing';
      console.log('[OBSlider] Drag start');
    };

    const onDragMove = (e) => {
      if (!isDragging) return;
      currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
      const dx = currentX - startX;
      const dy = currentY - startY;

      if (!hasMovedHorizontally && Math.abs(dy) > Math.abs(dx)) {
        isDragging = false;
        return;
      }

      hasMovedHorizontally = true;
      const offset = -this.currentIndex * (this.slideWidth + this.config.gap) + dx;
      this.wrapper.style.transition = 'none';
      this.wrapper.style.transform = `translateX(${offset}px)`;
    };

    const onDragEnd = () => {
      if (!hasMovedHorizontally) return;

      const dx = currentX - startX;
      const threshold = this.slideWidth / 4;
      console.log('[OBSlider] Drag end - dx:', dx);
      if (Math.abs(dx) > threshold) {
        dx < 0 ? this.next() : this.prev();
      } else {
        this._goToSlide(this.currentIndex);
      }
      isDragging = false;
      this.wrapper.style.cursor = '';
      if (this.config.autoplay) this._startAutoplay();
    };

    this.wrapper.addEventListener('mousedown', onDragStart);
    this.wrapper.addEventListener('touchstart', onDragStart, { passive: true });
    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('touchmove', onDragMove, { passive: true });
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchend', onDragEnd);
  }

  _goToSlide(index, animate = true) {
    console.log('[OBSlider] goToSlide - requested index:', index);
    const totalSlides = this.slides.length;
    const dotCount = this.dots?.length || Math.max(1, Math.ceil(totalSlides / this.slideStep));
    const maxIndex = Math.max(0, totalSlides - this.slidesPerView);

    if (this.config.loop) {
      this.currentIndex = (index + totalSlides) % totalSlides;
    } else {
      this.currentIndex = Math.max(0, Math.min(index, maxIndex));
    }

    console.log('[OBSlider] goToSlide - final index:', this.currentIndex);
    const offset = -this.currentIndex * (this.slideWidth + this.config.gap);
    this.wrapper.style.transition = animate ? 'transform 0.3s ease' : 'none';
    this.wrapper.style.transform = `translateX(${offset}px)`;
    this._updateDots();
  }

  next() {
    console.log('[OBSlider] next');
    this._goToSlide(this.currentIndex + this.slideStep);
  }

  prev() {
    console.log('[OBSlider] prev');
    this._goToSlide(this.currentIndex - this.slideStep);
  }

  _initDots() {
    this.dots = this.container.querySelectorAll('.ob-dot');
    console.log('[OBSlider] Found dots:', this.dots.length);
    if (!this.dots.length) return;
    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        console.log('[OBSlider] Dot click - index:', i);
        this._goToSlide(i * this.slideStep);
      });
    });
    this._updateDots();
  }

  _updateDots() {
    if (!this.dots?.length) return;
    const dotCount = this.dots.length;
    const logicalIndex = Math.floor(this.currentIndex / this.slideStep);
    const visibleIndex = Math.min(logicalIndex, dotCount - 1);

    console.log('[OBSlider] updateDots - currentIndex:', this.currentIndex, 'logicalIndex:', logicalIndex, 'visibleIndex:', visibleIndex, 'dotCount:', dotCount);

    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === visibleIndex);
    });
  }
}

// Auto-init all sliders
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ob-slider').forEach(slider => new OBSlider(slider));
});
