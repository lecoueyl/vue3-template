<template>
  <div id="sign-in">
    <fence-view :fences="state.fences">
      <a-button
        class="sign-in__button"
        shape="round"
        :loading="state.loading"
        @click="handleSubmit"
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
        @init="handleInit"
      />
    </fence-view>
  </div>
</template>

<script>
import {
  defineComponent, reactive, ref,
} from 'vue';
import { GeoFenceService } from '@/service';
import { message } from 'ant-design-vue';
import { CheckOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    CheckOutlined,
  },
  setup() {
    const service = new GeoFenceService();
    const glRef = ref(null);
    const state = reactive({ fences: [], position: [], loading: false });

    // TODO
    const handleInit = async () => {
      state.position = await glRef.value.getCurrentPosition();
      const { results } = await service.list();
      state.fences = results;
    };

    const handleSubmit = async () => {
      try {
        state.loading = true;
        const isWithinFences = await service.isWithinFences({
          location: state.position,
          gfids: state.fences.map(({ gfid }) => gfid), // 默认所有围栏均启用
        });
        if (isWithinFences) {
          message.success('签到成功！');
        } else {
          message.error('签到失败，不在指定区域！');
        }
      } finally {
        state.loading = false;
      }
    };

    return {
      glRef, state, handleInit, handleSubmit,
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
  position: absolute !important;
  right: 120px;
  bottom: 90px;
  z-index: 1;
}
</style>
