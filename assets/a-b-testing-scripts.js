// Show one element by ID and hide another by ID
function showAndHideById(showId, hideId) {
    const showEl = document.getElementById(showId);
    const hideEl = document.getElementById(hideId);

    console.log("show:", showEl, "hide:", hideEl);

    if (hideEl) hideEl.classList.add("hidden");
    if (showEl) showEl.classList.remove("hidden");
}

// Hide multiple elements by class name(s)
function hideByClass(classNames) {
    classNames.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
        elements.forEach(el => {
            console.log("hiding by class:", el);
            el.classList.add("hidden");
        });
    });
}


document.addEventListener("DOMContentLoaded", function () {
    let themeTest = window.cro_default_cohort;


    console.log("testing on theme", themeTest);

    function collectionFilterTestA() {
        console.log("RUNNING TEST: A");
        showAndHideById("hide-a", "placeholder-filter-nav");
    }

    function collectionFilterTestB() {
        console.log("RUNNING TEST: B");
        showAndHideById("hide-b", "placeholder-filter-nav");
    }

    if (themeTest === "a") {
        collectionFilterTestA();
    } else if (themeTest === "b") {
        collectionFilterTestB();
    } else {
        console.log("No matching test for theme:", themeTest);
        collectionFilterTestA();
    }
});
