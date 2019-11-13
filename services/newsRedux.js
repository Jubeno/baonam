import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

export async function queryArticles(params) {
log('ArticlesRedux ',`${CONFIG.API_SERVER_2}/articles?${stringify(params)}`)

  return request(`${CONFIG.API_SERVER_2}/articles?${stringify(params)}`);
}

export async function createArticles(params) {

  return request(`${CONFIG.API_SERVER_2}/articles`, {
    method: 'POST',
    body: {
      ...params
    }
    ,
  });
}

export async function infoArticles(id) {
  return request(`${CONFIG.API_SERVER_2}/articles/${id}`, {
    method: 'GET',
  });
}

export async function updateArticles(params, id) {
  // log("url values:", CONFIG.API_SERVER_2 + "/Articless/"+ id)
    return request(`${CONFIG.API_SERVER_2}/articles/${id}`, {
      method: 'PUT',
      body: {
        ...params, 
        method: 'update'
      }
      ,
    });
  }

  
  export async function getAllArticles(params) {
    return request(`${CONFIG.API_SERVER_2}/articles/get/all?${stringify(params)}`);
  }