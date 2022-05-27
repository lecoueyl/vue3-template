import {
  AMapControlBar,
  AMapFitView,
  AMapGeolocation,
  AMapMap,
  AMapMapType,
  AMapMarker,
  AMapScale,
  AMapSearch,
  AMapToolbar,
  AMapVector,
} from './AMap';

import {
  FenceView,
} from './Fence';

export default {
  install(app) {
    [
      AMapControlBar,
      AMapFitView,
      AMapGeolocation,
      AMapMap,
      AMapMapType,
      AMapMarker,
      AMapScale,
      AMapSearch,
      AMapToolbar,
      AMapVector,
      FenceView,
    ].forEach((Component) => {
      if (!Component.name) {
        // eslint-disable-next-line no-console
        console.warn('Component is required, ', Component);
      }
      app.component(Component.name, Component);
    });
  },
};
