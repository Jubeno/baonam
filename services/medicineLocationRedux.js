import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function querymedicineLocations(params) {
    log(' querymedicineLocations ', `${CONFIG.API_SERVER_2}/medicineLocations?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/medicineLocations?${stringify(params)}`);
}

export function detailmedicineLocations(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/medicineLocations/${id}`, {
        method: 'GET',
    });
}

export async function removemedicineLocations(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/medicineLocations/${id}`, {
        method: 'DELETE',
    });
}

export async function addmedicineLocations(params) {
    return request(`${CONFIG.API_SERVER_2}/medicineLocations`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updatemedicineLocations(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/medicineLocations/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querymedicineLocationAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/medicineLocations/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/medicineLocations/get/all`);
}