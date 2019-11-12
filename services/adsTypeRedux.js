import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function queryadsTypes(params) {
    return request(`${CONFIG.API_SERVER_2}/adsTypes?${stringify(params)}`);
}

export function detailadsTypes(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/adsTypes/${id}`, {
        method: 'GET',
    });
}

export async function removeadsTypes(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/adsTypes/${id}`, {
        method: 'DELETE',
    });
}

export async function addadsTypes(params) {
    return request(`${CONFIG.API_SERVER_2}/adsTypes`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateadsTypes(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/adsTypes/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function queryadsTypeAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/adsTypes/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/adsTypes/get/all`);
}