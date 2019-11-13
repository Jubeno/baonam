import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function queryproducers(params) {
    log(' queryproducers ', `${CONFIG.API_SERVER_2}/producers?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/producers?${stringify(params)}`);
}

export function detailproducers(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/producers/${id}`, {
        method: 'GET',
    });
}

export async function removeproducers(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/producers/${id}`, {
        method: 'DELETE',
    });
}

export async function addproducers(params) {
    return request(`${CONFIG.API_SERVER_2}/producers`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateproducers(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/producers/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function queryproducersAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/producers/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/producers/get/all`);
}