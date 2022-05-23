<template>
  <div class="fit-view">
    <a-button
      shape="circle"
      @click="map.setFitView()"
    >
      <send-outlined />
    </a-button>
  </div>
</template>

<script>
import { useInjectMap } from '@/composables/map';
import { defineComponent } from '@vue/runtime-core';
import { SendOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: {
    SendOutlined,
  },
  setup() {
    const { map } = useInjectMap();

    return { map };
  },
});
</script>

<style>
.fit-view {
  position: absolute;
  bottom: 90px;
  right: 80px;
  z-index: 1;
}
</style>
