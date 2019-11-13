import { stringify } from 'query-string';
import request from '@/utils/request';
import CONFIG from '@/utils/config';

export async function queryRoles(params) {
    /* const { filter, sort, range } = params;
    const query = {
        filter: JSON.stringify(filter),
        sort: JSON.stringify(sort || ["id", "ASC"]),
        range: JSON.stringify(range),
    }; */
    return request(`${CONFIG.API_SERVER_2}/roles?${stringify(params)}`);
}

export async function addRoles(params) {
    return request(`${CONFIG.API_SERVER_2}/roles/bulk/update/${params.userId}`, {
        method: 'POST',
        body: [
            ...params.roles
        ],
    });
}

export async function authRoles(headers) {
    const query = {
        filter: JSON.stringify({
            sitesId: CONFIG.SITE_CORE_CMS
        }),
        // sort: JSON.stringify(sort || ["Name", "ASC"])
    };
    if (headers) {
        return request(`${CONFIG.API_SERVER_2}/auth_roles?${stringify(query)}`, {
            headers
        });
    }
    return request(`${CONFIG.API_SERVER_2}/auth_roles?${stringify(query)}`);
}
