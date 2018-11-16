var menuSection = document.querySelectorAll(".menu__item");
var menuCross = document.querySelectorAll(".menu__item-cross");
var teamSection = document.querySelectorAll(".team__acc-item");


init ();

function init () {
    openMenu(menuSection,'item__show');
    openMenu(teamSection,'show');
}

function openMenu(item, itemClass) {

    for (i=0; i < item.length; i++) {
        item[i].addEventListener('click', function(){
            clearClass (item, itemClass);
            this.classList.add(itemClass);
        });
        item[i].addEventListener('dblclick', function(){
            clearClass (item, itemClass);
        });

    }  
}

function clearClass (item, itemClass) {
    for (i=0; i < item.length; i++) {
        item[i].classList.remove(itemClass);
    }
}

// function closeMenu () {
//     for (i=0; i < menuCross.length; i++) {
//         menuCross[i].addEventListener('click', function(){
//             menuSection[i].classList.remove('item__show');
//         });
//     };
// };


