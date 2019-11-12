import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// user
export async function queryCustomers(params) {
    // log(params)
    // log(CONFIG.API_SERVER_2 + "/users/statistics/gatewayId?" +params)
    return request(`${CONFIG.API_SERVER_2}/reports/places/customer?${stringify(params)}`);
}

export async function queryDoctors(params) {
    return request(`${CONFIG.API_SERVER_2}/reports/places/doctor?${stringify(params)}`);
}
export async function queryMedicines(params) {
    // log('queryMedicines', `${CONFIG.API_SERVER_2}/reports/places/medicines?${stringify(params)}`)
    return request(`${CONFIG.API_SERVER_2}/reports/places/medicines?${stringify(params)}`);
}
export async function queryStaff(params) {
    return request(`${CONFIG.API_SERVER_2}/reports/places/staff?${stringify(params)}`);
}
export async function querySuppliers(params) {
    return request(`${CONFIG.API_SERVER_2}/reports/places/supplier?${stringify(params)}`);
}
export async function queryRevenue(params) {
    return request(`${CONFIG.API_SERVER_2}/reports/revenue/place?${stringify(params)}`);
}
export async function queryRevenueDetail(params) {
    return request(`${CONFIG.API_SERVER_2}/reports/revenue/detail/place?${stringify(params)}`);
}