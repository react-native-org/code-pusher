import { AnalysisStore } from './AnalysisStore';
import { AppListStore } from './AppListStore';
import { AppStore } from './AppStore';

const appStore = new AppStore();
const analysisStore = new AnalysisStore();
const appListStore = new AppListStore();

export {
  appStore,
  analysisStore,
  appListStore
}
