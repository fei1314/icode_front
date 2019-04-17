import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/user/ajax/get_user_info/');
}
// 获取个人信息
export async function queryCurrentInfo() {
  return request('/api/user/ajax/get_user_info/');
}
// 获取个人中心\
export async function queryPersonInfo() {
  return request('/api/user/ajax/get_user_information/');
}