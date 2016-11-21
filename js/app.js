var currentLoadedPage, isViewOnMobile, isMenuButtonClicked;

function getPosition() {
    return document.body.scrollTop;
}

function hideList() {
    isMenuButtonClicked = !isMenuButtonClicked;
    var headerList = document.getElementById("header-list");
    headerList.className = "hidden-header-list";
}

function getIndexOfPage(name) {
    var pages = document.getElementsByClassName("content"),
        iterator;
    for (iterator = 0; iterator < pages.length; iterator++) {
        if (pages[iterator].getAttribute("about") == name) {
            return iterator;
        }
    }
}

function pushContainerBelowHeader(pushDistanceValue) {
    var container = document.getElementById("container"),
        pageHeader = document.getElementById("page-header");

    container.style.top = (pageHeader.clientHeight + pushDistanceValue) + "px";
}

function onHeaderElementClick(name) {
    var pages = document.getElementsByClassName("content"),
        i;
    for (i = 0; i < pages.length; i++) {
        if (pages[i].getAttribute("about") != name) {
            pages[i].style.display = "none";
        }
    }
    pages[getIndexOfPage(name)].style.display = "block";
    if (isViewOnMobile) {
        hideList();
    }
}

function onPageLoad() {
    var viewportWidth = window.innerWidth,
        menuButton = document.getElementById("header-menu-button");
    
    if (viewportWidth >= 1024) {
        isViewOnMobile = false;
    } else if (viewportWidth <= 600 || (viewportWidth > 600 || viewportWidth < 1023)) {
        isViewOnMobile = true;

        var container = document.getElementById("container");
        container.onclick = function () {
            hideList();
        };

        isMenuButtonClicked = false;
        menuButton.onclick = function () {
            isMenuButtonClicked = !isMenuButtonClicked;
            var headerList = document.getElementById("header-list");
            if (isMenuButtonClicked) {
                headerList.className = "shown-header-list";
            } else {
                headerList.className = "hidden-header-list";
            }
        };
    }

    currentLoadedPage = "about";
    pushContainerBelowHeader(24);
    onHeaderElementClick(currentLoadedPage);
}

function onPageScroll() {
    if (isViewOnMobile) {
        return;
    } else {
        var name = document.getElementById("myName"),
            pageHeader = document.getElementById("page-header");

        if (getPosition() > 36) {
            name.style.display = "none";
            pageHeader.style.paddingTop = "0";
        } else if (getPosition() === 0) {
            name.style.display = "block";
            pageHeader.style.paddingTop = "8px";
        }
    }
}

window.addEventListener("load", onPageLoad);