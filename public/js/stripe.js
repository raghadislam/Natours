/* eslint-disable */
import axios from 'axios';

import { showAlert } from './alert';

const stripe = Stripe(
  'pk_test_51RNemIFPkVn0RqQBK08twypf2bFUG6AWtLjbLS6r5VdPiSvrjFL1VMiPDzhxykg2YgGQc93Wph14pHYQS8JpIPkS000msmE9ri',
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios({
      method: 'GET',
      url: `/api/v1/bookings/checkout-session/${tourId}`,
    });

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('Error', err);
  }
};
