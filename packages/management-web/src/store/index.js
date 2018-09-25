import { AnalysisStore } from './AnalysisStore';
import { AppStore } from './AppStore';

const appStore = new AppStore();
const analysisStore = new AnalysisStore();

export {
  appStore,
  analysisStore
}
