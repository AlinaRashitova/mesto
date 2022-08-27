// Попапы
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const photoPopup = document.querySelector('.popup_type_photo');

// Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editCloseButton = editPopup.querySelector('.popup__close-button');
const addCloseButton = addPopup.querySelector('.popup__close-button');
const photoCloseButton = photoPopup.querySelector('.popup__close-button');

// Формы
const popupFormEdit = editPopup.querySelector('.popup__form_type_edit');
const popupFormAdd = addPopup.querySelector('.popup__form_type_add');

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
const popupImage = photoPopup.querySelector('.popup__image');
const popupCaption = photoPopup.querySelector('.popup__caption');

// Функция добавления значений в инпуты, попап редактирования
function addPopupFormValue() {
  nameInput.setAttribute('value', profileName.textContent);
  jobInput.setAttribute('value', profileJob.textContent);
}

// Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function clickEditHandler() {
  addPopupFormValue();
  openPopup(editPopup);
}

function clickAddHandler() {
  openPopup(addPopup);
}

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closeEditPopup() {
  closePopup(editPopup);
}

function closeAddPopup() {
  closePopup(addPopup);
}

function closePhotoPopup() {
  closePopup(photoPopup);
}

// Обработчики событий для кнопок
editButton.addEventListener('click', clickEditHandler);
addButton.addEventListener('click', clickAddHandler);

editCloseButton.addEventListener('click', closeEditPopup);
addCloseButton.addEventListener('click', closeAddPopup);
photoCloseButton.addEventListener('click', closePhotoPopup);

// Функция редактирования профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeEditPopup();
}

// Обработчик кнопки Сохранить
popupFormEdit.addEventListener('submit', editFormSubmitHandler);

// Функция добавления новой карточки пользователем
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const title = placeNameInput.value;
  const image = imageSourceInput.value;
  const objectCard = {
    name: title,
    link: image
  }
  createCard(objectCard);
  closeAddPopup();
  popupFormAdd.reset();
}

// Обработчик кнопки Добавить
popupFormAdd.addEventListener('submit', addFormSubmitHandler);

// Функция создания карточки
function createCard(object) {
  const newItemElement = templateElement.content.cloneNode(true);
  const likeButton = newItemElement.querySelector('.card__like-button');
  const deleteButton = newItemElement.querySelector('.card__delete-button');
  const cardImage = newItemElement.querySelector('.card__image');
  newItemElement.querySelector('.card__title').textContent = object.name;
  newItemElement.querySelector('.card__image').src = object.link;
  newItemElement.querySelector('.card__image').alt = object.name;

  deleteButton.addEventListener('click', deleteHandle);
  likeButton.addEventListener('click', evt => likeHandle(evt, likeButton));
  cardImage.addEventListener('click', evt => photoHandle(evt, object.link, object.name));

  return newItemElement;
}

// Функция добавления карточки
function renderCards() {
  initialCards.forEach(element => {
    cardElement.prepend(createCard(element));
  });
}

// Функция лайка карточки
function likeHandle(evt, likeButton) {
  likeButton.classList.toggle('card__like-button_active');
}

// Функция удаления карточки
function deleteHandle(evt) {
  const element = evt.target.closest('.card');
  element.remove();
}

// Функция открытия попапа с картинкой
function photoHandle(evt, link, name) {
  openPopup(photoPopup);
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
}

renderCards();
