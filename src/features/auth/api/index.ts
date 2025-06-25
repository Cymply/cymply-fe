import { User } from '@/entities/user/model/types';
import { api } from '@/shared/api';

export const authApi = {
  login: (data: any) =>
    api.post<any>('/auth/login', data),
  
  refresh: () =>
    api.post<any>('/auth/refresh'),
  
  logout: () =>
    api.post('/auth/logout'),
  
  getMe: () =>
    api.get<User>('/auth/me'),
};