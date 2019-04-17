export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
      {
        component: '404',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { 
        path: '/', redirect: '/dashboard/analysis'},
      {
        path: '/dashboard/analysis',
        name: '首页',
        // icon: 'dashboard',
        component: './Dashboard/Analysis',
        // routes: [
        //   {
        //     path: '/dashboard/analysis',
        //     name: 'analysis',
        //     component: './Dashboard/Analysis',
        //   },
        // ],
      },
     
      // course
      {
        path: '/course',
        name: '课程体系',
        component: './Course/BasicCourse',
      },
      {
        path: '/coursed/:id',
        component: './Course/$id.js',
      },
      {
        path: '/coursedc/:id',
        component: './Course/$idc.js',
      },
       // forms
       {
        path: '/form',
        name: '联系我们',
        component: './Forms/BasicForm',
        // routes: [
        //   {
        //     path: '/form/basic-form',
        //     name: 'basicform',
        //     component: './Forms/BasicForm',
        //   },
        // ],
      },
      // course detail
      
      // list
      // {
      //   path: '/list',
      //   icon: 'table',
      //   name: 'list',
      //   routes: [
      //     {
      //       path: '/list/table-list',
      //       name: 'searchtable',
      //       component: './List/TableList',
      //     },
      //     {
      //       path: '/list/card-list',
      //       name: 'cardlist',
      //       component: './List/CardList',
      //     },
      //   ],
      // },
      // {
      //   name: 'exception',
      //   icon: 'warning',
      //   path: '/exception',
      //   routes: [
      //     // exception
      //     {
      //       path: '/exception/403',
      //       name: 'not-permission',
      //       component: './Exception/403',
      //     },
      //     {
      //       path: '/exception/404',
      //       name: 'not-find',
      //       component: './Exception/404',
      //     },
      //     {
      //       path: '/exception/500',
      //       name: 'server-error',
      //       component: './Exception/500',
      //     },
      //     {
      //       path: '/exception/trigger',
      //       name: 'trigger',
      //       hideInMenu: true,
      //       component: './Exception/TriggerException',
      //     },
      //   ],
      // },
      {
        name: 'account',
        path: '/account/settings',
        routes: [
          // {
          //   path: '/account/center',
          //   name: 'center',
          //   component: './Account/Center/Center',
          //   routes: [
          //     {
          //       path: '/account/center',
          //       redirect: '/account/center/articles',
          //     },
          //     {
          //       path: '/account/center/articles',
          //       component: './Account/Center/Articles',
          //     },
             
          //   ],
          // },
          {
            path: '/account/settings',
            // name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
              {
                path: '/account/settings/invitation',
                component: './Account/Settings/InvitationView',
              },
              {
                path: '/account/settings/works',
                component: './Account/Settings/WorksView',
              },
              {
                path: '/account/settings/appoint',
                component: './Account/Settings/AppointView',
              },
            ],
          },
        ],
      },
     
      {
        component: '404',
      },
    ],
  },
];
