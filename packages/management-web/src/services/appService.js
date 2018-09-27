import { ajax } from '../utils';

export const appService = {

  getAppListData() {
    return ajax.get('api/appList');
  }

}
