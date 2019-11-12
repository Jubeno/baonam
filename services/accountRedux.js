// import getConfig from 'next/config'
import request from '../utils/request';
import publicRuntimeConfig from '@/utils/config'

export async function fakeAccountLogin(params) {
    return request(`${publicRuntimeConfig.API_ENDPOINT}/authenticate`, {
        method: 'POST',
        body: params,
    });
}

export async function socialAccountLogin(params) {
    return request(`${publicRuntimeConfig.API_ENDPOINT}/authenticate/social`, {
        method: 'POST',
        body: params,
    });
}

export async function verify(params) {
    return request(`${publicRuntimeConfig.API_ENDPOINT}/verify`, {
        method: 'POST',
        body: params,
    });
}

export async function fakeRegister(params) {
    return request(`${publicRuntimeConfig.API_ENDPOINT}/signup`, {
        method: 'POST',
        body: params,
    });
}

export async function queryDashboard() {
    return request(`${publicRuntimeConfig.API_SERVER}/siteUsageLogs`);
}


