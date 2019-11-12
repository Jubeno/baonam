import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function querycategories(params) {
    return request(`${CONFIG.API_SERVER_2}/categories/find/list/parent-child?${stringify(params)}`);
}

export function detailcategories(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/categories/${id}`, {
        method: 'GET',
    });
}

export async function removecategories(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/categories/${id}`, {
        method: 'DELETE',
    });
}

export async function addcategories(params) {
    return request(`${CONFIG.API_SERVER_2}/categories`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updatecategories(id, params) {
    // console.log("dadsa", params)
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/categories/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querycategorieAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/categories/find/all/parent-child?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/categories/get/all`);
}