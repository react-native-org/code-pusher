export const commonConfig = {
  menus: [
    { name: '仪表盘', key: 'dashboard', path: '/', icon: 'area-chart' },
    {
      name: '用户管理',
      path: '',
      icon: 'user',
      key: 'user-management',
      children: [
        { name: '普通用户', key: 'basic-user', path: '/basic-user' },
        { name: '企业用户', key: 'enterprice-user', path: '/enterprice-user' }
      ]
    }
  ]
};
