import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function querymenuPositions(params) {
    return request(`${CONFIG.API_SERVER_2}/menuPositions?${stringify(params)}`);
}

export function detailmenuPositions(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/menuPositions/${id}`, {
        method: 'GET',
    });
}

export async function removemenuPositions(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/menuPositions/${id}`, {
        method: 'DELETE',
    });
}

export async function addmenuPositions(params) {
    return request(`${CONFIG.API_SERVER_2}/menuPositions`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updatemenuPositions(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/menuPositions/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querymenuPositionAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/menuPositions/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/menuPositions/get/all`);
}