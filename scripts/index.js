import { initialCards } from './data.js';
import Card from './card.js';
/*import FormValidator from './FormValidator.js';*/

// Объявление переменных

// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

// Кнопки
const buttonEdit = document.querySelector('.profile__button_edit');
const buttonAdd = document.querySelector('.profile__button_add');
const buttonEditClose = popupEdit.querySelector('.popup__button_close');
const buttonAddClose = popupAdd.querySelector('.popup__button_close');
const buttonSaveEdit = popupEdit.querySelector('.popup__button_save');
const buttonSaveAdd = popupAdd.querySelector('.popup__button_save');

// Формы
const popupFormEdit = popupEdit.querySelector('.popup__form_type_edit');
const popupFormAdd = popupAdd.querySelector('.popup__form_type_add');

// Инпуты
const nameInput = popupFormEdit.querySelector('.popup__input_type_name');
const jobInput = popupFormEdit.querySelector('.popup__input_type_job');
const placeNameInput = popupFormAdd.querySelector('.popup__input_type_place-name');
const imageSourceInput = popupFormAdd.querySelector('.popup__input_type_image-source');

// Другое
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const cardElement = document.querySelector('.cards');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'error_visible'
}

// Объявление функций

// Функция добавления значений в инпуты, попап редактирования
function addPopupFormValue() {
  nameInput.setAttribute('value', profileName.textContent);
  jobInput.setAttribute('value', profileJob.textContent);
}

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleCloseByEscape);
  popup.addEventListener('click', handleCloseByOverlay);
}

function handleEditFormClick() {
  addPopupFormValue();
  openPopup(popupEdit);
  setActiveButtonState(buttonSaveEdit, validationConfig);
}

function handleAddFormClick() {
  openPopup(popupAdd);
  setInactiveButtonState(buttonSaveAdd, validationConfig);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleCloseByEscape);
  popup.removeEventListener('click', handleCloseByOverlay);
}

function closeEditPopup() {
  closePopup(popupEdit);
}

function closeAddPopup() {
  closePopup(popupAdd);
}

// Функция закрытия попапа через Esc
function handleCloseByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Функция закрытия попапа кликом на оверлей
function handleCloseByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// Функция редактирования профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeEditPopup();
}

// Функция добавления новой карточки пользователем
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const title = placeNameInput.value;
  const image = imageSourceInput.value;
  const objectCard = {
    name: title,
    link: image
  }
  cardElement.prepend(createCard(objectCard));
  closeAddPopup();
  popupFormAdd.reset();
}

function createCard(object) {
  const newCard = new Card(object, '.template');
  return newCard.generateCard();
}

initialCards.forEach((item) => {
  const cardElement = createCard(item);

  // Добавляем в DOM
  document.querySelector('.cards').prepend(cardElement);
});

// Добавление обработчиков

// Обработчики событий на кнопки
buttonEdit.addEventListener('click', handleEditFormClick);
buttonAdd.addEventListener('click', handleAddFormClick);

buttonEditClose.addEventListener('click', closeEditPopup);
buttonAddClose.addEventListener('click', closeAddPopup);

// Обработчик кнопки Сохранить
popupFormEdit.addEventListener('submit', editFormSubmitHandler);

// Обработчик кнопки Добавить
popupFormAdd.addEventListener('submit', addFormSubmitHandler);
