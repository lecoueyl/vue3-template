<template>
  <div class="w-100 h-100">
    <a-map-map>
      <a-map-fit-view />
      <a-map-search />
      <a-map-vector v-bind="query" />

      <a-map-toolbar />
      <a-map-scale />
      <a-map-control-bar />
      <!-- <a-map-map-type /> -->
    </a-map-map>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const { query } = useRoute();
    return { query };
  },
});
</script>

<style>
</style>
