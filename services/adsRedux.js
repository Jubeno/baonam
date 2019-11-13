import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

export async function queryAds(params) {
log('AdsRedux ',`${CONFIG.API_SERVER_2}/ads?${stringify(params)}`)

  return request(`${CONFIG.API_SERVER_2}/ads?${stringify(params)}`);
}

export async function createAds(params) {

  return request(`${CONFIG.API_SERVER_2}/ads`, {
    method: 'POST',
    body: {
      ...params
    }
    ,
  });
}

export async function infoAds(id) {
  return request(`${CONFIG.API_SERVER_2}/ads/${id}`, {
    method: 'GET',
  });
}

export async function updateAds(params, id) {
  // log("url values:", CONFIG.API_SERVER_2 + "/Adss/"+ id)
    return request(`${CONFIG.API_SERVER_2}/ads/${id}`, {
      method: 'PUT',
      body: {
        ...params, 
        method: 'UPDATE'
      }
      ,
    });
  }

  
  export async function getAllAds(params) {
    return request(`${CONFIG.API_SERVER_2}/ads/get/all?${stringify(params)}`);
  }