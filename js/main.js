
// Open / close logic for section Team and Menu

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

// End open / close

// Overlay for Reviews section

const openButton = document.querySelectorAll(".btn-overlay");
const template = document.querySelector("#overlayTemplate").innerHTML;
const overlay = createOverlay(template);
const sectionReviews = document.querySelector('.reviews');
const sectionReviewsContent = document.querySelectorAll('.reviews__text');

for (let i =0; i < openButton.length; i++) {
    openButton[i].addEventListener("click", function() {
    overlay.open();
    overlay.setContent(sectionReviewsContent[i].textContent);
    });
}

function createOverlay(template) {
  let fragment = document.createElement('div');

  fragment.innerHTML = template;

  const overlayElement = fragment.querySelector(".overlay");
  const contentElement = fragment.querySelector(".overlay__content");
  const closeElement = fragment.querySelector(".overlay__close");
  
  fragment = null;

  overlayElement.addEventListener("click", e => {
    e.preventDefault();
    if (e.target === overlayElement) {
      closeElement.click();
    }
  });
  closeElement.addEventListener("click", e => {
    e.preventDefault();
    sectionReviews.removeChild(overlayElement);
  });

  return {
    open() {
        sectionReviews.appendChild(overlayElement);
    },
    close() {
      closeElement.click();
    },
    setContent(content) {
      contentElement.innerHTML = content;
    }
  };
}

