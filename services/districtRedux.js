import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

export async function queryDistrict(params) {

  return request(`${CONFIG.API_SERVER_2}/districts?${stringify(params)}`);
}

export async function createDistrict(params) {

  return request(`${CONFIG.API_SERVER_2}/districts`, {
    method: 'POST',
    body: {
      ...params
    }
    ,
  });
}

export async function infoDistrict(id) {
  return request(`${CONFIG.API_SERVER_2}/districts/${id}`, {
    method: 'GET',
  });
}

export async function updateDistrict(params, id) {
  // log("url values:", `${CONFIG.API_SERVER_2  }/districts/${id}`)
  log("url values:", id,params )
    return request(`${CONFIG.API_SERVER_2}/districts/${id}`, {
      method: 'PUT',
      body: {
        ...params, 
        method: 'UPDATE'
      }
      ,
    });
  }

  export async function getAllDistrict(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/districts/get/all?${stringify(query)}`);
  }