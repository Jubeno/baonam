import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function querygroupPlaces(params) {
    return request(`${CONFIG.API_SERVER_2}/groupPlaces?${stringify(params)}`);
}

export function detailgroupPlaces(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/groupPlaces/${id}`, {
        method: 'GET',
    });
}

export async function removegroupPlaces(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/groupPlaces/${id}`, {
        method: 'DELETE',
    });
}

export async function addgroupPlaces(params) {
    return request(`${CONFIG.API_SERVER_2}/groupPlaces`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updategroupPlaces(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/groupPlaces/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querygroupPlaceAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/groupPlaces/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/groupPlaces/get/all`);
}