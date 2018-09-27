import { action, observable } from 'mobx';
import { appService } from '../services';

export class AppListStore {
  /**
   * 用户是否已登录
   */
  @observable
  appList = [];
  /**
   * 从后端取分析数据
   */
  @action
  getAppListData() {
    return appService.getAppListData()
      .then(data => {
        console.log(data);
        if (data) {
          this.appList = data;
        }
      })
      .catch(err => console.log(err));
  }

}
