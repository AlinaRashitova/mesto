import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from "../components/UserInfo.js";
import {
  validationConfig,
  popupFormAdd,
  popupFormEdit,
  popupFormAvatar,
  buttonEdit,
  buttonAdd,
  nameInput,
  jobInput,
  profileAvatar
} from "../utils/constants.js";
import Api from "../components/Api.js";

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: "ee39efb6-2446-4174-bff3-4bc3ae8ed76b",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle',
  avatarSelector: '.profile__avatar-image'
});

// Функция создания карточки
function createCard(cardData) {
  const newCard = new Card(
    cardData,
    '.template',
    imagePopup.open.bind(imagePopup),
    userInfo,
    cardId => api.putLike(cardId).catch(err => console.log(`Ошибка: ${err}`)),
    cardId => api.deleteLike(cardId).catch(err => console.log(`Ошибка: ${err}`)),
    cardId => api.deleteCard(cardId).catch(err => console.log(`Ошибка: ${err}`)),
    (handleDeleteCardConfirmation) => popupConfirm.open(handleDeleteCardConfirmation)
  );
  return newCard.generateCard();
}

// Экземпляр класса Section
const cardSection = new Section((item) => cardSection.addItem(createCard(item)), ".cards");

const handleProfileFormSubmit = formValues =>
  api.editProfile(formValues.nameInput, formValues.jobInput).then(res => {
    userInfo.setUserInfo(res.name, res.about);
    popupEdit.close();
  })
    .catch(err => console.log(`Ошибка: ${err}`))

const handleCardFormSubmit = formValues =>
  api.addCard(formValues.name, formValues.link).then(res => {
    cardSection.addItem(createCard(res));
    popupAdd.close();
  })
    .catch(err => console.log(`Ошибка: ${err}`))

const handleAvatarFormSubmit = formValues =>
  api.changeAvatar(formValues.link).then(res => {
    profileAvatar.src = res.avatar;
    popupAvatar.close();
  })
    .catch(err => console.log(`Ошибка: ${err}`))

const imagePopup = new PopupWithImage(".popup_type_photo");
const popupEdit = new PopupWithForm(".popup_type_edit", handleProfileFormSubmit);
const popupAdd = new PopupWithForm(".popup_type_add", handleCardFormSubmit);
const popupAvatar = new PopupWithForm(".popup_type_change-avatar", handleAvatarFormSubmit);
const popupConfirm = new PopupWithConfirmation(".popup_type_confirm");
const formEditValidator = new FormValidator(validationConfig, popupFormEdit);
const formAddValidator = new FormValidator(validationConfig, popupFormAdd);
const formAvatarValidator = new FormValidator(validationConfig, popupFormAvatar);

api.getUserInfo().then(res => {
  userInfo.setUserInfo(res.name, res.about, res.avatar);
})

api.getInitialCards().then(res => {
  cardSection.renderItems(res);
})

function handleEditProfileButtonClick() {
  popupEdit.open();
  const userInfoObj = userInfo.getUserInfo();
  nameInput.value = userInfoObj.name;
  jobInput.value = userInfoObj.info;
  formEditValidator.resetValidation();
}

function handleAddCardButtonClick() {
  popupAdd.open();
  formAddValidator.resetValidation();
}

function handleChangeAvatarClick() {
  popupAvatar.open();
  formAvatarValidator.resetValidation();
}

buttonEdit.addEventListener('click', handleEditProfileButtonClick);
buttonAdd.addEventListener('click', handleAddCardButtonClick);
profileAvatar.addEventListener('click', handleChangeAvatarClick);

imagePopup.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupConfirm.setEventListeners();
popupAvatar.setEventListeners();

formEditValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidator.enableValidation();
