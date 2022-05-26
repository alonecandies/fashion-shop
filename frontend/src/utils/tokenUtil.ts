import cookies from 'js-cookie';

export const getToken = (): string => {
  return cookies.get('token') || '';
};

export const setToken = (token: string): void => {
  cookies.set('token', token);
};

export const clearToken = (): void => {
  cookies.remove('token');
};
