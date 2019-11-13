import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

export async function queryWard(params) {
log('WardRedux ',`${CONFIG.API_SERVER_2}/wards?${stringify(params)}`)

  return request(`${CONFIG.API_SERVER_2}/wards?${stringify(params)}`);
}

export async function createWard(params) {

  return request(`${CONFIG.API_SERVER_2}/wards`, {
    method: 'POST',
    body: {
      ...params
    }
    ,
  });
}

export async function infoWard(id) {
  return request(`${CONFIG.API_SERVER_2}/wards/${id}`, {
    method: 'GET',
  });
}

export async function updateWard(params, id) {
  // log("url values:", CONFIG.API_SERVER_2 + "/Wards/"+ id)
    return request(`${CONFIG.API_SERVER_2}/wards/${id}`, {
      method: 'PUT',
      body: {
        ...params, 
        method: 'UPDATE'
      }
      ,
    });
  }

  
  export async function getAllWard(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/wards/get/all?${stringify(query)}`);
  }