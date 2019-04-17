import request from '@/utils/request';
// 我的优惠券
export async function queryCouponsData() {
  return request('/api/user/ajax/get_my_coupon/');
}
// 我的邀请
export async function queryInvitationData() {
  return request('/api/user/ajax/get_my_share_link/');
}
