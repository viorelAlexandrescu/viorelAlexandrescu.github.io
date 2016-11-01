var currentLoadedPage;

window.addEventListener("load",onPageLoad);

function onPageLoad(){
    pushContainerBelowNavigationBar(16);
    currentLoadedPage = "about";
    onHeaderElementClick(currentLoadedPage);
}

function onPageScroll() {
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




