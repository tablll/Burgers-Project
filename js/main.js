
init ();

function init () {
    openMenu();
    openTeamInfo();
}

function openMenu() {
    const menuItem = document.querySelectorAll(".menu__item");

    for (i=0; i < menuItem.length; i++) {
    
        menuItem[i].addEventListener('click', function(){
            this.classList.toggle('item__show');
        });
    }  
}

function openTeamInfo() {
    const teamInfo = document.querySelectorAll(".team__acc-item");

    for (i=0; i < teamInfo.length; i++) {
    
        teamInfo[i].addEventListener('click', function(){
            this.classList.toggle('show');
        });
    }  
}


