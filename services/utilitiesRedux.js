import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function queryOutOfStock(params) {
    // log(params)
    // log(CONFIG.API_SERVER_2 + "/users/statistics/gatewayId?" +params)
    return request(`${CONFIG.API_SERVER_2}/reports/places/medicines/outOfStock?${stringify(params)}`);
}

export async function queryExpiredDate(params) {
    return request(`${CONFIG.API_SERVER_2}/reports/places/medicines/expiredDate?${stringify(params)}`);
}
