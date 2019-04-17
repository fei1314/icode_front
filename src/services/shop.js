import request from '@/utils/request';

export async function queryShopData() {
  return request('/api/user/ajax/get_my_trolley/');
}

