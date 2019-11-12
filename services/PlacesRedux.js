import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function queryPlaces(params) {
    return request(`${CONFIG.API_SERVER_2}/places?${stringify(params)}`);
}

export function detailPlaces(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/places/${id}`, {
        method: 'GET',
    });
}

export async function removePlaces(id) {
    console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/places/${id}`, {
        method: 'DELETE',
    });
}

export async function addPlaces(params) {
    return request(`${CONFIG.API_SERVER_2}/places`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updatePlaces(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/places/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function queryPlacesAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/places/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/Places/get/all`);
}