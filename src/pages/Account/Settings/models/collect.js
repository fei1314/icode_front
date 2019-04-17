import { queryCollectData  } from '@/services/collect';

export default {
  namespace: 'collect',

  state: {
    isLoading: false,
    collectData:[]
  },

  effects: {
  
   // 我的收藏
    *fetch(_, { call, put }) {
        const response = yield call(queryCollectData);
        yield put({
        type: 'saveCollect',
        payload: response,
        });
    },
  },

  reducers: {
    saveCollect(state, action) {
        return {
          ...state,
          collectData: action.payload,
        };
    },
  },
};
