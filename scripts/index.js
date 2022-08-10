let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = popup.querySelector('.popup__close-icon');
let popupForm = popup.querySelector('.popup__form');
let nameInput = popupForm.querySelector('popup__name');
let jobInput = popupForm.querySelector('popup__job');
let saveButton = popup.querySelector('.popup__save-button');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');

let togglePopup = function () {
  popup.classList.toggle('popup__opened');
}

let namePopup = function () {
  nameInput.setAttribute('value', profileName.textContent);
  jobInput.setAttribute('value', profileJob.textContent);
}


function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    namePopup();
    togglePopup();
}

editButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
saveButton.addEventListener('click', togglePopup);
popupForm.addEventListener('submit', formSubmitHandler);
