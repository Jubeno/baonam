import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
// eslint-disable-next-line import/prefer-default-export
export async function queryMenus(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"])
    };
    return request(`${CONFIG.API_SERVER_WEB}/menus/find/all/parent-child?${stringify(query)}`);
}

export async function queryCategoryInfo(id) {
    /* const { filter, sort } = params;
    const query = {
      filter: JSON.stringify(filter),
      sort: JSON.stringify(sort || )
    }; */
    // console.log(`${CONFIG.API_SERVER_WEB}/categories/${id}`)
    return request(`${CONFIG.API_SERVER_WEB}/categories/${id}`);
}

export async function queryCategoryAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "DESC"])
    };
    // console.log(`${CONFIG.API_SERVER_WEB}/categories/get/all?${stringify(query)}`)
    return request(`${CONFIG.API_SERVER_WEB}/categories/get/all?${stringify(query)}`);
}

export async function queryArticleAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        // sort: JSON.stringify(sort || ["name", "DESC"])
    };
    // console.log(`${CONFIG.API_SERVER_WEB}/articles/get/all?${stringify(query)}`)
    return request(`${CONFIG.API_SERVER_WEB}/articles/get/all?${stringify(query)}`);
}
export async function queryAd(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        // sort: JSON.stringify(sort || ["name", "DESC"])
    };
    // console.log(`${CONFIG.API_SERVER_WEB}/ads/get/all?${stringify(query)}`)
    return request(`${CONFIG.API_SERVER_WEB}/ads/get/all?${stringify(query)}`);
}

export async function queryArticleInfo(id) {
    /* const { filter, sort } = params;
    const query = {
      filter: JSON.stringify(filter),
      sort: JSON.stringify(sort || )
    }; */
    // console.log(`${CONFIG.API_SERVER_WEB}/categories/${id}`)
    return request(`${CONFIG.API_SERVER_WEB}/articles/${id}`);
}
export async function queryWebInfo(id) {
    /* const { filter, sort } = params;
    const query = {
      filter: JSON.stringify(filter),
      sort: JSON.stringify(sort || )
    }; */
    // console.log(`${CONFIG.API_SERVER_WEB}/categories/${id}`)
    return request(`${CONFIG.API_SERVER_WEB}/sites/${id}`);
}