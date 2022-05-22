<script>
import { defineComponent, onBeforeUnmount } from 'vue';
import { useInjectMap } from '@/composables/map';

export default defineComponent({
  setup() {
    const { AMap, map } = useInjectMap();
    const control = new AMap.ControlBar({ position: { bottom: '80px', left: '40px' } });
    map.addControl(control);

    onBeforeUnmount(() => {
      map.remove(control);
    });
  },
});
</script>
