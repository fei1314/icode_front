import request from '@/utils/request';
import { stringify } from 'qs';
export async function queryCurrentInfo() {
  return request('/api/user/ajax/get_user_information/');
}

export async function queryCurrent() {
    return request('/api/user/ajax/get_user_info/');
}
export async function queryProvince() {
  return request('/api/common/geographic/province');
}

export async function queryCity(province) {
  return request(`/api/common/geographic/city/${province}`);
}
export async function querySkill() {
  return request(`/api/common/get_all_skills`);
}

export async function fakeSubmitForm(params) {
  console.log('params',params)
  return request('/api/user/ajax/update_user_info/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    credentials: 'include',
    data:stringify(params)
  });
}

