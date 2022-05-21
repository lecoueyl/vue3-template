<template>
  <div id="fence">
    <AMap>
      <AMapVector :gfid="'663116'" />
    </AMap>
  </div>
</template>

<script setup>
import {
  AMap,
  AMapVector,
} from '@/components/AMap/index';
import { useRoute } from 'vue-router';

const { params } = useRoute();
// eslint-disable-next-line no-unused-vars
const { gfid } = params;
</script>

<style>
#fence {
  width: 100vw;
  height: 100vh;
}
</style>
