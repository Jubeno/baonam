import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function queryWarehouses(params) {
    return request(`${CONFIG.API_SERVER_2}/warehouses?${stringify(params)}`);
}

export function detailWarehouses(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/warehouses/${id}`, {
        method: 'GET',
    });
}

export async function removeWarehouses(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/warehouses/${id}`, {
        method: 'DELETE',
    });
}

export async function addWarehouses(params) {
    return request(`${CONFIG.API_SERVER_2}/warehouses`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateWarehouses(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/warehouses/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function queryWarehousesAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/warehouses/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/warehouses/get/all`);
}