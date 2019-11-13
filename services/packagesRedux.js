import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function querypackages(params) {
    log(' querypackages ', `${CONFIG.API_SERVER_2}/packages?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/packages?${stringify(params)}`);
}

export function detailpackages(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/packages/${id}`, {
        method: 'GET',
    });
}

export async function removepackages(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/packages/${id}`, {
        method: 'DELETE',
    });
}

export async function addpackages(params) {
    return request(`${CONFIG.API_SERVER_2}/packages`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updatepackages(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/packages/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querypackagesAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/packages/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/packages/get/all`);
}