export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    name: 'workplace',
    icon: 'smile',
    path: '/workplace',
    component: './workplace',
  },
  {
    name: 'analysis',
    icon: 'smile',
    path: '/analysis',
    component: './analysis',
  },
  {
    name: 'advanced-form',
    icon: 'smile',
    path: '/advanced-form',
    component: './advanced-form',
  },
  {
    component: './404',
  },
];
