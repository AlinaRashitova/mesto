// Функция добавления класса с ошибкой
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
}

// Функция удаления класса с ошибкой
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
}

// Функция проверки формы на валидность
function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, config);
  } else {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  }
}

// Функция проверки инпута на валидность
function hasInvalidInput(inputList) {
  return (inputList.some((inputElement) => !inputElement.validity.valid));
}

// Функция изменения класса у кнопки
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    setInactiveButtonState(buttonElement, config);
  } else {
    setActiveButtonState(buttonElement, config);
  }
}

// Функция, делающая кнопку неактивной
function setInactiveButtonState(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

// Функция, делающая кнопку активной
function setActiveButtonState(buttonElement, config) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
}

// Функция добавления слушателя событий всем инпутам формы
function setEventListeners(formElement, config) {
  // создаем массив из инпутов формы
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  // делаем кнопку неактивной до ввода данных
  toggleButtonState(inputList, buttonElement, config);
  // проверяем каждый инпут на валидность и меняем состояние кнопки в зависимости от результата
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

// Функция нахождения всех форм
function enableValidation(config) {
  // создаем массив форм
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

enableValidation(validationConfig);
