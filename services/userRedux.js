import request from '../utils/request';
import CONFIG from '@/utils/config';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent(headers) {
  if (headers)
    return request(`${CONFIG.API_SERVER_2}/currentUser`, {
      headers
    });
  return request(`${CONFIG.API_SERVER_2}/currentUser`)
}