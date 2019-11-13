/* eslint-disable import/prefer-default-export */
import request from '@/utils/request';
// import { stringify } from 'query-string';
// import CONFIG from '@/utils/config';

export async function queryNotices() {
    return request('/api/notices');
}
