import request from '@/utils/request';

export async function queryCollectData() {
  return request('/api/user/ajax/get_my_favorite/');
}

