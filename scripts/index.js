// Объявление переменных

// Попапы
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupPhoto = document.querySelector('.popup_type_photo');

// Кнопки
const buttonEdit = document.querySelector('.profile__button_edit');
const buttonAdd = document.querySelector('.profile__button_add');
const buttonEditClose = popupEdit.querySelector('.popup__button_close');
const buttonAddClose = popupAdd.querySelector('.popup__button_close');
const buttonPhotoClose = popupPhoto.querySelector('.popup__button_close');
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
const templateElement = document.querySelector('.template');
const popupImage = popupPhoto.querySelector('.popup__image');
const popupCaption = popupPhoto.querySelector('.popup__caption');

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
  getInactiveButtonState(buttonSaveEdit, validationConfig);
}

function handleAddFormClick() {
  openPopup(popupAdd);
  getInactiveButtonState(buttonSaveAdd, validationConfig);
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

function closePhotoPopup() {
  closePopup(popupPhoto);
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

// Функция создания карточки
function createCard(object) {
  const newItemElement = templateElement.content.cloneNode(true);
  const likeButton = newItemElement.querySelector('.card__button_like');
  const deleteButton = newItemElement.querySelector('.card__button_delete');
  const cardImage = newItemElement.querySelector('.card__image');
  newItemElement.querySelector('.card__title').textContent = object.name;
  newItemElement.querySelector('.card__image').src = object.link;
  newItemElement.querySelector('.card__image').alt = object.name;

  deleteButton.addEventListener('click', deleteHandle);
  likeButton.addEventListener('click', evt => likeHandle(evt, likeButton));
  cardImage.addEventListener('click', evt => openPhotoHandle(evt, object.link, object.name));

  return newItemElement;
}

// Функция лайка карточки
function likeHandle(evt, likeButton) {
  likeButton.classList.toggle('card__button_like_active');
}

// Функция удаления карточки
function deleteHandle(evt) {
  const element = evt.target.closest('.card');
  element.remove();
}

// Функция добавления карточки
function renderCards() {
  initialCards.forEach(element => {
    cardElement.prepend(createCard(element));
  });
}

// Функция открытия попапа с картинкой
function openPhotoHandle(evt, link, name) {
  openPopup(popupPhoto);
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}

renderCards();

// Добавление обработчиков

// Обработчики событий на кнопки
buttonEdit.addEventListener('click', handleEditFormClick);
buttonAdd.addEventListener('click', handleAddFormClick);

buttonEditClose.addEventListener('click', closeEditPopup);
buttonAddClose.addEventListener('click', closeAddPopup);
buttonPhotoClose.addEventListener('click', closePhotoPopup);

// Обработчик кнопки Сохранить
popupFormEdit.addEventListener('submit', editFormSubmitHandler);

// Обработчик кнопки Добавить
popupFormAdd.addEventListener('submit', addFormSubmitHandler);
