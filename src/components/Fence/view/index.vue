<template>
  <div id="fence-view">
    <a-map>
      <slot />
      <a-map-fit-view />
      <a-map-vector
        v-for="{ gfid } in props.fences"
        :key="gfid"
        :gfid="gfid"
        read-only
      />
    </a-map>
  </div>
</template>

<script>
import {
  AMap,
  AMapFitView,
  AMapVector,
} from '@/components/AMap/index';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    AMap,
    AMapFitView,
    AMapVector,
  },
  props: {
    fences: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    return { props };
  },
});
</script>

<style>
#fence-view {
  width: 100vw;
  height: 100vh;
}
</style>
