<script>
import { defineComponent, onBeforeUnmount } from 'vue';
import { useInjectMap } from '@/composables/map';

export default defineComponent({
  name: 'AMapControlBar',
  props: {
    position: {
      type: Object,
      default: () => ({ bottom: '80px', left: '35px' }),
    },
  },
  setup(props) {
    const { AMap, map } = useInjectMap();
    const control = new AMap.ControlBar({ ...props });
    map.addControl(control);

    onBeforeUnmount(() => {
      map.remove(control);
    });
  },
});
</script>
