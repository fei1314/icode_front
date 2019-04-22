import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { fakeSubmitForm,getTeacher } from '@/services/api';

export default {
  namespace: 'concat',

  state: {
    step: {
      payAccount: 'ant-design@alipay.com',
      receiverAccount: 'test@example.com',
      receiverName: 'Alex',
      amount: '500',
    },
    dataTeacher:{}
  },

  effects: {
    // concat_us
    *submitRegularForm({ payload }, { call }) {
      const res = yield call(fakeSubmitForm, payload);
      if(res.status == 'ok'){
        message.success('提交成功');
      }else{
        message.error('提交失败');
      }
    },
    // 获取讲师
    *fetchTeacher({ payload }, { call, put }) {
      const response = yield call(getTeacher, payload);
      yield put({
        type: 'saveTeach',
        payload: response,
      });
  },
    *submitStepForm({ payload }, { call, put }) {
      yield call(fakeSubmitForm, payload);
      yield put({
        type: 'saveStepFormData',
        payload,
      });
      yield put(routerRedux.push('/form/step-form/result'));
    },
    *submitAdvancedForm({ payload }, { call }) {
      yield call(fakeSubmitForm, payload);
      message.success('提交成功');
    },
  },

  reducers: {
    saveTeach(state, action) {
      return {
        ...state,
        dataTeacher: action.payload,
      };
    },
    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};
