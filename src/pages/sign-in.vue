<template>
  <div id="sign-in">
    <!-- <a-button @click="signIn">
      签到
    </a-button> -->
    <a-map>
      <a-map-fit-view />
      <a-map-geolocation ref="gl" />
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
  AMapGeolocation,
  AMapVector,
} from '@/components/AMap/index';
import GeoFenceService from '@/service/GeoFence';
import { ref, reactive, onMounted } from 'vue';
import { message } from 'ant-design-vue';

const service = new GeoFenceService();
const gl = ref(null);
const state = reactive({ fences: [] });

const renderFences = async () => {
  const { results } = await service.list();
  state.fences = results;
};

onMounted(() => {
  renderFences();
});

const submit = async () => {
  // TODO: 改用watchCurrentPosition
  const position = await gl.value.getCurrentPosition();
  // 默认所有围栏均启用
  const res = await service.statusByLocation({
    location: position,
  });
  message.info(JSON.stringify(res));
};

setTimeout(submit, 1000);
</script>

<style>
#sign-in {
  width: 100vw;
  height: 100vh;
}
</style>
