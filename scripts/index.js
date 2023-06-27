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
// Curator Info Overlay:
const curatorButtonObserver = new IntersectionObserver((entry) => {
    if (entry.isIntersecting) {
        document.querySelector("#curatorInfoOverlay iframe").src =
            document.querySelector("#curatorInfoOverlay iframe").getAttribute("data-src");
    };
});
curatorButtonObserver.observe(document.querySelector("#curator button"));
// Film Info Overlay:
const filmGridObserver = new IntersectionObserver((entry) => {
    if (entry.isIntersecting) {
        document.querySelectorAll("#filmInfoOverlay iframe, #filmInfoOverlay img").forEach((element) => {
            element.src = element.getAttribute("data-src");
        });
    };
});
filmGridObserver.observe(document.querySelector("#filmGrid"));

// Curator Info Overlay: Open
function openCuratorInfoOverlay() {
    document.getElementById("curatorInfoOverlay").style.display = "block";
    // Lazy load:
    // document.querySelector("#curatorInfoOverlay iframe").src = document.querySelector("#curatorInfoOverlay iframe").getAttribute("data-src");
    // To prevent scrolling in the normal document flow:
    document.querySelector("body").style.overflow = "hidden";
}

// Curator Info Overlay: Close 
function closeCuratorInfoOverlay() {
    document.getElementById("curatorInfoOverlay").style.display = "none";
    // Resume scrolling in the normal document flow:
    document.querySelector("body").style.overflow = "auto";
    // Stop iframe video playback by reassigning src value:
    document.querySelector("#curatorInfoOverlay iframe").src = 
        document.querySelector("#curatorInfoOverlay iframe").src;
}

// Film Grid: Show All Films
function showAllFilms() {
    document.querySelectorAll("#filmGrid .gridItem").forEach(element => {
        element.style.display = "block";
    })
    // Hide Button "更多放映片"
    document.querySelector("#showAllFilms").style.display = "none";
}

// Film Info Overlay: Open (via clicking on filmGrid child items)
function openFilmInfoOverlay(childOrder) {
    document.getElementById("filmInfoOverlay").style.display = "block";
    let selector = `#filmInfoOverlay > :nth-child(${childOrder})`;
    document.querySelector(selector).style.display = "block";
    document.querySelectorAll(selector + " iframe, " + selector + " img").forEach(element => {
        element.style.display = "none";
        // Lazy load:
        // element.src = element.getAttribute("data-src")
    })
    document.querySelectorAll(selector + " iframe, " + selector + " img")[0].style.display = "block";
    // To prevent scrolling in the normal document flow:
    document.querySelector("body").style.overflow = "hidden";
}

// Film Info Overlay: Close
function closeFilmInfoOverlay() {
    document.getElementById("filmInfoOverlay").style.display = "none";
    document.querySelectorAll("#filmInfoOverlay > *").forEach(element => {
        element.style.display = "none";
    })
    // Resume scrolling in the normal document flow:
    document.querySelector("body").style.overflow = "auto";
    // Reset filmItem textContainer scroll progress: 
    document.querySelectorAll("#filmInfoOverlay .filmItem .textContainer").forEach(element => {
        element.scrollTop = 0;
    })
    // Reset Slide Index of Item Image Slider (see further below):
    slideIndex = 1;
    // Stop iframe video playback by reassigning src value:
    document.querySelectorAll("#filmInfoOverlay iframe").forEach(element => {
        element.src = element.src;
    });
}

// Film Info Overlay: Item Image Slider
let slideIndex = 1;

function rotateSlide(childOrder, slideRotation) {
    // Stop iframe video playback by reassigning src value:
    document.querySelector(`#filmInfoOverlay > :nth-child(${childOrder}) iframe`).src = 
        document.querySelector(`#filmInfoOverlay > :nth-child(${childOrder}) iframe`).src;
    // Rotate Slides:
    showSlide(childOrder, slideIndex += slideRotation);
}

function showSlide(childOrder, n) {
    let currentSlides = document.querySelectorAll(
        `#filmInfoOverlay > :nth-child(${childOrder}) iframe,
        #filmInfoOverlay > :nth-child(${childOrder}) img`);
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
// Film Info Overlay: Item Image Slide Selector