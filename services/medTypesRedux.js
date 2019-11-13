import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function queryMedTypes(params) {
    return request(`${CONFIG.API_SERVER_2}/types?${stringify(params)}`);
}

export function detailMedTypes(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    log("detailMedTypes", `${CONFIG.API_SERVER_2}/types/${id}`)
    return request(`${CONFIG.API_SERVER_2}/types/${id}`, {
        method: 'GET',
    });
}

export async function removeMedTypes(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/types/${id}`, {
        method: 'DELETE',
    });
}

export async function addMedTypes(params) {
    return request(`${CONFIG.API_SERVER_2}/types`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateMedTypes(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/types/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function queryMedTypesAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/types/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/types/get/all`);
}