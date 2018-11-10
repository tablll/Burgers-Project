function openMenu() {
    const menuItem = document.querySelectorAll(".menu__item");

    for (i=0; i < menuItem.length; i++) {
    
        menuItem[i].addEventListener('click', function(){
            this.classList.toggle('item__show');
        });
        menuItem[i].addEventListener('dblclick', function(){
            this.classList.remove('item__show');
        });
    }  
}

openMenu();
