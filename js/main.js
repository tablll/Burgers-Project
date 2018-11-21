
// Open---close logic for sections "Team" and "Menu"

var menuSection = document.querySelectorAll(".menu__item");
var menuCross = document.querySelectorAll(".menu__item-cross");
var teamSection = document.querySelectorAll(".team__acc-item");


init();

function init() {
    openMenu(menuSection, 'item__show');
    openMenu(teamSection, 'show');
};

function openMenu(item, itemClass) {

    for (let i = 0; i < item.length; i++) {
        item[i].addEventListener('click', function () {
            if (this.classList.contains(itemClass)) {
                this.classList.remove(itemClass);
            }
            else {
                clearClass(item, itemClass);
                this.classList.add(itemClass);
            }
        });
    }
};

for (let i = 0; i < menuCross.length; i++) {
    menuCross[i].addEventListener('click', function () {
        clearClass(menuSection, 'item__show');
        event.stopPropagation();
    })
};

function clearClass(item, itemClass) {
    for (let i = 0; i < item.length; i++) {
        item[i].classList.remove(itemClass);
    }
};

// Overlay for "Reviews" section

const openButton = document.querySelectorAll(".btn-overlay");
const template = document.querySelector("#overlayTemplate").innerHTML;
const overlay = createOverlay(template);
const sectionReviews = document.querySelector('.reviews');
const sectionReviewsContent = document.querySelectorAll('.reviews__text');
const sectionReviewsTitle = document.querySelectorAll('.reviews__name');

for (let i = 0; i < openButton.length; i++) {
    openButton[i].addEventListener("click", function () {
        overlay.open();
        overlay.setTitle(sectionReviewsTitle[i].textContent);
        overlay.setContent(sectionReviewsContent[i].textContent);
    });
};

function createOverlay(template) {
    let fragment = document.createElement('div');

    fragment.innerHTML = template;

    const overlayElement = fragment.querySelector(".overlay");
    const contentTitle = fragment.querySelector(".overlay__title");
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
        setTitle(content) {
            contentTitle.innerHTML = content;
        },
        setContent(content) {
            contentElement.innerHTML = content;
        }
    };
};

// Yandex Map 

window.onload = function () {

    ymaps.ready(init);

    var myPlacemarks = [
        {
            latitude: 59.971353,
            longitude: 30.310140,
            hintContent: "<div class='map__hint'> Mr Burger на Петроградской </div>", 
            balloonContent: [
                '<div class="map__balloon">',
                '<div className="map__adress"><em>Адрес:</em> ул. Профессора Попова, 27</div>',
                '<div className="map__worktime"><em>Часы работы:</em> 11:00 - 24:00</div>',
                '</div>'
                ]
        },
        {
            latitude: 59.945322, 
            longitude: 30.380773,
            hintContent: "<div class='map__hint'> Mr Burger на Калужском </div>", 
            balloonContent: [
                '<div class="map__balloon">',
                '<div className="map__adress"><em>Адрес:</em> Калужский пер., 9</div>',
                '<div className="map__worktime"><em>Часы работы:</em> 11:00 - 24:00</div>',
                '</div>'
                ]  
        },
        {
            latitude: 59.916896, 
            longitude: 30.493641,
            hintContent: "<div class='map__hint'> Mr Burger в Кудрово </div>", 
            balloonContent: [
                '<div class="map__balloon">',
                '<div className="map__adress"><em>Адрес:</em> ул. Подвойского, 35к1</div>',
                '<div className="map__worktime"><em>Часы работы:</em> 11:00 - 24:00</div>',
                '</div>'
                ]   
        },
        {
            latitude: 59.888904, 
            longitude: 30.317280,
            hintContent: "<div class='map__hint'> Mr Burger на Заставской </div>", 
            balloonContent: [
                '<div class="map__balloon">',
                '<div className="map__adress"><em>Адрес:</em> ул. Заставская, 31к2</div>',
                '<div className="map__worktime"><em>Часы работы:</em> 11:00 - 23:00</div>',
                '</div>'
                ]  
        }
    ];

    var myAllMarks = [];
    
    function init() {

        var myMap = new ymaps.Map("map", {
            center: [59.945834, 30.315856],
            zoom: 12,
            controls: ['zoomControl'],
            behaviors: ['drag']
        });

        for (var i = 0; i < myPlacemarks.length; i++) {
            myAllMarks[i] = new ymaps.Placemark([myPlacemarks[i].latitude, myPlacemarks[i].longitude], 
                {
                hintContent: myPlacemarks[i].hintContent,
                balloonContent: myPlacemarks[i].balloonContent.join('')
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: '../icons/map-marker.svg',
                    iconImageSize: [50, 60],
                    iconImageOffset: [-20, -62]
                }
                );  
                myMap.geoObjects.add(myAllMarks[i]);
         }

         
    }
};