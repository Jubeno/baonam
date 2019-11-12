import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function querygroupWebsites(params) {
    return request(`${CONFIG.API_SERVER_2}/groupSites?${stringify(params)}`);
}

export function detailgroupWebsites(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/groupSites/${id}`, {
        method: 'GET',
    });
}

export async function removegroupWebsites(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/groupSites/${id}`, {
        method: 'DELETE',
    });
}

export async function addgroupWebsites(params) {
    return request(`${CONFIG.API_SERVER_2}/groupSites`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updategroupWebsites(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/groupSites/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querygroupWebsiteAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/groupSites/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/groupWebsites/get/all`);
}