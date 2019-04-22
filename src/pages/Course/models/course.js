import { queryCourseList ,queryCourseComments,addCourseComments,queryCourseListDetail,queryCourseContent,queryCourseLike,queryCourseFavorite} from '@/services/course';
import { message } from 'antd';

export default {
  namespace: 'course',

  state: {
    course: [],
    courseDetail: [],
    courseContent:[],
    courseLike:[],
    courseFavorite:[],
    courseComments:[],
    commentData:[]
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCourseList, payload);
      yield put({
        type: 'queryList',
        payload: response,
      });
    },
    // 获取详情
    *fetchDetail({ payload }, { call, put }) {
        const response = yield call(queryCourseListDetail, payload);
        yield put({
          type: 'queryListDetail',
          payload: response,
        });
    },
    *fetchContent({ payload }, { call, put }) {
        const response = yield call(queryCourseContent, payload);
        yield put({
          type: 'queryContent',
          payload: response,
        });
    },
    // like
    *like({ payload }, { call, put }) {
        const response = yield call(queryCourseLike, payload);
        yield put({
          type: 'queryLike',
          payload: response,
        });
    },
    *favorite({ payload }, { call, put }) {
        const response = yield call(queryCourseFavorite, payload);
        yield put({
          type: 'queryFavorite',
          payload: response,
        });
    },
    // 获取评论列表
    *fetchComments({ payload }, { call, put }) {
        const response = yield call(queryCourseComments, payload);
        yield put({
          type: 'queryComments',
          payload: response,
        });
    },
    // 评论
    *comment({ payload }, { call, put }) {
        const response = yield call(addCourseComments, payload);
        if(response.status == 'ok'){
          message.success(response.msg)
        }else{
          message.error(response.msg)
        }
        yield put({
          type: 'addComments',
          payload: response,
        });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        course: action.payload,
      };
    },
    queryListDetail(state, action) {
        return {
          ...state,
          courseDetail: action.payload,
        };
    },
    addComments(state, action) {
        return {
          ...state,
          commentData: action.payload,
        };
    },
    queryComments(state, action) {
        return {
          ...state,
          courseComments: action.payload,
        };
    },
    queryContent(state, action) {
        return {
          ...state,
          courseContent: action.payload,
        };
    },
    queryLike(state, action) {
        return {
          ...state,
          courseLike: action.payload,
        };
    },
    queryFavorite(state, action) {
        return {
          ...state,
          courseFavorite: action.payload,
        };
    },
  },
};
