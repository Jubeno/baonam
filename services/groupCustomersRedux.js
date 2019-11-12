import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function querygroupCustomers(params) {
    log(' querygroupCustomers ', `${CONFIG.API_SERVER_2}/groupCustomers?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/groupCustomers?${stringify(params)}`);
}

export function detailgroupCustomers(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/groupCustomers/${id}`, {
        method: 'GET',
    });
}

export async function removegroupCustomers(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/groupCustomers/${id}`, {
        method: 'DELETE',
    });
}

export async function addgroupCustomers(params) {
    return request(`${CONFIG.API_SERVER_2}/groupCustomers`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updategroupCustomers(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/groupCustomers/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querygroupCustomersAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/groupCustomers/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/groupCustomers/get/all`);
}