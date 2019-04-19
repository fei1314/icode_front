import { queryProvince,querySkill, addCourseComments,fakeSubmitForm,queryCity,queryCurrentInfo,queryCurrent } from '@/services/info';

export default {
  namespace: 'info',

  state: {
    isLoading: false,
    currentInfo:{},
    currentUser:{},
    province: [],
    city: [],
    dataSkill:[],
    infoData:{}
  },

  effects: {
    
    // 判断是否登录
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    // 修改信息
    *submitRegularForm({ payload }, { call }) {
      const res = yield call(fakeSubmitForm, payload);
      if(res.status == 'ok'){
        message.success('更新成功');
      }else{
        message.error('更新失败');
      }
    },
   // 获取个人信息
    *fetchInfo(_, { call, put }) {
        const response = yield call(queryCurrentInfo);
        yield put({
        type: 'saveCurrentInfo',
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

    *fetchProvince(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryProvince);
      yield put({
        type: 'setProvince',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchCity({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryCity, payload);
      yield put({
        type: 'setCity',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    saveCurrentInfo(state, action) {
        return {
          ...state,
          currentInfo: action.payload,
        };
    },
    addComments(state, action) {
      return {
        ...state,
        infoData: action.payload,
      };
    },
    saveSkill(state, action) {
      return {
        ...state,
        dataSkill: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },

    setProvince(state, action) {
      return {
        ...state,
        province: action.payload,
      };
    },
   
    setCity(state, action) {
      return {
        ...state,
        city: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
};
