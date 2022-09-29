import { openPopup, closePopup } from './index.js';

const popupPhoto = document.querySelector('.popup_type_photo');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const closeButton = popupPhoto.querySelector('.popup__button_close');

export default class Card {
  constructor(object, templateSelector) {
    this._name = object.name;
    this._link = object.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _handleImagePopup() {
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
    openPopup(popupPhoto);
  }

  _handleClosePopup() {
    closePopup(popupPhoto);
  }

  _handleLikePopup() {
    this._likeButton.classList.toggle('card__button_like_active');
  }

  _handleDeletePopup() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.card__button_like');
    this._deleteButton = this._element.querySelector('.card__button_delete');
    this._cardImage = this._element.querySelector('.card__image');

    this._likeButton.addEventListener('click', () => {
      this._handleLikePopup();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeletePopup();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImagePopup();
    });

    closeButton.addEventListener('click', () => {
      this._handleClosePopup();
    });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._link;
    this._element.querySelector('.card__image').alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
