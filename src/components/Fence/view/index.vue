<template>
  <div id="fence-view">
    <!-- <a-button @click="signIn">
      签到
    </a-button> -->
    <a-map>
      <slot />
      <a-map-fit-view />
      <a-map-vector
        v-for="{ gfid } in state.fences"
        :key="gfid"
        :gfid="gfid"
        read-only
      />
    </a-map>
  </div>
</template>

<script setup>
import {
  AMap,
  AMapFitView,
  AMapVector,
} from '@/components/AMap/index';
import GeoFenceService from '@/service/GeoFence';
import { reactive, onMounted } from 'vue';

const service = new GeoFenceService();
const state = reactive({ fences: [] });

const renderFences = async () => {
  const { results } = await service.list();
  state.fences = results;
};

onMounted(() => {
  renderFences();
});
</script>

<style>
#fence-view {
  width: 100vw;
  height: 100vh;
}
</style>
