<template>
  <div id="sign-in">
    <fence-view>
      <!-- <a-button
        shape="circle"
        :loading="state.loading"
      >
        <send-outlined />
      </a-button> -->
      <a-map-marker
        v-if="state.position.length"
        :position="state.position"
      />
      <a-map-geolocation
        ref="glRef"
        :show-button="false"
        :show-circle="false"
        @init="onInit"
      />
    </fence-view>
  </div>
</template>

<script>
import { FenceView } from '@/components/Fence/index';
import { defineComponent, reactive, ref } from 'vue';
import {
  AMapGeolocation,
  AMapMarker,
} from '@/components/AMap/index';
import GeoFenceService from '@/service/GeoFence';
import { message } from 'ant-design-vue';

export default defineComponent({
  components: {
    FenceView,
    AMapGeolocation,
    AMapMarker,
  },
  setup() {
    const service = new GeoFenceService();
    const glRef = ref(null);
    const state = reactive({ position: [], loading: false });

    const onInit = async () => {
      state.position = await glRef.value.getCurrentPosition();
    };

    const onSubmit = async () => {
      try {
        state.loading = true;
        // 默认所有围栏均启用
        const isWithinFences = await service.isWithinFences({
          location: state.position,
        });
        if (isWithinFences) {
          message.success('签到成功');
        } else {
          message.error('签到失败');
        }
      } finally {
        state.loading = false;
      }
    };

    return {
      glRef, state, onInit, onSubmit,
    };
  },
});
</script>

<style lang="less">
#sign-in {
  width: 100vw;
  height: 100vh;
}
</style>
