import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__button_save');
  }

  open(handleConfirmClick) {
    super.open();
    this._button.addEventListener('click', () => {
      handleConfirmClick()
    })
  }
}
