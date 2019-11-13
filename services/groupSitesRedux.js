import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// eslint-disable-next-line import/prefer-default-export
export async function getAllGroupSites(params) {
    return request(`${CONFIG.API_SERVER_2}/groupSites/get/all?${stringify(params)}`);
  }