<template>
  <div id="wrapper">
    <a-spin
      v-if="!state.initialized"
      class="wrapper__spin"
      spinning
      size="large"
    />
    <div id="container">
      <slot v-if="state.initialized" />
    </div>
  </div>
</template>

<script>
import {
  defineComponent, onBeforeUnmount, onMounted, shallowReactive,
} from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import { useProvideMap } from '@/composables/map';

export default defineComponent({
  setup() {
    const state = shallowReactive({
      map: null,
      AMap: null,
      initialized: false,
    });

    useProvideMap(state);

    onMounted(async () => {
      // eslint-disable-next-line no-underscore-dangle
      window._AMapSecurityConfig = {
        // eslint-disable-next-line no-restricted-globals
        serviceHost: `${location.protocol}//${import.meta.env.VITE_AMAP_JS_SERVICE_HOST}/_AMapService`,
      };

      const AMap = await AMapLoader.load({
        key: import.meta.env.VITE_AMAP_JS_KEY,
        version: '2.0',
        plugins: [
          'AMap.ToolBar',
          'AMap.Scale',
          'AMap.MouseTool',
          'AMap.MapType',
          'AMap.ControlBar',
          'AMap.Geolocation',
          'AMap.PolyEditor',
          'AMap.BezierCurveEditor',
          'AMap.RectangleEditor',
          'AMap.CircleEditor',
          'AMap.AutoComplete',
          'AMap.PlaceSearch',
        ],
      });

      const map = new AMap.Map('container', {
        resizeEnable: true,
        center: new AMap.LngLat(104.065735, 30.659462),
        zoom: 12,
      });

      Object.assign(state, { AMap, map });
      setTimeout(Object.assign, 600, state, { initialized: true });

      Reflect.deleteProperty(window, 'AMap');
    });

    onBeforeUnmount(() => {
      state.map.destroy();
    });

    return { state };
  },
});
</script>

<style>
#wrapper {
  width: max(100%, 100px);
  height: max(100%, 100px);
  overflow: hidden;
}

.wrapper__spin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

#container {
  width: 100%;
  height: 100%;
}
</style>
