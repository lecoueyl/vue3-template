<template>
  <div id="map">
    <AMap>
      <!-- <AmapMarker /> -->
      <AMapVector />
    </AMap>
  </div>
</template>

<script setup>
import {
  AMap,
  AMapVector,
  // AmapMarker,
} from '@/components/AMap/index';
</script>

<style>
#map {
  width: 100vw;
  height: 100vh;
}
</style>
