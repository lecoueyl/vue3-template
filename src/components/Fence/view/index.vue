<template>
  <div class="w-100 h-100">
    <a-map-map>
      <slot />
      <a-map-fit-view />
      <a-map-vector
        v-for="{ gfid, type } in props.fences"
        :key="gfid"
        :gfid="gfid"
        :type="type"
        read-only
      />
    </a-map-map>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FenceView',
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
</style>
