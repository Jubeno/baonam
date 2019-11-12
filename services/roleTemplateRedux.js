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
    return request(`${CONFIG.API_SERVER_2}/rolesTemplates?${stringify(params)}`);
}

export async function addRoles(params) {
    return request(`${CONFIG.API_SERVER_2}/rolesTemplates/bulk/update/${params.groupUserId}`, {
        method: 'POST',
        body: [
            ...params.roles
        ],
    });
}
