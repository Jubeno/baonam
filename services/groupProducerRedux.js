import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
import log from '@/utils/log';

// user
export async function querygroupProducers(params) {
    log(' querygroupProducers ', `${CONFIG.API_SERVER_2}/groupProducers?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/groupProducers?${stringify(params)}`);
}

export function detailgroupProducers(id) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    return request(`${CONFIG.API_SERVER_2}/groupProducers/${id}`, {
        method: 'GET',
    });
}

export async function removegroupProducers(id) {
    // console.log("id", id)
    return request(`${CONFIG.API_SERVER_2}/groupProducers/${id}`, {
        method: 'DELETE',
    });
}

export async function addgroupProducers(params) {
    return request(`${CONFIG.API_SERVER_2}/groupProducers`, {
        method: 'POST',
        body: {
            ...params,
            method: 'post',
        },
    });
}

export async function updategroupProducers(id, params) {
    // const urlRequest = `${API_ENDPOINT}/companies/${id}`;
    const urlRequest = `${CONFIG.API_SERVER_2}/groupProducers/${id}`;
    return request(urlRequest, {
        method: 'PUT',
        body: {
            ...params,
            method: 'update',
        },
    });
}

export async function querygroupProducerAll(params) {
    const { filter, sort } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["name", "ASC"]),
    };
    return request(`${CONFIG.API_SERVER_2}/groupProducers/get/all?${stringify(query)}`);
    // return request(`${CONFIG.API_SERVER_2}/groupProducers/get/all`);
}