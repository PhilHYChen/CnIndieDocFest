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
    
// Nav Menu Scroll-to-Element
    function scrollToElement(id) {
        document.getElementById(id).scrollIntoView(
            {behavior: "smooth", block: "start", inline: "nearest"}
        );
    };

// Nav Menu Button
    document.getElementById("navMenuButton").addEventListener("click", () => {
        document.querySelector("nav").classList.toggle("dropdown");
    });