import { queryAppointData,querySkill,submitCourse,queryForm ,getImgVerify } from '@/services/appoint';
import { message } from 'antd';

export default {
  namespace: 'appoint',

  state: {
    isLoading: false,
    appointData:[],
    skillData:[],
    formData:[]
  },

  effects: {
  
   // 我的预约
    *fetch(_, { call, put }) {
        const response = yield call(queryAppointData);
        yield put({
        type: 'saveAppoint',
        payload: response,
        });
    },
    // 获取技能
    *fetchSkills(_, { call, put }) {
        const response = yield call(querySkill);
        yield put({
        type: 'saveSkill',
        payload: response,
        });
    },
    // 预约课程
    *submitRegularForm({payload}, { call, put }) {
        const response = yield call(submitCourse,payload);
        console.log('qwe',response)
        if(response.status == 'ok'){
            message.success('提交成功')
        }else{
            message.error('提交失败')
        }
    },
    // 获取短信验证码
    *fetchImgVerify({payload}, { call, put }) {
      const response = yield call(getImgVerify,payload);
      console.log('qwe',response)
    },
    // 检测是否登录
    *fetchForm(_, { call, put }) {
      const response = yield call(queryForm);
      yield put({
      type: 'saveForm',
      payload: response,
      });
    },
  },

  reducers: {
    saveAppoint(state, action) {
        return {
          ...state,
          appointData: action.payload,
        };
    },
    saveForm(state, action) {
      return {
        ...state,
        formData: action.payload,
      };
  },
    saveSkill(state, action) {
        return {
          ...state,
          skillData: action.payload,
        };
    },
  },
};
