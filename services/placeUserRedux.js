import { stringify } from 'qs';
import request from '@/utils/request';
import CONFIG from '@/utils/config';
// import log from '@/utils/log';

// eslint-disable-next-line import/prefer-default-export
export async function getAllPlaceUser(params) {
  return request(`${CONFIG.API_SERVER_2}/placesUsers/get/all?${stringify(params)}`);
}

export async function addOrUpdatePlaceUser(params) {
  const { usersId } = params;
  return request(`${CONFIG.API_SERVER_2}/users/usersPlaces/${usersId}`, {
    method: 'PUT',
    body: {
      placesId: params.placesId
    },
  });
}