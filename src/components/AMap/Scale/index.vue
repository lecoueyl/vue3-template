<script>
import { defineComponent, onBeforeUnmount } from 'vue';
import { useInjectMap } from '@/composables/map';

export default defineComponent({
  setup() {
    const { AMap, map } = useInjectMap();
    const control = new AMap.Scale({ position: { bottom: '90px', left: '40px' } });
    map.addControl(control);

    onBeforeUnmount(() => {
      map.remove(control);
    });
  },
});
</script>
