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
    currentLoadedPage = name;
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
function loadDataInAboutPage(){
    var leftInfoPanel = document.createElement("div");
    for(var i = 0; i < aboutData.contactInfoVars.length; ++i){
        var leftInfoValue = document.createElement("p");
        leftInfoValue.innerHTML = aboutData.contactInfoVars[i];
        leftInfoPanel.appendChild(leftInfoValue);
    }
    leftInfoPanel.className = "info-leftPanel";
    
    
    var rightInfoPanel = document.createElement("div");
    for(var i = 0; i < aboutData.contactInfoData.length; i++){
        var rightInfoValue = document.createElement("p");
        rightInfoValue.innerHTML = aboutData.contactInfoData[i];
        rightInfoPanel.appendChild(rightInfoValue);
    }
    rightInfoPanel.className = "info-rightPanel";
    
    var infoPanel = document.getElementById("topInfoContainer");
    infoPanel.appendChild(leftInfoPanel);
    infoPanel.appendChild(rightInfoPanel);
    
    var description = document.createElement("p")
    description.innerHTML = aboutData.description;
    
    var descArea = document.getElementById("description-area");
    descArea.appendChild(description);
    
    var infoArea = document.getElementById("profile-info-area");
    infoArea.appendChild(descArea);
}

function loadDataInResumePage(data, placeholder){
    //arbitrary number of skill per row
    var maxSkillsPerRow = 2;
    var numberOfRows = data.length % maxSkillsPerRow ? 
        (data.length / maxSkillsPerRow) + 1 : data.length / maxSkillsPerRow ;
    // iterator for each skill
    var skillIterator = 0;
    
     for(var rowIterator = 0;
            rowIterator < numberOfRows;
            rowIterator++){
        
        var newRow = document.createElement("div");
        newRow.className = "resume-row";
         
         for(var numberOfSkills = 1;
                numberOfSkills <= maxSkillsPerRow;
                numberOfSkills++){
             
             var newSkill = document.createElement("div");
             newSkill.className = "resume-skill";
             
             var newSkillTitle = document.createElement("h3");
             
             newSkillTitle.innerHTML = data[skillIterator].title;
             
             newSkill.appendChild(newSkillTitle);
             
             var newSkillDescription = document.createElement("p");
             
             newSkillDescription.innerHTML = data[skillIterator].description;
             
             newSkill.appendChild(newSkillDescription);
             
             newRow.appendChild(newSkill);
             placeholder.appendChild(newRow);
             
             skillIterator++;
         }
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
    loadDataInAboutPage();
    loadDataInResumePage(skills, document.getElementById("resume-table"));
    loadDataInResumePage(experience, document.getElementById("experience-table"));
    
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