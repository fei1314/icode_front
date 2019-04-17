import { queryShopData  } from '@/services/shop';

export default {
  namespace: 'shop',

  state: {
    isLoading: false,
    shopData:[]
  },

  effects: {
  
   // 我的购物车
    *fetch(_, { call, put }) {
        const response = yield call(queryShopData);
        yield put({
        type: 'saveShop',
        payload: response,
        });
    },
  },

  reducers: {
    saveShop(state, action) {
        return {
          ...state,
          shopData: action.payload,
        };
    },
  },
};
