import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._saveButton = this._popup.querySelector('.popup__button_save');
  }

  _getInputValues() {
    return this._inputList.reduce((formValues, input) => {
      formValues[input.name] = input.value;
      return formValues;
    }, {})
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.isLoading(true)
      this._submitFormCallback(this._getInputValues()).then(() => this.isLoading(false));
    })
  }

  isLoading(loading) {
    if(loading) {
      this._saveButton.textContent = 'Сохранение...';
    } else {
      this._saveButton.textContent = 'Сохранить';
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}

