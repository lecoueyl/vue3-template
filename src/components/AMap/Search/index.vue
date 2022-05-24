<template>
  <div
    class="a-map__search"
    :style="props.style"
  >
    <a-input
      id="a-map__search-input"
      allow-clear
      placeholder="输入地名进行搜索"
    />
  </div>
</template>

<script>
import {
  defineComponent, onBeforeUnmount, onMounted, shallowReactive,
} from 'vue';
import { useInjectMap } from '@/composables/map';

export default defineComponent({
  name: 'AMapSearch',
  props: {
    position: {
      type: Object,
      default: () => ({ bottom: '50px', left: '40px' }),
    },
  },
  setup(props) {
    const { AMap, map } = useInjectMap();
    const state = shallowReactive({
      autoComplete: null,
      placeSearch: null,
    });

    onMounted(() => {
      state.autoComplete = new AMap.Autocomplete({ input: 'a-map__search-input' });
      state.placeSearch = new AMap.PlaceSearch({ map });

      state.autoComplete.on('select', (e) => {
        state.placeSearch.setCity(e.poi.adcode);
        state.placeSearch.search(e.poi.name);
      });
    });

    onBeforeUnmount(() => {
      map.remove(state.autoComplete);
      map.remove(state.placeSearch);
    });

    return { props, state };
  },
});
</script>

<style>
.a-map__search {
  position: absolute;
  top: 40px;
  left: 90px;
  z-index: 1;
}

.a-map__search .ant-input-affix-wrapper {
  min-width: 320px;
  border-radius: 4px;
}
</style>
