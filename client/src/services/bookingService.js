import api from './api';

export const bookingService = {
  listMine: () => api.get('/bookings').then((r) => r.data.bookings),
  cancel: (id) => api.patch(`/bookings/${id}/cancel`).then((r) => r.data.booking),
};