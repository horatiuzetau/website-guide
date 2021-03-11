/* Global variables */
// This is used for filtering cards in section "More"
let moreTabs = document.getElementsByClassName("more__tabs__tab");
let moreTabsActiveClassName = "more__tabs__tab--active";

/* Main execution */

solveNavbar();
solveTechTabs();


/* METHODS */

function solveNavbar() {
    /* Call these here for initialization */
    solveFixedNavbar();
    solveActiveNavbarTabs()

    document.addEventListener("scroll", (e) => {
        /* Call these two here, because we want them updated for every scroll action */
        solveFixedNavbar()
        solveActiveNavbarTabs()
    });  
}

function solveTechTabs() {

    for (let tab of moreTabs) {
        tab.addEventListener("click", (e) => {
            /* Store if we added active class, because if we didn't we want our filter to reset */
            let added = solveActiveTab(e.target)
            let type = e.target.attributes.getNamedItem("data-type").value
            /* Add invisible class to every card that does not have the specific type */
            solveActiveCards(added ? type : "")
        })
    }
}

function solveFixedNavbar() {
    let navbar = document.getElementById("hero-navbar");
    /* Take the initial page Y offset - how many pixels are between the top of the page and the top of the screen view of the page */
    let pageYOffset = window.pageYOffset

    /* If the offset is > 500, then make the navbar fixed */
    if (pageYOffset > 500 && !navbar.classList.contains("fixed")) {
        navbar.classList.add("fixed")            
    } else if (pageYOffset <= 500 && navbar.classList.contains("fixed")) {
        navbar.classList.remove("fixed")
    }
}

function solveActiveNavbarTabs() {
    let anchorsAndLimits = getAnchorsAndLimits();
    /* Take the initial page Y offset - how many pixels are between the top of the page and the top of the screen view of the page */
    let pageYOffset = window.pageYOffset

    for (let object of anchorsAndLimits) {
        if (pageYOffset >= object.upLimit && pageYOffset < object.downLimit) {
            object.anchor.classList.add("hero__tabs__item--active")
        } else {
            object.anchor.classList.remove("hero__tabs__item--active")            
        }
    }
}

function getAnchorsAndLimits() {
    let objects = []

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains("hero__tabs__item"))
            return

        let bodyRect = document.body.getBoundingClientRect();
        let section = document.querySelector(anchor.getAttribute('href')).getBoundingClientRect()

        let upLimit = section.top - bodyRect.top
        let downLimit = section.bottom - bodyRect.top

        objects.push({
            anchor: anchor,
            upLimit: upLimit,
            downLimit: downLimit
        });
    });

    return objects;
}

function removeClassFromElements(elements, className) {
    for (let tab of elements) {
        tab.classList.remove(className)
    }    
}

function solveActiveTab(target) {
    /* Find active element */
    let activeElement = document.getElementsByClassName(moreTabsActiveClassName);
    /* If is the same target, behave slightly differently */
    let sameTarget = target === activeElement[0]

    /* Remove active element, if exists */
    if (activeElement.length) {
        activeElement[0].classList.remove(moreTabsActiveClassName)
    }

    /* Add active to clicked element */
    if (!sameTarget) {
        target.classList.add(moreTabsActiveClassName);
        return true; // return true because we did add active class
    }
    return false; // return false because we did not add active class
}

function solveActiveCards(type) {
    let filterReset = type === ""; /* No type means no filter, then we should reset filters */
    let invisibleClass = "invisible";

    let cards = document.getElementsByClassName("more__card-wrapper")
    if (filterReset) {
        /* We reset the invisible filter */
        removeClassFromElements(cards, invisibleClass)
    } else {
        for (let card of cards) {
            /* Take the card type */
            let attribute = card.attributes.getNamedItem("data-type"); 
            let cardType = attribute !== null ? attribute.value : "";
            
            if (cardType !== type) {
                /* If the card does not have the selected type, then make it invisible */
                card.classList.add(invisibleClass)
            } else {
                /* Else remove its invisiblity */
                card.classList.remove(invisibleClass)
            }
        }
    }
}


