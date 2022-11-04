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
  profileAvatar,
  profileAvatarImage
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData)
    userInfo.setUserId(userData)
    cardSection.renderItems(cards)
  })
  .catch(err => console.log(`${err}`))

// Функция создания карточки
function createCard(cardData) {
  const newCard = new Card(
    cardData,
    '.template',
    imagePopup.open.bind(imagePopup),
    userInfo.getUserId.bind(userInfo),
    handlePutLike,
    handleDeleteLike,
    handleDeleteClick
  );
  return newCard.generateCard();
}

function handlePutLike(cardId, card) {
  api.putLike(cardId).then((res) => {
    card.changeLikes(res)
  })
    .catch(err => console.log(`${err}`))
}

function handleDeleteLike(cardId, card) {
  api.deleteLike(cardId).then((res) => {
    card.changeLikes(res)
  })
    .catch(err => console.log(`${err}`))
}

// Экземпляр класса Section
const cardSection = new Section((item) => cardSection.addItem(createCard(item)), ".cards");

const handleProfileFormSubmit = formValues =>
  api.editProfile(formValues.nameInput, formValues.jobInput).then(res => {
    userInfo.setUserInfo(res);
    popupEdit.close();
  })
    .catch(err => console.log(`${err}`))
    .finally(() => popupEdit.isLoading(false))

const handleCardFormSubmit = formValues =>
  api.addCard(formValues.name, formValues.link).then(res => {
    cardSection.addItem(createCard(res));
    popupAdd.close();
  })
    .catch(err => console.log(`${err}`))
    .finally(() => popupAdd.isLoading(false))

const handleAvatarFormSubmit = formValues =>
  api.changeAvatar(formValues.link).then(res => {
    profileAvatarImage.src = res.avatar;
    popupAvatar.close();
  })
    .catch(err => console.log(`${err}`))
    .finally(() => popupAvatar.isLoading(false))

const imagePopup = new PopupWithImage(".popup_type_photo");
const popupEdit = new PopupWithForm(".popup_type_edit", handleProfileFormSubmit);
const popupAdd = new PopupWithForm(".popup_type_add", handleCardFormSubmit);
const popupAvatar = new PopupWithForm(".popup_type_change-avatar", handleAvatarFormSubmit);
const popupConfirm = new PopupWithConfirmation(".popup_type_confirm", handleConfirmClick);
const formEditValidator = new FormValidator(validationConfig, popupFormEdit);
const formAddValidator = new FormValidator(validationConfig, popupFormAdd);
const formAvatarValidator = new FormValidator(validationConfig, popupFormAvatar);

function handleDeleteClick(card) {
  popupConfirm.open(card);
}

function handleConfirmClick(card) {
  api.deleteCard(card.getCardId()).then(() => {
    card.deleteCard()
    popupConfirm.close()
  })
    .catch(err => console.log(`${err}`))
}

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
