import { request } from './request.js';

class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getInitialCards(token) {
    return request(`${this.baseUrl}/cards`, {
      credentials: 'include',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`,
      }
    })
  }

  postNewCard(data, token) {
    return request(`${this.baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  deleteCard(cardId, token) {
    return request(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`,
      }
    })
  }

  getUserInfo(token) {
    return request(`${this.baseUrl}/users/me`, {
      credentials: 'include',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`,
      }
    })
  }

  patchUserInfo(data, token) {
    return request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
  }

  putLike(cardId, token) {
    return request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`,
      }
    })
  }

  deleteLike(cardId, token) {
    return request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`,
      }
    })
  }

  patchAvatar(data, token) {
    return request(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        ...this.headers,
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
  }
}

export const api = new Api({
  baseUrl: 'https://rtdback.nomoreparties.co',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});