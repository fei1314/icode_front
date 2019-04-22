import { queryShopData,removeShopData  } from '@/services/shop';
import { message } from 'antd';

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
  

     // 删除购物车
     *del_cart({ payload }, { call, put }) {
      const response = yield call(removeShopData, payload);
      if(response.status == 'ok'){
        message.success('删除成功')
      }else{
        message.error('删除失败')
      }
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
