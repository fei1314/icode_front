import { queryInvitationData  } from '@/services/coupons';

export default {
  namespace: 'invitation',

  state: {
    isLoading: false,
    invitationData:[]
  },

  effects: {
  
   // 获取我的邀请
    *fetch(_, { call, put }) {
        const response = yield call(queryInvitationData);
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
          invitationData: action.payload,
        };
    },
  },
};
