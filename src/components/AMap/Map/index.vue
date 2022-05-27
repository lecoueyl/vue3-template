<template>
  <div class="a-map-map__wrapper">
    <a-spin
      v-if="!state.initialized"
      class="a-map-map__wrapper-spin"
      spinning
      size="large"
    />
    <div ref="containerRef" class="w-100 h-100">
      <slot v-if="state.initialized" />
    </div>
  </div>
</template>

<script>
import {
  defineComponent, onBeforeUnmount, onMounted, shallowReactive, ref,
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
    const containerRef = ref(null);

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

      const map = new AMap.Map(containerRef.value, {
        resizeEnable: true,
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

    return { state, containerRef };
  },
});
</script>

<style lang="less">
.a-map-map__wrapper {
  width: max(100%, 100px);
  height: max(100%, 100px);
  overflow: hidden;

  &-spin {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
