import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha ,fakeAccountLogout,getImgVerify,submitCourse} from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { message } from 'antd';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    verifyData:{},
    loginData:{}
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
   
    // 获取短信验证码
    *fetchImgVerify({payload}, { call, put }) {
      const response = yield call(getImgVerify,payload);
      if(response.status == 'ok'){
        message.success('发送成功')
      }else{
        message.error('图片验证码不正确')
      }
      yield put({
        type: 'saveVerify',
        payload:response
      });
    },
    // 登录
    // 预约课程
    *submitRegularForm({payload}, { call, put }) {
      const response = yield call(submitCourse,payload);
      if(response.status == 'ok'){
          message.success('登录成功')
      }else{
          message.error('登录失败')
      }
      yield put({
        type: 'saveLogin',
        payload:response
      });
  },
    *logout(_, {call, put }) {
      console.log('123')
      const response = yield call(fakeAccountLogout);
      console.log('response',response)
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    saveVerify(state, action) {
      return {
        ...state,
        verifyData: action.payload,
      };
  },
  saveLogin(state, action) {
    return {
      ...state,
      loginData: action.payload,
    };
},
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
