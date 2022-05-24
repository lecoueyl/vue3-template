<template>
  <div
    class="a-map__fit-view"
    :style="props.position"
  >
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
  name: 'AMapFitView',
  components: {
    SendOutlined,
  },
  props: {
    position: {
      type: Object,
      default: () => ({ bottom: '90px', right: '80px' }),
    },
  },
  setup(props) {
    const { map } = useInjectMap();

    return { props, map };
  },
});
</script>

<style>
.a-map__fit-view {
  position: absolute;
  z-index: 1;
}
</style>
