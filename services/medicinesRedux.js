import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function querymedicines(params) {
    log(' querymedicines ', `${CONFIG.API_SERVER_2}/medicines?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/medicines?${stringify(params)}`);
}

export function detailmedicines(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/medicines/${id}`, {
        method: 'GET',
    });
}

export async function removemedicines(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/medicines/${id}`, {
        method: 'DELETE',
    });
}

export async function addmedicines(params) {
    return request(`${CONFIG.API_SERVER_2}/medicines`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updatemedicines(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/medicines/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querymedicinesAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/medicines/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/medicines/get/all`);
}
export async function querymedicinesWarehouse(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        // sort: JSON.stringify(sort || ["medicines.name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/medicines/get/all/byWarehouses?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/medicines/get/all`);
}