import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function queryGroupUsers(params) {
    return request(`${CONFIG.API_SERVER_2}/groupUsers?${stringify(params)}`);
}

export function detailGroupUsers(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/groupUsers/${id}`, {
        method: 'GET',
    });
}

export async function removeGroupUsers(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/groupUsers/${id}`, {
        method: 'DELETE',
    });
}

export async function addGroupUsers(params) {
    return request(`${CONFIG.API_SERVER_2}/groupUsers`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updateGroupUsers(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/groupUsers/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function queryGroupUserAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/groupUsers/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/GroupUsers/get/all`);
}