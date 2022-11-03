export default class UserInfo {
  constructor( {nameSelector, infoSelector, avatarSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      info: this._infoElement.textContent,
    };
  }

  setUserInfo(userData) {
    this._nameElement.textContent = userData.name;
    this._infoElement.textContent = userData.about;
    this._avatarElement.src = userData.avatar;
  }

  setUserId(userData) {
    this._id = userData._id;
  }

  getUserId() {
    return this._id;
  }
}
