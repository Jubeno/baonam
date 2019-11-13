import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function querytemplates(params) {
    return request(`${CONFIG.API_SERVER_2}/templates?${stringify(params)}`);
}

export function detailtemplates(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/templates/${id}`, {
        method: 'GET',
    });
}

export async function removetemplates(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/templates/${id}`, {
        method: 'DELETE',
    });
}

export async function addtemplates(params) {
    return request(`${CONFIG.API_SERVER_2}/templates`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updatetemplates(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/templates/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querytemplateAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/templates/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/templates/get/all`);
}