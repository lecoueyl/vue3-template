<template>
  <div id="fence">
    <a-map>
      <a-map-fit-view />
      <a-map-search />
      <a-map-vector v-bind="query" />

      <a-map-toolbar />
      <a-map-scale />
      <a-map-control-bar />
      <!-- <a-map-map-type /> -->
    </a-map>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import {
  AMap,
  AMapFitView,
  AMapSearch,
  AMapVector,
  AMapToolbar,
  AMapScale,
  AMapControlBar,
  // AMapMapType,
} from '@/components/AMap/index';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    AMap,
    AMapFitView,
    AMapSearch,
    AMapVector,
    AMapToolbar,
    AMapScale,
    AMapControlBar,
    // AMapMapType,
  },
  setup() {
    const { query } = useRoute();
    return { query };
  },
});
</script>

<style>
#fence {
  width: 100%;
  height: 100%;
}
</style>
