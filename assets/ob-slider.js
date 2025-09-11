/**
 * Generic Slider
 * 
 * This slider supports multiple modes:
 * - Regular slider with autoplay, loop, and pagination
 * - Marquee slider (continuous scrolling)
 * 
 * Usage:
 * 1. Add a container with class 'ob-slider-container'
 * 2. Inside, add an element with class 'ob-slider' and set data attributes:
 *    - data-autoplay="true|false" - Enable/disable autoplay
 *    - data-slides-mobile="N" - Number of slides to show on mobile
 *    - data-slides-md="N" - Number of slides to show on medium screens
 *    - data-slides-lg="N" - Number of slides to show on large screens
 *    - data-gap="N" - Gap between slides in pixels
 *    - data-loop="true|false" - Enable/disable infinite loop
 *    - data-marquee="true|false" - Enable/disable marquee mode
 *    - data-marquee-pause="true|false" - Pause marquee on hover
 *    - data-marquee-speed="N" - Speed of marquee in pixels per frame
 *    - data-drag-scroll="true|false" - Enable/disable drag scrolling
 *    - data-touchpad="true|false" - Enable/disable touchpad support
 *    - data-slider-enabled="true|false" - Enable/disable slider
 *    - data-slide-by="1|all" - Number of slides to move at once
 *    - data-center-when-fewer-slides="true|false" - Center slides when fewer than slides per view
 *    - data-card-stack="true|false" - Enable/disable card-stack effect
 * 3. Inside the slider, add a div with class 'ob-slides-wrappers'
 * 4. Add slides as direct children of 'ob-slides-wrappers'
 * 5. Optionally add pagination dots with class 'ob-dots' and buttons with class 'ob-dot'
 * 6. Optionally add navigation buttons with classes 'ob-prev' and 'ob-next'
 * 
 * Example:
 * <div class="ob-slider-container">
 *   <div class="ob-slider" data-autoplay="true" data-loop="true" data-gap="10">
 *     <div class="ob-slides-wrappers">
 *       <div class="ob-slide">Slide 1</div>
 *       <div class="ob-slide">Slide 2</div>
 *     </div>
 *   </div>
 *   <div class="ob-dots">
 *     <button class="ob-dot" data-dot-index="0"></button>
 *     <button class="ob-dot" data-dot-index="1"></button>
 *   </div>
 * </div>
 */

document.addEventListener("DOMContentLoaded", () => {
  const sliders = document.querySelectorAll('.ob-slider');

  // Function to initialize a single slider
  window.initializeSlider = function(sliderContainer) {
    let io;

    let hasActivatedMarquee = false;

    function setMarqueeBasePosition() {
      const totalWidth = (slideWidth + gap) * slides.length;
      slidesWrapper.style.transition = 'none';
      slidesWrapper.style.transform = `translate3d(-${totalWidth}px, 0, 0)`;
      return totalWidth;
    }
    // Check if slider is enabled
    if (sliderContainer.dataset.sliderEnabled === 'false') {
      // If disabled, just make it a static container
      sliderContainer.style.overflow = 'visible';
      return; // Skip all slider initialization
    }

    // Find the parent container
    const sliderWrapper = sliderContainer.closest('.ob-slider-container');
    const slidesWrapper = sliderContainer.querySelector('.ob-slides-wrappers');
    const slides = Array.from(slidesWrapper?.children || []);
    
    
    if (!slidesWrapper) {
      console.error('❌ No .ob-slides-wrappers found in slider');
      return;
    }
    
    // Check if there's only one slide
    if (slides.length <= 1) {
      sliderContainer.dataset.autoplay = 'false';
      sliderContainer.dataset.marquee = 'false';
      sliderContainer.dataset.dragScroll = 'false';
      // Hide navigation elements if they exist
      const prevBtn = sliderWrapper?.querySelector('.ob-prev');
      const nextBtn = sliderWrapper?.querySelector('.ob-next');
      const dotsContainer = sliderWrapper?.querySelector('.ob-dots');
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (dotsContainer) dotsContainer.style.display = 'none';
      return; // Skip slider initialization
    }
    
    // Look for navigation elements in the container instead of slider
    const prevBtn = sliderWrapper?.querySelector('.ob-prev');
    const nextBtn = sliderWrapper?.querySelector('.ob-next');
    const dotsContainer = sliderWrapper?.querySelector('.ob-dots');
    
    	  const autoplay = sliderContainer.dataset.autoplay === 'true';
	  const loop = sliderContainer.dataset.loop === 'true';
	  const marquee = sliderContainer.dataset.marquee === 'true';
	  const cardStack = sliderContainer.dataset.cardStack === 'true'; // Default to false unless specified
	  const stagger = sliderContainer.dataset.stagger === 'true'; // Default to false unless specified
	  const gap = parseInt(sliderContainer.dataset.gap) || 0;
	  const mobileGap = parseInt(sliderContainer.dataset.mobileGap) || 60;
	  const desktopGap = parseInt(sliderContainer.dataset.desktopGap) || 20;
    const slideBy = sliderContainer.dataset.slideBy || '1'; // '1' for one at a time, 'all' for all visible slides
    const dragScroll = sliderContainer.dataset.dragScroll !== 'false'; // Default to true if not specified
    const touchpad = sliderContainer.dataset.touchpad === 'true'; // Default to false unless specified
    const marqueeSpeed = parseInt(sliderContainer.dataset.marqueeSpeed) || 1; // Pixels per frame
    const marqueePause = sliderContainer.dataset.marqueePause !== 'false'; // Default to true if not specified
	  const centerWhenFewerSlides = sliderContainer.dataset.centerWhenFewerSlides === 'true'; // New setting for centering behavior

    let slidesPerView = getSlidesPerView();
    let currentIndex = loop ? slidesPerView : 0;
    let slideWidth = 0;
    let autoplayInterval;
    let marqueeAnimation;
    let lastTimestamp = 0;
    let isPaused = false;  // Move isPaused to main scope
    
    // Drag scroll variables
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;
    let dragStartTime = 0;
    let dragStartX = 0;
    let dragStartY = 0;
    let lastDragTime = 0;
    let lastDragX = 0;
    let velocity = 0;
    let isTouchpad = false; // Track if we're using touchpad
    let touchpadStartX = 0; // Track touchpad swipe start position
    let touchpadAccumulatedDelta = 0; // Track accumulated touchpad swipe
    const DRAG_THRESHOLD = 2; // Even more sensitive
    const CLICK_TIME_THRESHOLD = 150; // Faster response
    const SWIPE_VELOCITY_THRESHOLD = 0.3; // Lower threshold for easier swipes
    const MOMENTUM_FACTOR = 0.95; // Momentum decay factor
    const TOUCHPAD_THRESHOLD = 0.5; // Threshold for touchpad detection
    const TOUCHPAD_SWIPE_THRESHOLD = 10; // Minimum swipe amount to start dragging
    	  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

    // Add drag scroll event listeners
    function addDragScrollListeners() {
		if (!dragScroll) return; // Allow drag scroll for card-stack mode
      
      slidesWrapper.addEventListener('mousedown', dragStart);
      slidesWrapper.addEventListener('touchstart', dragStart, { passive: false });
      slidesWrapper.addEventListener('mouseup', dragEnd);
      slidesWrapper.addEventListener('touchend', dragEnd);
      slidesWrapper.addEventListener('mousemove', drag);
      slidesWrapper.addEventListener('touchmove', drag, { passive: false });
      slidesWrapper.addEventListener('mouseleave', dragEnd);

      	  // Add touchpad gesture event listeners
	  if (touchpad) {
		slidesWrapper.addEventListener('wheel', handleWheel, { passive: false });
	  }
	  
	  // Prevent horizontal wheel scrolling on all devices
	  slidesWrapper.addEventListener('wheel', (e) => {
		// Only prevent horizontal scrolling (deltaX), allow vertical scrolling (deltaY)
		if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
		  e.preventDefault();
		  e.stopPropagation();
		}
	  }, { passive: false });
	  
	  // Also prevent horizontal scrolling on the slider container
	  sliderContainer.addEventListener('wheel', (e) => {
		if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
		  e.preventDefault();
		  e.stopPropagation();
		}
	  }, { passive: false });
	  
	  // Prevent horizontal scrolling on the parent container too
	  if (sliderWrapper) {
		sliderWrapper.addEventListener('wheel', (e) => {
		  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
			e.preventDefault();
			e.stopPropagation();
		  }
		}, { passive: false });
	  }
	  
	  // Add a more aggressive approach - prevent horizontal scrolling on the entire section
	  const sectionElement = sliderContainer.closest('[data-section-id]');
	  if (sectionElement) {
		sectionElement.addEventListener('wheel', (e) => {
		  if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
			e.preventDefault();
			e.stopPropagation();
		  }
		}, { passive: false });
	  }

      // Prevent default drag behavior on images
      const images = slidesWrapper.querySelectorAll('img');
      images.forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
      });

      // Handle clicks on links
      const links = slidesWrapper.querySelectorAll('a');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          const now = Date.now();
          const timeDiff = now - dragStartTime;
          const distance = Math.sqrt(
            Math.pow(e.clientX - dragStartX, 2) + 
            Math.pow(e.clientY - dragStartY, 2)
          );

          // If it's a quick tap/click and didn't move much, allow it
          if (timeDiff < CLICK_TIME_THRESHOLD && distance < DRAG_THRESHOLD) {
            return; // Allow the click
          }
          e.preventDefault(); // Prevent the click
        });
      });
    }

    	  // Handle wheel events (including trackpad gestures)
	  function handleWheel(event) {
		if (!touchpad) return;

      // Check if this is a horizontal trackpad gesture
      const isHorizontalGesture = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      
      if (isHorizontalGesture) {
        event.preventDefault();
        
        // For card-stack mode, don't allow wheel gestures to move the slides wrapper
        if (cardStack) {
          return;
        }
        
        // Start dragging if we haven't already
        if (!isDragging) {
          isDragging = true;
          isTouchpad = true;
          touchpadStartX = event.clientX;
          touchpadAccumulatedDelta = 0;
          dragStartTime = Date.now();
          lastDragTime = dragStartTime;
          
          // Get current position
          const style = window.getComputedStyle(slidesWrapper);
          const matrix = new WebKitCSSMatrix(style.transform);
          prevTranslate = matrix.m41;
          currentTranslate = prevTranslate;
          
          // Stop autoplay and marquee
          stopAutoplay();
          if (marqueeAnimation) {
            cancelAnimationFrame(marqueeAnimation);
          }
        }
        
        // Accumulate the horizontal movement
        touchpadAccumulatedDelta += event.deltaX;
        
        // Calculate velocity
        const currentTime = Date.now();
        const timeDiff = currentTime - lastDragTime;
        velocity = timeDiff > 0 ? event.deltaX / timeDiff : 0;
        lastDragTime = currentTime;
        
        // Update position
        currentTranslate = prevTranslate + touchpadAccumulatedDelta;
        
        // Apply bounds checking
        if (!loop) {
          const maxTranslate = 0;
          const minTranslate = -(slideWidth + gap) * (slides.length - slidesPerView);
          currentTranslate = Math.min(Math.max(currentTranslate, minTranslate), maxTranslate);
        }
        
        // Update the transform
        slidesWrapper.style.transition = 'none';
        slidesWrapper.style.transform = `translateX(${currentTranslate}px)`;
        
        // Update current index
        const slideStep = slideWidth + gap;
        currentIndex = Math.round(Math.abs(currentTranslate) / slideStep);
        
        // Update dots if they exist
        if (dotsContainer) updateDots();
        
        // If this is the last wheel event in the gesture
        if (event.deltaMode === 0 && Math.abs(event.deltaX) < 0.1) {
          handleGestureEnd(event);
        }
      }
    }

    function dragStart(event) {
      // Only prevent default for mouse events or if we're actually dragging
      if (event.type.includes('mouse') || isDragging) {
        event.preventDefault();
      }
      
      dragStartTime = Date.now();
      dragStartX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
      dragStartY = event.type.includes('mouse') ? event.clientY : event.touches[0].clientY;
      lastDragTime = dragStartTime;
      lastDragX = dragStartX;
      velocity = 0;

      if (marquee) {
        stopMarquee();
        isDragging = true;
        startPos = getPositionX(event);
        slidesWrapper.style.cursor = 'grabbing';
        slidesWrapper.style.userSelect = 'none';
        
        const style = window.getComputedStyle(slidesWrapper);
        const matrix = new WebKitCSSMatrix(style.transform);
        prevTranslate = matrix.m41;
        return;
      }
      
      isDragging = true;
      startPos = getPositionX(event);
      slidesWrapper.style.cursor = 'grabbing';
      slidesWrapper.style.userSelect = 'none';
      
      stopAutoplay();
      if (marqueeAnimation) {
        cancelAnimationFrame(marqueeAnimation);
      }
      
      const style = window.getComputedStyle(slidesWrapper);
      const matrix = new WebKitCSSMatrix(style.transform);
      prevTranslate = matrix.m41;
    }

    function drag(event) {
      if (!isDragging) return;
      
      // Only prevent default for mouse events or if we're actually dragging
      if (event.type.includes('mouse') || Math.abs(currentTranslate - prevTranslate) > DRAG_THRESHOLD) {
        event.preventDefault();
      }
      
      const currentPosition = getPositionX(event);
      const currentTime = Date.now();
      const diff = currentPosition - startPos;
      
      // Calculate velocity
      const timeDiff = currentTime - lastDragTime;
      const distanceDiff = currentPosition - lastDragX;
      velocity = timeDiff > 0 ? distanceDiff / timeDiff : 0;
      
      // Update last drag values
      lastDragTime = currentTime;
      lastDragX = currentPosition;
      
      // Only consider it a drag if we've moved more than the threshold
      if (Math.abs(diff) > DRAG_THRESHOLD) {
        isDragging = true;
      }
      
      currentTranslate = prevTranslate + diff;
      
      // For touchpad, use a different sensitivity
      if (isTouchpad) {
        currentTranslate = prevTranslate + (diff * 0.5); // Reduce sensitivity for touchpad
      }
		
		// For card-stack mode, handle drag differently
		if (cardStack) {
		  // In card-stack mode, we don't move the slides wrapper
		  // Instead, we'll handle the drag end to change slides
		  return;
		}
      
      // For marquee, allow continuous dragging
      if (marquee) {
        const totalWidth = (slideWidth + gap) * slides.length;
        if (loop) {
          // Handle wrapping for continuous dragging
          if (currentTranslate > 0) {
            currentTranslate = currentTranslate % totalWidth;
          } else if (Math.abs(currentTranslate) > totalWidth) {
            currentTranslate = -(Math.abs(currentTranslate) % totalWidth);
          }
        } else {
          // Non-looping marquee: limit to content bounds
          const minTranslate = -(slideWidth + gap) * (allSlides.length - slidesPerView);
          const maxTranslate = 0;
          currentTranslate = Math.min(Math.max(currentTranslate, minTranslate), maxTranslate);
        }
        
        // Use transform3d for better performance
        slidesWrapper.style.transition = 'none';
        slidesWrapper.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
        return;
      }
      
      // Regular slider drag handling
      if (!loop) {
		  // If there are fewer slides than slides per view, limit dragging to maintain centering
		  if (slides.length <= slidesPerView && centerWhenFewerSlides) {
			const maxDragDistance = 50; // Allow small amount of drag for visual feedback
			const centeringOffset = (sliderContainer.offsetWidth - ((slideWidth + gap) * slides.length - gap)) / 2;
			const minTranslate = centeringOffset - maxDragDistance;
			const maxTranslate = centeringOffset + maxDragDistance;
			currentTranslate = Math.min(Math.max(currentTranslate, minTranslate), maxTranslate);
		  } else {
        const maxTranslate = 0;
			const minTranslate = -(slideWidth + gap) * Math.max(0, slides.length - slidesPerView);
        currentTranslate = Math.min(Math.max(currentTranslate, minTranslate), maxTranslate);
		  }
      }
      
      slidesWrapper.style.transition = 'none';
      slidesWrapper.style.transform = `translateX(${currentTranslate}px)`;
    }

    function applyMomentum(initialVelocity) {
      let currentVelocity = initialVelocity;
      let currentPosition = currentTranslate;
      
      function animate() {
        if (Math.abs(currentVelocity) < 0.1) {
          // Snap to nearest slide
          const slideStep = slideWidth + gap;
          const rawIndex = Math.round(Math.abs(currentPosition) / slideStep);
          const snapPosition = -rawIndex * slideStep;
          
          slidesWrapper.style.transition = 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
          slidesWrapper.style.transform = `translateX(${snapPosition}px)`;
          
          // Update current index and restart autoplay
          currentIndex = Math.round(Math.abs(snapPosition) / slideStep);
          if (autoplay) startAutoplay();
          return;
        }
        
        currentVelocity *= MOMENTUM_FACTOR;
        currentPosition += currentVelocity;
        
        // Check bounds
        if (!loop) {
          const maxTranslate = 0;
          const minTranslate = -(slideWidth + gap) * (slides.length - slidesPerView);
          currentPosition = Math.min(Math.max(currentPosition, minTranslate), maxTranslate);
        }
        
        slidesWrapper.style.transform = `translateX(${currentPosition}px)`;
        requestAnimationFrame(animate);
      }
      
      requestAnimationFrame(animate);
    }

    function dragEnd(event) {
      if (!isDragging) return;
      
      const now = Date.now();
      const timeDiff = now - dragStartTime;
      const endX = event.type.includes('mouse') ? event.clientX : event.changedTouches[0].clientX;
      const endY = event.type.includes('mouse') ? event.clientY : event.changedTouches[0].clientY;
      const distance = Math.sqrt(
        Math.pow(endX - dragStartX, 2) + 
        Math.pow(endY - dragStartY, 2)
      );

      // Calculate final velocity
      const finalTimeDiff = now - lastDragTime;
      const finalDistanceDiff = isTouchpad ? touchpadAccumulatedDelta : (endX - lastDragX);
      const finalVelocity = finalTimeDiff > 0 ? finalDistanceDiff / finalTimeDiff : 0;

      isDragging = false;
      isTouchpad = false;
      touchpadAccumulatedDelta = 0;
      slidesWrapper.style.cursor = 'grab';
      slidesWrapper.style.userSelect = '';

      // Only process drag movement if we actually dragged
      if (distance > DRAG_THRESHOLD || (isTouchpad && Math.abs(touchpadAccumulatedDelta) > TOUCHPAD_SWIPE_THRESHOLD)) {
        if (marquee) {
          // Get final position from wrapper's transform
          const style = window.getComputedStyle(slidesWrapper);
          const matrix = new WebKitCSSMatrix(style.transform);
          const currentOffset = Math.abs(matrix.m41);
          
          // Calculate the modulo to get the correct position
          const totalWidth = (slideWidth + gap) * slides.length;
          const normalizedOffset = currentOffset % totalWidth;
          
          // Calculate the nearest snap point
          const slideStep = slideWidth + gap;
          const rawIndex = Math.round(normalizedOffset / slideStep);
          const snapPosition = rawIndex * slideStep;
          
          // Animate to the snap point with smoother easing
          slidesWrapper.style.transition = 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)';
          slidesWrapper.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
          
          // Wait for the snap animation to complete before starting marquee
          setTimeout(() => {
            startMarquee(currentTranslate);
          }, 1000); // Increased delay before resuming marquee
          return;
        }
  
		  // Card-stack mode drag end handling
		  if (cardStack) {
			const movedBy = currentTranslate - prevTranslate;
			
			// Determine direction and change slide
			if (Math.abs(movedBy) > 50) { // Minimum drag distance
			  if (movedBy < 0) {
				// Dragged left - go to next slide
				nextSlide();
			  } else {
				// Dragged right - go to previous slide
				prevSlide();
			  }
			}
			return;
		  }

        // Regular slider drag end handling
        const movedBy = currentTranslate - prevTranslate;
        
		  // If there are fewer slides than slides per view, always snap back to center
		  if (slides.length <= slidesPerView && centerWhenFewerSlides) {
			centerSlides();
		  } else {
			// Apply momentum scrolling for regular sliders
        if (Math.abs(finalVelocity) > SWIPE_VELOCITY_THRESHOLD) {
          applyMomentum(finalVelocity * 16); // Scale velocity for smoother animation
        } else if (Math.abs(movedBy) > slideWidth / 5) { // Even more sensitive threshold
          if (movedBy < 0) {
            if (loop || currentIndex < slides.length - slidesPerView) {
              nextSlide();
            } else {
              moveToSlide(currentIndex);
            }
          } else {
            if (loop || currentIndex > 0) {
              prevSlide();
            } else {
              moveToSlide(currentIndex);
            }
          }
        } else {
          // Return to original position
          moveToSlide(currentIndex);
			}
        }
      }
      
      // Restart autoplay if enabled
      if (autoplay) {
        startAutoplay();
      }
    }

    function getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

	  // Clone slides for infinite loop or marquee (but not for card-stack)
	  if ((loop && !marquee && !cardStack) || (marquee && loop)) {
      if (marquee) {
        // For marquee, clone all slides at start and end
        // Create clones in correct order
        const originalSlides = Array.from(slides);
        
        // Create clones in the same order as original slides
        const clonesBefore = originalSlides.map(slide => slide.cloneNode(true));
        const clonesAfter = originalSlides.map(slide => slide.cloneNode(true));
        
        // Add clones in correct order
        // Add before clones in reverse order to maintain original order
        for (let i = clonesBefore.length - 1; i >= 0; i--) {
          slidesWrapper.insertBefore(clonesBefore[i], slidesWrapper.firstChild);
        }
        
        // Add after clones in original order
        clonesAfter.forEach(clone => slidesWrapper.appendChild(clone));
        
        // Set initial position to start at first original slide (middle set)
        const totalWidth = (slideWidth + gap) * slides.length;
        slidesWrapper.style.transform = `translate3d(-${totalWidth}px, 0, 0)`;
        currentTranslate = -totalWidth;
      } else {
        // For regular loop, only clone visible slides
        const clonesBefore = slides.slice(-slidesPerView).map(slide => slide.cloneNode(true));
        const clonesAfter = slides.slice(0, slidesPerView).map(slide => slide.cloneNode(true));
        clonesBefore.forEach(clone => slidesWrapper.insertBefore(clone, slidesWrapper.firstChild));
        clonesAfter.forEach(clone => slidesWrapper.appendChild(clone));
      }
    }

    const allSlides = Array.from(slidesWrapper.children);

    function getSlidesPerView() {
      const width = window.innerWidth;
      if (width >= 1024) return parseInt(sliderContainer.dataset.slidesLg) || 4;
      if (width >= 768) return parseInt(sliderContainer.dataset.slidesMd) || 3;
      return parseInt(sliderContainer.dataset.slidesMobile) || 1; // Default to 1 on mobile
    }

    function getSlideStep() {
      return slideBy === 'all' ? slidesPerView : parseInt(slideBy);
    }

	  function applyCardStackEffect() {
		if (!cardStack) return;
		
		// Set up slides wrapper for card-stack
		slidesWrapper.style.display = 'flex';
		slidesWrapper.style.justifyContent = 'center';
		slidesWrapper.style.alignItems = 'center';
		slidesWrapper.style.position = 'relative';
		slidesWrapper.style.height = '100%';
		
		// Apply card-stack positioning to each slide
		slides.forEach((slide, index) => {
		  slide.style.transition = 'all 0.5s ease';
		  slide.style.position = 'absolute';
		  slide.style.left = '50%';
		  slide.style.top = '50%';
		  slide.style.marginLeft = '-160px'; // Half of card width (320px)
		  slide.style.marginTop = '-224px'; // Half of card height (448px)
		  slide.style.width = '320px';
		  slide.style.height = '448px';
		  
		  // Calculate relative position from current index
		  let relativeIndex = index - currentIndex;
		  
		  // Handle looping for card-stack
		  if (loop) {
			// Normalize relative index for looping
			if (relativeIndex > slides.length / 2) {
			  relativeIndex -= slides.length;
			} else if (relativeIndex < -slides.length / 2) {
			  relativeIndex += slides.length;
			}
		  }
		  
		  // Always show all slides, but position them based on distance from current
		  if (relativeIndex === 0) {
			// Active slide (center)
			const rotation = stagger ? 'rotate(0deg)' : '';
			slide.style.transform = `translateZ(0) scale(1) ${rotation}`;
			slide.style.zIndex = '3';
			slide.style.opacity = '1';
		  } else if (relativeIndex === -1) {
			// Previous slide (left side)
			const rotation = stagger ? 'rotate(-3deg)' : '';
			// Use responsive gap values
			const isMobile = window.innerWidth < 768;
			const currentGap = isMobile ? mobileGap : desktopGap;
			const translateX = isMobile ? `-${80 + currentGap/10}%` : `-${60 + currentGap/10}%`;
			slide.style.transform = `translateX(${translateX}) translateZ(-100px) scale(0.8) ${rotation}`;
			slide.style.zIndex = '2';
			slide.style.opacity = '1';
		  } else if (relativeIndex === 1) {
			// Next slide (right side)
			const rotation = stagger ? 'rotate(3deg)' : '';
			// Use responsive gap values
			const isMobile = window.innerWidth < 768;
			const currentGap = isMobile ? mobileGap : desktopGap;
			const translateX = isMobile ? `${80 + currentGap/10}%` : `${60 + currentGap/10}%`;
			slide.style.transform = `translateX(${translateX}) translateZ(-100px) scale(0.8) ${rotation}`;
			slide.style.zIndex = '2';
			slide.style.opacity = '1';
		  } else {
			// All other slides - position them in a fan pattern with optional rotation
			const isMobile = window.innerWidth < 768;
			const currentGap = isMobile ? mobileGap : desktopGap;
			const offset = isMobile ? relativeIndex * (40 + currentGap/2) : relativeIndex * (40 + currentGap/4);
			const scale = Math.max(0.6, 1 - Math.abs(relativeIndex) * 0.1); // Scale down based on distance
			const rotation = stagger ? `rotate(${relativeIndex * 2}deg)` : ''; // Rotate based on position if stagger enabled
			
			slide.style.transform = `translateX(${offset}%) translateZ(-${Math.abs(relativeIndex) * 50}px) scale(${scale}) ${rotation}`;
			slide.style.zIndex = Math.max(0, 3 - Math.abs(relativeIndex));
			slide.style.opacity = '1'; // All slides fully opaque
		  }
		});
	  }

    function updateSlideDimensions() {
      slidesPerView = getSlidesPerView();
      const totalGap = gap * (slidesPerView - 1);
      slideWidth = (sliderContainer.offsetWidth - totalGap) / slidesPerView;
      
		if (cardStack) {
		  // For card-stack mode, don't apply regular slide dimensions
		  // Preserve the container height
		  sliderContainer.style.height = '600px';
		  applyCardStackEffect();
		} else {
		  // Set gap and slide dimensions for regular mode
      slidesWrapper.style.gap = `${gap}px`;
      allSlides.forEach(slide => {
        slide.style.width = `${slideWidth}px`;
        slide.style.flexShrink = '0';
        slide.style.flexBasis = `${slideWidth}px`;
      });

      if (marquee) {
        const totalWidth = setMarqueeBasePosition();
         if (!io) {
            io = new IntersectionObserver((entries) => {
              const entry = entries[0];
              if (entry.isIntersecting) {
                if (!hasActivatedMarquee) {
                  hasActivatedMarquee = true;
                  setMarqueeBasePosition();
                }
                startMarquee(totalWidth);
              } else {
                stopMarquee();
              }
            }, { root: null, rootMargin: '100px', threshold: 0.01 });

            io.observe(sliderContainer);
          }
		  } else {
			// Check if we need to center the slides
			if (slides.length <= slidesPerView && centerWhenFewerSlides) {
			  centerSlides();
      } else {
        // Update regular slider position
        moveToSlide(currentIndex, false);
			}
      }
		}
		
		// Update navigation button states after dimension changes
		updateNavigationButtons();
    }

    function moveToSlide(index, animate = true) {
		if (cardStack) {
		  // For card-stack mode, just update the current index and reapply the effect
		  currentIndex = index;
		  applyCardStackEffect();
		  return;
		}
		
      let offset;
      if (loop) {
        offset = (slideWidth + gap) * index;
      } else {
        // Calculate the maximum index to prevent white space
        const maxIndex = slides.length - slidesPerView;
        // Clamp the index to prevent going beyond the last valid position
        const clampedIndex = Math.min(index, maxIndex);
        offset = (slideWidth + gap) * clampedIndex;
      }
      
      slidesWrapper.style.transition = animate ? 'transform 0.5s ease' : 'none';
      slidesWrapper.style.transform = `translateX(-${offset}px)`;
	  }

  // Function to center slides when there are fewer slides than slides per view
  function centerSlides() {
	if (slides.length <= slidesPerView && centerWhenFewerSlides) {
	  // Calculate the total width of all slides
	  const totalSlidesWidth = (slideWidth + gap) * slides.length - gap; // Subtract gap since last slide doesn't need it
	  const containerWidth = sliderContainer.offsetWidth;
	  
	  // Calculate the centering offset
	  const centeringOffset = (containerWidth - totalSlidesWidth) / 2;
	  
	  // Apply centering transform
	  slidesWrapper.style.transition = 'none';
	  slidesWrapper.style.transform = `translateX(${centeringOffset}px)`;
	  
	  // Update current translate for drag functionality
	  currentTranslate = centeringOffset;
	  prevTranslate = centeringOffset;
	  
	  console.log('🎯 Centering slides:', {
		slidesCount: slides.length,
		slidesPerView: slidesPerView,
		totalSlidesWidth: totalSlidesWidth,
		containerWidth: containerWidth,
		centeringOffset: centeringOffset
	  });
	}
    }

    function startMarquee(initialOffset = 0) {
      if (!marquee || isPaused) {
        return;
      }
      
      const totalWidth = (slideWidth + gap) * slides.length;
      let currentOffset = initialOffset;

      function animateMarquee(timestamp) {
        if (isPaused) {
          return;
        }
        
        if (!lastTimestamp) lastTimestamp = timestamp;
        const elapsed = timestamp - lastTimestamp;
        
        if (elapsed > 16) { // Cap at ~60fps
          currentOffset += marqueeSpeed;
          
          if (loop) {
            // Looping marquee: wrap around
            if (currentOffset >= totalWidth * 2) {
              // Reset to middle set when we reach the end of the second set
              currentOffset = currentOffset % totalWidth;
              slidesWrapper.style.transition = 'none';
              slidesWrapper.style.transform = `translate3d(-${totalWidth + currentOffset}px, 0, 0)`;
            }
          } else {
            // Non-looping marquee: stop at the end
            const maxOffset = (slideWidth + gap) * (allSlides.length - slidesPerView);
            if (currentOffset >= maxOffset) {
              currentOffset = maxOffset;
              slidesWrapper.style.transition = 'none';
              slidesWrapper.style.transform = `translate3d(-${currentOffset}px, 0, 0)`;
              return; // Stop animation
            }
          }
          
          // Use transform3d for better performance
          slidesWrapper.style.transition = 'none';
          slidesWrapper.style.transform = `translate3d(-${currentOffset}px, 0, 0)`;
          lastTimestamp = timestamp;
        }
        
        if (!isPaused) {
          marqueeAnimation = requestAnimationFrame(animateMarquee);
        }
      }
      
      marqueeAnimation = requestAnimationFrame(animateMarquee);
    }

    function stopMarquee() {
      if (marqueeAnimation) {
        cancelAnimationFrame(marqueeAnimation);
        marqueeAnimation = null;
        lastTimestamp = 0;
      }
    }

    // Add pause on hover for marquee
    if (marquee && marqueePause) {
      let currentMarqueeAnimation = null;
      let touchStartTime = 0;
      let touchStartY = 0;

      const handleMouseEnter = (event) => {
        if (!isPaused) {
          isPaused = true;
          stopMarquee();
        }
      };

      const handleMouseLeave = (event) => {
        if (isPaused) {
          isPaused = false;
          const style = window.getComputedStyle(slidesWrapper);
          const matrix = new WebKitCSSMatrix(style.transform);
          const currentOffset = Math.abs(matrix.m41);
          const totalWidth = (slideWidth + gap) * slides.length;
          
          // Ensure we're in the middle set
          let normalizedOffset = currentOffset % totalWidth;
          if (normalizedOffset < 0) {
            normalizedOffset += totalWidth;
          }
          
          // Reset animation state
          lastTimestamp = 0;
          marqueeAnimation = null;
          
          // Start from the current position
          startMarquee(normalizedOffset);
        }
      };

      const handleTouchStart = (event) => {
        touchStartTime = Date.now();
        touchStartY = event.touches[0].clientY;
        handleMouseEnter(event);
      };

      const handleTouchEnd = (event) => {
        const touchEndY = event.changedTouches[0].clientY;
        const verticalSwipe = Math.abs(touchEndY - touchStartY) > 50;
        
        // Only resume if it wasn't a vertical swipe
        if (!verticalSwipe) {
          handleMouseLeave(event);
        }
      };

      // Add event listeners
      sliderContainer.addEventListener('mouseenter', handleMouseEnter);
      sliderContainer.addEventListener('mouseleave', handleMouseLeave);
      sliderContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
      sliderContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    function initializeDots() {
      if (!dotsContainer) return;
      
      const dots = dotsContainer.querySelectorAll('.ob-dot');
      if (!dots.length) return;
      
      // Add click listeners to existing dots
      dots.forEach((dot) => {
        const dotIndex = parseInt(dot.dataset.dotIndex);
        dot.addEventListener('click', () => {
			if (cardStack) {
			  currentIndex = dotIndex;
			} else {
          currentIndex = loop ? dotIndex + slidesPerView : dotIndex;
			}
          moveToSlide(currentIndex);
          updateDots();
        });
      });
      
      // Set initial active state
      updateDots();
    }

    function updateDots() {
      if (!dotsContainer) return;
      
      const dots = dotsContainer.querySelectorAll('.ob-dot');
      if (!dots.length) return;
      
      dots.forEach(dot => dot.classList.remove('active'));
		let activeIndex;
		if (cardStack) {
		  activeIndex = currentIndex;
		} else {
		  activeIndex = loop ? currentIndex - slidesPerView : currentIndex;
		}
      const activeDot = dotsContainer.querySelector(`[data-dot-index="${activeIndex}"]`);
      if (activeDot) {
        activeDot.classList.add('active');
		}
	  }
  
	    function updateNavigationButtons() {
	if (!prevBtn && !nextBtn) return;
	
	let maxIndex;
	if (cardStack) {
	  maxIndex = slides.length - 1;
	} else {
	  maxIndex = slides.length - slidesPerView;
	}
	
	// Update prev button opacity
	if (prevBtn) {
	  if (loop || currentIndex > 0) {
		prevBtn.style.opacity = '1';
		prevBtn.style.pointerEvents = 'auto';
	  } else {
		prevBtn.style.opacity = '0.1';
		prevBtn.style.pointerEvents = 'none';
	  }
	}
	
	// Update next button opacity
	if (nextBtn) {
	  if (loop || currentIndex < maxIndex) {
		nextBtn.style.opacity = '1';
		nextBtn.style.pointerEvents = 'auto';
	  } else {
		nextBtn.style.opacity = '0.1';
		nextBtn.style.pointerEvents = 'none';
	  }
      }
    }

    function nextSlide() {
      const step = getSlideStep();
	if (cardStack) {
	  // For card-stack mode, simple index increment
      if (loop) {
		currentIndex = (currentIndex + step) % slides.length;
	  } else {
		currentIndex = Math.min(currentIndex + step, slides.length - 1);
	  }
	  moveToSlide(currentIndex);
	  if (dotsContainer) updateDots();
	  updateNavigationButtons();
	} else if (loop) {
        currentIndex += step;
        moveToSlide(currentIndex);
        if (currentIndex === allSlides.length - slidesPerView) {
          setTimeout(() => {
            currentIndex = slidesPerView;
            moveToSlide(currentIndex, false);
            if (dotsContainer) updateDots();
		  updateNavigationButtons();
          }, 500);
        } else {
          if (dotsContainer) updateDots();
		updateNavigationButtons();
        }
      } else {
	  const maxIndex = Math.max(0, slides.length - slidesPerView);
        if (currentIndex < maxIndex) {
          currentIndex = Math.min(currentIndex + step, maxIndex);
          moveToSlide(currentIndex);
          if (dotsContainer) updateDots();
		updateNavigationButtons();
        }
      }
    }

    function prevSlide() {
      const step = getSlideStep();
	if (cardStack) {
	  // For card-stack mode, simple index decrement
      if (loop) {
		currentIndex = (currentIndex - step + slides.length) % slides.length;
	  } else {
		currentIndex = Math.max(currentIndex - step, 0);
	  }
	  moveToSlide(currentIndex);
	  if (dotsContainer) updateDots();
	  updateNavigationButtons();
	} else if (loop) {
        currentIndex -= step;
        moveToSlide(currentIndex);
        if (currentIndex === 0) {
          setTimeout(() => {
            currentIndex = allSlides.length - (2 * slidesPerView);
            moveToSlide(currentIndex, false);
            if (dotsContainer) updateDots();
		  updateNavigationButtons();
          }, 500);
        } else {
          if (dotsContainer) updateDots();
		updateNavigationButtons();
        }
      } else {
        if (currentIndex > 0) {
          currentIndex = Math.max(currentIndex - step, 0);
          moveToSlide(currentIndex);
          if (dotsContainer) updateDots();
		updateNavigationButtons();
        }
      }
    }

    function startAutoplay() {
      if (autoplay) {
        autoplayInterval = setInterval(nextSlide, 5000);
      }
    }

    function stopAutoplay() {
      if (autoplayInterval) {
        clearInterval(autoplayInterval);
      }
    }

    // Initialize navigation elements if they exist
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopAutoplay();
        stopMarquee();
        prevSlide();
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopAutoplay();
        stopMarquee();
        nextSlide();
        startAutoplay();
      });
    }

    if (dotsContainer) {
      initializeDots();
    }

    window.addEventListener('resize', () => {
      updateSlideDimensions();
		// Re-center slides if needed after resize
		if (slides.length <= slidesPerView && centerWhenFewerSlides) {
		  setTimeout(() => {
			centerSlides();
		  }, 100); // Small delay to ensure dimensions are updated
		}
    });

    // Initialize slider with a small delay to ensure layout is ready
    setTimeout(() => {
      updateSlideDimensions();
      if (!marquee && !cardStack) {
        // Check if we need to center the slides
        if (slides.length <= slidesPerView && centerWhenFewerSlides) {
          centerSlides();
        } else {
          moveToSlide(currentIndex, false);
        }
        startAutoplay();
      } else if (cardStack) {
        // For card-stack, ensure proper initialization
        applyCardStackEffect();
        startAutoplay();
      }
      
      // Fade in the slides wrapper after initialization
      if (slidesWrapper) {
        slidesWrapper.style.opacity = '1';
      }
    }, 50); // Small delay to ensure layout is ready
	  
	  // Initialize navigation button states
	  updateNavigationButtons();
    
    // Add drag scroll functionality
    addDragScrollListeners();
  }

  // Initialize all sliders
  sliders.forEach(slider => {
    try {
      initializeSlider(slider);
    } catch (error) {
      console.error('Error initializing slider:', error);
      // Mark this slider as failed but continue with others
      slider.dataset.sliderEnabled = 'false';
      slider.style.overflow = 'visible';
    }
  });

  // Global function to manually reinitialize sliders (useful after section updates)
  window.reinitializeSliders = function(container = document) {
    console.log('🔄 Manually reinitializing sliders in:', container);
    const sliders = container.querySelectorAll('.ob-slider');
    console.log(`Found ${sliders.length} sliders to reinitialize`);
    
    sliders.forEach(slider => {
      try {
        // Remove from initialized set to allow reinitialization
        initializedSliders.delete(slider);
        initializeSlider(slider);
        initializedSliders.add(slider);
        console.log('✅ Successfully reinitialized slider:', slider);
      } catch (error) {
        console.error('❌ Error reinitializing slider:', error, slider);
        slider.dataset.sliderEnabled = 'false';
        slider.style.overflow = 'visible';
      }
    });
  };

  // Listen for reinitialization events
  document.addEventListener('sliderReinitialize', (event) => {
    const { sliderId } = event.detail;
    const sliderContainer = document.querySelector(`#${sliderId} .ob-slider`);
    
    if (sliderContainer) {
      try {
        // Clean up any existing event listeners and intervals
        const slidesWrapper = sliderContainer.querySelector('.ob-slides-wrappers');
        if (slidesWrapper) {
          const newSlidesWrapper = slidesWrapper.cloneNode(true);
          sliderContainer.replaceChild(newSlidesWrapper, slidesWrapper);
        }
        
        initializeSlider(sliderContainer);
      } catch (error) {
        console.error('Error reinitializing slider:', error);
        // Mark this slider as failed but continue with others
        sliderContainer.dataset.sliderEnabled = 'false';
        sliderContainer.style.overflow = 'visible';
      }
    }
  });

  // Keep track of initialized sliders
  const initializedSliders = new Set();

  // Create a MutationObserver to watch for dynamically added sliders
  const sliderObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        // Check if the added node is an element
        if (node.nodeType === 1) {
          // Check if the added node is a slider
          if (node.classList && node.classList.contains('ob-slider') && !initializedSliders.has(node)) {
            console.log('🆕 Found new slider element:', node);
            try {
              initializeSlider(node);
              initializedSliders.add(node);
              console.log('✅ Successfully initialized new slider');
            } catch (error) {
              console.error('❌ Error initializing slider:', error);
              node.dataset.sliderEnabled = 'false';
              node.style.overflow = 'visible';
            }
          }
          
          // Check for sliders inside the added node
          const sliders = node.querySelectorAll('.ob-slider');
          if (sliders.length > 0) {
            console.log(`🔍 Found ${sliders.length} sliders inside added node:`, node);
          }
          sliders.forEach(slider => {
            if (!initializedSliders.has(slider)) {
              console.log('🆕 Found nested slider element:', slider);
              try {
                initializeSlider(slider);
                initializedSliders.add(slider);
                console.log('✅ Successfully initialized nested slider');
              } catch (error) {
                console.error('❌ Error initializing nested slider:', error);
                slider.dataset.sliderEnabled = 'false';
                slider.style.overflow = 'visible';
              }
            }
          });
        }
      });
    });
  });

  // Start observing the entire document for added nodes
  sliderObserver.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
});
