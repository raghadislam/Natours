/* eslint-disable */
import '@babel/polyfill';
import axios from 'axios';
import { showAlert } from './alert';

export const updateSettings = async (type, data) => {
  try {
    const url =
      type === 'Password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';

    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${type} updated successfully!`);
      //   location.reload(true);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
