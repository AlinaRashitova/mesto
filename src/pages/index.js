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

function createCard(object) {
  const newCard = new Card(
    {name: object.name, link: object.link},
    '.template',
    imagePopup.open.bind(imagePopup));
  return newCard.generateCard();
}

const editFormSubmitHandler = (formValues) => {
  userInfo.setUserInfo(formValues.nameInput, formValues.jobInput);
  popupEdit.close();
}

const addFormSubmitHandler = () => {
  cardSection.addItem(createCard({name: placeNameInput.value, link: imageSourceInput.value}));
  popupAdd.close();
  popupFormAdd.reset();
}

const imagePopup = new PopupWithImage(".popup_type_photo");
const popupEdit = new PopupWithForm(".popup_type_edit", editFormSubmitHandler);
const popupAdd = new PopupWithForm(".popup_type_add", addFormSubmitHandler);
const userInfo = new UserInfo(".profile__title", ".profile__subtitle");
const formEditValidator = new FormValidator(validationConfig, popupFormEdit);
const formAddValidator = new FormValidator(validationConfig, popupFormAdd);

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => cardSection.addItem(createCard(item))
  },
  ".cards"
);

buttonEdit.addEventListener('click', () => {
  popupEdit.open();
  const userInfoObj = userInfo.getUserInfo();
  nameInput.value = userInfoObj.name;
  jobInput.value = userInfoObj.info;
  formEditValidator.resetValidation();
});

buttonAdd.addEventListener('click', () => {
  popupAdd.open();
  formAddValidator.resetValidation();
})

imagePopup.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();

formEditValidator.enableValidation();
formAddValidator.enableValidation();

cardSection.renderItems();
