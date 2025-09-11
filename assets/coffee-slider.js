document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".js-slider-header");
  const contentWrapper = document.getElementById("coffee-content-wrapper");

  headers.forEach(header => {
    header.addEventListener("click", function () {
      // Remove "coffee-active" from all headers
      headers.forEach(h => h.classList.remove("coffee-active"));

      // Add "coffee-active" to the clicked one
      this.classList.add("coffee-active");

      // Get data-number from the closest .header-wrapper
      const wrapper = this.closest(".header-wrapper");
      const pos = wrapper ? wrapper.dataset.number : 1;
      console.log(pos);

      // Calculate scroll position
      const windowWidth = window.innerWidth;
      const targetScrollPosition = windowWidth * (pos - 1);

      // Smooth scroll horizontally
      contentWrapper.scrollTo({
        left: targetScrollPosition,
        behavior: "smooth"
      });
    });
  });
});
