import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function querygroupSuppliers(params) {
    log(' querygroupSuppliers ', `${CONFIG.API_SERVER_2}/groupSuppliers?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/groupSuppliers?${stringify(params)}`);
}

export function detailgroupSuppliers(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/groupSuppliers/${id}`, {
        method: 'GET',
    });
}

export async function removegroupSuppliers(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/groupSuppliers/${id}`, {
        method: 'DELETE',
    });
}

export async function addgroupSuppliers(params) {
    return request(`${CONFIG.API_SERVER_2}/groupSuppliers`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updategroupSuppliers(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/groupSuppliers/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querygroupSupplierAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/groupSuppliers/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/groupSuppliers/get/all`);
}