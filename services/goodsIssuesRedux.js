import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function querygoodsIssues(params) {
    log(' querygoodsIssues ', `${CONFIG.API_SERVER_2}/goodsIssues?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/goodsIssues?${stringify(params)}`);
}

export function detailgoodsIssues(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/goodsIssues/${id}`, {
        method: 'GET',
    });
}

export async function removegoodsIssues(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/goodsIssues/${id}`, {
        method: 'DELETE',
    });
}

export async function addgoodsIssues(params) {
    return request(`${CONFIG.API_SERVER_2}/goodsIssues`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updategoodsIssues(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/goodsIssues/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querygoodsIssuesAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/goodsIssues/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/goodsIssues/get/all`);
}