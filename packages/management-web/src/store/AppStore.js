import { action, observable } from 'mobx';
import { config } from '../config';

export class AppStore {
  /**
   * 用户是否已登录
   */
  @observable
  isLogged = false;
  /**
   * 用户信息
   */
  @observable
  userInfo = {
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    name: 'Serati Ma',
    notifyCount: 12
  };
  /**
   * 系统设置
   */
  @observable
  setting = config.setting;

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
