<template>
  <div id="sign-in">
    <fence-view :fences="state.fences">
      <a-button
        class="sign-in__button"
        shape="round"
        :loading="state.loading"
        @click="onSubmit"
      >
        <check-outlined />签到
      </a-button>
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
import {
  defineComponent, reactive, ref,
} from 'vue';
import {
  AMapGeolocation,
  AMapMarker,
} from '@/components/AMap/index';
import GeoFenceService from '@/service/GeoFence';
import { message } from 'ant-design-vue';
import { CheckOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    FenceView,
    AMapGeolocation,
    AMapMarker,
    CheckOutlined,
  },
  setup() {
    const service = new GeoFenceService();
    const glRef = ref(null);
    const state = reactive({ fences: [], position: [], loading: false });

    // TODO
    const onInit = async () => {
      const { results } = await service.list();
      state.fences = results;
      state.position = await glRef.value.getCurrentPosition();
    };

    const onSubmit = async () => {
      try {
        state.loading = true;
        const isWithinFences = await service.isWithinFences({
          location: state.position,
          gfids: state.fences.map(({ gfid }) => gfid), // 默认所有围栏均启用
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

.sign-in__button {
  position: absolute;
  right: 120px;
  bottom: 90px;
  z-index: 1;
}
</style>
