import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function queryCustomers(params) {
    return request(`${CONFIG.API_SERVER_2}/customers?${stringify(params)}`);
}

export function detailCustomers(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/customers/${id}`, {
        method: 'GET',
    });
}

export async function removeCustomers(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/customers/${id}`, {
        method: 'DELETE',
    });
}

export async function addCustomers(params) {
    return request(`${CONFIG.API_SERVER_2}/customers`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateCustomers(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/customers/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function queryCustomersAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/customers/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/customers/get/all`);
}