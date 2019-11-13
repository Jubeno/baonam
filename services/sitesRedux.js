import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

export async function querySites(params) {
log('SitesRedux ',`${CONFIG.API_SERVER_2}/sites?${stringify(params)}`)

  return request(`${CONFIG.API_SERVER_2}/sites?${stringify(params)}`);
}

export async function createSites(params) {

  return request(`${CONFIG.API_SERVER_2}/sites`, {
    method: 'POST',
    body: {
      ...params
    }
    ,
  });
}

export async function infoSites(id) {
  log('sites Redux',`${CONFIG.API_SERVER_2}/sites/${id}` )
  return request(`${CONFIG.API_SERVER_2}/sites/${id}`, {
    method: 'GET',
  });
}

export async function updateSites(params, id) {
  // log("url values:", CONFIG.API_SERVER_2 + "/Sitess/"+ id)
    return request(`${CONFIG.API_SERVER_2}/sites/${id}`, {
      method: 'PUT',
      body: {
        ...params, 
        method: 'UPDATE'
      }
      ,
    });
  }

  
  export async function getAllSites(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/sites/get/all?${stringify(query)}`);
  }