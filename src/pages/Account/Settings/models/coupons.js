import { queryCouponsData  } from '@/services/coupons';

export default {
  namespace: 'coupons',

  state: {
    isLoading: false,
    couponsData:[]
  },

  effects: {
  
   // 获取优惠券
    *fetch(_, { call, put }) {
        const response = yield call(queryCouponsData);
        yield put({
        type: 'saveCoupons',
        payload: response,
        });
    },
  },

  reducers: {
    saveCoupons(state, action) {
        return {
          ...state,
          couponsData: action.payload,
        };
    },
  },
};
