export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._header = config.headers;
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`);
  }

  async getUserInfo() {
    const response = await fetch(`${this._baseUrl}/users/me`, { headers: this._header });
    return this._checkResponse(response);
  }

  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, { headers: this._header });
    return this._checkResponse(response);
  }

  async editProfile(name, about) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({ name, about }),
    });
    return this._checkResponse(response);
  }

  async addCard(name, link) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify({ name, link }),
    });
    return this._checkResponse(response);
  }

  async putLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._header
    });
    return this._checkResponse(response);
  }

  async deleteLike(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._header
    });
    return this._checkResponse(response);
  }

  async changeAvatar(avatar) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({ avatar }),
    });
    return this._checkResponse(response);
  }

  async deleteCard(cardId) {
    const response = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._header,
    });
    return this._checkResponse(response);
  }
}

