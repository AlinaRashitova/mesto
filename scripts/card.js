export default class Card {
  constructor(object, templateSelector, openPopupHandler) {
    this._name = object.name;
    this._link = object.link;
    this._templateSelector = templateSelector;
    this._openPopupHandler = openPopupHandler;
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
    this._openPopupHandler(this._name, this._link);
  }

  _handleLikePopup() {
    this._likeButton.classList.toggle('card__button_like_active');
  }

  _handleDeletePopup() {
    this._element.remove();
    this._element = null;
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
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }
}
