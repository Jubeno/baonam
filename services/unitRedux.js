import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function queryunits(params) {
    log(' queryunits ', `${CONFIG.API_SERVER_2}/units?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/units?${stringify(params)}`);
}

export function detailunits(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/units/${id}`, {
        method: 'GET',
    });
}

export async function removeunits(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/units/${id}`, {
        method: 'DELETE',
    });
}

export async function addunits(params) {
    return request(`${CONFIG.API_SERVER_2}/units`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateunits(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/units/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function queryunitAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/units/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/units/get/all`);
}