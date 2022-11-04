export default class Card {
  constructor(cardData, templateSelector, handleCardOpen, userId, handlePutLike, handleDeleteLike, handleDeleteClick) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._userId = userId;
    this._owner = cardData.owner;
    this._templateSelector = templateSelector;
    this._handleCardOpen = handleCardOpen;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector('.card__image');
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardLikes = this._element.querySelector('.card__like-counter');
    this._likeButton = this._element.querySelector('.card__button_like');
    this._deleteButton = this._element.querySelector('.card__button_delete');

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLikes.textContent = this._likes.length;

    if (this._owner._id != this._userId()) {
      this._deleteButton.remove();
    }

    if (this._likes.some((like) => {
      return like.name === this._userId();
    })) {
      this._likeButton.classList.add('card__button_like_active');
    };

    this._setEventListeners();

    return this._element;
  }

  _handleImageClick() {
    this._handleCardOpen(this._name, this._link);
  }

  _handleLikeClick() {
    if (!this._likeButton.classList.contains('card__button_like_active')) {
      this._handlePutLike(this._cardId, this);
    } else {
      this._handleDeleteLike(this._cardId, this);
    }
  }

  changeLikes(card) {
    this._cardLikes.textContent = card.likes.length;
    this._likeButton.classList.toggle('card__button_like_active');
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  }

  getCardId() {
    return this._cardId;
  }
}
