import apiClient, { setAccessToken } from './apiClient';

export const loginApi = async (email: string, password: string) => {
  const { data } = await apiClient.post('/auth/login', { email, password });
  setAccessToken(data.accessToken);
  return data;
};

export const registerApi = async (email: string, password: string, name: string) => {
  const { data } = await apiClient.post('/auth/register', { email, password, name });
  setAccessToken(data.accessToken);
  return data;
};

export const logoutApi = async () => {
  await apiClient.post('/auth/logout');
  setAccessToken(null);
};

export const refreshApi = async () => {
  const { data } = await apiClient.post('/auth/refresh');
  setAccessToken(data.accessToken);
  return data;
};
