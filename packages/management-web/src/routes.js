import * as pages from './pages';

export const routes = [
  { path: '/login', exact: true, component: pages.LoginPage },
  {
    path: '/',
    component: pages.MainLayout,
    routes: [
      { path: '/', exact: true, component: pages.HomePage },
      { path: '/app', component: pages.AppListPage },
      { path: '/app/edit', component: pages.AppInfoFormPage },
      { path: '/key', component: pages.KeyListPage },
      { path: '', component: pages.NotFoundPage }
    ]
  }
];
