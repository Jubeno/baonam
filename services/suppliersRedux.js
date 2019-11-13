import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function querySuppliers(params) {
    return request(`${CONFIG.API_SERVER_2}/suppliers?${stringify(params)}`);
}

export function detailSuppliers(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/suppliers/${id}`, {
        method: 'GET',
    });
}

export async function removeSuppliers(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/suppliers/${id}`, {
        method: 'DELETE',
    });
}

export async function addSuppliers(params) {
    return request(`${CONFIG.API_SERVER_2}/suppliers`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateSuppliers(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/suppliers/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querySuppliersAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/suppliers/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/suppliers/get/all`);
}