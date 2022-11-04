import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmClick) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__button_save');
    this._handleConfirmClick = handleConfirmClick;
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    this._button.addEventListener('click', () => {
      this._handleConfirmClick(this._card);
    })
    super.setEventListeners();
  }
}
