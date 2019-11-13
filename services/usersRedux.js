import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function queryUser(params) {
  return request(`${CONFIG.API_SERVER_2}/users?${stringify(params)}`);
}

export function detailUser(id) {
  // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
  return request(`${CONFIG.API_SERVER_2}/users/${id}`, {
    method: 'GET',
  });
}

export async function removeUser(id) {
  return request(`${CONFIG.API_SERVER_2}/users/${id}`, {
    method: 'DELETE',
  });
}

export async function addUser(params) {
  return request(`${CONFIG.API_SERVER_2}/users`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export function resetpass(id, params) {
  // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
  return request(`${CONFIG.API_SERVER_2}/userspass/resetpass/${id}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export function changepass(id, params) {
  // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
  return request(`${CONFIG.API_SERVER_2}/userspass/changepass/${id}`, {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateUser(id, params) {
  // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
  const urlRequest = `${CONFIG.API_SERVER_2}/users/${id}`;
  return request(urlRequest, {
    method: 'PUT',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function queryUserAll(params) {
  const { filter, sort, range } = params;
  const query = {
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort || ["userName", "ASC"]),
    range: range ? JSON.stringify(range) : null
  };
  return request(`${CONFIG.API_SERVER_2}/users/get/all?${stringify(query)}`);
}