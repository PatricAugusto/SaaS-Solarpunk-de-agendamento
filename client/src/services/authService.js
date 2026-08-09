import api from './api';

export const authService = {
  forgotPassword: (email) =>
    api.post('/auth/forgot-password', { email }).then((r) => r.data.message),
  resetPassword: (token, newPassword) =>
    api.post('/auth/reset-password', { token, newPassword }).then((r) => r.data.message),
};