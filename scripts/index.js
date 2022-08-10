const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = popup.querySelector('.popup__close-icon');
const popupContainer = popup.querySelector('.popup__container');

let popupForm = popup.querySelector('.popup__form');
let nameInput = popupForm.querySelector('popup__name');
let jobInput = popupForm.querySelector('popup__job');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

const togglePopup = function () {
  popup.classList.toggle('popup__opened');
}

popup.addEventListener('click', function(event) {
  if (event.target === event.currentTarget) {
    togglePopup();
  }
})

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    togglePopup();
}

editButton.addEventListener('click', togglePopup)
closeButton.addEventListener('click', togglePopup)
popupForm.addEventListener('submit', formSubmitHandler);
