import api from './api';

export const bookingService = {
  listMine: () => api.get('/bookings').then((r) => r.data.bookings),
  cancel: (id) => api.patch(`/bookings/${id}/cancel`).then((r) => r.data.booking),
  getAvailability: (eventTypeId, date) =>
    api.get(`/bookings/availability/${eventTypeId}`, { params: { date } }).then((r) => r.data.slots),
  createManual: (payload) => api.post('/bookings', payload).then((r) => r.data.booking),
};