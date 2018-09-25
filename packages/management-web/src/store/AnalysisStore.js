import { action, observable } from 'mobx';
import { homeService } from '../services';

export class AnalysisStore {
  /**
   * 用户是否已登录
   */
  @observable
  chartData = {};
  /**
   * 从后端取分析数据
   */
  @action
  setAnalysisData() {
    return homeService.getAnalysisChartData()
      .then(data => {
        if (data) {
          this.chartData = data;
        }
      })
      .catch(err => console.log(err));
  }

}
