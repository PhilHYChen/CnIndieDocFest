// Header Stick-to-Top & Scroll Progress Indicator
    window.onscroll = (event) => {
        // Toggle Nav Bar to be fixed on the top:
        (window.scrollY >= document.querySelector("header").offsetTop)?
        document.querySelector("header").classList.add("stickToTop") :
        document.querySelector('header').classList.remove("stickToTop")
        // Set Scroll Progress Bar Width:
        document.getElementById("scrollProgressBar").style.width =
        (window.scrollY / (
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight
        ) * 100 + "%")
    };
    // Assign a new value to CSS :root {--header-height: ;}:
    document.documentElement.style.setProperty(
        "--header-height",
        document.querySelector("header").offsetHeight + "px"
    );
    // The purpose is to provide the immediately adjacent element,
    // header.stickToTop + * {}, i.e., main {}, 
    // a proper margin buffer when header is removed from the normal document flow,
    // due to its position property value changed to "fixed".
    // Unit Test:
    // alert(document.querySelector("nav").offsetHeight + "px");
    
// Nav Menu: Scroll-to-Element
    function scrollToElement(id) {
        document.getElementById(id).scrollIntoView(
            {behavior: "smooth", block: "start", inline: "nearest"}
        );
    };

// Nav Menu: Button
    document.getElementById("navMenuButton").addEventListener("click", () => {
        document.querySelector("nav").classList.toggle("dropdown");
    });


// Nav Menu: Auto-Collapse
    // Only functions when 
    // 1. a child item is clicked upon, and
    // 2. inside a viewport smaller than 1280px.
    document.querySelectorAll("#navMenu *").forEach(element => {
        element.addEventListener("click", () => {
            if (window.innerWidth < 1280) {
                setTimeout(() => {
                    document.querySelector("nav").classList.toggle("dropdown");
                }, 200);
            };
       })
    });

// Lazy Load Non-Display Iframe and Img Elements:
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll("iframe, img").forEach((element) => {
                element.src =element.getAttribute("data-src");
            })
        };
    });
});
sectionObserver.observe(
    document.querySelector("#curator"),
);
sectionObserver.observe(
        document.querySelector("#films"),
);
sectionObserver.observe(
    document.querySelector("#publications")
);

// Overlay: Open
function openOverlay(section, childOrder) {
    // Disable scrolling in Normal Flow:
    document.querySelector("body").style.overflow = "hidden";
    // Open overlay:
    document.querySelector(section + " .overlay").style.display = "block";
    // Display one specified child item:
    let displayItem = document.querySelector(section + ` .overlay > :nth-child(${childOrder})`);
    displayItem.style.display = "block";
    // Reset media display order:
    let displayItemMedia = displayItem.querySelectorAll("iframe, img")
    displayItemMedia.forEach(element => {
        element.style.display = "none";
    })
    displayItemMedia[0].style.display = "block";
}

// Overlay: Close
function closeOverlay() {
    // Resume Scrolling in Normal Flow:
    document.querySelector("body").style.overflow = "auto";
    // Close overlay:
    document.querySelectorAll(".overlay").forEach(element => {
        element.style.display = "none";
    });
    // Hide all child items:
    document.querySelectorAll(".overlay > *").forEach(element => {
        element.style.display = "none";
    })
    // Reset filmItem textContainer scroll progress: 
    document.querySelectorAll(".overlay .textContainer").forEach(element => {
        element.scrollTop = 0;
    })
    // Reset Slide Index of Item Image Slider (see: // Film Overlay: Item Image Slider):
    slideIndex = 1;
    // Stop iframe video playback by reassigning src value:
    document.querySelectorAll(".overlay iframe").forEach(element => {
        element.src = element.src;
    });

}

// Overlay: Item Image Slider
let slideIndex = 1;

function rotateSlide(childOrder, slideRotation) {
    // Stop iframe video playback by reassigning src value:
    document.querySelector(`#films .overlay > :nth-child(${childOrder}) iframe`).src = 
        document.querySelector(`#films .overlay > :nth-child(${childOrder}) iframe`).src;
    // Rotate Slides:
    showSlide(childOrder, slideIndex += slideRotation);
}

function showSlide(childOrder, n) {
    let currentSlides = document.querySelectorAll(
        `#films .overlay > :nth-child(${childOrder}) iframe,
        #films .overlay > :nth-child(${childOrder}) img`);
    if (n > currentSlides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = currentSlides.length
    }
    for (i=0; i < currentSlides.length; i++) {
        currentSlides[i].style.display = "none";
    }
    currentSlides[slideIndex - 1].style.display = "block";
}

// Film Grid: Show All Films
function showAllFilms() {
    document.querySelectorAll("#films .gridContainer .gridItem").forEach(element => {
        element.style.display = "block";
    })
    // Hide Button "更多放映片"
    document.querySelector("#showAllFilms").style.display = "none";
}