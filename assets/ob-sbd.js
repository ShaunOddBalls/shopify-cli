document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener('click', function (event) {
    if (event.target && event.target.matches('.js-sbd-tab')) {
      var thisObj = event.target;
      
      // Remove 'sbd-active' class from all tabs
      var tabs = document.querySelectorAll('.js-sbd-tab');
      tabs.forEach(function(tab) {
        tab.classList.remove('sbd-active');
      });

      // Add 'sbd-active' class to the clicked tab
      thisObj.classList.add('sbd-active');

      // Update the URL hash
      window.location.hash = thisObj.id;

      // Show/hide tab contents based on the tab clicked
      var tabContents = document.querySelectorAll('.js-sbd-tab-contents');
      tabContents.forEach(function(content) {
        if (thisObj.id.toLowerCase() === content.dataset.name.toLowerCase()) {
          content.style.display = '';
        } else {
          content.style.display = 'none';
        }
      });
    }
  });

  // Check URL for hash
  var sbdhash = window.location.hash.substring(1); // Remove the '#'
  var initialTab = null;

  if (sbdhash) {
    sbdhash = sbdhash.toLowerCase();
    initialTab = document.getElementById(sbdhash);
    if (!initialTab) {
      initialTab = null;
    }
  }

  // Trigger click on the appropriate tab
  if (initialTab) {
    initialTab.click();
  } else {
    var firstTab = document.querySelector('.js-sbd-tab');
    if (firstTab) firstTab.click();
  }
});
