import request from '@/utils/request';
import { stringify } from 'qs';
export async function queryShopData() {
  return request('/api/user/ajax/get_my_trolley/');
}
// 删除
export async function removeShopData(params) {
  return request('/api/course/trolley_option', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    credentials: 'include',
    data:stringify(params)
  });
}