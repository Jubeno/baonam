import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function querytemplateLayouts(params) {
    return request(`${CONFIG.API_SERVER_2}/templateLayouts?${stringify(params)}`);
}

export function detailtemplateLayouts(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/templateLayouts/${id}`, {
        method: 'GET',
    });
}

export async function removetemplateLayouts(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/templateLayouts/${id}`, {
        method: 'DELETE',
    });
}

export async function addtemplateLayouts(params) {
    return request(`${CONFIG.API_SERVER_2}/templateLayouts`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updatetemplateLayouts(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/templateLayouts/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querytemplateLayoutAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/templateLayouts/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/templateLayouts/get/all`);
}