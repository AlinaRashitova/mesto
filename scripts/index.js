const popup = document.querySelector('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editCloseButton = editPopup.querySelector('.popup__close-button');
const addCloseButton = addPopup.querySelector('.popup__close-button');
const popupForm = popup.querySelector('.popup__form');
const popupFormEdit = editPopup.querySelector('.popup__form_type_edit');
const popupFormAdd = addPopup.querySelector('.popup__form_type_add');
const nameInput = popupForm.querySelector('.popup__input_type_name');
const jobInput = popupForm.querySelector('.popup__input_type_job');
const placeNameInput = popupFormAdd.querySelector('.popup__input_type_place-name');
const imageSourceInput = popupFormAdd.querySelector('.popup__input_type_image-source');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const cardElement = document.querySelector('.cards');
const templateElement = document.querySelector('.template');
const cardTitle = templateElement.querySelector('.card__title');
const cardImage = templateElement.querySelector('.card__image');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//Функция добавления значений в инпуты
function popupFormValue() {
  nameInput.setAttribute('value', profileName.textContent);
  jobInput.setAttribute('value', profileJob.textContent);
}

//Функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function clickEditHandler() {
  popupFormValue();
  openPopup(editPopup);
}

function clickAddHandler() {
  openPopup(addPopup);
}

//Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function closeEditPopup() {
  closePopup(editPopup);
}

function closeAddPopup() {
  closePopup(addPopup);
}

//Обработчики событий для кнопок
editButton.addEventListener('click', clickEditHandler);
addButton.addEventListener('click', clickAddHandler);

editCloseButton.addEventListener('click', closeEditPopup);
addCloseButton.addEventListener('click', closeAddPopup);

//Функция редактирования профиля
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeEditPopup();
}

//Функция добавления карточки пользователем
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  cardTitle.textContent = placeNameInput.value;
  cardImage.src = imageSourceInput.value;

  closeAddPopup();
}

//Обработчик кнопки Сохранить
popupFormEdit.addEventListener('submit', editFormSubmitHandler);

//Обработчик кнопки Добавить
popupFormAdd.addEventListener('submit', addFormSubmitHandler);

//Функция лайка карточки
function likeHandle(evt) {
  const itemElement = evt.target.closest('.card__like-button');
  itemElement.classList.toggle('card__like-button_active');
}

//Функция удаления карточки
function deleteHandle(evt) {
  const element = evt.target.closest('.card');
  element.remove();
}

function addCard(object) {
  const newItemElement = templateElement.content.cloneNode(true);
  const likeButton = newItemElement.querySelector('.card__like-button');
  const deleteButton = newItemElement.querySelector('.card__delete-button');
  newItemElement.querySelector('.card__title').textContent = object.name;
  newItemElement.querySelector('.card__image').src = object.link;

  deleteButton.addEventListener('click', deleteHandle);

  likeButton.addEventListener('click', likeHandle);

  cardElement.prepend(newItemElement);
}

initialCards.forEach(addCard);


