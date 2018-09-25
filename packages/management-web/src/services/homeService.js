import { ajax } from '../utils/';

export const homeService = {

  getAnalysisChartData() {
    return ajax.get('api/analysis');
  }

}
