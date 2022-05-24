<script>
import { defineComponent, onBeforeUnmount } from 'vue';
import { useInjectMap } from '@/composables/map';

export default defineComponent({
  name: 'AMapToolbar',
  props: {
    position: {
      type: Object,
      default: () => ({ top: '40px', left: '40px' }),
    },
  },
  setup(props) {
    const { AMap, map } = useInjectMap();
    const control = new AMap.ToolBar({ ...props });
    map.addControl(control);

    onBeforeUnmount(() => {
      map.remove(control);
    });
  },
});
</script>
