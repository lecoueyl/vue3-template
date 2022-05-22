<script>
import { defineComponent, onBeforeUnmount } from 'vue';
import { useInjectMap } from '@/composables/map';

export default defineComponent({
  setup() {
    const { AMap, map } = useInjectMap();
    const control = new AMap.MapType({ position: { bottom: '200px', right: '40px' } });
    map.addControl(control);

    onBeforeUnmount(() => {
      map.remove(control);
    });
  },
});
</script>
