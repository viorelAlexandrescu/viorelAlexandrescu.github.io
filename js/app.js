var currentLoadedPage, isViewOnMobile;

window.addEventListener("load",onPageLoad);

function onPageLoad(){
    var viewportWidth = window.innerWidth;
    var menuButton = document.getElementById("header-menu-button");
    
    if(viewportWidth >= 1024){
        isViewOnMobile = false;
        menuButton.style.display = "none"
    } else if(viewportWidth <= 600){
        isViewOnMobile = true;
        menuButton.style.display = "block"
    }

    currentLoadedPage = "about";
    pushContainerBelowNavigationBar(16);
    onHeaderElementClick(currentLoadedPage);
}

function onPageScroll() {
    if(isViewOnMobile){
        return;
    } else {
        var name = document.getElementById("myName"),
            pageHeader = document.getElementById("page-header");

        if(getPosition() > 36){
            name.style.display = "none";
            pageHeader.style.paddingTop = "0";
        } else if(getPosition() === 0){
            name.style.display = "block";
            pageHeader.style.paddingTop = "8px";
        }
    }
}

function getPosition(){
    return document.body.scrollTop;
}

function onHeaderElementClick(name){
   var pages = document.getElementsByClassName("content");
    for(var i = 0; i < pages.length; i++){
        if(pages[i].getAttribute("about") != name){
            pages[i].style.display = "none"
        }
    }
    pages[getIndexOfPage(name)].style.display = "block";
}

function pushContainerBelowNavigationBar(pushDistanceValue){
    var container = document.getElementById("container"),
        pageHeader = document.getElementById("page-header");

    container.style.top = (pageHeader.clientHeight + pushDistanceValue) + "px";
}

function getIndexOfPage(name){
    var pages = document.getElementsByClassName("content");
    for(var i = 0; i < pages.length; i++){
        if(pages[i].getAttribute("about") == name){
            return i;
        }
    }
}




