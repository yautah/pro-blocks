const routes =  {
  name: 'BLOCK_NAME_CAMEL_CASE',
  icon: 'team',
  path: 'ROUTE_PATH',
  hideChildrenInMenu: 'true',
  routes: [
    {
      path: 'ROUTE_PATH',
      redirect: 'ROUTE_PATH/list',
    },
    {
      path: 'ROUTE_PATH/list',
      component: '.ROUTE_PATH/list',
    },
    {
      name: 'BLOCK_NAME_CAMEL_CASENew',
      path: 'ROUTE_PATH/new',
      component: '.ROUTE_PATH/new',
    },
    {
      name: 'BLOCK_NAME_CAMEL_CASEEdit',
      path: 'ROUTE_PATH/edit/:id',
      component: '.ROUTE_PATH/edit',
    },
  ],
}

const locals = {
  'menu.BLOCK_NAME_CAMEL_CASE': '记录列表',
  'menu.BLOCK_NAME_CAMEL_CASE.BLOCK_NAME_CAMEL_CASENew': '新建记录',
  'menu.BLOCK_NAME_CAMEL_CASE.BLOCK_NAME_CAMEL_CASEEdit': '编辑记录',
}
