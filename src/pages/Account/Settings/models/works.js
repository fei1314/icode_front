import { queryWorksData  } from '@/services/works';

export default {
  namespace: 'works',

  state: {
    isLoading: false,
    worksData:[]
  },

  effects: {
  
   // 获取我的作品
    *fetch(_, { call, put }) {
        const response = yield call(queryWorksData);
        yield put({
        type: 'saveWorks',
        payload: response,
        });
    },
  },

  reducers: {
    saveWorks(state, action) {
        return {
          ...state,
          worksData: action.payload,
        };
    },
  },
};
