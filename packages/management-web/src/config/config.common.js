export const commonConfig = {
  menus: [
    { name: '仪表盘', key: 'dashboard', path: '/', icon: 'area-chart' },
    { name: '应用管理', key: 'app', path: '/app', icon: 'appstore' },
    { name: '秘钥管理', key: 'key', path: '/key', icon: 'key' },
    {
      name: '系统设置',
      key: 'setting',
      icon: 'tool',
      children: [{ name: '没想好', key: 'setting-unknown', path: '/setting-unknown' }]
    }
  ]
};
