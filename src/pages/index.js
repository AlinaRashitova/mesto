import './index.css';
import { initialCards } from "../utils/initialCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {validationConfig,
        placeNameInput,
        imageSourceInput,
        popupFormAdd,
        popupFormEdit,
        buttonEdit,
        buttonAdd,
        nameInput,
        jobInput } from "../utils/constants.js";

function createCard(cardData) {
  const newCard = new Card(
    {name: cardData.name, link: cardData.link},
    '.template',
    imagePopup.open.bind(imagePopup));
  return newCard.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => cardSection.addItem(createCard(item))
  },
  ".cards"
);

const handleProfileFormSubmit = (formValues) => {
  userInfo.setUserInfo(formValues.nameInput, formValues.jobInput);
  popupEdit.close();
}

const handleCardFormSubmit = (formValues) => {
  cardSection.addItem(createCard(formValues));
  popupAdd.close();
}

const imagePopup = new PopupWithImage(".popup_type_photo");
const popupEdit = new PopupWithForm(".popup_type_edit", handleProfileFormSubmit);
const popupAdd = new PopupWithForm(".popup_type_add", handleCardFormSubmit);
const userInfo = new UserInfo(".profile__title", ".profile__subtitle");
const formEditValidator = new FormValidator(validationConfig, popupFormEdit);
const formAddValidator = new FormValidator(validationConfig, popupFormAdd);

function clickEditButtonHandler() {
  popupEdit.open();
  const userInfoObj = userInfo.getUserInfo();
  nameInput.value = userInfoObj.name;
  jobInput.value = userInfoObj.info;
  formEditValidator.resetValidation();
}

function clickAddButtonHandler() {
  popupAdd.open();
  formAddValidator.resetValidation();
}

buttonEdit.addEventListener('click', clickEditButtonHandler);
buttonAdd.addEventListener('click', clickAddButtonHandler);

imagePopup.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();

formEditValidator.enableValidation();
formAddValidator.enableValidation();

cardSection.renderItems();
