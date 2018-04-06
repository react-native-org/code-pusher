import './MainLayout.less';

import { Icon, Layout, Menu } from 'antd';
import { Link, Route, Switch } from 'react-router-dom';
import React, { PureComponent } from 'react';

import { bindSelf } from '../../utils';
import { config } from '../../config';

const menus = config.menus;

function isAbsolutePath(path) {
  return (path || '').indexOf('http') === 0;
}

export class MainLayout extends PureComponent {
  state = {
    menuCollapsed: false,
    defaultOpenKeys: this.getDefaultOpenKeys()
  };

  componentWillMount() {
    this._checkLoginState(this.props.isLogged);
  }
  componentWillReceiveProps(newProps) {
    this._checkLoginState(newProps.isLogged);
  }

  componentDidMount() {
    this.getDefaultOpenKeys();
  }

  getDefaultOpenKeys() {
    const { location: { pathname } } = this.props;
    return this._searchPathInMenus(menus, pathname);
  }

  _searchPathInMenus(menus, pathname) {
    const result = [];
    for (const m of menus) {
      result.length = 0;
      if (pathname === m.path) {
        return [m.key];
      } else if (m.children) {
        const childKeys = this._searchPathInMenus(m.children, pathname);
        if (childKeys.length > 0) {
          return [m.key, ...childKeys];
        }
      }
    }
    return result;
  }

  _checkLoginState(isLogged) {
    // if (!isLogged) {
    //   this.props.history.push('/login');
    // }
  }

  getNavMenuItems(menusData, parentPath = '') {
    if (!menusData) {
      return [];
    }
    return menusData.map(item => {
      if (!item.name) {
        return null;
      }
      let itemPath;
      if (isAbsolutePath(item.path)) {
        itemPath = item.path;
      } else {
        itemPath = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
      }
      if (item.children && item.children.some(child => child.name)) {
        return (
          <Menu.SubMenu
            title={
              item.icon ? (
                <span>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.key || item.path}
          >
            {this.getNavMenuItems(item.children, '')}
          </Menu.SubMenu>
        );
      }
      const icon = item.icon && <Icon type={item.icon} />;
      return (
        <Menu.Item key={item.key || item.path}>
          {isAbsolutePath(itemPath) ? (
            <a href={itemPath} target={item.target}>
              {icon}
              <span>{item.name}</span>
            </a>
          ) : (
            <Link to={itemPath} target={item.target} replace={itemPath === this.props.location.pathname}>
              {icon}
              <span>{item.name}</span>
            </Link>
          )}
        </Menu.Item>
      );
    });
  }

  getCurrentMenuSelectedKeys(props) {
    const { location: { pathname } } = props || this.props;
    const keys = pathname.split('/').slice(1);
    if (keys.length === 1 && keys[0] === '') {
      return [menus[0].key];
    }
    console.log('xxx', keys);
    return keys;
  }

  @bindSelf
  handleMenuCollapseChange() {
    this.setState({ menuCollapsed: !this.state.menuCollapsed });
  }

  render() {
    return (
      <Layout className="page-layout">
        <Layout.Sider collapsed={this.state.menuCollapsed} onCollapse={this.handleMenuCollapseChange}>
          <div className="logo-div text-center">
            <h2 title="React Native Hotfix Platform">{this.state.menuCollapsed ? 'HP' : 'Hot Push'}</h2>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={this.getCurrentMenuSelectedKeys()}
            defaultOpenKeys={this.state.defaultOpenKeys}
          >
            {this.getNavMenuItems(menus)}
          </Menu>
        </Layout.Sider>
        <Layout>
          <Layout.Header>
            <Icon
              className="menu-collapse-icon"
              type={this.state.menuCollapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.handleMenuCollapseChange}
            />
          </Layout.Header>
          <Layout.Content>
            <Switch>
              {this.props.routes.map((route, idx) => (
                <Route
                  key={idx}
                  path={route.path}
                  exact
                  render={props => <route.component {...props} routes={route.routes} />}
                />
              ))}
            </Switch>
          </Layout.Content>
          {false ? <Layout.Footer>折是Footer</Layout.Footer> : null}
        </Layout>
      </Layout>
    );
  }
}
