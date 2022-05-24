<template>
  <div id="a-map__wrapper">
    <a-spin
      v-if="!state.initialized"
      class="a-map__wrapper-spin"
      spinning
      size="large"
    />
    <div id="a-map__wrapper-container">
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
  name: 'AMapMap',
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
        serviceHost: `${window.location.origin}/_AMapService`,
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

      const map = new AMap.Map('a-map__wrapper-container', {
        resizeEnable: true,
        center: new AMap.LngLat(104.065735, 30.659462),
        zoom: 12,
      });

      map.on('complete', () => {
        state.initialized = true;
      });

      Object.assign(state, { AMap, map });
    });

    onBeforeUnmount(() => {
      state.map.destroy();
    });

    return { state };
  },
});
</script>

<style>
#a-map__wrapper {
  width: max(100%, 100px);
  height: max(100%, 100px);
  overflow: hidden;
}

.a-map__wrapper-spin {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

#a-map__wrapper-container {
  width: 100%;
  height: 100%;
}
</style>
