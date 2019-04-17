import request from '@/utils/request';
import { stringify } from 'qs';
// course
export async function queryCourseList() {
  return request('/api/course/all_curriculum');
}
// 获取评论列表
export async function queryCourseComments(params) {
    return request(`/api/course/get_comments_likes?course_id=${params}`);
}
// course detail
  export async function queryCourseListDetail(params) {
    return request('/api/course/get_curriculum_by_id/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      credentials: 'include',
      data:stringify(params)
    });
}
// get course content
export async function queryCourseContent(params) {
    return request('/api/course/course_option/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      credentials: 'include',
      data:stringify(params)
    });
}
// like
export async function queryCourseLike(params) {
    return request('/api/course/course_option/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      credentials: 'include',
      data:stringify(params)
    });
}
// 收藏
export async function queryCourseFavorite(params) {
    return request('/api/course/course_option/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      credentials: 'include',
      data:stringify(params)
    });
}
// 评论
export async function addCourseComments(params) {
    return request('/api/course/course_option/', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      credentials: 'include',
      data:stringify(params)
    });
}