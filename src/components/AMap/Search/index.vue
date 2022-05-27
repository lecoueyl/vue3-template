<template>
  <div class="a-map__search" :style="props.style">
    <a-input ref="inputRef" allow-clear placeholder="输入地名进行搜索" />
  </div>
</template>

<script>
import {
  defineComponent, onBeforeUnmount, onMounted, ref,
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
    const inputRef = ref(null);
    const { AMap, map } = useInjectMap();
    let autoComplete;
    let placeSearch;

    onMounted(() => {
      autoComplete = new AMap.Autocomplete({ input: inputRef.value });
      placeSearch = new AMap.PlaceSearch({ map });

      autoComplete.on('select', (e) => {
        placeSearch.setCity(e.poi.adcode);
        placeSearch.search(e.poi.name);
      });
    });

    onBeforeUnmount(() => {
      map.remove(autoComplete);
      map.remove(placeSearch);
    });

    return { props, inputRef };
  },
});
</script>

<style lang="less">
.a-map__search {
  position: absolute;
  top: 40px;
  left: 90px;
  z-index: 1;

  .ant-input-affix-wrapper {
    min-width: 320px;
    border-radius: 4px;
  }
}
</style>
