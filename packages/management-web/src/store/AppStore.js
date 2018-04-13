import { action, observable } from 'mobx';

export class AppStore {
  /**
   * 用户是否已登录
   */
  @observable isLogged = false;
  /**
   * 用户信息
   */
  @observable userInfo = {};

  constructor() {}

  /**
   * 设置用户信息，如果参数userInfo为null，则表示清空用户信息
   * @param {object} userInfo
   */
  @action
  setUserInfo(userInfo) {
    if (userInfo) {
      this.isLogged = true;
      Object.assign(this.userInfo, userInfo);
    } else {
      this.isLogged = false;
      this.userInfo = {};
    }
  }
}
