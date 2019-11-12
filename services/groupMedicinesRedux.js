import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function querygroupMedicinesParent(params) {
    return request(`${CONFIG.API_SERVER_2}/groupMedicines/find/list/parent-child?${stringify(params)}`);
}
export async function querygroupMedicines(params) {
    log(' querygroupMedicines ', `${CONFIG.API_SERVER_2}/groupMedicines?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/groupMedicines?${stringify(params)}`);
}

export function detailgroupMedicines(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/groupMedicines/${id}`, {
        method: 'GET',
    });
}

export async function removegroupMedicines(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/groupMedicines/${id}`, {
        method: 'DELETE',
    });
}

export async function addgroupMedicines(params) {
    return request(`${CONFIG.API_SERVER_2}/groupMedicines`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updategroupMedicines(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/groupMedicines/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querygroupMedicinesAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/groupMedicines/find/all/parent-child?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/groupMedicines/get/all`);
}