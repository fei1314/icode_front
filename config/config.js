// https://umijs.org/config/
import os from 'os';
import pageRoutes from './router.config';
import webpackPlugin from './plugin.config';
import defaultSettings from '../src/defaultSettings';
import slash from 'slash2';

const { pwa, primaryColor } = defaultSettings;
const { APP_TYPE, TEST } = process.env;

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        enable: true, // default false
        default: 'zh-CN', // default zh-CN
        baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false,
      ...(!TEST && os.platform() === 'darwin'
        ? {
            dll: {
              include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
              exclude: ['@babel/runtime', 'netlify-lambda'],
            },
            hardSource: false,
          }
        : {}),
    },
  ],
];

// 针对 preview.pro.ant.design 的 GA 统计代码
// 业务上不需要这个
if (APP_TYPE === 'site') {
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
}

export default {
  // add for transfer to umi
  plugins,
  define: {
    APP_TYPE: APP_TYPE || '',
  },
  treeShaking: true,
  targets: {
    ie: 11,
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  proxy: {
    // '/server/api/': {
    //   target: 'https://preview.pro.ant.design/',
    //   changeOrigin: true,
    //   pathRewrite: { '^/server': '' },
    // },
    '/api/user/ajax/login/cellphone': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
    '/api/user/ajax/get_user_info/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
    // 获取个人中心
    '/api/user/ajax/get_user_information/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
    // 获取我的优惠券
    '/api/user/ajax/get_my_coupon/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
    // 我的购物车
    '/api/user/ajax/get_my_trolley/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
    // 我的收藏
    '/api/user/ajax/get_my_favorite/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
    // concat us
    '/api/user/ajax/contact_us/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
    // course_list
    '/api/course/all_curriculum': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
    // course detail
    '/api/course/get_curriculum_by_id/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    // get course content
    '/api/course/course_option/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    // 评论列表
    '/api/course/get_comments_likes': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    // 获取技能
    '/api/common/get_all_skills': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    // 修改个人信息
    '/api/user/ajax/update_user_info/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    //  我的邀请
    '/api/user/ajax/get_my_share_link/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    // 我的作品
    '/api/user/ajax/get_my_product/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    // 我的预约
    '/api/user/ajax/get_my_order/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    // 预约课程
    '/api/user/ajax/make_order/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    // 家长
    '/api/common/get_main_page': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    '/api/user/ajax/make_order/check_phone': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    // 获取短信验证码
    '/api/user/ajax/login/get_cellphone_code': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    // 登录
    '/api/user/ajax/login/cellphone': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    // 省
     '/api/common/geographic/province': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    // 市
    '/api/common/geographic/city': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    '/api/user/ajax/update_user_avatar/': {
      target: 'https://www.icode121.com',
      changeOrigin: true,
    },
    
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, localIdentName, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }
      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },

  chainWebpack: webpackPlugin,
};
