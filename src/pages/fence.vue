<template>
  <div id="fence">
    <AMap>
      <a-map-fit-view />
      <a-map-search />
      <a-map-vector v-bind="params" />

      <a-map-toolbar />
      <a-map-scale />
      <a-map-control-bar />
      <a-map-map-type />
    </AMap>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import {
  AMap,
  AMapFitView,
  AMapSearch,
  AMapVector,
  AMapToolbar,
  AMapScale,
  AMapControlBar,
  AMapMapType,
} from '@/components/AMap/index';

const { params } = useRoute();
</script>

<style>
#fence {
  width: 100vw;
  height: 100vh;
}
</style>
