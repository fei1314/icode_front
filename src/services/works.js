import request from '@/utils/request';
// 我的作品
export async function queryWorksData() {
  return request('/api/user/ajax/get_my_product/');
}

