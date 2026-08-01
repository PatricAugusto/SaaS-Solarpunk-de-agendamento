import api from './api';

export const eventTypeService = {
  listMine: () => api.get('/event-types').then((r) => r.data.eventTypes),
  create: (payload) => api.post('/event-types', payload).then((r) => r.data.eventType),
  remove: (id) => api.delete(`/event-types/${id}`),
  getPublic: (username, slug) =>
    api.get(`/event-types/public/${username}/${slug}`).then((r) => r.data.eventType),
  getAvailability: (username, slug, date) =>
    api
      .get(`/event-types/public/${username}/${slug}/availability`, { params: { date } })
      .then((r) => r.data.slots),
  createBooking: (username, slug, payload) =>
    api.post(`/event-types/public/${username}/${slug}/bookings`, payload).then((r) => r.data.booking),
};