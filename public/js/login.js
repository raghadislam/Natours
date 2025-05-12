/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';

import { showAlert } from './alert';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      if (window.location.href === 'http://127.0.0.1:3000/me')
        location.assign('/');
      else if (window.location.href === 'http://127.0.0.1:3000/my-tours')
        location.assign('/');
      else location.reload(true);
      // console.log(window.location.href);
    }
  } catch (err) {
    showAlert('error', 'Error logging out! Please try again.');
  }
};
