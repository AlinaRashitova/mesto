export default class Card {
  constructor(cardData, templateSelector, handleCardOpen, userInfo, handlePutLike, handleDeleteLike, handleDeleteCard, handleDeleteCardConfirmation) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._likes = cardData.likes;
    this._cardId = cardData._id;
    this._userInfo = userInfo;
    this._owner = cardData.owner;
    this._templateSelector = templateSelector;
    this._handleCardOpen = handleCardOpen;
    this._handlePutLike = handlePutLike;
    this._handleDeleteLike = handleDeleteLike;
    this._handleDeleteCard = handleDeleteCard;
    this._handleDeleteCardConfirmation = handleDeleteCardConfirmation;
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

    if (this._owner.name != this._userInfo.getUserInfo().name) {
      this._deleteButton.remove();
    }

    if (this._likes.some((like) => {
      return like.name === this._userInfo.getUserInfo().name
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
    this._cardLikes = this._element.querySelector('.card__like-counter');
    if (!this._likeButton.classList.contains('card__button_like_active')) {
      this._likeButton.classList.add('card__button_like_active');
      this._handlePutLike(this._cardId).then(res => {
        this._likes = res.likes;
        this._cardLikes.textContent = res.likes.length;
      });
    } else {
      this._likeButton.classList.remove('card__button_like_active');
      this._handleDeleteLike(this._cardId).then(res => {
        this._likes = res.likes;
        this._cardLikes.textContent = res.likes.length;
      });
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteCardConfirmation(() => {
        this._handleDeleteCard(this._cardId).then(() => {
          this._element.remove();
          this._element = null;
        })
      });
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });
  }
}
