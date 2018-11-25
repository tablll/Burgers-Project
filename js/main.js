
// slider 

const scrollLeft = document.querySelector('.burgers__nav-left');
const scrollRight = document.querySelector('.burgers__nav-right');
const burgersList = document.querySelectorAll(".burgers__page");
let countPage = 0;
const countMax = burgersList.length;

scrollRight.addEventListener('click', function(e){
    e.preventDefault();
    scrollLeft.style.opacity = '1';
    if (countPage !== countMax-1) {
        burgersList[countPage].classList.remove('burgers__page-visible');
        countPage = (countPage+1);
        burgersList[countPage].classList.add('burgers__page-visible');
    } else {
        this.style.opacity = '0.5';
    }
    });

scrollLeft.addEventListener('click', function(e){
    e.preventDefault();
    scrollRight.style.opacity = '1';
    if (countPage !== 0) {
        burgersList[countPage].classList.remove('burgers__page-visible');
        countPage = (countPage-1);
        burgersList[countPage].classList.add('burgers__page-visible');
    } else  {
        this.style.opacity = '0.5';
    }
    });

// scrollRight.addEventListener('click', function(e){
//     e.preventDefault();
//         if (countPage !== countMax-1) {
//             burgersList[countPage].classList.remove('burgers__page-visible');
//             countPage += 1;
//             burgersList[countPage].classList.add('burgers__page-visible');
//         }  
//         else {
//             burgersList[countPage].classList.remove('burgers__page-visible');
//             countPage = 0;
//             burgersList[countPage].classList.add('burgers__page-visible');
//         }
//     });

// Open---close logic for sections "Team" and "Menu"

const  menuSection = document.querySelectorAll(".menu__item");
const  menuCross = document.querySelectorAll(".menu__item-cross");
const  teamSection = document.querySelectorAll(".team__acc-item");

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

// Ajax

const mail = "maxim.mvm@gmail.com";
const sendForm = document.querySelector('#sendForm');
const sendButton = document.querySelector('#sendButton');
const error = document.querySelector('.error');

sendButton.addEventListener('click', function(e) {
    e.preventDefault();

    if (validateForm(sendForm)) {

        var formData = new FormData();
        formData.append("name", sendForm.elements.name.value);
        formData.append("phone", sendForm.elements.name.value);
        formData.append("comment", sendForm.elements.name.value);
        formData.append("to", mail);
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
        xhr.send(formData);
        xhr.addEventListener ('load', function(){
            if (xhr.response.status) {
                console.log(xhr.response);
                overlaySuccess();
            } else {
                console.log('что-то пошло не так');
                overlayFailure();
            }
        })
    }
});

function validateForm (form) {
    let valid = true;
        if (!validateField(form.elements.name)) {
            valid = false;
        }
        if (!validateField(form.elements.telephone)) {
            valid = false;
        }
    return valid;
};

function validateField(field) {
    if (!field.checkValidity()) {
        field.nextElementSibling.textContent = field.validationMessage;
        return false;
    } else {
        error.textContent = '';
        return true;
    }
};


// // Section Form overlay
const sectionForm = document.querySelector('.form');
const successOverlay = createFormOverlay("Ваш заказ успешно отправлен!");
const failureOverlay = createFormOverlay("Что-то сломалось... Попробуйте еще раз или позвоните нам!");

function overlaySuccess () {
    sectionForm.appendChild(successOverlay);
};

function overlayFailure () {
    sectionForm.appendChild(failureOverlay);
};

function createFormOverlay(content) {
  const overlayElement = document.createElement("div");
  overlayElement.classList.add("overlay");

  const template = document.querySelector("#overlayTemplate2");
  overlayElement.innerHTML = template.innerHTML;

  const closeElement = overlayElement.querySelector(".overlay__btn");
  closeElement.addEventListener("click", function(e) {
    e.preventDefault();
    sectionForm.removeChild(overlayElement);
  });

  const contentElement = overlayElement.querySelector(".content");
  contentElement.innerHTML = content;

  return overlayElement;
}

