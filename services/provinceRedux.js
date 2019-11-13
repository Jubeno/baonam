import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

export async function queryProvince(params) {
log('provinceRedux ',`${CONFIG.API_SERVER_2}/provinces?${stringify(params)}`)

  return request(`${CONFIG.API_SERVER_2}/provinces?${stringify(params)}`);
}

export async function createProvince(params) {

  return request(`${CONFIG.API_SERVER_2}/provinces`, {
    method: 'POST',
    body: {
      ...params
    }
    ,
  });
}

export async function infoProvince(id) {
  return request(`${CONFIG.API_SERVER_2}/provinces/${id}`, {
    method: 'GET',
  });
}

export async function updateProvince(params, id) {
  // log("url values:", CONFIG.API_SERVER_2 + "/provinces/"+ id)
    return request(`${CONFIG.API_SERVER_2}/provinces/${id}`, {
      method: 'PUT',
      body: {
        ...params, 
        method: 'UPDATE'
      }
      ,
    });
  }

  
  export async function getAllProvince(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/provinces/get/all?${stringify(query)}`);
  }