const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__edit-button_popup-open');
const closeButton = popup.querySelector('.popup__close-icon');

const togglePopup = function () {
  popup.classList.toggle('popup__opened');
}

openButton.addEventListener('click', togglePopup)
closeButton.addEventListener('click', togglePopup)
