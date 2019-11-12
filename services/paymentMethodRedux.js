import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function querypaymentMethods(params) {
    log(' querypaymentMethods ', `${CONFIG.API_SERVER_2}/paymentMethods?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/paymentMethods?${stringify(params)}`);
}

export function detailpaymentMethods(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/paymentMethods/${id}`, {
        method: 'GET',
    });
}

export async function removepaymentMethods(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/paymentMethods/${id}`, {
        method: 'DELETE',
    });
}

export async function addpaymentMethods(params) {
    return request(`${CONFIG.API_SERVER_2}/paymentMethods`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updatepaymentMethods(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/paymentMethods/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querypaymentMethodAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/paymentMethods/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/paymentMethods/get/all`);
}