/* Global variables */
// This is used for filtering cards in section "More"
let moreTabs = document.getElementsByClassName("more-tabs__tab");
let moreTabsActiveClassName = "more-tabs__tab--active";

/* Main execution */

solveNavbar();
solveHamburger();
solveTechTabs();


/* METHODS */

/* Opens the navbar if hidden and apply animation on hamburger */
function solveHamburger() {
    let hamburger = document.getElementsByClassName("hero-navbar__hamburger")[0];

    /* Only creating a switch for the hamburger */
    hamburger.addEventListener("click", (e) => {
        if (hamburger.classList.contains("active")) {
            hamburger.classList.remove("active")
        } else {
            hamburger.classList.add("active")
        }
    })
}

/* Solve navbar behaviour - position fixed when scrolling down & active element detection */
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

/* Position navbar to be fixed after scrolling to certain point */
function solveFixedNavbar() {
    let navbar = document.getElementById("hero-navbar-container");
    /* Take the initial page Y offset - how many pixels are between the top of the page and the top of the screen view of the page */
    let pageYOffset = window.pageYOffset

    /* If the offset is > 500, then make the navbar fixed */
    if (pageYOffset > 500 && !navbar.classList.contains("fixed")) {
        navbar.classList.add("fixed")            
    } else if (pageYOffset <= 500 && navbar.classList.contains("fixed")) {
        navbar.classList.remove("fixed")
    }
}

/* Depending on the section we are looking at, the navbar's active item will change */
function solveActiveNavbarTabs() {
    let anchorsAndLimits = getAnchorsAndLimits();
    /* Take the initial page Y offset - how many pixels are between the top of the page and the top of the screen view of the page */
    let pageYOffset = window.pageYOffset

    for (let object of anchorsAndLimits) {
        if (pageYOffset >= object.upLimit && pageYOffset < object.downLimit) {
            object.anchor.classList.add("navbar-item--active")
        } else {
            object.anchor.classList.remove("navbar-item--active")            
        }
    }
}

/* Get pixels offset for every section to detect when we enter one */
function getAnchorsAndLimits() {
    let objects = []

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (!anchor.classList.contains("navbar-item"))
            return

        let bodyRect = document.body.getBoundingClientRect();
        let section = document.querySelector(anchor.getAttribute('href')).getBoundingClientRect()

        let upLimit = section.top - bodyRect.top - 50
        let downLimit = section.bottom - bodyRect.top - 50

        objects.push({
            anchor: anchor,
            upLimit: upLimit,
            downLimit: downLimit
        });
    });

    objects[objects.length - 2].downLimit -= 150 // Solve a bug in which Contact tab from navbar couldn't be highlightet
    objects[objects.length - 1].upLimit -= 150

    return objects;
}

/* Filter tech cards by pressing tech tabs */
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

/* Active effect for tech-tabs. When one is pressed, then make it active and the others inactive */
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

/* Make invisible all the cards that are not the desired type - the one from active tab */
function solveActiveCards(type) {
    let filterReset = type === ""; /* No type means no filter, then we should reset filters */
    let invisibleClass = "invisible";

    let cards = document.getElementsByClassName("more-cards__card-wrapper")
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

function removeClassFromElements(elements, className) {
    for (let tab of elements) {
        tab.classList.remove(className)
    }    
}


/* We do this here, because I want the HTML to be easily readable */
let htmlMarkdown = `<div style="background: #ffffff; overflow:auto;width:auto;border:solid #2d2b6d;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #007700">&lt;div</span> <span style="color: #0000CC">id=</span><span style="background-color: #fff0f0">&quot;hero&quot;</span><span style="color: #007700">&gt;</span>
    <span style="color: #007700">&lt;navbar</span> <span style="color: #0000CC">id=</span><span style="background-color: #fff0f0">&quot;main-navbar&quot;</span><span style="color: #007700">&gt;</span>
        <span style="color: #007700">&lt;a</span> <span style="color: #0000CC">href=</span><span style="background-color: #fff0f0">&quot;#home-section&quot;</span> <span style="color: #0000CC">class=</span><span style="background-color: #fff0f0">&quot;logo&quot;</span><span style="color: #007700">&gt;</span>
            ...
        <span style="color: #007700">&lt;/a&gt;</span>
        <span style="color: #007700">&lt;div</span> <span style="color: #0000CC">class=</span><span style="background-color: #fff0f0">&quot;hamburger&quot;</span><span style="color: #007700">&gt;</span>
            <span style="color: #007700">&lt;span&gt;&lt;/span&gt;</span>
            <span style="color: #007700">&lt;span&gt;&lt;/span&gt;</span>
            <span style="color: #007700">&lt;span&gt;&lt;/span&gt;</span>
        <span style="color: #007700">&lt;/div&gt;</span>
        <span style="color: #007700">&lt;div</span> <span style="color: #0000CC">class=</span><span style="background-color: #fff0f0">&quot;hero-navbar__container&quot;</span><span style="color: #007700">&gt;</span>
            <span style="color: #007700">&lt;a</span> <span style="color: #0000CC">href=</span><span style="background-color: #fff0f0">&quot;#home-section&quot;</span> <span style="color: #0000CC">class=</span><span style="background-color: #fff0f0">&quot;navbar-item navbar-item--active&quot;</span><span style="color: #007700">&gt;</span>Home<span style="color: #007700">&lt;/a&gt;</span>
            <span style="color: #007700">&lt;a</span> <span style="color: #0000CC">href=</span><span style="background-color: #fff0f0">&quot;#about-section&quot;</span> <span style="color: #0000CC">class=</span><span style="background-color: #fff0f0">&quot;navbar-item&quot;</span><span style="color: #007700">&gt;</span>About<span style="color: #007700">&lt;/a&gt;</span>
            <span style="color: #007700">&lt;a</span> <span style="color: #0000CC">href=</span><span style="background-color: #fff0f0">&quot;#contact-section&quot;</span> <span style="color: #0000CC">class=</span><span style="background-color: #fff0f0">&quot;navbar-item&quot;</span><span style="color: #007700">&gt;</span>Contact<span style="color: #007700">&lt;/a&gt;</span>
        <span style="color: #007700">&lt;/div&gt;</span>
    <span style="color: #007700">&lt;/navbar&gt;</span>

    <span style="color: #007700">&lt;h1</span> <span style="color: #0000CC">class=</span><span style="background-color: #fff0f0">&quot;hero-title&quot;</span><span style="color: #007700">&gt;</span>My title goes here<span style="color: #007700">&lt;/h1&gt;</span>
    
    <span style="color: #007700">&lt;span&gt;</span>- my subtitle -<span style="color: #007700">&lt;/span&gt;</span>

<span style="color: #007700">&lt;/div&gt;</span>
</pre></td></tr></table></div>`;

let sassMarkdown = `<div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #996633">$primary</span><span style="color: #333333">       :</span> <span style="color: #005588; font-weight: bold">#2d2b6d</span>
<span style="color: #996633">$maxWidthBody</span><span style="color: #333333">  :</span> <span style="color: #0000DD; font-weight: bold">1920</span><span style="color: #333399; font-weight: bold">px</span>


<span style="color: #888888">/* Align with display flex */</span>
<span style="color: #008800; font-weight: bold">@mixin</span><span style="color: #0066BB; font-weight: bold"> align</span>(<span style="color: #996633">$hAlign</span><span style="color: #333333">,</span> <span style="color: #996633">$vAlign</span><span style="color: #333333">,</span> <span style="color: #996633">$column</span><span style="color: #333333">:</span> false)
    <span style="color: #0000CC">display</span><span style="color: #333333">:</span> flex
    <span style="color: #008800; font-weight: bold">@if</span> (<span style="color: #996633">$column</span>)
        <span style="color: #0000CC">flex-flow</span><span style="color: #333333">:</span> column
    <span style="color: #0000CC">justify-content</span><span style="color: #333333">:</span> <span style="color: #996633">$hAlign</span>
    <span style="color: #0000CC">align-items</span><span style="color: #333333">:</span> <span style="color: #996633">$vAlign</span>

<span style="color: #008800; font-weight: bold">@mixin</span><span style="color: #0066BB; font-weight: bold"> square</span>(<span style="color: #996633">$l</span>)
    <span style="color: #0000CC">width</span><span style="color: #333333">:</span> <span style="color: #996633">$l</span>
    <span style="color: #0000CC">height</span><span style="color: #333333">:</span> <span style="color: #996633">$l</span>

<span style="color: #007700">body</span>
    <span style="color: #0000CC">margin</span><span style="color: #333333">:</span> <span style="color: #0000DD; font-weight: bold">0</span>
    <span style="color: #0000CC">max-width</span><span style="color: #333333">:</span> <span style="color: #996633">$maxWidthBody</span>
    <span style="color: #BB0066; font-weight: bold">.hero</span>
        <span style="color: #0000CC">width</span><span style="color: #333333">:</span> <span style="color: #0000DD; font-weight: bold">100</span><span style="color: #333399; font-weight: bold">%</span>
        <span style="color: #BB0066; font-weight: bold">...</span>
        <span style="color: #BB0066; font-weight: bold">.logo</span>
            <span style="color: #008800; font-weight: bold">@include</span><span style="color: #555555; font-weight: bold"> align</span>(<span style="color: #003366; font-weight: bold">center</span><span style="color: #333333">,</span> <span style="color: #003366; font-weight: bold">center</span>)
            <span style="color: #0000CC">padding</span><span style="color: #333333">:</span> <span style="color: #0000DD; font-weight: bold">10</span><span style="color: #333399; font-weight: bold">px</span>
        <span style="color: #BB0066; font-weight: bold">.hamburder</span>
            <span style="color: #008800; font-weight: bold">@include</span><span style="color: #555555; font-weight: bold"> square</span>(<span style="color: #0000DD; font-weight: bold">30</span><span style="color: #333399; font-weight: bold">px</span>)
            <span style="color: #BB0066; font-weight: bold">...</span>
</pre></td></tr></table></div>
 `;

let jsMarkdown = `<div style="background: #ffffff; overflow:auto;width:auto;border:solid gray;border-width:.1em .1em .1em .8em;padding:.2em .6em;"><table><tr><td><pre style="margin: 0; line-height: 125%"> 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13</pre></td><td><pre style="margin: 0; line-height: 125%"><span style="color: #888888">/* Opens the navbar if hidden and apply animation on hamburger */</span>
<span style="color: #008800; font-weight: bold">function</span> solveHamburger() {
    <span style="color: #008800; font-weight: bold">let</span> hamburger <span style="color: #333333">=</span> <span style="color: #007020">document</span>.getElementsByClassName(<span style="background-color: #fff0f0">"hero-navbar__hamburger"</span>)[<span style="color: #0000DD; font-weight: bold">0</span>];

    <span style="color: #888888">/* Only creating a switch for the hamburger */</span>
    hamburger.addEventListener(<span style="background-color: #fff0f0">"click"</span>, (e) <span style="color: #333333">=></span> {
        <span style="color: #008800; font-weight: bold">if</span> (hamburger.classList.contains(<span style="background-color: #fff0f0">"active"</span>)) {
            hamburger.classList.remove(<span style="background-color: #fff0f0">"active"</span>)
        } <span style="color: #008800; font-weight: bold">else</span> {
            hamburger.classList.add(<span style="background-color: #fff0f0">"active"</span>)
        }
    })
}
</pre></td></tr></table></div>`;

window.onload = (e) => {
  let boxHtml = document.getElementById("box__image--html");
  boxHtml.innerHTML = htmlMarkdown 
  let boxSass = document.getElementById("box__image--sass");
  boxSass.innerHTML = sassMarkdown 
  let boxJavascript = document.getElementById("box__image--js");
  boxJavascript.innerHTML = jsMarkdown 
}

