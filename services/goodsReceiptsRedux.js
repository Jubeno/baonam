import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function querygoodsReceipts(params) {
    log(' querygoodsReceipts ', `${CONFIG.API_SERVER_2}/goodsReceipts?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/goodsReceipts?${stringify(params)}`);
}

export function detailgoodsReceipts(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/goodsReceipts/${id}`, {
        method: 'GET',
    });
}

export async function removegoodsReceipts(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/goodsReceipts/${id}`, {
        method: 'DELETE',
    });
}

export async function addgoodsReceipts(params) {
    return request(`${CONFIG.API_SERVER_2}/goodsReceipts`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updategoodsReceipts(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/goodsReceipts/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querygoodsReceiptsAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/goodsReceipts/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/goodsReceipts/get/all`);
}