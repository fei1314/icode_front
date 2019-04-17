import request from '@/utils/request';
import { stringify } from 'qs';
export async function queryAppointData() {
  return request('/api/user/ajax/get_my_order/');
}

export async function querySkill() {
    return request(`/api/common/get_all_skills`);
}
export async function queryForm() {
  return request(`/api/user/ajax/make_order/check_phone`);
}
// 预约课程
export async function submitCourse(params) {
    console.log('params',params)
    return request('/api/user/ajax/make_order/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        
      },
      credentials: 'include',
      data:stringify(params)
    });
  }