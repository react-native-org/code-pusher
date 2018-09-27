import fetchMock from 'fetch-mock';
import appList from './appList';
import  charts from './charts';

export default {
  start() {
    fetchMock.get('http://10.16.87.146:3000/api/analysis', () => {
      return charts.getFakeChartData;
    })

    fetchMock.get('http://10.16.87.146:3000/api/appList', () => {
      return appList.fake_list_data
    })

  }
}
