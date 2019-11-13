import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function queryadsPositions(params) {
    return request(`${CONFIG.API_SERVER_2}/adsPositions?${stringify(params)}`);
}

export function detailadsPositions(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/adsPositions/${id}`, {
        method: 'GET',
    });
}

export async function removeadsPositions(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/adsPositions/${id}`, {
        method: 'DELETE',
    });
}

export async function addadsPositions(params) {
    return request(`${CONFIG.API_SERVER_2}/adsPositions`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateadsPositions(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/adsPositions/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function queryadsPositionAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/adsPositions/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/adsPositions/get/all`);
}