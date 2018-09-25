export const commonConfig = {
  apiHost: 'http://10.16.87.146:3000/',
  menus: [
    { name: '仪表盘', key: 'dashboard', path: '/', icon: 'area-chart' },
    { name: '应用管理', key: 'app', path: '/app', icon: 'appstore' },
    { name: '密钥管理', key: 'key', path: '/key', icon: 'key' },
    {
      name: '系统设置',
      key: 'setting',
      icon: 'tool',
      children: [{ name: '没想好', key: 'setting-unknown', path: '/setting-unknown' }]
    }
  ],
  setting: {
    navTheme: 'dark', // theme for nav menu
    primaryColor: '#1890FF', // primary color of ant design
    layout: 'sidemenu', // nav menu position: sidemenu or topmenu
    contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
    fixedHeader: false, // sticky header
    autoHideHeader: false, // auto hide header
    fixSiderbar: false, // sticky siderbar
  }
};
