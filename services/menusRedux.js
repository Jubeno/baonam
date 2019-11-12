import { stringify } from 'query-string';
import request from '@/utils/request';
import CONFIG from '@/utils/config';

export async function authMenus() {
  // const { filter, sort } = params;
  const query = {
    filter: JSON.stringify({
      sitesId: CONFIG.SITE_CORE_CMS
    }),
    // sort: JSON.stringify(sort || ["Name", "ASC"])
  };
  return request(`${CONFIG.API_SERVER_2}/auth_routes?${stringify(query)}`);
  // return request(`${CONFIG.API_SERVER_2}/auth_routes`);
}

export async function queryMenus(params) {
  const { filter, sort } = params;
  const query = {
    filter: JSON.stringify(filter),
    sort: JSON.stringify(sort || ["name", "ASC"])
  };
  return request(`${CONFIG.API_SERVER_2}/menus/find/all/parent-child?${stringify(query)}`);
}

export function detailMenus(id) {
  return request(`${CONFIG.API_SERVER_2}/menus/${id}`, {
    method: 'GET',
    body: null,
  });
}

export async function addMenus(params) {
  return request(`${CONFIG.API_SERVER_2}/menus`, {
    method: 'POST',
    body: {
      ...params
    },
  });
}

export async function editMenus(id, params) {
  return request(`${CONFIG.API_SERVER_2}/menus/${id}`, {
    method: 'PUT',
    body: {
      ...params
    },
  });
}

export async function removeMenus(id, params) {
  return request(`${CONFIG.API_SERVER_2}/menus/${id}`, {
    method: 'DELETE',
    body: {
      ...params
    },
  });
}
