import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}
// concat us
export async function fakeSubmitForm(params) {
  return request('/api/user/ajax/contact_us/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      
    },
    credentials: 'include',
    data:stringify(params)
  });
}
// 家长
export async function fetchparentsData() {
  return request('/api/common/get_main_page');
}
export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    ContentType: multipart/form-data,
    data: {
      ...restParams,
      method: 'update',
    },
  });
}
// 登录
export async function fakeAccountLogin(params) {
  return request('/api/user/ajax/login/cellphone', {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      
    },
    credentials: 'include',
    data:stringify(params)
  });
}
// 注销
export async function fakeAccountLogout() {
  return request('/api/user/ajax/logout/');
}
export async function fakeRegister(params = {}) {
  // return request(`/api/notices?${stringify(params)}`);
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
